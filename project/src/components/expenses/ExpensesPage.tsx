import React from 'react';
import { AddExpenseForm } from './AddExpenseForm';
import { ExpenseList } from './ExpenseList';

export function ExpensesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Expense Tracker</h2>
        <AddExpenseForm />
      </div>
      <ExpenseList />
    </div>
  );
}