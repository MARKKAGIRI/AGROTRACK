from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_groq import ChatGroq
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from dotenv import load_dotenv
import os
from datetime import datetime
import re

load_dotenv()

app = FastAPI()

# Global AI components
embeddings = None 
manual_vector_db = None
llm = None

def load_knowledge_base():
    """Load and index all knowledge base files"""
    knowledge_files = [
        "knowledge_base/maize_manual.txt",
        "knowledge_base/beans_manual.txt",
        "knowledge_base/general_farming_tips.txt"
    ]
    
    all_documents = []
    
    for file_path in knowledge_files:
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Split into sections based on headers
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=800,
                chunk_overlap=100,
                separators=["\n==", "\n\n", "\n", " "]
            )
            
            chunks = text_splitter.split_text(content)
            
            # Create documents with metadata
            for i, chunk in enumerate(chunks):
                doc = Document(
                    page_content=chunk,
                    metadata={
                        "source": file_path,
                        "chunk": i
                    }
                )
                all_documents.append(doc)
    
    if all_documents and embeddings:
        # Create vector store from all documents
        return FAISS.from_documents(all_documents, embeddings)
    
    return None

@app.on_event("startup")
async def startup_event():
    global embeddings, manual_vector_db, llm
    print("--- STARTING AGROTRACK AI ENGINE ---")

    groq_api_key = os.getenv("GROQ_API_KEY")
    if not groq_api_key:
        print("CRITICAL: GROQ_API_KEY missing!")
        return

    # 1. Initialize Embeddings
    print("Loading Embeddings Model...")
    try:
        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2",
            model_kwargs={'device': 'cpu'}
        )
    except Exception as e:
        print(f"Error loading embeddings: {e}")
        return

    # 2. Load all knowledge base files
    print("Loading Knowledge Base...")
    try:
        manual_vector_db = load_knowledge_base()
        if manual_vector_db:
            print(f"Knowledge base loaded successfully!")
        else:
            print("WARNING: No knowledge base files found")
    except Exception as e:
        print(f"Error loading knowledge base: {e}")

    # 3. Initialize Groq (LLM)
    try:
        llm = ChatGroq(
            temperature=0.5,
            model_name="llama-3.1-8b-instant",
            api_key=groq_api_key,
            max_tokens=400
        )
        print("LLM initialized successfully")
    except Exception as e:
        print(f"Error initializing Groq: {e}")

    print("--- AI SYSTEM READY ---")

# --- MEMORY MANAGER ---
def get_user_memory(user_id: str):
    folder_path = f"memories/{user_id}"
    if os.path.exists(folder_path):
        try:
            return FAISS.load_local(folder_path, embeddings, allow_dangerous_deserialization=True)
        except:
            return FAISS.from_texts(["Conversation started."], embeddings)
    else:
        return FAISS.from_texts(["Conversation started."], embeddings)

def save_user_memory(user_id: str, db):
    os.makedirs(f"memories/{user_id}", exist_ok=True)
    db.save_local(f"memories/{user_id}")

# --- CONTEXT ANALYSIS ---
def extract_crop_info(user_context: str):
    """Extract crop information from user context"""
    crops = []
    # Match patterns like "Maize (Planted: 2025-12-14)"
    pattern = r'(\w+)\s*\(Planted:\s*(\d{4}-\d{2}-\d{2})\)'
    matches = re.findall(pattern, user_context)
    
    for crop_name, plant_date in matches:
        try:
            planted = datetime.strptime(plant_date, "%Y-%m-%d")
            days_since_planting = (datetime.now() - planted).days
            crops.append({
                "name": crop_name,
                "planted_date": plant_date,
                "days_since_planting": days_since_planting
            })
        except:
            pass
    
    return crops

def get_relevant_manual_context(question: str, user_context: str, k: int = 4):
    """Enhanced context retrieval based on crops and question"""
    if not manual_vector_db:
        return ""
    
    try:
        # Extract crops from user context
        crops = extract_crop_info(user_context)
        crop_names = " ".join([c["name"] for c in crops])
        
        # Enhanced query combining question and crop context
        enhanced_query = f"{question} {crop_names}"
        
        # Retrieve relevant sections
        docs = manual_vector_db.similarity_search(enhanced_query, k=k)
        
        if docs:
            # Deduplicate and format
            unique_content = []
            seen = set()
            for doc in docs:
                content = doc.page_content.strip()
                if content not in seen:
                    unique_content.append(content)
                    seen.add(content)
            
            return "\n---\n".join(unique_content[:3])  # Limit to top 3
    except Exception as e:
        print(f"Error retrieving manual context: {e}")
    
    return ""

