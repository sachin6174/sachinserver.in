import React, { useState, useEffect, useCallback } from 'react';
import './TaskManager.css';
import { Button, Input } from '../../ui';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all'); // all, active, completed
    const [priority, setPriority] = useState('medium');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('work');
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState('');

    // Load tasks from localStorage on mount
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            try {
                setTasks(JSON.parse(savedTasks));
            } catch (error) {
                console.error('Failed to load tasks:', error);
            }
        }
    }, []);

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = useCallback(() => {
        if (newTask.trim()) {
            const task = {
                id: Date.now(),
                text: newTask,
                completed: false,
                priority,
                dueDate,
                category,
                createdAt: new Date().toISOString(),
            };
            setTasks([task, ...tasks]);
            setNewTask('');
            setDueDate('');
            setPriority('medium');
        }
    }, [newTask, priority, dueDate, category, tasks]);

    const deleteTask = useCallback((id) => {
        setTasks(tasks.filter(task => task.id !== id));
    }, [tasks]);

    const toggleTask = useCallback((id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    }, [tasks]);

    const updateTask = useCallback((id, updatedTask) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
        setEditingId(null);
        setEditingText('');
    }, [tasks]);

    const startEditing = useCallback((task) => {
        setEditingId(task.id);
        setEditingText(task.text);
    }, []);

    const saveEdit = useCallback((id) => {
        if (editingText.trim()) {
            updateTask(id, { text: editingText });
        }
    }, [editingText, updateTask]);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#ff6b6b';
            case 'medium': return '#ffd93d';
            case 'low': return '#6bcf7f';
            default: return '#999';
        }
    };

    const getCategoryColor = (category) => {
        const colors = {
            work: '#667eea',
            personal: '#f093fb',
            shopping: '#4facfe',
            health: '#43e97b',
            finance: '#fa709a',
            education: '#30b0fe',
        };
        return colors[category] || '#999';
    };

    const getFilteredTasks = () => {
        return tasks.filter(task => {
            if (filter === 'active') return !task.completed;
            if (filter === 'completed') return task.completed;
            return true;
        });
    };

    const getSortedTasks = (tasksToSort) => {
        return tasksToSort.sort((a, b) => {
            // Incomplete tasks first
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            // High priority first
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            const priorityDiff = (priorityOrder[a.priority] || 1) - (priorityOrder[b.priority] || 1);
            if (priorityDiff !== 0) return priorityDiff;
            // Earlier due date first
            if (a.dueDate && b.dueDate) {
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
            return 0;
        });
    };

    const filteredTasks = getFilteredTasks();
    const sortedTasks = getSortedTasks(filteredTasks);

    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        active: tasks.filter(t => !t.completed).length,
    };

    return (
        <div className="task-manager">
            <div className="task-header">
                <h2>Task Manager</h2>
                <div className="stats">
                    <div className="stat">
                        <span className="stat-label">All</span>
                        <span className="stat-value">{stats.total}</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Active</span>
                        <span className="stat-value">{stats.active}</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Done</span>
                        <span className="stat-value">{stats.completed}</span>
                    </div>
                </div>
            </div>

            <div className="task-input-section">
                <div className="input-row">
                    <Input
                        type="text"
                        placeholder="Add a new task..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    />
                    <Button onClick={addTask} className="add-btn">
                        + Add Task
                    </Button>
                </div>
                <div className="options-row">
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="shopping">Shopping</option>
                        <option value="health">Health</option>
                        <option value="finance">Finance</option>
                        <option value="education">Education</option>
                    </select>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="filter-section">
                {['all', 'active', 'completed'].map(f => (
                    <Button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`filter-btn ${filter === f ? 'active' : ''}`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </Button>
                ))}
            </div>

            <div className="tasks-list">
                {sortedTasks.length === 0 ? (
                    <div className="empty-state">
                        <p>No tasks yet. Add one to get started!</p>
                    </div>
                ) : (
                    sortedTasks.map(task => (
                        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                            <div className="task-checkbox">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                />
                            </div>
                            <div className="task-content">
                                {editingId === task.id ? (
                                    <input
                                        type="text"
                                        value={editingText}
                                        onChange={(e) => setEditingText(e.target.value)}
                                        onBlur={() => saveEdit(task.id)}
                                        onKeyPress={(e) => e.key === 'Enter' && saveEdit(task.id)}
                                        autoFocus
                                        className="task-edit-input"
                                    />
                                ) : (
                                    <span
                                        className="task-text"
                                        onDoubleClick={() => startEditing(task)}
                                    >
                                        {task.text}
                                    </span>
                                )}
                                <div className="task-meta">
                                    <span
                                        className="task-category"
                                        style={{ backgroundColor: getCategoryColor(task.category) }}
                                    >
                                        {task.category}
                                    </span>
                                    <span
                                        className="task-priority"
                                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                                    >
                                        {task.priority}
                                    </span>
                                    {task.dueDate && (
                                        <span className="task-due-date">
                                            📅 {new Date(task.dueDate).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <Button
                                onClick={() => deleteTask(task.id)}
                                className="delete-btn"
                                title="Delete task"
                            >
                                🗑️
                            </Button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskManager;