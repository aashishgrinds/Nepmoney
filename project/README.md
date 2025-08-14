# Nepmoney - Personal Finance Tracker

A modern, comprehensive expense and investment tracker built with React, TypeScript, and Tailwind CSS. Track your expenses, monitor investments with fake NPSE stocks, and gain insights into your financial health.

## Features

### 💰 Expense Management
- Add, edit, and delete expenses with categories
- Search and filter expenses by category or description
- Export expense data to CSV
- Visual expense breakdown with interactive charts
- Monthly expense tracking and trends

### 📈 Investment Portfolio
- Track investments in fake NPSE (Nepal Stock Exchange) stocks
- Real-time price simulation with automatic updates
- Portfolio performance tracking with gain/loss calculations
- 10 realistic Nepali bank stocks with market data
- Interactive stock price charts and visualizations

### 📊 Dashboard & Analytics
- Comprehensive dashboard with key financial metrics
- Interactive charts using Recharts library
- Expense category breakdown (pie charts)
- Portfolio allocation and performance metrics
- Recent transactions overview

### 🎨 Modern UI/UX
- Clean, minimalist design with blue-white color scheme
- Responsive design optimized for all device sizes
- Smooth animations and micro-interactions
- Apple-level design aesthetics with attention to detail
- Inter font family for modern typography

## Demo Credentials

- **Username:** demo
- **Password:** demo123

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **State Management:** React Context API
- **Storage:** localStorage (no backend required)
- **Date Handling:** date-fns

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nepmoney.git
cd nepmoney
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard components
│   ├── expenses/       # Expense tracking components
│   ├── investments/    # Investment portfolio components
│   ├── layout/         # Layout components (Header, Sidebar)
│   ├── settings/       # Settings page components
│   └── ui/            # Reusable UI components
├── contexts/           # React Context providers
├── lib/               # Utility functions and helpers
├── types/             # TypeScript type definitions
└── main.tsx          # Application entry point
```

## Key Components

### Authentication
- Simple demo login system with localStorage
- Protected routes and session management
- Auto-login for demo purposes

### Data Management
- **LocalStorage:** Persistent data storage in browser
- **Mock Data:** Realistic fake expenses and NPSE stock data
- **Data Export:** CSV export functionality for expenses

### NPSE Stocks (Demo)
The application includes 10 realistic Nepali bank stocks:
- Nabil Bank Limited (NABIL)
- Himalayan Bank Limited (HBL)
- Everest Bank Limited (EBL)
- NIC Asia Bank Limited (NICA)
- Standard Chartered Bank (SCB)
- Bank of Kathmandu Limited (BOKL)
- Nepal Bank Limited (NBL)
- Rastriya Banijya Bank (RBBL)
- Agriculture Development Bank (ADBL)
- Global IME Bank Limited (GBIME)

### Expense Categories
- Food & Dining
- Transportation
- Shopping
- Bills & Utilities
- Entertainment
- Healthcare
- Education
- Travel
- Business
- Others

## Features in Detail

### Dashboard Overview
- Total expenses and portfolio value
- Monthly expense tracking
- Portfolio performance with gain/loss calculations
- Recent transactions list
- Interactive expense breakdown charts

### Expense Tracking
- Quick expense entry form
- Comprehensive expense list with search and filtering
- Category-based organization
- Date range filtering
- Export to CSV functionality

### Investment Portfolio
- Fake NPSE stock tracking
- Real-time price simulation (updates every 30 seconds)
- Portfolio performance calculations
- Individual stock details and market data
- Investment allocation visualization

### Settings & Data Management
- Profile information display
- Data export (JSON backup)
- Clear all data functionality
- Application information and version details

## Design Principles

### Color Scheme
- **Primary Blue:** #3B82F6
- **Light Blue:** #EFF6FF
- **White:** #FFFFFF for cards and backgrounds
- **Gray Scale:** Various shades for text and borders

### Typography
- **Font Family:** Inter (Google Fonts)
- **Line Height:** 150% for body text, 120% for headings
- **Font Weights:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing System
- **Base Unit:** 8px spacing system
- **Consistent margins and padding** throughout the application
- **Grid layouts** for responsive design

### Responsive Design
- **Mobile First:** Optimized for mobile devices
- **Breakpoints:** 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from modern fintech applications
- NPSE stock data simulated for demonstration purposes
- Icons provided by Lucide React
- Charts powered by Recharts library

---

**Note:** This is a demo application with simulated data. All stock prices and financial data are fake and used for demonstration purposes only. Not intended for real financial tracking or investment decisions.