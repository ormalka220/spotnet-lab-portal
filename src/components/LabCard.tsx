
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Lab, getRemainingTime } from "@/utils/labTypes";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, StopCircle } from "lucide-react";

interface LabCardProps {
  lab: Lab;
  onStop?: (labId: string) => void;
  className?: string;
}

const LabCard = ({ lab, onStop, className }: LabCardProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleOpenVNC = () => {
    // In a real application, this would open a VNC connection
    window.open("https://example.com/vnc-session", "_blank");
    toast({
      title: "מתחבר ל-VNC",
      description: "חיבור מאובטח נפתח בחלון חדש",
    });
  };

  const handleStopLab = () => {
    if (onStop) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        onStop(lab.id);
        setLoading(false);
        toast({
          title: "המעבדה הופסקה",
          description: "המעבדה נסגרה בהצלחה",
        });
      }, 1000);
    }
  };

  const isActive = lab.status === "active";
  const remainingTime = getRemainingTime(lab.endTime);

  return (
    <Card className={cn("apple-card transition-all duration-300", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">{lab.type.name}</CardTitle>
          <div className={cn(
            "px-2 py-1 text-xs font-medium rounded-full",
            isActive 
              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" 
              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
          )}>
            {isActive ? "פעיל" : "הסתיים"}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">סוג מערכת הפעלה:</span>
          <span className="font-medium">{lab.type.os}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">שם שרת:</span>
          <span className="font-medium">{lab.serverName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">זמן שנותר:</span>
          <span className={cn(
            "font-medium",
            isActive ? "text-green-600 dark:text-green-400" : "text-gray-500"
          )}>
            {remainingTime}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-2">
        <Button 
          onClick={handleOpenVNC} 
          className="flex-1"
          disabled={!isActive}
        >
          <ExternalLink className="w-4 h-4 ml-2" />
          כניסה ל-VNC
        </Button>
        <Button 
          variant="outline" 
          onClick={handleStopLab} 
          className="flex-1"
          disabled={!isActive || loading}
        >
          <StopCircle className="w-4 h-4 ml-2" />
          {loading ? "מפסיק..." : "הפסק מעבדה"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LabCard;
