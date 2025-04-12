import React, { useState } from 'react';
import './JsonTool.css';

const JsonTool = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

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
            setOutput('');
        } catch (err) {
            setError('Invalid JSON: ' + err.message);
            setOutput('');
        }
    };

    const downloadJSON = () => {
        if (!output) return;
        const blob = new Blob([output], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'formatted.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="json-tool">
            <h2>JSON Tool</h2>
            <div className="tool-container">
                <div className="input-section">
                    <h3>Input JSON</h3>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste your JSON here..."
                    />
                </div>
                
                <div className="actions">
                    <button onClick={formatJSON}>Format</button>
                    <button onClick={minifyJSON}>Minify</button>
                    <button onClick={validateJSON}>Validate</button>
                    {output && <button onClick={downloadJSON}>Download</button>}
                </div>

                {error && <div className="error-message">{error}</div>}
                
                {output && (
                    <div className="output-section">
                        <h3>Output</h3>
                        <pre>{output}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JsonTool;
