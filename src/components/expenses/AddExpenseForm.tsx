@@ .. @@
   return (
     <Card>
-      <h3 className="text-lg font-semibold text-gray-900 mb-6">Add New Expense</h3>
+      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Add New Expense</h3>
       <form onSubmit={handleSubmit} className="space-y-4">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <Input
@@ .. @@
           />
           <div className="space-y-2">
-            <label className="block text-sm font-medium text-gray-700">Category</label>
+            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
             <select
               value={formData.category}
               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
-              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
+              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
               required
             >
               <option value="">Select category</option>