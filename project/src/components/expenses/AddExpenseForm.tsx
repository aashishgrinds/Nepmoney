import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useData } from '../../contexts/DataContext';
import { EXPENSE_CATEGORIES } from '../../lib/mockData';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export function AddExpenseForm() {
  const { addExpense } = useData();
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.category || !formData.description) {
      toast.error('Please fill in all fields');
      return;
    }

    addExpense({
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
    });

    toast.success('Expense added successfully!');
    setFormData({
      amount: '',
      category: '',
      description: '',
      date: format(new Date(), 'yyyy-MM-dd'),
    });
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Add New Expense</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Amount (NPR)"
            type="number"
            step="0.01"
            min="0"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            placeholder="0.00"
            required
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select category</option>
              {EXPENSE_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Input
          label="Description"
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="What was this expense for?"
          required
        />

        <Input
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />

        <Button type="submit" className="w-full md:w-auto">
          Add Expense
        </Button>
      </form>
    </Card>
  );
}