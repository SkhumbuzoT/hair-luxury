import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { format } from "date-fns";

export default function Orders() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => base44.entities.Order.list('-order_date'),
    initialData: [],
  });

  const statusConfig = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    fulfilled: 'bg-purple-100 text-purple-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F5] via-white to-[#FFF5F7] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2D1B1F] mb-2">Orders</h1>
          <p className="text-gray-500">Track and manage customer orders</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B1538]" />
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#8B1538]/10 to-[#C9748E]/10 flex items-center justify-center flex-shrink-0">
                      <ShoppingCart className="w-6 h-6 text-[#8B1538]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2D1B1F] mb-1">{order.order_number}</h3>
                      <p className="text-sm text-gray-600">{order.customer_name}</p>
                      <p className="text-xs text-gray-500">{order.customer_email}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(new Date(order.order_date), "MMM d, yyyy 'at' HH:mm")}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-2xl font-bold text-[#8B1538]">
                      R{order.total_amount.toLocaleString('en-ZA')}
                    </p>
                    <Badge className={statusConfig[order.status]}>
                      {order.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {order.channel}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
