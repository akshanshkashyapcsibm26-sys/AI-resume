import markdown
from xhtml2pdf import pisa
import os

def convert_md_to_pdf(source_md_path, output_pdf_path):
    # 1. Read Markdown content
    with open(source_md_path, 'r', encoding='utf-8') as f:
        text = f.read()

    # 2. Convert Markdown to HTML
    html_content = markdown.markdown(text, extensions=['tables'])

    # 3. Add some basic styling for PDF
    full_html = f"""
    <html>
    <head>
    <style>
        body {{ font-family: "Times New Roman", serif; font-size: 12pt; line-height: 1.5; text-align: justify; }}
        h1 {{ font-size: 16pt; font-weight: bold; text-align: center; margin-top: 20px; }}
        h2 {{ font-size: 14pt; font-weight: bold; margin-top: 15px; }}
        h3 {{ font-size: 12pt; font-weight: bold; margin-top: 10px; }}
        p {{ margin-bottom: 10px; }}
        table {{ width: 100%; border-collapse: collapse; margin-bottom: 15px; border: 1px solid black; }}
        th, td {{ border: 1px solid black; padding: 8px; text-align: left; vertical-align: top; }}
        th {{ background-color: #f2f2f2; font-weight: bold; }}
        .center {{ text-align: center; }}
        .bold {{ font-weight: bold; }}
    </style>
    </head>
    <body>
    {html_content}
    </body>
    </html>
    """

    # 4. Convert HTML to PDF
    with open(output_pdf_path, "wb") as result_file:
        pisa_status = pisa.CreatePDF(
            full_html,                # the HTML to convert
            dest=result_file          # file handle to recieve result
        )

    if pisa_status.err:
        print(f"Error converting to PDF: {pisa_status.err}")
    else:
        print(f"Successfully created PDF at: {output_pdf_path}")

if __name__ == "__main__":
    # Use the draft artifact path since the user deleted the file in the project dir
    source_path = r"C:\Users\Aksha\.gemini\antigravity\brain\4f435936-d5bd-4255-b622-25964e9636f0\PROJECT_SYNOPSIS_DRAFT.md"
    output_path = r"c:\Users\Aksha\OneDrive\Desktop\project major iilm\PROJECT_SYNOPSIS.pdf"
    
    convert_md_to_pdf(source_path, output_path)
