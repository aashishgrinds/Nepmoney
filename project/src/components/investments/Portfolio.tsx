import React from 'react';
import { Card } from '../ui/Card';
import { useData } from '../../contexts/DataContext';
import { formatCurrency, formatPercent } from '../../lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function Portfolio() {
  const { investments, stocks } = useData();

  const portfolioItems = React.useMemo(() => {
    return investments.map(investment => {
      const stock = stocks.find(s => s.id === investment.stockId);
      const currentValue = investment.shares * investment.currentPrice;
      const totalCost = investment.shares * investment.purchasePrice;
      const gainLoss = currentValue - totalCost;
      const gainLossPercent = (gainLoss / totalCost) * 100;

      return {
        ...investment,
        stock,
        currentValue,
        totalCost,
        gainLoss,
        gainLossPercent,
      };
    });
  }, [investments, stocks]);

  const totalValue = portfolioItems.reduce((sum, item) => sum + item.currentValue, 0);
  const totalCost = portfolioItems.reduce((sum, item) => sum + item.totalCost, 0);
  const totalGainLoss = totalValue - totalCost;
  const totalGainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;

  return (
    <Card>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">My Portfolio</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Value</p>
            <p className="text-xl font-semibold text-gray-900">{formatCurrency(totalValue)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Cost</p>
            <p className="text-xl font-semibold text-gray-900">{formatCurrency(totalCost)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Gain/Loss</p>
            <div className={`flex items-center justify-center ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalGainLoss >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              <div className="text-center">
                <p className="text-xl font-semibold">{formatCurrency(Math.abs(totalGainLoss))}</p>
                <p className="text-sm">{formatPercent(totalGainLossPercent)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {portfolioItems.map((item) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{item.symbol}</h4>
                <p className="text-sm text-gray-600">{item.stock?.name}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatCurrency(item.currentValue)}</p>
                <div className={`flex items-center ${item.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.gainLoss >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  <span className="text-sm">
                    {formatCurrency(Math.abs(item.gainLoss))} ({formatPercent(item.gainLossPercent)})
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Shares:</span>
                <span className="ml-2 font-medium">{item.shares}</span>
              </div>
              <div>
                <span className="text-gray-600">Avg Price:</span>
                <span className="ml-2 font-medium">{formatCurrency(item.purchasePrice)}</span>
              </div>
              <div>
                <span className="text-gray-600">Current Price:</span>
                <span className="ml-2 font-medium">{formatCurrency(item.currentPrice)}</span>
              </div>
              <div>
                <span className="text-gray-600">Total Cost:</span>
                <span className="ml-2 font-medium">{formatCurrency(item.totalCost)}</span>
              </div>
            </div>
          </div>
        ))}

        {portfolioItems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No investments found.</p>
          </div>
        )}
      </div>
    </Card>
  );
}