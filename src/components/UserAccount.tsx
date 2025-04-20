
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Download, Save } from "lucide-react";

const UserAccount = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user") || '{"name": "אור", "email": "or@example.com"}'));
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "הגדרות נשמרו",
      description: "הגדרות המשתמש נשמרו בהצלחה",
    });
  };

  const handleDownloadCertificate = () => {
    toast({
      title: "תעודה הורדה",
      description: "תעודת ההשתתפות הורדה בהצלחה",
    });
  };

  // Mock statistics
  const statistics = [
    { label: "מעבדות שנוצרו", value: 12 },
    { label: "שעות שימוש", value: 24 },
    { label: "מעבדות פעילות", value: 1 },
  ];

  return (
    <div className="space-y-8 animate-fade-in" dir="rtl">
      <header>
        <h1 className="text-3xl font-bold">פרטי חשבון</h1>
        <p className="text-muted-foreground mt-1">צפה ועדכן את פרטי החשבון שלך</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <Card className="md:col-span-2 apple-card">
          <CardHeader>
            <CardTitle>פרופיל משתמש</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">שם מלא</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">דוא"ל</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full px-3 py-2 border rounded-lg"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">מחלקה</label>
                <select className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800">
                  <option>הנדסת תוכנה</option>
                  <option>אבטחת מידע</option>
                  <option>תקשורת נתונים</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">תפקיד</label>
                <select className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800">
                  <option>סטודנט</option>
                  <option>מרצה</option>
                  <option>אדמין</option>
                </select>
              </div>
            </div>
            
            <div className="pt-4">
              <Button onClick={handleSaveSettings}>
                <Save className="ml-2 h-4 w-4" />
                שמור שינויים
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Card */}
        <Card className="apple-card">
          <CardHeader>
            <CardTitle>סטטיסטיקות</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statistics.map((stat, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0">
                  <span className="text-muted-foreground">{stat.label}</span>
                  <span className="text-2xl font-semibold">{stat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certificates Card */}
      <Card className="apple-card">
        <CardHeader>
          <CardTitle>תעודות השתתפות</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">הורד תעודות השתתפות עבור הקורסים שהשלמת</p>
            
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-700/50 text-right">
                  <tr>
                    <th className="px-6 py-3 font-medium">שם הקורס</th>
                    <th className="px-6 py-3 font-medium">תאריך השלמה</th>
                    <th className="px-6 py-3 font-medium">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t hover:bg-slate-50 dark:hover:bg-slate-700/25">
                    <td className="px-6 py-4 font-medium">מבוא לרשתות BGP</td>
                    <td className="px-6 py-4">15/04/2025</td>
                    <td className="px-6 py-4">
                      <Button variant="outline" size="sm" onClick={handleDownloadCertificate}>
                        <Download className="ml-2 h-4 w-4" />
                        הורד תעודה
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAccount;
