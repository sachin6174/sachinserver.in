const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'clipboard_data.json');

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../build')));

// Basic CORS middleware to allow requests from the React app
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // In production, restrict this
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());

const store = new Map();
const TTL = 10 * 60 * 1000; // 10 minutes

// Load existing data from disk
if (fs.existsSync(DATA_FILE)) {
    try {
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        const data = JSON.parse(raw);
        const now = Date.now();
        let loadedCount = 0;

        for (const [key, val] of Object.entries(data)) {
            // Only load non-expired data
            if (now - val.timestamp <= TTL) {
                store.set(key, val);
                loadedCount++;
            }
        }
        console.log(`Loaded ${loadedCount} active entries from disk.`);

        // If we pruned expired entries on load, save the clean version
        if (loadedCount < Object.keys(data).length) {
            saveData();
        }
    } catch (err) {
        console.error('Failed to load existing data:', err);
    }
}

function saveData() {
    try {
        const data = Object.fromEntries(store);
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Failed to save data:', err);
    }
}

// Cleanup job
setInterval(() => {
    const now = Date.now();
    let changed = false;
    for (const [key, val] of store.entries()) {
        if (now - val.timestamp > TTL) {
            store.delete(key);
            changed = true;
        }
    }
    if (changed) saveData();
}, 60 * 1000);

function generateCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Readable chars
    let code = '';
    do {
        code = '';
        for (let i = 0; i < 4; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    } while (store.has(code));
    return code;
}

app.post('/api/clipboard', (req, res) => {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: 'Data is required' });

    const code = generateCode();
    store.set(code, {
        data,
        timestamp: Date.now()
    });

    // Persist to disk
    saveData();

    console.log(`Generated code ${code} for data length ${data.length}`);
    res.json({ code, expiresAt: Date.now() + TTL });
});

app.get('/api/clipboard/:code', (req, res) => {
    const { code } = req.params;
    const entry = store.get(code.toUpperCase());

    if (!entry) {
        return res.status(404).json({ error: 'Code not found or expired' });
    }

    if (Date.now() - entry.timestamp > TTL) {
        store.delete(code.toUpperCase());
        saveData(); // Save deletion
        return res.status(404).json({ error: 'Code not found or expired' });
    }

    res.json({ data: entry.data });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, '../build/index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).json({ error: 'Frontend build not found', message: 'In development, please access port 3000.' });
    }
});

app.listen(port, () => {
    console.log(`Clipboard server running on http://localhost:${port}`);
});
