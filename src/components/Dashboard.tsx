
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Lab } from "@/utils/labTypes";
import LabCard from "./LabCard";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeLabs, setActiveLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || '{"name": "משתמש"}');

  useEffect(() => {
    // Mock API call to get active labs
    const fetchActiveLabs = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        // Mock data
        const mockLabs: Lab[] = [
          {
            id: "lab-1",
            type: {
              id: "bgp-lab",
              name: "BGP Lab",
              description: "Border Gateway Protocol networking lab environment",
              os: "Windows",
              icon: "network"
            },
            duration: { id: "2hr", hours: 2, label: "2 hours" },
            startTime: new Date(),
            endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
            status: "active",
            serverName: "bgp-lab-1234"
          }
        ];
        
        setActiveLabs(mockLabs);
        setLoading(false);
      }, 1000);
    };

    fetchActiveLabs();
  }, []);

  const handleStopLab = (labId: string) => {
    // In a real app, this would call an API to stop the lab
    setActiveLabs(activeLabs.map(lab => 
      lab.id === labId ? { ...lab, status: "completed" as const } : lab
    ));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">👋 שלום, {user.name}</h1>
          <p className="text-muted-foreground mt-1">ברוך הבא למעבדות הווירטואליות</p>
        </div>
        <Link to="/create-lab">
          <Button size="lg" className="rounded-full">
            <Plus className="mr-2 h-5 w-5" />
            התחל מעבדה חדשה
          </Button>
        </Link>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-4">מעבדות פעילות</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-64 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        ) : activeLabs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeLabs.map((lab) => (
              <LabCard key={lab.id} lab={lab} onStop={handleStopLab} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-xl border-dashed">
            <h3 className="text-lg font-medium">אין לך מעבדות פעילות כרגע</h3>
            <p className="text-muted-foreground mb-4">צור מעבדה חדשה כדי להתחיל</p>
            <Link to="/create-lab">
              <Button>התחל מעבדה</Button>
            </Link>
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">מעבדות אחרונות</h2>
          <Link to="/my-labs" className="text-spotnet-blue hover:underline text-sm">
            צפה בכל המעבדות
          </Link>
        </div>
        
        {loading ? (
          <div className="h-24 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        ) : (
          <div className="border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="py-3 px-4 text-right font-medium">סוג מעבדה</th>
                  <th className="py-3 px-4 text-right font-medium">תאריך</th>
                  <th className="py-3 px-4 text-right font-medium">משך זמן</th>
                  <th className="py-3 px-4 text-right font-medium">סטטוס</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-3 px-4">OSPF Lab</td>
                  <td className="py-3 px-4">19/04/2025</td>
                  <td className="py-3 px-4">2 שעות</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
                      הסתיים
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
