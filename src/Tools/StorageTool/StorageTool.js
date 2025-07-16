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
            {error && <div className="error-message">{error}</div>}

            <div className="storage-controls">
                <div className="input-section">
                    <h3>{editMode ? 'Edit Item' : 'Add New Item'}</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <div className="input-field">
                                <label>Key:</label>
                                <input
                                    type="text"
                                    placeholder="Enter storage key"
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                    disabled={editMode}
                                />
                            </div>

                            <div className="input-field">
                                <label>Value:</label>
                                <textarea
                                    placeholder="Enter storage value (JSON, text, etc.)"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="button-section">
                            <div className="control-buttons">
                                <button type="submit" className={editMode ? 'update-btn' : 'save-btn'}>
                                    {editMode ? '✏️ Update' : '💾 Save'}
                                </button>
                                {editMode && (
                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={() => {
                                            setEditMode(null);
                                            setKey('');
                                            setValue('');
                                            setError('');
                                        }}
                                    >
                                        ❌ Cancel
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="clear-all-btn"
                                    onClick={handleClear}
                                >
                                    🗑️ Clear All
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {items.length > 0 && (
                <div className="storage-items-section">
                    <h3>Stored Items ({items.length})</h3>
                    <div className="items-list">
                        {items.map((item) => (
                            <div key={item.key} className="storage-item">
                                <div className="storage-item-content">
                                    <div className="storage-item-key">
                                        <span className="key-icon">🔑</span>
                                        {item.key}
                                    </div>
                                    <div className="storage-item-value">
                                        {item.value}
                                    </div>
                                </div>
                                <div className="storage-item-actions">
                                    <button
                                        className="copy-btn"
                                        onClick={() => handleCopy(item.value)}
                                        title="Copy value"
                                    >
                                        📋 Copy
                                    </button>
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(item)}
                                        title="Edit item"
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(item.key)}
                                        title="Delete item"
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default StorageTool;
