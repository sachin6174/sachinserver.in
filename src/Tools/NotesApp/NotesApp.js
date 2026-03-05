import React, { useState, useEffect, useCallback } from 'react';
import './NotesApp.css';
import { Button, Input } from '../../ui';

const NotesApp = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('modified'); // modified, created, title
    const [selectedTag, setSelectedTag] = useState(null);
    const [newTag, setNewTag] = useState('');

    // Load notes from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('notes');
        if (saved) {
            try {
                setNotes(JSON.parse(saved));
            } catch (error) {
                console.error('Failed to load notes:', error);
            }
        }
    }, []);

    // Save notes to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const createNewNote = useCallback(() => {
        const newNote = {
            id: Date.now(),
            title: 'Untitled Note',
            content: '',
            tags: [],
            createdAt: new Date().toISOString(),
            modifiedAt: new Date().toISOString(),
            color: '#ffffff'
        };
        setNotes([newNote, ...notes]);
        setSelectedNoteId(newNote.id);
        setNoteTitle(newNote.title);
        setNoteContent(newNote.content);
    }, [notes]);

    const selectedNote = notes.find(n => n.id === selectedNoteId);

    const updateNote = useCallback((id, updates) => {
        setNotes(notes.map(note =>
            note.id === id
                ? { ...note, ...updates, modifiedAt: new Date().toISOString() }
                : note
        ));
    }, [notes]);

    const deleteNote = useCallback((id) => {
        setNotes(notes.filter(note => note.id !== id));
        if (selectedNoteId === id) {
            setSelectedNoteId(null);
            setNoteTitle('');
            setNoteContent('');
        }
    }, [notes, selectedNoteId]);

    const selectNote = useCallback((note) => {
        setSelectedNoteId(note.id);
        setNoteTitle(note.title);
        setNoteContent(note.content);
    }, []);

    const updateSelectedNote = useCallback((updates) => {
        if (selectedNoteId) {
            updateNote(selectedNoteId, updates);
            if (updates.title !== undefined) setNoteTitle(updates.title);
            if (updates.content !== undefined) setNoteContent(updates.content);
        }
    }, [selectedNoteId, updateNote]);

    const addTagToNote = useCallback(() => {
        if (newTag.trim() && selectedNoteId) {
            updateNote(selectedNoteId, {
                tags: [...(selectedNote?.tags || []), newTag.trim()]
            });
            setNewTag('');
        }
    }, [newTag, selectedNoteId, selectedNote, updateNote]);

    const removeTagFromNote = useCallback((tag) => {
        if (selectedNoteId) {
            updateNote(selectedNoteId, {
                tags: (selectedNote?.tags || []).filter(t => t !== tag)
            });
        }
    }, [selectedNoteId, selectedNote, updateNote]);

    const getFilteredAndSortedNotes = () => {
        let filtered = notes;

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(note =>
                note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                note.content.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by selected tag
        if (selectedTag) {
            filtered = filtered.filter(note => note.tags.includes(selectedTag));
        }

        // Sort
        const sorted = [...filtered];
        switch (sortBy) {
            case 'modified':
                sorted.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt));
                break;
            case 'created':
                sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'title':
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }

        return sorted;
    };

    const getAllTags = () => {
        const tags = new Set();
        notes.forEach(note => {
            note.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    };

    const filteredNotes = getFilteredAndSortedNotes();
    const allTags = getAllTags();
    const wordCount = noteContent.split(/\s+/).filter(w => w.length > 0).length;
    const charCount = noteContent.length;

    return (
        <div className="notes-app">
            <div className="notes-sidebar">
                <div className="sidebar-header">
                    <h2>Notes</h2>
                    <Button onClick={createNewNote} className="new-note-btn">
                        + New
                    </Button>
                </div>

                <Input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />

                {allTags.length > 0 && (
                    <div className="tags-filter">
                        <h4>Tags</h4>
                        <div className="tags-list">
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    className={`tag-filter ${selectedTag === tag ? 'active' : ''}`}
                                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="sort-options">
                    <label>Sort by:</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="modified">Last Modified</option>
                        <option value="created">Created Date</option>
                        <option value="title">Title</option>
                    </select>
                </div>

                <div className="notes-list">
                    {filteredNotes.map(note => (
                        <div
                            key={note.id}
                            className={`note-item ${selectedNoteId === note.id ? 'selected' : ''}`}
                            onClick={() => selectNote(note)}
                        >
                            <div className="note-title">{note.title || 'Untitled'}</div>
                            <div className="note-preview">
                                {note.content.substring(0, 60)}...
                            </div>
                            <div className="note-date">
                                {new Date(note.modifiedAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="notes-editor">
                {selectedNote ? (
                    <>
                        <div className="editor-header">
                            <input
                                type="text"
                                value={noteTitle}
                                onChange={(e) => {
                                    setNoteTitle(e.target.value);
                                    updateSelectedNote({ title: e.target.value });
                                }}
                                className="note-title-input"
                                placeholder="Note title..."
                            />
                            <Button
                                onClick={() => deleteNote(selectedNoteId)}
                                className="delete-note-btn"
                            >
                                🗑️ Delete
                            </Button>
                        </div>

                        <div className="editor-toolbar">
                            <div className="tag-input-group">
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addTagToNote()}
                                    placeholder="Add tag..."
                                />
                                <Button onClick={addTagToNote} className="add-tag-btn">
                                    + Tag
                                </Button>
                            </div>
                        </div>

                        {selectedNote.tags.length > 0 && (
                            <div className="note-tags">
                                {selectedNote.tags.map(tag => (
                                    <span key={tag} className="note-tag">
                                        {tag}
                                        <button
                                            onClick={() => removeTagFromNote(tag)}
                                            className="remove-tag"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        <textarea
                            value={noteContent}
                            onChange={(e) => {
                                setNoteContent(e.target.value);
                                updateSelectedNote({ content: e.target.value });
                            }}
                            className="note-content"
                            placeholder="Write your note here..."
                        />

                        <div className="editor-footer">
                            <div className="note-stats">
                                <span>{wordCount} words • {charCount} characters</span>
                                <span>Modified: {new Date(selectedNote.modifiedAt).toLocaleString()}</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="empty-editor">
                        <h3>No note selected</h3>
                        <p>Create a new note or select one from the sidebar</p>
                        <Button onClick={createNewNote} className="empty-new-btn">
                            Create New Note
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotesApp;