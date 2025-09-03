import React, { useState, useEffect } from 'react';
import './StorageTool.css';
import { Button, Input, Textarea } from '../../ui';

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
                                <Input
                                    label="Key:"
                                    type="text"
                                    placeholder="Enter storage key"
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                    disabled={editMode}
                                />
                            </div>

                            <div className="input-field">
                                <Textarea
                                    label="Value:"
                                    placeholder="Enter storage value (JSON, text, etc.)"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    rows={6}
                                />
                            </div>
                        </div>

                        <div className="button-section">
                            <div className="control-buttons">
                                <Button type="submit">{editMode ? '✏️ Update' : '💾 Save'}</Button>
                                {editMode && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setEditMode(null);
                                            setKey('');
                                            setValue('');
                                            setError('');
                                        }}
                                    >
                                        ❌ Cancel
                                    </Button>
                                )}
                                <Button type="button" variant="ghost" onClick={handleClear}>🗑️ Clear All</Button>
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
                                    <Button variant="outline" onClick={() => handleCopy(item.value)} title="Copy value">📋 Copy</Button>
                                    <Button variant="outline" onClick={() => handleEdit(item)} title="Edit item">✏️ Edit</Button>
                                    <Button variant="outline" onClick={() => handleDelete(item.key)} title="Delete item">🗑️ Delete</Button>
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
