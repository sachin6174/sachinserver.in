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

    const saveState = useCallback(() => {
        const canvas = canvasRef.current;
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(canvas.toDataURL());
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    }, [history, historyIndex]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveState();
    }, [saveState]);

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
            <div className="toolbar">
                <div className="tool-group">
                    <button onClick={() => setTool('pen')}>✏️ Pen</button>
                    <button onClick={() => setTool('text')}>T Text</button>
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        title="Choose Color"
                    />
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={lineWidth}
                        onChange={(e) => setLineWidth(e.target.value)}
                        title="Line Width"
                    />
                </div>
                <div className="tool-group">
                    <button onClick={undo} disabled={historyIndex <= 0}>↩️ Undo</button>
                    <button onClick={redo} disabled={historyIndex >= history.length - 1}>↪️ Redo</button>
                    <button onClick={clearCanvas}>🗑️ Clear</button>
                    <button onClick={downloadImage}>⬇️ Download</button>
                </div>
            </div>

            {tool === 'text' && (
                <div className="text-input">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text..."
                    />
                    <button onClick={addText}>Add Text</button>
                </div>
            )}

            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
            />
        </div>
    );
};

export default WritingBoardTool;
