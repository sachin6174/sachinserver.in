import React, { useState, useMemo, useRef } from 'react';
import './DiffChecker.css';

const DiffChecker = () => {
    const [originalText, setOriginalText] = useState('');
    const [modifiedText, setModifiedText] = useState('');
    const [viewMode, setViewMode] = useState('side-by-side');
    const [highlightMode, setHighlightMode] = useState('word');
    const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
    const [ignoreCase, setIgnoreCase] = useState(false);
    const [collapseLines, setCollapseLines] = useState(false);
    const [realTimeDiff, setRealTimeDiff] = useState(true);
    const fileInputOriginal = useRef(null);
    const fileInputModified = useRef(null);

    const normalizeLine = (line) => {
        let normalized = line;
        if (ignoreWhitespace) {
            normalized = normalized.replace(/\s+/g, ' ').trim();
        }
        if (ignoreCase) {
            normalized = normalized.toLowerCase();
        }
        return normalized;
    };

    const getWordDiff = (text1, text2) => {
        const words1 = text1.split(/([\s\.,;:!?\(\)\[\]{}"'])/g).filter(w => w.length > 0);
        const words2 = text2.split(/([\s\.,;:!?\(\)\[\]{}"'])/g).filter(w => w.length > 0);
        
        const maxLen = Math.max(words1.length, words2.length);
        const result1 = [];
        const result2 = [];
        
        for (let i = 0; i < maxLen; i++) {
            const word1 = words1[i] || '';
            const word2 = words2[i] || '';
            
            if (word1 === word2) {
                result1.push({ text: word1, type: 'equal' });
                result2.push({ text: word2, type: 'equal' });
            } else if (!word1) {
                result1.push({ text: '', type: 'missing' });
                result2.push({ text: word2, type: 'insert' });
            } else if (!word2) {
                result1.push({ text: word1, type: 'delete' });
                result2.push({ text: '', type: 'missing' });
            } else {
                result1.push({ text: word1, type: 'delete' });
                result2.push({ text: word2, type: 'insert' });
            }
        }
        
        return { words1: result1, words2: result2 };
    };

    const getCharDiff = (text1, text2) => {
        const chars1 = text1.split('');
        const chars2 = text2.split('');
        
        const maxLen = Math.max(chars1.length, chars2.length);
        const result1 = [];
        const result2 = [];
        
        for (let i = 0; i < maxLen; i++) {
            const char1 = chars1[i] || '';
            const char2 = chars2[i] || '';
            
            if (char1 === char2) {
                result1.push({ text: char1, type: 'equal' });
                result2.push({ text: char2, type: 'equal' });
            } else if (!char1) {
                result1.push({ text: '', type: 'missing' });
                result2.push({ text: char2, type: 'insert' });
            } else if (!char2) {
                result1.push({ text: char1, type: 'delete' });
                result2.push({ text: '', type: 'missing' });
            } else {
                result1.push({ text: char1, type: 'delete' });
                result2.push({ text: char2, type: 'insert' });
            }
        }
        
        return { chars1: result1, chars2: result2 };
    };

    const computeDiff = useMemo(() => {
        if (!realTimeDiff && (!originalText || !modifiedText)) {
            return [];
        }

        const originalLines = originalText.split('\n');
        const modifiedLines = modifiedText.split('\n');
        
        const maxLines = Math.max(originalLines.length, modifiedLines.length);
        const diff = [];

        for (let i = 0; i < maxLines; i++) {
            const originalLine = originalLines[i] || '';
            const modifiedLine = modifiedLines[i] || '';
            
            const normalizedOriginal = normalizeLine(originalLine);
            const normalizedModified = normalizeLine(modifiedLine);

            let status = 'unchanged';
            if (i >= originalLines.length) {
                status = 'added';
            } else if (i >= modifiedLines.length) {
                status = 'removed';
            } else if (normalizedOriginal !== normalizedModified) {
                status = 'modified';
            }

            let wordDiff = null;
            let charDiff = null;
            
            if (status === 'modified') {
                if (highlightMode === 'word') {
                    wordDiff = getWordDiff(originalLine, modifiedLine);
                } else if (highlightMode === 'character') {
                    charDiff = getCharDiff(originalLine, modifiedLine);
                }
            }

            diff.push({
                lineNumber: i + 1,
                original: originalLine,
                modified: modifiedLine,
                status,
                wordDiff,
                charDiff
            });
        }

        // Filter out unchanged lines if collapse is enabled
        if (collapseLines) {
            return diff.filter(line => line.status !== 'unchanged');
        }

        return diff;
    }, [originalText, modifiedText, ignoreWhitespace, ignoreCase, highlightMode, collapseLines, realTimeDiff]);

    const stats = useMemo(() => {
        const added = computeDiff.filter(line => line.status === 'added').length;
        const removed = computeDiff.filter(line => line.status === 'removed').length;
        const modified = computeDiff.filter(line => line.status === 'modified').length;
        const unchanged = computeDiff.filter(line => line.status === 'unchanged').length;

        return { added, removed, modified, unchanged };
    }, [computeDiff]);

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            // Could add a toast notification here
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const handleFileUpload = (file, isOriginal = true) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            if (isOriginal) {
                setOriginalText(text);
            } else {
                setModifiedText(text);
            }
        };
        reader.readAsText(file);
    };

    const exportToPDF = () => {
        const report = generateDiffReport();
        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'diff-report.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const convertToLowercase = () => {
        setOriginalText(originalText.toLowerCase());
        setModifiedText(modifiedText.toLowerCase());
    };

    const sortLines = () => {
        const sortedOriginal = originalText.split('\n').sort().join('\n');
        const sortedModified = modifiedText.split('\n').sort().join('\n');
        setOriginalText(sortedOriginal);
        setModifiedText(sortedModified);
    };

    const replaceBreaksWithSpaces = () => {
        setOriginalText(originalText.replace(/\n/g, ' '));
        setModifiedText(modifiedText.replace(/\n/g, ' '));
    };

    const trimWhitespace = () => {
        setOriginalText(originalText.trim());
        setModifiedText(modifiedText.trim());
    };

    const generateDiffReport = () => {
        let report = '# Diff Report\n\n';
        report += `**Statistics:**\n`;
        report += `- Added lines: ${stats.added}\n`;
        report += `- Removed lines: ${stats.removed}\n`;
        report += `- Modified lines: ${stats.modified}\n`;
        report += `- Unchanged lines: ${stats.unchanged}\n\n`;
        
        report += `**Changes:**\n\n`;
        computeDiff.forEach(line => {
            if (line.status !== 'unchanged') {
                const prefix = line.status === 'added' ? '+ ' : 
                             line.status === 'removed' ? '- ' : 
                             '~ ';
                const text = line.status === 'removed' ? line.original : line.modified;
                report += `${prefix}Line ${line.lineNumber}: ${text}\n`;
            }
        });

        return report;
    };

    const loadSample = () => {
        setOriginalText(`function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    return total;
}

const products = [
    { name: "Laptop", price: 999 },
    { name: "Mouse", price: 25 }
];

console.log(calculateTotal(products));`);

        setModifiedText(`function calculateTotal(items, taxRate = 0.1) {
    let total = 0;
    for (const item of items) {
        total += item.price;
    }
    const tax = total * taxRate;
    return total + tax;
}

const products = [
    { name: "Laptop", price: 999 },
    { name: "Mouse", price: 25 },
    { name: "Keyboard", price: 75 }
];

const finalTotal = calculateTotal(products);
console.log('Total with tax:', finalTotal);`);
    };

    const clearAll = () => {
        setOriginalText('');
        setModifiedText('');
    };

    const renderHighlightedText = (line, isOriginal = true) => {
        if (line.status === 'unchanged') {
            return line.original;
        }
        
        if (line.status === 'added' || line.status === 'removed') {
            const text = isOriginal ? line.original : line.modified;
            return <span className={`diff-highlight ${line.status}`}>{text}</span>;
        }

        if (line.status === 'modified') {
            if (highlightMode === 'word' && line.wordDiff) {
                const words = isOriginal ? line.wordDiff.words1 : line.wordDiff.words2;
                return words.map((word, index) => (
                    <span 
                        key={index} 
                        className={word.type !== 'equal' && word.type !== 'missing' ? `diff-highlight ${word.type}` : ''}
                    >
                        {word.text}
                    </span>
                ));
            } else if (highlightMode === 'character' && line.charDiff) {
                const chars = isOriginal ? line.charDiff.chars1 : line.charDiff.chars2;
                return chars.map((char, index) => (
                    <span 
                        key={index} 
                        className={char.type !== 'equal' && char.type !== 'missing' ? `diff-highlight ${char.type}` : ''}
                    >
                        {char.text}
                    </span>
                ));
            } else {
                // Line-level highlighting
                const text = isOriginal ? line.original : line.modified;
                return <span className="diff-highlight modified">{text}</span>;
            }
        }

        return isOriginal ? line.original : line.modified;
    };

    return (
        <div className="tools-container">
            <div className="tool-header">
                <div className="tool-header-content">
                    <h1 className="tool-title">Diff Checker</h1>
                    <p className="tool-subtitle">Compare text differences with detailed line-by-line analysis</p>
                </div>
            </div>

            <div className="diff-checker">
                <div className="diff-controls">
                    <div className="control-group">
                        <label>View Mode:</label>
                        <div className="view-mode-buttons">
                            <button
                                className={`btn ${viewMode === 'side-by-side' ? 'active' : ''}`}
                                onClick={() => setViewMode('side-by-side')}
                            >
                                📊 Side by Side
                            </button>
                            <button
                                className={`btn ${viewMode === 'unified' ? 'active' : ''}`}
                                onClick={() => setViewMode('unified')}
                            >
                                📄 Unified
                            </button>
                        </div>
                    </div>

                    <div className="control-group">
                        <label>Highlight:</label>
                        <div className="view-mode-buttons">
                            <button
                                className={`btn ${highlightMode === 'word' ? 'active' : ''}`}
                                onClick={() => setHighlightMode('word')}
                            >
                                📝 Word
                            </button>
                            <button
                                className={`btn ${highlightMode === 'character' ? 'active' : ''}`}
                                onClick={() => setHighlightMode('character')}
                            >
                                🔤 Character
                            </button>
                        </div>
                    </div>

                    <div className="control-group">
                        <label>Options:</label>
                        <div className="checkbox-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={realTimeDiff}
                                    onChange={(e) => setRealTimeDiff(e.target.checked)}
                                />
                                Real-time diff
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={collapseLines}
                                    onChange={(e) => setCollapseLines(e.target.checked)}
                                />
                                Collapse lines
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={ignoreWhitespace}
                                    onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                                />
                                Ignore whitespace
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={ignoreCase}
                                    onChange={(e) => setIgnoreCase(e.target.checked)}
                                />
                                Ignore case
                            </label>
                        </div>
                    </div>

                    <div className="control-group">
                        <label>Tools:</label>
                        <div className="tool-buttons">
                            <button className="btn btn-tool" onClick={convertToLowercase}>
                                🔤 Lowercase
                            </button>
                            <button className="btn btn-tool" onClick={sortLines}>
                                📊 Sort lines
                            </button>
                            <button className="btn btn-tool" onClick={replaceBreaksWithSpaces}>
                                ↔️ Replace breaks
                            </button>
                            <button className="btn btn-tool" onClick={trimWhitespace}>
                                ✂️ Trim whitespace
                            </button>
                        </div>
                    </div>

                    <div className="control-group">
                        <div className="action-buttons">
                            <button className="btn btn-sample" onClick={loadSample}>
                                📄 Load Sample
                            </button>
                            <button className="btn btn-clear" onClick={clearAll}>
                                🗑️ Clear All
                            </button>
                            <button 
                                className="btn btn-copy" 
                                onClick={() => copyToClipboard(generateDiffReport())}
                            >
                                📋 Copy Report
                            </button>
                            <button className="btn btn-export" onClick={exportToPDF}>
                                💾 Save as file
                            </button>
                        </div>
                    </div>
                </div>

                <div className="diff-stats">
                    <div className="stat-item added">
                        <span className="stat-icon">+</span>
                        <span className="stat-value">{stats.added}</span>
                        <span className="stat-label">Added</span>
                    </div>
                    <div className="stat-item removed">
                        <span className="stat-icon">-</span>
                        <span className="stat-value">{stats.removed}</span>
                        <span className="stat-label">Removed</span>
                    </div>
                    <div className="stat-item modified">
                        <span className="stat-icon">~</span>
                        <span className="stat-value">{stats.modified}</span>
                        <span className="stat-label">Modified</span>
                    </div>
                    <div className="stat-item unchanged">
                        <span className="stat-icon">=</span>
                        <span className="stat-value">{stats.unchanged}</span>
                        <span className="stat-label">Unchanged</span>
                    </div>
                </div>

                <div className="diff-input-section">
                    <div className="input-panel">
                        <div className="panel-header">
                            <h3>Original Text</h3>
                            <div className="panel-actions">
                                <input
                                    type="file"
                                    ref={fileInputOriginal}
                                    onChange={(e) => handleFileUpload(e.target.files[0], true)}
                                    style={{ display: 'none' }}
                                    accept=".txt,.js,.css,.html,.json,.xml,.md"
                                />
                                <button
                                    className="btn-icon"
                                    onClick={() => fileInputOriginal.current.click()}
                                    title="Upload file"
                                >
                                    📁
                                </button>
                                <button
                                    className="btn-icon"
                                    onClick={() => copyToClipboard(originalText)}
                                    title="Copy original text"
                                >
                                    📋
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={originalText}
                            onChange={(e) => setOriginalText(e.target.value)}
                            placeholder="Paste or type the original text here..."
                            className="diff-textarea"
                            rows={12}
                        />
                    </div>

                    <div className="input-panel">
                        <div className="panel-header">
                            <h3>Modified Text</h3>
                            <div className="panel-actions">
                                <input
                                    type="file"
                                    ref={fileInputModified}
                                    onChange={(e) => handleFileUpload(e.target.files[0], false)}
                                    style={{ display: 'none' }}
                                    accept=".txt,.js,.css,.html,.json,.xml,.md"
                                />
                                <button
                                    className="btn-icon"
                                    onClick={() => fileInputModified.current.click()}
                                    title="Upload file"
                                >
                                    📁
                                </button>
                                <button
                                    className="btn-icon"
                                    onClick={() => copyToClipboard(modifiedText)}
                                    title="Copy modified text"
                                >
                                    📋
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={modifiedText}
                            onChange={(e) => setModifiedText(e.target.value)}
                            placeholder="Paste or type the modified text here..."
                            className="diff-textarea"
                            rows={12}
                        />
                    </div>
                </div>

                <div className="diff-results">
                    <div className="results-header">
                        <h3>Comparison Results</h3>
                        <div className="legend">
                            <span className="legend-item added">Added</span>
                            <span className="legend-item removed">Removed</span>
                            <span className="legend-item modified">Modified</span>
                            <span className="legend-item unchanged">Unchanged</span>
                        </div>
                    </div>

                    {viewMode === 'side-by-side' ? (
                        <div className="diff-side-by-side">
                            <div className="diff-column">
                                <h4>Original</h4>
                                <div className="diff-content">
                                    {computeDiff.map((line, index) => (
                                        <div 
                                            key={index} 
                                            className={`diff-line ${line.status}`}
                                        >
                                            <span className="line-number">{line.lineNumber}</span>
                                            <span className="line-content">
                                                {renderHighlightedText(line, true)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="diff-column">
                                <h4>Modified</h4>
                                <div className="diff-content">
                                    {computeDiff.map((line, index) => (
                                        <div 
                                            key={index} 
                                            className={`diff-line ${line.status}`}
                                        >
                                            <span className="line-number">{line.lineNumber}</span>
                                            <span className="line-content">
                                                {renderHighlightedText(line, false)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="diff-unified">
                            <div className="diff-content">
                                {computeDiff.map((line, index) => {
                                    if (line.status === 'unchanged') {
                                        return (
                                            <div key={index} className="diff-line unchanged">
                                                <span className="line-number">{line.lineNumber}</span>
                                                <span className="line-prefix"> </span>
                                                <span className="line-content">{line.original}</span>
                                            </div>
                                        );
                                    } else if (line.status === 'modified') {
                                        return (
                                            <React.Fragment key={index}>
                                                <div className="diff-line removed">
                                                    <span className="line-number">{line.lineNumber}</span>
                                                    <span className="line-prefix">-</span>
                                                    <span className="line-content">{line.original}</span>
                                                </div>
                                                <div className="diff-line added">
                                                    <span className="line-number">{line.lineNumber}</span>
                                                    <span className="line-prefix">+</span>
                                                    <span className="line-content">{line.modified}</span>
                                                </div>
                                            </React.Fragment>
                                        );
                                    } else {
                                        return (
                                            <div key={index} className={`diff-line ${line.status}`}>
                                                <span className="line-number">{line.lineNumber}</span>
                                                <span className="line-prefix">
                                                    {line.status === 'added' ? '+' : '-'}
                                                </span>
                                                <span className="line-content">
                                                    {line.status === 'added' ? line.modified : line.original}
                                                </span>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiffChecker;