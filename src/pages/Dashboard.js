import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";

import SalesOverview from "../components/dashboard/SalesOverview";
import TopProducts from "../components/dashboard/TopProducts";
import StockAlerts from "../components/dashboard/StockAlerts";
import OrderFulfillment from "../components/dashboard/OrderFulfillment";
import RevenueChart from "../components/dashboard/RevenueChart";
import MarketingPerformance from "../components/dashboard/MarketingPerformance";
import TopCustomers from "../components/dashboard/TopCustomers";
import ChannelBreakdown from "../components/dashboard/ChannelBreakdown";

export default function Dashboard() {
  const [dateFilter, setDateFilter] = useState('today');

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => base44.entities.Order.list('-order_date'),
    initialData: [],
  });

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
    initialData: [],
  });

  const { data: orderItems, isLoading: itemsLoading } = useQuery({
    queryKey: ['orderItems'],
    queryFn: () => base44.entities.OrderItem.list(),
    initialData: [],
  });

  const { data: campaigns, isLoading: campaignsLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => base44.entities.Campaign.list(),
    initialData: [],
  });

  const isLoading = ordersLoading || productsLoading || itemsLoading || campaignsLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F5] via-white to-[#FFF5F7] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#2D1B1F] mb-2 tracking-tight">
              Operations Dashboard
            </h1>
            <p className="text-gray-500 font-medium">
              Real-time insights into your business performance
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Tabs value={dateFilter} onValueChange={setDateFilter}>
              <TabsList className="bg-white shadow-sm">
                <TabsTrigger value="today" className="data-[state=active]:bg-[#8B1538] data-[state=active]:text-white">
                  Today
                </TabsTrigger>
                <TabsTrigger value="week" className="data-[state=active]:bg-[#8B1538] data-[state=active]:text-white">
                  Week
                </TabsTrigger>
                <TabsTrigger value="month" className="data-[state=active]:bg-[#8B1538] data-[state=active]:text-white">
                  Month
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B1538]" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Sales Overview */}
            <SalesOverview orders={orders} dateFilter={dateFilter} />

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <RevenueChart orders={orders} dateFilter={dateFilter} />
                <TopProducts orders={orders} orderItems={orderItems} products={products} />
              </div>
              <div className="space-y-6">
                <StockAlerts products={products} />
                <OrderFulfillment orders={orders} />
              </div>
            </div>

            {/* Marketing & Customers */}
            <div className="grid lg:grid-cols-2 gap-6">
              <MarketingPerformance campaigns={campaigns} />
              <TopCustomers orders={orders} />
            </div>

            {/* Channel Breakdown */}
            <ChannelBreakdown orders={orders} />
          </div>
        )}
      </div>
    </div>
  );
}
