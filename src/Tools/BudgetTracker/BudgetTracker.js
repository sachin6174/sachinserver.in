import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './BudgetTracker.css';
import { Button, Input } from '../../ui';

const BudgetTracker = () => {
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('food');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('expense'); // expense or income
    const [filter, setFilter] = useState('all'); // all, current-month, expense, income
    const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
    const [monthlyBudget, setMonthlyBudget] = useState({});
    const [newBudgetCategory, setNewBudgetCategory] = useState('food');
    const [newBudgetAmount, setNewBudgetAmount] = useState('');

    const categories = ['food', 'transport', 'utilities', 'entertainment', 'health', 'shopping', 'work', 'other'];

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('transactions');
        const budgets = localStorage.getItem('monthlyBudgets');
        if (saved) {
            try {
                setTransactions(JSON.parse(saved));
            } catch (error) {
                console.error('Failed to load transactions:', error);
            }
        }
        if (budgets) {
            try {
                setMonthlyBudget(JSON.parse(budgets));
            } catch (error) {
                console.error('Failed to load budgets:', error);
            }
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem('monthlyBudgets', JSON.stringify(monthlyBudget));
    }, [monthlyBudget]);

    const addTransaction = useCallback(() => {
        if (amount && description) {
            const transaction = {
                id: Date.now(),
                amount: parseFloat(amount),
                category,
                description,
                type,
                date: new Date().toISOString(),
            };
            setTransactions([transaction, ...transactions]);
            setAmount('');
            setDescription('');
        }
    }, [amount, category, description, type, transactions]);

    const deleteTransaction = useCallback((id) => {
        setTransactions(transactions.filter(t => t.id !== id));
    }, [transactions]);

    const setBudget = useCallback(() => {
        if (newBudgetAmount) {
            setMonthlyBudget({
                ...monthlyBudget,
                [`${month}-${newBudgetCategory}`]: parseFloat(newBudgetAmount)
            });
            setNewBudgetAmount('');
        }
    }, [newBudgetAmount, month, newBudgetCategory, monthlyBudget]);

    const getFilteredTransactions = () => {
        let filtered = transactions;

        if (filter === 'expense') {
            filtered = filtered.filter(t => t.type === 'expense');
        } else if (filter === 'income') {
            filtered = filtered.filter(t => t.type === 'income');
        }

        if (filter === 'current-month' || filter === 'all') {
            filtered = filtered.filter(t => t.date.slice(0, 7) === month);
        }

        return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    const getCategoryTotal = (categoryName, type = null) => {
        return transactions
            .filter(t => t.category === categoryName && t.date.slice(0, 7) === month && (type ? t.type === type : true))
            .reduce((sum, t) => sum + (t.type === 'expense' ? -t.amount : t.amount), 0);
    };

    const getTotalByType = (typeFilter) => {
        return transactions
            .filter(t => t.type === typeFilter && t.date.slice(0, 7) === month)
            .reduce((sum, t) => sum + t.amount, 0);
    };

    const filteredTransactions = getFilteredTransactions();
    const totalExpenses = getTotalByType('expense');
    const totalIncome = getTotalByType('income');
    const balance = totalIncome - totalExpenses;

    const categoryStats = useMemo(() => {
        return categories.map(cat => ({
            name: cat,
            amount: getCategoryTotal(cat, 'expense'),
            budget: monthlyBudget[`${month}-${cat}`] || 0,
        })).filter(s => s.amount > 0 || s.budget > 0);
    }, [transactions, month, monthlyBudget]);

    const getCategoryColor = (category) => {
        const colors = {
            food: '#FF6B6B',
            transport: '#4ECDC4',
            utilities: '#45B7D1',
            entertainment: '#FFA07A',
            health: '#98D8C8',
            shopping: '#F7DC6F',
            work: '#BB8FCE',
            other: '#95A5A6',
        };
        return colors[category] || '#999';
    };

    return (
        <div className="budget-tracker">
            <div className="tracker-header">
                <h2>Budget Tracker</h2>
                <div className="month-selector">
                    <input
                        type="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    />
                </div>
            </div>

            <div className="summary-cards">
                <div className="summary-card income">
                    <div className="summary-label">Income</div>
                    <div className="summary-amount">+${totalIncome.toFixed(2)}</div>
                </div>
                <div className="summary-card expense">
                    <div className="summary-label">Expenses</div>
                    <div className="summary-amount">-${totalExpenses.toFixed(2)}</div>
                </div>
                <div className={`summary-card balance ${balance >= 0 ? 'positive' : 'negative'}`}>
                    <div className="summary-label">Balance</div>
                    <div className="summary-amount">${balance.toFixed(2)}</div>
                </div>
            </div>

            <div className="tracker-content">
                <div className="left-panel">
                    <div className="add-transaction">
                        <h3>Add Transaction</h3>
                        <div className="type-toggle">
                            <button
                                className={`toggle-btn ${type === 'expense' ? 'active' : ''}`}
                                onClick={() => setType('expense')}
                            >
                                Expense
                            </button>
                            <button
                                className={`toggle-btn ${type === 'income' ? 'active' : ''}`}
                                onClick={() => setType('income')}
                            >
                                Income
                            </button>
                        </div>
                        <Input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            step="0.01"
                        />
                        <Input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addTransaction()}
                        />
                        {type === 'expense' && (
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        )}
                        <Button onClick={addTransaction} className="add-btn">
                            Add {type === 'expense' ? 'Expense' : 'Income'}
                        </Button>
                    </div>

                    <div className="budget-setter">
                        <h3>Set Budget</h3>
                        <select
                            value={newBudgetCategory}
                            onChange={(e) => setNewBudgetCategory(e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <Input
                            type="number"
                            placeholder="Budget amount"
                            value={newBudgetAmount}
                            onChange={(e) => setNewBudgetAmount(e.target.value)}
                            step="0.01"
                        />
                        <Button onClick={setBudget} className="add-btn">
                            Set Budget
                        </Button>
                    </div>
                </div>

                <div className="right-panel">
                    <div className="category-breakdown">
                        <h3>Category Breakdown</h3>
                        <div className="categories-list">
                            {categoryStats.map(stat => {
                                const percentage = stat.budget ? (stat.amount / stat.budget) * 100 : 0;
                                return (
                                    <div key={stat.name} className="category-item">
                                        <div className="category-header">
                                            <div className="category-name">
                                                <span
                                                    className="category-dot"
                                                    style={{ backgroundColor: getCategoryColor(stat.name) }}
                                                ></span>
                                                {stat.name}
                                            </div>
                                            <div className="category-amount">
                                                ${stat.amount.toFixed(2)}
                                            </div>
                                        </div>
                                        {stat.budget > 0 && (
                                            <>
                                                <div className="budget-bar">
                                                    <div
                                                        className={`bar-fill ${percentage > 100 ? 'over-budget' : ''}`}
                                                        style={{
                                                            width: `${Math.min(percentage, 100)}%`,
                                                            backgroundColor: getCategoryColor(stat.name)
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className="budget-info">
                                                    ${stat.amount.toFixed(2)} / ${stat.budget.toFixed(2)}
                                                    {percentage > 100 && (
                                                        <span className="over-text">
                                                            over by ${(stat.amount - stat.budget).toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="transactions-list">
                        <h3>Transactions</h3>
                        <div className="filter-buttons">
                            {['all', 'expense', 'income'].map(f => (
                                <button
                                    key={f}
                                    className={`filter-btn ${filter === f ? 'active' : ''}`}
                                    onClick={() => setFilter(f)}
                                >
                                    {f.charAt(0).toUpperCase() + f.slice(1)}
                                </button>
                            ))}
                        </div>
                        <div className="transactions">
                            {filteredTransactions.length === 0 ? (
                                <div className="empty-transactions">
                                    <p>No transactions</p>
                                </div>
                            ) : (
                                filteredTransactions.map(trans => (
                                    <div key={trans.id} className={`transaction-item ${trans.type}`}>
                                        <div className="trans-info">
                                            <div className="trans-description">
                                                {trans.category && (
                                                    <span
                                                        className="trans-category"
                                                        style={{ backgroundColor: getCategoryColor(trans.category) }}
                                                    >
                                                        {trans.category}
                                                    </span>
                                                )}
                                                {trans.description}
                                            </div>
                                            <div className="trans-date">
                                                {new Date(trans.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className={`trans-amount ${trans.type}`}>
                                            {trans.type === 'expense' ? '-' : '+'}${trans.amount.toFixed(2)}
                                        </div>
                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteTransaction(trans.id)}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetTracker;