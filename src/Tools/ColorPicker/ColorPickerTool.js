import React, { useState } from 'react';
import './ColorPickerTool.css';

const ColorPickerTool = () => {
    const [selectedColor, setSelectedColor] = useState('#1e90ff');
    const [savedColors, setSavedColors] = useState(() => {
        const saved = localStorage.getItem('savedColors');
        return saved ? JSON.parse(saved) : [];
    });
    const [copyFormat, setCopyFormat] = useState('hex');
    const [message, setMessage] = useState('');

    const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
    };

    const hexToHsl = (hex) => {
        let { r, g, b } = hexToRgb(hex);
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
                default: break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    };

    const getColorString = (color, format) => {
        switch (format) {
            case 'hex':
                return color;
            case 'rgb': {
                const { r, g, b } = hexToRgb(color);
                return `rgb(${r}, ${g}, ${b})`;
            }
            case 'hsl': {
                const { h, s, l } = hexToHsl(color);
                return `hsl(${h}, ${s}%, ${l}%)`;
            }
            default:
                return color;
        }
    };

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
    };

    const handleEyeDropper = async () => {
        try {
            if (!window.EyeDropper) {
                throw new Error('EyeDropper API not supported in this browser');
            }
            const eyeDropper = new window.EyeDropper();
            const result = await eyeDropper.open();
            setSelectedColor(result.sRGBHex);
        } catch (error) {
            setMessage(error.message);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const saveColor = () => {
        const newColors = [...savedColors];
        if (!newColors.includes(selectedColor)) {
            newColors.unshift(selectedColor);
            if (newColors.length > 20) newColors.pop();
            setSavedColors(newColors);
            localStorage.setItem('savedColors', JSON.stringify(newColors));
        }
    };

    const copyToClipboard = async () => {
        const colorString = getColorString(selectedColor, copyFormat);
        await navigator.clipboard.writeText(colorString);
        setMessage('Color copied to clipboard!');
        setTimeout(() => setMessage(''), 2000);
    };

    return (
        <div className="color-picker-tool">
            <div className="color-picker-header">
                <h2>🎨 Color Picker</h2>
                <p>Pick, save, and manage colors with multiple format support</p>
            </div>

            {message && <div className="message">{message}</div>}

            <div className="color-picker-container">
                <div className="color-display-section">
                    <h3>Color Preview</h3>
                    <div className="color-display" style={{ backgroundColor: selectedColor }}>
                        <div className="color-info">
                            <span>{getColorString(selectedColor, 'hex')}</span>
                            <span>{getColorString(selectedColor, 'rgb')}</span>
                            <span>{getColorString(selectedColor, 'hsl')}</span>
                        </div>
                    </div>
                </div>

                <div className="color-controls-section">
                    <h3>Color Controls</h3>

                    <div className="color-controls">
                        <input
                            type="color"
                            value={selectedColor}
                            onChange={handleColorChange}
                            className="color-input"
                        />
                        <button onClick={handleEyeDropper} className="eyedropper-btn">
                            🔍 Pick from Screen
                        </button>
                        <button onClick={saveColor} className="save-color-btn">
                            💾 Save Color
                        </button>
                    </div>

                    <div className="copy-controls">
                        <select
                            value={copyFormat}
                            onChange={(e) => setCopyFormat(e.target.value)}
                        >
                            <option value="hex">HEX Format</option>
                            <option value="rgb">RGB Format</option>
                            <option value="hsl">HSL Format</option>
                        </select>
                        <button onClick={copyToClipboard} className="copy-btn">
                            📋 Copy Color
                        </button>
                    </div>
                </div>
            </div>

            {savedColors.length > 0 && (
                <div className="saved-colors">
                    <h3>Saved Colors ({savedColors.length})</h3>
                    <div className="color-grid">
                        {savedColors.map((color, index) => (
                            <div
                                key={index}
                                className="saved-color"
                                style={{ backgroundColor: color }}
                                onClick={() => setSelectedColor(color)}
                                title={color}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColorPickerTool;
