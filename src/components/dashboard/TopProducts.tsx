import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Package } from "lucide-react";
import { motion } from "framer-motion";

export default function TopProducts({ orders, orderItems, products }) {
  const productSales = {};
  
  orderItems.forEach(item => {
    if (!productSales[item.product_id]) {
      productSales[item.product_id] = {
        quantity: 0,
        revenue: 0,
        product: products.find(p => p.id === item.product_id)
      };
    }
    productSales[item.product_id].quantity += item.quantity;
    productSales[item.product_id].revenue += item.quantity * item.price;
  });

  const topProducts = Object.values(productSales)
    .filter(p => p.product)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-xl font-bold text-[#2D1B1F] flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#8B1538]" />
          Top Selling Products
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {topProducts.map((item, index) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#FAF8F5] to-white hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#8B1538]/10 to-[#C9748E]/10 flex items-center justify-center flex-shrink-0">
                {item.product.image_url ? (
                  <img 
                    src={item.product.image_url} 
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Package className="w-8 h-8 text-[#8B1538]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#2D1B1F] truncate">
                  {item.product.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {item.quantity} units sold
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#8B1538] text-lg">
                  R{item.revenue.toLocaleString('en-ZA')}
                </p>
                <Badge variant="secondary" className="mt-1 bg-[#D4AF37]/20 text-[#2D1B1F] border-none">
                  #{index + 1}
                </Badge>
              </div>
            </motion.div>
          ))}
          {topProducts.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No product sales yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
