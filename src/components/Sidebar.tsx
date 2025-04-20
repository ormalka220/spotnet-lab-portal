
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Home, Layers, Plus, Server, User, LogOut } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "התנתקת בהצלחה",
      description: "להתראות!",
    });
    navigate("/login");
  };

  return (
    <div 
      className={`h-screen border-r fixed top-0 right-0 transition-all duration-300 bg-sidebar z-10 ${
        collapsed ? "w-16" : "w-64"
      }`}
      dir="rtl"
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center justify-between mb-8">
          <div className={`flex items-center transition-opacity duration-300 ${collapsed ? "opacity-0 w-0" : "opacity-100"}`}>
            <span className="text-xl font-semibold">SpotNet Labs</span>
          </div>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-full h-8 w-8"
          >
            {collapsed ? "→" : "←"}
          </Button>
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
