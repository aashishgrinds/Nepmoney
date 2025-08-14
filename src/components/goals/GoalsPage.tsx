import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Target, Plus, Trash2, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import toast from 'react-hot-toast';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: 'savings' | 'investment' | 'expense';
  completed: boolean;
}

export function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      targetAmount: 100000,
      currentAmount: 45000,
      deadline: '2025-12-31',
      category: 'savings',
      completed: false,
    },
    {
      id: '2',
      title: 'New Laptop',
      targetAmount: 80000,
      currentAmount: 65000,
      deadline: '2025-06-30',
      category: 'savings',
      completed: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    deadline: '',
    category: 'savings' as Goal['category'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: formData.title,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: 0,
      deadline: formData.deadline,
      category: formData.category,
      completed: false,
    };

    setGoals([...goals, newGoal]);
    setFormData({ title: '', targetAmount: '', deadline: '', category: 'savings' });
    setShowForm(false);
    toast.success('Goal added successfully!');
  };

  const deleteGoal = (id: string) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      setGoals(goals.filter(g => g.id !== id));
      toast.success('Goal deleted successfully!');
    }
  };

  const updateProgress = (id: string, amount: number) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, currentAmount: Math.min(amount, goal.targetAmount) }
        : goal
    ));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Financial Goals</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {showForm && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Create New Goal</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Goal Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Emergency Fund"
                required
              />
              <Input
                label="Target Amount (NPR)"
                type="number"
                value={formData.targetAmount}
                onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                placeholder="100000"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                required
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Goal['category'] })}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="savings">Savings</option>
                  <option value="investment">Investment</option>
                  <option value="expense">Expense Reduction</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button type="submit">Create Goal</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const isCompleted = progress >= 100;
          
          return (
            <Card key={goal.id}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                  {isCompleted && <CheckCircle className="h-5 w-5 text-green-600 ml-2" />}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteGoal(goal.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isCompleted ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Current:</span>
                    <p className="font-semibold">{formatCurrency(goal.currentAmount)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Target:</span>
                    <p className="font-semibold">{formatCurrency(goal.targetAmount)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Remaining:</span>
                    <p className="font-semibold">{formatCurrency(goal.targetAmount - goal.currentAmount)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Deadline:</span>
                    <p className="font-semibold">{new Date(goal.deadline).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Update amount"
                    className="flex-1"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const amount = parseFloat((e.target as HTMLInputElement).value);
                        if (amount > 0) {
                          updateProgress(goal.id, amount);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                  <span className={`px-3 py-2 rounded-lg text-xs font-medium ${
                    goal.category === 'savings' ? 'bg-blue-100 text-blue-800' :
                    goal.category === 'investment' ? 'bg-green-100 text-green-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {goal.category}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {goals.length === 0 && (
        <Card className="text-center py-12">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No goals yet</h3>
          <p className="text-gray-600 mb-4">Start by creating your first financial goal</p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Goal
          </Button>
        </Card>
      )}
    </div>
  );
}