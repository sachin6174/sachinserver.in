import React, { useState, useCallback, useEffect } from 'react';
import './LaTeXRenderer.css';

const LaTeXRenderer = () => {
    const [latexText, setLatexText] = useState(`%-------------------------
% Resume in Latex
% Author : Jake Gutierrez
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape Sachin Kumar} \\\\ \\vspace{1pt}
    \\small \\href{https://sachinserver.in}{\\underline{sachinserver.in}} $|$ 
    \\href{mailto:sachinmehtab@gmail.com}{\\underline{sachinmehtab@gmail.com}} $|$ 
    +91 9501841073 $|$ 
    \\href{https://linkedin.com/in/sachinkumar6174}{\\underline{linkedin.com/in/sachinkumar6174}} $|$
    \\href{https://github.com/sachin6174}{\\underline{github.com/sachin6174}}
\\end{center}

%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {Chandigarh Group of Colleges}{Landran, Punjab}
      {Bachelor of Technology in Computer Science Engineering}{2019 -- 2023}
    \\resumeSubheading
      {Shishu Niketan Public School}{Chandigarh}
      {Intermediate Class 12, Class 10}{March 2019}
  \\resumeSubHeadingListEnd

%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {Mac/iOS Developer}{July 2023 -- Present}
      {\\href{https://www.linkedin.com/company/42gears}{\\underline{42 Gears Mobility Systems Private Limited}}}{Bangalore}
      \\resumeItemListStart
        \\resumeItem{Developed jobs for installing, upgrading, and uninstalling apps (PKG, DMG, and PKG inside DMG) using command-line helper tool and shell scripting}
        \\resumeItem{Implemented ordered and unordered downloads for file transfer functionality}
        \\resumeItem{Enabled location-based job execution using geofencing and reverse geocoding}
        \\resumeItem{Monitored device uptime and hardware changes (RAM, storage, display, battery) using Swift Codable}
        \\resumeItem{Implemented user management features including creation, access control, and password management}
        \\resumeItem{Developed remote device actions (reboot, shutdown, sleep) with user notifications}
        \\resumeItem{Implemented analytics and log collection, crash ips collection for device events and app usage}
        \\resumeItem{Resolved issues related to network extensions, remote support, QR enrollment, WebView enrollment and architectural improvements}
        \\resumeItem{Managed process daemonization, agent launching, menu bar apps, and packaging (DMG, PKG)}
        \\resumeItem{Just-in-time (JIT) to elevate privileges for users}
      \\resumeItemListEnd
    
    \\resumeSubheading
      {Mac/iOS Developer Intern}{February 2023 -- June 2023}
      {\\href{https://www.linkedin.com/company/42gears}{\\underline{42 Gears Mobility Systems Private Limited}}}{Bangalore}
      \\resumeItemListStart
        \\resumeItem{Learned and implemented solutions using Swift, UIKit and SwiftUI}
        \\resumeItem{Worked with asynchronous programming for optimized performance}
        \\resumeItem{Gained expertise in PKG/DMG creation, signing, and notarisation}
        \\resumeItem{Worked with CoreData, UserDefaults, Keychain, and Managed Configuration}
        \\resumeItem{Utilized macOS Terminal scripting for automation, Jira for issue tracking, and SonarQube for code quality}
      \\resumeItemListEnd
  \\resumeSubHeadingListEnd

%-----------PROJECTS-----------
\\section{Projects}
    \\resumeSubHeadingListStart
      \\resumeProjectHeading
          {\\textbf{NotingDown} $|$ \\emph{SwiftUI, Core Data, iOS}}{2025}
          \\resumeItemListStart
            \\resumeItem{Developed a feature-rich note-taking application for iOS using SwiftUI and Core Data}
            \\resumeItem{Published on Apple App Store: \\href{https://apps.apple.com/us/app/notingdown/id6742340327}{\\underline{apps.apple.com/notingdown}}}
            \\resumeItem{Open source project available at: \\href{https://github.com/sachin6174/NotingDown}{\\underline{github.com/sachin6174/NotingDown}}}
          \\resumeItemListEnd
          
      \\resumeProjectHeading
          {\\textbf{Secure Text} $|$ \\emph{JavaScript, Chrome Extension, Cryptography}}{2024}
          \\resumeItemListStart
            \\resumeItem{Built a Chrome extension for text encryption/decryption with password protection}
            \\resumeItem{Implemented Base64 and Base32 encoding/decoding functionality}
            \\resumeItem{GitHub Link: \\href{https://github.com/sachin6174/secure-text-chrome-extension}{\\underline{github.com/sachin6174/secure-text-chrome-extension}}}
            \\resumeItem{Chrome Web Store: \\href{https://chromewebstore.google.com/detail/secure-text/ankgchfieiimiijhlcjcongijapefmei}{\\underline{chromewebstore.google.com/detail/secure-text/ankgchfieiimiijhlcjcongijapefmei}}}
          \\resumeItemListEnd

      \\resumeProjectHeading
          {\\textbf{QR Encoder Decoder} $|$ \\emph{JavaScript, QR Code API, Cryptography}}{2024}
          \\resumeItemListStart
            \\resumeItem{Developed a Chrome extension that combines encryption with QR code generation}
            \\resumeItem{Implemented multi-iteration encryption with password protection}
            \\resumeItem{GitHub Link: \\href{https://github.com/sachin6174/YBV-QR-Encoder-Decoder}{\\underline{github.com/sachin6174/YBV-QR-Encoder-Decoder}}}
            \\resumeItem{Chrome Web Store Link: \\href{https://chromewebstore.google.com/detail/ybv-qr-encoder-decoder/bkfdepagfbledopemnbibcpcmainlfam}{\\underline{chromewebstore.google.com/detail/ybv-qr-encoder-decoder/bkfdepagfbledopemnbibcpcmainlfam}}}
          \\resumeItemListEnd
    \\resumeSubHeadingListEnd

%-----------PROGRAMMING SKILLS-----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: Swift, Objective-C Basics, JavaScript, SQL, C++} \\\\
     \\textbf{Frameworks \\& Technologies}{: UIKit, SwiftUI, CoreData, React, Node.js} \\\\
     \\textbf{Developer Tools}{: Xcode, Git, GitHub, GitLab, MongoDB} \\\\
     \\textbf{Others}{: iOS Development, MVC/MVVM, XCTest, XCUITest, System Design, Debugging}
    }}
 \\end{itemize}

\\end{document}`);
    const [renderedHtml, setRenderedHtml] = useState('');
    const [activeTab, setActiveTab] = useState('tutorial');
    const [tryItLatex, setTryItLatex] = useState('');

    const downloadLatexText = () => {
        const blob = new Blob([latexText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.tex';
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
                <title>LaTeX Document</title>
                <style>
                    body { 
                        font-family: 'Times New Roman', serif; 
                        line-height: 1.6; 
                        max-width: 800px; 
                        margin: 0 auto; 
                        padding: 20px; 
                        color: #333;
                    }
                    .latex-title { 
                        text-align: center; 
                        font-size: 2rem; 
                        margin-bottom: 0.5rem; 
                        font-weight: bold;
                    }
                    .latex-author { 
                        text-align: center; 
                        font-size: 1.1rem; 
                        margin-bottom: 0.3rem; 
                    }
                    .latex-date { 
                        text-align: center; 
                        font-size: 1rem; 
                        margin-bottom: 2rem; 
                    }
                    .latex-section { 
                        font-size: 1.5rem; 
                        font-weight: bold; 
                        margin-top: 2rem; 
                        margin-bottom: 1rem; 
                    }
                    .latex-subsection { 
                        font-size: 1.2rem; 
                        font-weight: bold; 
                        margin-top: 1.5rem; 
                        margin-bottom: 0.8rem; 
                    }
                    .latex-math { 
                        font-style: italic; 
                        color: #006600; 
                    }
                    .latex-equation { 
                        text-align: center; 
                        margin: 1.5rem 0; 
                        padding: 1rem; 
                        background: #f8f8f8; 
                        border-radius: 6px; 
                        font-style: italic; 
                    }
                    .latex-itemize, .latex-enumerate { 
                        margin: 1rem 0; 
                        padding-left: 2rem; 
                    }
                    .latex-itemize li, .latex-enumerate li { 
                        margin-bottom: 0.5rem; 
                    }
                    .latex-tabular { 
                        border-collapse: collapse; 
                        margin: 1rem auto; 
                        border: 1px solid #333; 
                    }
                    .latex-tabular th, .latex-tabular td { 
                        padding: 0.5rem 1rem; 
                        border: 1px solid #333; 
                        text-align: center; 
                    }
                    .latex-tabular th { 
                        background: #f0f0f0; 
                        font-weight: bold; 
                    }
                    .latex-code { 
                        background: #f4f4f4; 
                        padding: 1rem; 
                        border-radius: 6px; 
                        font-family: 'Courier New', monospace; 
                        font-size: 0.9rem; 
                        overflow-x: auto; 
                    }
                    .latex-theorem { 
                        background: #f0f8ff; 
                        padding: 1rem; 
                        border-radius: 6px; 
                        border-left: 4px solid #0066cc; 
                        margin: 1rem 0; 
                    }
                    .latex-proof { 
                        background: #f8f8f8; 
                        padding: 1rem; 
                        border-radius: 6px; 
                        border-left: 4px solid #666; 
                        margin: 1rem 0; 
                    }
                    .latex-bibliography { 
                        margin-top: 2rem; 
                        padding-top: 1rem; 
                        border-top: 1px solid #333; 
                    }
                    .latex-bibliography h3 { 
                        margin-bottom: 1rem; 
                        font-size: 1.2rem; 
                        font-weight: bold; 
                    }
                    .latex-bibliography ul { 
                        list-style: none; 
                        padding: 0; 
                    }
                    .latex-bibliography li { 
                        margin-bottom: 0.5rem; 
                        padding-left: 1rem; 
                        text-indent: -1rem; 
                    }
                    @media print {
                        body { margin: 0; padding: 15px; }
                        .latex-section, .latex-subsection { page-break-after: avoid; }
                        .latex-theorem, .latex-proof, .latex-code { page-break-inside: avoid; }
                        .latex-tabular { page-break-inside: avoid; }
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

    const renderLatex = useCallback(() => {
        if (!latexText.trim()) {
            setRenderedHtml('');
            return;
        }

        try {
            let html = latexText;
            
            // Remove comments first
            html = html.replace(/%.*$/gm, '');
            
            // Document structure
            html = html
                .replace(/\\documentclass(\[[^\]]*\])?\{[^}]+\}/g, '')
                .replace(/\\usepackage(\[[^\]]*\])?\{[^}]+\}/g, '')
                .replace(/\\input\{[^}]+\}/g, '')
                .replace(/\\pagestyle\{[^}]+\}/g, '')
                .replace(/\\fancyhf\{\}/g, '')
                .replace(/\\fancyfoot\{\}/g, '')
                .replace(/\\renewcommand\{[^}]+\}\{[^}]*\}/g, '')
                .replace(/\\addtolength\{[^}]+\}\{[^}]+\}/g, '')
                .replace(/\\urlstyle\{[^}]+\}/g, '')
                .replace(/\\raggedbottom/g, '')
                .replace(/\\raggedright/g, '')
                .replace(/\\setlength\{[^}]+\}\{[^}]+\}/g, '')
                .replace(/\\pdfgentounicode=1/g, '')
                .replace(/\\titleformat\{[^}]+\}[\s\S]*?\]/g, '');

            // Remove all command definitions and fragments more aggressively
            // First, find and remove the entire command definition section
            html = html.replace(/%-------------------------[\s\S]*?Custom commands[\s\S]*?%-------------------------------------------/g, '');
            
            // Remove any remaining newcommand definitions with better pattern matching
            html = html.replace(/\\newcommand\{[^}]+\}(\[[^\]]*\])?\{[\s\S]*?\n\}/g, '');
            html = html.replace(/\\renewcommand[^}]*\{[^}]*\}/g, '');
            
            // More aggressive fragment removal
            html = html.replace(/\{[\s\S]*?\}\[t\]\{l@\{\\extracolsep\{\\fill\}\}r\}/g, '');
            html = html.replace(/\{0\.97\\textwidth\}\{l@\{\\extracolsep\{\\fill\}\}r\}/g, '');
            html = html.replace(/\[leftmargin=0\.15in, label=\{\}\]/g, '');
            html = html.replace(/#[1-4]/g, '');
            html = html.replace(/\$\\vcenter\{\\hbox\{\\tiny\$\\bullet\$\}\}\$/g, '');
            
            // Remove specific problematic patterns
            html = html.replace(/\\begin\s*$/gm, '');
            html = html.replace(/\\textbf\{\}\s*$/gm, '');
            html = html.replace(/^\s*\}\s*$/gm, '');
            html = html.replace(/^\s*\}\s*\}\s*$/gm, '');
            html = html.replace(/^\s*\}\s*\}\s*\}\s*$/gm, '');
            html = html.replace(/^\s*\}\s*\}\s*\}\s*\}\s*$/gm, '');
            html = html.replace(/^\s*\$\}\s*$/gm, '');
            html = html.replace(/^\s*\}\s*\$\}\s*$/gm, '');
            
            // Clean up any orphaned braces and fragments line by line
            html = html.replace(/^\s*\[t\]\{l@\{\\extracolsep\{\\fill\}\}r\}.*$/gm, '');
            html = html.replace(/^\s*\{0\.97\\textwidth\}.*$/gm, '');
            html = html.replace(/^\s*\[leftmargin.*$/gm, '');
            html = html.replace(/^\s*#[1-4]\s*.*$/gm, '');
            html = html.replace(/^\s*\$\\vcenter.*$/gm, '');
            html = html.replace(/^\s*\\begin\s*\\textbf\{\}\s*$/gm, '');
            html = html.replace(/^\s*\\begin\s*$/gm, '');
            html = html.replace(/^\s*\\textbf\{\}\s*$/gm, '');
            
            // Remove empty lines and multiple consecutive newlines
            html = html.replace(/^\s*\n$/gm, '');
            html = html.replace(/\n\s*\n\s*\n/g, '\n\n');
            
            // Final cleanup for any remaining orphaned elements
            html = html.replace(/^\s*[\{\}\$]+\s*$/gm, '');
            html = html.replace(/^\s*\\[a-zA-Z]*\{\}\s*$/gm, '');

            // Handle document structure
            html = html
                .replace(/\\begin\{document\}/g, '<div class="latex-document">')
                .replace(/\\end\{document\}/g, '</div>')
                .replace(/\\title\{([^}]+)\}/g, '<h1 class="latex-title">$1</h1>')
                .replace(/\\author\{([^}]+)\}/g, '<p class="latex-author">$1</p>')
                .replace(/\\date\{([^}]+)\}/g, '<p class="latex-date">$1</p>')
                .replace(/\\maketitle/g, '');

            // Handle sections
            html = html
                .replace(/\\section\{([^}]+)\}/g, '<h2 class="latex-section">$1</h2>')
                .replace(/\\subsection\{([^}]+)\}/g, '<h3 class="latex-subsection">$1</h3>')
                .replace(/\\subsubsection\{([^}]+)\}/g, '<h4 class="latex-subsubsection">$1</h4>');

            // Handle center environment
            html = html
                .replace(/\\begin\{center\}/g, '<div class="latex-center">')
                .replace(/\\end\{center\}/g, '</div>');

            // Handle text formatting
            html = html
                .replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>')
                .replace(/\\textit\{([^}]+)\}/g, '<em>$1</em>')
                .replace(/\\underline\{([^}]+)\}/g, '<u>$1</u>')
                .replace(/\\texttt\{([^}]+)\}/g, '<code>$1</code>')
                .replace(/\\emph\{([^}]+)\}/g, '<em>$1</em>')
                .replace(/\\scshape/g, '')
                .replace(/\\large/g, '')
                .replace(/\\Large/g, '')
                .replace(/\\LARGE/g, '')
                .replace(/\\huge/g, '')
                .replace(/\\Huge/g, '')
                .replace(/\\small/g, '');

            // Handle hyperlinks
            html = html
                .replace(/\\href\{([^}]+)\}\{\\underline\{([^}]+)\}\}/g, '<a href="$1" class="latex-link">$2</a>')
                .replace(/\\href\{([^}]+)\}\{([^}]+)\}/g, '<a href="$1" class="latex-link">$2</a>');

            // Handle technical skills section specially BEFORE other processing
            // Look for the specific technical skills pattern in the itemize environment
            html = html.replace(/\\begin\{itemize\}\[leftmargin=0\.15in, label=\{\}\]\s*\\small\{\\item\{([\s\S]*?)\}\}\s*\\end\{itemize\}/g, function(match, content) {
                console.log('Found technical skills itemize match:', match);
                console.log('Content:', content);
                
                // Split by \\ to get each line
                let lines = content.split('\\\\').map(line => line.trim()).filter(line => line.length > 0);
                
                let processedLines = lines.map(line => {
                    // Handle the specific pattern \textbf{Category}{: Items}
                    line = line.replace(/\\textbf\{([^}]+)\}\{:\s*([^}]+)\}/g, '<strong>$1</strong>: $2');
                    line = line.replace(/\\&/g, '&');
                    return line;
                });
                
                return `<ul class="technical-skills">${processedLines.map(line => `<li>${line}</li>`).join('')}</ul>`;
            });

            // Fallback: If the above doesn't match, try the simpler pattern
            html = html.replace(/\\small\{\\item\{([\s\S]*?)\}\}/g, function(match, content) {
                console.log('Found fallback technical skills match:', match);
                console.log('Content:', content);
                
                // Split by \\ to get each line
                let lines = content.split('\\\\').map(line => line.trim()).filter(line => line.length > 0);
                
                let processedLines = lines.map(line => {
                    // Handle the specific pattern \textbf{Category}{: Items}
                    line = line.replace(/\\textbf\{([^}]+)\}\{:\s*([^}]+)\}/g, '<strong>$1</strong>: $2');
                    line = line.replace(/\\&/g, '&');
                    return line;
                });
                
                return `<ul class="technical-skills">${processedLines.map(line => `<li>${line}</li>`).join('')}</ul>`;
            });

            // Handle resume-specific commands
            html = html
                .replace(/\\resumeSubHeadingListStart/g, '<div class="resume-section">')
                .replace(/\\resumeSubHeadingListEnd/g, '</div>')
                .replace(/\\resumeItemListStart/g, '<ul class="resume-items">')
                .replace(/\\resumeItemListEnd/g, '</ul>')
                .replace(/\\resumeItem\{([^}]+)\}/g, '<li class="resume-item">$1</li>')
                .replace(/\\resumeSubItem\{([^}]+)\}/g, '<li class="resume-subitem">$1</li>');

            // Handle resume headings (complex tabular structures)
            html = html.replace(/\\resumeSubheading\s*\{([^}]+)\}\s*\{([^}]+)\}\s*\{([^}]+)\}\s*\{([^}]+)\}/g, 
                '<div class="resume-heading"><div class="resume-heading-left"><strong>$1</strong><br><em>$3</em></div><div class="resume-heading-right">$2<br><em>$4</em></div></div>');

            html = html.replace(/\\resumeProjectHeading\s*\{([^}]+)\}\s*\{([^}]+)\}/g, 
                '<div class="resume-project-heading"><div class="resume-project-left">$1</div><div class="resume-project-right">$2</div></div>');

            // Handle tabular environments
            html = html
                .replace(/\\begin\{tabular\*\}\{[^}]+\}\{[^}]+\}/g, '<table class="latex-tabular">')
                .replace(/\\begin\{tabular\*\}\{[^}]+\}/g, '<table class="latex-tabular">')
                .replace(/\\end\{tabular\*\}/g, '</table>')
                .replace(/\\begin\{tabular\}\{[^}]+\}/g, '<table class="latex-tabular">')
                .replace(/\\end\{tabular\}/g, '</table>');

            // Handle table rows and cells
            html = html.replace(/([^\\])\\\\/g, '$1</td></tr><tr><td>');
            html = html.replace(/&/g, '</td><td>');

            // Handle itemize environments
            html = html
                .replace(/\\begin\{itemize\}(\[[^\]]*\])?/g, '<ul class="latex-itemize">')
                .replace(/\\end\{itemize\}/g, '</ul>')
                .replace(/\\item\s*/g, '<li>')
                .replace(/\\item\[([^\]]+)\]/g, '<li class="custom-item">');

            // Handle the section comment above technical skills
            html = html.replace(/%-----------PROGRAMMING SKILLS-----------/g, '');
            html = html.replace(/%-------------------------------------------/g, '');

            // Handle spacing and formatting
            html = html
                .replace(/\\vspace\{[^}]+\}/g, '')
                .replace(/\\hspace\{[^}]+\}/g, '')
                .replace(/\\noindent/g, '')
                .replace(/\\\\/g, '<br>')
                .replace(/\\newline/g, '<br>')
                .replace(/\\par/g, '<br>')
                .replace(/\$\|\$/g, ' | ')
                .replace(/\$([^$]+)\$/g, '$1')
                .replace(/~/g, '&nbsp;')
                .replace(/\\&/g, '&');

            // Clean up whitespace and empty elements
            html = html
                .replace(/\n\s*\n/g, '<br>')
                .replace(/\s+/g, ' ')
                .replace(/<br>\s*<br>/g, '<br>')
                .replace(/^\s+|\s+$/g, '')
                .replace(/<([^>]+)>\s*<\/\1>/g, '');

            // Wrap in document container
            if (!html.includes('latex-document')) {
                html = `<div class="latex-document">${html}</div>`;
            }

            setRenderedHtml(html);
        } catch (error) {
            setRenderedHtml(`<div class="error">Error rendering LaTeX: ${error.message}</div>`);
        }
    }, [latexText]);

    useEffect(() => {
        renderLatex();
    }, [renderLatex]);

    const tutorialLessons = [
        {
            title: "Document Structure",
            content: "LaTeX documents have a specific structure with preamble, document class, and content sections.",
            example: "\\documentclass{article}\n\\usepackage[utf8]{inputenc}\n\\title{My Document}\n\\author{Your Name}\n\\date{\\today}\n\n\\begin{document}\n\\maketitle\n\n\\section{Introduction}\nThis is the introduction.\n\n\\section{Conclusion}\nThis is the conclusion.\n\n\\end{document}",
            tryIt: "\\documentclass{article}\n\\title{My First Document}\n\\author{My Name}\n\\begin{document}\n\\maketitle\n\\section{Hello World}\nHello, LaTeX!\n\\end{document}"
        },
        {
            title: "Text Formatting",
            content: "LaTeX provides various commands for text formatting including bold, italic, underline, and different font styles.",
            example: "\\textbf{Bold text}\n\\textit{Italic text}\n\\underline{Underlined text}\n\\texttt{Typewriter text}\n\\emph{Emphasized text}\n\n{\\large Large text} {\\small Small text}\n{\\huge Huge text} {\\tiny Tiny text}",
            tryIt: "\\textbf{Bold} and \\textit{italic} text\n\\texttt{Code font}"
        },
        {
            title: "Mathematical Expressions",
            content: "LaTeX excels at typesetting mathematics. Use $ for inline math and environments for display math.",
            example: "Inline math: $x^2 + y^2 = z^2$\n\nDisplay math:\n\\begin{equation}\n\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}\n\\end{equation}\n\n\\begin{align}\nE &= mc^2 \\\\\nF &= ma\n\\end{align}",
            tryIt: "The formula is $E = mc^2$\n\n\\begin{equation}\n\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\n\\end{equation}"
        },
        {
            title: "Lists and Structures",
            content: "Create organized content with itemize (bullets) and enumerate (numbers) environments.",
            example: "\\begin{itemize}\n\\item First item\n\\item Second item\n\\begin{itemize}\n\\item Nested item\n\\item Another nested item\n\\end{itemize}\n\\item Third item\n\\end{itemize}\n\n\\begin{enumerate}\n\\item First numbered item\n\\item Second numbered item\n\\item Third numbered item\n\\end{enumerate}",
            tryIt: "\\begin{itemize}\n\\item My first item\n\\item My second item\n\\end{itemize}"
        },
        {
            title: "Tables and Tabular Data",
            content: "Create professional tables with the tabular environment and table positioning.",
            example: "\\begin{table}[h]\n\\centering\n\\begin{tabular}{|c|c|c|}\n\\hline\nName & Age & City \\\\\n\\hline\nAlice & 30 & New York \\\\\nBob & 25 & Los Angeles \\\\\n\\hline\n\\end{tabular}\n\\caption{Sample table}\n\\end{table}",
            tryIt: "\\begin{tabular}{|l|r|}\n\\hline\nItem & Price \\\\\n\\hline\nApple & \\$1.00 \\\\\nOrange & \\$2.00 \\\\\n\\hline\n\\end{tabular}"
        },
        {
            title: "Sections and References",
            content: "Organize documents with sections and create cross-references. LaTeX handles numbering automatically.",
            example: "\\section{Introduction}\nThis is the introduction section.\n\n\\subsection{Background}\nSome background information.\n\n\\section{Methods}\nAs mentioned in Section~\\ref{intro}, we will...\n\n\\label{intro}\n\\section{Results}\nThe results are shown in Table~\\ref{tab:results}.\n\n\\begin{table}[h]\n\\label{tab:results}\n\\caption{Results table}\n\\end{table}",
            tryIt: "\\section{My Section}\nThis is my section.\n\n\\subsection{My Subsection}\nThis is a subsection."
        },
        {
            title: "Code and Listings",
            content: "Include code snippets and programming examples with proper formatting and syntax highlighting.",
            example: "\\usepackage{listings}\n\\usepackage{xcolor}\n\n\\begin{lstlisting}[language=Python]\ndef hello_world():\n    print(\"Hello, World!\")\n    return True\n\nhello_world()\n\\end{lstlisting}\n\nInline code: \\texttt{print(\"Hello\")}",
            tryIt: "\\begin{lstlisting}[language=Java]\npublic class Hello {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}\n\\end{lstlisting}"
        },
        {
            title: "Advanced Features",
            content: "Explore advanced LaTeX features including theorems, proofs, citations, and bibliography management.",
            example: "\\newtheorem{theorem}{Theorem}\n\\newtheorem{lemma}{Lemma}\n\n\\begin{theorem}\nFor any positive integer $n$, we have $1 + 2 + ... + n = \\frac{n(n+1)}{2}$.\n\\end{theorem}\n\n\\begin{proof}\nWe prove this by induction...\n\\end{proof}\n\nCitation example: LaTeX is powerful~\\cite{lamport1994}.\n\n\\begin{thebibliography}{9}\n\\bibitem{lamport1994}\nLeslie Lamport.\n\\textit{LaTeX: A Document Preparation System}.\nAddison-Wesley, 1994.\n\\end{thebibliography}",
            tryIt: "\\begin{theorem}\nThis is my theorem.\n\\end{theorem}\n\n\\begin{proof}\nThis is the proof.\n\\end{proof}"
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
                        <div className="mini-preview" dangerouslySetInnerHTML={{ __html: renderLatexPreview(lesson.example) }} />
                    </div>
                </div>
            </div>
        );
    };

    const renderLatexPreview = (latex) => {
        // Simplified LaTeX to HTML conversion for preview
        return latex
            .replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>')
            .replace(/\\textit\{([^}]+)\}/g, '<em>$1</em>')
            .replace(/\\section\{([^}]+)\}/g, '<h3>$1</h3>')
            .replace(/\\subsection\{([^}]+)\}/g, '<h4>$1</h4>')
            .replace(/\$([^$]+)\$/g, '<span class="latex-math">$1</span>')
            .replace(/\\begin\{itemize\}/g, '<ul>')
            .replace(/\\end\{itemize\}/g, '</ul>')
            .replace(/\\item\s/g, '<li>')
            .replace(/\\\\/g, '<br>')
            .replace(/\\texttt\{([^}]+)\}/g, '<code>$1</code>');
    };

    return (
        <div className="tools-container">
            <div className="latex-tool">
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

                <div className="latex-content">
                    {activeTab === 'tutorial' && (
                        <div className="tutorial-mode">
                            <div className="tutorial-header">
                                <h3>Learn LaTeX Tutorial</h3>
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
                                    <h3>LaTeX Editor</h3>
                                    <button className="download-btn" onClick={downloadLatexText} title="Download as LaTeX">
                                        💾 Download .tex
                                    </button>
                                </div>
                                <textarea
                                    value={latexText}
                                    onChange={(e) => setLatexText(e.target.value)}
                                    placeholder="Edit this comprehensive LaTeX example or clear it to start fresh..."
                                    className="latex-textarea split"
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
                                    className="latex-preview split"
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

export default LaTeXRenderer;