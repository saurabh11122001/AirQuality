import os

model_path = r"C:\Users\Saurabh\Desktop\AirQuality\backend\best_cnn_model.keras"

if os.path.exists(model_path):
    print("✅ Model file exists at:", model_path)
else:
    print("❌ Model file NOT found! Please check the path.")
