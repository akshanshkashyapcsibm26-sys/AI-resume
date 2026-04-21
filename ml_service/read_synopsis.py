import os
import sys
import pypdf
import io

def main():
    pdf_path = os.path.join(os.path.dirname(os.getcwd()), "PROJECT synopsis.pdf")
    print(f"Reading file: {pdf_path}")
    
    try:
        with open(pdf_path, "rb") as f:
            file_bytes = f.read()
            
        print("Attempting pypdf extraction...")
        try:
            pdf_reader = pypdf.PdfReader(io.BytesIO(file_bytes))
            print(f"Number of pages: {len(pdf_reader.pages)}")
            for i, page in enumerate(pdf_reader.pages):
                print(f"--- Page {i+1} ---")
                text = page.extract_text()
                print(text)
        except Exception as e:
            print(f"pypdf failed: {e}")

    except Exception as e:
        print(f"Error reading file: {e}")

if __name__ == "__main__":
    main()
