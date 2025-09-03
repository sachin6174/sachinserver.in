import React, { useState, useRef } from 'react';
import './CSVTool.css';
import { Button, Textarea } from '../../ui';

const CSVTool = () => {
    const [csvData, setCsvData] = useState('');
    const [jsonData, setJsonData] = useState('');
    const [parsedData, setParsedData] = useState([]);
    const [activeTab, setActiveTab] = useState('csv');
    const [delimiter, setDelimiter] = useState(',');
    const [hasHeader, setHasHeader] = useState(true);
    const [error, setError] = useState('');
    const [validationResults, setValidationResults] = useState(null);
    const fileInputRef = useRef(null);

    // Parse CSV to JSON
    const parseCSVToJSON = () => {
        try {
            setError('');
            const lines = csvData.trim().split('\n');
            if (lines.length === 0) {
                setError('No data to parse');
                return;
            }

            const parseCSVLine = (line) => {
                const result = [];
                let current = '';
                let inQuotes = false;

                for (let i = 0; i < line.length; i++) {
                    const char = line[i];
                    const nextChar = line[i + 1];

                    if (char === '"') {
                        if (inQuotes && nextChar === '"') {
                            current += '"';
                            i++; // Skip next quote
                        } else {
                            inQuotes = !inQuotes;
                        }
                    } else if (char === delimiter && !inQuotes) {
                        result.push(current.trim());
                        current = '';
                    } else {
                        current += char;
                    }
                }
                result.push(current.trim());
                return result;
            };

            const headers = hasHeader ? parseCSVLine(lines[0]) : [];
            const dataLines = hasHeader ? lines.slice(1) : lines;

            const jsonResult = dataLines.map((line, index) => {
                const values = parseCSVLine(line);
                if (hasHeader) {
                    const obj = {};
                    headers.forEach((header, i) => {
                        obj[header] = values[i] || '';
                    });
                    return obj;
                } else {
                    return values;
                }
            });

            setParsedData(jsonResult);
            setJsonData(JSON.stringify(jsonResult, null, 2));
            validateData(jsonResult);
        } catch (err) {
            setError(`Parse error: ${err.message}`);
        }
    };

    // Convert JSON to CSV
    const parseJSONToCSV = () => {
        try {
            setError('');
            const data = JSON.parse(jsonData);

            if (!Array.isArray(data)) {
                setError('JSON must be an array of objects');
                return;
            }

            if (data.length === 0) {
                setCsvData('');
                return;
            }

            // Get all unique keys for headers
            const allKeys = [...new Set(data.flatMap(obj =>
                typeof obj === 'object' && obj !== null ? Object.keys(obj) : []
            ))];

            const escapeCSVField = (field) => {
                if (field === null || field === undefined) return '';
                const str = String(field);
                if (str.includes(delimiter) || str.includes('"') || str.includes('\n')) {
                    return `"${str.replace(/"/g, '""')}"`;
                }
                return str;
            };

            let csv = '';

            // Add headers if enabled
            if (hasHeader && allKeys.length > 0) {
                csv += allKeys.map(escapeCSVField).join(delimiter) + '\n';
            }

            // Add data rows
            data.forEach(row => {
                if (typeof row === 'object' && row !== null) {
                    const values = allKeys.map(key => escapeCSVField(row[key]));
                    csv += values.join(delimiter) + '\n';
                } else if (Array.isArray(row)) {
                    csv += row.map(escapeCSVField).join(delimiter) + '\n';
                } else {
                    csv += escapeCSVField(row) + '\n';
                }
            });

            setCsvData(csv.trim());
            setParsedData(data);
            validateData(data);
        } catch (err) {
            setError(`JSON parse error: ${err.message}`);
        }
    };

    // Validate data
    const validateData = (data) => {
        const results = {
            totalRows: data.length,
            emptyRows: 0,
            inconsistentColumns: 0,
            duplicateRows: 0,
            dataTypes: {}
        };

        const seenRows = new Set();
        const columnCounts = {};

        data.forEach((row, index) => {
            // Check for empty rows
            if (Array.isArray(row)) {
                if (row.every(cell => !cell || cell.trim() === '')) {
                    results.emptyRows++;
                }
                columnCounts[row.length] = (columnCounts[row.length] || 0) + 1;
            } else if (typeof row === 'object' && row !== null) {
                const values = Object.values(row);
                if (values.every(cell => !cell || (typeof cell === 'string' && cell.trim() === ''))) {
                    results.emptyRows++;
                }
                const colCount = Object.keys(row).length;
                columnCounts[colCount] = (columnCounts[colCount] || 0) + 1;
            }

            // Check for duplicates
            const rowStr = JSON.stringify(row);
            if (seenRows.has(rowStr)) {
                results.duplicateRows++;
            } else {
                seenRows.add(rowStr);
            }
        });

        // Check column consistency
        const columnCountKeys = Object.keys(columnCounts);
        if (columnCountKeys.length > 1) {
            results.inconsistentColumns = data.length - Math.max(...Object.values(columnCounts));
        }

        setValidationResults(results);
    };

    // File upload handler
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                if (file.name.endsWith('.csv')) {
                    setCsvData(content);
                    setActiveTab('csv');
                } else if (file.name.endsWith('.json')) {
                    setJsonData(content);
                    setActiveTab('json');
                }
            };
            reader.readAsText(file);
        }
    };

    // Download file
    const downloadFile = (content, filename, mimeType) => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="csv-tool">
            <div className="tool-container">
                {/* File Upload Section */}
                <div className="upload-section">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept=".csv,.json"
                        className="file-input"
                    />
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                        📁 Upload File
                    </Button>
                </div>

                {/* Settings */}
                <div className="settings-section">
                    <div className="setting-group">
                        <label>Delimiter:</label>
                        <select
                            value={delimiter}
                            onChange={(e) => setDelimiter(e.target.value)}
                            className="tool-select"
                        >
                            <option value=",">Comma (,)</option>
                            <option value=";">Semicolon (;)</option>
                            <option value="\t">Tab</option>
                            <option value="|">Pipe (|)</option>
                        </select>
                    </div>
                    <div className="setting-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={hasHeader}
                                onChange={(e) => setHasHeader(e.target.checked)}
                            />
                            Has Header Row
                        </label>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="tab-nav">
                    <Button size="sm" variant={activeTab === 'csv' ? 'solid' : 'outline'} className="tab-btn" onClick={() => setActiveTab('csv')}>📄 CSV</Button>
                    <Button size="sm" variant={activeTab === 'json' ? 'solid' : 'outline'} className="tab-btn" onClick={() => setActiveTab('json')}>🔧 JSON</Button>
                    <Button size="sm" variant={activeTab === 'table' ? 'solid' : 'outline'} className="tab-btn" onClick={() => setActiveTab('table')}>📊 Table View</Button>
                </div>

                {/* Content Areas */}
                <div className="content-area">
                    {activeTab === 'csv' && (
                        <div className="csv-section">
                            <div className="section-header">
                                <h3>CSV Data</h3>
                                <div className="action-buttons">
                                    <Button onClick={parseCSVToJSON} disabled={!csvData.trim()}>
                                        ➡️ Convert to JSON
                                    </Button>
                                    <Button variant="outline" onClick={() => downloadFile(csvData, 'data.csv', 'text/csv')} disabled={!csvData.trim()}>
                                        💾 Download CSV
                                    </Button>
                                </div>
                            </div>
                            <Textarea
                                value={csvData}
                                onChange={(e) => setCsvData(e.target.value)}
                                placeholder="Paste your CSV data here or upload a file..."
                                rows={12}
                            />
                        </div>
                    )}

                    {activeTab === 'json' && (
                        <div className="json-section">
                            <div className="section-header">
                                <h3>JSON Data</h3>
                                <div className="action-buttons">
                                    <Button onClick={parseJSONToCSV} disabled={!jsonData.trim()}>
                                        ⬅️ Convert to CSV
                                    </Button>
                                    <Button variant="outline" onClick={() => downloadFile(jsonData, 'data.json', 'application/json')} disabled={!jsonData.trim()}>
                                        💾 Download JSON
                                    </Button>
                                </div>
                            </div>
                            <Textarea
                                value={jsonData}
                                onChange={(e) => setJsonData(e.target.value)}
                                placeholder="Paste your JSON data here or upload a file..."
                                rows={12}
                            />
                        </div>
                    )}

                    {activeTab === 'table' && (
                        <div className="table-section">
                            <div className="section-header">
                                <h3>Table View</h3>
                                <span className="data-count">
                                    {parsedData.length} rows
                                </span>
                            </div>
                            {parsedData.length > 0 ? (
                                <div className="table-container">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                {typeof parsedData[0] === 'object' && parsedData[0] !== null
                                                    ? Object.keys(parsedData[0]).map((key, index) => (
                                                        <th key={index}>{key}</th>
                                                    ))
                                                    : Array.isArray(parsedData[0])
                                                        ? parsedData[0].map((_, index) => (
                                                            <th key={index}>Column {index + 1}</th>
                                                        ))
                                                        : <th>Value</th>
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {parsedData.slice(0, 100).map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    {typeof row === 'object' && row !== null
                                                        ? Object.values(row).map((value, colIndex) => (
                                                            <td key={colIndex}>{String(value)}</td>
                                                        ))
                                                        : Array.isArray(row)
                                                            ? row.map((value, colIndex) => (
                                                                <td key={colIndex}>{String(value)}</td>
                                                            ))
                                                            : <td>{String(row)}</td>
                                                    }
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {parsedData.length > 100 && (
                                        <p className="table-note">Showing first 100 rows of {parsedData.length} total rows</p>
                                    )}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <p>No data to display. Convert CSV or JSON data first.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Error Display */}
                {error && (
                    <div className="error-message">
                        <span className="error-icon">❌</span>
                        {error}
                    </div>
                )}

                {/* Validation Results */}
                {validationResults && (
                    <div className="validation-section">
                        <h3>📊 Data Validation Results</h3>
                        <div className="validation-grid">
                            <div className="validation-item">
                                <span className="validation-label">Total Rows:</span>
                                <span className="validation-value">{validationResults.totalRows}</span>
                            </div>
                            <div className="validation-item">
                                <span className="validation-label">Empty Rows:</span>
                                <span className={`validation-value ${validationResults.emptyRows > 0 ? 'warning' : 'success'}`}>
                                    {validationResults.emptyRows}
                                </span>
                            </div>
                            <div className="validation-item">
                                <span className="validation-label">Inconsistent Columns:</span>
                                <span className={`validation-value ${validationResults.inconsistentColumns > 0 ? 'warning' : 'success'}`}>
                                    {validationResults.inconsistentColumns}
                                </span>
                            </div>
                            <div className="validation-item">
                                <span className="validation-label">Duplicate Rows:</span>
                                <span className={`validation-value ${validationResults.duplicateRows > 0 ? 'warning' : 'success'}`}>
                                    {validationResults.duplicateRows}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CSVTool;
