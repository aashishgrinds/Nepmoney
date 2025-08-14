import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { User, Database, Download, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function SettingsPage() {
  const { user } = useAuth();
  const { expenses, investments } = useData();

  const exportAllData = () => {
    const data = {
      user,
      expenses,
      investments,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nepmoney-backup.json';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Data exported successfully!');
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600">Name:</label>
              <p className="text-gray-900">{user?.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Username:</label>
              <p className="text-gray-900">{user?.username}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Email:</label>
              <p className="text-gray-900">{user?.email}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center mb-4">
            <Database className="h-5 w-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Data Management</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Total Expenses: <span className="font-medium">{expenses.length}</span>
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Total Investments: <span className="font-medium">{investments.length}</span>
              </p>
            </div>

            <div className="space-y-3">
              <Button onClick={exportAllData} variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export All Data
              </Button>

              <Button onClick={clearAllData} variant="outline" className="w-full text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All Data
              </Button>
            </div>
          </div>
        </Card>

        <Card className="md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">About Nepmoney</h3>
          <div className="prose text-sm text-gray-600 space-y-2">
            <p>
              Nepmoney is a comprehensive personal finance tracker designed to help you manage 
              your expenses and investments effectively. Built with modern web technologies, 
              it provides an intuitive interface for tracking your financial health.
            </p>
            <p>
              <strong>Features:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Expense tracking with categories and search</li>
              <li>Investment portfolio management with fake NPSE stocks</li>
              <li>Interactive charts and visualizations</li>
              <li>Data export functionality</li>
              <li>Responsive design for all devices</li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">
              Version 1.0.0 | Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}