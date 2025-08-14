import React from 'react';
import { LayoutDashboard, Receipt, TrendingUp, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'expenses', name: 'Expenses', icon: Receipt },
  { id: 'investments', name: 'Investments', icon: TrendingUp },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <nav className="bg-white border-r border-gray-200 w-64 min-h-screen">
      <div className="p-6">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    'w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
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
    </nav>
  );
}