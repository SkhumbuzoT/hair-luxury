import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function MetricCard({ title, value, subtitle, icon: Icon, trend, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-gray-200/50 hover:shadow-xl transition-all duration-300 group">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
              {title}
            </p>
            <p className="text-3xl font-bold text-[#2D1B1F] mb-1 tracking-tight">
              {value}
            </p>
            {subtitle && (
              <p className="text-sm text-gray-500 font-medium">{subtitle}</p>
            )}
            {trend && (
              <div className={`text-xs font-semibold mt-2 ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.positive ? '↑' : '↓'} {trend.value}
              </div>
            )}
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B1538] to-[#C9748E] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
