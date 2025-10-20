import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  Users,
  Megaphone
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: createPageUrl("Products"),
    icon: Package,
  },
  {
    title: "Orders",
    url: createPageUrl("Orders"),
    icon: ShoppingCart,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --primary-burgundy: #8B1538;
          --primary-gold: #D4AF37;
          --accent-rose: #C9748E;
          --neutral-cream: #FAF8F5;
          --neutral-dark: #2D1B1F;
        }
      `}</style>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-[#FAF8F5] via-white to-[#FFF5F7]">
        <Sidebar className="border-r border-gray-200/50 backdrop-blur-sm">
          <SidebarHeader className="border-b border-gray-200/50 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#8B1538] to-[#C9748E] rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-[#2D1B1F] text-lg tracking-tight">Luxe Hair</h2>
                <p className="text-xs text-gray-500 font-medium">Operations Hub</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-[#8B1538]/5 hover:text-[#8B1538] transition-all duration-300 rounded-xl mb-1 ${
                          location.pathname === item.url 
                            ? 'bg-gradient-to-r from-[#8B1538]/10 to-[#C9748E]/10 text-[#8B1538] font-semibold border-l-3 border-[#8B1538]' 
                            : 'text-gray-600'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-4 h-4" />
                          <span className="font-medium tracking-tight">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200/50 p-4">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#C9748E] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#2D1B1F] text-sm truncate">Owner</p>
                <p className="text-xs text-gray-500 truncate">Business Manager</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-6 py-4 md:hidden sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-[#2D1B1F]">Luxe Hair</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
