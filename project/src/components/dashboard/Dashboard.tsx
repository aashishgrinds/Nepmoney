import React from 'react';
import { useData } from '../../contexts/DataContext';
import { StatsCards } from './StatsCards';
import { ExpenseChart } from './ExpenseChart';
import { RecentTransactions } from './RecentTransactions';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export function Dashboard() {
  const { dashboardStats, expenses, loading } = useData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
        <StatsCards stats={dashboardStats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ExpenseChart expenses={expenses} />
        <RecentTransactions expenses={expenses} />
      </div>
    </div>
  );
}