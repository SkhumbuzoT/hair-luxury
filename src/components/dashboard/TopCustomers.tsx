import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function TopCustomers({ orders }) {
  const customerData = {};
  
  orders.forEach(order => {
    if (!customerData[order.customer_email]) {
      customerData[order.customer_email] = {
        name: order.customer_name,
        email: order.customer_email,
        totalSpent: 0,
        orderCount: 0,
        lastOrder: order.order_date
      };
    }
    customerData[order.customer_email].totalSpent += order.total_amount;
    customerData[order.customer_email].orderCount += 1;
    if (new Date(order.order_date) > new Date(customerData[order.customer_email].lastOrder)) {
      customerData[order.customer_email].lastOrder = order.order_date;
    }
  });

  const topCustomers = Object.values(customerData)
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-xl font-bold text-[#2D1B1F] flex items-center gap-2">
          <Users className="w-5 h-5 text-[#8B1538]" />
          Top Customers
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {topCustomers.map((customer, index) => (
            <motion.div
              key={customer.email}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-gradient-to-r from-[#FAF8F5] to-white border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B1538] to-[#C9748E] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {customer.name?.charAt(0)?.toUpperCase() || 'C'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#2D1B1F] truncate">{customer.name}</h4>
                  <p className="text-xs text-gray-500 truncate">{customer.email}</p>
                </div>
                {index === 0 && <Star className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Total Spent</p>
                  <p className="text-lg font-bold text-[#8B1538]">
                    R{customer.totalSpent.toLocaleString('en-ZA')}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-[#C9748E]/20 text-[#2D1B1F]">
                  {customer.orderCount} orders
                </Badge>
              </div>
            </motion.div>
          ))}
          {topCustomers.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No customer data yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
