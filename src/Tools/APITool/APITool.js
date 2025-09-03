import React, { useState } from 'react';
import './APITool.css';
import { Button, Textarea } from '../../ui';

const APITool = () => {
    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('');
    const [headers, setHeaders] = useState([{ key: '', value: '' }]);
    const [body, setBody] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);

    const handleHeaderChange = (index, field, value) => {
        const newHeaders = [...headers];
        newHeaders[index][field] = value;
        setHeaders(newHeaders);
    };

    const addHeader = () => {
        setHeaders([...headers, { key: '', value: '' }]);
    };

    const removeHeader = (index) => {
        setHeaders(headers.filter((_, i) => i !== index));
    };

    const formatResponse = (response) => {
        try {
            return JSON.stringify(JSON.parse(response), null, 2);
        } catch {
            return response;
        }
    };

    const sendRequest = async () => {
        setLoading(true);
        setError(null);
        try {
            const headerObject = headers.reduce((acc, h) => {
                if (h.key && h.value) acc[h.key] = h.value;
                return acc;
            }, {});

            const requestOptions = {
                method,
                headers: headerObject,
            };

            if (['POST', 'PUT', 'PATCH'].includes(method) && body) {
                requestOptions.body = body;
            }

            const response = await fetch(url, requestOptions);
            const responseText = await response.text();
            const responseData = {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers),
                body: responseText
            };

            setResponse(responseData);
            setHistory([{ method, url, response: responseData }, ...history.slice(0, 9)]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const loadFromHistory = (item) => {
        setMethod(item.method);
        setUrl(item.url);
        setResponse(item.response);
    };

    return (
        <div className="api-tool">
            {error && (
                <div className="error-message">
                    <span>❌</span>
                    {error}
                </div>
            )}

            <div className="request-controls">
                <div className="request-section">
                    <h3>Request Configuration</h3>

                    <div className="url-section">
                        <div className="method-url-container">
                            <select
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                                className="method-select"
                            >
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                                <option value="DELETE">DELETE</option>
                                <option value="PATCH">PATCH</option>
                                <option value="HEAD">HEAD</option>
                                <option value="OPTIONS">OPTIONS</option>
                            </select>
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://api.example.com/endpoint"
                                className="url-input"
                            />
                        </div>
                    </div>

                    <div className="headers-section">
                        <h4>Headers</h4>
                        {headers.map((header, index) => (
                            <div key={index} className="header-row">
                                <input
                                    type="text"
                                    placeholder="Header key (e.g., Content-Type)"
                                    value={header.key}
                                    onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                                    className="header-input"
                                />
                                <input
                                    type="text"
                                    placeholder="Header value (e.g., application/json)"
                                    value={header.value}
                                    onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                                    className="header-input"
                                />
                                <Button size="sm" variant="outline" onClick={() => removeHeader(index)}>
                                    🗑️ Remove
                                </Button>
                            </div>
                        ))}
                        <Button size="sm" onClick={addHeader}>➕ Add Header</Button>
                    </div>

                    {['POST', 'PUT', 'PATCH'].includes(method) && (
                        <div className="body-section">
                            <h4>Request Body</h4>
                            <Textarea
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder='{"key": "value"}'
                                rows={8}
                            />
                        </div>
                    )}
                </div>

                <div className="action-section">
                    <div className="control-buttons">
                        <Button onClick={sendRequest} disabled={loading || !url} loading={loading}>
                            🚀 Send Request
                        </Button>
                    </div>
                </div>
            </div>

            {response && (
                <div className="response-section">
                    <h3>📥 Response</h3>
                    <div className="response-status">
                        <div className={`status-badge status-${Math.floor(response.status / 100)}`}>
                            {response.status} {response.statusText}
                        </div>
                    </div>

                    <div className="response-content">
                        <div className="response-headers">
                            <h4>Response Headers</h4>
                            <pre className="response-data">{JSON.stringify(response.headers, null, 2)}</pre>
                        </div>
                        <div className="response-body">
                            <h4>Response Body</h4>
                            <pre className="response-data">{formatResponse(response.body)}</pre>
                        </div>
                    </div>
                </div>
            )}

            {history.length > 0 && (
                <div className="history-section">
                    <h3>📜 Request History ({history.length})</h3>
                    <div className="history-list">
                        {history.map((item, index) => (
                            <div
                                key={index}
                                className="history-item"
                                role="button"
                                tabIndex={0}
                                onClick={() => loadFromHistory(item)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); loadFromHistory(item); } }}
                            >
                                <div className="history-info">
                                    <div className="history-name">
                                        <span className="method-icon">{item.method}</span>
                                        <span className="history-url">{item.url}</span>
                                    </div>
                                    <div className="history-details">
                                        <span className={`status-badge status-${Math.floor(item.response.status / 100)}`}>
                                            {item.response.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default APITool;
