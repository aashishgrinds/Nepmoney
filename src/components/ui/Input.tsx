@@ .. @@
      {label && (
        <label className="block text-sm font-medium text-gray-700">
+        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        className={cn(
-          'block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm transition-colors',
-          'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
-          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
+          'block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm transition-colors',
+          'focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400',
+          error && 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400',
           className
         )}
         {...props}
@@ .. @@
       {error && (
-        <p className="text-sm text-red-600">{error}</p>
+        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
       )}
     </div>
   );