def get_growth_stage_info(crops):
    """Provide growth stage information for crops"""
    stage_info = []
    
    for crop in crops:
        days = crop["days_since_planting"]
        name = crop["name"].lower()
        
        if "maize" in name:
            if days < 14:
                stage = "Germination/Seedling stage"
                advice = "Ensure adequate moisture. Watch for cutworms."
            elif days < 35:
                stage = "Vegetative growth"
                advice = "First weeding needed. Monitor for fall armyworm."
            elif days < 50:
                stage = "Knee-high - Time for top dressing"
                advice = "Apply CAN fertilizer (50kg/acre). Critical for growth."
            elif days < 70:
                stage = "Tasseling/Flowering stage"
                advice = "CRITICAL: Ensure adequate water. Determines yield."
            elif days < 100:
                stage = "Grain filling"
                advice = "Continue irrigation. Monitor for pests on cobs."
            elif days < 130:
                stage = "Maturity approaching"
                advice = "Reduce watering. Prepare for harvest."
            else:
                stage = "Ready for harvest or overdue"
                advice = "Check for black layer on kernels. Harvest when moisture < 18%."
        
        elif "bean" in name:
            if days < 14:
                stage = "Germination"
                advice = "Avoid overwatering. Watch for bean fly."
            elif days < 35:
                stage = "Vegetative growth"
                advice = "First weeding. Monitor for aphids."
            elif days < 60:
                stage = "Flowering"
                advice = "Critical water period. Consider foliar feeding."
            elif days < 90:
                stage = "Pod formation and filling"
                advice = "Watch for pod borers. Maintain moisture."
            else:
                stage = "Maturity/Harvest ready"
                advice = "Pods should be dry. Harvest and dry to 12-14% moisture."
        else:
            continue
        
        stage_info.append(f"{crop['name']} (Planted {crop['planted_date']}, {days} days ago):\n  Stage: {stage}\n  Advice: {advice}")
    
    return "\n\n".join(stage_info) if stage_info else ""

def get_conversation_history(user_id: str, question: str, k: int = 2):
    """Get relevant past conversation for context"""
    if not embeddings:
        return ""
    
    try:
        user_memory_db = get_user_memory(user_id)
        memory_docs = user_memory_db.similarity_search(question, k=k)
        
        relevant_history = [
            doc.page_content for doc in memory_docs 
            if "Conversation started" not in doc.page_content
        ]
        
        return "\n".join(relevant_history[-k:]) if relevant_history else ""
    except Exception as e:
        print(f"Error retrieving memory: {e}")
        return ""

# --- API ENDPOINT ---
class QueryRequest(BaseModel):
    user_id: str
    question: str
    user_context: str = ""

@app.post("/ask")
async def ask_ai(request: QueryRequest):
    if not llm:
        raise HTTPException(status_code=503, detail="AI System not ready.")

    try:
        # Get current date
        current_date = datetime.now().strftime("%B %d, %Y")
        
        # Extract crop information
        crops = extract_crop_info(request.user_context)
        growth_stage_info = get_growth_stage_info(crops)
        
        # Get relevant manual context
        manual_context = get_relevant_manual_context(
            request.question, 
            request.user_context, 
            k=4
        )
        
        # Get conversation history
        memory_context = get_conversation_history(request.user_id, request.question, k=2)
        
        # Build dynamic prompt sections
        manual_section = f"RELEVANT GUIDELINES:\n{manual_context}\n" if manual_context else ""
        
        growth_section = f"CURRENT CROP STATUS:\n{growth_stage_info}\n" if growth_stage_info else ""
        
        memory_section = f"RECENT CONVERSATION:\n{memory_context}\n" if memory_context else ""
        
        # Construct prompt
        prompt = f"""You are AgroAI, a helpful agricultural assistant for Kenyan farmers using Agrotrack.

TODAY: {current_date}

### INSTRUCTIONS (READ FIRST):
1. **Classify the Question:**
   - **General/Regional:** If the user asks about general farming, definitions, or *other regions* (e.g., "North Eastern Kenya"), answer based on general knowledge. **DO NOT** mention the user's specific farm (Meru) or their crops unless explicitly asked to compare.
   - **Specific/Personal:** If the user asks "What about *my* crops?" or "What should *I* do?", ONLY THEN use the 'FARMER'S FARM' and 'CROP STATUS' sections below.

2. **Tone & Format:**
   - Direct and concise (2-4 sentences max).
   - Use bullet points for lists.
   - Skip greetings ("Hello", "Good day").

### CONTEXT DATA (Use only if relevant to the specific user):
**FARMER'S FARM:**
{request.user_context.strip()}

{growth_section}
{memory_section}

### KNOWLEDGE BASE:
{manual_section}

### FARMER'S QUESTION:
{request.question}

ANSWER:"""

        # Generate response
        response = llm.invoke(prompt)
        answer_text = response.content.strip()
        
        # Clean up response
        answer_text = re.sub(r'^(Good day|Hello|Hi),?\s*(Farmer|friend).*?\.', '', answer_text, flags=re.IGNORECASE)
        answer_text = re.sub(r"I'm AgroAI.*?\.", '', answer_text, flags=re.IGNORECASE)
        answer_text = answer_text.strip()
        
        # Save to memory (condensed)
        if embeddings:
            interaction = f"Q: {request.question}\nA: {answer_text[:250]}"
            user_memory_db = get_user_memory(request.user_id)
            user_memory_db.add_texts([interaction])
            save_user_memory(request.user_id, user_memory_db)
        
        return {"answer": answer_text}

    except Exception as e:
        print(f"Error processing request: {e}")
        return {"answer": "I'm having trouble right now. Could you rephrase your question?"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)