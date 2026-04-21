"use client";

import { motion } from "framer-motion";

interface ScoreSectionProps {
    score: number | null;
    similarity: number | null;
    confidence: string | null;
}

export default function ScoreSection({ score, similarity, confidence }: ScoreSectionProps) {
    if (!score) {
        return null;
    }

    const percentage = Math.round(score * 100);
    const similarityPercentage = similarity ? Math.round(similarity * 100) : 0;

    let statusColor = "#ef4444"; // danger
    let statusBg = "#fef2f2";
    let statusText = "text-red-700";
    let status = "Low Match";

    if (percentage >= 70) {
        statusColor = "#10b981"; // emerald-500
        statusBg = "#ecfdf5";
        statusText = "text-emerald-700";
        status = "Excellent Match";
    } else if (percentage >= 40) {
        statusColor = "#f59e0b"; // amber-500
        statusBg = "#fffbeb";
        statusText = "text-amber-700";
        status = "Potential Match";
    }

    // Circle parameters for SVG
    const radius = 110;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="brutalist-card p-12 bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Overall Score</h2>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide ${statusText} shadow-sm`}
                    style={{ backgroundColor: statusBg }}
                >
                    {status}
                </motion.div>
            </div>

            {/* Score Display with SVG Circle */}
            <div className="flex flex-col items-center mb-20 relative">
                <div className="relative w-72 h-72 flex items-center justify-center">
                    {/* Pulse Effect Background */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full opacity-5 animate-pulse"
                        style={{ backgroundColor: statusColor }}
                    ></motion.div>

                    {/* SVG Circle Progress */}
                    <svg className="absolute w-full h-full -rotate-90 drop-shadow-lg" viewBox="0 0 280 280">
                        {/* Background circle */}
                        <circle
                            cx="140"
                            cy="140"
                            r={radius}
                            stroke="#f1f5f9"
                            strokeWidth="18"
                            fill="none"
                        />
                        {/* Progress circle */}
                        <motion.circle
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: offset }}
                            transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                            cx="140"
                            cy="140"
                            r={radius}
                            stroke={statusColor}
                            strokeWidth="18"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            style={{
                                filter: `drop-shadow(0 0 8px ${statusColor}40)`,
                            }}
                        />
                    </svg>

                    {/* Score text in center */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                        <div className="text-center">
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.5, type: "spring", stiffness: 200 }}
                                className="text-7xl font-bold text-gray-900 leading-none mb-2 tracking-tighter"
                            >
                                {percentage}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 0.4 }}
                                className="text-2xl text-gray-400 font-medium"
                            >
                                /100
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 text-center hover:bg-white hover:shadow-lg transition-all duration-300 group"
                >
                    <p className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Raw Similarity</p>
                    <p className="text-4xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{similarityPercentage}%</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 text-center hover:bg-white hover:shadow-lg transition-all duration-300 group"
                >
                    <p className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">AI Confidence</p>
                    <p className={`text-4xl font-bold transition-colors ${confidence === "High" ? "text-emerald-600" :
                        confidence === "Medium" ? "text-amber-600" :
                            "text-red-600"
                        }`}>{confidence || "N/A"}</p>
                </motion.div>
            </div>
        </motion.div>
    );
}
