import io
import os
from pdfminer.high_level import extract_text as extract_pdf_text
import docx
import pypdf
import pytesseract
from pdf2image import convert_from_bytes
from PIL import Image

# Set Tesseract path if it's in a common location (Windows)
# Users might need to add this to their PATH or we can try to guess
possible_tesseract_paths = [
    r"C:\Program Files\Tesseract-OCR\tesseract.exe",
    r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe",
    r"C:\Users\Aksha\AppData\Local\Programs\Tesseract-OCR\tesseract.exe"
]

for path in possible_tesseract_paths:
    if os.path.exists(path):
        pytesseract.pytesseract.tesseract_cmd = path
        break

def extract_text_from_scanned_pdf(file_bytes):
    """Extracts text from a scanned PDF using OCR."""
    text = ""
    try:
        # Convert PDF to images
        # poppler_path might be needed on Windows if not in PATH
        # For now, assuming poppler is installed or hoping for the best
        images = convert_from_bytes(file_bytes)
        
        for i, image in enumerate(images):
            page_text = pytesseract.image_to_string(image)
            text += page_text + "\n"
            
    except Exception as e:
        print(f"OCR failed: {e}")
        # If poppler is missing, this will fail.
        if "poppler" in str(e).lower():
             print("Poppler is likely missing. Please install Poppler for Windows.")
    
    return text

def extract_text_from_pdf(file_bytes):
    """Extracts text from a PDF file stream."""
    text = ""
    try:
        # Try pdfminer.six first
        text = extract_pdf_text(io.BytesIO(file_bytes))
    except Exception as e:
        print(f"pdfminer failed: {e}")
    
    # If pdfminer returns empty, try pypdf
    if not text or not text.strip():
        print("pdfminer returned empty text, trying pypdf...")
        try:
            pdf_reader = pypdf.PdfReader(io.BytesIO(file_bytes))
            text_parts = []
            for page in pdf_reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text_parts.append(extracted)
            text = "\n".join(text_parts)
        except Exception as e:
            print(f"pypdf failed: {e}")

    # If still empty, try OCR
    if not text or not text.strip():
        print("Text-based extraction failed. Trying OCR (Tesseract)...")
        text = extract_text_from_scanned_pdf(file_bytes)

    return text

def extract_text_from_docx(file_bytes):
    """Extracts text from a DOCX file stream."""
    doc = docx.Document(io.BytesIO(file_bytes))
    text = []
    for para in doc.paragraphs:
        text.append(para.text)
    return "\n".join(text)

def extract_text_from_file(filename, file_bytes):
    """Dispatches to the correct extractor based on extension."""
    filename = filename.lower()
    
    try:
        if filename.endswith('.pdf'):
            return extract_text_from_pdf(file_bytes)
        elif filename.endswith('.docx'):
            return extract_text_from_docx(file_bytes)
        elif filename.endswith('.txt'):
            return file_bytes.decode('utf-8', errors='ignore')
        else:
            raise ValueError(f"Unsupported file format: {filename}")
    except Exception as e:
        raise Exception(f"Failed to process {filename}: {str(e)}")
