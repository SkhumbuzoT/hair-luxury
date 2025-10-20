import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricCard from "./MetricCard";
import { DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react";

export default function SalesOverview({ orders, dateFilter }) {
  const today = new Date().toISOString().split('T')[0];
  
  const filterOrders = (orders) => {
    const now = new Date();
    return orders.filter(order => {
      const orderDate = new Date(order.order_date);
      if (dateFilter === 'today') {
        return orderDate.toISOString().split('T')[0] === today;
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return orderDate >= weekAgo;
      } else if (dateFilter === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return orderDate >= monthAgo;
      }
      return true;
    });
  };

  const filteredOrders = filterOrders(orders);
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  const totalCost = filteredOrders.reduce((sum, order) => sum + (order.total_cost || 0), 0);
  const totalProfit = totalRevenue - totalCost;
  const orderCount = filteredOrders.length;
  const avgOrderValue = orderCount > 0 ? totalRevenue / orderCount : 0;
  const uniqueCustomers = new Set(filteredOrders.map(o => o.customer_email)).size;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total Revenue"
        value={`R${totalRevenue.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        subtitle={`Profit: R${totalProfit.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`}
        icon={DollarSign}
        delay={0}
      />
      <MetricCard
        title="Orders"
        value={orderCount}
        subtitle={`Avg: R${avgOrderValue.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`}
        icon={ShoppingBag}
        delay={0.1}
      />
      <MetricCard
        title="Profit"
        value={`R${totalProfit.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`}
        subtitle={`Margin: ${totalRevenue > 0 ? ((totalProfit/totalRevenue)*100).toFixed(1) : 0}%`}
        icon={TrendingUp}
        delay={0.2}
      />
      <MetricCard
        title="Customers"
        value={uniqueCustomers}
        subtitle={`${orderCount} purchases`}
        icon={Users}
        delay={0.3}
      />
    </div>
  );
}
