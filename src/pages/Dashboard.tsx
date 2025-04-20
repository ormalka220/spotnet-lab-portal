
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex bg-secondary/30">
      <Sidebar />
      <div className="flex-1 p-6 ml-0 md:ml-64 mt-0 transition-all duration-300">
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
