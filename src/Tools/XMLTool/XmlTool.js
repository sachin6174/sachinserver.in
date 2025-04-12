import React, { useState, useRef } from 'react';
import './XmlTool.css';

const XmlTool = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [tabSpace, setTabSpace] = useState(2);
    const fileInputRef = useRef();

    const loadData = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setInput(e.target.result);
                setError('');
                setOutput('');
            };
            reader.readAsText(file);
        }
    };

    const formatXML = () => {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(input, "text/xml");
            
            if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
                throw new Error("Invalid XML");
            }

            // Convert XML to string with proper formatting
            const serializer = new XMLSerializer();
            const xmlString = serializer.serializeToString(xmlDoc);
            
            // Format with proper indentation
            let formatted = '';
            let indent = '';
            
            xmlString.split(/>\s*</).forEach(function(node) {
                if (node.match(/^\/\w/)) indent = indent.substring(tabSpace);
                formatted += indent + '<' + node + '>\r\n';
                if (!node.match(/^(?:\/)?(?:area|base|br|col|hr|img|input|link|meta|param)(?:\s|>)/)) {
                    if (!node.match(/^\//) && !node.match(/\/$/)) indent += ' '.repeat(tabSpace);
                }
            });
            
            setOutput(formatted.substring(1, formatted.length - 3));
            setError('');
        } catch (err) {
            setError('Invalid XML: ' + err.message);
            setOutput('');
        }
    };

    const convertToJSON = () => {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(input, "text/xml");
            
            if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
                throw new Error("Invalid XML");
            }

            // Convert XML to JSON
            const json = xmlToJson(xmlDoc);
            setOutput(JSON.stringify(json, null, tabSpace));
            setError('');
        } catch (err) {
            setError('Conversion failed: ' + err.message);
            setOutput('');
        }
    };

    // Helper function to convert XML to JSON
    const xmlToJson = (xml) => {
        let obj = {};

        if (xml.nodeType === 1) {
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (let j = 0; j < xml.attributes.length; j++) {
                    const attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType === 3) {
            obj = xml.nodeValue.trim();
        }

        if (xml.hasChildNodes()) {
            for (let i = 0; i < xml.childNodes.length; i++) {
                const item = xml.childNodes.item(i);
                const nodeName = item.nodeName;

                if (typeof obj[nodeName] === "undefined") {
                    obj[nodeName] = xmlToJson(item);
                } else {
                    if (typeof obj[nodeName].push === "undefined") {
                        const old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xmlToJson(item));
                }
            }
        }
        return obj;
    };

    const showXMLTree = () => {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(input, "text/xml");
            
            if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
                throw new Error("Invalid XML");
            }

            const treeView = generateTreeView(xmlDoc.documentElement);
            setOutput(treeView);
            setError('');
        } catch (err) {
            setError('Tree view generation failed: ' + err.message);
            setOutput('');
        }
    };

    const generateTreeView = (node, level = 0) => {
        let result = '  '.repeat(level) + node.nodeName + '\n';
        
        // Add attributes
        if (node.attributes.length > 0) {
            for (let attr of node.attributes) {
                result += '  '.repeat(level + 1) + '@' + attr.name + ': ' + attr.value + '\n';
            }
        }

        // Add child nodes
        for (let child of node.childNodes) {
            if (child.nodeType === 1) { // Element node
                result += generateTreeView(child, level + 1);
            } else if (child.nodeType === 3 && child.nodeValue.trim()) { // Text node
                result += '  '.repeat(level + 1) + 'text: ' + child.nodeValue.trim() + '\n';
            }
        }
        return result;
    };

    const downloadOutput = () => {
        if (!output) return;
        
        const blob = new Blob([output], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'formatted-xml.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="xml-tool">
            <h2>XML Tool</h2>
            <div className="tool-container">
                <div className="control-panel">
                    <button onClick={() => fileInputRef.current.click()}>Load Data</button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".xml"
                        onChange={loadData}
                        style={{ display: 'none' }}
                    />
                    <select 
                        value={tabSpace}
                        onChange={(e) => setTabSpace(Number(e.target.value))}
                        className="tab-space-select"
                    >
                        <option value="2">2 Tab Space</option>
                        <option value="4">4 Tab Space</option>
                        <option value="8">8 Tab Space</option>
                    </select>
                </div>

                <div className="input-section">
                    <h3>Input XML</h3>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste your XML here..."
                    />
                </div>
                
                <div className="actions">
                    <button onClick={formatXML}>Format / Beautify</button>
                    <button onClick={showXMLTree}>XML Tree</button>
                    <button onClick={convertToJSON}>XML to JSON</button>
                    <button onClick={downloadOutput}>Download</button>
                </div>

                {error && <div className="message">{error}</div>}
                
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

export default XmlTool;
