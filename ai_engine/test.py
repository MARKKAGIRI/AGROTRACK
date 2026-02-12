from ultralytics import YOLO
import sys

# 1. Configuration
MODEL_PATH = "my_crop_model.pt"       # Your trained model
IMAGE_PATH = "test_leaf.webp" # Change this to your image filename

print(f"Loading model from {MODEL_PATH}...")

try:
    # 2. Load the model (It will auto-detect CPU)
    model = YOLO(MODEL_PATH)
    
    print(f"Running prediction on {IMAGE_PATH}...")
    
    # 3. Run Inference
    results = model(IMAGE_PATH)
    
    # 4. Extract and Print Results
    # YOLO returns a list of result objects (one per image)
    result = results[0]
    
    # Get the index of the highest probability
    top_class_index = result.probs.top1
    
    # Get the name of that class
    prediction = result.names[top_class_index]
    
    # Get the confidence score (0.0 to 1.0)
    confidence = result.probs.top1conf.item()
    
    print("-" * 30)
    print(f"✅ DIAGNOSIS: {prediction}")
    print(f"📊 CONFIDENCE: {confidence:.2%}")
    print("-" * 30)

except Exception as e:
    print(f"\n❌ ERROR: {e}")
    print("Tip: Make sure 'best.pt' and your image file are in this folder.")