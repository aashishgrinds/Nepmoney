@@ .. @@
   return (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
       {cards.map((card, index) => {
         const Icon = card.icon;
         return (
-          <Card key={index} className="hover:shadow-md transition-shadow">
+          <Card key={index} className="hover:shadow-md dark:hover:shadow-gray-900/20 transition-shadow">
             <div className="flex items-center justify-between">
               <div>
-                <p className="text-sm font-medium text-gray-600">{card.title}</p>
-                <p className="text-2xl font-semibold text-gray-900 mt-1">{card.value}</p>
+                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{card.title}</p>
+                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">{card.value}</p>
                 {card.subtitle && (
                   <p className={`text-sm font-medium mt-1 ${card.color}`}>{card.subtitle}</p>
                 )}
               </div>
-              <div className={`${card.bgColor} ${card.color} p-3 rounded-full`}>
+              <div className={`${card.bgColor} dark:bg-opacity-20 ${card.color} p-3 rounded-full`}>
                 <Icon className="h-6 w-6" />
               </div>
             </div>
           </Card>
         );
       })}
     </div>
   );
 }