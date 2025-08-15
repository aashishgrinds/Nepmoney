@@ .. @@
   return (
     <Card>
-      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Transactions</h3>
+      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Recent Transactions</h3>
       <div className="space-y-4">
         {recentExpenses.map((expense) => (
-          <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
+          <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
             <div className="flex items-center space-x-3">
-              <div className="p-2 bg-blue-100 rounded-full">
-                <Receipt className="h-4 w-4 text-blue-600" />
+              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
+                <Receipt className="h-4 w-4 text-blue-600 dark:text-blue-400" />
               </div>
               <div>
-                <p className="font-medium text-gray-900">{expense.description}</p>
-                <p className="text-sm text-gray-600">{expense.category}</p>
+                <p className="font-medium text-gray-900 dark:text-gray-100">{expense.description}</p>
+                <p className="text-sm text-gray-600 dark:text-gray-400">{expense.category}</p>
               </div>
             </div>
             <div className="text-right">
-              <p className="font-semibold text-gray-900">{formatCurrency(expense.amount)}</p>
-              <p className="text-sm text-gray-600">{format(new Date(expense.date), 'MMM dd')}</p>
+              <p className="font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(expense.amount)}</p>
+              <p className="text-sm text-gray-600 dark:text-gray-400">{format(new Date(expense.date), 'MMM dd')}</p>
             </div>
           </div>
         ))}
       </div>
     </Card>
   );
 }