import React, { useState, useCallback } from 'react';
import './PDFTool.css';
import { Button, Input, Select } from '../../ui';

// Lazy load PDF-lib (temporarily disabled due to build issues)
const loadPDFLib = async () => {
    throw new Error('PDF-lib currently disabled for build optimization');
    // const { PDFDocument } = await import('pdf-lib');
    // return { PDFDocument };
};

const PDFTool = () => {
    const [activeTab, setActiveTab] = useState('extract');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Extract pages settings
    const [extractPages, setExtractPages] = useState('');
    const [extractMode, setExtractMode] = useState('specific'); // specific, range, alternate-odd, alternate-even

    // Split settings
    const [splitValue, setSplitValue] = useState('1');

    const clearMessages = () => {
        setError('');
        setSuccess('');
    };

    const handleFileUpload = useCallback((files) => {
        clearMessages();
        const pdfFiles = Array.from(files).filter(file => file.type === 'application/pdf');
        
        if (pdfFiles.length === 0) {
            setError('Please upload valid PDF files only.');
            return;
        }

        const filePromises = pdfFiles.map(async (file) => {
            // Fallback to basic file info without PDF processing
            return {
                id: Date.now() + Math.random(),
                name: file.name,
                file: file,
                pageCount: 0,
                size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
            };
        });

        Promise.all(filePromises).then(processedFiles => {
            setUploadedFiles(prev => [...prev, ...processedFiles]);
            setSuccess(`${processedFiles.length} PDF file(s) loaded successfully.`);
        }).catch(err => {
            setError('Error loading PDF files: ' + err.message);
        });
    }, []);

    const downloadPDF = (pdfBytes, filename) => {
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const extractPagesFromPDF = async (sourceFile) => {
        setIsProcessing(true);
        clearMessages();
        
        try {
            const newPdf = await PDFDocument.create();
            const sourcePdf = await PDFDocument.load(sourceFile.arrayBuffer);
            const totalPages = sourcePdf.getPageCount();
            
            let pagesToExtract = [];
            
            switch (extractMode) {
                case 'specific':
                    // Parse comma-separated page numbers
                    pagesToExtract = extractPages.split(',')
                        .map(p => parseInt(p.trim()))
                        .filter(p => p > 0 && p <= totalPages)
                        .map(p => p - 1); // Convert to 0-based index
                    break;
                    
                case 'range':
                    // Parse range like "1-5" or "3-10"
                    const rangeParts = extractPages.split('-');
                    if (rangeParts.length === 2) {
                        const start = parseInt(rangeParts[0].trim()) - 1;
                        const end = parseInt(rangeParts[1].trim()) - 1;
                        if (start >= 0 && end < totalPages && start <= end) {
                            for (let i = start; i <= end; i++) {
                                pagesToExtract.push(i);
                            }
                        }
                    }
                    break;
                    
                case 'alternate-odd':
                    // Extract odd pages (1, 3, 5, ...)
                    for (let i = 0; i < totalPages; i += 2) {
                        pagesToExtract.push(i);
                    }
                    break;
                    
                case 'alternate-even':
                    // Extract even pages (2, 4, 6, ...)
                    for (let i = 1; i < totalPages; i += 2) {
                        pagesToExtract.push(i);
                    }
                    break;
                    
                default:
                    throw new Error('Invalid extraction mode');
            }
            
            if (pagesToExtract.length === 0) {
                throw new Error('No valid pages specified for extraction');
            }
            
            // Copy pages to new PDF
            const copiedPages = await newPdf.copyPages(sourcePdf, pagesToExtract);
            copiedPages.forEach(page => newPdf.addPage(page));
            
            const pdfBytes = await newPdf.save();
            const filename = `extracted_${sourceFile.name}`;
            
            downloadPDF(pdfBytes, filename);
            setSuccess(`Successfully extracted ${pagesToExtract.length} pages from ${sourceFile.name}`);
            
        } catch (err) {
            setError('Error extracting pages: ' + err.message);
        } finally {
            setIsProcessing(false);
        }
    };

    const mergePDFs = async () => {
        if (uploadedFiles.length < 2) {
            setError('Please upload at least 2 PDF files to merge.');
            return;
        }
        
        setIsProcessing(true);
        clearMessages();
        
        try {
            const mergedPdf = await PDFDocument.create();
            
            for (const file of uploadedFiles) {
                const sourcePdf = await PDFDocument.load(file.arrayBuffer);
                const pageCount = sourcePdf.getPageCount();
                const pageIndices = Array.from({ length: pageCount }, (_, i) => i);
                
                const copiedPages = await mergedPdf.copyPages(sourcePdf, pageIndices);
                copiedPages.forEach(page => mergedPdf.addPage(page));
            }
            
            const pdfBytes = await mergedPdf.save();
            const filename = `merged_${Date.now()}.pdf`;
            
            downloadPDF(pdfBytes, filename);
            setSuccess(`Successfully merged ${uploadedFiles.length} PDF files.`);
            
        } catch (err) {
            setError('Error merging PDFs: ' + err.message);
        } finally {
            setIsProcessing(false);
        }
    };

    const splitPDF = async (sourceFile) => {
        setIsProcessing(true);
        clearMessages();
        
        try {
            const sourcePdf = await PDFDocument.load(sourceFile.arrayBuffer);
            const totalPages = sourcePdf.getPageCount();
            
            // Split by pages
            const pagesPerFile = parseInt(splitValue);
            if (pagesPerFile <= 0 || pagesPerFile > totalPages) {
                throw new Error('Invalid pages per file value');
            }
            
            let fileIndex = 1;
            for (let startPage = 0; startPage < totalPages; startPage += pagesPerFile) {
                const endPage = Math.min(startPage + pagesPerFile - 1, totalPages - 1);
                const pageIndices = [];
                
                for (let i = startPage; i <= endPage; i++) {
                    pageIndices.push(i);
                }
                
                const newPdf = await PDFDocument.create();
                const copiedPages = await newPdf.copyPages(sourcePdf, pageIndices);
                copiedPages.forEach(page => newPdf.addPage(page));
                
                const pdfBytes = await newPdf.save();
                const filename = `split_${fileIndex}_${sourceFile.name}`;
                
                downloadPDF(pdfBytes, filename);
                fileIndex++;
            }
            
            setSuccess(`Successfully split ${sourceFile.name} into ${fileIndex - 1} files.`);
            
        } catch (err) {
            setError('Error splitting PDF: ' + err.message);
        } finally {
            setIsProcessing(false);
        }
    };

    const removeFile = (fileId) => {
        setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
        clearMessages();
    };

    const clearAllFiles = () => {
        setUploadedFiles([]);
        clearMessages();
    };

    return (
        <div className="tools-container">
            <div className="pdf-tool">
                <div className="tool-tabs">
                    <Button size="sm" variant={activeTab === 'extract' ? 'solid' : 'outline'} className="tool-tab" onClick={() => setActiveTab('extract')}>📄 Extract Pages</Button>
                    <Button size="sm" variant={activeTab === 'merge' ? 'solid' : 'outline'} className="tool-tab" onClick={() => setActiveTab('merge')}>🔗 Merge PDFs</Button>
                    <Button size="sm" variant={activeTab === 'split' ? 'solid' : 'outline'} className="tool-tab" onClick={() => setActiveTab('split')}>✂️ Split PDF</Button>
                </div>

                <div className="pdf-upload-section">
                    <div className="upload-area">
                        <input
                            type="file"
                            accept=".pdf"
                            multiple
                            onChange={(e) => handleFileUpload(e.target.files)}
                            className="file-input"
                            id="pdf-upload"
                        />
                        <label htmlFor="pdf-upload" className="upload-label">
                            <div className="upload-icon">📁</div>
                            <div className="upload-text">
                                <h3>Upload PDF Files</h3>
                                <p>Click here or drag and drop PDF files</p>
                                <small>Supports multiple file upload</small>
                            </div>
                        </label>
                    </div>

                    {uploadedFiles.length > 0 && (
                        <div className="uploaded-files">
                            <div className="files-header">
                                <h3>Uploaded Files ({uploadedFiles.length})</h3>
                                <Button variant="outline" onClick={clearAllFiles}>🗑️ Clear All</Button>
                            </div>
                            <div className="files-list">
                                {uploadedFiles.map((file) => (
                                    <div key={file.id} className="file-item">
                                        <div className="file-info">
                                            <span className="file-name">{file.name}</span>
                                            <span className="file-details">
                                                {file.pageCount} pages • {file.size}
                                            </span>
                                        </div>
                                        <Button size="sm" variant="outline" onClick={() => removeFile(file.id)}>✕</Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {(error || success) && (
                    <div className="message-area">
                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}
                    </div>
                )}

                <div className="pdf-operations">
                    {activeTab === 'extract' && (
                        <div className="extract-section">
                            <h3>Extract Pages</h3>
                            
                            <div className="extract-options">
                                <div className="option-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="extractMode"
                                            value="specific"
                                            checked={extractMode === 'specific'}
                                            onChange={(e) => setExtractMode(e.target.value)}
                                        />
                                        Specific Pages
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="extractMode"
                                            value="range"
                                            checked={extractMode === 'range'}
                                            onChange={(e) => setExtractMode(e.target.value)}
                                        />
                                        Page Range
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="extractMode"
                                            value="alternate-odd"
                                            checked={extractMode === 'alternate-odd'}
                                            onChange={(e) => setExtractMode(e.target.value)}
                                        />
                                        Odd Pages (1, 3, 5...)
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="extractMode"
                                            value="alternate-even"
                                            checked={extractMode === 'alternate-even'}
                                            onChange={(e) => setExtractMode(e.target.value)}
                                        />
                                        Even Pages (2, 4, 6...)
                                    </label>
                                </div>

                                {(extractMode === 'specific' || extractMode === 'range') && (
                                    <div className="input-group">
                                        <label htmlFor="extractPages">
                                            {extractMode === 'specific' ? 'Page Numbers (comma-separated):' : 'Page Range (e.g., 1-5):'}
                                        </label>
                                        <Input
                                            id="extractPages"
                                            label={extractMode === 'specific' ? 'Page Numbers (comma-separated):' : 'Page Range (e.g., 1-5):'}
                                            type="text"
                                            value={extractPages}
                                            onChange={(e) => setExtractPages(e.target.value)}
                                            placeholder={extractMode === 'specific' ? '1, 3, 5, 7' : '1-5'}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="extract-actions">
                                {uploadedFiles.map((file) => (
                                    <div key={file.id} className="file-action">
                                        <span className="file-name">{file.name}</span>
                                        <Button onClick={() => extractPagesFromPDF(file)} disabled={isProcessing || ((extractMode === 'specific' || extractMode === 'range') && !extractPages.trim())}>
                                            {isProcessing ? '⏳ Processing...' : '📄 Extract'}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'merge' && (
                        <div className="merge-section">
                            <h3>Merge PDFs</h3>
                            <p>Combine all uploaded PDF files into a single document.</p>
                            
                            <div className="merge-info">
                                <p><strong>Files to merge:</strong> {uploadedFiles.length}</p>
                                <p><strong>Total pages:</strong> {uploadedFiles.reduce((sum, file) => sum + file.pageCount, 0)}</p>
                            </div>

                            <Button onClick={mergePDFs} disabled={isProcessing || uploadedFiles.length < 2}>
                                {isProcessing ? '⏳ Merging...' : '🔗 Merge All PDFs'}
                            </Button>
                        </div>
                    )}

                    {activeTab === 'split' && (
                        <div className="split-section">
                            <h3>Split PDF</h3>
                            
                            <div className="split-options">
                                <div className="input-group">
                                    <label htmlFor="splitValue">Pages per file:</label>
                                    <Input
                                        id="splitValue"
                                        label="Pages per file:"
                                        type="number"
                                        min={1}
                                        value={splitValue}
                                        onChange={(e) => setSplitValue(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="split-actions">
                                {uploadedFiles.map((file) => (
                                    <div key={file.id} className="file-action">
                                        <span className="file-name">{file.name}</span>
                                        <span className="file-details">
                                            Will create ~{Math.ceil(file.pageCount / parseInt(splitValue || 1))} files
                                        </span>
                                        <Button onClick={() => splitPDF(file)} disabled={isProcessing || !splitValue || parseInt(splitValue) <= 0}>
                                            {isProcessing ? '⏳ Processing...' : '✂️ Split'}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default PDFTool;
