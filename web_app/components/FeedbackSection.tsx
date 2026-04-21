"use client";

import { CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FeedbackItem {
    title: string;
    score: number;
    maxScore: number;
    details: string[];
    status: "pass" | "warning" | "fail";
}

interface FeedbackSectionProps {
    loading: boolean;
    hasResults: boolean;
    feedbackItems?: FeedbackItem[];
}

export default function FeedbackSection({ loading, hasResults, feedbackItems }: FeedbackSectionProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    if (loading) {
        return (
            <div className="brutalist-card p-12 bg-white flex flex-col items-center justify-center min-h-[500px] shadow-xl">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <Loader2 className="w-16 h-16 text-emerald-500 animate-spin mb-8" />
                </motion.div>
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold text-gray-900 mb-3"
                >
                    Analyzing Profile
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-500 text-lg"
                >
                    Our AI is evaluating the match...
                </motion.p>
            </div>
        );
    }

    if (!hasResults || !feedbackItems) {
        return (
            <div className="brutalist-card p-14 bg-white flex flex-col items-center justify-center min-h-[500px] text-center shadow-xl">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mb-8 shadow-inner">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Waiting for Analysis</h3>
                <p className="text-gray-500 text-lg max-w-sm mx-auto leading-relaxed">
                    Upload a resume and job description to see detailed feedback here.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-10 px-2">Detailed Analysis</h2>

            <div className="space-y-6">
                {feedbackItems.map((item, index) => {
                    const isExpanded = expandedIndex === index;
                    const percentage = (item.score / item.maxScore) * 100;

                    let statusColor = "text-red-500";
                    let statusBg = "bg-red-50";
                    let Icon = XCircle;

                    if (item.status === "pass" || (item.status !== "fail" && item.status !== "warning" && percentage >= 70)) {
                        statusColor = "text-emerald-500";
                        statusBg = "bg-emerald-50";
                        Icon = CheckCircle;
                    } else if (item.status === "warning" || (item.status !== "fail" && item.status !== "pass" && percentage >= 40)) {
                        statusColor = "text-amber-500";
                        statusBg = "bg-amber-50";
                        Icon = AlertTriangle;
                    } else {
                        // this explicitly covers item.status === "fail" and score below 40%
                        statusColor = "text-red-500";
                        statusBg = "bg-red-50";
                        Icon = XCircle;
                    }

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            whileHover={{ y: -2 }}
                            className={`
                                group bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-md
                                ${isExpanded ? "border-emerald-300 shadow-xl ring-2 ring-emerald-100" : "border-gray-200 hover:border-emerald-200 hover:shadow-lg"}
                            `}
                        >
                            <button
                                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                className="w-full p-8 flex items-start text-left"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex-shrink-0 p-4 rounded-xl mr-6 ${statusBg} ${statusColor} shadow-sm`}
                                >
                                    <Icon className="w-7 h-7" strokeWidth={2.5} />
                                </motion.div>

                                <div className="flex-1 min-w-0 pt-1">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-5">
                                            <span className={`text-xl font-bold ${statusColor}`}>
                                                {item.score}/{item.maxScore}
                                            </span>
                                            <motion.div
                                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {isExpanded ? (
                                                    <ChevronUp className="w-6 h-6 text-gray-400" />
                                                ) : (
                                                    <ChevronDown className="w-6 h-6 text-gray-400" />
                                                )}
                                            </motion.div>
                                        </div>
                                    </div>
                                    {item.details && item.details.length > 0 && (
                                        <p className="text-gray-600 text-base font-medium leading-relaxed pr-8 line-clamp-2">
                                            {item.details[0]}
                                        </p>
                                    )}
                                </div>
                            </button>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white"
                                    >
                                        <div className="p-8 pl-24">
                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-5">
                                                Key Observations
                                            </h4>
                                            <ul className="space-y-4">
                                                {item.details.map((detail, i) => (
                                                    <motion.li
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="flex items-start text-gray-700"
                                                    >
                                                        <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 mr-4 flex-shrink-0" />
                                                        <span className="leading-relaxed text-base">{detail}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
