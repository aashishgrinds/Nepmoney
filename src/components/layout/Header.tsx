@@ .. @@
import React from 'react';
import { LogOut, TrendingUp, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
+import { ThemeToggle } from '../ui/ThemeToggle';

export function Header() {
  const { user, logout } = useAuth();

  return (
-    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
+    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between items-center py-4">
           <div className="flex items-center space-x-3">
             <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
               <TrendingUp className="h-6 w-6 text-white" />
             </div>
-            <h1 className="text-2xl font-bold text-gray-900">Nepmoney</h1>
+            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nepmoney</h1>
           </div>

           <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-2">
-              <User className="h-5 w-5 text-gray-600" />
-              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
+              <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
+              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user?.name}</span>
             </div>
+            <ThemeToggle />
             <Button variant="ghost" size="sm" onClick={logout}>
               <LogOut className="h-4 w-4 mr-2" />
               Logout
             </Button>
           </div>
         </div>
       </div>
     </header>
   );
 }