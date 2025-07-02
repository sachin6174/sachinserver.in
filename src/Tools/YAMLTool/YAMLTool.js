import React, { useState, useCallback, useRef } from 'react';
import './YAMLTool.css';

const YAMLTool = () => {
    const [yamlInput, setYamlInput] = useState('');
    const [jsonOutput, setJsonOutput] = useState('');
    const [convertedYaml, setConvertedYaml] = useState('');
    const [validationResult, setValidationResult] = useState(null);
    const [activeTab, setActiveTab] = useState('yaml-to-json');
    const [isLoading, setIsLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    // Simple YAML parser (basic implementation)
    const parseYAML = (yamlStr) => {
        try {
            const lines = yamlStr.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
            const result = {};
            let currentIndent = 0;
            let currentPath = [];

            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed) continue;

                const indent = line.length - line.trimStart().length;

                if (trimmed.includes(':')) {
                    const [key, ...valueParts] = trimmed.split(':');
                    const value = valueParts.join(':').trim();

                    // Adjust path based on indentation
                    if (indent > currentIndent) {
                        // Going deeper
                    } else if (indent < currentIndent) {
                        // Going back up
                        const levels = (currentIndent - indent) / 2;
                        currentPath = currentPath.slice(0, -levels);
                    } else if (indent === currentIndent && currentPath.length > 0) {
                        // Same level, pop last key
                        currentPath.pop();
                    }

                    currentPath.push(key.trim());
                    currentIndent = indent;

                    // Set value in result object
                    let current = result;
                    for (let i = 0; i < currentPath.length - 1; i++) {
                        if (!current[currentPath[i]]) {
                            current[currentPath[i]] = {};
                        }
                        current = current[currentPath[i]];
                    }

                    const finalKey = currentPath[currentPath.length - 1];
                    if (value) {
                        // Parse value type
                        if (value === 'true' || value === 'false') {
                            current[finalKey] = value === 'true';
                        } else if (!isNaN(value) && value !== '') {
                            current[finalKey] = parseFloat(value);
                        } else if (value.startsWith('"') && value.endsWith('"')) {
                            current[finalKey] = value.slice(1, -1);
                        } else if (value.startsWith("'") && value.endsWith("'")) {
                            current[finalKey] = value.slice(1, -1);
                        } else {
                            current[finalKey] = value;
                        }
                    } else {
                        current[finalKey] = {};
                    }
                }
            }

            return result;
        } catch (error) {
            throw new Error(`YAML parsing error: ${error.message}`);
        }
    };

    // Convert JSON to YAML
    const jsonToYAML = useCallback((obj, indent = 0) => {
        const spaces = '  '.repeat(indent);
        let yaml = '';

        for (const [key, value] of Object.entries(obj)) {
            if (value === null || value === undefined) {
                yaml += `${spaces}${key}: null\n`;
            } else if (typeof value === 'object' && !Array.isArray(value)) {
                yaml += `${spaces}${key}:\n`;
                yaml += jsonToYAML(value, indent + 1);
            } else if (Array.isArray(value)) {
                yaml += `${spaces}${key}:\n`;
                for (const item of value) {
                    if (typeof item === 'object') {
                        yaml += `${spaces}  -\n`;
                        yaml += jsonToYAML(item, indent + 2);
                    } else {
                        yaml += `${spaces}  - ${item}\n`;
                    }
                }
            } else if (typeof value === 'string') {
                yaml += `${spaces}${key}: "${value}"\n`;
            } else {
                yaml += `${spaces}${key}: ${value}\n`;
            }
        }

        return yaml;
    }, []);

    const handleYamlToJson = useCallback(() => {
        if (!yamlInput.trim()) {
            setValidationResult({ type: 'error', message: 'Please enter YAML content' });
            return;
        }

        setIsLoading(true);
        try {
            const parsed = parseYAML(yamlInput);
            setJsonOutput(JSON.stringify(parsed, null, 2));
            setValidationResult({ type: 'success', message: 'YAML successfully converted to JSON' });
        } catch (error) {
            setValidationResult({ type: 'error', message: error.message });
            setJsonOutput('');
        } finally {
            setIsLoading(false);
        }
    }, [yamlInput]);

    const handleJsonToYaml = useCallback(() => {
        if (!yamlInput.trim()) {
            setValidationResult({ type: 'error', message: 'Please enter JSON content' });
            return;
        }

        setIsLoading(true);
        try {
            const parsed = JSON.parse(yamlInput);
            const yaml = jsonToYAML(parsed);
            setConvertedYaml(yaml);
            setValidationResult({ type: 'success', message: 'JSON successfully converted to YAML' });
        } catch (error) {
            setValidationResult({ type: 'error', message: `JSON parsing error: ${error.message}` });
            setConvertedYaml('');
        } finally {
            setIsLoading(false);
        }
    }, [yamlInput, jsonToYAML]);

    const handleValidate = useCallback(() => {
        if (!yamlInput.trim()) {
            setValidationResult({ type: 'error', message: 'Please enter YAML content' });
            return;
        }

        setIsLoading(true);
        try {
            parseYAML(yamlInput);
            setValidationResult({
                type: 'success',
                message: 'YAML is valid ✓',
                details: `Lines: ${yamlInput.split('\n').length}, Characters: ${yamlInput.length}`
            });
        } catch (error) {
            setValidationResult({ type: 'error', message: error.message });
        } finally {
            setIsLoading(false);
        }
    }, [yamlInput]);

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setYamlInput(e.target.result);
            setValidationResult({ type: 'info', message: `File "${file.name}" loaded successfully` });
        };
        reader.readAsText(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const downloadFile = (content, filename, type = 'text/plain') => {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setValidationResult({ type: 'success', message: 'Copied to clipboard!' });
        });
    };

    const loadSample = () => {
        const sampleYAML = `# Sample YAML Configuration
app:
  name: "My Application"
  version: 1.2.3
  debug: true
  
database:
  host: "localhost"
  port: 5432
  name: "myapp_db"
  credentials:
    username: "admin"
    password: "secret123"
    
features:
  - authentication
  - logging
  - monitoring
  
servers:
  - name: "web-01"
    ip: "192.168.1.10"
    status: active
  - name: "web-02"
    ip: "192.168.1.11"
    status: maintenance`;

        setYamlInput(sampleYAML);
        setValidationResult({ type: 'info', message: 'Sample YAML loaded' });
    };

    const clearAll = () => {
        setYamlInput('');
        setJsonOutput('');
        setConvertedYaml('');
        setValidationResult(null);
    };

    return (
        <div className="tools-container">
            <div className="tool-header">
                <div className="tool-header-content">
                    <h1 className="tool-title">YAML Tool</h1>
                    <p className="tool-subtitle">Convert, validate, and format YAML/JSON data with ease</p>
                </div>
            </div>

            <div className="yaml-tool">
                <div className="tool-tabs">
                    <button
                        className={`tool-tab ${activeTab === 'yaml-to-json' ? 'active' : ''}`}
                        onClick={() => setActiveTab('yaml-to-json')}
                    >
                        YAML → JSON
                    </button>
                    <button
                        className={`tool-tab ${activeTab === 'json-to-yaml' ? 'active' : ''}`}
                        onClick={() => setActiveTab('json-to-yaml')}
                    >
                        JSON → YAML
                    </button>
                    <button
                        className={`tool-tab ${activeTab === 'validate' ? 'active' : ''}`}
                        onClick={() => setActiveTab('validate')}
                    >
                        Validate
                    </button>
                </div>

                <div className="tool-controls">
                    <div className="control-group">
                        <button
                            className="btn btn-sample"
                            onClick={loadSample}
                        >
                            📄 Load Sample
                        </button>
                        <button
                            className="btn btn-upload"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            📁 Upload File
                        </button>
                        <button
                            className="btn btn-clear"
                            onClick={clearAll}
                        >
                            🗑️ Clear All
                        </button>
                    </div>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
                    accept=".yaml,.yml,.json"
                    style={{ display: 'none' }}
                />

                <div className="yaml-content">
                    <div className="input-section">
                        <div className="section-header">
                            <h3>
                                {activeTab === 'json-to-yaml' ? 'JSON Input' : 'YAML Input'}
                            </h3>
                            <div className="header-actions">
                                <button
                                    className="btn-icon"
                                    onClick={() => copyToClipboard(yamlInput)}
                                    title="Copy to clipboard"
                                >
                                    📋
                                </button>
                            </div>
                        </div>
                        <div
                            className={`textarea-container ${isDragging ? 'dragging' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <textarea
                                value={yamlInput}
                                onChange={(e) => setYamlInput(e.target.value)}
                                placeholder={activeTab === 'json-to-yaml'
                                    ? 'Enter JSON here...'
                                    : 'Enter YAML here or drag & drop a file...'
                                }
                                className="yaml-textarea"
                                rows={15}
                            />
                            {isDragging && (
                                <div className="drag-overlay">
                                    <div className="drag-message">
                                        Drop your file here
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="input-stats">
                            Lines: {yamlInput.split('\n').length} |
                            Characters: {yamlInput.length}
                        </div>
                    </div>

                    <div className="conversion-section">
                        <div className="conversion-controls">
                            {activeTab === 'yaml-to-json' && (
                                <button
                                    className="btn btn-primary btn-convert"
                                    onClick={handleYamlToJson}
                                    disabled={isLoading || !yamlInput.trim()}
                                >
                                    {isLoading ? '⏳ Converting...' : '🔄 Convert to JSON'}
                                </button>
                            )}
                            {activeTab === 'json-to-yaml' && (
                                <button
                                    className="btn btn-primary btn-convert"
                                    onClick={handleJsonToYaml}
                                    disabled={isLoading || !yamlInput.trim()}
                                >
                                    {isLoading ? '⏳ Converting...' : '🔄 Convert to YAML'}
                                </button>
                            )}
                            {activeTab === 'validate' && (
                                <button
                                    className="btn btn-primary btn-convert"
                                    onClick={handleValidate}
                                    disabled={isLoading || !yamlInput.trim()}
                                >
                                    {isLoading ? '⏳ Validating...' : '✅ Validate YAML'}
                                </button>
                            )}
                        </div>

                        {validationResult && (
                            <div className={`validation-result ${validationResult.type}`}>
                                <div className="validation-message">
                                    {validationResult.message}
                                </div>
                                {validationResult.details && (
                                    <div className="validation-details">
                                        {validationResult.details}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {(jsonOutput || convertedYaml) && (
                        <div className="output-section">
                            <div className="section-header">
                                <h3>
                                    {activeTab === 'yaml-to-json' ? 'JSON Output' : 'YAML Output'}
                                </h3>
                                <div className="header-actions">
                                    <button
                                        className="btn-icon"
                                        onClick={() => copyToClipboard(activeTab === 'yaml-to-json' ? jsonOutput : convertedYaml)}
                                        title="Copy to clipboard"
                                    >
                                        📋
                                    </button>
                                    <button
                                        className="btn-icon"
                                        onClick={() => downloadFile(
                                            activeTab === 'yaml-to-json' ? jsonOutput : convertedYaml,
                                            activeTab === 'yaml-to-json' ? 'converted.json' : 'converted.yaml'
                                        )}
                                        title="Download file"
                                    >
                                        💾
                                    </button>
                                </div>
                            </div>
                            <div className="output-container">
                                <pre className="output-content">
                                    {activeTab === 'yaml-to-json' ? jsonOutput : convertedYaml}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default YAMLTool;
