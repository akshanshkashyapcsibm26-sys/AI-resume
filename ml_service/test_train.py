from main import train_model
import os

# Set working dir to current file location to find data
os.chdir(os.path.dirname(os.path.abspath(__file__)))

print("Starting training...")
try:
    result = train_model()
    print("Training result:", result)
except Exception as e:
    print("Training failed:", e)
