import React, { useState, useCallback, useEffect } from 'react';
import { marked } from 'marked';
import './MarkdownRenderer.css';

const MarkdownRenderer = () => {
    const [markdownText, setMarkdownText] = useState('');
    const [renderedHtml, setRenderedHtml] = useState('');
    const [activeTab, setActiveTab] = useState('tutorial');
    const [tryItMarkdown, setTryItMarkdown] = useState('');
    const options = {
        breaks: true,
        gfm: true,
        tables: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    };


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



    const tutorialLessons = [
        {
            title: "Headers",
            content: "Use # for headers. More # means smaller header.",
            example: "# Big Header\n## Medium Header\n### Small Header",
            tryIt: "# My Header\n## Sub Header"
        },
        {
            title: "Text Formatting",
            content: "Make text bold with **text** or italic with *text*.",
            example: "**Bold text** and *italic text*\n~~Strikethrough~~",
            tryIt: "**Bold** and *italic*"
        },
        {
            title: "Lists",
            content: "Use - for bullet points or 1. for numbered lists.",
            example: "- Item 1\n- Item 2\n\n1. First\n2. Second",
            tryIt: "- My item\n- Another item"
        },
        {
            title: "Links",
            content: "Create links with [text](url) format.",
            example: "[Google](https://google.com)\n[GitHub](https://github.com)",
            tryIt: "[My Link](https://example.com)"
        },
        {
            title: "Code",
            content: "Use `code` for inline code or ```code``` for blocks.",
            example: "`console.log('hello')`\n\n```javascript\nfunction hello() {\n  return 'world';\n}\n```",
            tryIt: "`inline code`"
        },
        {
            title: "Tables",
            content: "Create tables with | to separate columns.",
            example: "| Name | Age |\n|------|-----|\n| John | 25  |\n| Jane | 30  |",
            tryIt: "| Item | Price |\n|------|-------|\n| Apple | $1 |"
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

                </div>
            </div>
        </div>
    );
};

export default MarkdownRenderer;