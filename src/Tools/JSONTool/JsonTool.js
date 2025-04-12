import React, { useState } from 'react';
import './JsonTool.css';
import TreeView from './TreeView';

const JsonTool = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [showTree, setShowTree] = useState(false);

    const formatJSON = () => {
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, 2));
            setError('');
        } catch (err) {
            setError('Invalid JSON: ' + err.message);
            setOutput('');
        }
    };

    const minifyJSON = () => {
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setError('');
        } catch (err) {
            setError('Invalid JSON: ' + err.message);
            setOutput('');
        }
    };

    const validateJSON = () => {
        try {
            JSON.parse(input);
            setError('JSON is valid!');
        } catch (err) {
            setError('Invalid JSON: ' + err.message);
        }
    };

    const downloadJSON = () => {
        const contentToDownload = output || input;
        if (!contentToDownload) {
            setError('No content to download');
            return;
        }
        const blob = new Blob([contentToDownload], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'formatted.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const viewTree = () => {
        try {
            JSON.parse(input); // just validate the JSON
            setOutput('');
            setShowTree(true);
            setError('');
        } catch (err) {
            setError('Invalid JSON: ' + err.message);
            setShowTree(false);
        }
    };

    return (
        <div className="json-tool">
            <h2 className="section-title">JSON Tool</h2>
            <div className="tool-container">
                <div className="input-section">
                    <h3>Input JSON</h3>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste your JSON here..."
                        className="full-width-input"
                    />
                </div>
                
                <div className="actions">
                    <button onClick={validateJSON}>Validate</button>
                    <button onClick={formatJSON}>Beautify</button>
                    <button onClick={minifyJSON}>Minify</button>
                    <button onClick={downloadJSON}>Download</button>
                    <button onClick={viewTree}>View Tree</button>
                </div>

                {error && <div className="error-message">{error}</div>}
                
                {showTree && !error && (
                    <div className="tree-view-section">
                        <h3>Tree View</h3>
                        <TreeView data={JSON.parse(input)} />
                    </div>
                )}

                {output && (
                    <div className="output-section">
                        <h3>Output</h3>
                        <pre className="auto-height">{output}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JsonTool;
