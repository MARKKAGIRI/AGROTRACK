from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_groq import ChatGroq
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
# REMOVED: from langchain.chains import RetrievalQA (The broken module)
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# Global AI components
embeddings = None 
manual_vector_db = None
llm = None

@app.on_event("startup")
async def startup_event():
    global embeddings, manual_vector_db, llm
    print("--- STARTING AGROTRACK AI ENGINE (MANUAL MODE) ---")

    groq_api_key = os.getenv("GROQ_API_KEY")
    if not groq_api_key:
        print("CRITICAL: GROQ_API_KEY missing!")
        return

    # 1. Initialize Embeddings
    print("Loading Embeddings Model...")
    try:
        embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    except Exception as e:
        print(f"Error loading embeddings: {e}")
        return

    # 2. Load the Manual (Vector Store) - ONLY if it exists
    if os.path.exists("vector_store"):
        try:
            manual_vector_db = FAISS.load_local("vector_store", embeddings, allow_dangerous_deserialization=True)
            print("Vector store loaded successfully.")
        except Exception as e:
            print(f"Error loading vector_store: {e}")
    else:
        print("WARNING: 'vector_store' folder not found. AI will rely on LLM knowledge only.")

    # 3. Initialize Groq (LLM)
    try:
        llm = ChatGroq(
            temperature=0.3,
            model_name="llama-3.1-8b-instant",
            api_key=groq_api_key
        )
    except Exception as e:
        print(f"Error initializing Groq: {e}")

    print("--- AI SYSTEM READY ---")

# --- MEMORY MANAGER ---
def get_user_memory(user_id: str):
    folder_path = f"memories/{user_id}"
    if os.path.exists(folder_path):
        return FAISS.load_local(folder_path, embeddings, allow_dangerous_deserialization=True)
    else:
        return FAISS.from_texts(["System: Conversation started."], embeddings)

def save_user_memory(user_id: str, db):
    os.makedirs(f"memories/{user_id}", exist_ok=True)
    db.save_local(f"memories/{user_id}")

# --- API ENDPOINT ---
class QueryRequest(BaseModel):
    user_id: str
    question: str
    user_context: str = ""

@app.post("/ask")
async def ask_ai(request: QueryRequest):
    if not llm:
         raise HTTPException(status_code=503, detail="AI System (LLM) not ready.")

    try:
        # --- STEP 1: RETRIEVE KNOWLEDGE (The Manual) ---
        manual_context = ""
        if manual_vector_db:
            # Search for top 2 relevant pages in the manual
            manual_docs = manual_vector_db.similarity_search(request.question, k=2)
            manual_context = "\n".join([doc.page_content for doc in manual_docs])

        # --- STEP 2: RETRIEVE MEMORY (Past Chat) ---
        memory_context = ""
        if embeddings:
            user_memory_db = get_user_memory(request.user_id)
            memory_docs = user_memory_db.similarity_search(request.question, k=3)
            memory_context = "\n".join([doc.page_content for doc in memory_docs])

        # --- STEP 3: CONSTRUCT PROMPT MANUALLY ---
        # This replaces what the "Chain" was doing for us
        full_prompt = f"""
        You are AgroAI, an expert agricultural assistant.
        
        --- OFFICIAL MANUAL GUIDELINES ---
        {manual_context}
        
        --- USER FARM CONTEXT ---
        {request.user_context}
        
        --- PAST CONVERSATION MEMORY ---
        {memory_context}
        
        --- USER QUESTION ---
        {request.question}
        
        INSTRUCTION:
        Answer the user's question. Prioritize the Official Manual guidelines if relevant.
        Keep the answer helpful, concise, and professional.
        """
        
        # --- STEP 4: GENERATE ANSWER ---
        # Direct call to Groq
        response = llm.invoke(full_prompt)
        answer_text = response.content

        # --- STEP 5: SAVE MEMORY ---
        if embeddings:
            interaction = f"User: {request.question}\nAssistant: {answer_text}"
            user_memory_db.add_texts([interaction])
            save_user_memory(request.user_id, user_memory_db)
        
        return {"answer": answer_text}

    except Exception as e:
        print(f"Error processing request: {e}")
        # Return a fallback message so the app doesn't crash
        return {"answer": "I'm having trouble accessing my knowledge base right now, but I can try to answer based on general knowledge."}