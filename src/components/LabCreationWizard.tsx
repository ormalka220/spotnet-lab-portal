
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LAB_TYPES, LAB_DURATIONS, getEstimatedEndTime, formatDateTime, generateServerName, LabType, LabDuration } from "@/utils/labTypes";
import { CheckCircle2, Server, Terminal, Code, Network, Router, Shield } from "lucide-react";

const LabCreationWizard = () => {
  const [step, setStep] = useState(1);
  const [selectedLabType, setSelectedLabType] = useState<LabType | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<LabDuration | null>(null);
  const [loading, setLoading] = useState(false);
  const [serverName, setServerName] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLabTypeSelect = (labType: LabType) => {
    setSelectedLabType(labType);
    setServerName(generateServerName(labType));
  };

  const handleDurationSelect = (duration: LabDuration) => {
    setSelectedDuration(duration);
  };

  const nextStep = () => {
    if (step === 1 && !selectedLabType) {
      toast({
        title: "שגיאה",
        description: "אנא בחר סוג מעבדה",
        variant: "destructive",
      });
      return;
    }

    if (step === 2 && !selectedDuration) {
      toast({
        title: "שגיאה",
        description: "אנא בחר משך זמן למעבדה",
        variant: "destructive",
      });
      return;
    }

    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'network':
        return <Network className="w-6 h-6" />;
      case 'router':
        return <Router className="w-6 h-6" />;
      case 'shield':
        return <Shield className="w-6 h-6" />;
      case 'server':
        return <Server className="w-6 h-6" />;
      case 'window':
        return <Code className="w-6 h-6" />;
      case 'terminal':
        return <Terminal className="w-6 h-6" />;
      default:
        return <Server className="w-6 h-6" />;
    }
  };

  const startLab = () => {
    if (!selectedLabType || !selectedDuration) return;
    
    setLoading(true);
    
    // In a real app, this would be an API call to create the lab
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "המעבדה נוצרה בהצלחה!",
        description: `מעבדת ${selectedLabType.name} הופעלה ל-${selectedDuration.label}`,
      });
      setStep(4); // Success page
    }, 2000);
  };

  const openVNC = () => {
    // In a real app, this would open the VNC connection
    window.open("https://example.com/vnc-session", "_blank");
    navigate("/dashboard");
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-slide-in" dir="rtl">
            <h2 className="text-2xl font-bold">בחר סוג מעבדה</h2>
            <p className="text-muted-foreground">בחר את סוג המעבדה שברצונך להפעיל</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {LAB_TYPES.map((labType) => (
                <Card
                  key={labType.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedLabType?.id === labType.id
                      ? "border-2 border-spotnet-blue"
                      : "border border-border"
                  }`}
                  onClick={() => handleLabTypeSelect(labType)}
                >
                  <CardContent className="p-4 flex">
                    <div className="mr-4 mt-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                      {getIconComponent(labType.icon)}
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{labType.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {labType.description}
                      </p>
                      <div className="inline-flex items-center px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs">
                        {labType.os}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end mt-8">
              <Button onClick={nextStep} disabled={!selectedLabType}>
                המשך
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-slide-in" dir="rtl">
            <h2 className="text-2xl font-bold">בחר משך זמן</h2>
            <p className="text-muted-foreground">
              בחר כמה זמן תרצה שהמעבדה תהיה פעילה
            </p>
            
            <RadioGroup className="mt-6 grid grid-cols-2 gap-4" dir="rtl">
              {LAB_DURATIONS.map((duration) => {
                const estimatedEnd = selectedDuration?.id === duration.id 
                  ? getEstimatedEndTime(duration)
                  : null;
                  
                return (
                  <div 
                    key={duration.id}
                    className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedDuration?.id === duration.id 
                        ? "border-2 border-spotnet-blue bg-slate-50 dark:bg-slate-800/50"
                        : "border-border hover:border-slate-300"
                    }`}
                    onClick={() => handleDurationSelect(duration)}
                  >
                    <RadioGroupItem
                      value={duration.id}
                      id={duration.id}
                      className="absolute top-4 right-4"
                      checked={selectedDuration?.id === duration.id}
                    />
                    <div className="ml-4">
                      <Label htmlFor={duration.id} className="font-medium text-base cursor-pointer">
                        {duration.label}
                      </Label>
                      {estimatedEnd && (
                        <p className="text-sm text-muted-foreground mt-1">
                          המעבדה תסתיים בשעה {formatDateTime(estimatedEnd)}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={prevStep}>
                חזרה
              </Button>
              <Button onClick={nextStep} disabled={!selectedDuration}>
                המשך
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-slide-in" dir="rtl">
            <h2 className="text-2xl font-bold">אישור פרטי המעבדה</h2>
            <p className="text-muted-foreground">
              אנא בדוק את פרטי המעבדה לפני הפעלה
            </p>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 space-y-4 mt-6">
              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-muted-foreground">סוג מעבדה:</span>
                <span className="font-medium">{selectedLabType?.name}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-muted-foreground">מערכת הפעלה:</span>
                <span className="font-medium">{selectedLabType?.os}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-muted-foreground">משך זמן:</span>
                <span className="font-medium">{selectedDuration?.label}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-muted-foreground">שעת סיום משוערת:</span>
                <span className="font-medium">
                  {selectedDuration 
                    ? formatDateTime(getEstimatedEndTime(selectedDuration))
                    : ""}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">שם שרת:</span>
                <span className="font-medium">{serverName}</span>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={prevStep}>
                חזרה
              </Button>
              <Button 
                onClick={startLab}
                disabled={loading}
                className="min-w-[120px]"
              >
                {loading ? "יוצר מכונה..." : "הפעל מעבדה"}
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6 py-10 animate-fade-in" dir="rtl">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold">המעבדה הופעלה בהצלחה!</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              מעבדת {selectedLabType?.name} הופעלה ותהיה זמינה למשך {selectedDuration?.label}
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
              <Button size="lg" onClick={openVNC}>
                פתח קונסול VNC
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/dashboard")}>
                חזור לדשבורד
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const steps = ["בחירת מעבדה", "בחירת משך זמן", "אישור"];

  return (
    <div className="max-w-4xl mx-auto">
      {step < 4 && (
        <div className="mb-10" dir="rtl">
          <div className="flex justify-between">
            {steps.map((stepLabel, index) => (
              <div
                key={index}
                className={`flex items-center ${index > 0 ? "flex-1" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    step > index + 1
                      ? "bg-spotnet-blue text-white"
                      : step === index + 1
                      ? "border-2 border-spotnet-blue text-spotnet-blue"
                      : "border-2 border-slate-300 text-slate-400"
                  }`}
                >
                  {step > index + 1 ? "✓" : index + 1}
                </div>
                <div
                  className={`ml-2 text-sm ${
                    step >= index + 1 ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {stepLabel}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > index + 1 ? "bg-spotnet-blue" : "bg-slate-200 dark:bg-slate-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {renderStepContent()}
    </div>
  );
};

export default LabCreationWizard;
