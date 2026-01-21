import React, { useState, useEffect } from 'react';
import './OnlineClipboard.css';

const API_URL = '/api/clipboard';

const OnlineClipboard = () => {
    const [sendData, setSendData] = useState('');
    const [generatedCode, setGeneratedCode] = useState(null);
    const [expiryTime, setExpiryTime] = useState(null);
    const [receiveCode, setReceiveCode] = useState('');
    const [receivedData, setReceivedData] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [serverStatus, setServerStatus] = useState(false);

    useEffect(() => {
        checkServer();
        const interval = setInterval(checkServer, 5000);
        return () => clearInterval(interval);
    }, []);

    const checkServer = async () => {
        try {
            // Just a ping check (POST with invalid data to check 400 or just connectivity)
            // Or we can assume if fetch doesn't throw network error, it's up.
            // Better: Create a health endpoint in future. For now, we trust.
            // Actually, let's just use the fact that we can reach it.
            await fetch(API_URL.replace('/api/clipboard', ''), { method: 'HEAD', mode: 'no-cors' });
            setServerStatus(true);
        } catch (e) {
            setServerStatus(false);
        }
    };

    const handleGenerate = async () => {
        if (!sendData.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: sendData })
            });
            const json = await res.json();
            if (res.ok) {
                setGeneratedCode(json.code);
                setExpiryTime(json.expiresAt);
            } else {
                setError(json.error || 'Failed to generate code');
            }
        } catch (err) {
            setError('Could not connect to server. Ensure server is running on port 3001.');
        } finally {
            setLoading(false);
        }
    };

    const handleRetrieve = async () => {
        if (!receiveCode.trim()) return;
        setLoading(true);
        setError(null);
        setReceivedData('');
        try {
            const res = await fetch(`${API_URL}/${receiveCode}`);
            const json = await res.json();
            if (res.ok) {
                setReceivedData(json.data);
            } else {
                setError(json.error || 'Failed to retrieve data');
            }
        } catch (err) {
            setError('Could not connect to server.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // Could add toast here
    };

    return (
        <div className="online-clipboard-container">
            <div className="clipboard-header">
                <h2>Online Clipboard</h2>
                <p>Share text between devices instantly. Data persists for 10 minutes.</p>
                <div className="server-status">
                    <span className={`status-dot ${serverStatus ? '' : 'offline'}`}></span>
                    {serverStatus ? 'Server Online' : 'Server Offline (Run: node server/server.js)'}
                </div>
            </div>

            {error && (
                <div style={{
                    padding: '10px',
                    background: '#fee2e2',
                    color: '#dc2626',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    {error}
                </div>
            )}

            <div className="clipboard-grid">
                {/* Sender Side */}
                <div className="clipboard-card">
                    <div className="card-title">
                        <span>📤</span> Send Data
                    </div>
                    <textarea
                        className="clipboard-textarea"
                        placeholder="Paste your text here..."
                        value={sendData}
                        onChange={(e) => setSendData(e.target.value)}
                    />
                    <button
                        className="action-btn"
                        onClick={handleGenerate}
                        disabled={loading || !sendData}
                    >
                        {loading ? 'Generating...' : 'Generate Code'}
                    </button>

                    {generatedCode && (
                        <div className="code-display">
                            <div className="label">SHARE THIS CODE</div>
                            <div className="code">{generatedCode}</div>
                            <div className="hint">
                                Expires in {Math.ceil((expiryTime - Date.now()) / 60000)} min
                            </div>
                        </div>
                    )}
                </div>

                {/* Receiver Side */}
                <div className="clipboard-card">
                    <div className="card-title">
                        <span>📥</span> Receive Data
                    </div>
                    <input
                        type="text"
                        className="code-input"
                        placeholder="CODE"
                        maxLength={4}
                        value={receiveCode}
                        onChange={(e) => setReceiveCode(e.target.value.toUpperCase())}
                    />
                    <button
                        className="action-btn"
                        onClick={handleRetrieve}
                        disabled={loading || !receiveCode}
                    >
                        {loading ? 'Retrieving...' : 'Get Data'}
                    </button>

                    {receivedData && (
                        <div style={{ marginTop: '20px' }}>
                            <textarea
                                className="clipboard-textarea"
                                readOnly
                                value={receivedData}
                            />
                            <button
                                className="action-btn"
                                style={{ background: '#4b5563' }}
                                onClick={() => copyToClipboard(receivedData)}
                            >
                                Copy to Clipboard
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OnlineClipboard;
