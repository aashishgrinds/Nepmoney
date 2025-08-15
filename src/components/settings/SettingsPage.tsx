@@ .. @@
   return (
     <div className="space-y-8">
       <div>
-        <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
+        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Settings</h2>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card>
           <div className="flex items-center mb-4">
-            <User className="h-5 w-5 text-gray-600 mr-2" />
-            <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
+            <User className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
+            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Profile Information</h3>
           </div>
           
           <div className="space-y-3">
             <div>
-              <label className="text-sm font-medium text-gray-600">Name:</label>
-              <p className="text-gray-900">{user?.name}</p>
+              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Name:</label>
+              <p className="text-gray-900 dark:text-gray-100">{user?.name}</p>
             </div>
             <div>
-              <label className="text-sm font-medium text-gray-600">Username:</label>
-              <p className="text-gray-900">{user?.username}</p>
+              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Username:</label>
+              <p className="text-gray-900 dark:text-gray-100">{user?.username}</p>
             </div>
             <div>
-              <label className="text-sm font-medium text-gray-600">Email:</label>
-              <p className="text-gray-900">{user?.email}</p>
+              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email:</label>
+              <p className="text-gray-900 dark:text-gray-100">{user?.email}</p>
             </div>
           </div>
         </Card>

         <Card>
           <div className="flex items-center mb-4">
-            <Database className="h-5 w-5 text-gray-600 mr-2" />
-            <h3 className="text-lg font-semibold text-gray-900">Data Management</h3>
+            <Database className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
+            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Data Management</h3>
           </div>
           
           <div className="space-y-4">
             <div>
-              <p className="text-sm text-gray-600 mb-2">
+              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                 Total Expenses: <span className="font-medium">{expenses.length}</span>
               </p>
-              <p className="text-sm text-gray-600 mb-4">
+              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                 Total Investments: <span className="font-medium">{investments.length}</span>
               </p>
             </div>
@@ .. @@
         </Card>

         <Card className="md:col-span-2">
-          <h3 className="text-lg font-semibold text-gray-900 mb-4">About Nepmoney</h3>
-          <div className="prose text-sm text-gray-600 space-y-2">
+          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">About Nepmoney</h3>
+          <div className="prose text-sm text-gray-600 dark:text-gray-400 space-y-2">
             <p>
               Nepmoney is a comprehensive personal finance tracker designed to help you manage 
               your expenses and investments effectively. Built with modern web technologies, 
               it provides an intuitive interface for tracking your financial health.
             </p>
             <p>
-              <strong>Features:</strong>
+              <strong className="text-gray-900 dark:text-gray-100">Features:</strong>
             </p>
             <ul className="list-disc list-inside space-y-1 ml-4">
               <li>Expense tracking with categories and search</li>
@@ .. @@
               <li>Data export functionality</li>
               <li>Responsive design for all devices</li>
             </ul>
-            <p className="text-xs text-gray-500 mt-4">
+            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
               Version 1.0.0 | Built with React, TypeScript & Tailwind CSS
             </p>
           </div>
         </Card>
       </div>
     </div>
   );
 }
   )