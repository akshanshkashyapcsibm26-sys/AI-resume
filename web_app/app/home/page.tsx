"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GridMotion from "@/components/GridMotion/GridMotion";
import GetStartedButton from "@/components/GetStartedButton";
import ScrollVelocity from "@/components/ScrollVelocity/ScrollVelocity";
import Carousel from "@/components/Carousel/Carousel";
import MagicBento from "@/components/MagicBento/MagicBento";
import { Sparkles, ArrowLeft, Loader2, Star } from "lucide-react";

// Your 5 local resume images from /public/resumes/
const allImages = [
    "/resumes/resume_template_1_1771757323254.png",
    "/resumes/resume_template_2_1771756674122.png",
    "/resumes/resume_template_3_1771756694066.png",
    "/resumes/resume_template_3_1771757266228.png",
    "/resumes/resume_template_4_1771757388772.png",
];

// Repeat the 5 images across all 28 grid slots
const resumeImages = Array.from({ length: 28 }, (_, i) => allImages[i % allImages.length]);

const MergedShape = ({ fill = "#29ffa2", children, style: containerStyle, ...props }: any) => (
    <div
        style={{
            position: 'relative',
            width: 540, // Match image aspect ratio
            height: 470, // Adjusted after cropping watermark
            ...containerStyle,
        }}
        {...props}
    >
        <div
            style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 540, // Match image aspect ratio
                height: 470, // Adjusted after cropping watermark
                backgroundColor: fill,
                borderRadius: '32px',
            }}
        ></div>
        {children}
    </div>
);

