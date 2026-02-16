from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from typing import Optional
import shutil
from ultralytics import YOLO
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

vision_model = YOLO("my_crop_model.pt")

# Global AI components
embeddings = None 
manual_vector_db = None
llm = None

def load_knowledge_base():
    """Load and index all knowledge base files"""
    knowledge_files = [
        "knowledge_base/maize_manual.txt",
        "knowledge_base/beans_manual.txt",
        "knowledge_base/coffee_manual.txt",
        "knowledge_base/potato_manual.txt",
        "knowledge_base/tomato_manual.txt",
        "knowledge_base/banana_manual.txt",
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
    """Extract crop information from user context - enhanced for more crops"""
    crops = []
    
    # Pattern 1: "Maize (Planted: 2025-12-14)" or "Maize (planted 45 days ago"
    pattern1 = r'(\w+)\s*\((?:Planted|planted):\s*(\d{4}-\d{2}-\d{2})\)'
    matches1 = re.findall(pattern1, user_context, re.IGNORECASE)
    
    for crop_name, plant_date in matches1:
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
    
    # Pattern 2: "Coffee (planted 365 days ago)"
    pattern2 = r'(\w+)\s*\(planted\s+(\d+)\s+days\s+ago'
    matches2 = re.findall(pattern2, user_context, re.IGNORECASE)
    
    for crop_name, days in matches2:
        if crop_name not in [c["name"] for c in crops]:  # Avoid duplicates
            try:
                days_int = int(days)
                planted_date = (datetime.now() - timedelta(days=days_int)).strftime("%Y-%m-%d")
                crops.append({
                    "name": crop_name,
                    "planted_date": planted_date,
                    "days_since_planting": days_int
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
    """Provide growth stage information for crops - enhanced for all crops"""
    stage_info = []
    
    for crop in crops:
        days = crop["days_since_planting"]
        name = crop["name"].lower()
        
        if "maize" in name or "corn" in name:
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
        
        elif "coffee" in name:
            if days < 180:
                stage = "Young plant establishment"
                advice = "Ensure good shade (50%). Regular watering. Watch for diseases."
            elif days < 365:
                stage = "First year growth"
                advice = "Remove flowers to encourage vegetative growth. Maintain mulch."
            elif days < 730:
                stage = "Second year - preparing for first harvest"
                advice = "Apply fertilizers as recommended. Start regular spraying for CBD/CLR."
            else:
                stage = "Mature tree"
                advice = "Regular pruning, spraying, and fertilization. Harvest ripe cherries only."
        
        elif "potato" in name or "irish" in name:
            if days < 14:
                stage = "Sprouting"
                advice = "Keep soil moist. Watch for cutworms."
            elif days < 35:
                stage = "Vegetative growth"
                advice = "Earth up and apply first top dressing. Start fungicide sprays."
            elif days < 60:
                stage = "Tuber initiation"
                advice = "CRITICAL irrigation period. Second earthing up."
            elif days < 90:
                stage = "Tuber bulking"
                advice = "Maintain moisture. Continue fungicide sprays for late blight."
            else:
                stage = "Maturity/Harvest ready"
                advice = "Stop irrigation. Cut vines 10 days before harvest."
        
        elif "tomato" in name:
            if days < 21:
                stage = "Seedling establishment"
                advice = "Water regularly. Start staking for indeterminate varieties."
            elif days < 45:
                stage = "Vegetative growth"
                advice = "Apply first top dressing. Prune suckers. Start pest monitoring."
            elif days < 65:
                stage = "Flowering"
                advice = "Critical for fruit set. Ensure adequate water. Foliar calcium to prevent blossom end rot."
            elif days < 85:
                stage = "Fruit development"
                advice = "Monitor for pests (Tuta absoluta, whiteflies). Maintain consistent watering."
            else:
                stage = "Harvesting period"
                advice = "Harvest every 2-3 days. Handle fruits carefully. Continue pest management."
        
        elif "banana" in name or "plantain" in name or "matoke" in name:
            if days < 90:
                stage = "Early establishment"
                advice = "Regular watering. Mulch heavily. First fertilizer application."
            elif days < 180:
                stage = "Active growth phase"
                advice = "Start desuckering (keep only 3 stems). Continue fertilization."
            elif days < 270:
                stage = "Pre-flowering"
                advice = "Ensure adequate water and nutrients. Watch for weevils."
            elif days < 365:
                stage = "Flowering to harvest"
                advice = "Prop bunches. Continue pest/disease management. Harvest when mature."
            else:
                stage = "Ratoon cycle"
                advice = "Regular desuckering. Maintain fertilization schedule. Harvest every 8-10 months."
        
        else:
            # Generic advice for unknown crops
            stage = "Growth monitoring needed"
            advice = "Monitor crop regularly. Apply appropriate fertilizers and pest control."
        
        if stage:  # Only add if we have stage info
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
async def ask_ai(
    user_id: str = Form(...),
    question: str = Form(...),
    user_context: str = Form(...),
    image: Optional[UploadFile] = File(None)
):
    if not llm:
        raise HTTPException(status_code=503, detail="AI System not ready.")

    try:
        # Get current date
        current_date = datetime.now().strftime("%B %d, %Y")

        # --- STEP 1: VISION PROCESSING (New) ---
        vision_section = ""
        
        if image:
            # Save temp file
            temp_filename = f"temp_{image.filename}"
            with open(temp_filename, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)
            
            try:
                # Run YOLO Inference
                results = vision_model(temp_filename)
                
                # Extract all predictions with confidence scores
                if results[0].probs is not None:
                    # Get top predictions
                    probs = results[0].probs.data.cpu().numpy()
                    names = results[0].names
                    
                    # Get top 3 predictions
                    top_indices = sorted(range(len(probs)), key=lambda i: probs[i], reverse=True)[:3]
                    
                    top_predictions = []
                    for idx in top_indices:
                        disease = names[idx]
                        score = probs[idx]
                        if score > 0.1:  # Only include predictions > 10%
                            top_predictions.append(f"  - {disease} ({score:.1%})")
                    
                    if top_predictions:
                        predictions_text = "\n".join(top_predictions)
                        vision_section = f"""
Based on visual analysis of the uploaded image, here are possible issues:
{predictions_text}

Provide treatment advice for the most likely condition, and mention prevention tips for the other possibilities.
"""
                    else:
                        vision_section = ""
                else:
                    vision_section = ""
                    
            except Exception as e:
                print(f"Vision Error: {e}")
                vision_section = ""
            finally:
                # Clean up temp file
                if os.path.exists(temp_filename):
                    os.remove(temp_filename)
        # ---------------------------------------

        # --- STEP 2: STANDARD CONTEXT RETRIEVAL ---
        crops = extract_crop_info(user_context)
        growth_stage_info = get_growth_stage_info(crops)
        
        manual_context = get_relevant_manual_context(
            question, 
            user_context, 
            k=4
        )
        
        memory_context = get_conversation_history(user_id, question, k=2)
        
        # Build prompt sections
        manual_section = f"RELEVANT GUIDELINES:\n{manual_context}\n" if manual_context else ""
        growth_section = f"CURRENT CROP STATUS:\n{growth_stage_info}\n" if growth_stage_info else ""
        memory_section = f"RECENT CONVERSATION:\n{memory_context}\n" if memory_context else ""

        # --- STEP 3: CONSTRUCT PROMPT ---
        prompt = f"""You are AgroAI, a helpful agricultural assistant for Kenyan farmers using Agrotrack.

TODAY: {current_date}

### INSTRUCTIONS:
1. **Answer only what the user asked** - stay on topic, don't add unnecessary information.
2. **If an image was uploaded with visual analysis** - focus on diagnosing and treating the crop issue shown.
3. **Tone:** Direct, concise, practical. No greetings or classifications unless asked.

### FARMER'S QUESTION:
{question}

### CONTEXT DATA:
**FARMER'S FARM:**
{user_context.strip()}

{growth_section}
{memory_section}
{vision_section}

### KNOWLEDGE BASE:
{manual_section}

ANSWER:"""

        # Generate response
        response = llm.invoke(prompt)
        answer_text = response.content.strip()
        
        # Clean up response
        answer_text = re.sub(r'^(Good day|Hello|Hi),?\s*(Farmer|friend).*?\.', '', answer_text, flags=re.IGNORECASE)
        answer_text = re.sub(r"I'm AgroAI.*?\.", '', answer_text, flags=re.IGNORECASE)
        answer_text = answer_text.strip()
        
        # Save to memory
        if embeddings:
            # Save both the question and the response, including vision analysis
            interaction = f"Q: {question} [Image: {'Yes' if image else 'No'}]\nA: {answer_text[:250]}"
            user_memory_db = get_user_memory(user_id)
            user_memory_db.add_texts([interaction])
            save_user_memory(user_id, user_memory_db)
        
        return {"answer": answer_text}

    except Exception as e:
        print(f"Error processing request: {e}")
        return {"answer": "I'm having trouble analyzing that right now. Could you try again?"}
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)