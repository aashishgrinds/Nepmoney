import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useData } from '../../contexts/DataContext';
import { formatCurrency, formatPercent } from '../../lib/utils';
import { TrendingUp, TrendingDown, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function Portfolio() {
  const { investments, stocks, deleteInvestment } = useData();

  const portfolioItems = React.useMemo(() => {
    return investments.map(investment => {
      const stock = stocks.find(s => s.symbol === investment.symbol);
      const currentPrice = stock?.price || 0;
      const currentValue = investment.shares * currentPrice;
      const totalCost = investment.shares * investment.purchasePrice;
      const gainLoss = currentValue - totalCost;
      const gainLossPercent = totalCost > 0 ? (gainLoss / totalCost) * 100 : 0;

      return {
        ...investment,
        stock,
        currentPrice,
        currentValue,
        totalCost,
        gainLoss,
        gainLossPercent
      };
    });
  }, [investments, stocks]);

  const totalValue = portfolioItems.reduce((sum, item) => sum + item.currentValue, 0);
  const totalCost = portfolioItems.reduce((sum, item) => sum + item.totalCost, 0);
  const totalGainLoss = totalValue - totalCost;
  const totalGainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;

  const handleDeleteInvestment = async (id: string) => {
    try {
      await deleteInvestment(id);
      toast.success('Investment deleted successfully');
    } catch (error) {
      toast.error('Failed to delete investment');
    }
  };

  return (
    <Card>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">My Portfolio</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(totalValue)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Cost</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(totalCost)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Gain/Loss</p>
            <div className={`flex items-center justify-center ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalGainLoss >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              <span className="text-xl font-semibold">{formatCurrency(totalGainLoss)}</span>
              <span className="text-sm ml-1">({formatPercent(totalGainLossPercent)})</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {portfolioItems.map((item) => (
          <div key={item.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">{item.symbol}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.stock?.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(item.currentValue)}</p>
                  <div className={`flex items-center ${item.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.gainLoss >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                    <span className="text-sm font-medium">{formatCurrency(item.gainLoss)}</span>
                    <span className="text-xs ml-1">({formatPercent(item.gainLossPercent)})</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteInvestment(item.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Shares:</span>
                <span className="ml-2 font-medium">{item.shares}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Avg Price:</span>
                <span className="ml-2 font-medium">{formatCurrency(item.purchasePrice)}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Current Price:</span>
                <span className="ml-2 font-medium">{formatCurrency(item.currentPrice)}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Total Cost:</span>
                <span className="ml-2 font-medium">{formatCurrency(item.totalCost)}</span>
              </div>
            </div>
          </div>
        ))}
        
        {portfolioItems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No investments found.</p>
          </div>
        )}
      </div>
    </Card>
  );
}