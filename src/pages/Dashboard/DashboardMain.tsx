import AdminLayout from "../../layout/AdminLayout";
import ExpiryAlerts from "../ExpiryAlert/ExpiryAlert";
import RecentActivity from "../Inventry/RecentActivity";
import CategoryDistributionChart from "./CategoryDistributionChart";
import DashboardStats from "./Dashboard";
import RevenueOrdersChart from "./RevenueAndOrderChart";

const PharmaDashboardMain = () => {

  return (
   <AdminLayout>
     <div className="container-fluid p-1 bg-light min-vh-100">

      {/* Top Stats */}
      <DashboardStats />

      {/* Charts */}
      <div className="row mt-4 g-4">
        <div className="col-12 col-xl-8">
          <RevenueOrdersChart />
        </div>
        <div className="col-12 col-xl-4">
          <CategoryDistributionChart />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="row mt-4 g-4">
        <div className="col-12 col-xl-6">
          <ExpiryAlerts />
        </div>
        <div className="col-12 col-xl-6">
          <RecentActivity />
        </div>
      </div>

    </div>
   </AdminLayout>
  );
};


export default PharmaDashboardMain;