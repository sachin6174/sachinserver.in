document.addEventListener("DOMContentLoaded", () => {


    document.getElementById('makeQRButton').addEventListener('click', () => {
        const key = document.getElementById('makeEncryptionKey').value;
        const iterations = document.getElementById('makeIterations').value;
        localStorage.setItem('encryptionKey', key);
        localStorage.setItem('iterations', iterations);
        document.getElementById('decodeEncryptionKey').value = key;
        document.getElementById('decodeIterations').value = iterations;
    });

    document.getElementById('readQRButton').addEventListener('click', () => {
        const key = localStorage.getItem('encryptionKey');
        const iterations = localStorage.getItem('iterations');
        document.getElementById('makeEncryptionKey').value = key;
        document.getElementById('makeIterations').value = iterations;
        document.getElementById('decodeEncryptionKey').value = key;
        document.getElementById('decodeIterations').value = iterations;
    });

    // Prepopulate fields on page load
    window.addEventListener('load', () => {
        const key = localStorage.getItem('encryptionKey');
        const iterations = localStorage.getItem('iterations');
        if (key) {
            document.getElementById('makeEncryptionKey').value = key;
            document.getElementById('decodeEncryptionKey').value = key;
        }
        if (iterations) {
            document.getElementById('makeIterations').value = iterations;
            document.getElementById('decodeIterations').value = iterations;
        }
    });

    const makeQRView = document.getElementById("makeQRView");
    const decodeQRView = document.getElementById("decodeQRView");
    const makeQRButton = document.getElementById("makeQRButton");
    const readQRButton = document.getElementById("readQRButton");


    document.getElementById('makeQRButton').addEventListener('click', () => {
        const key = document.getElementById('makeEncryptionKey').value;
        const iterations = document.getElementById('makeIterations').value;
        document.getElementById('decodeEncryptionKey').value = key;
        document.getElementById('decodeIterations').value = iterations;
    });

    document.getElementById('readQRButton').addEventListener('click', () => {
        const key = document.getElementById('decodeEncryptionKey').value;
        const iterations = document.getElementById('decodeIterations').value;
        document.getElementById('makeEncryptionKey').value = key;
        document.getElementById('makeIterations').value = iterations;
    });

    // Default selection to "Generate QR"
    makeQRView.style.display = "block";
    decodeQRView.style.display = "none";

    makeQRButton.addEventListener("click", () => {
        makeQRView.style.display = "block";
        decodeQRView.style.display = "none";
    });

    readQRButton.addEventListener("click", () => {
        makeQRView.style.display = "none";
        decodeQRView.style.display = "block";
    });

    document.getElementById('makeQRButton').addEventListener('click', function () {
        document.getElementById('makeQRButton').style.backgroundColor = '#007bff';
        document.getElementById('readQRButton').style.backgroundColor = '#4ebb78';
        document.getElementById('makeQRView').style.display = 'block';
        document.getElementById('decodeQRView').style.display = 'none';
    });

    document.getElementById('readQRButton').addEventListener('click', function () {
        document.getElementById('makeQRButton').style.backgroundColor = '#4ebb78';
        document.getElementById('readQRButton').style.backgroundColor = '#007bff';
        document.getElementById('makeQRView').style.display = 'none';
        document.getElementById('decodeQRView').style.display = 'block';
    });

    const generateQRButton = document.getElementById("generateQRButton");
    if (generateQRButton) {
        generateQRButton.addEventListener("click", generateQRCode);
    }

    const downloadQRBtn = document.getElementById("downloadQRBtn");
    if (downloadQRBtn) {
        downloadQRBtn.addEventListener("click", downloadQRCode);
    }

    const decryptButton = document.getElementById("decryptButton");
    if (decryptButton) {
        decryptButton.addEventListener("click", decryptQRCode);
    }

    const makeEncryptionKey = document.getElementById('makeEncryptionKey');
    const makeIterations = document.getElementById('makeIterations');
    const decodeEncryptionKey = document.getElementById('decodeEncryptionKey');
    const decodeIterations = document.getElementById('decodeIterations');

    // Load stored values from local storage
    const storedMakeEncryptionKey = localStorage.getItem('makeEncryptionKey');
    const storedMakeIterations = localStorage.getItem('makeIterations');
    const storedDecodeEncryptionKey = localStorage.getItem('decodeEncryptionKey');
    const storedDecodeIterations = localStorage.getItem('decodeIterations');

    if (storedMakeEncryptionKey) makeEncryptionKey.value = storedMakeEncryptionKey;
    if (storedMakeIterations) makeIterations.value = storedMakeIterations;
    if (storedDecodeEncryptionKey) decodeEncryptionKey.value = storedDecodeEncryptionKey;
    if (storedDecodeIterations) decodeIterations.value = storedDecodeIterations;

    function generateQRCode() {
        try {
            const textToEncrypt = document.getElementById("textToEncrypt").value;
            const encryptionKey = makeEncryptionKey.value;
            const iterations = parseInt(makeIterations.value, 10);

            if (!textToEncrypt || !encryptionKey || !iterations) {
                alert("Please fill in all fields.");
                return;
            }

            // Attempt to minify the data if it's valid JSON, otherwise use original text.
            let minifiedData = textToEncrypt;
            try {
                minifiedData = JSON.stringify(JSON.parse(textToEncrypt));
            } catch (e) {
                console.warn("Input is not valid JSON, using original text.");
            }
            console.log("Data for QR:", minifiedData);

            const encryptedData = encryptPBEWithMD5AndDES(minifiedData, encryptionKey, iterations);
            if (encryptedData) {
                const qrCodeContainer = document.getElementById("qrCodeContainer");
                qrCodeContainer.innerHTML = "";
                new QRCode(qrCodeContainer, {
                    text: encryptedData,
                    width: 500,              // increased size for high-resolution QR
                    height: 500,             // increased size
                    correctLevel: QRCode.CorrectLevel.L  // low error correction level
                });

                localStorage.setItem('makeEncryptionKey', encryptionKey);
                localStorage.setItem('makeIterations', iterations);

                // Make the download button visible
                document.getElementById('downloadQRBtn').style.display = 'block';
            } else {
                alert("Encryption failed.");
            }
        } catch (error) {
            console.error('Error generating QR code:', error);
            alert('An error occurred while generating the QR code. Please try again.');
        }
    }

    // Initially hide the download button
    document.getElementById('downloadQRBtn').style.display = 'none';

    function downloadQRCode() {
        try {
            const qrCodeImage = document.querySelector("#qrCodeContainer img");
            if (qrCodeImage) {
                const link = document.createElement("a");
                link.href = qrCodeImage.src;
                link.download = "QRCode.png";
                link.click();
            } else {
                alert("No QR code to download.");
            }
        } catch (error) {
            console.error('Error downloading QR code:', error);
            alert('An error occurred while downloading the QR code. Please try again.');
        }
    }

    function decryptQRCode() {
        try {
            const encryptionKey = decodeEncryptionKey.value;
            const iterations = parseInt(decodeIterations.value, 10);
            const encryptedData = extractedData;

            if (!encryptedData) {
                alert("Please upload a QR code first.");
                return;
            }

            if (!encryptionKey || !iterations) {
                alert("Please fill in all fields.");
                return;
            }

            const decryptedData = decryptPBEWithMD5AndDES(encryptedData, encryptionKey, iterations);
            if (decryptedData) {
                try {
                    const jsonData = JSON.parse(decryptedData);
                    document.getElementById("encryptedDecryptedData").value = JSON.stringify(jsonData, null, 4);
                } catch (error) {
                    console.error("Invalid JSON data:", error);
                    document.getElementById("encryptedDecryptedData").value = decryptedData;
                }

                localStorage.setItem('decodeEncryptionKey', encryptionKey);
                localStorage.setItem('decodeIterations', iterations);
            } else {
                document.getElementById("encryptedDecryptedData").value = 'Decryption failed.';
            }
        } catch (error) {
            console.error('Error decrypting QR code:', error);
            alert('An error occurred while decrypting the QR code. Please try again.');
        }
    }

    const copyDataBtn = document.getElementById("copyDataBtn");
    if (copyDataBtn) {
        copyDataBtn.addEventListener("click", copyToClipboard);
    }

    const qrInput = document.getElementById('qrInput');
    const fileNameLabel = document.getElementById('fileNameLabel');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let extractedData = '';

    qrInput.addEventListener('change', () => {
        const fileName = qrInput.files[0]?.name || 'No file uploaded';
        fileNameLabel.textContent = fileName;
    });

    qrInput.addEventListener('change', async (event) => {
        try {
            const file = event.target.files[0];
            if (file) {
                const img = new Image();
                img.src = URL.createObjectURL(file);

                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0, img.width, img.height);

                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    // Specify inversionAttempts option for robust scanning
                    const qrCodeData = jsQR(imageData.data, canvas.width, canvas.height, { inversionAttempts: "attemptBoth" });

                    if (qrCodeData) {
                        extractedData = qrCodeData.data;
                        alert(`QR Code Data Extracted: ${extractedData}`);
                    } else {
                        alert('No QR code detected. Please try another image.');
                    }
                };

                img.onerror = () => {
                    alert('Failed to load image. Please try again.');
                };
            }
        } catch (error) {
            console.error('Error processing QR code image:', error);
            alert('An error occurred while processing the QR code image. Please try again.');
        }
    });

    function copyToClipboard() {
        const outputData = document.getElementById("encryptedDecryptedData");
        outputData.select();
        document.execCommand("copy");
        const copyButton = document.getElementById("copyDataBtn");
        copyButton.style.backgroundColor = "#808080";
        copyButton.textContent = "Copied";
        setTimeout(() => {
            copyButton.style.backgroundColor = "#e0e0e0";
            copyButton.textContent = "Copy";
        }, 2000);
    }

    function md5(data) {
        return CryptoJS.MD5(CryptoJS.enc.Latin1.parse(data)).toString(CryptoJS.enc.Latin1);
    }

    function deriveKeyAndIV(password, salt, iterations) {
        let derived = md5(password + salt);
        for (let i = 1; i < iterations; i++) {
            derived = md5(derived);
        }
        const key = CryptoJS.enc.Latin1.parse(derived.slice(0, 8));
        const iv = CryptoJS.enc.Latin1.parse(derived.slice(8, 16));
        return { key, iv };
    }

    function encryptPBEWithMD5AndDES(data, password, iterations) {
        try {
            const dataToEncrypt = CryptoJS.enc.Utf8.parse(data);
            const salt = String.fromCharCode(40, 171, 188, 205, 222, 239, 0, 51);
            const { key, iv } = deriveKeyAndIV(password, salt, iterations);

            const encrypted = CryptoJS.DES.encrypt(
                dataToEncrypt,
                key,
                { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
            );

            return encrypted.toString();
        } catch (err) {
            console.error('Encryption Error:', err);
            return null;
        }
    }

    function decryptPBEWithMD5AndDES(data, password, iterations) {
        try {
            const dataToDecrypt = CryptoJS.enc.Base64.parse(data);
            const salt = String.fromCharCode(40, 171, 188, 205, 222, 239, 0, 51);
            const { key, iv } = deriveKeyAndIV(password, salt, iterations);

            const decrypted = CryptoJS.DES.decrypt(
                { ciphertext: dataToDecrypt },
                key,
                { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
            );

            return decrypted.toString(CryptoJS.enc.Utf8);
        } catch (err) {
            console.error('Decryption Error:', err);
            return null;
        }
    }
});