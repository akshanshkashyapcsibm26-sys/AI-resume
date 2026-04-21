"use client";

import { LogIn, UserPlus } from "lucide-react";
import { useState } from "react";
import AuthPopup from "./AuthPopup";

export default function Header() {
    const [loginHover, setLoginHover] = useState(false);
    const [signupHover, setSignupHover] = useState(false);
    const [authPopupView, setAuthPopupView] = useState<"login" | "signup" | null>(null);

    return (
        <header style={{
            width: '100%',
            height: '64px',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 16px 0 rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 0 0 0',
            position: 'sticky',
            top: 0,
            zIndex: 100,
        }}>
            {/* Left — stacked title */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                <span style={{
                    fontSize: '2.4rem',
                    fontWeight: 900,
                    color: '#000',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    lineHeight: 1,
                }}>
                    Resume Screening
                </span>
                <span style={{
                    display: 'block',
                    width: '100%',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#555',
                    textTransform: 'uppercase',
                    letterSpacing: '0.22em',
                    textAlign: 'center',
                    lineHeight: 1,
                }}>
                    Reimagined
                </span>
            </div>

            {/* Navigation */}
            <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }} />

            {/* Auth Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', paddingRight: '0' }}>
                {/* Login */}
                <button
                    id="header-login-btn"
                    onClick={() => setAuthPopupView("login")}
                    onMouseEnter={() => setLoginHover(true)}
                    onMouseLeave={() => setLoginHover(false)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.55rem 1.4rem',
                        fontSize: '1rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        border: '2px solid #000',
                        borderRadius: '8px',
                        background: loginHover ? '#000' : '#fff',
                        color: loginHover ? '#fff' : '#000',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease',
                        outline: 'none',
                    }}
                >
                    <LogIn size={20} strokeWidth={2.5} />
                    Login
                </button>

                {/* Sign Up */}
                <button
                    id="header-signup-btn"
                    onClick={() => setAuthPopupView("signup")}
                    onMouseEnter={() => setSignupHover(true)}
                    onMouseLeave={() => setSignupHover(false)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.55rem 1.4rem',
                        fontSize: '1rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        border: '2px solid #000',
                        borderRadius: '8px',
                        background: signupHover ? '#fff' : '#000',
                        color: signupHover ? '#000' : '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease',
                        outline: 'none',
                    }}
                >
                    <UserPlus size={20} strokeWidth={2.5} />
                    Sign Up
                </button>
            </div>

            <AuthPopup
                isOpen={authPopupView !== null}
                onCloseAction={() => setAuthPopupView(null)}
                initialView={authPopupView || "login"}
            />
        </header>
    );
}
