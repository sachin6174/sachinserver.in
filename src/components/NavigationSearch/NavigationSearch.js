import React, { useState, useMemo } from 'react';
import { Input } from '../../ui';
import './NavigationSearch.css';

const NavigationSearch = ({ items, onItemSelect, placeholder = "Search navigation..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    return items.filter(item =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.tags && item.tags.some(tag => 
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    ).slice(0, 8); // Limit results
  }, [items, searchTerm]);

  const handleItemClick = (item) => {
    onItemSelect(item.id);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="navigation-search">
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(e.target.value.trim().length > 0);
        }}
        onFocus={() => setIsOpen(searchTerm.trim().length > 0)}
        className="search-input"
        startIcon="🔍"
      />
      
      {isOpen && filteredItems.length > 0 && (
        <div className="search-results">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              className="search-result-item"
              onClick={() => handleItemClick(item)}
            >
              <span className="result-icon">{item.icon}</span>
              <div className="result-content">
                <span className="result-title">{item.label}</span>
                {item.description && (
                  <span className="result-description">
                    {typeof item.description === 'string' 
                      ? item.description 
                      : 'View content'}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavigationSearch;