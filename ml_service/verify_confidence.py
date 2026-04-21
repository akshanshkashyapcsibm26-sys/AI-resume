import sys
import os

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from model import ResumeScreeningModel

def verify():
    model = ResumeScreeningModel()
    model_path = "model_artifact.pkl"
    
    if not os.path.exists(model_path):
        print("Model artifact not found.")
        return

    print(f"Loading model from {model_path}...")
    model.load(model_path)
    
    resume_text = "Experienced software engineer with python and machine learning skills."
    job_text = "Looking for a software engineer with python and ml experience."
    
    print("Predicting...")
    result = model.predict(resume_text, job_text)
    
    print("Result:", result)
    
    if "confidence_level" in result and "confidence_score" in result:
        print("SUCCESS: Confidence metrics found.")
        print(f"Confidence Level: {result['confidence_level']}")
        print(f"Confidence Score: {result['confidence_score']}")
    else:
        print("FAILURE: Confidence metrics missing.")

if __name__ == "__main__":
    verify()
