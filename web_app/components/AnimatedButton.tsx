import React from 'react';
import styled from 'styled-components';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'share' | 'export';
}

const AnimatedButton = ({ children, onClick, variant }: AnimatedButtonProps) => {
  return (
    <StyledWrapper>
      <div className="btn-container">
        <div className="btn-drawer transition-top">
          {variant === 'share' ? 'Share Report' : 'Download PDF'}
        </div>
        <div className="btn-drawer transition-bottom">
          {variant === 'share' ? 'Copy Link' : 'Generate PDF'}
        </div>
        <button className="btn" onClick={onClick}>
          <span className="btn-text">{children}</span>
        </button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .btn-container {
    --btn-color: #ffffff;
    --timing-function: cubic-bezier(0, 0, 0, 2.5);
    --duration: 250ms;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn {
    position: relative;
    min-width: 120px;
    min-height: 40px;
    border-radius: 8px;
    border: 2px solid #000000;
    padding: 0.5em 1em;

    background: var(--btn-color);
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.1),
      0 4px 8px rgba(0, 0, 0, 0.1);

    transition:
      transform var(--duration) var(--timing-function),
      filter var(--duration) var(--timing-function);
    -webkit-transition:
      transform var(--duration) var(--timing-function),
      -webkit-filter var(--duration) var(--timing-function);

    cursor: pointer;
  }

  .btn-drawer {
    position: absolute;
    display: flex;
    justify-content: center;

    min-height: 28px;
    border-radius: 8px;
    border: 2px solid #000000;
    padding: 0.25em 1em;
    font-size: 0.7em;
    font-weight: 600;
    font-family: "Poppins", monospace;
    color: #000000;

    background: #ffffff;
    opacity: 0;

    transition:
      transform calc(0.5 * var(--duration)) ease,
      filter var(--duration) var(--timing-function),
      opacity calc(0.5 * var(--duration)) ease;
    -webkit-transition:
      transform calc(0.5 * var(--duration)) ease,
      -webkit-filter var(--duration) var(--timing-function),
      opacity calc(0.5 * var(--duration)) ease;
    filter: blur(2px);
    -webkit-filter: blur(2px);
  }

  .transition-top {
    top: 0;
    left: 0;
    border-radius: 6px 6px 0 0;
    align-items: start;
  }
  .transition-bottom {
    bottom: 0;
    right: 0;
    border-radius: 0 0 6px 6px;
    align-items: end;
  }

  .btn-text {
    display: inline-block;

    font-size: 0.9em;
    font-family: "Syne", "Poppins", "Inter", sans-serif;
    font-weight: 600;
    color: #000000;

    transition:
      transform var(--duration) var(--timing-function),
      filter var(--duration) var(--timing-function),
      color var(--duration) var(--timing-function);
    -webkit-transition:
      transform var(--duration) var(--timing-function),
      -webkit-filter var(--duration) var(--timing-function),
      color var(--duration) var(--timing-function);
  }


  .btn-container:has(.btn:hover),
  .btn-container:has(.btn:focus-visible) {
    .btn {
      transform: scale(1.05);
      background: #f5f5f5;
      border-color: #333333;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .transition-top {
      transform: translateY(-20px) rotateZ(2deg);
      filter: blur(0px);
      -webkit-filter: blur(0px);
      opacity: 1;
    }
    .transition-bottom {
      transform: translateY(20px) rotateZ(-2deg);
      filter: blur(0px);
      -webkit-filter: blur(0px);
      opacity: 1;
    }
    .btn-text {
      transform: scale(1.05);
      color: #333333;
    }
  }

  .btn-container:has(.btn:active) {
    .btn {
      transform: scale(0.95);
      background: #e0e0e0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    .transition-top,
    .transition-bottom {
      transform: translateY(0px) scale(0.5);
    }
    .btn-text {
      transform: scale(1);
      color: #000000;
    }
  }

}`;

export default AnimatedButton;