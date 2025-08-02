/**
 * Skeleton Loader Components
 * Provides loading placeholders that match the content structure
 */

import React from 'react';
import './SkeletonLoader.css';

export const SkeletonBox = ({ width = '100%', height = '20px', className = '' }) => (
  <div 
    className={`skeleton-box ${className}`}
    style={{ width, height }}
  />
);

export const SkeletonText = ({ lines = 1, className = '' }) => (
  <div className={`skeleton-text ${className}`}>
    {Array.from({ length: lines }, (_, i) => (
      <SkeletonBox 
        key={i} 
        height="16px" 
        width={i === lines - 1 ? '80%' : '100%'}
        className="skeleton-text-line"
      />
    ))}
  </div>
);

export const SkeletonCard = ({ className = '' }) => (
  <div className={`skeleton-card ${className}`}>
    <SkeletonBox height="200px" className="skeleton-card-image" />
    <div className="skeleton-card-content">
      <SkeletonBox height="24px" width="70%" className="skeleton-card-title" />
      <SkeletonText lines={3} />
    </div>
  </div>
);

export const SkeletonList = ({ items = 5, className = '' }) => (
  <div className={`skeleton-list ${className}`}>
    {Array.from({ length: items }, (_, i) => (
      <div key={i} className="skeleton-list-item">
        <SkeletonBox width="40px" height="40px" className="skeleton-list-icon" />
        <div className="skeleton-list-content">
          <SkeletonBox height="16px" width="60%" />
          <SkeletonBox height="14px" width="40%" />
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonNavigation = ({ items = 8, className = '' }) => (
  <div className={`skeleton-navigation ${className}`}>
    <div className="skeleton-nav-header">
      <SkeletonBox height="32px" width="80%" />
    </div>
    <div className="skeleton-nav-items">
      {Array.from({ length: items }, (_, i) => (
        <div key={i} className="skeleton-nav-item">
          <SkeletonBox width="24px" height="24px" className="skeleton-nav-icon" />
          <SkeletonBox height="16px" width="70%" />
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonCodeBlock = ({ lines = 10, className = '' }) => (
  <div className={`skeleton-code-block ${className}`}>
    <div className="skeleton-code-header">
      <SkeletonBox width="60px" height="20px" />
      <div className="skeleton-code-controls">
        <SkeletonBox width="20px" height="20px" />
        <SkeletonBox width="20px" height="20px" />
        <SkeletonBox width="20px" height="20px" />
      </div>
    </div>
    <div className="skeleton-code-content">
      {Array.from({ length: lines }, (_, i) => (
        <SkeletonBox 
          key={i} 
          height="18px" 
          width={`${Math.random() * 40 + 50}%`}
          className="skeleton-code-line"
        />
      ))}
    </div>
  </div>
);

export const SkeletonDSA = () => (
  <div className="skeleton-dsa">
    <div className="skeleton-dsa-header">
      <SkeletonBox height="32px" width="50%" />
      <SkeletonText lines={2} />
    </div>
    
    <div className="skeleton-dsa-topics">
      <SkeletonBox height="24px" width="100px" />
      <div className="skeleton-topic-buttons">
        {Array.from({ length: 4 }, (_, i) => (
          <SkeletonBox key={i} height="40px" width="120px" />
        ))}
      </div>
    </div>

    <div className="skeleton-dsa-content">
      <div className="skeleton-dsa-stats">
        <SkeletonBox height="120px" width="100%" />
      </div>
      
      <div className="skeleton-dsa-problems">
        <SkeletonBox height="24px" width="200px" />
        <div className="skeleton-problem-grid">
          {Array.from({ length: 6 }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
      
      <SkeletonCodeBlock lines={15} />
    </div>
  </div>
);

export const SkeletonTool = () => (
  <div className="skeleton-tool">
    <div className="skeleton-tool-header">
      <SkeletonBox height="40px" width="60%" />
      <SkeletonText lines={2} />
    </div>
    
    <div className="skeleton-tool-controls">
      {Array.from({ length: 3 }, (_, i) => (
        <SkeletonBox key={i} height="36px" width="120px" />
      ))}
    </div>
    
    <div className="skeleton-tool-content">
      <SkeletonBox height="200px" width="100%" />
      <SkeletonText lines={4} />
    </div>
  </div>
);

const SkeletonLoader = ({ 
  type = 'default', 
  className = '', 
  ...props 
}) => {
  const skeletonComponents = {
    default: SkeletonBox,
    text: SkeletonText,
    card: SkeletonCard,
    list: SkeletonList,
    navigation: SkeletonNavigation,
    code: SkeletonCodeBlock,
    dsa: SkeletonDSA,
    tool: SkeletonTool
  };

  const Component = skeletonComponents[type] || SkeletonBox;
  
  return <Component className={className} {...props} />;
};

export default SkeletonLoader;