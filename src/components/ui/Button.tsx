@@ .. @@
  const variantClasses = {
-    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
-    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50',
-    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:bg-gray-50',
-    ghost: 'text-gray-700 hover:bg-gray-100 disabled:bg-transparent',
+    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700',
+    secondary: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:bg-gray-50 dark:disabled:bg-gray-800',
+    outline: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:bg-gray-50 dark:disabled:bg-gray-800',
+    ghost: 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:bg-transparent',
   };