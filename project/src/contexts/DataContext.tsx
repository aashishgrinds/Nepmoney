import React, { createContext, useContext, useEffect, useState } from 'react';
import { Expense, Stock, Investment, DashboardStats } from '../types';
import { LocalStorage } from '../lib/storage';
import { NPSE_STOCKS, generateMockExpenses, generateMockInvestments } from '../lib/mockData';
import { useAuth } from './AuthContext';
import { getRandomPriceChange } from '../lib/utils';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

interface DataContextType {
  expenses: Expense[];
  stocks: Stock[];
  investments: Investment[];
  dashboardStats: DashboardStats;
  addExpense: (expense: Omit<Expense, 'id' | 'userId' | 'createdAt'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  refreshStockPrices: () => void;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

interface DataProviderProps {
  children: React.ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      initializeData();
    } else {
      setExpenses([]);
      setStocks([]);
      setInvestments([]);
    }
    setLoading(false);
  }, [user]);

  // Auto-refresh stock prices every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (stocks.length > 0) {
        refreshStockPrices();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [stocks]);

  const initializeData = () => {
    if (!user) return;

    // Load or generate expenses
    let userExpenses = LocalStorage.getExpenses().filter(e => e.userId === user.id);
    if (userExpenses.length === 0) {
      userExpenses = generateMockExpenses(user.id);
      LocalStorage.setExpenses(userExpenses);
    }
    setExpenses(userExpenses);

    // Load or generate stocks
    let stockData = LocalStorage.getStocks();
    if (stockData.length === 0) {
      stockData = [...NPSE_STOCKS];
      LocalStorage.setStocks(stockData);
    }
    setStocks(stockData);

    // Load or generate investments
    let userInvestments = LocalStorage.getInvestments().filter(i => i.userId === user.id);
    if (userInvestments.length === 0) {
      userInvestments = generateMockInvestments(user.id);
      LocalStorage.setInvestments(userInvestments);
    }
    setInvestments(userInvestments);
  };

  const addExpense = (expenseData: Omit<Expense, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;

    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date().toISOString(),
    };

    const updatedExpenses = [newExpense, ...expenses];
    setExpenses(updatedExpenses);
    LocalStorage.setExpenses([...LocalStorage.getExpenses().filter(e => e.userId !== user.id), ...updatedExpenses]);
  };

  const updateExpense = (id: string, expenseData: Partial<Expense>) => {
    if (!user) return;

    const updatedExpenses = expenses.map(expense =>
      expense.id === id ? { ...expense, ...expenseData } : expense
    );
    setExpenses(updatedExpenses);
    
    const allExpenses = LocalStorage.getExpenses();
    const otherUsersExpenses = allExpenses.filter(e => e.userId !== user.id);
    LocalStorage.setExpenses([...otherUsersExpenses, ...updatedExpenses]);
  };

  const deleteExpense = (id: string) => {
    if (!user) return;

    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    
    const allExpenses = LocalStorage.getExpenses();
    const filteredExpenses = allExpenses.filter(e => e.id !== id);
    LocalStorage.setExpenses(filteredExpenses);
  };

  const refreshStockPrices = () => {
    const updatedStocks = stocks.map(stock => {
      const change = getRandomPriceChange();
      const newPrice = Math.max(stock.currentPrice + change, 50);
      return {
        ...stock,
        currentPrice: newPrice,
        change,
        changePercent: (change / (newPrice - change)) * 100,
      };
    });

    setStocks(updatedStocks);
    LocalStorage.setStocks(updatedStocks);

    // Update investment current prices
    const updatedInvestments = investments.map(investment => {
      const stock = updatedStocks.find(s => s.id === investment.stockId);
      return stock ? { ...investment, currentPrice: stock.currentPrice } : investment;
    });

    setInvestments(updatedInvestments);
    const allInvestments = LocalStorage.getInvestments();
    const otherUsersInvestments = allInvestments.filter(i => i.userId !== user?.id);
    LocalStorage.setInvestments([...otherUsersInvestments, ...updatedInvestments]);
  };

  const dashboardStats: DashboardStats = React.useMemo(() => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const monthlyExpenses = expenses
      .filter(expense => 
        isWithinInterval(new Date(expense.date), { start: monthStart, end: monthEnd })
      )
      .reduce((sum, expense) => sum + expense.amount, 0);

    const totalInvestmentValue = investments.reduce(
      (sum, investment) => sum + (investment.shares * investment.currentPrice), 
      0
    );
    
    const totalInvestmentCost = investments.reduce(
      (sum, investment) => sum + (investment.shares * investment.purchasePrice), 
      0
    );

    const portfolioChange = totalInvestmentValue - totalInvestmentCost;
    const portfolioChangePercent = totalInvestmentCost > 0 
      ? (portfolioChange / totalInvestmentCost) * 100 
      : 0;

    return {
      totalExpenses,
      totalInvestments: totalInvestmentValue,
      monthlyExpenses,
      portfolioValue: totalInvestmentValue,
      portfolioChange,
      portfolioChangePercent,
    };
  }, [expenses, investments]);

  const value = {
    expenses,
    stocks,
    investments,
    dashboardStats,
    addExpense,
    updateExpense,
    deleteExpense,
    refreshStockPrices,
    loading,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}