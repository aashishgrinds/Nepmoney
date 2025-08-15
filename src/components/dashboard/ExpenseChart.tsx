@@ .. @@
   const CustomTooltip = ({ active, payload }: any) => {
     if (active && payload && payload.length) {
       const data = payload[0].payload;
       return (
-        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
-          <p className="font-medium">{data.category}</p>
+        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
+          <p className="font-medium text-gray-900 dark:text-gray-100">{data.category}</p>
           <p className="text-blue-600">{formatCurrency(data.amount)}</p>
-          <p className="text-gray-600 text-sm">{data.count} transactions</p>
+          <p className="text-gray-600 dark:text-gray-400 text-sm">{data.count} transactions</p>
         </div>
       );
     }
     return null;
   };

   return (
     <Card>
-      <h3 className="text-lg font-semibold text-gray-900 mb-6">Expense Breakdown</h3>
+      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Expense Breakdown</h3>
       <div className="h-80">
         <ResponsiveContainer width="100%" height="100%">
           <PieChart>