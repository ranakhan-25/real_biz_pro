import ProcurementDashboard from "@/components/procurement/ProcurementDashboard";
import { Sidebar } from "@/components/crm/sidebar";

export default function ProcurementPage() {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <ProcurementDashboard />
      </div>
    </div>
  );
}
