"use client";

import { useState, useCallback } from "react";
import { UploadCloud, FileText, X, CheckCircle, Trash2, File } from "lucide-react";

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    selectedFile: File | null;
    onError?: (message: string) => void;
    onFileRemove?: () => void;
}

export default function FileUpload({ onFileSelect, selectedFile, onError, onFileRemove }: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);

    const validateAndSelect = useCallback((file: File) => {
        if (file.type === "application/pdf" || file.type === "text/plain" || file.name.endsWith(".docx")) {
            onFileSelect(file);
        } else {
            onError?.("Please upload a valid resume (PDF, DOCX, TXT)");
        }
    }, [onFileSelect, onError]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            validateAndSelect(file);
        }
    }, [validateAndSelect]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            validateAndSelect(file);
        }
    }, [validateAndSelect]);

    return (
        <div className="w-full h-[300px] rounded-xl shadow-[4px_4px_30px_rgba(0,0,0,0.05)] flex flex-col items-center justify-between p-3 gap-2 bg-emerald-50/10 border border-gray-100">
            <div
                className={`
                    flex-1 w-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center relative transition-all duration-300
                    ${isDragging ? "border-emerald-500 bg-emerald-50" : "border-emerald-300 hover:bg-emerald-50/30"}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    id="file-upload"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleChange}
                    accept=".pdf,.docx,.txt"
                />

                <div className="flex flex-col items-center justify-center text-center p-6 pointer-events-none">
                    {selectedFile ? (
                        <>
                            <FileText
                                className="w-20 h-20 mb-4 text-emerald-600"
                                strokeWidth={1.5}
                            />
                            <p className="text-gray-600 font-medium text-lg">
                                Resume Uploaded Successfully
                            </p>
                            <p className="text-gray-400 text-sm mt-2">
                                {selectedFile.name}
                            </p>
                        </>
                    ) : (
                        <>
                            <UploadCloud
                                className={`w-20 h-20 mb-4 transition-colors duration-300 ${isDragging ? "text-emerald-600" : "text-gray-400"}`}
                                strokeWidth={1.5}
                            />
                            <p className="text-gray-600 font-medium text-lg">
                                {isDragging ? "Drop to upload" : "Browse File to upload!"}
                            </p>
                            <p className="text-gray-400 text-sm mt-2">
                                PDF, DOCX, TXT
                            </p>
                        </>
                    )}
                </div>
            </div>

            <label
                htmlFor="file-upload"
                className="w-full h-14 bg-emerald-50/50 rounded-xl flex items-center justify-between px-4 cursor-pointer hover:bg-emerald-100 transition-colors group"
            >
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                        {selectedFile ? (
                            <FileText className="w-5 h-5 text-emerald-600" />
                        ) : (
                            <File className="w-5 h-5 text-gray-400" />
                        )}
                    </div>
                    <p className="text-gray-700 font-medium truncate max-w-[200px]">
                        {selectedFile ? selectedFile.name : "No file selected"}
                    </p>
                </div>

                {selectedFile ? (
                    <div className="p-2 bg-emerald-100 rounded-full text-emerald-600 shadow-sm">
                        <CheckCircle className="w-5 h-5" />
                    </div>
                ) : (
                    <div className="p-2 bg-gray-100 rounded-full text-gray-400 shadow-sm group-hover:bg-white group-hover:text-emerald-500 transition-colors">
                        <UploadCloud className="w-5 h-5" />
                    </div>
                )}
            </label>
        </div>
    );
}
