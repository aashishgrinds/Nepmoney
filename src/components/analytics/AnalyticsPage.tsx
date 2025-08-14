import React from 'react';
import { Card } from '../ui/Card';
import { useData } from '../../contexts/DataContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { formatCurrency } from '../../lib/utils';
import { format, startOfMonth, subMonths } from 'date-fns';

export function AnalyticsPage() {
  const { expenses, investments } = useData();

  // Monthly expense data for the last 6 months
  const monthlyData = React.useMemo(() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const month = subMonths(new Date(), i);
      const monthStart = startOfMonth(month);
      const monthExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === monthStart.getMonth() && 
               expenseDate.getFullYear() === monthStart.getFullYear();
      });
      
      months.push({
        month: format(monthStart, 'MMM yyyy'),
        expenses: monthExpenses.reduce((sum, exp) => sum + exp.amount, 0),
        transactions: monthExpenses.length,
      });
    }
    return months;
  }, [expenses]);

  // Category breakdown
  const categoryData = React.useMemo(() => {
    const categoryMap = new Map();
    expenses.forEach(expense => {
      const existing = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, existing + expense.amount);
    });
    
    return Array.from(categoryMap.entries())
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 8);
  }, [expenses]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics & Insights</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Expense Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `NPR ${value.toLocaleString()}`} />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Expenses']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Expense Categories</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `NPR ${value.toLocaleString()}`} />
                <YAxis dataKey="category" type="category" width={100} />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Amount']}
                />
                <Bar dataKey="amount" fill="#EF4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending Insights</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg. Daily Spending:</span>
              <span className="font-medium">
                {formatCurrency(expenses.reduce((sum, exp) => sum + exp.amount, 0) / 30)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Highest Category:</span>
              <span className="font-medium">{categoryData[0]?.category || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Transactions:</span>
              <span className="font-medium">{expenses.length}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Insights</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Investments:</span>
              <span className="font-medium">{investments.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg. Investment:</span>
              <span className="font-medium">
                {formatCurrency(
                  investments.reduce((sum, inv) => sum + (inv.shares * inv.purchasePrice), 0) / 
                  Math.max(investments.length, 1)
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Shares:</span>
              <span className="font-medium">
                {investments.reduce((sum, inv) => sum + inv.shares, 0)}
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Health</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Expense Ratio:</span>
              <span className="font-medium text-red-600">High</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Investment Ratio:</span>
              <span className="font-medium text-green-600">Good</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Overall Score:</span>
              <span className="font-medium text-blue-600">7.5/10</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}