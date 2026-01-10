import React from 'react';
import '../TerminalScripts/TerminalScripts.css';

const sections = [
    {
        title: '📁 File & Directory Commands',
        items: [
            { cmd: 'pwd', desc: 'Show current directory' },
            { cmd: 'ls\nls -l\nls -a', desc: 'List files (-l detailed, -a include hidden)' },
            { cmd: 'cd foldername\ncd ..\ncd ~\ncd /', desc: 'Change directory (.. parent, ~ home, / root)' },
            { cmd: 'mkdir myfolder\nmkdir -p a/b/c', desc: 'Create directories (-p nested)' },
            { cmd: 'rmdir emptyfolder', desc: 'Remove empty folder' },
        ],
    },
    {
        title: '📄 File Operations',
        items: [
            { cmd: 'touch file.txt', desc: 'Create empty file' },
            { cmd: 'cp file1.txt file2.txt\ncp -r folder1 folder2', desc: 'Copy files / folders' },
            { cmd: 'mv old.txt new.txt\nmv file.txt /path/to/location/', desc: 'Move or rename' },
            { cmd: 'rm file.txt\nrm -r folder\nrm -rf folder', desc: 'Delete (-rf is dangerous, no undo)' },
        ],
    },
    {
        title: '📖 View File Contents',
        items: [
            { cmd: 'cat file.txt', desc: 'Print file content' },
            { cmd: 'less file.txt', desc: 'Scrollable viewer (q to quit)' },
            { cmd: 'head file.txt\ntail file.txt\ntail -f logfile.log', desc: 'Beginning / end (-f live updates)' },
        ],
    },
    {
        title: '🔍 Search & Find',
        items: [
            { cmd: 'find . -name "file.txt"', desc: 'Find file' },
            { cmd: 'grep "text" file.txt\ngrep -r "text" folder/', desc: 'Search text inside files' },
        ],
    },
    {
        title: '🔐 Permissions & Ownership',
        items: [
            { cmd: 'ls -l', desc: 'View permissions' },
            { cmd: 'chmod 755 file.sh\nchmod +x script.sh', desc: 'Change permissions' },
            { cmd: 'chown user:group file.txt', desc: 'Change owner' },
        ],
    },
    {
        title: '📦 Disk & System Info',
        items: [
            { cmd: 'df -h', desc: 'Disk usage' },
            { cmd: 'du -sh folder', desc: 'Folder size' },
            { cmd: 'top\nps aux', desc: 'Live process monitor / running processes' },
            { cmd: 'kill PID\nkill -9 PID', desc: 'Kill process' },
        ],
    },
    {
        title: '🌐 Network Commands (macOS)',
        items: [
            { cmd: 'ifconfig', desc: 'Network interfaces' },
            { cmd: 'ping google.com', desc: 'Check connectivity' },
            { cmd: 'curl https://example.com', desc: 'API / URL requests' },
            { cmd: 'networksetup -listallhardwareports', desc: 'Network devices' },
            { cmd: 'ipconfig getifaddr en0', desc: 'Get Wi‑Fi IP' },
        ],
    },
    {
        title: '⚙️ System Commands',
        items: [
            { cmd: 'whoami', desc: 'Current user' },
            { cmd: 'uname -a', desc: 'OS info' },
            { cmd: 'sw_vers', desc: 'macOS version' },
            { cmd: 'uptime', desc: 'System running time' },
            { cmd: 'date', desc: 'Current date/time' },
        ],
    },
    {
        title: '🧰 Package & Developer Commands',
        items: [
            { cmd: 'which node', desc: 'Path of command' },
            { cmd: 'brew --version\nbrew install git', desc: 'Homebrew package manager' },
            { cmd: 'xcode-select --install', desc: 'Install Xcode CLI tools' },
        ],
    },
    {
        title: '📜 History & Help',
        items: [
            { cmd: 'history', desc: 'Command history' },
            { cmd: 'clear', desc: 'Clear terminal' },
            { cmd: 'man ls', desc: 'Manual for any command' },
            { cmd: 'command --help', desc: 'Quick help' },
        ],
    },
    {
        title: '🔄 Redirection & Pipes',
        items: [
            { cmd: 'command > file.txt\ncommand >> file.txt', desc: 'Output to file (overwrite/append)' },
            { cmd: 'command1 | command2', desc: 'Pipe output' },
            { cmd: 'echo "hello" > test.txt', desc: 'Quick write to file' },
        ],
    },
    {
        title: '🧠 Shortcuts You Must Know',
        items: [
            { cmd: 'Ctrl + C', desc: 'Stop command' },
            { cmd: 'Ctrl + Z', desc: 'Pause' },
            { cmd: 'Ctrl + D', desc: 'Exit' },
            { cmd: '↑ ↓', desc: 'Previous commands' },
            { cmd: 'Tab', desc: 'Auto-complete' },
        ],
    },
    {
        title: '🔥 Daily-Use Combo Examples',
        items: [
            { cmd: 'ls | grep ".log"', desc: 'List logs' },
            { cmd: 'ps aux | grep node', desc: 'Find Node processes' },
            { cmd: 'df -h | grep disk', desc: 'Disk info filtered' },
        ],
    },
];

const TerminalTutorial = () => {
    return (
        <div className="terminal-scripts-container">
            <div className="simple-header">
                <h1>Terminal Tutorial</h1>
                <p>Quick tips for navigating and using the macOS Terminal safely.</p>
            </div>

            <div className="terminal-grid">
                {sections.map((section) => (
                    <article key={section.title} className="terminal-card">
                        <div className="terminal-card-header">
                            <h4>{section.title}</h4>
                        </div>
                        {section.items.map((item) => (
                            <div key={item.cmd} className="terminal-line">
                                <pre className="terminal-command">{item.cmd}</pre>
                                <p className="terminal-description">{item.desc}</p>
                            </div>
                        ))}
                    </article>
                ))}
            </div>
        </div>
    );
};

export default TerminalTutorial;
