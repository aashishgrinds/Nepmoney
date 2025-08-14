@@ .. @@
export function Card({ children, className, padding = 'md' }: CardProps) {
   const paddingClasses = {
     none: '',
@@ .. @@
   return (
     <div
       className={cn(
-        'bg-white rounded-xl shadow-sm border border-gray-100',
+        'bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors',
         paddingClasses[padding],
         className
       )}
@@ .. @@
   );
 }