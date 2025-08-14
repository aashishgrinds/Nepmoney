{portfolioItems.map((item) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{item.symbol}</h4>
                <p className="text-sm text-gray-600">{item.stock?.name}</p>
              </div>
              <div className="flex items-center space-x-3">
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteInvestment(item.id, item.symbol)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>