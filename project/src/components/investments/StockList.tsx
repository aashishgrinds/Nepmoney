import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useData } from '../../contexts/DataContext';
import { formatCurrency, formatPercent } from '../../lib/utils';
import { RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';

export function StockList() {
  const { stocks, refreshStockPrices } = useData();

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">NPSE Stocks</h3>
        <Button onClick={refreshStockPrices} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Prices
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stocks.map((stock) => (
          <div
            key={stock.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-900">{stock.symbol}</h4>
                <p className="text-sm text-gray-600">{stock.name}</p>
              </div>
              <div className={`flex items-center ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stock.change >= 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span className="text-sm font-medium">
                  {formatPercent(stock.changePercent)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Current Price:</span>
                <span className="font-semibold">{formatCurrency(stock.currentPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Change:</span>
                <span className={`font-medium ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.change >= 0 ? '+' : ''}{formatCurrency(stock.change)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Volume:</span>
                <span className="text-sm">{stock.volume.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}