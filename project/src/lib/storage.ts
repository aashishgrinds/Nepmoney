import { User, Expense, Stock, Investment } from '../types';

const STORAGE_KEYS = {
  USER: 'nepmoney_user',
  EXPENSES: 'nepmoney_expenses',
  INVESTMENTS: 'nepmoney_investments',
  STOCKS: 'nepmoney_stocks',
};

export class LocalStorage {
  static setUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  static getUser(): User | null {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  }

  static removeUser(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  static setExpenses(expenses: Expense[]): void {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }

  static getExpenses(): Expense[] {
    const expenses = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    return expenses ? JSON.parse(expenses) : [];
  }

  static setStocks(stocks: Stock[]): void {
    localStorage.setItem(STORAGE_KEYS.STOCKS, JSON.stringify(stocks));
  }

  static getStocks(): Stock[] {
    const stocks = localStorage.getItem(STORAGE_KEYS.STOCKS);
    return stocks ? JSON.parse(stocks) : [];
  }

  static setInvestments(investments: Investment[]): void {
    localStorage.setItem(STORAGE_KEYS.INVESTMENTS, JSON.stringify(investments));
  }

  static getInvestments(): Investment[] {
    const investments = localStorage.getItem(STORAGE_KEYS.INVESTMENTS);
    return investments ? JSON.parse(investments) : [];
  }
}