import React, { useState } from 'react';
import './APITool.css';

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
            <div className="request-section">
                <div className="url-line">
                    <select value={method} onChange={(e) => setMethod(e.target.value)}>
                        <option>GET</option>
                        <option>POST</option>
                        <option>PUT</option>
                        <option>DELETE</option>
                        <option>PATCH</option>
                        <option>HEAD</option>
                        <option>OPTIONS</option>
                    </select>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter URL"
                        className="url-input"
                    />
                    <button onClick={sendRequest} disabled={loading || !url}>
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </div>

                <div className="headers-section">
                    <h3>Headers</h3>
                    {headers.map((header, index) => (
                        <div key={index} className="header-line">
                            <input
                                type="text"
                                placeholder="Header key"
                                value={header.key}
                                onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Header value"
                                value={header.value}
                                onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                            />
                            <button onClick={() => removeHeader(index)}>×</button>
                        </div>
                    ))}
                    <button onClick={addHeader}>Add Header</button>
                </div>

                {['POST', 'PUT', 'PATCH'].includes(method) && (
                    <div className="body-section">
                        <h3>Request Body</h3>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Enter request body (JSON)"
                        />
                    </div>
                )}
            </div>

            {error && <div className="error-message">{error}</div>}

            {response && (
                <div className="response-section">
                    <h3>Response</h3>
                    <div className="response-meta">
                        <span>Status: {response.status} {response.statusText}</span>
                    </div>
                    <div className="response-headers">
                        <h4>Response Headers:</h4>
                        <pre>{JSON.stringify(response.headers, null, 2)}</pre>
                    </div>
                    <div className="response-body">
                        <h4>Response Body:</h4>
                        <pre>{formatResponse(response.body)}</pre>
                    </div>
                </div>
            )}

            {history.length > 0 && (
                <div className="history-section">
                    <h3>Request History</h3>
                    {history.map((item, index) => (
                        <div key={index} className="history-item" onClick={() => loadFromHistory(item)}>
                            <span className="history-method">{item.method}</span>
                            <span className="history-url">{item.url}</span>
                            <span className="history-status">{item.response.status}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default APITool;
