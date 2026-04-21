import styled from 'styled-components';

export const StyledWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #DCF9E0 0%, #FFFFFF 30.21%);
  font-family: sans-serif;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const HeaderSection = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 9999px;
  margin-bottom: 2rem;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1.5rem;
  line-height: 1.1;

  span {
    background: linear-gradient(135deg, #059669, #0d9488);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #6b7280;
  max-width: 48rem;
  margin: 0 auto;
  font-weight: 500;
  line-height: 1.6;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  max-width: 1200px;
  width: 100%;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
`;

export const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #10b981, #059669);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const IconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  background: #d1fae5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
`;

export const CardSubtitle = styled.p`
  color: #6b7280;
`;

export const Benefits = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const BenefitsTitle = styled.span`
  font-size: 0.9375rem;
  color: #111827;
  font-weight: 700;
`;

export const BenefitsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

export const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.625rem;
`;

export const BenefitText = styled.span`
  font-weight: 600;
  font-size: 0.75rem;
  color: #6b7280;
`;

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

export const StepBadge = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid #e5e7eb;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
`;

export const FileUploadCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  min-height: 18rem;

  &:hover {
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

export const JobInputCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  min-height: 22rem;
  max-width: 75%;

  &:hover {
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

export const JobInputWrapper = styled.div`
  position: relative;
`;

export const JobIconWrapper = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1rem;
  padding: 0.75rem;
  background: #d1fae5;
  border-radius: 0.75rem;
`;

export const JobTextarea = styled.textarea`
  width: 100%;
  min-height: 20rem;
  padding: 2.5rem 2.5rem 2.5rem 5.5rem;
  font-size: 1.125rem;
  color: #374151;
  background: #f9fafb;
  border: none;
  border-radius: 0.75rem;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    background: white;
    box-shadow: 0 0 0 2px #10b981;
    outline: none;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const AnalyzeButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 1.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #10b981, #059669);
  border: none;
  border-radius: 1rem;
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #059669, #047857);
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const LoadingOverlay = styled.div`
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: 9999 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6) !important;
  backdrop-filter: blur(8px) !important;
  overflow: hidden;
`;

export const LoadingCard = styled.div`
  background: white !important;
  padding: 4rem;
  border-radius: 2rem;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
  text-align: center;
  max-width: 500px;
  width: 90%;
  position: relative !important;
  z-index: 10000 !important;
`;

export const LoadingTitle = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1.5rem;
`;

export const LoadingText = styled.p`
  color: #6b7280;
  font-size: 1.125rem;
`;

export const ResultPreview = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const CircularProgress = styled.div<{ progress: number }>`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(
    #10b981 0deg,
    #10b981 ${({ progress }) => progress * 3.6}deg,
    #e5e7eb ${({ progress }) => progress * 3.6}deg,
    #e5e7eb 360deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

export const CircularInner = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #10b981;
`;

export const PreviewText = styled.p`
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  max-width: 200px;
`;

export const BackgroundElements = styled.div`
  position: fixed;
  inset: 0;
  z-0;
  pointer-events: none;
  overflow: hidden;

  > div {
    position: absolute;
    border-radius: 50%;
    background: rgba(209, 250, 229, 0.4);
    filter: blur(64px);
    animation: pulse 4s ease-in-out infinite;

    &:nth-child(1) {
      top: 0;
      left: 0;
      width: 800px;
      height: 800px;
      animation-delay: 0s;
    }

    &:nth-child(2) {
      top: 20%;
      right: 0;
      width: 600px;
      height: 600px;
      animation-delay: 2s;
    }
  }
`;

export const BlueCardWrapper = styled.div`
  .card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 380px;
    border-radius: 24px;
    line-height: 1.6;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    padding: 48px;
    border-radius: 22px;
    color: #ffffff;
    overflow: hidden;
    background: #0a3cff;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
    width: 100%;
  }

  .content::before {
    position: absolute;
    content: "";
    top: -4%;
    left: 50%;
    width: 90%;
    height: 90%;
    transform: translate(-50%);
    background: #ced8ff;
    z-index: -1;
    transform-origin: bottom;

    border-radius: inherit;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .content::after {
    position: absolute;
    content: "";
    top: -8%;
    left: 50%;
    width: 80%;
    height: 80%;
    transform: translate(-50%);
    background: #e7ecff;
    z-index: -2;
    transform-origin: bottom;
    border-radius: inherit;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .content svg {
    width: 48px;
    height: 48px;
  }

  .content .para {
    z-index: 1;
    opacity: 1;
    font-size: 18px;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .content .link {
    z-index: 1;
    color: #fea000;
    text-decoration: none;
    font-family: inherit;
    font-size: 16px;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .content .link:hover {
    text-decoration: underline;
  }

  .card:hover {
    transform: translate(0px, -16px);
  }

  .card:hover .content::before {
    rotate: -8deg;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .card:hover .content::after {
    rotate: 8deg;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;