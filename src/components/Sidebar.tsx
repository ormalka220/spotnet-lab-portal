
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Home, Layers, Plus, User, LogOut, Menu } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "התנתקת בהצלחה",
      description: "להתראות!",
    });
    navigate("/login");
  };

  // Sidebar content component - shared between desktop and mobile
  const SidebarContent = () => (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center justify-between mb-8">
        <div className={`flex items-center transition-opacity duration-300 ${collapsed ? "opacity-0 w-0" : "opacity-100"}`}>
          <span className="text-xl font-semibold">SpotNet Labs</span>
        </div>
        {!isMobile && (
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-full h-8 w-8"
          >
            {collapsed ? "→" : "←"}
          </Button>
        )}
      </div>

      <div className="flex-1 space-y-2">
        <NavItem to="/dashboard" icon={<Home />} label="ראשי" collapsed={collapsed} />
        <NavItem to="/my-labs" icon={<Layers />} label="המעבדות שלי" collapsed={collapsed} />
        <NavItem to="/create-lab" icon={<Plus />} label="צור מעבדה" collapsed={collapsed} />
        <NavItem to="/account" icon={<User />} label="חשבון" collapsed={collapsed} />
      </div>

      <Separator className="my-4" />
      
      <Button 
        variant="ghost" 
        onClick={handleLogout} 
        className={`justify-${collapsed ? "center" : "start"} w-full`}
      >
        <LogOut className="w-5 h-5 ml-2" />
        {!collapsed && <span>התנתק</span>}
      </Button>
    </div>
  );

  // Mobile view - use drawer component
  if (isMobile) {
    return (
      <>
        <div className="fixed top-4 right-4 z-30">
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button size="icon" variant="outline" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-full w-64 right-0 top-0 fixed rounded-none border-l" dir="rtl">
              <DrawerClose className="absolute left-4 top-4" />
              <div className="h-full w-full">
                <SidebarContent />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </>
    );
  }

  // Desktop view
  return (
    <div 
      className={`h-screen border-r fixed top-0 right-0 transition-all duration-300 bg-sidebar z-10 ${
        collapsed ? "w-16" : "w-64"
      }`}
      dir="rtl"
    >
      <SidebarContent />
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

const NavItem = ({ to, icon, label, collapsed }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-3 py-2 rounded-lg transition-colors ${
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
        } ${collapsed ? "justify-center" : "justify-start"}`
      }
    >
      <span className="mr-0.5">{icon}</span>
      {!collapsed && <span className="mr-2">{label}</span>}
    </NavLink>
  );
};

export default Sidebar;
