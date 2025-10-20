import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, AlertTriangle } from "lucide-react";

export default function Products() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
    initialData: [],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F5] via-white to-[#FFF5F7] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2D1B1F] mb-2">Products</h1>
          <p className="text-gray-500">Manage your inventory and product catalog</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B1538]" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#8B1538]/10 to-[#C9748E]/10 flex items-center justify-center">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Package className="w-8 h-8 text-[#8B1538]" />
                    )}
                  </div>
                  {product.stock_quantity <= (product.reorder_point || 5) && (
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                  )}
                </div>
                
                <h3 className="font-bold text-[#2D1B1F] text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-3">SKU: {product.sku}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold text-[#8B1538]">R{product.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Stock:</span>
                    <span className={`font-semibold ${
                      product.stock_quantity === 0 ? 'text-red-600' : 
                      product.stock_quantity <= (product.reorder_point || 5) ? 'text-orange-600' : 
                      'text-green-600'
                    }`}>
                      {product.stock_quantity} units
                    </span>
                  </div>
                </div>
                
                <Badge className="bg-[#C9748E]/20 text-[#2D1B1F]">
                  {product.category}
                </Badge>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
