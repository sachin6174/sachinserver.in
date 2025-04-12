import React, { useState } from 'react';
import './CryptoTool.css';

class EncryptionLog {
    static async finalEncryptionWithStringToEncrypt(stringToEncrypt) {
        // Implement your encryption logic here
        return btoa(stringToEncrypt); // Example: simple Base64 encoding
    }
}

class DecryptionLog {
    static async finalDecryptionWithEncryptedString(encryptedString) {
        // Implement your decryption logic here
        return atob(encryptedString); // Example: simple Base64 decoding
    }
}

const CryptoTool = () => {
    const [textInput, setTextInput] = useState('');
    const [textOutput, setTextOutput] = useState('');
    const [file, setFile] = useState(null);
    const [fileOutput, setFileOutput] = useState(null);
    const [method, setMethod] = useState('encrypt');

    const handleTextProcess = async () => {
        try {
            if (!textInput) return;
            const result = method === 'encrypt' 
                ? await EncryptionLog.finalEncryptionWithStringToEncrypt(textInput)
                : await DecryptionLog.finalDecryptionWithEncryptedString(textInput);
            setTextOutput(result);
        } catch (err) {
            setTextOutput('Error: Invalid input for selected method');
        }
    };

    const handleFileProcess = async () => {
        if (!file) return;
        try {
            const text = await file.text();
            const result = method === 'encrypt'
                ? await EncryptionLog.finalEncryptionWithStringToEncrypt(text)
                : await DecryptionLog.finalDecryptionWithEncryptedString(text);
            
            const blob = new Blob([result], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            setFileOutput(url);
        } catch (err) {
            alert('Error processing file');
        }
    };

    return (
        <div className="crypto-tool">
            <h2>Crypto Tool</h2>
            <div className="mode-selector">
                <button 
                    className={method === 'encrypt' ? 'active' : ''} 
                    onClick={() => setMethod('encrypt')}
                >
                    Encrypt
                </button>
                <button 
                    className={method === 'decrypt' ? 'active' : ''} 
                    onClick={() => setMethod('decrypt')}
                >
                    Decrypt
                </button>
            </div>

            <div className="sections-container">
                <section className="text-section">
                    <h3>Text {method === 'encrypt' ? 'Encryption' : 'Decryption'}</h3>
                    <textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder={`Enter text to ${method}...`}
                    />
                    <button onClick={handleTextProcess}>Process Text</button>
                    {textOutput && (
                        <div className="output-section">
                            <h4>Output</h4>
                            <pre>{textOutput}</pre>
                        </div>
                    )}
                </section>

                <section className="file-section">
                    <h3>File {method === 'encrypt' ? 'Encryption' : 'Decryption'}</h3>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button onClick={handleFileProcess} disabled={!file}>
                        Process File
                    </button>
                    {fileOutput && (
                        <div className="output-section">
                            <h4>Processed File</h4>
                            <a 
                                href={fileOutput}
                                download={`${method}ed_${file?.name || 'file'}`}
                                className="download-link"
                            >
                                Download Processed File
                            </a>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default CryptoTool;
