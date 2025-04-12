import React, { useState, useEffect } from 'react';
import './StorageTool.css';

const StorageTool = () => {
    const [items, setItems] = useState([]);
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [editMode, setEditMode] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = () => {
        const allItems = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            allItems.push({ key, value });
        }
        setItems(allItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (!key.trim()) {
                throw new Error('Key cannot be empty');
            }
            localStorage.setItem(key, value);
            loadItems();
            setKey('');
            setValue('');
            setError('');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (item) => {
        setEditMode(item.key);
        setKey(item.key);
        setValue(item.value);
    };

    const handleDelete = (itemKey) => {
        localStorage.removeItem(itemKey);
        loadItems();
        if (editMode === itemKey) {
            setEditMode(null);
            setKey('');
            setValue('');
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    const handleClear = () => {
        if (window.confirm('Are you sure you want to clear all items?')) {
            localStorage.clear();
            loadItems();
            setEditMode(null);
            setKey('');
            setValue('');
        }
    };

    return (
        <div className="storage-tool">
            <h2>Local Storage Tool</h2>
            <div className="tool-container">
                <form onSubmit={handleSubmit} className="input-form">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Enter key"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                        />
                        <textarea
                            placeholder="Enter value"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit">
                            {editMode ? 'Update' : 'Save'}
                        </button>
                        {editMode && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditMode(null);
                                    setKey('');
                                    setValue('');
                                }}
                            >
                                Cancel Edit
                            </button>
                        )}
                        <button type="button" onClick={handleClear}>
                            Clear All
                        </button>
                    </div>
                </form>

                {error && <div className="error-message">{error}</div>}

                <div className="items-list">
                    {items.map((item) => (
                        <div key={item.key} className="storage-item">
                            <div className="item-content">
                                <strong>{item.key}:</strong>
                                <pre>{item.value}</pre>
                            </div>
                            <div className="item-actions">
                                <button onClick={() => handleCopy(item.value)}>
                                    Copy
                                </button>
                                <button onClick={() => handleEdit(item)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(item.key)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StorageTool;
