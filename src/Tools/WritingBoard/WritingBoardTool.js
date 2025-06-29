import React, { useRef, useState, useEffect, useCallback } from 'react';
import './WritingBoardTool.css';

const WritingBoardTool = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [tool, setTool] = useState('pen'); // pen or text
    const [lineWidth, setLineWidth] = useState(2);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [text, setText] = useState('');
    const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
    const [isInitialized, setIsInitialized] = useState(false);

    const saveState = useCallback(() => {
        if (!isInitialized) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(canvas.toDataURL());
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    }, [history, historyIndex, isInitialized]);

    // Initialize canvas only once
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || isInitialized) return;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Save initial state without triggering the saveState callback
        const initialState = canvas.toDataURL();
        setHistory([initialState]);
        setHistoryIndex(0);
        setIsInitialized(true);
    }, [isInitialized]);

    const undo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            loadState(historyIndex - 1);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            loadState(historyIndex + 1);
        }
    };

    const loadState = (index) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = history[index];
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    };

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (tool === 'text') {
            setTextPosition({ x, y });
            return;
        }

        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing || tool === 'text') return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    };

    const stopDrawing = () => {
        if (isDrawing) {
            setIsDrawing(false);
            saveState();
        }
    };

    const addText = () => {
        if (!text) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.font = '16px Arial';
        ctx.fillStyle = color;
        ctx.fillText(text, textPosition.x, textPosition.y);
        setText('');
        saveState();
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = 'drawing.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveState();
    };

    return (
        <div className="writing-board-tool">
            <div className="board-header">
                <h2>🎨 Writing Board</h2>
                <p>Draw, sketch, and add text with a full-featured digital canvas</p>
            </div>

            <div className="board-controls">
                <div className="tools-section">
                    <h3>Drawing Tools</h3>

                    <div className="tool-group">
                        <label>Tool:</label>
                        <div className="tool-buttons">
                            <button
                                className={`tool-btn ${tool === 'pen' ? 'active' : ''}`}
                                onClick={() => setTool('pen')}
                            >
                                ✏️ Pen
                            </button>
                            <button
                                className={`tool-btn ${tool === 'text' ? 'active' : ''}`}
                                onClick={() => setTool('text')}
                            >
                                📝 Text
                            </button>
                        </div>
                    </div>

                    <div className="tool-group">
                        <label>Color:</label>
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="color-input"
                            title="Choose Color"
                        />
                    </div>

                    <div className="tool-group">
                        <label>Brush Size:</label>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={lineWidth}
                            onChange={(e) => setLineWidth(e.target.value)}
                            className="range-input"
                            title="Line Width"
                        />
                        <span className="size-display">{lineWidth}px</span>
                    </div>
                </div>

                {tool === 'text' && (
                    <div className="text-section">
                        <h4>Text Input</h4>
                        <div className="text-controls">
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Enter text to add to canvas..."
                                className="text-input"
                            />
                            <button
                                onClick={addText}
                                className="add-text-btn"
                                disabled={!text.trim()}
                            >
                                ➕ Add Text
                            </button>
                        </div>
                        <p className="text-hint">Click on the canvas to position your text</p>
                    </div>
                )}

                <div className="actions-section">
                    <div className="control-buttons">
                        <button
                            onClick={undo}
                            disabled={historyIndex <= 0}
                            className="undo-btn"
                        >
                            ↩️ Undo
                        </button>
                        <button
                            onClick={redo}
                            disabled={historyIndex >= history.length - 1}
                            className="redo-btn"
                        >
                            ↪️ Redo
                        </button>
                        <button
                            onClick={clearCanvas}
                            className="clear-btn"
                        >
                            🗑️ Clear Canvas
                        </button>
                        <button
                            onClick={downloadImage}
                            className="download-btn"
                        >
                            💾 Download
                        </button>
                    </div>
                </div>
            </div>

            <div className="canvas-section">
                <h3>🖼️ Canvas</h3>
                <div className="canvas-container">
                    <canvas
                        ref={canvasRef}
                        width={800}
                        height={600}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseOut={stopDrawing}
                        className="drawing-canvas"
                    />
                </div>
            </div>

            <div className="info-section">
                <h3>ℹ️ Information</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <strong>Canvas Size:</strong>
                        <span>800 × 600 pixels</span>
                    </div>
                    <div className="info-item">
                        <strong>Export Format:</strong>
                        <span>PNG with transparency support</span>
                    </div>
                    <div className="info-item">
                        <strong>Tools Available:</strong>
                        <span>Pen drawing, Text insertion</span>
                    </div>
                    <div className="info-item">
                        <strong>History:</strong>
                        <span>Unlimited undo/redo operations</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WritingBoardTool;
