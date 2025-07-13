import React, { useState, useCallback, useEffect } from 'react';
import { marked } from 'marked';
import './MarkdownRenderer.css';

const MarkdownRenderer = () => {
    const [markdownText, setMarkdownText] = useState('');
    const [renderedHtml, setRenderedHtml] = useState('');
    const [activeTab, setActiveTab] = useState('editor');
    const [options, setOptions] = useState({
        breaks: true,
        gfm: true,
        tables: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });

    const sampleMarkdown = `# Markdown Renderer

Welcome to the **Markdown Renderer** tool! This tool allows you to write and preview Markdown content in real-time.

## Features

- ✅ Real-time preview
- ✅ GitHub Flavored Markdown support
- ✅ Syntax highlighting for code blocks
- ✅ Table support
- ✅ Custom rendering options

### Code Example

\`\`\`javascript
function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

### Table Example

| Feature | Supported | Notes |
|---------|-----------|-------|
| Headers | ✅ | H1-H6 |
| Lists | ✅ | Ordered & unordered |
| Links | ✅ | Internal & external |
| Images | ✅ | ![alt text](url) |
| Code | ✅ | Inline and blocks |

### Lists

**Unordered:**
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3

**Ordered:**
1. First item
2. Second item
3. Third item

### Blockquotes

> This is a blockquote.
> 
> It can span multiple lines and paragraphs.
>
> > Nested quotes are also supported.

### Links and Emphasis

Visit [GitHub](https://github.com) for more information.

You can use *italic text*, **bold text**, or ***bold italic text***.

You can also use ~~strikethrough~~ text.

### Horizontal Rule

---

That's it! Start editing to see your Markdown rendered in real-time.`;

    // Configure marked options
    useEffect(() => {
        marked.setOptions({
            breaks: options.breaks,
            gfm: options.gfm,
            tables: options.tables,
            pedantic: options.pedantic,
            sanitize: options.sanitize,
            smartLists: options.smartLists,
            smartypants: options.smartypants,
            highlight: function(code, lang) {
                // Basic syntax highlighting for common languages
                if (lang === 'javascript' || lang === 'js') {
                    return code
                        .replace(/\b(function|const|let|var|return|if|else|for|while|class|import|export|from)\b/g, '<span class="keyword">$1</span>')
                        .replace(/\b(true|false|null|undefined)\b/g, '<span class="literal">$1</span>')
                        .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
                        .replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>')
                        .replace(/`([^`]*)`/g, '<span class="string">`$1`</span>')
                        .replace(/\/\/(.*)/g, '<span class="comment">//$1</span>');
                }
                return code;
            }
        });
    }, [options]);

    const renderMarkdown = useCallback(() => {
        if (!markdownText.trim()) {
            setRenderedHtml('');
            return;
        }

        try {
            const html = marked(markdownText);
            setRenderedHtml(html);
        } catch (error) {
            setRenderedHtml(`<div class="error">Error rendering markdown: ${error.message}</div>`);
        }
    }, [markdownText]);

    useEffect(() => {
        renderMarkdown();
    }, [renderMarkdown]);

    const handleOptionChange = (option) => {
        setOptions(prev => ({
            ...prev,
            [option]: !prev[option]
        }));
    };

    const loadSample = () => {
        setMarkdownText(sampleMarkdown);
    };

    const clearEditor = () => {
        setMarkdownText('');
    };

    const copyMarkdown = () => {
        navigator.clipboard.writeText(markdownText);
    };

    const copyHtml = () => {
        navigator.clipboard.writeText(renderedHtml);
    };

    const downloadMarkdown = () => {
        const blob = new Blob([markdownText], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const downloadHtml = () => {
        const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Document</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
        pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
        blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 20px; color: #666; }
    </style>
</head>
<body>
${renderedHtml}
</body>
</html>`;
        const blob = new Blob([fullHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'text/markdown') {
            const reader = new FileReader();
            reader.onload = (e) => {
                setMarkdownText(e.target.result);
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="tools-container">
            <div className="tool-header">
                <div className="tool-header-content">
                    <h1 className="tool-title">Markdown Renderer</h1>
                    <p className="tool-subtitle">Write and preview Markdown content with real-time rendering</p>
                </div>
            </div>

            <div className="markdown-tool">
                <div className="tool-tabs">
                    <button
                        className={`tool-tab ${activeTab === 'editor' ? 'active' : ''}`}
                        onClick={() => setActiveTab('editor')}
                    >
                        ✏️ Editor
                    </button>
                    <button
                        className={`tool-tab ${activeTab === 'preview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('preview')}
                    >
                        👁️ Preview
                    </button>
                    <button
                        className={`tool-tab ${activeTab === 'split' ? 'active' : ''}`}
                        onClick={() => setActiveTab('split')}
                    >
                        📱 Split View
                    </button>
                    <button
                        className={`tool-tab ${activeTab === 'options' ? 'active' : ''}`}
                        onClick={() => setActiveTab('options')}
                    >
                        ⚙️ Options
                    </button>
                </div>

                <div className="markdown-controls">
                    <div className="control-group">
                        <button className="btn btn-sample" onClick={loadSample}>
                            📄 Load Sample
                        </button>
                        <button className="btn btn-clear" onClick={clearEditor}>
                            🗑️ Clear
                        </button>
                        <label className="btn btn-upload">
                            📁 Upload .md
                            <input
                                type="file"
                                accept=".md,.markdown"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div>

                    <div className="control-group">
                        <button className="btn btn-copy" onClick={copyMarkdown} title="Copy Markdown">
                            📋 Copy MD
                        </button>
                        <button className="btn btn-copy" onClick={copyHtml} title="Copy HTML">
                            📋 Copy HTML
                        </button>
                        <button className="btn btn-download" onClick={downloadMarkdown}>
                            💾 Download MD
                        </button>
                        <button className="btn btn-download" onClick={downloadHtml}>
                            💾 Download HTML
                        </button>
                    </div>
                </div>

                <div className="markdown-content">
                    {activeTab === 'editor' && (
                        <div className="editor-mode">
                            <div className="editor-section">
                                <div className="section-header">
                                    <h3>Markdown Editor</h3>
                                    <div className="editor-stats">
                                        {markdownText.length} characters | {markdownText.split('\n').length} lines
                                    </div>
                                </div>
                                <textarea
                                    value={markdownText}
                                    onChange={(e) => setMarkdownText(e.target.value)}
                                    placeholder="Start typing your Markdown here...

# Example Header
Write your **bold** and *italic* text here.

- List item 1
- List item 2

[Link text](https://example.com)

```javascript
console.log('Hello, World!');
```"
                                    className="markdown-textarea"
                                    rows={20}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'preview' && (
                        <div className="preview-mode">
                            <div className="preview-section">
                                <div className="section-header">
                                    <h3>Preview</h3>
                                </div>
                                <div
                                    className="markdown-preview"
                                    dangerouslySetInnerHTML={{ __html: renderedHtml }}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'split' && (
                        <div className="split-mode">
                            <div className="split-editor">
                                <div className="section-header">
                                    <h3>Editor</h3>
                                </div>
                                <textarea
                                    value={markdownText}
                                    onChange={(e) => setMarkdownText(e.target.value)}
                                    placeholder="Type your Markdown here..."
                                    className="markdown-textarea split"
                                    rows={20}
                                />
                            </div>
                            <div className="split-preview">
                                <div className="section-header">
                                    <h3>Live Preview</h3>
                                </div>
                                <div
                                    className="markdown-preview split"
                                    dangerouslySetInnerHTML={{ __html: renderedHtml }}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'options' && (
                        <div className="options-mode">
                            <div className="options-section">
                                <h3>Rendering Options</h3>
                                <div className="options-grid">
                                    <label className="option-item">
                                        <input
                                            type="checkbox"
                                            checked={options.gfm}
                                            onChange={() => handleOptionChange('gfm')}
                                        />
                                        <div className="option-info">
                                            <strong>GitHub Flavored Markdown</strong>
                                            <p>Enable GitHub-style markdown extensions</p>
                                        </div>
                                    </label>

                                    <label className="option-item">
                                        <input
                                            type="checkbox"
                                            checked={options.breaks}
                                            onChange={() => handleOptionChange('breaks')}
                                        />
                                        <div className="option-info">
                                            <strong>Line Breaks</strong>
                                            <p>Convert single line breaks to &lt;br&gt; tags</p>
                                        </div>
                                    </label>

                                    <label className="option-item">
                                        <input
                                            type="checkbox"
                                            checked={options.tables}
                                            onChange={() => handleOptionChange('tables')}
                                        />
                                        <div className="option-info">
                                            <strong>Tables</strong>
                                            <p>Enable table parsing and rendering</p>
                                        </div>
                                    </label>

                                    <label className="option-item">
                                        <input
                                            type="checkbox"
                                            checked={options.smartLists}
                                            onChange={() => handleOptionChange('smartLists')}
                                        />
                                        <div className="option-info">
                                            <strong>Smart Lists</strong>
                                            <p>Intelligent list parsing behavior</p>
                                        </div>
                                    </label>

                                    <label className="option-item">
                                        <input
                                            type="checkbox"
                                            checked={options.smartypants}
                                            onChange={() => handleOptionChange('smartypants')}
                                        />
                                        <div className="option-info">
                                            <strong>Smart Quotes</strong>
                                            <p>Convert quotes to smart quotes</p>
                                        </div>
                                    </label>

                                    <label className="option-item">
                                        <input
                                            type="checkbox"
                                            checked={options.pedantic}
                                            onChange={() => handleOptionChange('pedantic')}
                                        />
                                        <div className="option-info">
                                            <strong>Pedantic Mode</strong>
                                            <p>Strict markdown compliance</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="syntax-guide">
                                <h3>Markdown Syntax Guide</h3>
                                <div className="syntax-examples">
                                    <div className="syntax-category">
                                        <h4>Headers</h4>
                                        <code># H1<br/># H2<br/>### H3</code>
                                    </div>
                                    <div className="syntax-category">
                                        <h4>Emphasis</h4>
                                        <code>*italic* **bold**<br/>~~strikethrough~~</code>
                                    </div>
                                    <div className="syntax-category">
                                        <h4>Lists</h4>
                                        <code>- Item 1<br/>- Item 2<br/><br/>1. Numbered<br/>2. List</code>
                                    </div>
                                    <div className="syntax-category">
                                        <h4>Links & Images</h4>
                                        <code>[Link](url)<br/>![Image](url)</code>
                                    </div>
                                    <div className="syntax-category">
                                        <h4>Code</h4>
                                        <code>`inline code`<br/>```<br/>code block<br/>```</code>
                                    </div>
                                    <div className="syntax-category">
                                        <h4>Tables</h4>
                                        <code>| Col 1 | Col 2 |<br/>|-------|-------|<br/>| Data  | Data  |</code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MarkdownRenderer;