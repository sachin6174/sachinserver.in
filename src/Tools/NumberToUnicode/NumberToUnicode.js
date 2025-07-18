import React, { useState, useCallback } from 'react';
import './NumberToUnicode.css';

const NumberToUnicode = () => {
    const [numberInput, setNumberInput] = useState('');
    const [inputBase, setInputBase] = useState('decimal');
    const [convertedEmoji, setConvertedEmoji] = useState('');
    const [conversionResults, setConversionResults] = useState({});
    const [unicodeFormat, setUnicodeFormat] = useState('U+');
    const [conversionError, setConversionError] = useState('');
    const [conversionHistory, setConversionHistory] = useState([]);

    const convertNumber = useCallback((input, base) => {
        if (!input.trim()) {
            setConvertedEmoji('');
            setConversionResults({});
            setConversionError('');
            return;
        }

        try {
            let decimalValue;
            const cleanInput = input.trim().replace(/\s+/g, '');

            // Parse input based on selected base
            switch (base) {
                case 'decimal':
                    decimalValue = parseInt(cleanInput, 10);
                    break;
                case 'binary':
                    if (!/^[01]+$/.test(cleanInput)) {
                        setConversionError('Invalid binary number. Only 0 and 1 are allowed.');
                        setConvertedEmoji('');
                        setConversionResults({});
                        return;
                    }
                    decimalValue = parseInt(cleanInput, 2);
                    break;
                case 'hexadecimal':
                    if (!/^[0-9A-Fa-f]+$/.test(cleanInput)) {
                        setConversionError('Invalid hexadecimal number. Only 0-9 and A-F are allowed.');
                        setConvertedEmoji('');
                        setConversionResults({});
                        return;
                    }
                    decimalValue = parseInt(cleanInput, 16);
                    break;
                case 'octal':
                    if (!/^[0-7]+$/.test(cleanInput)) {
                        setConversionError('Invalid octal number. Only 0-7 are allowed.');
                        setConvertedEmoji('');
                        setConversionResults({});
                        return;
                    }
                    decimalValue = parseInt(cleanInput, 8);
                    break;
                default:
                    setConversionError('Invalid base selected');
                    return;
            }
            
            if (isNaN(decimalValue)) {
                setConversionError('Please enter a valid number');
                setConvertedEmoji('');
                setConversionResults({});
                return;
            }

            if (decimalValue < 0 || decimalValue > Number.MAX_SAFE_INTEGER) {
                setConversionError(`Number must be between 0 and ${Number.MAX_SAFE_INTEGER}`);
                setConvertedEmoji('');
                setConversionResults({});
                return;
            }

            // Generate all conversions
            const results = {
                decimal: decimalValue,
                binary: decimalValue.toString(2),
                hexadecimal: decimalValue.toString(16).toUpperCase(),
                octal: decimalValue.toString(8),
                // Additional number representations
                binaryGrouped: decimalValue.toString(2).replace(/(\d{4})(?=\d)/g, '$1 '),
                hexWithPrefix: '0x' + decimalValue.toString(16).toUpperCase(),
                octalWithPrefix: '0o' + decimalValue.toString(8),
                // Scientific notation
                scientific: decimalValue.toExponential(2),
                // Binary info
                bitLength: decimalValue.toString(2).length,
                // Mathematical properties
                isPowerOf2: decimalValue > 0 && (decimalValue & (decimalValue - 1)) === 0,
                isEven: decimalValue % 2 === 0,
                isPrime: isPrime(decimalValue),
                factors: getFactors(decimalValue),
                // Bit manipulation
                complement: (~decimalValue >>> 0).toString(2),
                leftShift1: (decimalValue << 1).toString(2),
                rightShift1: (decimalValue >> 1).toString(2),
                // Character representation
                ascii: decimalValue >= 0 && decimalValue <= 127 ? String.fromCharCode(decimalValue) : null,
                // Roman numerals (up to 3999)
                roman: decimalValue > 0 && decimalValue <= 3999 ? toRoman(decimalValue) : null,
                // Additional mathematical calculations
                square: decimalValue * decimalValue,
                cube: decimalValue * decimalValue * decimalValue,
                sqrt: decimalValue >= 0 ? Math.sqrt(decimalValue) : null,
                cbrt: Math.cbrt(decimalValue),
                log10: decimalValue > 0 ? Math.log10(decimalValue) : null,
                ln: decimalValue > 0 ? Math.log(decimalValue) : null,
                factorial: decimalValue >= 0 && decimalValue <= 20 ? factorial(decimalValue) : null,
                // Data size representations
                bytes: formatBytes(decimalValue),
                // Time representations (if interpreting as seconds)
                timeFromSeconds: decimalValue >= 0 ? formatTime(decimalValue) : null
            };

            setConversionResults(results);
            setConversionError('');

            // Try to get Unicode character
            let emoji = '';
            if (decimalValue >= 0 && decimalValue <= 0x10FFFF) {
                try {
                    emoji = String.fromCodePoint(decimalValue);
                    setConvertedEmoji(emoji);
                } catch (error) {
                    setConvertedEmoji('');
                }
            } else {
                setConvertedEmoji('');
            }
                
            // Add to history
            const newHistoryItem = {
                id: Date.now(),
                decimal: decimalValue,
                binary: results.binary,
                hexadecimal: results.hexadecimal,
                octal: results.octal,
                emoji: emoji,
                unicode: decimalValue <= 0x10FFFF ? `U+${decimalValue.toString(16).toUpperCase().padStart(4, '0')}` : '',
                timestamp: new Date().toLocaleTimeString(),
                inputBase: base,
                originalInput: input
            };
            
            setConversionHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]); // Keep last 10 items
                
        } catch (error) {
            setConversionError('Invalid input format');
            setConvertedEmoji('');
            setConversionResults({});
        }
    }, []);

    // Helper function to check if a number is prime
    const isPrime = (num) => {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    };

    // Helper function to get factors of a number
    const getFactors = (num) => {
        if (num <= 1) return [];
        const factors = [];
        for (let i = 1; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                factors.push(i);
                if (i !== num / i) {
                    factors.push(num / i);
                }
            }
        }
        return factors.sort((a, b) => a - b);
    };

    // Helper function to convert to Roman numerals
    const toRoman = (num) => {
        const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        const numerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
        let result = '';
        for (let i = 0; i < values.length; i++) {
            while (num >= values[i]) {
                result += numerals[i];
                num -= values[i];
            }
        }
        return result;
    };

    // Helper function to calculate factorial
    const factorial = (n) => {
        if (n <= 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    };

    // Helper function to format bytes
    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    };

    // Helper function to format time
    const formatTime = (seconds) => {
        if (seconds < 60) return `${seconds} seconds`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m ${seconds % 60}s`;
        return `${Math.floor(seconds / 86400)}d ${Math.floor((seconds % 86400) / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setNumberInput(value);
        convertNumber(value, inputBase);
    };

    const handleBaseChange = (e) => {
        const newBase = e.target.value;
        setInputBase(newBase);
        if (numberInput) {
            convertNumber(numberInput, newBase);
        }
    };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            // You could add a toast notification here
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const getUnicodeString = (number) => {
        if (!number && number !== 0) return '';
        const hex = number.toString(16).toUpperCase().padStart(4, '0');
        switch (unicodeFormat) {
            case 'U+':
                return `U+${hex}`;
            case '\\u':
                return `\\u${hex}`;
            case '0x':
                return `0x${hex}`;
            case '#':
                return `#${hex}`;
            default:
                return hex;
        }
    };

    const clearHistory = () => {
        setConversionHistory([]);
    };

    const loadHistoryItem = (item) => {
        setNumberInput(item.originalInput);
        setInputBase(item.inputBase);
        setConvertedEmoji(item.emoji);
        setConversionResults({
            decimal: item.decimal,
            binary: item.binary,
            hexadecimal: item.hexadecimal,
            octal: item.octal
        });
        setConversionError('');
    };

    // Common Unicode ranges for emojis
    const commonRanges = [
        { name: 'Basic Emoticons', start: 0x1F600, end: 0x1F64F, description: '😀-🙏' },
        { name: 'Misc Symbols', start: 0x1F300, end: 0x1F5FF, description: '🌀-🗿' },
        { name: 'Transport & Map', start: 0x1F680, end: 0x1F6FF, description: '🚀-🛿' },
        { name: 'Geometric Shapes', start: 0x25A0, end: 0x25FF, description: '■-▿' },
        { name: 'Dingbats', start: 0x2700, end: 0x27BF, description: '✀-➿' },
        { name: 'Arrows', start: 0x2190, end: 0x21FF, description: '←-⇿' },
        { name: 'Mathematical', start: 0x2200, end: 0x22FF, description: '∀-⋿' },
        { name: 'Misc Technical', start: 0x2300, end: 0x23FF, description: '⌀-⏿' }
    ];

    return (
        <div className="number-to-unicode">
            <div className="header-section">
                <h1 className="page-title">🔢 Number Base Converter</h1>
                <p className="page-description">
                    Convert numbers between different bases (binary, decimal, hexadecimal, octal) and view Unicode characters, mathematical properties, and more.
                </p>
            </div>

            <div className="converter-section">
                <div className="input-section">
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="numberInput">Enter Number</label>
                            <input
                                id="numberInput"
                                type="text"
                                placeholder="e.g., 128512, 1F600, 11111000000, 372000..."
                                value={numberInput}
                                onChange={handleInputChange}
                                className="number-input"
                            />
                        </div>

                        <div className="base-selector">
                            <label htmlFor="inputBase">Input Base:</label>
                            <select
                                id="inputBase"
                                value={inputBase}
                                onChange={handleBaseChange}
                                className="base-select"
                            >
                                <option value="decimal">Decimal (Base 10)</option>
                                <option value="binary">Binary (Base 2)</option>
                                <option value="hexadecimal">Hexadecimal (Base 16)</option>
                                <option value="octal">Octal (Base 8)</option>
                            </select>
                        </div>
                    </div>

                    <div className="format-selector">
                        <label htmlFor="unicodeFormat">Unicode Format:</label>
                        <select
                            id="unicodeFormat"
                            value={unicodeFormat}
                            onChange={(e) => setUnicodeFormat(e.target.value)}
                            className="format-select"
                        >
                            <option value="U+">U+1F600</option>
                            <option value="\\u">\\u1F600</option>
                            <option value="0x">0x1F600</option>
                            <option value="#">#1F600</option>
                            <option value="plain">1F600</option>
                        </select>
                    </div>
                </div>

                <div className="result-section">
                    {Object.keys(conversionResults).length > 0 && (
                        <div className="conversion-result">
                            {convertedEmoji && (
                                <div className="emoji-display">
                                    <span className="emoji-large">{convertedEmoji}</span>
                                    <button
                                        onClick={() => copyToClipboard(convertedEmoji)}
                                        className="copy-btn"
                                        title="Copy emoji"
                                    >
                                        📋
                                    </button>
                                    <div className="emoji-info">
                                        <span className="emoji-label">Unicode Character</span>
                                        {conversionResults.ascii && (
                                            <span className="ascii-info">ASCII: {conversionResults.ascii}</span>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="conversion-grid">
                                <div className="conversion-category">
                                    <h3>Number Base Conversions</h3>
                                    <div className="conversion-items">
                                        <div className="info-item">
                                            <span className="info-label">Decimal:</span>
                                            <span className="info-value">{conversionResults.decimal}</span>
                                            <button
                                                onClick={() => copyToClipboard(conversionResults.decimal?.toString())}
                                                className="copy-btn-small"
                                                title="Copy decimal"
                                            >
                                                📋
                                            </button>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Binary:</span>
                                            <span className="info-value">{conversionResults.binary}</span>
                                            <button
                                                onClick={() => copyToClipboard(conversionResults.binary)}
                                                className="copy-btn-small"
                                                title="Copy binary"
                                            >
                                                📋
                                            </button>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Grouped Binary:</span>
                                            <span className="info-value">{conversionResults.binaryGrouped}</span>
                                            <button
                                                onClick={() => copyToClipboard(conversionResults.binaryGrouped)}
                                                className="copy-btn-small"
                                                title="Copy grouped binary"
                                            >
                                                📋
                                            </button>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Hexadecimal:</span>
                                            <span className="info-value">{conversionResults.hexadecimal}</span>
                                            <button
                                                onClick={() => copyToClipboard(conversionResults.hexadecimal)}
                                                className="copy-btn-small"
                                                title="Copy hexadecimal"
                                            >
                                                📋
                                            </button>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Hex with 0x:</span>
                                            <span className="info-value">{conversionResults.hexWithPrefix}</span>
                                            <button
                                                onClick={() => copyToClipboard(conversionResults.hexWithPrefix)}
                                                className="copy-btn-small"
                                                title="Copy hex with prefix"
                                            >
                                                📋
                                            </button>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Octal:</span>
                                            <span className="info-value">{conversionResults.octal}</span>
                                            <button
                                                onClick={() => copyToClipboard(conversionResults.octal)}
                                                className="copy-btn-small"
                                                title="Copy octal"
                                            >
                                                📋
                                            </button>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Octal with 0o:</span>
                                            <span className="info-value">{conversionResults.octalWithPrefix}</span>
                                            <button
                                                onClick={() => copyToClipboard(conversionResults.octalWithPrefix)}
                                                className="copy-btn-small"
                                                title="Copy octal with prefix"
                                            >
                                                📋
                                            </button>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Scientific:</span>
                                            <span className="info-value">{conversionResults.scientific}</span>
                                            <button
                                                onClick={() => copyToClipboard(conversionResults.scientific)}
                                                className="copy-btn-small"
                                                title="Copy scientific notation"
                                            >
                                                📋
                                            </button>
                                        </div>
                                        {conversionResults.roman && (
                                            <div className="info-item">
                                                <span className="info-label">Roman:</span>
                                                <span className="info-value">{conversionResults.roman}</span>
                                                <button
                                                    onClick={() => copyToClipboard(conversionResults.roman)}
                                                    className="copy-btn-small"
                                                    title="Copy roman numeral"
                                                >
                                                    📋
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="conversion-category">
                                    <h3>Unicode & Character Info</h3>
                                    <div className="conversion-items">
                                        <div className="info-item">
                                            <span className="info-label">Unicode:</span>
                                            <span className="info-value">
                                                {getUnicodeString(conversionResults.decimal)}
                                            </span>
                                            <button
                                                onClick={() => copyToClipboard(getUnicodeString(conversionResults.decimal))}
                                                className="copy-btn-small"
                                                title="Copy Unicode"
                                            >
                                                📋
                                            </button>
                                        </div>
                                        {conversionResults.ascii && (
                                            <div className="info-item">
                                                <span className="info-label">ASCII Character:</span>
                                                <span className="info-value">{conversionResults.ascii}</span>
                                                <button
                                                    onClick={() => copyToClipboard(conversionResults.ascii)}
                                                    className="copy-btn-small"
                                                    title="Copy ASCII character"
                                                >
                                                    📋
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="conversion-category">
                                    <h3>Mathematical Properties</h3>
                                    <div className="conversion-items">
                                        <div className="info-item">
                                            <span className="info-label">Bit Length:</span>
                                            <span className="info-value">{conversionResults.bitLength} bits</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Even/Odd:</span>
                                            <span className="info-value">{conversionResults.isEven ? 'Even' : 'Odd'}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Power of 2:</span>
                                            <span className="info-value">{conversionResults.isPowerOf2 ? 'Yes' : 'No'}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Prime:</span>
                                            <span className="info-value">{conversionResults.isPrime ? 'Yes' : 'No'}</span>
                                        </div>
                                        {conversionResults.factors && conversionResults.factors.length > 0 && (
                                            <div className="info-item">
                                                <span className="info-label">Factors:</span>
                                                <span className="info-value">{conversionResults.factors.join(', ')}</span>
                                                <button
                                                    onClick={() => copyToClipboard(conversionResults.factors.join(', '))}
                                                    className="copy-btn-small"
                                                    title="Copy factors"
                                                >
                                                    📋
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="conversion-category">
                                    <h3>Mathematical Calculations</h3>
                                    <div className="conversion-items">
                                        <div className="info-item">
                                            <span className="info-label">Square (n²):</span>
                                            <span className="info-value">{conversionResults.square?.toLocaleString()}</span>
                                            <button
                                                onClick={() => copyToClipboard(conversionResults.square?.toString())}
                                                className="copy-btn-small"
                                                title="Copy square"
                                            >
                                                📋
                                            </button>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Cube (n³):</span>
                                            <span className="info-value">{conversionResults.cube?.toLocaleString()}</span>
                                            <button
                                                onClick={() => copyToClipboard(conversionResults.cube?.toString())}
                                                className="copy-btn-small"
                                                title="Copy cube"
                                            >
                                                📋
                                            </button>
                                        </div>
                                        {conversionResults.sqrt !== null && (
                                            <div className="info-item">
                                                <span className="info-label">Square Root (√n):</span>
                                                <span className="info-value">{conversionResults.sqrt?.toFixed(6)}</span>
                                                <button
                                                    onClick={() => copyToClipboard(conversionResults.sqrt?.toString())}
                                                    className="copy-btn-small"
                                                    title="Copy square root"
                                                >
                                                    📋
                                                </button>
                                            </div>
                                        )}
                                        <div className="info-item">
                                            <span className="info-label">Cube Root (∛n):</span>
                                            <span className="info-value">{conversionResults.cbrt?.toFixed(6)}</span>
                                            <button
                                                onClick={() => copyToClipboard(conversionResults.cbrt?.toString())}
                                                className="copy-btn-small"
                                                title="Copy cube root"
                                            >
                                                📋
                                            </button>
                                        </div>
                                        {conversionResults.factorial !== null && (
                                            <div className="info-item">
                                                <span className="info-label">Factorial (n!):</span>
                                                <span className="info-value">{conversionResults.factorial?.toLocaleString()}</span>
                                                <button
                                                    onClick={() => copyToClipboard(conversionResults.factorial?.toString())}
                                                    className="copy-btn-small"
                                                    title="Copy factorial"
                                                >
                                                    📋
                                                </button>
                                            </div>
                                        )}
                                        {conversionResults.log10 !== null && (
                                            <div className="info-item">
                                                <span className="info-label">Log₁₀:</span>
                                                <span className="info-value">{conversionResults.log10?.toFixed(6)}</span>
                                                <button
                                                    onClick={() => copyToClipboard(conversionResults.log10?.toString())}
                                                    className="copy-btn-small"
                                                    title="Copy log10"
                                                >
                                                    📋
                                                </button>
                                            </div>
                                        )}
                                        {conversionResults.ln !== null && (
                                            <div className="info-item">
                                                <span className="info-label">Natural Log (ln):</span>
                                                <span className="info-value">{conversionResults.ln?.toFixed(6)}</span>
                                                <button
                                                    onClick={() => copyToClipboard(conversionResults.ln?.toString())}
                                                    className="copy-btn-small"
                                                    title="Copy natural log"
                                                >
                                                    📋
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="conversion-category">
                                    <h3>Data & Time Interpretations</h3>
                                    <div className="conversion-items">
                                        <div className="info-item">
                                            <span className="info-label">As Bytes:</span>
                                            <span className="info-value">{conversionResults.bytes}</span>
                                            <button
                                                onClick={() => copyToClipboard(conversionResults.bytes)}
                                                className="copy-btn-small"
                                                title="Copy bytes format"
                                            >
                                                📋
                                            </button>
                                        </div>
                                        {conversionResults.timeFromSeconds && (
                                            <div className="info-item">
                                                <span className="info-label">As Time Duration:</span>
                                                <span className="info-value">{conversionResults.timeFromSeconds}</span>
                                                <button
                                                    onClick={() => copyToClipboard(conversionResults.timeFromSeconds)}
                                                    className="copy-btn-small"
                                                    title="Copy time format"
                                                >
                                                    📋
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="conversion-category">
                                    <h3>Bit Operations</h3>
                                    <div className="conversion-items">
                                        <div className="info-item">
                                            <span className="info-label">Left Shift (&lt;&lt;1):</span>
                                            <span className="info-value">{conversionResults.leftShift1}</span>
                                            <button
                                                onClick={() => copyToClipboard(conversionResults.leftShift1)}
                                                className="copy-btn-small"
                                                title="Copy left shift"
                                            >
                                                📋
                                            </button>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Right Shift (&gt;&gt;1):</span>
                                            <span className="info-value">{conversionResults.rightShift1}</span>
                                            <button
                                                onClick={() => copyToClipboard(conversionResults.rightShift1)}
                                                className="copy-btn-small"
                                                title="Copy right shift"
                                            >
                                                📋
                                            </button>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Complement (~):</span>
                                            <span className="info-value">{conversionResults.complement}</span>
                                            <button
                                                onClick={() => copyToClipboard(conversionResults.complement)}
                                                className="copy-btn-small"
                                                title="Copy complement"
                                            >
                                                📋
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {conversionError && (
                        <div className="error-message">
                            <span className="error-icon">⚠️</span>
                            {conversionError}
                        </div>
                    )}
                </div>
            </div>

            <div className="common-ranges-section">
                <h2>Common Unicode Ranges</h2>
                <div className="ranges-grid">
                    {commonRanges.map((range, index) => (
                        <div key={index} className="range-card">
                            <div className="range-name">{range.name}</div>
                            <div className="range-info">
                                <span className="range-numbers">
                                    {range.start} - {range.end}
                                </span>
                                <span className="range-examples">{range.description}</span>
                            </div>
                            <div className="range-buttons">
                                <button
                                    onClick={() => {
                                        setNumberInput(range.start.toString());
                                        setInputBase('decimal');
                                        convertNumber(range.start.toString(), 'decimal');
                                    }}
                                    className="range-btn"
                                >
                                    Try Start
                                </button>
                                <button
                                    onClick={() => {
                                        setNumberInput(range.end.toString());
                                        setInputBase('decimal');
                                        convertNumber(range.end.toString(), 'decimal');
                                    }}
                                    className="range-btn"
                                >
                                    Try End
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {conversionHistory.length > 0 && (
                <div className="history-section">
                    <div className="history-header">
                        <h2>Conversion History</h2>
                        <button onClick={clearHistory} className="clear-history-btn">
                            Clear History
                        </button>
                    </div>
                    <div className="history-list">
                        {conversionHistory.map((item) => (
                            <div key={item.id} className="history-item">
                                <div className="history-emoji">{item.emoji || '◯'}</div>
                                <div className="history-details">
                                    <div className="history-input">Input: {item.originalInput} ({item.inputBase})</div>
                                    <div className="history-conversions">
                                        <span>Dec: {item.decimal}</span>
                                        <span>Hex: {item.hexadecimal}</span>
                                        <span>Bin: {item.binary}</span>
                                        <span>Oct: {item.octal}</span>
                                    </div>
                                    {item.unicode && <div className="history-unicode">Unicode: {item.unicode}</div>}
                                    <div className="history-time">{item.timestamp}</div>
                                </div>
                                <div className="history-actions">
                                    <button
                                        onClick={() => loadHistoryItem(item)}
                                        className="use-btn"
                                        title="Use this conversion"
                                    >
                                        ↩️
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(item.decimal?.toString())}
                                        className="copy-btn-small"
                                        title="Copy decimal"
                                    >
                                        📋
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="examples-section">
                <h2>Example Numbers</h2>
                <div className="examples-grid">
                    <div className="example-item" onClick={() => { setNumberInput('128512'); setInputBase('decimal'); convertNumber('128512', 'decimal'); }}>
                        <span className="example-emoji">😀</span>
                        <span className="example-number">128512 (dec)</span>
                    </div>
                    <div className="example-item" onClick={() => { setNumberInput('1F600'); setInputBase('hexadecimal'); convertNumber('1F600', 'hexadecimal'); }}>
                        <span className="example-emoji">😀</span>
                        <span className="example-number">1F600 (hex)</span>
                    </div>
                    <div className="example-item" onClick={() => { setNumberInput('11111011000000000'); setInputBase('binary'); convertNumber('11111011000000000', 'binary'); }}>
                        <span className="example-emoji">😀</span>
                        <span className="example-number">Binary</span>
                    </div>
                    <div className="example-item" onClick={() => { setNumberInput('255'); setInputBase('decimal'); convertNumber('255', 'decimal'); }}>
                        <span className="example-emoji">FF</span>
                        <span className="example-number">255 (dec)</span>
                    </div>
                    <div className="example-item" onClick={() => { setNumberInput('FF'); setInputBase('hexadecimal'); convertNumber('FF', 'hexadecimal'); }}>
                        <span className="example-emoji">FF</span>
                        <span className="example-number">FF (hex)</span>
                    </div>
                    <div className="example-item" onClick={() => { setNumberInput('11111111'); setInputBase('binary'); convertNumber('11111111', 'binary'); }}>
                        <span className="example-emoji">FF</span>
                        <span className="example-number">Binary</span>
                    </div>
                    <div className="example-item" onClick={() => { setNumberInput('42'); setInputBase('decimal'); convertNumber('42', 'decimal'); }}>
                        <span className="example-emoji">42</span>
                        <span className="example-number">42 (dec)</span>
                    </div>
                    <div className="example-item" onClick={() => { setNumberInput('2A'); setInputBase('hexadecimal'); convertNumber('2A', 'hexadecimal'); }}>
                        <span className="example-emoji">42</span>
                        <span className="example-number">2A (hex)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NumberToUnicode;