"use client";

import { useState, useEffect } from "react";
import { analyzeResumeFile, generateFeedback, extractTextFromFile, type FeedbackItem, type AnalysisResult } from "@/lib/api";
import FileUpload from "@/components/FileUpload";
import ScoreSection from "@/components/ScoreSection";
import FeedbackSection from "@/components/FeedbackSection";
import AnalysisDashboard from "@/components/AnalysisDashboard";
import Loader from "@/components/Loader";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import Toast, { type ToastType } from "@/components/Toast";
import {
    StyledWrapper,
    HeaderSection,
    Badge,
    Title,
    Subtitle,
    MainGrid,
    FeatureCard,
    Benefits,
    BenefitsTitle,
    BenefitsList,
    BenefitItem,
    BenefitText,
    ResultPreview,
    CircularProgress,
    CircularInner,
    PreviewText,
    InputSection,
    SectionHeader,
    SectionTitle,
    StepBadge,
    FileUploadCard,
    JobInputCard,
    JobInputWrapper,
    JobIconWrapper,
    JobTextarea,
    AnalyzeButton,
    LoadingOverlay,
    LoadingCard,
    LoadingTitle,
    LoadingText,
    BackgroundElements,
    BlueCardWrapper
} from "@/components/StyledHome";
import { Briefcase, Sparkles, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [jobText, setJobText] = useState("");
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
    const [showDashboard, setShowDashboard] = useState(false);

    const showToast = (message: string, type: ToastType = "error") => {
        setToast({ message, type });
    };

    // Calculate combined score: 50% ML dataset + 50% AI feedback analysis (out of 100)
    const calculateCombinedScore = (): number => {
        if (!result) return 0;

        const mlScore = result.predicted_score;

        // Calculate average feedback score if available
        if (feedbackItems.length > 0) {
            const feedbackScore = feedbackItems.reduce((acc, item) => {
                return acc + (item.score / item.maxScore);
            }, 0) / feedbackItems.length * 100; // Normalize to 100

            // Weighted score: 20% ML score + 80% feedback score
            return Math.round(mlScore * 0.2 + feedbackScore * 0.8);
        }

        // If no feedback yet, return ML score only
        return Math.round(mlScore);
    };

    const handleAnalyze = async () => {
        if (!selectedFile || !jobText.trim()) {
            showToast("Please upload a resume and enter a job description", "error");
            return;
        }

        setLoading(true);
        setResult(null);
        setFeedbackItems([]);
        setToast(null);

        try {
            // Analyze resume with ML service
            const data = await analyzeResumeFile(selectedFile, jobText);
            setResult(data);

            // Generate AI feedback with OpenRouter (Gemini Flash Model)
            const resumeText = await extractTextFromFile(selectedFile);
            const feedbackData = await generateFeedback(resumeText, jobText);
            setFeedbackItems(feedbackData.feedbackItems);

            setShowDashboard(true);
            showToast("Analysis complete!", "success");
        } catch (err: any) {
            console.error(err);
            const errorMessage = err.message || "";

            if (errorMessage.includes("Failed to analyze") || errorMessage.includes("resume")) {
                showToast("Please upload a valid resume (PDF/DOCX). Other files are not supported.", "error");
            } else if (errorMessage.includes("Could not extract text") || errorMessage.includes("scanned image")) {
                showToast("Could not read text from this PDF. Please use a text-based PDF, not a scanned image.", "error");
            } else {
                showToast("Analysis failed. Please check backend connection.", "error");
            }
        } finally {
            setLoading(false);
        }
    };

    const dashboardContent = showDashboard && result ? (
        <AnalysisDashboard
            score={calculateCombinedScore()}
            mlScore={result.predicted_score}
            similarity={result.cosine_similarity}
            confidence={result.confidence_level || "Medium"}
            feedbackItems={feedbackItems}
            onBack={() => setShowDashboard(false)}
        />
    ) : null;
    return (
        <StyledWrapper>
            <AnimatePresence>
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </AnimatePresence>

            <BackgroundElements />

            <AnimatePresence>
                {loading && (
                    <LoadingOverlay>
                        <Loader />
                    </LoadingOverlay>
                )}
            </AnimatePresence>

            <HeaderSection>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                >
                    <Title>
                        Resume Screening <br />
                        <span>Reimagined</span>
                    </Title>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                >
                    <Subtitle>
                        Instantly evaluate candidate fit with advanced machine learning.
                        Precision matching for modern hiring teams.
                    </Subtitle>
                </motion.div>
            </HeaderSection>

            <MainGrid>
                {/* Left Column - Input Section */}
                <InputSection>
                    {/* Resume Input */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
                    >
                        <SectionHeader>
                            <SectionTitle>Candidate Resume</SectionTitle>
                            <StepBadge>Step 1</StepBadge>
                        </SectionHeader>
                        <FileUploadCard>
                            <FileUpload
                                {...({
                                    onFileSelect: (file: File | null) => {
                                        setSelectedFile(file);
                                        if (file) setToast(null);
                                    },
                                    selectedFile: selectedFile,
                                    onError: (msg: string) => showToast(msg, "error"),
                                    onFileRemove: () => setSelectedFile(null)
                                } as any)}
                            />
                        </FileUploadCard>
                    </motion.div>

                    {/* Job Description Input */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
                    >
                        <SectionHeader>
                            <SectionTitle>Job Description</SectionTitle>
                            <StepBadge>Step 2</StepBadge>
                        </SectionHeader>
                        <JobInputCard>
                            <JobInputWrapper>
                                <JobIconWrapper>
                                    <Briefcase className="w-6 h-6 text-emerald-600" />
                                </JobIconWrapper>
                                <JobTextarea
                                    placeholder="Paste the job requirements and description here..."
                                    value={jobText}
                                    onChange={(e) => setJobText(e.target.value)}
                                />
                            </JobInputWrapper>
                        </JobInputCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <AnalyzeButton
                            onClick={handleAnalyze}
                            disabled={loading || !selectedFile || !jobText}
                        >
                            <span>{loading ? "Analyzing Profile..." : "Analyze Match"}</span>
                            {!loading && <ArrowRight className="w-6 h-6" />}
                        </AnalyzeButton>
                    </motion.div>
                </InputSection>

                {/* Right Column - Feature Card */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', height: '100%', width: '100%' }}
                >
                    <FeatureCard style={{ maxWidth: '100%', marginTop: '6rem' }}>
                        <Benefits>
                            <BenefitsTitle>What this project offers</BenefitsTitle>
                            <BenefitsList>
                                <BenefitItem>
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                    <BenefitText>AI-powered resume analysis using machine learning</BenefitText>
                                </BenefitItem>
                                <BenefitItem>
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                    <BenefitText>Instant candidate-job matching with similarity scores</BenefitText>
                                </BenefitItem>
                                <BenefitItem>
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                    <BenefitText>Comprehensive feedback generation for improvements</BenefitText>
                                </BenefitItem>
                                <BenefitItem>
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                    <BenefitText>Support for PDF, DOCX, and TXT resume formats</BenefitText>
                                </BenefitItem>
                            </BenefitsList>
                        </Benefits>
                    </FeatureCard>


                    {/* High Match Card */}
                    <BlueCardWrapper style={{ marginTop: '5rem', marginLeft: '4rem', marginRight: '4rem', }}>
                        <div className="card">
                            <div className="content">
                                <h2 className="text-4xl font-bold mb-2">High Match</h2>
                                <p className="para">
                                    Your resume aligns perfectly with the job description. Our AI analysis indicates a strong potential for success in this role.
                                </p>
                            </div>
                        </div>
                    </BlueCardWrapper>
                </motion.div>
            </MainGrid>

            {/* Modal Overlay */}
            <AnimatePresence>
                {showDashboard && result && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            padding: '2rem'
                        }}
                        onClick={() => setShowDashboard(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{ maxWidth: '1200px', width: '100%', maxHeight: '90vh', overflow: 'auto' }}
                        >
                            {dashboardContent}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </StyledWrapper>
    );
}
