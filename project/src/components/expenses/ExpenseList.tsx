import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useData } from '../../contexts/DataContext';
import { formatCurrency } from '../../lib/utils';
import { format } from 'date-fns';
import { Trash2, Search, Download } from 'lucide-react';
import { EXPENSE_CATEGORIES } from '../../lib/mockData';
import toast from 'react-hot-toast';

export function ExpenseList() {
  const { expenses, deleteExpense } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredExpenses = React.useMemo(() => {
    return expenses
      .filter(expense => {
        const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            expense.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || expense.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortOrder === 'desc') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
      });
  }, [expenses, searchTerm, selectedCategory, sortOrder]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(id);
      toast.success('Expense deleted successfully!');
    }
  };

  const exportToCsv = () => {
    const csvContent = [
      ['Date', 'Category', 'Description', 'Amount'],
      ...filteredExpenses.map(expense => [
        expense.date,
        expense.category,
        expense.description,
        expense.amount.toString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Expenses exported successfully!');
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">All Expenses</h3>
        <Button onClick={exportToCsv} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {EXPENSE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {format(new Date(expense.date), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {expense.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{expense.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(expense.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(expense.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredExpenses.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No expenses found.</p>
          </div>
        )}
      </div>
    </Card>
  );
}