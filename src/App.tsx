const renderContent = () => {
  switch (activeTab) {
    case 'dashboard':
      return <Dashboard />;
    case 'expenses':
      return <ExpensesPage />;
    case 'investments':
      return <InvestmentsPage />;
    case 'analytics':
      return <AnalyticsPage />;
    case 'goals':
      return <GoalsPage />;
    case 'calendar':
      return <CalendarPage />;
    case 'settings':
      return <SettingsPage />;
    default:
      return <Dashboard />;
  }
};