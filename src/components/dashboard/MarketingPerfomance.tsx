import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function MarketingPerformance({ campaigns }) {
  const activeCampaigns = campaigns.filter(c => c.status === 'active');
  
  const campaignMetrics = activeCampaigns.map(campaign => ({
    ...campaign,
    roi: campaign.spend > 0 ? ((campaign.revenue - campaign.spend) / campaign.spend * 100) : 0,
    ctr: campaign.impressions > 0 ? (campaign.clicks / campaign.impressions * 100) : 0,
    conversionRate: campaign.clicks > 0 ? ((campaign.conversions || 0) / campaign.clicks * 100) : 0
  })).sort((a, b) => b.roi - a.roi);

  const totalSpend = activeCampaigns.reduce((sum, c) => sum + (c.spend || 0), 0);
  const totalRevenue = activeCampaigns.reduce((sum, c) => sum + (c.revenue || 0), 0);
  const overallROI = totalSpend > 0 ? ((totalRevenue - totalSpend) / totalSpend * 100) : 0;

  const platformColors = {
    'Facebook': 'bg-blue-500',
    'Instagram': 'bg-pink-500',
    'Google Ads': 'bg-red-500',
    'TikTok': 'bg-gray-800',
    'WhatsApp Business': 'bg-green-500',
    'Email': 'bg-purple-500'
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-xl font-bold text-[#2D1B1F] flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-[#8B1538]" />
          Marketing Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#8B1538]/10 to-[#C9748E]/10">
            <p className="text-sm text-gray-600 font-medium">Total Ad Spend</p>
            <p className="text-2xl font-bold text-[#8B1538] mt-1">R{totalSpend.toLocaleString('en-ZA')}</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#D4AF37]/10 to-[#C9748E]/10">
            <p className="text-sm text-gray-600 font-medium">Overall ROI</p>
            <p className="text-2xl font-bold text-[#2D1B1F] mt-1">{overallROI.toFixed(1)}%</p>
          </div>
        </div>

        <div className="space-y-3">
          {campaignMetrics.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-gradient-to-r from-[#FAF8F5] to-white border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${platformColors[campaign.platform] || 'bg-gray-400'}`} />
                  <div>
                    <h4 className="font-semibold text-[#2D1B1F]">{campaign.name}</h4>
                    <p className="text-xs text-gray-500">{campaign.platform}</p>
                  </div>
                </div>
                <Badge className={campaign.roi > 100 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  ROI: {campaign.roi.toFixed(0)}%
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Revenue</p>
                  <p className="font-semibold text-[#2D1B1F]">R{campaign.revenue.toLocaleString('en-ZA')}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">CTR</p>
                  <p className="font-semibold text-[#2D1B1F]">{campaign.ctr.toFixed(2)}%</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Conversions</p>
                  <p className="font-semibold text-[#2D1B1F]">{campaign.conversions || 0}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {campaignMetrics.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Megaphone className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No active campaigns</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
