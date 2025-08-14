interface DataContextType {
  expenses: Expense[];
  stocks: Stock[];
  investments: Investment[];
  dashboardStats: DashboardStats;
  addExpense: (expense: Omit<Expense, 'id' | 'userId' | 'createdAt'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  addInvestment: (investment: Omit<Investment, 'id' | 'userId'>) => void;
  deleteInvestment: (id: string) => void;
  refreshStockPrices: () => void;
  loading: boolean;
}

  const value = {
    expenses,
    stocks,
    investments,
    dashboardStats,
    addExpense,
    updateExpense,
    deleteExpense,
    addInvestment,
    deleteInvestment,
    refreshStockPrices,
    loading,
  };