@@ .. @@
import React from 'react';
import { Card } from '../ui/Card';
+import { Button } from '../ui/Button';
import { useData } from '../../contexts/DataContext';
import { formatCurrency, formatPercent } from '../../lib/utils';
-import { TrendingUp, TrendingDown } from 'lucide-react';
+import { TrendingUp, TrendingDown, Trash2 } from 'lucide-react';
+import toast from 'react-hot-toast';

export function Portfolio() {
}
-  const { investments, stocks } = useData();
+  const { investments, stocks, deleteInvestment } = useData();

  const portfolioItems = React.useMemo(() => {
  }
  )