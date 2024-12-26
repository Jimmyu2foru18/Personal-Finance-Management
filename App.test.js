import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Personal Finance Management header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Personal Finance Management/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders transaction input field', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Amount \(e\.g\., 100\.00\)/i);
  expect(inputElement).toBeInTheDocument();
});

test('renders Expense and Income options', () => {
  render(<App />);
  const expenseOption = screen.getByRole('option', { name: /Expense/i });
  const incomeOption = screen.getByRole('option', { name: /Income/i });
  expect(expenseOption).toBeInTheDocument();
  expect(incomeOption).toBeInTheDocument();
});
