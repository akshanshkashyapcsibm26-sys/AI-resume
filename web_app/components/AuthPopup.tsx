"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { X, Mail, Lock, AlertCircle, CheckCircle2 } from "lucide-react";

interface AuthPopupProps {
    isOpen: boolean;
    onCloseAction: () => void;
    initialView: "login" | "signup";
}

export default function AuthPopup({ isOpen, onCloseAction, initialView }: AuthPopupProps) {
    const [view, setView] = useState<"login" | "signup">(initialView);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "error" | "success", text: string } | null>(null);

    if (!isOpen) return null;

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            if (view === "signup") {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                });

                if (error) {
                    setMessage({ type: "error", text: error.message });
                } else if (data.session === null) {
                    setMessage({ type: "success", text: "Check your email for the confirmation link." });
                } else {
                    setMessage({ type: "success", text: "Successfully signed up!" });
                }
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) {
                    setMessage({ type: "error", text: error.message });
                } else {
                    setMessage({ type: "success", text: "Logged in successfully!" });
                    setTimeout(() => {
                        onCloseAction();
                        window.location.reload(); // optionally reload to get user session in other components
                    }, 1000);
                }
            }
        } catch (error: any) {
            setMessage({ type: "error", text: error.message || "An unexpected error occurred" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
        }}>
            <div style={{
                backgroundColor: '#ffffff',
                width: '100%',
                maxWidth: '440px',
                borderRadius: '24px',
                padding: '2.5rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                position: 'relative',
                animation: 'popup-animate 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
                <button
                    onClick={onCloseAction}
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#64748b',
                        padding: '0.5rem',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <X size={24} />
                </button>

                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: '#1a202c',
                    marginBottom: '0.5rem',
                    textAlign: 'center',
                    letterSpacing: '-0.02em',
                }}>
                    {view === "login" ? "Welcome Back" : "Create Account"}
                </h2>
                <p style={{
                    textAlign: 'center',
                    color: '#64748b',
                    marginBottom: '2rem',
                    fontSize: '1rem',
                }}>
                    {view === "login"
                        ? "Enter your credentials to access your account"
                        : "Sign up to start transforming your hiring pipeline"}
                </p>

                {message && (
                    <div style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        backgroundColor: message.type === "error" ? '#fef2f2' : '#f0fdf4',
                        color: message.type === "error" ? '#991b1b' : '#166534',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                    }}>
                        {message.type === "error" ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>
                            Email Address
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={20} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.85rem 1rem 0.85rem 3rem',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    backgroundColor: '#f8fafc',
                                    fontSize: '1rem',
                                    color: '#1e293b',
                                    outline: 'none',
                                    transition: 'border-color 0.2s, background-color 0.2s',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => { e.currentTarget.style.borderColor = '#25a075'; e.currentTarget.style.backgroundColor = '#ffffff'; }}
                                onBlur={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.backgroundColor = '#f8fafc'; }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={20} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.85rem 1rem 0.85rem 3rem',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    backgroundColor: '#f8fafc',
                                    fontSize: '1rem',
                                    color: '#1e293b',
                                    outline: 'none',
                                    transition: 'border-color 0.2s, background-color 0.2s',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => { e.currentTarget.style.borderColor = '#25a075'; e.currentTarget.style.backgroundColor = '#ffffff'; }}
                                onBlur={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.backgroundColor = '#f8fafc'; }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            backgroundColor: '#25a075',
                            color: '#ffffff',
                            fontWeight: 800,
                            fontSize: '1.1rem',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.2s',
                            marginTop: '0.5rem',
                            boxShadow: '0 4px 12px rgba(37, 160, 117, 0.3)',
                            opacity: loading ? 0.7 : 1,
                        }}
                        onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#1d805d')}
                        onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#25a075')}
                    >
                        {loading
                            ? "Processing..."
                            : (view === "login" ? "Log In" : "Create Account")}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                        {view === "login" ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={() => setView(view === "login" ? "signup" : "login")}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#25a075',
                                fontWeight: 800,
                                fontSize: '0.95rem',
                                cursor: 'pointer',
                                marginLeft: '0.5rem',
                            }}
                        >
                            {view === "login" ? "Sign Up" : "Log In"}
                        </button>
                    </p>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes popup-animate {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}} />
        </div>
    );
}
