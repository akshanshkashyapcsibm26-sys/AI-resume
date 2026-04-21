from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from preprocess import load_and_preprocess
from model import ResumeScreeningModel
from fastapi import UploadFile, File, Form
from text_extraction import extract_text_from_file
import traceback

app = FastAPI(title="Resume Screening AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model instance
model = ResumeScreeningModel()
MODEL_PATH = "model_artifact.pkl"
DATA_PATH = "data/resume_data.csv"

# Load model on startup if exists
# Load model on startup if exists, otherwise train
if os.path.exists(MODEL_PATH):
    model.load(MODEL_PATH)
elif os.path.exists(DATA_PATH):
    print("Model not found. Training new model...")
    try:
        df = load_and_preprocess(DATA_PATH)
        metrics = model.train(df)
        model.save(MODEL_PATH)
        print(f"Model trained successfully. Metrics: {metrics}")
    except Exception as e:
        print(f"Failed to train model on startup: {e}")

class PredictionRequest(BaseModel):
    resume_text: str
    job_text: str

@app.get("/")
def read_root():
    return {"message": "Resume Screening AI API is running"}

@app.post("/train")
def train_model():
    if not os.path.exists(DATA_PATH):
        raise HTTPException(status_code=404, detail="Data file not found")
    
    try:
        df = load_and_preprocess(DATA_PATH)
        metrics = model.train(df)
        model.save(MODEL_PATH)
        return {"message": "Training completed", "metrics": metrics}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict")
def predict(request: PredictionRequest):
    if not model.is_trained:
        raise HTTPException(status_code=400, detail="Model is not trained. Call /train first.")
    
    try:
        result = model.predict(request.resume_text, request.job_text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict_file")
async def predict_file(resume_file: UploadFile = File(...), job_text: str = Form(...)):
    if not model.is_trained:
        raise HTTPException(status_code=400, detail="Model is not trained. Call /train first.")
    
    try:
        content = await resume_file.read()
        print(f"Received file: {resume_file.filename}, Size: {len(content)} bytes")
        
        resume_text = extract_text_from_file(resume_file.filename, content)
        print(f"Extracted text length: {len(resume_text)}")
        
        if not resume_text.strip():
             print("Extraction failed: Text is empty")
             raise HTTPException(status_code=400, detail=f"Could not extract text from file: {resume_file.filename}. The file might be empty or scanned image.")

        result = model.predict(resume_text, job_text)
        return result
    except HTTPException as he:
        raise he
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")
