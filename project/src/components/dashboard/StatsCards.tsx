import React from 'react';
import { Card } from '../ui/Card';
import { DashboardStats } from '../../types';
import { formatCurrency, formatPercent } from '../../lib/utils';
import { TrendingUp, TrendingDown, DollarSign, Receipt } from 'lucide-react';

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Expenses',
      value: formatCurrency(stats.totalExpenses),
      icon: Receipt,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Portfolio Value',
      value: formatCurrency(stats.portfolioValue),
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'This Month',
      value: formatCurrency(stats.monthlyExpenses),
      icon: Receipt,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Portfolio Change',
      value: formatCurrency(stats.portfolioChange),
      subtitle: formatPercent(stats.portfolioChangePercent),
      icon: stats.portfolioChange >= 0 ? TrendingUp : TrendingDown,
      color: stats.portfolioChange >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: stats.portfolioChange >= 0 ? 'bg-green-50' : 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{card.value}</p>
                {card.subtitle && (
                  <p className={`text-sm font-medium mt-1 ${card.color}`}>{card.subtitle}</p>
                )}
              </div>
              <div className={`${card.bgColor} ${card.color} p-3 rounded-full`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}