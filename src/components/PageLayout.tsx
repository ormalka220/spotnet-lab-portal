
import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex bg-secondary/30">
      <Sidebar />
      <div className="flex-1 p-6 md:mr-64 mt-0 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
