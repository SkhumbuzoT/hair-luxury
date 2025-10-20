import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp } from "lucide-react";

export default function RevenueChart({ orders, dateFilter }) {
  const generateChartData = () => {
    const now = new Date();
    const data = [];

    if (dateFilter === 'today') {
      // Hourly data for today
      for (let i = 0; i < 24; i++) {
        const hour = i;
        const hourOrders = orders.filter(o => {
          const orderDate = new Date(o.order_date);
          return orderDate.toDateString() === now.toDateString() && orderDate.getHours() === hour;
        });
        data.push({
          name: `${i}:00`,
          revenue: hourOrders.reduce((sum, o) => sum + o.total_amount, 0),
          profit: hourOrders.reduce((sum, o) => sum + (o.total_amount - (o.total_cost || 0)), 0)
        });
      }
    } else if (dateFilter === 'week') {
      // Daily data for past 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dayOrders = orders.filter(o => {
          const orderDate = new Date(o.order_date);
          return orderDate.toDateString() === date.toDateString();
        });
        data.push({
          name: date.toLocaleDateString('en-ZA', { weekday: 'short' }),
          revenue: dayOrders.reduce((sum, o) => sum + o.total_amount, 0),
          profit: dayOrders.reduce((sum, o) => sum + (o.total_amount - (o.total_cost || 0)), 0)
        });
      }
    } else if (dateFilter === 'month') {
      // Weekly data for past 4 weeks
      for (let i = 3; i >= 0; i--) {
        const weekStart = new Date(now.getTime() - (i * 7 + 6) * 24 * 60 * 60 * 1000);
        const weekEnd = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
        const weekOrders = orders.filter(o => {
          const orderDate = new Date(o.order_date);
          return orderDate >= weekStart && orderDate <= weekEnd;
        });
        data.push({
          name: `Week ${4 - i}`,
          revenue: weekOrders.reduce((sum, o) => sum + o.total_amount, 0),
          profit: weekOrders.reduce((sum, o) => sum + (o.total_amount - (o.total_cost || 0)), 0)
        });
      }
    }

    return data;
  };

  const chartData = generateChartData();

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-xl font-bold text-[#2D1B1F] flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#8B1538]" />
          Revenue & Profit Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `R${value}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
              formatter={(value) => [`R${value.toFixed(2)}`, '']}
            />
            <Bar dataKey="revenue" fill="url(#revenueGradient)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="profit" fill="url(#profitGradient)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B1538" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#C9748E" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity={0.4} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
