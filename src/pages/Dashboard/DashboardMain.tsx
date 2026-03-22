import AdminLayout from "../../layout/AdminLayout";
import ExpiryAlerts from "../ExpiryAlert/ExpiryAlert";
import RecentActivity from "../Inventry/RecentActivity";
import CategoryDistributionChart from "./CategoryDistributionChart";
import DashboardStats from "./Dashboard";
import RevenueOrdersChart from "./RevenueAndOrderChart";

const PharmaDashboardMain = () => {
  return (
    <AdminLayout>
      <div className="p-1  min-h-screen">
        <DashboardStats />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
          <div className="xl:col-span-2"><RevenueOrdersChart /></div>
          <div><CategoryDistributionChart /></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
          <ExpiryAlerts />
          <RecentActivity />
        </div>
      </div>
    </AdminLayout>
  );
};

export default PharmaDashboardMain;
