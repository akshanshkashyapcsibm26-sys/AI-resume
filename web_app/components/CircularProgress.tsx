import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface CircularProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

const CircularProgress = ({ score, size = 220, strokeWidth = 6 }: CircularProgressProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Increased gap between circles
  const innerRadius = (size - strokeWidth * 4) / 2; // More gap
  const outerRadius = (size - strokeWidth * 2) / 2;
  const circumference = innerRadius * 2 * Math.PI;
  const strokeDasharray = `${(animatedScore / 100) * circumference} ${circumference}`;

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981'; // Green
    if (score >= 60) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  // Animate score counting up from 0
  useEffect(() => {
    setIsVisible(true);

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = score / steps;
    let currentStep = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        currentStep++;
        const currentScore = Math.min(Math.round(increment * currentStep), score);
        setAnimatedScore(currentScore);

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, duration / steps);
    }, 800); // Delay to sync with entrance animations

    return () => {
      clearTimeout(timer);
    };
  }, [score]);

  return (
    <StyledWrapper>
      <div className={`progress-container ${isVisible ? 'visible' : ''}`}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={getScoreColor(score)} stopOpacity="0.8" />
              <stop offset="50%" stopColor={getScoreColor(score)} stopOpacity="0.95" />
              <stop offset="100%" stopColor={getScoreColor(score)} stopOpacity="1" />
            </linearGradient>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.08)"/>
            </filter>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Outer background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={outerRadius}
            fill="none"
            stroke="url(#bgGradient)"
            strokeWidth={strokeWidth / 2}
            opacity="0.4"
            className="background-circle"
          />

          {/* Inner background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={innerRadius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
            filter="url(#shadow)"
            className="inner-background"
          />

          {/* Progress circle with enhanced animation */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={innerRadius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset="0"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{
              transition: 'stroke-dasharray 2.5s cubic-bezier(0.23, 1, 0.32, 1)',
              filter: 'url(#glow)'
            }}
            className="progress-circle"
          />

          {/* Center content with animations */}
          <text
            x={size / 2}
            y={size / 2 - 8}
            textAnchor="middle"
            fontSize="3rem"
            fontWeight="800"
            fill={getScoreColor(score)}
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
            className="score-text"
          >
            {animatedScore}
          </text>
          <text
            x={size / 2}
            y={size / 2 + 20}
            textAnchor="middle"
            fontSize="1rem"
            fontWeight="600"
            fill="#64748b"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
            className="score-label"
          >
            / 100
          </text>
        </svg>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .progress-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    &.visible {
      opacity: 1;
      transform: scale(1);
    }
  }

  .background-circle {
    animation: fade-in 1s ease-out forwards;
  }

  .inner-background {
    animation: slide-in 0.8s ease-out 0.2s forwards;
    opacity: 0;
  }

  .progress-circle {
    animation: progress-entrance 0.5s ease-out 0.4s forwards;
    opacity: 0;
  }

  .score-text {
    animation: score-count 2s ease-out 0.8s forwards;
    opacity: 0;
    transform: translateY(10px);
  }

  .score-label {
    animation: fade-in-up 1s ease-out 1.2s forwards;
    opacity: 0;
    transform: translateY(15px);
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes progress-entrance {
    0% {
      opacity: 0;
      transform: scale(0.5) rotate(-90deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(-90deg);
    }
  }

  @keyframes score-count {
    0% {
      opacity: 0;
      transform: translateY(20px) scale(0.8);
    }
    50% {
      opacity: 0.7;
      transform: translateY(-5px) scale(1.1);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes fade-in-up {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default CircularProgress;