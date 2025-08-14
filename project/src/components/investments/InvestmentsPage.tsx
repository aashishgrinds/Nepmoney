import React from 'react';
import { Portfolio } from './Portfolio';
import { StockList } from './StockList';

export function InvestmentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Investment Portfolio</h2>
        <Portfolio />
      </div>
      <StockList />
    </div>
  );
}