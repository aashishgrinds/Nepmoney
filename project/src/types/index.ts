export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
}

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  marketCap: number;
  volume: number;
  high52Week: number;
  low52Week: number;
}

export interface Investment {
  id: string;
  userId: string;
  stockId: string;
  symbol: string;
  shares: number;
  purchasePrice: number;
  purchaseDate: string;
  currentPrice: number;
}

export interface DashboardStats {
  totalExpenses: number;
  totalInvestments: number;
  monthlyExpenses: number;
  portfolioValue: number;
  portfolioChange: number;
  portfolioChangePercent: number;
}

export interface ChartData {
  date: string;
  expenses: number;
  investments: number;
  netWorth: number;
}

export interface CategoryData {
  category: string;
  amount: number;
  count: number;
}