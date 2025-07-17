import React, { useState, useCallback } from 'react';
import './TextGenerator.css';

const TextGenerator = () => {
    const [generatedText, setGeneratedText] = useState('');
    const [inputText, setInputText] = useState('');
    const [charCount, setCharCount] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [lineCount, setLineCount] = useState(0);
    const [spaceCount, setSpaceCount] = useState(0);
    const [activeTab, setActiveTab] = useState('generator');

    // Demo text templates
    const demoTexts = {
        lorem: {
            name: "Lorem Ipsum",
            short: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            medium: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            long: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
        },
        tech: {
            name: "Technology",
            short: "Artificial intelligence and machine learning are transforming the digital landscape through innovative algorithms and data processing techniques.",
            medium: "Artificial intelligence and machine learning are transforming the digital landscape through innovative algorithms and data processing techniques. Cloud computing infrastructure enables scalable applications with microservices architecture, containerization, and serverless computing. DevOps practices streamline software development lifecycles through continuous integration, automated testing, and deployment pipelines. Modern web frameworks utilize component-based architectures, state management, and progressive web application features to enhance user experience.",
            long: "Artificial intelligence and machine learning are transforming the digital landscape through innovative algorithms and data processing techniques. Cloud computing infrastructure enables scalable applications with microservices architecture, containerization, and serverless computing. DevOps practices streamline software development lifecycles through continuous integration, automated testing, and deployment pipelines. Modern web frameworks utilize component-based architectures, state management, and progressive web application features to enhance user experience. Cybersecurity measures protect digital assets through encryption, authentication protocols, and threat detection systems. Blockchain technology provides decentralized solutions for secure transactions and smart contracts. Internet of Things devices create interconnected ecosystems for smart homes, industrial automation, and healthcare monitoring. Quantum computing promises revolutionary computational capabilities for complex problem-solving and cryptographic applications."
        },
        business: {
            name: "Business",
            short: "Strategic planning and market analysis drive organizational growth through innovative product development and customer engagement strategies.",
            medium: "Strategic planning and market analysis drive organizational growth through innovative product development and customer engagement strategies. Digital transformation initiatives leverage technology to optimize operations, enhance customer experiences, and create competitive advantages. Data-driven decision making utilizes analytics and business intelligence to identify trends, measure performance, and predict market opportunities. Agile methodologies enable rapid adaptation to changing market conditions through iterative development and continuous improvement processes.",
            long: "Strategic planning and market analysis drive organizational growth through innovative product development and customer engagement strategies. Digital transformation initiatives leverage technology to optimize operations, enhance customer experiences, and create competitive advantages. Data-driven decision making utilizes analytics and business intelligence to identify trends, measure performance, and predict market opportunities. Agile methodologies enable rapid adaptation to changing market conditions through iterative development and continuous improvement processes. Supply chain management optimizes logistics, inventory control, and vendor relationships to ensure efficient operations. Human resources development focuses on talent acquisition, employee engagement, and leadership training to build high-performing teams. Financial management encompasses budgeting, forecasting, and investment strategies to maximize profitability and sustainable growth. Marketing automation and customer relationship management systems enhance lead generation, conversion rates, and customer retention strategies."
        },
        creative: {
            name: "Creative Writing",
            short: "The morning sun painted golden streaks across the canvas of the sky, awakening the world with its gentle embrace.",
            medium: "The morning sun painted golden streaks across the canvas of the sky, awakening the world with its gentle embrace. Dewdrops sparkled like diamonds on emerald grass, while birds orchestrated a symphony of melodies that danced through the crisp air. Ancient oak trees stood as silent sentinels, their branches reaching toward the heavens like weathered hands in prayer. The river whispered secrets to the stones as it meandered through the valley, carrying dreams and memories downstream.",
            long: "The morning sun painted golden streaks across the canvas of the sky, awakening the world with its gentle embrace. Dewdrops sparkled like diamonds on emerald grass, while birds orchestrated a symphony of melodies that danced through the crisp air. Ancient oak trees stood as silent sentinels, their branches reaching toward the heavens like weathered hands in prayer. The river whispered secrets to the stones as it meandered through the valley, carrying dreams and memories downstream. Wildflowers bloomed in vibrant clusters, their petals unfurling like nature's own kaleidoscope of color and fragrance. Butterflies performed their eternal ballet, wings catching sunlight as they fluttered from bloom to bloom. The wind carried stories from distant lands, rustling through leaves and grass with tales of adventure and wonder. In this magical moment, time seemed suspended, allowing the heart to drink deeply from the well of natural beauty and find peace in the simple miracle of existence."
        }
    };

    // Character sets for random generation
    const charSets = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
        special: '™®©§¶†‡•…‰′″‴‹›«»¿¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿',
        emoji: '😀😂😊😍😎😢😭😡😱😴😵😤😇😈😋😌😍😎😏😐😑😒😓😔😕😖😗😘😙😚😛😜😝😞😟😠😡😢😣😤😥😦😧😨😩😪😫😬😭😮😯😰😱😲😳😴😵😶😷😸😹😺😻😼😽😾😿🙀🙁🙂🙃🙄🙅🙆🙇🙈🙉🙊🙋🙌🙍🙎🙏',
        arrows: '←→↑↓↔↕↖↗↘↙↚↛↜↝↞↟↠↡↢↣↤↥↦↧↨↩↪↫↬↭↮↯↰↱↲↳↴↵↶↷↸↹↺↻↼↽↾↿⇀⇁⇂⇃⇄⇅⇆⇇⇈⇉⇊⇋⇌⇍⇎⇏'
    };

    // Update text statistics
    const updateStats = useCallback((text) => {
        const chars = text.length;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const lines = text.split('\n').length;
        const spaces = (text.match(/\s/g) || []).length;
        
        setCharCount(chars);
        setWordCount(words);
        setLineCount(lines);
        setSpaceCount(spaces);
    }, []);

    // Generate demo text
    const generateDemoText = (type, length) => {
        const text = demoTexts[type][length];
        setGeneratedText(text);
        setInputText(text);
        updateStats(text);
    };

    // Generate random characters
    const generateRandomChars = (length, includeCharSets) => {
        let charset = '';
        includeCharSets.forEach(set => {
            charset += charSets[set];
        });
        
        let result = '';
        for (let i = 0; i < length; i++) {
            result += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        
        setGeneratedText(result);
        setInputText(result);
        updateStats(result);
    };

    // Generate repeated text
    const generateRepeatedText = (text, count, separator = '') => {
        const result = Array(count).fill(text).join(separator);
        setGeneratedText(result);
        setInputText(result);
        updateStats(result);
    };

    // Text manipulation functions
    const removeSpaces = () => {
        const result = inputText.replace(/\s/g, '');
        setInputText(result);
        updateStats(result);
    };

    const removeNewlines = () => {
        const result = inputText.replace(/\n/g, '');
        setInputText(result);
        updateStats(result);
    };

    const removeNumbers = () => {
        const result = inputText.replace(/[0-9]/g, '');
        setInputText(result);
        updateStats(result);
    };

    const removeSpecialChars = () => {
        const result = inputText.replace(/[^a-zA-Z0-9\s]/g, '');
        setInputText(result);
        updateStats(result);
    };

    const removeDuplicateSpaces = () => {
        const result = inputText.replace(/\s+/g, ' ');
        setInputText(result);
        updateStats(result);
    };

    const addSpaces = () => {
        const result = inputText.replace(/(.)/g, '$1 ').trim();
        setInputText(result);
        updateStats(result);
    };

    const reverseText = () => {
        const result = inputText.split('').reverse().join('');
        setInputText(result);
        updateStats(result);
    };

    const shuffleText = () => {
        const result = inputText.split('').sort(() => Math.random() - 0.5).join('');
        setInputText(result);
        updateStats(result);
    };

    const duplicateText = () => {
        const result = inputText + inputText;
        setInputText(result);
        updateStats(result);
    };

    const upperCaseText = () => {
        const result = inputText.toUpperCase();
        setInputText(result);
        updateStats(result);
    };

    const lowerCaseText = () => {
        const result = inputText.toLowerCase();
        setInputText(result);
        updateStats(result);
    };

    const titleCaseText = () => {
        const result = inputText.replace(/\w\S*/g, (txt) => 
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
        setInputText(result);
        updateStats(result);
    };

    const handleTextChange = (e) => {
        const text = e.target.value;
        setInputText(text);
        updateStats(text);
    };

    const clearText = () => {
        setInputText('');
        setGeneratedText('');
        updateStats('');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inputText);
    };

    return (
        <div className="text-generator-tool">
            <div className="tool-tabs">
                <button
                    className={`tool-tab ${activeTab === 'generator' ? 'active' : ''}`}
                    onClick={() => setActiveTab('generator')}
                >
                    🎲 Generator
                </button>
                <button
                    className={`tool-tab ${activeTab === 'manipulator' ? 'active' : ''}`}
                    onClick={() => setActiveTab('manipulator')}
                >
                    🔧 Manipulator
                </button>
                <button
                    className={`tool-tab ${activeTab === 'stats' ? 'active' : ''}`}
                    onClick={() => setActiveTab('stats')}
                >
                    📊 Statistics
                </button>
            </div>

            <div className="tool-content">
                {activeTab === 'generator' && (
                    <div className="generator-section">
                        <div className="generator-controls">
                            <div className="control-group">
                                <h3>Demo Text Generator</h3>
                                <div className="demo-text-options">
                                    {Object.entries(demoTexts).map(([key, data]) => (
                                        <div key={key} className="demo-category">
                                            <h4>{data.name}</h4>
                                            <div className="length-buttons">
                                                <button onClick={() => generateDemoText(key, 'short')}>Short</button>
                                                <button onClick={() => generateDemoText(key, 'medium')}>Medium</button>
                                                <button onClick={() => generateDemoText(key, 'long')}>Long</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="control-group">
                                <h3>Random Character Generator</h3>
                                <div className="random-char-options">
                                    <div className="char-length">
                                        <label>Length:</label>
                                        <input type="number" id="charLength" defaultValue="50" min="1" max="10000" />
                                    </div>
                                    <div className="char-sets">
                                        <label><input type="checkbox" value="lowercase" defaultChecked /> Lowercase</label>
                                        <label><input type="checkbox" value="uppercase" defaultChecked /> Uppercase</label>
                                        <label><input type="checkbox" value="numbers" defaultChecked /> Numbers</label>
                                        <label><input type="checkbox" value="symbols" /> Symbols</label>
                                        <label><input type="checkbox" value="special" /> Special Chars</label>
                                        <label><input type="checkbox" value="emoji" /> Emojis</label>
                                        <label><input type="checkbox" value="arrows" /> Arrows</label>
                                    </div>
                                    <button onClick={() => {
                                        const length = parseInt(document.getElementById('charLength').value);
                                        const checked = Array.from(document.querySelectorAll('.char-sets input:checked')).map(cb => cb.value);
                                        generateRandomChars(length, checked);
                                    }}>
                                        Generate Random
                                    </button>
                                </div>
                            </div>

                            <div className="control-group">
                                <h3>Repeated Text Generator</h3>
                                <div className="repeat-options">
                                    <input type="text" id="repeatText" placeholder="Enter text to repeat" />
                                    <input type="number" id="repeatCount" placeholder="Count" defaultValue="10" min="1" max="1000" />
                                    <input type="text" id="repeatSeparator" placeholder="Separator (optional)" />
                                    <button onClick={() => {
                                        const text = document.getElementById('repeatText').value;
                                        const count = parseInt(document.getElementById('repeatCount').value);
                                        const separator = document.getElementById('repeatSeparator').value;
                                        generateRepeatedText(text, count, separator);
                                    }}>
                                        Generate Repeated
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'manipulator' && (
                    <div className="manipulator-section">
                        <div className="manipulation-controls">
                            <h3>Text Manipulation</h3>
                            <div className="control-grid">
                                <div className="control-category">
                                    <h4>Remove Operations</h4>
                                    <button onClick={removeSpaces}>Remove Spaces</button>
                                    <button onClick={removeNewlines}>Remove Newlines</button>
                                    <button onClick={removeNumbers}>Remove Numbers</button>
                                    <button onClick={removeSpecialChars}>Remove Special Chars</button>
                                    <button onClick={removeDuplicateSpaces}>Remove Duplicate Spaces</button>
                                </div>
                                
                                <div className="control-category">
                                    <h4>Transform Operations</h4>
                                    <button onClick={addSpaces}>Add Spaces</button>
                                    <button onClick={reverseText}>Reverse Text</button>
                                    <button onClick={shuffleText}>Shuffle Characters</button>
                                    <button onClick={duplicateText}>Duplicate Text</button>
                                </div>
                                
                                <div className="control-category">
                                    <h4>Case Operations</h4>
                                    <button onClick={upperCaseText}>UPPERCASE</button>
                                    <button onClick={lowerCaseText}>lowercase</button>
                                    <button onClick={titleCaseText}>Title Case</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div className="stats-section">
                        <h3>Text Statistics</h3>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <span className="stat-label">Characters:</span>
                                <span className="stat-value">{charCount}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Words:</span>
                                <span className="stat-value">{wordCount}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Lines:</span>
                                <span className="stat-value">{lineCount}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Spaces:</span>
                                <span className="stat-value">{spaceCount}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Characters (no spaces):</span>
                                <span className="stat-value">{charCount - spaceCount}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Average word length:</span>
                                <span className="stat-value">{wordCount > 0 ? Math.round((charCount - spaceCount) / wordCount * 100) / 100 : 0}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="text-editor">
                    <div className="editor-header">
                        <h3>Text Editor</h3>
                        <div className="editor-controls">
                            <button onClick={copyToClipboard}>📋 Copy</button>
                            <button onClick={clearText}>🗑️ Clear</button>
                        </div>
                    </div>
                    <textarea
                        value={inputText}
                        onChange={handleTextChange}
                        placeholder="Enter text here or generate demo text above..."
                        className="text-input"
                        rows={15}
                    />
                </div>
            </div>
        </div>
    );
};

export default TextGenerator;