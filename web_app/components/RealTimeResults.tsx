"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";

interface RealTimeResultsProps {
    score: number | null;
    loading: boolean;
    similarity: number | null;
    confidence: string | null;
}

export default function RealTimeResults({ score, loading, similarity, confidence }: RealTimeResultsProps) {
    if (loading) {
        return (
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center h-full min-h-[300px]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
                />
                <p className="mt-4 text-gray-400 animate-pulse">Analyzing Resume Compatibility...</p>
            </div>
        );
    }

    if (score === null) {
        return (
            <div className="p-6 rounded-2xl flex flex-col items-center justify-center h-full min-h-[300px] text-center border border-white/10 bg-transparent">
                <div className="bg-transparent border border-white/10 p-4 rounded-full mb-4">
                    <AlertCircle className="w-12 h-12 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-300">Ready to Analyze</h3>
                <p className="text-gray-500 mt-2 max-w-xs">
                    Enter a resume and job description to see the AI matching score.
                </p>
            </div>
        );
    }

    // Convert score to percentage
    const percentage = Math.round(score * 100);
    const similarityPercentage = similarity ? Math.round(similarity * 100) : 0;

    let color = "text-red-500";
    let borderColor = "border-red-500";
    let status = "Low Match";

    if (percentage >= 70) {
        color = "text-green-500";
        borderColor = "border-green-500";
        status = "Excellent Match";
    } else if (percentage >= 40) {
        color = "text-yellow-500";
        borderColor = "border-yellow-500";
        status = "Potential Match";
    }

    // Determine confidence color
    let confidenceColor = "text-white";
    if (confidence === "High") confidenceColor = "text-green-400";
    else if (confidence === "Medium") confidenceColor = "text-yellow-400";
    else if (confidence === "Low") confidenceColor = "text-red-400";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 rounded-2xl h-full flex flex-col items-center justify-center relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className={`relative w-48 h-48 rounded-full border-8 ${borderColor} flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,0,0,0.3)]`}
            >
                <div className="text-center">
                    <span className={`text-5xl font-bold ${color}`}>{percentage}%</span>
                    <p className="text-sm text-gray-400 mt-1">Match Score</p>
                </div>
            </motion.div>

            <h2 className={`text-3xl font-bold mb-2 ${color}`}>{status}</h2>

            <div className="grid grid-cols-2 gap-4 w-full mt-8">
                <div className="bg-secondary/50 p-4 rounded-xl text-center">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Raw Similarity</p>
                    <p className="text-xl font-semibold text-white">{similarityPercentage}%</p>
                </div>
                <div className="bg-secondary/50 p-4 rounded-xl text-center">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">AI Confidence</p>
                    <p className={`text-xl font-semibold ${confidenceColor}`}>{confidence || "N/A"}</p>
                </div>
            </div>
        </motion.div>
    );
}
