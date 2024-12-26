import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Expense');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
        if (savedTransactions) {
            setTransactions(savedTransactions);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    const handleTransactionSubmit = (e) => {
        e.preventDefault();
        if (!amount || isNaN(amount)) return;

        const newTransaction = {
            amount: parseFloat(amount),
            category,
        };

        if (editIndex !== null) {
            const updatedTransactions = transactions.map((transaction, index) =>
                index === editIndex ? newTransaction : transaction
            );
            setTransactions(updatedTransactions);
            setEditIndex(null);
        } else {
            setTransactions((prev) => [...prev, newTransaction]);
        }

        resetForm();
    };

    const handleEditTransaction = (index) => {
        setEditIndex(index);
        setAmount(transactions[index].amount);
        setCategory(transactions[index].category);
    };

    const handleDeleteTransaction = (index) => {
        const updatedTransactions = transactions.filter((_, i) => i !== index);
        setTransactions(updatedTransactions);
    };

    const resetForm = () => {
        setAmount('');
        setCategory('Expense');
    };

    const calculateTotal = () => {
        return transactions.reduce((total, transaction) => {
            return transaction.category === 'Income' 
                ? total + transaction.amount 
                : total - transaction.amount;
        }, 0);
    };

    return (
        <div className="app-container">
            <header>
                <h1>Personal Finance Management</h1>
            </header>
            <form onSubmit={handleTransactionSubmit} className="transaction-form">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    required
                />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Expense">Expense</option>
                    <option value="Income">Income</option>
                </select>
                <button type="submit">
                    {editIndex !== null ? 'Update Transaction' : 'Add Transaction'}
                </button>
            </form>
            <h2>Transaction List</h2>
            <ul className="transaction-list">
                {transactions.map((transaction, index) => (
                    <li key={index} className="transaction-item">
                        {transaction.category}: ${transaction.amount.toFixed(2)}
                        <button onClick={() => handleEditTransaction(index)}>Edit</button>
                        <button onClick={() => handleDeleteTransaction(index)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Total: ${calculateTotal().toFixed(2)}</h2>
            <footer>
                <p>&copy; {new Date().getFullYear()} Personal Finance Management</p>
            </footer>
        </div>
    );
};

export default App;
