import React, { useState, useCallback, useEffect } from 'react';
import './MarkdownRenderer.css';

// Lazy load marked
const loadMarked = async () => {
    const { marked } = await import('marked');
    return marked;
};

const MarkdownRenderer = () => {
    const [markdownText, setMarkdownText] = useState(`# Markdown Complete Guide

Welcome to the **Markdown Renderer**! This comprehensive guide showcases all markdown features.

## Text Formatting

### Emphasis
- *Italic text* or _italic text_
- **Bold text** or __bold text__
- ***Bold and italic*** or ___bold and italic___
- ~~Strikethrough text~~

### Headers
# H1 - Main Title
## H2 - Section Title
### H3 - Subsection Title
#### H4 - Sub-subsection Title
##### H5 - Minor Heading
###### H6 - Smallest Heading

## Lists

### Unordered Lists
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
    - Deeply nested item 2.2.1
- Item 3

### Ordered Lists
1. First item
2. Second item
   1. Nested ordered item
   2. Another nested item
3. Third item

### Mixed Lists
1. Ordered item
   - Unordered sub-item
   - Another unordered sub-item
2. Another ordered item

## Links and Images

### Links
[Simple link](https://example.com)
[Link with title](https://example.com "This is a title")
[Reference link][1]
[Another reference][example]

### Images
![Alt text](https://via.placeholder.com/300x200 "Image title")
![Reference image][image-ref]

### Images with Links (Clickable Images)
[![Click this image to visit example.com](https://via.placeholder.com/300x150/0066cc/ffffff?text=Click+Me)](https://example.com "Click to visit example.com")

[![GitHub Logo](https://via.placeholder.com/200x100/333333/ffffff?text=GitHub)](https://github.com "Visit GitHub")

### Complex Image Links
[![Product Image](https://via.placeholder.com/250x200/ff6b6b/ffffff?text=Product+Image)](https://example.com/product "View Product Details")

### Reference-Style Image Links
[![Reference Image Link][linked-img-ref]][link-ref]

## Code

### Inline Code
Use \`console.log()\` for debugging.
Install packages with \`npm install package-name\`.

### Code Blocks

\`\`\`javascript
function greetUser(name) {
    console.log(\`Hello, \${name}!\`);
    return \`Welcome to our site, \${name}!\`;
}

const user = "John";
greetUser(user);
\`\`\`

\`\`\`python
def calculate_area(radius):
    import math
    return math.pi * radius ** 2

# Calculate area of circle
area = calculate_area(5)
print(f"Area: {area:.2f}")
\`\`\`

\`\`\`css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
\`\`\`

## Tables

### Simple Table
| Name | Age | City |
|------|-----|------|
| Alice | 30 | New York |
| Bob | 25 | Los Angeles |
| Charlie | 35 | Chicago |

### Table with Alignment
| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Left | Center | Right |
| Text | Text | Text |
| More text | More text | More text |

### Complex Table
| Feature | Supported | Notes | Priority |
|---------|-----------|-------|----------|
| Headers | ✅ | H1-H6 | High |
| Lists | ✅ | Ordered & unordered | High |
| Links | ✅ | Internal & external | High |
| Images | ✅ | ![alt text](url) | Medium |
| Code | ✅ | Inline and blocks | High |
| Tables | ✅ | This table! | Medium |

## Blockquotes

### Simple Blockquote
> This is a simple blockquote.
> It can span multiple lines.

### Nested Blockquotes
> This is a blockquote.
> 
> > This is a nested blockquote.
> > 
> > > And this is even more nested.

### Blockquote with Other Elements
> ## Quote Header
> 
> This blockquote contains:
> - A list item
> - Another list item
> 
> And some **bold text** and *italic text*.

## Horizontal Rules

---

*** 

___

## Advanced Features

### Task Lists
- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task
- [ ] Yet another task

### Definition Lists
Term 1
: Definition 1

Term 2
: Definition 2a
: Definition 2b

### Escape Characters
Use backslash to escape: \\*not italic\\* and \\**not bold\\**

### HTML Elements
<kbd>Ctrl</kbd> + <kbd>C</kbd> to copy
<mark>Highlighted text</mark>
<sub>Subscript</sub> and <sup>Superscript</sup>

## Special Characters & Symbols

### Symbols
© ® ™ § ¶ † ‡ • …

### Arrows
← → ↑ ↓ ↔ ↕ ↖ ↗ ↘ ↙

### Math Symbols
± × ÷ ≠ ≤ ≥ ∞ ∑ ∏ √ ∫

## Emojis
🎉 🚀 💡 ⚡ 🔥 ✨ 🎯 📚 💻 🌟

---

## Reference Links
[1]: https://example.com "Example link"
[example]: https://example.com "Another example"
[image-ref]: https://via.placeholder.com/150x100 "Reference image"
[linked-img-ref]: https://via.placeholder.com/200x120/28a745/ffffff?text=Linked+Image "Linked image"
[link-ref]: https://example.com/page "Target page for linked image"

---

*This document demonstrates the full power of Markdown!*`);
    const [renderedHtml, setRenderedHtml] = useState('');
    const [activeTab, setActiveTab] = useState('tutorial');
    // Configure marked options
    useEffect(() => {
        const options = {
            breaks: true,
            gfm: true,
            tables: true,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        };

        marked.setOptions({
            breaks: options.breaks,
            gfm: options.gfm,
            tables: options.tables,
            pedantic: options.pedantic,
            sanitize: options.sanitize,
            smartLists: options.smartLists,
            smartypants: options.smartypants,
            highlight: function (code, lang) {
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
    }, []);

    const downloadMarkdownText = () => {
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

    const downloadPreviewAsPDF = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Markdown Document</title>
                <style>
                    body { 
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                        line-height: 1.6; 
                        max-width: 800px; 
                        margin: 0 auto; 
                        padding: 20px; 
                        color: #333;
                    }
                    h1, h2, h3, h4, h5, h6 { 
                        color: #333; 
                        margin-top: 1.5rem; 
                        margin-bottom: 0.5rem; 
                    }
                    h1 { 
                        font-size: 2rem; 
                        border-bottom: 2px solid #eee; 
                        padding-bottom: 0.3rem; 
                    }
                    h2 { 
                        font-size: 1.5rem; 
                        border-bottom: 1px solid #eee; 
                        padding-bottom: 0.3rem; 
                    }
                    table { 
                        border-collapse: collapse; 
                        width: 100%; 
                        margin: 1rem 0; 
                    }
                    th, td { 
                        border: 1px solid #ddd; 
                        padding: 8px; 
                        text-align: left; 
                    }
                    th { 
                        background-color: #f2f2f2; 
                        font-weight: bold; 
                    }
                    code { 
                        background-color: #f4f4f4; 
                        padding: 2px 4px; 
                        border-radius: 3px; 
                        font-family: 'Courier New', monospace;
                    }
                    pre { 
                        background-color: #f4f4f4; 
                        padding: 10px; 
                        border-radius: 5px; 
                        overflow-x: auto; 
                        font-family: 'Courier New', monospace;
                    }
                    blockquote { 
                        border-left: 4px solid #ddd; 
                        margin: 0; 
                        padding-left: 20px; 
                        color: #666; 
                        font-style: italic;
                    }
                    ul, ol { 
                        margin: 1rem 0; 
                        padding-left: 2rem; 
                    }
                    li { 
                        margin-bottom: 0.5rem; 
                    }
                    img { 
                        max-width: 100%; 
                        height: auto; 
                    }
                    a { 
                        color: #0066cc; 
                        text-decoration: none; 
                    }
                    a:hover { 
                        text-decoration: underline; 
                    }
                    hr { 
                        border: none; 
                        border-top: 1px solid #ddd; 
                        margin: 2rem 0; 
                    }
                    @media print {
                        body { margin: 0; padding: 15px; }
                        h1, h2, h3, h4, h5, h6 { page-break-after: avoid; }
                        pre, blockquote { page-break-inside: avoid; }
                        img { page-break-inside: avoid; }
                    }
                </style>
            </head>
            <body>
                ${renderedHtml}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    };

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



    const tutorialLessons = [
        {
            title: "Headers & Structure",
            content: "Headers create document structure. Use # for headers - more # symbols make smaller headers. Always put a space after #.",
            example: "# Main Title (H1)\n## Section Title (H2)\n### Subsection (H3)\n#### Sub-subsection (H4)\n##### Minor Heading (H5)\n###### Smallest Heading (H6)\n\n---\n\n# Document Structure\nUse headers to organize your content hierarchically.",
            tryIt: "# My Document\n## Introduction\n### Overview"
        },
        {
            title: "Text Formatting & Emphasis",
            content: "Make text stand out with various formatting options. You can combine different styles for rich text.",
            example: "**Bold text** or __also bold__\n*Italic text* or _also italic_\n***Bold and italic*** or ___also bold and italic___\n~~Strikethrough text~~\n\n**You can *combine* formatting**\n*This is **really** important*\n\n`inline code` for technical terms\n<mark>Highlighted text</mark>\n<kbd>Ctrl</kbd> + <kbd>C</kbd> keyboard shortcuts",
            tryIt: "**Bold** and *italic*\n~~strikethrough~~"
        },
        {
            title: "Lists & Organization",
            content: "Organize information with lists. You can nest lists and mix different types. Use proper indentation (2 spaces) for nesting.",
            example: "## Unordered Lists\n- Item 1\n- Item 2\n  - Nested item 2.1\n  - Nested item 2.2\n    - Deeply nested 2.2.1\n- Item 3\n\n## Ordered Lists\n1. First item\n2. Second item\n   1. Nested ordered item\n   2. Another nested item\n3. Third item\n\n## Mixed Lists\n1. Ordered item\n   - Unordered sub-item\n   - Another unordered sub-item\n2. Another ordered item\n\n## Task Lists\n- [x] Completed task\n- [ ] Incomplete task\n- [x] Another completed task",
            tryIt: "- My item\n  - Nested item\n- Another item"
        },
        {
            title: "Links, Images & References",
            content: "Connect your content with links and images. You can combine images with links to create clickable images that navigate to other pages.",
            example: "## Links\n[Simple link](https://example.com)\n[Link with title](https://example.com \"Hover for title\")\n[Reference link][1]\n[Another reference][example-ref]\n\n## Images\n![Alt text](https://via.placeholder.com/300x200 \"Image title\")\n![Reference image][img-ref]\n\n## Images with Links (Clickable Images)\n[![Click this image](https://via.placeholder.com/300x150/0066cc/ffffff?text=Click+Me)](https://example.com \"Click to visit example.com\")\n\n[![GitHub Logo](https://via.placeholder.com/200x100/333333/ffffff?text=GitHub)](https://github.com \"Visit GitHub\")\n\n## Complex Image Links\n[![Product Image](https://via.placeholder.com/250x200/ff6b6b/ffffff?text=Product+Image)](https://example.com/product \"View Product Details\")\n\n## Reference-Style Image Links\n[![Reference Image Link][linked-img-ref]][link-ref]\n\n## Email & Auto-links\n<user@example.com>\n<https://example.com>\n\n## Reference Definitions\n[1]: https://example.com \"Example link\"\n[example-ref]: https://github.com \"GitHub\"\n[img-ref]: https://via.placeholder.com/150x100 \"Reference image\"\n[linked-img-ref]: https://via.placeholder.com/200x120/28a745/ffffff?text=Linked+Image \"Linked image\"\n[link-ref]: https://example.com/page \"Target page for linked image\"",
            tryIt: "[My Link](https://example.com)\n![My Image](https://via.placeholder.com/200x100)\n\n[![Clickable Image](https://via.placeholder.com/150x100/007bff/ffffff?text=Click+Me)](https://example.com)"
        },
        {
            title: "Code & Syntax Highlighting",
            content: "Display code with proper formatting. Use backticks for inline code and triple backticks for code blocks with syntax highlighting.",
            example: "## Inline Code\nUse `console.log()` for debugging.\nInstall with `npm install package-name`.\nThe `Array.map()` method is powerful.\n\n## Code Blocks\n\n```javascript\nfunction greetUser(name) {\n    console.log('Hello, ' + name + '!');\n    return 'Welcome, ' + name + '!';\n}\n\nconst user = \"John\";\ngreetUser(user);\n```\n\n```python\ndef calculate_area(radius):\n    import math\n    return math.pi * radius ** 2\n\narea = calculate_area(5)\nprint(f\"Area: {area:.2f}\")\n```\n\n```css\n.container {\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: 20px;\n}\n```",
            tryIt: "`inline code`\n\n```javascript\nconsole.log('Hello World');\n```"
        },
        {
            title: "Tables & Data",
            content: "Create tables to organize data. Use alignment options and format cells with other markdown elements.",
            example: "## Simple Table\n| Name | Age | City |\n|------|-----|------|\n| Alice | 30 | New York |\n| Bob | 25 | Los Angeles |\n| Charlie | 35 | Chicago |\n\n## Table with Alignment\n| Left Aligned | Center Aligned | Right Aligned |\n|:-------------|:--------------:|--------------:|\n| Left | Center | Right |\n| Text | Text | Text |\n| More text | More text | More text |\n\n## Complex Table\n| Feature | Supported | Notes | Priority |\n|---------|-----------|-------|---------|\n| Headers | ✅ | H1-H6 | High |\n| Lists | ✅ | Ordered & unordered | High |\n| Links | ✅ | `[text](url)` | High |\n| Images | ✅ | `![alt](url)` | Medium |\n| Code | ✅ | Inline and blocks | High |\n| **Tables** | ✅ | *This table!* | Medium |",
            tryIt: "| Item | Price |\n|------|-------|\n| Apple | $1 |\n| Orange | $2 |"
        },
        {
            title: "Blockquotes & Citations",
            content: "Use blockquotes for citations, pull quotes, or highlighting important information. You can nest blockquotes and include other markdown elements.",
            example: "## Simple Blockquote\n> This is a simple blockquote.\n> It can span multiple lines and paragraphs.\n\n## Nested Blockquotes\n> This is a blockquote.\n> \n> > This is a nested blockquote.\n> > \n> > > And this is even more nested.\n\n## Blockquote with Elements\n> ## Quote Header\n> \n> This blockquote contains:\n> - A list item\n> - Another list item\n> \n> And some **bold text** and *italic text*.\n> \n> ```javascript\n> console.log('Code in blockquote');\n> ```\n\n## Attribution\n> \"The best way to predict the future is to invent it.\"\n> \n> — *Alan Kay*",
            tryIt: "> This is my quote\n> \n> It spans multiple lines"
        },
        {
            title: "Advanced Features",
            content: "Explore advanced markdown features including horizontal rules, HTML elements, escape characters, and special formatting.",
            example: "## Horizontal Rules\n---\n*** \n___\n\n## HTML Elements\n<kbd>Ctrl</kbd> + <kbd>C</kbd> to copy\n<mark>Highlighted text</mark>\n<sub>Subscript</sub> and <sup>Superscript</sup>\n<details>\n<summary>Click to expand</summary>\nHidden content here!\n</details>\n\n## Escape Characters\nUse backslash to escape: \\*not italic\\* and \\**not bold\\**\n\\# Not a header\n\\[Not a link\\]\n\n## Special Characters\n© ® ™ § ¶ † ‡ • …\n← → ↑ ↓ ↔ ↕ ↖ ↗ ↘ ↙\n± × ÷ ≠ ≤ ≥ ∞ ∑ ∏ √ ∫\n\n## Emojis\n🎉 🚀 💡 ⚡ 🔥 ✨ 🎯 📚 💻 🌟\n\n## Line Breaks\nTo create a line break,  \nend a line with two spaces.\n\nOr use a blank line\n\nto create a new paragraph.",
            tryIt: "---\n\n**Bold** and <mark>highlighted</mark>\n\n🎉 Emoji!"
        },
        {
            title: "Best Practices & Tips",
            content: "Learn markdown best practices, common mistakes to avoid, and tips for writing clean, readable documents.",
            example: "## Document Structure\n# Main Title\n## Section 1\n### Subsection 1.1\n### Subsection 1.2\n## Section 2\n\n## Spacing Guidelines\n- Leave blank lines around headers\n- Use consistent list indentation (2 spaces)\n- Add blank lines between different elements\n\n## Link Organization\nUse reference-style links for cleaner text:\n\nCheck out [GitHub][gh] and [Stack Overflow][so] for help.\n\n## Code Documentation\n```javascript\n// Good: Clear function with comments\nfunction calculateTotal(items) {\n    // Calculate sum of all item prices\n    return items.reduce((sum, item) => sum + item.price, 0);\n}\n```\n\n## Table Formatting\n| Well | Formatted | Table |\n|------|-----------|-------|\n| Easy | To | Read |\n| Clean | Alignment | Matters |\n\n## Common Mistakes\n- ❌ `#Header` (missing space)\n- ✅ `# Header` (correct)\n- ❌ `[link] (url)` (extra space)\n- ✅ `[link](url)` (correct)\n\n[gh]: https://github.com\n[so]: https://stackoverflow.com",
            tryIt: "# My Document\n\n## Introduction\nThis is a well-structured document.\n\n- Clean formatting\n- Proper spacing\n- Clear hierarchy"
        }
    ];


    const renderTutorialLesson = (lesson, index) => {
        return (
            <div key={index} className="lesson-card">
                <div className="lesson-header">
                    <h4>{lesson.title}</h4>
                </div>
                <p className="lesson-content">{lesson.content}</p>
                <div className="lesson-example">
                    <div className="example-section">
                        <strong>Example:</strong>
                        <div className="code-block">{lesson.example}</div>
                    </div>
                    <div className="preview-section">
                        <strong>Preview:</strong>
                        <div className="mini-preview" dangerouslySetInnerHTML={{ __html: marked(lesson.example) }} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="tools-container">
            <div className="markdown-tool">
                <div className="tool-tabs">
                    <button
                        className={`tool-tab ${activeTab === 'tutorial' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tutorial')}
                    >
                        📚 Tutorial
                    </button>
                    <button
                        className={`tool-tab ${activeTab === 'split' ? 'active' : ''}`}
                        onClick={() => setActiveTab('split')}
                    >
                        📱 Split View
                    </button>
                </div>


                <div className="markdown-content">
                    {activeTab === 'tutorial' && (
                        <div className="tutorial-mode">
                            <div className="tutorial-header">
                                <h3>Learn Markdown Tutorial</h3>
                            </div>
                            <div className="tutorial-content">
                                {tutorialLessons.map((lesson, index) => renderTutorialLesson(lesson, index))}
                            </div>
                        </div>
                    )}


                    {activeTab === 'split' && (
                        <div className="split-mode">
                            <div className="split-editor">
                                <div className="section-header">
                                    <h3>Editor</h3>
                                    <button className="download-btn" onClick={downloadMarkdownText} title="Download as Markdown">
                                        💾 Download .md
                                    </button>
                                </div>
                                <textarea
                                    value={markdownText}
                                    onChange={(e) => setMarkdownText(e.target.value)}
                                    placeholder="Edit this comprehensive markdown example or clear it to start fresh..."
                                    className="markdown-textarea split"
                                    rows={50}
                                />
                            </div>
                            <div className="split-preview">
                                <div className="section-header">
                                    <h3>Live Preview</h3>
                                    <button className="download-btn" onClick={downloadPreviewAsPDF} title="Download as PDF">
                                        📄 Download PDF
                                    </button>
                                </div>
                                <div
                                    className="markdown-preview split"
                                    dangerouslySetInnerHTML={{ __html: renderedHtml }}
                                />
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default MarkdownRenderer;