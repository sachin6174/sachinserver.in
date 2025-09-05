import React, { useState, useEffect } from 'react';
import { Button, Modal } from '../../ui';
import './OnboardingTour.css';

const OnboardingTour = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const steps = [
    {
      title: "Welcome to sachinserver.in! 👋",
      content: (
        <div className="onboarding-step">
          <div className="step-illustration">🌟</div>
          <p>This is a comprehensive developer portfolio showcasing technical skills, creative projects, and useful tools.</p>
          <p>Let's take a quick tour to help you navigate efficiently!</p>
        </div>
      ),
      targetElement: null
    },
    {
      title: "Brain-Based Navigation 🧠",
      content: (
        <div className="onboarding-step">
          <div className="step-illustration">🧠🎨</div>
          <p>Content is organized into three main sections:</p>
          <ul className="step-list">
            <li><strong>LeftBrain</strong> - Technical skills, coding, development</li>
            <li><strong>RightBrain</strong> - Creative projects, art, literature</li>
            <li><strong>Tools</strong> - Useful utilities and applications</li>
          </ul>
        </div>
      ),
      targetElement: '.tabs'
    },
    {
      title: "Rich Navigation System 🗂️",
      content: (
        <div className="onboarding-step">
          <div className="step-illustration">📑</div>
          <p>Each section contains detailed subsections. Hover over navigation items to see content previews!</p>
          <p>On mobile, tap the navigation trigger to see a organized, searchable list.</p>
        </div>
      ),
      targetElement: '.left-nav'
    },
    {
      title: "Powerful Tools Suite 🛠️",
      content: (
        <div className="onboarding-step">
          <div className="step-illustration">⚙️</div>
          <p>The Tools section includes:</p>
          <ul className="step-list">
            <li>JSON/XML formatters and validators</li>
            <li>Encryption and security tools</li>
            <li>Development utilities</li>
            <li>Image and media processors</li>
          </ul>
        </div>
      ),
      targetElement: '.tools-sub-nav'
    },
    {
      title: "Adaptive Experience 🎯",
      content: (
        <div className="onboarding-step">
          <div className="step-illustration">✨</div>
          <p>Features you'll love:</p>
          <ul className="step-list">
            <li>🌙 Dark/Light theme with system sync</li>
            <li>📱 Mobile-optimized responsive design</li>
            <li>💾 Remembers your navigation preferences</li>
            <li>⚡ Fast loading with smart caching</li>
          </ul>
        </div>
      ),
      targetElement: '.theme-toggle'
    },
    {
      title: "Ready to Explore! 🚀",
      content: (
        <div className="onboarding-step">
          <div className="step-illustration">🎉</div>
          <p>You're all set! Start by exploring:</p>
          <ul className="step-list">
            <li><strong>About Me</strong> - Learn about the developer</li>
            <li><strong>DSA</strong> - Interactive coding problems</li>
            <li><strong>JSON Tool</strong> - Popular utility for developers</li>
          </ul>
          <p>Enjoy your visit! 😊</p>
        </div>
      ),
      targetElement: null
    }
  ];

  useEffect(() => {
    // Check if user has seen the onboarding
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    const isReturningUser = localStorage.getItem('lastVisit');
    
    if (!hasSeenOnboarding && !isReturningUser) {
      // First time user - show onboarding after a brief delay
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    localStorage.setItem('lastVisit', new Date().toISOString());
    setIsVisible(false);
    onComplete?.();
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!isVisible) return null;

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Modal
      isOpen={isVisible}
      onClose={handleComplete}
      className="onboarding-modal"
      closeOnOverlayClick={false}
    >
      <div className="onboarding-container">
        {/* Progress indicator */}
        <div className="onboarding-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="progress-text">
            {currentStep + 1} of {steps.length}
          </span>
        </div>

        {/* Step content */}
        <div className="onboarding-content">
          <h2 className="step-title">{currentStepData.title}</h2>
          {currentStepData.content}
        </div>

        {/* Navigation */}
        <div className="onboarding-actions">
          <div className="action-left">
            {currentStep > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
              >
                Previous
              </Button>
            )}
          </div>

          <div className="action-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="skip-btn"
            >
              Skip Tour
            </Button>
          </div>

          <div className="action-right">
            <Button
              onClick={handleNext}
              size="sm"
            >
              {currentStep === steps.length - 1 ? 'Get Started!' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OnboardingTour;