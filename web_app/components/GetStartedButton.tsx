"use client";

import { useRouter } from "next/navigation";

export default function GetStartedButton() {
    const router = useRouter();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.75rem',
        }}>
            {/* Big glass button with "Get Started" text inside */}
            <button
                onClick={() => router.push('/analyze')}
                style={{
                    width: '280px',
                    height: '64px',
                    borderRadius: '40px',
                    background: 'rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    border: '1.5px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.18)',
                    color: '#000000',
                    fontWeight: 800,
                    fontSize: '1.15rem',
                    letterSpacing: '0.03em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.45)';
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.04)';
                }}
                onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.25)';
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                }}
            >
                Get Started <span style={{ fontSize: '1.1rem' }}>→</span>
            </button>

            {/* Horizontal divider line */}
            <div style={{
                width: '180px',
                height: '1.5px',
                background: 'rgba(255,255,255,0.6)',
                borderRadius: '2px',
            }} />
        </div>
    );
}
