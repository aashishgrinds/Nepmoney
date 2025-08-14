@@ .. @@
  return (
-    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
+    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors">
       <Card className="w-full max-w-md">
         <div className="text-center mb-8">
@@ .. @@
           <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4">
             <TrendingUp className="h-8 w-8 text-white" />
           </div>
-          <h1 className="text-3xl font-bold text-gray-900">Nepmoney</h1>
-          <p className="text-gray-600 mt-2">Your personal finance tracker</p>
+          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Nepmoney</h1>
+          <p className="text-gray-600 dark:text-gray-300 mt-2">Your personal finance tracker</p>
         </div>

@@ .. @@
-          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
+          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
             <div className="flex items-center">
-              <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
+              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
               <div className="text-sm">
-                <p className="font-medium text-blue-900">Demo Credentials</p>
-                <p className="text-blue-700">Username: demo | Password: demo123</p>
+                <p className="font-medium text-blue-900 dark:text-blue-100">Demo Credentials</p>
+                <p className="text-blue-700 dark:text-blue-300">Username: demo | Password: demo123</p>
               </div>
             </div>
           </div>
@@ .. @@
 }