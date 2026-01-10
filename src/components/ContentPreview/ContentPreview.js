import React from 'react';
import { Tooltip } from '../../ui';
import './ContentPreview.css';

const ContentPreview = ({ item, children }) => {
  const getPreviewContent = (item) => {
    // Define content previews for different sections
    const previews = {
      'about-me': {
        title: 'About Me',
        description: 'Personal background, skills overview, and professional journey',
        tags: ['Profile', 'Skills', 'Experience'],
        estimatedTime: '3 min read'
      },
      'dsa': {
        title: 'Data Structures & Algorithms',
        description: 'LeetCode problems, Swift solutions, and algorithmic thinking',
        tags: ['Coding', 'Interviews', 'Problem Solving'],
        estimatedTime: 'Interactive'
      },
      'github': {
        title: 'GitHub',
        description: 'Open-source activity, repositories, and contribution history',
        tags: ['Open Source', 'Repositories', 'Contributions'],
        estimatedTime: 'Live'
      },
      'apple-development': {
        title: 'Apple Development',
        description: 'iOS, macOS development resources and project showcases',
        tags: ['iOS', 'macOS', 'Swift'],
        estimatedTime: '5-10 min'
      },
      'JSON-Tool': {
        title: 'JSON Tool',
        description: 'Format, validate, and visualize JSON data with tree view',
        tags: ['JSON', 'Formatter', 'Validator'],
        estimatedTime: 'Tool'
      },
      'crypto-tool': {
        title: 'Crypto Tool', 
        description: 'Encrypt and decrypt text using various algorithms',
        tags: ['Encryption', 'Security', 'Crypto'],
        estimatedTime: 'Tool'
      },
      // Add more previews as needed
    };

    return previews[item.id] || {
      title: item.label,
      description: 'Click to explore this content section',
      tags: ['Content'],
      estimatedTime: 'Variable'
    };
  };

  const preview = getPreviewContent(item);

  const tooltipContent = (
    <div className="content-preview">
      <div className="preview-header">
        <span className="preview-icon">{item.icon}</span>
        <h4 className="preview-title">{preview.title}</h4>
      </div>
      <p className="preview-description">{preview.description}</p>
      <div className="preview-meta">
        <div className="preview-tags">
          {preview.tags.map((tag, index) => (
            <span key={index} className="preview-tag">{tag}</span>
          ))}
        </div>
        <span className="preview-time">{preview.estimatedTime}</span>
      </div>
    </div>
  );

  return (
    <Tooltip
      content={tooltipContent}
      placement="right"
      delay={300}
      className="content-preview-tooltip"
    >
      {children}
    </Tooltip>
  );
};

export default ContentPreview;
