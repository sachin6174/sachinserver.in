import React, { useState } from "react";

const Tools = () => {
    const [jsonInput, setJsonInput] = useState("");
    const [beautifiedJson, setBeautifiedJson] = useState("");
    const [error, setError] = useState("");
    const [xmlInput, setXmlInput] = useState("");
    const [beautifiedXml, setBeautifiedXml] = useState("");
    const [xmlError, setXmlError] = useState("");

    const handleBeautify = () => {
        try {
            const parsedJson = JSON.parse(jsonInput);
            const beautified = JSON.stringify(parsedJson, null, 4);
            setBeautifiedJson(beautified);
            setError("");
        } catch (err) {
            setError("Invalid JSON. Please check your input.");
            setBeautifiedJson("");
        }
    };

    const handleDownload = () => {
        const blob = new Blob([beautifiedJson], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "beautified.json";
        link.click();
    };

    const handleBeautifyXml = () => {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlInput, "application/xml");
            const serializer = new XMLSerializer();
            const beautified = serializer.serializeToString(xmlDoc);

            if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
                throw new Error("Invalid XML");
            }

            setBeautifiedXml(beautified);
            setXmlError("");
        } catch (err) {
            setXmlError("Invalid XML. Please check your input.");
            setBeautifiedXml("");
        }
    };

    const handleDownloadXml = () => {
        const blob = new Blob([beautifiedXml], { type: "application/xml" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "beautified.xml";
        link.click();
    };

    return (
        <div>
            <h2>JSON Validator and Beautifier</h2>
            <textarea
                rows="10"
                cols="50"
                placeholder="Paste your JSON here..."
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
            ></textarea>
            <div>
                <button onClick={handleBeautify}>Beautify JSON</button>
                {beautifiedJson && <button onClick={handleDownload}>Download JSON</button>}
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {beautifiedJson && (
                <pre
                    style={{
                        background: "#f4f4f4",
                        padding: "10px",
                        borderRadius: "5px",
                        whiteSpace: "pre-wrap", // Ensures proper indentation
                        wordWrap: "break-word", // Prevents overflow
                    }}
                >
                    {beautifiedJson}
                </pre>
            )}
            <h2>XML Validator and Beautifier</h2>
            <textarea
                rows="10"
                cols="50"
                placeholder="Paste your XML here..."
                value={xmlInput}
                onChange={(e) => setXmlInput(e.target.value)}
            ></textarea>
            <div>
                <button onClick={handleBeautifyXml}>Beautify XML</button>
                {beautifiedXml && <button onClick={handleDownloadXml}>Download XML</button>}
            </div>
            {xmlError && <p style={{ color: "red" }}>{xmlError}</p>}
            {beautifiedXml && (
                <pre
                    style={{
                        background: "#f4f4f4",
                        padding: "10px",
                        borderRadius: "5px",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                    }}
                >
                    {beautifiedXml}
                </pre>
            )}
        </div>
    );
};

export default Tools;
