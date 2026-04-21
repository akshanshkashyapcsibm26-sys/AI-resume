import os
import io
from text_extraction import extract_text_from_file

def test_extraction():
    print("Testing text extraction libraries...")
    
    # Test PDF (Create a dummy PDF in memory if possible, or just check imports)
    try:
        import pdfminer
        print("pdfminer imported successfully.")
    except ImportError as e:
        print(f"FAILED to import pdfminer: {e}")

    try:
        import docx
        print("python-docx imported successfully.")
    except ImportError as e:
        print(f"FAILED to import python-docx: {e}")

    # Create a dummy text file to test the logic
    try:
        content = b"Hello World"
        text = extract_text_from_file("test.txt", content)
        print(f"TXT extraction result: {text}")
        assert text == "Hello World"
    except Exception as e:
        print(f"TXT extraction failed: {e}")

if __name__ == "__main__":
    test_extraction()
