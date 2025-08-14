import React from 'react';
import { Card } from '../ui/Card';
import { Expense } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { format } from 'date-fns';
import { Receipt } from 'lucide-react';

interface RecentTransactionsProps {
  expenses: Expense[];
}

export function RecentTransactions({ expenses }: RecentTransactionsProps) {
  const recentExpenses = expenses.slice(0, 5);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Transactions</h3>
      <div className="space-y-4">
        {recentExpenses.map((expense) => (
          <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Receipt className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{expense.description}</p>
                <p className="text-sm text-gray-600">{expense.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{formatCurrency(expense.amount)}</p>
              <p className="text-sm text-gray-600">{format(new Date(expense.date), 'MMM dd')}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}