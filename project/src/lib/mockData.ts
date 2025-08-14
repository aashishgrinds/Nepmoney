import { Expense, Stock, Investment } from '../types';
import { generateId, getRandomPriceChange } from './utils';
import { subDays, format } from 'date-fns';

export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Bills & Utilities',
  'Entertainment',
  'Healthcare',
  'Education',
  'Travel',
  'Business',
  'Others'
];

export const DEMO_USER = {
  id: 'demo-user',
  username: 'demo',
  name: 'Demo User',
  email: 'demo@nepmoney.com'
};

export const NPSE_STOCKS: Stock[] = [
  {
    id: 'nabil',
    symbol: 'NABIL',
    name: 'Nabil Bank Limited',
    currentPrice: 1250,
    change: getRandomPriceChange(),
    changePercent: 0,
    marketCap: 125000000000,
    volume: 45000,
    high52Week: 1380,
    low52Week: 980
  },
  {
    id: 'hbl',
    symbol: 'HBL',
    name: 'Himalayan Bank Limited',
    currentPrice: 890,
    change: getRandomPriceChange(),
    changePercent: 0,
    marketCap: 89000000000,
    volume: 32000,
    high52Week: 1020,
    low52Week: 750
  },
  {
    id: 'ebl',
    symbol: 'EBL',
    name: 'Everest Bank Limited',
    currentPrice: 775,
    change: getRandomPriceChange(),
    changePercent: 0,
    marketCap: 77500000000,
    volume: 28000,
    high52Week: 850,
    low52Week: 650
  },
  {
    id: 'nica',
    symbol: 'NICA',
    name: 'NIC Asia Bank Limited',
    currentPrice: 1180,
    change: getRandomPriceChange(),
    changePercent: 0,
    marketCap: 118000000000,
    volume: 41000,
    high52Week: 1320,
    low52Week: 950
  },
  {
    id: 'scb',
    symbol: 'SCB',
    name: 'Standard Chartered Bank',
    currentPrice: 650,
    change: getRandomPriceChange(),
    changePercent: 0,
    marketCap: 65000000000,
    volume: 25000,
    high52Week: 780,
    low52Week: 520
  },
  {
    id: 'bokl',
    symbol: 'BOKL',
    name: 'Bank of Kathmandu Limited',
    currentPrice: 420,
    change: getRandomPriceChange(),
    changePercent: 0,
    marketCap: 42000000000,
    volume: 35000,
    high52Week: 480,
    low52Week: 320
  },
  {
    id: 'nbl',
    symbol: 'NBL',
    name: 'Nepal Bank Limited',
    currentPrice: 580,
    change: getRandomPriceChange(),
    changePercent: 0,
    marketCap: 58000000000,
    volume: 22000,
    high52Week: 650,
    low52Week: 450
  },
  {
    id: 'rbbl',
    symbol: 'RBBL',
    name: 'Rastriya Banijya Bank',
    currentPrice: 320,
    change: getRandomPriceChange(),
    changePercent: 0,
    marketCap: 32000000000,
    volume: 18000,
    high52Week: 380,
    low52Week: 250
  },
  {
    id: 'adbl',
    symbol: 'ADBL',
    name: 'Agriculture Development Bank',
    currentPrice: 480,
    change: getRandomPriceChange(),
    changePercent: 0,
    marketCap: 48000000000,
    volume: 30000,
    high52Week: 550,
    low52Week: 380
  },
  {
    id: 'gbime',
    symbol: 'GBIME',
    name: 'Global IME Bank Limited',
    currentPrice: 390,
    change: getRandomPriceChange(),
    changePercent: 0,
    marketCap: 39000000000,
    volume: 26000,
    high52Week: 450,
    low52Week: 310
  }
];

// Update change percentages
NPSE_STOCKS.forEach(stock => {
  stock.changePercent = (stock.change / (stock.currentPrice - stock.change)) * 100;
});

export const generateMockExpenses = (userId: string): Expense[] => {
  const expenses: Expense[] = [];
  
  for (let i = 0; i < 50; i++) {
    const date = subDays(new Date(), Math.floor(Math.random() * 90));
    expenses.push({
      id: generateId(),
      userId,
      amount: Math.floor(Math.random() * 5000) + 100,
      category: EXPENSE_CATEGORIES[Math.floor(Math.random() * EXPENSE_CATEGORIES.length)],
      description: getRandomDescription(),
      date: format(date, 'yyyy-MM-dd'),
      createdAt: date.toISOString()
    });
  }
  
  return expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const generateMockInvestments = (userId: string): Investment[] => {
  const investments: Investment[] = [];
  const selectedStocks = NPSE_STOCKS.slice(0, 6);
  
  selectedStocks.forEach(stock => {
    const shares = Math.floor(Math.random() * 100) + 10;
    const purchasePrice = stock.currentPrice - (Math.random() * 200 - 100);
    const purchaseDate = subDays(new Date(), Math.floor(Math.random() * 180));
    
    investments.push({
      id: generateId(),
      userId,
      stockId: stock.id,
      symbol: stock.symbol,
      shares,
      purchasePrice: Math.max(purchasePrice, 50),
      purchaseDate: format(purchaseDate, 'yyyy-MM-dd'),
      currentPrice: stock.currentPrice
    });
  });
  
  return investments;
};

function getRandomDescription(): string {
  const descriptions = [
    'Coffee and breakfast',
    'Grocery shopping',
    'Taxi ride',
    'Movie tickets',
    'Restaurant dinner',
    'Phone bill',
    'Internet bill',
    'Fuel for bike',
    'Medical checkup',
    'Book purchase',
    'Gym membership',
    'Birthday gift',
    'Utility bill',
    'Clothing shopping',
    'Bus fare',
    'Snacks and drinks',
    'Car maintenance',
    'Software subscription',
    'Food delivery',
    'Office supplies'
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}