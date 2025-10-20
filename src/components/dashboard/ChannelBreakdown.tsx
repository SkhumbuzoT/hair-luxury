import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { BarChart2 } from "lucide-react";

export default function ChannelBreakdown({ orders }) {
  const channelData = {};
  
  orders.forEach(order => {
    if (!channelData[order.channel]) {
      channelData[order.channel] = 0;
    }
    channelData[order.channel] += order.total_amount;
  });

  const chartData = Object.entries(channelData).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#8B1538', '#C9748E', '#D4AF37', '#2D1B1F', '#FAA0A0'];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-xl font-bold text-[#2D1B1F] flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-[#8B1538]" />
          Sales by Channel
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {chartData.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px'
                  }}
                  formatter={(value) => `R${value.toFixed(2)}`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {chartData.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium text-gray-700">{entry.name}</span>
                  </div>
                  <span className="text-sm font-bold text-[#2D1B1F]">
                    R{entry.value.toLocaleString('en-ZA')}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <BarChart2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No channel data yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
