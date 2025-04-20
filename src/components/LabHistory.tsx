
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Lab } from "@/utils/labTypes";
import { ArrowUpDown, RefreshCw, Trash2 } from "lucide-react";

const LabHistory = () => {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Mock API call to get lab history
    const fetchLabHistory = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        // Mock data with current date for recent labs
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const twoDaysAgo = new Date(now);
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        
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
            startTime: now,
            endTime: new Date(now.getTime() + 2 * 60 * 60 * 1000),
            status: "active",
            serverName: "bgp-lab-1234"
          },
          {
            id: "lab-2",
            type: {
              id: "ospf-lab",
              name: "OSPF Lab",
              description: "Open Shortest Path First routing protocol lab",
              os: "Windows",
              icon: "router"
            },
            duration: { id: "1hr", hours: 1, label: "1 hour" },
            startTime: yesterday,
            endTime: new Date(yesterday.getTime() + 1 * 60 * 60 * 1000),
            status: "completed",
            serverName: "ospf-lab-5678"
          },
          {
            id: "lab-3",
            type: {
              id: "dns-dhcp-lab",
              name: "DNS + DHCP Lab",
              description: "Domain Name System and DHCP server configuration lab",
              os: "Windows",
              icon: "server"
            },
            duration: { id: "3hr", hours: 3, label: "3 hours" },
            startTime: twoDaysAgo,
            endTime: new Date(twoDaysAgo.getTime() + 3 * 60 * 60 * 1000),
            status: "completed",
            serverName: "dns-dhcp-lab-9012"
          }
        ];
        
        setLabs(mockLabs);
        setLoading(false);
      }, 1000);
    };

    fetchLabHistory();
  }, []);

  const handleRecreateLab = (lab: Lab) => {
    toast({
      title: "שיחזור מעבדה",
      description: `מעבדת ${lab.type.name} בהליך שיחזור...`,
    });
    
    // In a real app, this would call an API to recreate the lab
  };

  const handleDeleteLogs = (labId: string) => {
    toast({
      title: "לוגים נמחקו",
      description: "לוגי המעבדה נמחקו בהצלחה",
    });
    
    // In a real app, this would call an API to delete logs
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('he-IL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "פעיל";
      case "completed":
        return "הסתיים";
      case "failed":
        return "נכשל";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" dir="rtl">
      <header>
        <h1 className="text-3xl font-bold">היסטוריית מעבדות</h1>
        <p className="text-muted-foreground mt-1">צפה בכל המעבדות שיצרת</p>
      </header>

      {loading ? (
        <div className="h-96 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50 text-right">
                  <th className="px-6 py-3 font-medium">
                    <div className="flex items-center">
                      סוג מעבדה
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 font-medium">
                    <div className="flex items-center">
                      תאריך התחלה
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 font-medium">שעת התחלה</th>
                  <th className="px-6 py-3 font-medium">משך זמן</th>
                  <th className="px-6 py-3 font-medium">שם שרת</th>
                  <th className="px-6 py-3 font-medium">סטטוס</th>
                  <th className="px-6 py-3 font-medium">פעולות</th>
                </tr>
              </thead>
              <tbody>
                {labs.map((lab) => (
                  <tr key={lab.id} className="border-t hover:bg-slate-50 dark:hover:bg-slate-700/25">
                    <td className="px-6 py-4 font-medium">{lab.type.name}</td>
                    <td className="px-6 py-4">{formatDate(lab.startTime)}</td>
                    <td className="px-6 py-4">{formatTime(lab.startTime)}</td>
                    <td className="px-6 py-4">{lab.duration.label}</td>
                    <td className="px-6 py-4 font-mono text-sm">{lab.serverName}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(lab.status)}`}>
                        {getStatusText(lab.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRecreateLab(lab)}
                          disabled={lab.status === "active"}
                          className="h-8 px-3"
                        >
                          <RefreshCw className="ml-1 h-3.5 w-3.5" />
                          <span className="text-xs">שחזר</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteLogs(lab.id)}
                          className="h-8 px-3"
                        >
                          <Trash2 className="ml-1 h-3.5 w-3.5" />
                          <span className="text-xs">מחק לוגים</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabHistory;
