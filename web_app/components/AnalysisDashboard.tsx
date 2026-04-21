"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    XCircle,
    AlertCircle,
    ChevronRight,
    ArrowLeft,
    Download,
    Share2,
    MoreHorizontal,
    FileText,
    Layout,
    Type,
    Check
} from "lucide-react";
import AnimatedButton from "./AnimatedButton";
import CircularProgress from "./CircularProgress";

interface FeedbackItem {
    title: string;
    score: number;
    maxScore: number;
    details: string[];
    status: "pass" | "warning" | "fail";
}
interface AnalysisDashboardProps {
    score: number;
    mlScore: number;
    similarity: number;
    confidence: string;
    feedbackItems: FeedbackItem[];
    onBack: () => void;
}

const StyledWrapper = styled.div`
  background: linear-gradient(180deg, #DCF9E0 0%, #FFFFFF 30.21%);
  padding: 2rem;
  border-radius: 16px;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 1200px;
  background: linear-gradient(180deg, #DCF9E0 0%, #FFFFFF 30.21%);
  box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  overflow: hidden;
`;

const Banner = styled.div`
  width: 100%;
  height: 30px;
  background: linear-gradient(90deg, #10b981, #059669);
  position: relative;
`;

const Title = styled.label`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: #2B2B2F;
  margin-bottom: 15px;
  display: block;
  margin-top: 20px;
`;

const Description = styled.p`
  max-width: 80%;
  margin: auto;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #5F5D6B;
  margin-bottom: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  padding: 2px;
  background-color: #ebebec;
  border-radius: 9px;
  margin: 10px 20px 0px 20px;
`;

const Indicator = styled.div.withConfig({
    shouldForwardProp: (prop) => !['activeIndex', 'totalTabs'].includes(prop),
}) <{ activeIndex: number; totalTabs: number }>`
  content: "";
  width: ${props => 100 / props.totalTabs}%;
  height: 28px;
  background: #FFFFFF;
  position: absolute;
  top: 2px;
  left: ${props => (props.activeIndex * 100) / props.totalTabs + 2}%;
  z-index: 9;
  border: 0.5px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04);
  border-radius: 7px;
  transition: all 0.2s ease-out;
`;

const Tab = styled.button.withConfig({
    shouldForwardProp: (prop) => !['isActive', 'totalTabs'].includes(prop),
}) <{ isActive: boolean; totalTabs: number }>`
  width: ${props => 100 / props.totalTabs}%;
  height: 28px;
  position: relative;
  z-index: 99;
  background-color: transparent;
  border: 0;
  outline: none;
  flex: none;
  align-self: stretch;
  flex-grow: 1;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  color: ${props => props.isActive ? '#2B2B2F' : '#5F5D6B'};
`;

const Benefits = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BenefitsTitle = styled.span`
  font-size: 18px;
  color: #2B2B2F;
  font-weight: 700;
`;

const BenefitsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
`;

const BenefitText = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #5F5D6B;
  flex: 1;
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-top: 1px solid #ebebec;
  background: white;
`;

const Price = styled.label`
  position: relative;
  font-size: 32px;
  color: #2B2B2F;
  font-weight: 900;
`;

const UpgradeBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 215px;
  height: 40px;
  background: #0bdd12;
  box-shadow: 0px 0.5px 0.5px #EFEFEF, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
  border-radius: 7px;
  border: 0;
  outline: none;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  cursor: pointer;

  &:hover {
    background-color: #07b90d;
  }
`;

const MetricsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
  margin-bottom: 20px;
  padding: 15px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
`;

const MetricBadge = styled.div<{ color: string; bg: string }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: ${props => props.bg};
  color: ${props => props.color};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid ${props => props.color}30;
