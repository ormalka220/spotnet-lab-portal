
import Sidebar from "@/components/Sidebar";
import LabCreationWizard from "@/components/LabCreationWizard";

const CreateLabPage = () => {
  return (
    <div className="min-h-screen flex bg-secondary/30">
      <Sidebar />
      <div className="flex-1 p-6 ml-0 md:ml-64 mt-0 transition-all duration-300">
        <LabCreationWizard />
      </div>
    </div>
  );
};

export default CreateLabPage;
