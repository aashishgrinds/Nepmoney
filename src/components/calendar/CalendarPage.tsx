import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useData } from '../../contexts/DataContext';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

export function CalendarPage() {
  const { expenses } = useData();
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getExpensesForDay = (date: Date) => {
    return expenses.filter(expense => isSameDay(new Date(expense.date), date));
  };

  const getDayTotal = (date: Date) => {
    return getExpensesForDay(date).reduce((sum, expense) => sum + expense.amount, 0);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthlyTotal = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= monthStart && expenseDate <= monthEnd;
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Expense Calendar</h2>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Monthly Total</p>
            <p className="text-lg font-semibold text-gray-900">{formatCurrency(monthlyTotal)}</p>
          </div>
        </div>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {daysInMonth.map(day => {
            const dayExpenses = getExpensesForDay(day);
            const dayTotal = getDayTotal(day);
            const hasExpenses = dayExpenses.length > 0;
            const isCurrentDay = isToday(day);

            return (
              <div
                key={day.toISOString()}
                className={`min-h-[80px] p-2 border border-gray-200 rounded-lg ${
                  isCurrentDay ? 'bg-blue-50 border-blue-300' : 'bg-white hover:bg-gray-50'
                } transition-colors`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-sm font-medium ${
                    isCurrentDay ? 'text-blue-700' : 'text-gray-900'
                  }`}>
                    {format(day, 'd')}
                  </span>
                  {hasExpenses && (
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </div>
                
                {hasExpenses && (
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-red-600">
                      {formatCurrency(dayTotal)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {dayExpenses.length} transaction{dayExpenses.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Expenses:</span>
              <span className="font-medium">{formatCurrency(monthlyTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Average Daily:</span>
              <span className="font-medium">
                {formatCurrency(monthlyTotal / daysInMonth.length)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Days with Expenses:</span>
              <span className="font-medium">
                {daysInMonth.filter(day => getExpensesForDay(day).length > 0).length}
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Expense Days</h3>
          <div className="space-y-2">
            {daysInMonth
              .map(day => ({ day, total: getDayTotal(day) }))
              .filter(item => item.total > 0)
              .sort((a, b) => b.total - a.total)
              .slice(0, 5)
              .map(({ day, total }) => (
                <div key={day.toISOString()} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium">
                    {format(day, 'MMM d, yyyy')}
                  </span>
                  <span className="text-sm font-semibold text-red-600">
                    {formatCurrency(total)}
                  </span>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}