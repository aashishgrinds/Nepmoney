import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useData } from '../../contexts/DataContext';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export function AddInvestmentForm() {
  const { stocks, addInvestment } = useData();
  const [formData, setFormData] = useState({
    stockId: '',
    shares: '',
    purchasePrice: '',
    purchaseDate: format(new Date(), 'yyyy-MM-dd'),
  });

  const selectedStock = stocks.find(s => s.id === formData.stockId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.stockId || !formData.shares || !formData.purchasePrice) {
      toast.error('Please fill in all fields');
      return;
    }

    const stock = stocks.find(s => s.id === formData.stockId);
    if (!stock) {
      toast.error('Invalid stock selected');
      return;
    }

    addInvestment({
      stockId: formData.stockId,
      symbol: stock.symbol,
      shares: parseInt(formData.shares),
      purchasePrice: parseFloat(formData.purchasePrice),
      purchaseDate: formData.purchaseDate,
      currentPrice: stock.currentPrice,
    });

    toast.success('Investment added successfully!');
    setFormData({
      stockId: '',
      shares: '',
      purchasePrice: '',
      purchaseDate: format(new Date(), 'yyyy-MM-dd'),
    });
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Add New Investment</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock</label>
            <select
              value={formData.stockId}
              onChange={(e) => setFormData({ ...formData, stockId: e.target.value })}
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
            >
              <option value="">Select a stock</option>
              {stocks.map((stock) => (
                <option key={stock.id} value={stock.id}>
                  {stock.symbol} - {stock.name}
                </option>
              ))}
            </select>
            {selectedStock && (
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Current Price: NPR {selectedStock.currentPrice.toFixed(2)}
              </p>
            )}
          </div>

          <Input
            label="Number of Shares"
            type="number"
            min="1"
            value={formData.shares}
            onChange={(e) => setFormData({ ...formData, shares: e.target.value })}
            placeholder="0"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Purchase Price (NPR)"
            type="number"
            step="0.01"
            min="0"
            value={formData.purchasePrice}
            onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
            placeholder="0.00"
            required
          />

          <Input
            label="Purchase Date"
            type="date"
            value={formData.purchaseDate}
            onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
            required
          />
        </div>

        {formData.shares && formData.purchasePrice && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Investment Summary</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Total Cost: NPR {(parseInt(formData.shares || '0') * parseFloat(formData.purchasePrice || '0')).toFixed(2)}
            </p>
            {selectedStock && (
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Current Value: NPR {(parseInt(formData.shares || '0') * selectedStock.currentPrice).toFixed(2)}
              </p>
            )}
          </div>
        )}

        <Button type="submit" className="w-full md:w-auto">
          Add Investment
        </Button>
      </form>
    </Card>
  );
}