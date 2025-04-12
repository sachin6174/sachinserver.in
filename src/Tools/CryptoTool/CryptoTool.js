import React, { useState } from 'react';
import './CryptoTool.css';

const CryptoTool = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [method, setMethod] = useState('encode');
    const [algorithm, setAlgorithm] = useState('base64');

    const handleEncryption = () => {
        try {
            if (!input) return;

            let result = '';
            if (algorithm === 'base64') {
                result = method === 'encode' 
                    ? btoa(input)
                    : atob(input);
            }
            
            setOutput(result);
        } catch (err) {
            setOutput('Error: Invalid input for selected method');
        }
    };

    return (
        <div className="crypto-tool">
            <h2>Crypto Tool</h2>
            <div className="tool-container">
                <div className="control-panel">
                    <select 
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="method-select"
                    >
                        <option value="encode">Encode</option>
                        <option value="decode">Decode</option>
                    </select>
                    <select 
                        value={algorithm}
                        onChange={(e) => setAlgorithm(e.target.value)}
                        className="algorithm-select"
                    >
                        <option value="base64">Base64</option>
                    </select>
                </div>

                <div className="input-section">
                    <h3>Input Text</h3>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter text to process..."
                    />
                </div>
                
                <button onClick={handleEncryption}>Process</button>

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

export default CryptoTool;
