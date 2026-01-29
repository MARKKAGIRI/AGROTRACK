import os
from langchain_community.document_loaders import TextLoader, DirectoryLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv

# loading the env variables
load_dotenv()


# configuration
DATA_PATH = "knowledge_base"
DB_FAISS_PATH = "vector_store"

def create_vector_db():
    print(f"-- Loading documents from {DATA_PATH} ---")

    # load the manuals
    loader = DirectoryLoader(DATA_PATH, glob="*.txt", loader_cls=TextLoader)
    documents = loader.load()


    if not documents:
        print("Error: No manual documents found!")
        return

    # splitting into chunks (AI can't read whole books at once)
    print("--- Splitting text into chunks---")
    text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    texts = text_splitter.split_documents(documents)

    # create embeddings (The "Brain" part that understands meaning)
    # use HuggingFace

    print("--- Creating Embeddings (this may take a while) ---")
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    # create and save the vector store
    print("--- Saving Vector DB ---")
    db = FAISS.from_documents(texts, embeddings)
    db.save_local(DB_FAISS_PATH)

    print(f"SUCCESS: Knowledge base saved to '{DB_FAISS_PATH}'")


if __name__ == "__main__":
    create_vector_db()