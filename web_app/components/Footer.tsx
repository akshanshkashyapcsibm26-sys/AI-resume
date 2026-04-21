"use client";

export default function Footer() {
    return (
        <footer style={{
            width: '100%',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '2rem 4rem',
            borderTop: '1px solid #e2e8f0',
        }}>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0, fontWeight: 500 }}>
                © 2026. TEAM-1 All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '2rem', color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
                <a href="#" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>Terms & Conditions</a>
                <a href="#" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>Privacy Policy</a>
                <a href="#" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>Cookie Policy</a>
                <a href="#" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>Contact us</a>
            </div>
        </footer>
    );
}
