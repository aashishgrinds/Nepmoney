import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from '../ui/Card';
import { Expense, CategoryData } from '../../types';
import { formatCurrency } from '../../lib/utils';

interface ExpenseChartProps {
  expenses: Expense[];
}

const COLORS = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6B7280'
];

export function ExpenseChart({ expenses }: ExpenseChartProps) {
  const categoryData: CategoryData[] = React.useMemo(() => {
    const categoryMap = new Map<string, { amount: number; count: number }>();
    
    expenses.forEach(expense => {
      const existing = categoryMap.get(expense.category) || { amount: 0, count: 0 };
      categoryMap.set(expense.category, {
        amount: existing.amount + expense.amount,
        count: existing.count + 1,
      });
    });
    
    return Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      amount: data.amount,
      count: data.count,
    }));
  }, [expenses]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.category}</p>
          <p className="text-blue-600">{formatCurrency(data.amount)}</p>
          <p className="text-gray-600 text-sm">{data.count} transactions</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Expense Breakdown</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="amount"
              label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}