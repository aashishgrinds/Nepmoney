import React from 'react';
import { 
  LayoutDashboard, 
  Receipt, 
  TrendingUp, 
  Settings, 
  Plus,
  PieChart,
  Target,
  Calendar,
  Download,
  Bell,
  Calculator,
  Bookmark
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useData } from '../../contexts/DataContext';
import { formatCurrency } from '../../lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'expenses', name: 'Expenses', icon: Receipt },
  { id: 'investments', name: 'Investments', icon: TrendingUp },
  { id: 'analytics', name: 'Analytics', icon: PieChart },
  { id: 'goals', name: 'Goals', icon: Target },
  { id: 'calendar', name: 'Calendar', icon: Calendar },
  { id: 'settings', name: 'Settings', icon: Settings },
];

const quickActions = [
  { id: 'add-expense', name: 'Add Expense', icon: Plus, color: 'text-red-600 bg-red-50' },
  { id: 'add-investment', name: 'Add Investment', icon: TrendingUp, color: 'text-green-600 bg-green-50' },
  { id: 'calculator', name: 'Calculator', icon: Calculator, color: 'text-blue-600 bg-blue-50' },
  { id: 'export', name: 'Export Data', icon: Download, color: 'text-purple-600 bg-purple-50' },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { dashboardStats, expenses } = useData();

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'add-expense':
        onTabChange('expenses');
        break;
      case 'add-investment':
        onTabChange('investments');
        break;
      case 'calculator':
        // Open calculator modal or navigate to calculator
        break;
      case 'export':
        // Export functionality
        const data = { expenses, stats: dashboardStats };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'nepmoney-data.json';
        a.click();
        window.URL.revokeObjectURL(url);
        break;
    }
  };

  return (
    <nav className="bg-white border-r border-gray-200 w-72 min-h-screen flex flex-col">
      <div className="p-6 flex-1">
        {/* Navigation Menu */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Navigation
          </h3>
          <ul className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onTabChange(item.id)}
                    className={cn(
                      'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  className={cn(
                    'flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-sm',
                    action.color
                  )}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium text-center leading-tight">
                    {action.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quick Stats
          </h3>
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-600 font-medium">Portfolio Value</p>
                  <p className="text-sm font-semibold text-blue-900">
                    {formatCurrency(dashboardStats.portfolioValue)}
                  </p>
                </div>
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-red-600 font-medium">This Month</p>
                  <p className="text-sm font-semibold text-red-900">
                    {formatCurrency(dashboardStats.monthlyExpenses)}
                  </p>
                </div>
                <Receipt className="h-5 w-5 text-red-600" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-600 font-medium">Portfolio Change</p>
                  <p className="text-sm font-semibold text-green-900">
                    {dashboardStats.portfolioChange >= 0 ? '+' : ''}{formatCurrency(dashboardStats.portfolioChange)}
                  </p>
                </div>
                <div className={`h-5 w-5 ${dashboardStats.portfolioChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Recent Activity
          </h3>
          <div className="space-y-2">
            {expenses.slice(0, 3).map((expense) => (
              <div key={expense.id} className="flex items-center p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">
                    {expense.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatCurrency(expense.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Nepmoney v1.0</span>
          <div className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <Bookmark className="h-4 w-4" />
          </div>
        </div>
      </div>
    </nav>
  );
}