import React from 'react';

const LeftNavigation = ({ items, selectedNavItem, setSelectedNavItem }) => {
    return (
        <div className="left-nav">
            <div className="nav-items">
                {items?.map((item) => (
                    <div
                        key={item.id}
                        className={`nav-item ${selectedNavItem === item.label || selectedNavItem === item.id ? "selected" : ""}`}
                        onClick={() => setSelectedNavItem(item.id)}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeftNavigation;
