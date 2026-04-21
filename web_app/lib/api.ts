export const API_URL = "http://localhost:8000";

export interface PredictionResult {
    predicted_score: number;
    cosine_similarity: number;
    confidence_level?: string;
}

export type AnalysisResult = PredictionResult;

export interface FeedbackItem {
    title: string;
    score: number;
    maxScore: number;
    details: string[];
    status: "pass" | "warning" | "fail";
}

export interface FeedbackResponse {
    feedbackItems: FeedbackItem[];
}

export async function analyzeResume(resumeText: string, jobText: string): Promise<PredictionResult> {
    const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            resume_text: resumeText,
            job_text: jobText,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to analyze resume");
    }

    return response.json();
}

export async function analyzeResumeFile(file: File, jobText: string): Promise<PredictionResult> {
    const formData = new FormData();
    formData.append("resume_file", file);
    formData.append("job_text", jobText);

    const response = await fetch(`${API_URL}/predict_file`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to analyze resume file");
    }

    return response.json();
}

export async function generateFeedback(resumeText: string, jobDescription: string): Promise<FeedbackResponse> {
    const response = await fetch('/api/feedback', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            resumeText,
            jobDescription,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate feedback");
    }

    return response.json();
}

// Helper to extract text from file
export async function extractTextFromFile(file: File): Promise<string> {
    // For now, return a placeholder - you can implement PDF/DOCX parsing later
    return `[Resume content from ${file.name}]`;
}
