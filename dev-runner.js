const { spawn } = require('child_process');
const path = require('path');

// Colors for console output
const cyan = '\x1b[36m';
const green = '\x1b[32m';
const reset = '\x1b[0m';

console.log(`${cyan}Starting Development Environment...${reset}`);

// Start the Backend Server
const server = spawn('npm', ['run', 'server'], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, PORT: '3001' }
});

// Start the React Frontend
// We wait a brief moment to ensure the backend port is claimed to avoid race conditions, although not strictly necessary with proxy
setTimeout(() => {
    console.log(`${green}Starting React App...${reset}`);
    const client = spawn('npm', ['run', 'react-start'], {
        stdio: 'inherit',
        shell: true
    });

    client.on('close', (code) => {
        console.log(`Frontend process exited with code ${code}`);
        server.kill();
        process.exit(code);
    });
}, 1000);

server.on('close', (code) => {
    console.log(`Backend process exited with code ${code}`);
    process.exit(code);
});

// Handle termination signals
process.on('SIGINT', () => {
    server.kill();
    process.exit();
});
