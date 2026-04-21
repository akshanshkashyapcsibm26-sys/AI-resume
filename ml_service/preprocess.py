import pandas as pd
import ast
import numpy as np

def parse_list_string(s):
    """Parses a stringified list like "['a', 'b']" into a real list."""
    try:
        if pd.isna(s):
            return []
        # If it's already a list, return it
        if isinstance(s, list):
            return s
        # If it looks like a list string
        if s.strip().startswith('[') and s.strip().endswith(']'):
            return ast.literal_eval(s)
        return [s]
    except:
        return []

def clean_text(text):
    """Basic text cleaning."""
    if pd.isna(text):
        return ""
    return str(text).lower().strip()

def preprocess_data(df):
    """
    Preprocesses the dataframe for training.
    Combines relevant columns into 'resume_text' and 'job_text'.
    """
    # Columns to combine for Resume
    resume_cols = [
        'career_objective', 'skills', 'degree_names', 'major_field_of_studies',
        'responsibilities', 'projects', 'technical_skills' # Add others if present
    ]
    
    # Columns to combine for Job (using job_position_name and skills_required as proxy for JD if full JD missing)
    # The dataset has 'job_position_name', 'skills_required', 'responsibilities.1' (likely job responsibilities)
    job_cols = [
        'job_position_name', 'skills_required', 'responsibilities.1', 
        'educationaL_requirements', 'experiencere_requirement'
    ]

    # Helper to combine text from multiple columns
    def combine_cols(row, cols):
        text_parts = []
        for col in cols:
            if col in row.index:
                val = row[col]
                if isinstance(val, str) and val.strip().startswith('['):
                    # It's a list string
                    parsed = parse_list_string(val)
                    text_parts.extend([str(x) for x in parsed])
                else:
                    text_parts.append(str(val))
        return " ".join(text_parts)

    # Create combined text columns
    # We need to be careful not to fail if columns don't exist
    existing_resume_cols = [c for c in resume_cols if c in df.columns]
    existing_job_cols = [c for c in job_cols if c in df.columns]

    df['resume_text'] = df.apply(lambda row: clean_text(combine_cols(row, existing_resume_cols)), axis=1)
    df['job_text'] = df.apply(lambda row: clean_text(combine_cols(row, existing_job_cols)), axis=1)
    
    # Target
    if 'matched_score' in df.columns:
        df['matched_score'] = pd.to_numeric(df['matched_score'], errors='coerce').fillna(0.0)

    return df

def load_and_preprocess(filepath):
    df = pd.read_csv(filepath)
    df = preprocess_data(df)
    return df
