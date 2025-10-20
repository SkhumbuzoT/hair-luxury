import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function OrderFulfillment({ orders }) {
  const statusCounts = {
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    fulfilled: orders.filter(o => o.status === 'fulfilled').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  };

  const recentOrders = orders
    .filter(o => o.status !== 'cancelled')
    .sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
    .slice(0, 5);

  const avgFulfillmentTime = () => {
    const fulfilledOrders = orders.filter(o => o.fulfilled_date && o.order_date);
    if (fulfilledOrders.length === 0) return 0;
    
    const totalHours = fulfilledOrders.reduce((sum, order) => {
      const diff = new Date(order.fulfilled_date) - new Date(order.order_date);
      return sum + (diff / (1000 * 60 * 60));
    }, 0);
    
    return (totalHours / fulfilledOrders.length).toFixed(1);
  };

  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    processing: { color: 'bg-blue-100 text-blue-800', icon: Package },
    fulfilled: { color: 'bg-purple-100 text-purple-800', icon: CheckCircle },
    shipped: { color: 'bg-indigo-100 text-indigo-800', icon: Truck },
    delivered: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-xl font-bold text-[#2D1B1F] flex items-center gap-2">
          <Truck className="w-5 h-5 text-[#8B1538]" />
          Order Fulfillment
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#8B1538]/10 to-[#C9748E]/10">
            <p className="text-sm text-gray-600 font-medium">Avg. Fulfillment Time</p>
            <p className="text-3xl font-bold text-[#8B1538] mt-1">{avgFulfillmentTime()}h</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#D4AF37]/10 to-[#C9748E]/10">
            <p className="text-sm text-gray-600 font-medium">Pending Orders</p>
            <p className="text-3xl font-bold text-[#2D1B1F] mt-1">{statusCounts.pending + statusCounts.processing}</p>
          </div>
        </div>

        <div className="space-y-3">
          {recentOrders.map((order) => {
            const StatusIcon = statusConfig[order.status]?.icon || Package;
            return (
              <div key={order.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#FAF8F5] hover:bg-gray-50 transition-colors">
                <StatusIcon className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-[#2D1B1F]">{order.order_number}</p>
                  <p className="text-xs text-gray-500">{order.customer_name}</p>
                </div>
                <Badge className={statusConfig[order.status]?.color || 'bg-gray-100'}>
                  {order.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
