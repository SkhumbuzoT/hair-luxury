import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function StockAlerts({ products }) {
  const lowStockProducts = products
    .filter(p => p.stock_quantity <= (p.reorder_point || 5))
    .sort((a, b) => a.stock_quantity - b.stock_quantity);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-xl font-bold text-[#2D1B1F] flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          Stock Alerts
          {lowStockProducts.length > 0 && (
            <Badge variant="destructive" className="ml-auto bg-orange-500">
              {lowStockProducts.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {lowStockProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-xl border-l-4 ${
                product.stock_quantity === 0 
                  ? 'bg-red-50 border-red-500' 
                  : 'bg-orange-50 border-orange-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-[#2D1B1F]">{product.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    SKU: {product.sku}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${
                    product.stock_quantity === 0 ? 'text-red-600' : 'text-orange-600'
                  }`}>
                    {product.stock_quantity}
                  </p>
                  <p className="text-xs text-gray-500">units left</p>
                </div>
              </div>
            </motion.div>
          ))}
          {lowStockProducts.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>All products are well stocked</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