`;

export default function AnalysisDashboard({
    score,
    mlScore,
    similarity,
    confidence,
    feedbackItems,
    onBack
}: AnalysisDashboardProps) {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState<string>(feedbackItems[0]?.title || "");

    const handleShare = async () => {
        const shareData = {
            title: 'Resume Analysis Report',
            text: `My resume scored ${score}/100! Check out this analysis tool.`,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
                // Fallback to clipboard
                navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                alert('Link copied to clipboard!');
            }
        } else {
            // Fallback for browsers without Web Share API
            navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
            alert('Link copied to clipboard!');
        }
    };

    const handleExportPDF = () => {
        // For now, just show an alert. In a real implementation, you'd use jsPDF or similar
        alert('PDF export functionality would be implemented here using jsPDF or html2pdf library');
    };

    // Calculate overall stats
    const passedChecks = feedbackItems.filter(i => i.status === "pass").length;
    const totalChecks = feedbackItems.length;

    // Color helpers
    const getColor = (val: number, max: number = 10) => {
        const percentage = (val / max) * 100;
        if (percentage >= 80) return { color: "#166534", bg: "#dcfce7" }; // Green
        if (percentage >= 50) return { color: "#854d0e", bg: "#fef9c3" }; // Yellow
        return { color: "#991b1b", bg: "#fee2e2" }; // Red
    };

    const getConfidenceColor = (conf: string) => {
        if (conf === "High") return { color: "#166534", bg: "#dcfce7" };
        if (conf === "Medium") return { color: "#854d0e", bg: "#fef9c3" };
        return { color: "#991b1b", bg: "#fee2e2" };
    };

    const activeIndex = feedbackItems.findIndex(item => item.title === activeSection);
    const activeItem = feedbackItems.find(item => item.title === activeSection);
    const aiScore = Math.round(feedbackItems.reduce((acc, item) => acc + item.score, 0) / feedbackItems.length);

    const aiScoreColor = getColor(aiScore);
    const similarityColor = getColor(similarity * 100, 100);
    const confidenceColor = getConfidenceColor(confidence);

    return (
        <StyledWrapper>
            <Modal>
                <Banner>
                    <button
                        onClick={onBack}
                        style={{
                            position: 'absolute',
                            top: '5px',
                            left: '10px',
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            padding: '5px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <ArrowLeft size={16} />
                    </button>
                </Banner>
                <Title>Resume Report</Title>
                <Description>
                    We've analyzed your resume against industry standards. Fix the issues below to improve your chances of getting hired.
                </Description>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                    <CircularProgress score={score} />
                </div>
                <TabContainer>
                    <Indicator activeIndex={activeIndex} totalTabs={feedbackItems.length} />
                    {feedbackItems.map((item, idx) => (
                        <Tab
                            key={idx}
                            isActive={activeSection === item.title}
                            totalTabs={feedbackItems.length}
                            onClick={() => setActiveSection(item.title)}
                        >
                            {item.title}
                        </Tab>
                    ))}
                </TabContainer>
                <Benefits>
                    <BenefitsTitle>Analysis Details</BenefitsTitle>
                    <BenefitsList>
                        {activeItem?.details.map((detail, i) => (
                            <BenefitItem key={i}>
                                {activeItem.status === 'fail' ? (
                                    <XCircle size={18} color="#EF4444" style={{ flexShrink: 0 }} />
                                ) : activeItem.status === 'warning' ? (
                                    <AlertCircle size={18} color="#F59E0B" style={{ flexShrink: 0 }} />
                                ) : (
                                    <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0 }} />
                                )}
                                <BenefitText>{detail}</BenefitText>
                            </BenefitItem>
                        ))}
                    </BenefitsList>
                </Benefits>
                <ModalFooter style={{ flexDirection: 'column', alignItems: 'stretch', gap: '15px' }}>
                    <MetricsContainer>
                        <MetricBadge color={aiScoreColor.color} bg={aiScoreColor.bg}>
                            AI Score: {aiScore}/10
                        </MetricBadge>
                        <MetricBadge color={similarityColor.color} bg={similarityColor.bg}>
                            Similarity: {(similarity * 100).toFixed(2)}%
                        </MetricBadge>
                        <MetricBadge color={confidenceColor.color} bg={confidenceColor.bg}>
                            Confidence: {confidence}
                        </MetricBadge>
                        {feedbackItems.map((item, idx) => {
                            const itemColor = getColor(item.score);
                            return (
                                <MetricBadge key={idx} color={itemColor.color} bg={itemColor.bg}>
                                    {item.title}: {item.score}/10
                                </MetricBadge>
                            );
                        })}
                    </MetricsContainer>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', gap: '15px' }}>
                        <AnimatedButton variant="share" onClick={handleShare}>
                            <Share2 size={16} style={{ marginRight: '8px' }} />
                            Share
                        </AnimatedButton>
                        <AnimatedButton variant="export" onClick={handleExportPDF}>
                            <Download size={16} style={{ marginRight: '8px' }} />
                            Export PDF
                        </AnimatedButton>
                    </div>
                </ModalFooter>
            </Modal>
        </StyledWrapper>
    );
}