export default function HomePage() {
    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            margin: 0,
            padding: 0,
        }}>
            {/* White Header with shadow */}
            <Header />

            {/* Hero Section - Full Viewport minus Header */}
            <main style={{
                height: 'calc(100vh - 64px)',
                backgroundColor: '#ffffff',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                {/* Animated grid background */}
                <GridMotion items={resumeImages} gradientColor="#29ffa2" />

                {/* Left-Aligned Content Overlay */}
                <div style={{
                    position: 'absolute',
                    left: 0,
                    zIndex: 10,
                    textAlign: 'left',
                    padding: '3rem 0', // 0 rem side padding to shift fully left
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '2.5rem',
                    maxWidth: '1000px',
                    width: '100%',
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', alignItems: 'flex-start' }}>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                            fontWeight: 900,
                            /* Text-only glass styling */
                            color: 'rgba(255, 255, 255, 0.9)', // Translucent white center
                            WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)', // Light glass edge
                            textShadow: '0 10px 30px rgba(255, 255, 255, 0.5), 0 4px 12px rgba(0, 0, 0, 0.6)', // White blur + Black blur glow
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.05,
                            margin: 0,
                            textAlign: 'left',
                        }}>
                            <span style={{ whiteSpace: 'nowrap' }}>Transform Your Hiring</span><br />
                            Pipeline with <span style={{ color: '#25a075', WebkitTextStroke: 'none', textShadow: 'none' }}>AI</span>
                        </h1>
                        <p style={{
                            fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
                            fontWeight: 700,
                            /* Text-only glass styling for the paragraph */
                            color: 'rgba(255, 255, 255, 0.9)',
                            textShadow: '0 0 20px rgba(255, 255, 255, 0.4), 0 2px 6px rgba(0, 0, 0, 0.8)', // White blur
                            maxWidth: '750px',
                            margin: 0,
                            lineHeight: 1.5,
                            textAlign: 'left',
                        }}>
                            Instantly screen thousands of resumes against your job descriptions using our advanced Machine Learning model.<strong style={{ color: '#25a075', WebkitTextStroke: 'none', textShadow: 'none' }}>Eliminate manual review, remove human bias, and hire the perfect match in seconds.</strong>
                        </p>
                        <div style={{ marginTop: '2rem', marginLeft: '10rem', pointerEvents: 'auto', width: '100%', maxWidth: '750px', display: 'flex', justifyContent: 'flex-start' }}>
                            <GetStartedButton />
                        </div>
                    </div>
                </div>
            </main>

            {/* Steps & Features Section */}
            <section style={{
                width: '100%',
                backgroundColor: '#ffffff',
                padding: '6rem 2rem',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <div style={{
                    maxWidth: '1500px', // Widened from 1200px to spread items further left and right
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '4rem',
                    alignItems: 'center',
                    justifyContent: 'space-between', // Pushes the items to the opposite edges defined by maxWidth
                    flexWrap: 'wrap',
                }}>
                    {/* Left Panel: Container with Resume Image */}
                    <div style={{ flex: '0 1 540px', display: 'flex', justifyContent: 'center' }}>
                        <MergedShape fill="#000">
                            {/* Inner padded div to create the gap around the image */}
                            <div style={{
                                position: 'absolute',
                                top: '24px',   // 4-sided spacing
                                bottom: '24px',
                                left: '24px',
                                right: '24px',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                backgroundColor: '#fff',
                            }}>
                                <img
                                    src="/resumes/gemini_resume_preview.png"
                                    alt="Resume Template Preview"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </MergedShape>
                    </div>

                    {/* Right Panel: Heading and Steps */}
                    <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 900,
                            lineHeight: 1.1,
                            color: '#000',
                            margin: 0,
                            letterSpacing: '-0.02em',
                        }}>
                            Craft a <span style={{ color: '#25a075' }}>Flawless, AI-Optimized</span> Resume in 3 Simple Steps
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {/* Step 1 */}
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{
                                    backgroundColor: '#25a075', color: '#fff', width: '48px', height: '48px',
                                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: '800', fontSize: '1.5rem', flexShrink: 0
                                }}>1</div>
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#25a075' }}>Target Your Job</h3>
                                    <p style={{ margin: 0, color: '#555', lineHeight: 1.6, fontSize: '1.1rem', fontWeight: 500 }}>
                                        Upload your existing resume alongside the job description. Our system securely parses and prepares your data for comparison.
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{
                                    backgroundColor: '#25a075', color: '#fff', width: '48px', height: '48px',
                                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: '800', fontSize: '1.5rem', flexShrink: 0
                                }}>2</div>
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#25a075' }}>Machine Learning Match</h3>
                                    <p style={{ margin: 0, color: '#555', lineHeight: 1.6, fontSize: '1.1rem', fontWeight: 500 }}>
                                        Our custom ML model eliminates human bias by instantly evaluating semantic similarities, giving you an exact Match Score.
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{
                                    backgroundColor: '#25a075', color: '#fff', width: '48px', height: '48px',
                                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: '800', fontSize: '1.5rem', flexShrink: 0
                                }}>3</div>
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#25a075' }}>Get Actionable Fixes</h3>
                                    <p style={{ margin: 0, color: '#555', lineHeight: 1.6, fontSize: '1.1rem', fontWeight: 500 }}>
                                        Receive an interactive, AI-powered checklist revealing missing keywords and highlighting specific improvements needed to land the interview.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scrolling Animated Text */}
            <div style={{ color: '#1a202c', padding: '1rem 0', overflow: 'hidden', backgroundColor: 'transparent' }}>
                <ScrollVelocity
                    texts={[
                        'Resume Screening Reimagined  Transform Your Hiring Pipeline with AI  ',
                    ]}
                    velocity={80}
                    className="custom-scroll-text"
                />
                <ScrollVelocity
                    texts={[
                        'Transform Your Hiring Pipeline with AI  Resume Screening Reimagined  ',
                    ]}
                    velocity={80}
                    className="custom-scroll-text"
                />
            </div>

            {/* Why Use Builder Section */}
            <section style={{
                width: '100%',
                backgroundColor: '#ffffff',
                padding: '6rem 2rem 8rem 2rem',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <div style={{ maxWidth: '1400px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                        fontWeight: 900,
                        color: '#1a202c', // Dark slate black
                        textAlign: 'center',
                        marginBottom: '4rem',
                        letterSpacing: '-0.02em'
                    }}>
                        Why use our AI Resume Screener?
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2.5rem',
                        width: '100%',
                    }}>
                        {/* Feature 1 */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ backgroundColor: '#f0f6fa', borderRadius: '24px', padding: '2rem 1.5rem', height: '260px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', width: '100%', boxShadow: '0 6px 20px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {/* Resume */}
                                    <div style={{ flex: 1, height: '80px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <div style={{ width: '60%', height: '4px', backgroundColor: '#94a3b8', borderRadius: '2px' }}></div>
                                        <div style={{ width: '100%', height: '4px', backgroundColor: '#cbd5e1', borderRadius: '2px' }}></div>
                                        <div style={{ width: '80%', height: '4px', backgroundColor: '#cbd5e1', borderRadius: '2px' }}></div>
                                        <div style={{ width: '40%', height: '4px', backgroundColor: '#cbd5e1', borderRadius: '2px' }}></div>
                                    </div>
                                    {/* Match */}
                                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#25a075', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.1rem', flexShrink: 0, boxShadow: '0 4px 12px rgba(37, 160, 117, 0.3)', zIndex: 2, margin: '0 -10px' }}>
                                        92%
                                    </div>
                                    {/* JD */}
                                    <div style={{ flex: 1, height: '80px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                                        <div style={{ width: '70%', height: '4px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
                                        <div style={{ width: '100%', height: '4px', backgroundColor: '#cbd5e1', borderRadius: '2px' }}></div>
                                        <div style={{ width: '90%', height: '4px', backgroundColor: '#cbd5e1', borderRadius: '2px' }}></div>
                                        <div style={{ width: '50%', height: '4px', backgroundColor: '#cbd5e1', borderRadius: '2px' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                                <h4 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.75rem', color: '#1a202c' }}>Machine Learning Matching</h4>
                                <p style={{ fontSize: '1rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>Our custom TF-IDF model accurately scores resumes against any job listing in seconds.</p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ backgroundColor: '#f0f6fa', borderRadius: '24px', padding: '2rem', height: '260px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', width: '90%', boxShadow: '0 6px 20px rgba(0,0,0,0.06)' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Candidates</div>
                                        {/* Candidate 1 */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #25a075' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                <div style={{ width: '80px', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px' }}></div>
                                                <div style={{ display: 'flex', gap: '6px' }}>
                                                    <span style={{ fontSize: '0.65rem', backgroundColor: '#dcfce7', color: '#166534', padding: '2px 6px', borderRadius: '12px', fontWeight: '700' }}>Python</span>
                                                    <span style={{ fontSize: '0.65rem', backgroundColor: '#dcfce7', color: '#166534', padding: '2px 6px', borderRadius: '12px', fontWeight: '700' }}>React</span>
                                                </div>
                                            </div>
                                            <div style={{ color: '#25a075', fontWeight: '900', fontSize: '1rem' }}>92%</div>
                                        </div>
                                        {/* Candidate 2 */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #cbd5e1', opacity: 0.6 }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                <div style={{ width: '60px', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px' }}></div>
                                                <div style={{ display: 'flex', gap: '6px' }}>
                                                    <span style={{ fontSize: '0.65rem', backgroundColor: '#f1f5f9', color: '#64748b', padding: '2px 6px', borderRadius: '12px', fontWeight: '700' }}>Java</span>
                                                </div>
                                            </div>
                                            <div style={{ color: '#94a3b8', fontWeight: '800', fontSize: '0.9rem' }}>45%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                                <h4 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.75rem', color: '#1a202c' }}>Eliminate Human Bias</h4>
                                <p style={{ fontSize: '1rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>Stop relying on manual review. Our AI filters candidates entirely on objective merit and semantic keywords.</p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ backgroundColor: '#f0f6fa', borderRadius: '24px', padding: '2rem', height: '260px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', width: '85%', display: 'flex', flexDirection: 'column', boxShadow: '0 6px 20px rgba(0,0,0,0.06)' }}>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1a202c', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Sparkles size={16} color="#25a075" /> Missing Keywords
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#25a075', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>✓</div>
                                            <div style={{ fontSize: '0.85rem', color: '#333', fontWeight: 600 }}>Machine Learning</div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#f43f5e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>✕</div>
                                            <div style={{ fontSize: '0.85rem', color: '#f43f5e', fontWeight: 700 }}>Docker containerization</div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#f43f5e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>✕</div>
                                            <div style={{ fontSize: '0.85rem', color: '#f43f5e', fontWeight: 700 }}>CI/CD Pipelines</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                                <h4 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.75rem', color: '#1a202c' }}>Actionable Checklists</h4>
                                <p style={{ fontSize: '1rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>Instantly receive an interactive list of exact missing keywords to fix on any applicant's document.</p>
                            </div>
                        </div>

                        {/* Feature 4 */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ backgroundColor: '#f0f6fa', borderRadius: '24px', padding: '2rem 1.5rem', height: '260px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', width: '90%', boxShadow: '0 6px 20px rgba(0,0,0,0.06)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>Processed Resumes</div>
                                        <div style={{ fontSize: '0.7rem', backgroundColor: '#eaf4ff', color: '#3b82f6', padding: '4px 8px', borderRadius: '12px', fontWeight: 700 }}>Today</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', marginBottom: '20px' }}>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1a202c', lineHeight: 1 }}>2,450</div>
                                        <div style={{ fontSize: '0.85rem', color: '#25a075', fontWeight: 800, marginBottom: '4px' }}>+98% faster</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '48px' }}>
                                        <div style={{ flex: 1, backgroundColor: '#cbd5e1', height: '30%', borderRadius: '4px' }}></div>
                                        <div style={{ flex: 1, backgroundColor: '#cbd5e1', height: '50%', borderRadius: '4px' }}></div>
                                        <div style={{ flex: 1, backgroundColor: '#cbd5e1', height: '40%', borderRadius: '4px' }}></div>
                                        <div style={{ flex: 1, backgroundColor: '#cbd5e1', height: '70%', borderRadius: '4px' }}></div>
                                        <div style={{ flex: 1, backgroundColor: '#25a075', height: '100%', borderRadius: '4px' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                                <h4 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.75rem', color: '#1a202c' }}>Save Countless Hours</h4>
                                <p style={{ fontSize: '1rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>Transform an hours-long manual hiring pipeline into an instant, automated screening process.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section style={{
                width: '100%',
                backgroundColor: '#f0fdf4', // Light green background matching theme
                padding: '6rem 2rem',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <div style={{ maxWidth: '1400px', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>

                    {/* Left: Heading & Trustpilot */}
                    <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column' }}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                            fontWeight: 900,
                            color: '#1a202c',
                            marginBottom: '2rem',
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em'
                        }}>
                            See what makes our AI resume builder the top choice.
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#333' }}>4.5 out of 5</div>
                            <div style={{ display: 'flex', gap: '4px', color: '#10b981' }}>
                                <Star fill="currentColor" color="#10b981" size={28} />
                                <Star fill="currentColor" color="#10b981" size={28} />
                                <Star fill="currentColor" color="#10b981" size={28} />
                                <Star fill="currentColor" color="#10b981" size={28} />
                                <div style={{ position: 'relative' }}>
                                    <Star size={28} color="#cbd5e1" fill="currentColor" />
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
                                        <Star fill="currentColor" color="#10b981" size={28} />
                                    </div>
                                </div>
                            </div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#333', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '0.5rem' }}>
                                <Star fill="currentColor" color="#10b981" size={18} /> Trustpilot
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>based on 3,112 reviews</div>
                        </div>
                    </div>

                    {/* Right: Reviews Carousel */}
                    <div style={{ flex: '2 1 700px', overflow: 'hidden' }}>
                        <Carousel
                            baseWidth={330}
                            autoplay={true}
                            autoplayDelay={2000}
                            pauseOnHover={true}
                            loop={true}
                            round={false}
                        />
                    </div>
                </div>
            </section>

            {/* AI Magic Bento FAQ Section! */}
            <MagicBento
                textAutoHide={false}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={false}
                enableMagnetism={false}
                clickEffect={true}
                spotlightRadius={400}
                particleCount={12}
                glowColor="37, 160, 117"
                disableAnimations={false}
            />

            {/* Black Footer */}
            <Footer />
        </div>
    );
}
