// import React, { useState, useRef, useEffect } from 'react';
// import './QrTool.css';

// const QrTool = () => {
//     const [view, setView] = useState('make');
//     const [textToEncrypt, setTextToEncrypt] = useState('');
//     const [encryptionKey, setEncryptionKey] = useState('');
//     const [iterations, setIterations] = useState('');
//     const [decryptionKey, setDecryptionKey] = useState('');
//     const [decryptionIterations, setDecryptionIterations] = useState('');
//     const [qrData, setQrData] = useState('');
//     const [decryptedData, setDecryptedData] = useState('');
//     const [fileName, setFileName] = useState('No file uploaded');

//     const canvasRef = useRef(null);
//     const fileInputRef = useRef(null);

//     useEffect(() => {
//         // Load CoreLogic.js script
//         const script = document.createElement('script');
//         script.src = '/src/Tools/QRTool/CoreLogic.js';
//         script.async = true;
//         document.body.appendChild(script);

//         return () => {
//             document.body.removeChild(script);
//         };
//     }, []);

//     const handleViewChange = (newView) => {
//         setView(newView);
//     };

//     const generateQRCode = () => {
//         if (!textToEncrypt || !encryptionKey || !iterations) {
//             alert("Please fill in all fields");
//             return;
//         }

//         try {
//             // Use global CryptoJS
//             const encrypted = encryptData(textToEncrypt, encryptionKey, parseInt(iterations));
//             if (!encrypted) {
//                 alert("Encryption failed");
//                 return;
//             }

//             const qrContainer = document.getElementById('qrCodeContainer');
//             qrContainer.innerHTML = '';
            
//             // Use global QRCode
//             new QRCode(qrContainer, {
//                 text: encrypted,
//                 width: 300,
//                 height: 300,
//                 colorDark: "#000000",
//                 colorLight: "#ffffff",
//                 correctLevel: QRCode.CorrectLevel.L
//             });
            
//             setQrData(encrypted);
//         } catch (error) {
//             console.error('QR Generation Error:', error);
//             alert('Failed to generate QR code');
//         }
//     };

//     const handleFileUpload = (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         try {
//             setFileName(file.name);
//             const img = new Image();
//             const imageUrl = URL.createObjectURL(file);
            
//             img.onload = () => {
//                 const canvas = canvasRef.current;
//                 canvas.width = img.width;
//                 canvas.height = img.height;
//                 const ctx = canvas.getContext('2d');
//                 ctx.drawImage(img, 0, 0);

//                 const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//                 // Use global jsQR
//                 const code = jsQR(imageData.data, imageData.width, imageData.height);
                
//                 if (code) {
//                     setQrData(code.data);
//                 } else {
//                     alert('No QR code found in image');
//                 }
//             };

//             img.src = imageUrl;
//         } catch (error) {
//             console.error('File Reading Error:', error);
//             alert('Failed to read QR code');
//         }
//     };

//     const handleDecrypt = () => {
//         if (!qrData || !decryptionKey || !decryptionIterations) {
//             alert("Please provide QR data and decryption details");
//             return;
//         }

//         const decrypted = decryptData(qrData, decryptionKey, parseInt(decryptionIterations));
//         if (decrypted) {
//             setDecryptedData(decrypted);
//         } else {
//             alert('Decryption failed');
//         }
//     };

//     return (
//         <div className="mainbox">
//             <h1 className="app-name-label">YBV QR Encoder Decoder</h1>

//             <div className="encrypt-decrypt-selection">
//                 <button 
//                     id="makeQRButton" 
//                     className="btn-1"
//                     onClick={() => handleViewChange('make')}
//                     style={{ backgroundColor: view === 'make' ? '#007bff' : '#4ebb78' }}
//                 >
//                     Make QR
//                 </button>
//                 <button 
//                     id="readQRButton" 
//                     className="btn-2"
//                     onClick={() => handleViewChange('read')}
//                     style={{ backgroundColor: view === 'read' ? '#007bff' : '#4ebb78' }}
//                 >
//                     Read QR
//                 </button>
//             </div>

//             {view === 'make' && (
//                 <div id="makeQRView" className="view">
//                     <div className="text-collection" style={{ textAlign: 'center' }}>
//                         <label htmlFor="textToEncrypt" className="text-collection-label">Text to Encrypt</label><br />
//                         <textarea 
//                             id="textToEncrypt" 
//                             rows="7"
//                             value={textToEncrypt}
//                             onChange={(e) => setTextToEncrypt(e.target.value)}
//                             placeholder="Enter text to generate QR"
//                         />
//                     </div>
//                     <div className="text-collection">
//                         <label htmlFor="makeEncryptionKey" className="text-collection-label">Encryption Key</label><br />
//                         <input 
//                             type="password" 
//                             id="makeEncryptionKey"
//                             value={encryptionKey}
//                             onChange={(e) => setEncryptionKey(e.target.value)}
//                             placeholder="Enter encryption key"
//                         />
//                     </div>
//                     <div className="password-collection">
//                         <label htmlFor="makeIterations" className="password-collection-label">Iterations</label><br />
//                         <input 
//                             type="number" 
//                             id="makeIterations"
//                             value={iterations}
//                             onChange={(e) => setIterations(e.target.value)}
//                             placeholder="Enter number of iterations"
//                         />
//                     </div>
//                     <div className="single-element-centering">
//                         <button id="generateQRButton" onClick={generateQRCode}>Generate QR Code</button>
//                     </div>
//                     <div className="single-element-centering">
//                         <button id="downloadQRBtn">Download QR</button>
//                     </div>
//                     <div className="single-element-centering">
//                         <div id="qrCodeContainer"></div>
//                     </div>
//                 </div>
//             )}

//             {view === 'read' && (
//                 <div id="decodeQRView" className="view">
//                     <div className="upload-container">
//                         <label htmlFor="qrInput" id="uploadButton" className="btn-1">
//                             Click to Upload QR
//                         </label>
//                         <input 
//                             type="file" 
//                             id="qrInput"
//                             ref={fileInputRef}
//                             onChange={handleFileUpload}
//                             accept="image/*" 
//                             hidden
//                         />
//                         <p id="fileNameLabel">{fileName}</p>
//                     </div>
//                     <div className="text-collection">
//                         <label htmlFor="decodeEncryptionKey" className="text-collection-label">Decryption Password</label><br />
//                         <input 
//                             type="password" 
//                             id="decodeEncryptionKey"
//                             value={decryptionKey}
//                             onChange={(e) => setDecryptionKey(e.target.value)}
//                             placeholder="Enter encryption key"
//                         />
//                     </div>
//                     <div className="password-collection">
//                         <label htmlFor="decodeIterations" className="password-collection-label">Iterations</label><br />
//                         <input 
//                             type="number" 
//                             id="decodeIterations"
//                             value={decryptionIterations}
//                             onChange={(e) => setDecryptionIterations(e.target.value)}
//                             placeholder="Enter number of iterations"
//                         />
//                     </div>
//                     <div className="single-element-centering">
//                         <button id="decryptButton" onClick={handleDecrypt}>Decrypt</button>
//                     </div>
//                     <div className="result-display">
//                         <h3 className="result-display-label" id="resultLabel">Decrypted Data</h3>
//                         <canvas ref={canvasRef} style={{ display: 'none' }} />
//                         <textarea 
//                             id="encryptedDecryptedData" 
//                             rows="5"
//                             value={decryptedData}
//                             readOnly
//                         />
//                         <div>
//                             <button id="copyDataBtn" className="copy-button">Copy</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default QrTool;
