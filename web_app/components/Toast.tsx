"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
    duration?: number;
}

export default function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const bgColors = {
        success: "bg-green-400",
        error: "bg-red-500",
        info: "bg-blue-400"
    };

    const icons = {
        success: <CheckCircle className="w-6 h-6 text-black" strokeWidth={3} />,
        error: <AlertTriangle className="w-6 h-6 text-white" strokeWidth={3} />,
        info: <Info className="w-6 h-6 text-black" strokeWidth={3} />
    };

    const textColors = {
        success: "text-black",
        error: "text-white",
        info: "text-black"
    };

    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className={`fixed z-50 flex items-start max-w-md p-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${bgColors[type]}`}
            style={{ bottom: '2rem', right: '2rem' }}
        >
            <div className="mr-3 mt-1">
                {icons[type]}
            </div>
            <div className="flex-1 mr-4">
                <p className={`font-black uppercase text-sm ${textColors[type]}`}>
                    {type}
                </p>
                <p className={`font-bold text-sm mt-1 ${textColors[type]}`}>
                    {message}
                </p>
            </div>
            <button
                onClick={onClose}
                className="p-1 hover:bg-black/10 transition-colors border-2 border-transparent hover:border-black"
            >
                <X className={`w-5 h-5 ${textColors[type]}`} strokeWidth={3} />
            </button>
        </motion.div>
    );
}
