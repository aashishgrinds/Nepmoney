@@ .. @@
   return (
     <Card>
       <div className="flex justify-between items-center mb-6">
-        <h3 className="text-lg font-semibold text-gray-900">All Expenses</h3>
+        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">All Expenses</h3>
         <Button onClick={exportToCsv} variant="outline" size="sm">
           <Download className="h-4 w-4 mr-2" />
           Export CSV
@@ .. @@
           <select
             value={selectedCategory}
             onChange={(e) => setSelectedCategory(e.target.value)}
-            className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
+            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
           >
             <option value="">All Categories</option>
@@ .. @@
           <select
             value={sortOrder}
             onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
-            className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
+            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
           >
             <option value="desc">Newest First</option>
             <option value="asc">Oldest First</option>
@@ .. @@
       <div className="overflow-x-auto">
         <table className="min-w-full divide-y divide-gray-200">
-          <thead className="bg-gray-50">
+          <thead className="bg-gray-50 dark:bg-gray-700">
             <tr>
-              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
+              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                 Date
               </th>
-              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
+              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                 Category
               </th>
-              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
+              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                 Description
               </th>
-              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
+              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                 Amount
               </th>
-              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
+              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                 Actions
               </th>
             </tr>
           </thead>
-          <tbody className="bg-white divide-y divide-gray-200">
+          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
             {filteredExpenses.map((expense) => (
-              <tr key={expense.id} className="hover:bg-gray-50">
-                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
+              <tr key={expense.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
+                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                   {format(new Date(expense.date), 'MMM dd, yyyy')}
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap">
-                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
+                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                     {expense.category}
                   </span>
                 </td>
-                <td className="px-6 py-4 text-sm text-gray-900">{expense.description}</td>
-                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
+                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{expense.description}</td>
+                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                   {formatCurrency(expense.amount)}
                 </td>
-                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
+                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                   <Button
                     variant="ghost"
                     size="sm"
@@ .. @@
         {filteredExpenses.length === 0 && (
           <div className="text-center py-8">
-            <p className="text-gray-500">No expenses found.</p>
+            <p className="text-gray-500 dark:text-gray-400">No expenses found.</p>
           </div>
         )}
       </div>
     </Card>
   );
 }