import { FaExclamationTriangle, FaClock, FaDollarSign } from "react-icons/fa";
import AdminLayout from "../../layout/AdminLayout";

interface ExpiryItem {
  name: string; batch: string; expiry: string;
  units: number; value: number; daysLeft: number; progress: number;
}

const expiryData: ExpiryItem[] = [
  { name: "Ibuprofen 400mg", batch: "BT-2024-007", expiry: "2025-03-10", units: 95, value: 171, daysLeft: 6, progress: 97 },
  { name: "Pantoprazole 40mg", batch: "BT-2024-011", expiry: "2025-03-25", units: 12, value: 42, daysLeft: 21, progress: 88 },
  { name: "Omeprazole 20mg", batch: "BT-2024-006", expiry: "2025-04-12", units: 180, value: 540, daysLeft: 39, progress: 75 },
];

const ExpiryAlertsMain = () => {
  const criticalCount = expiryData.filter((i) => i.daysLeft <= 14).length;
  const warningCount = expiryData.filter((i) => i.daysLeft > 14 && i.daysLeft <= 60).length;
  const totalLoss = expiryData.reduce((sum, item) => sum + item.value, 0);

  const getBorderColor = (days: number) =>
    days <= 14 ? "border-l-red-500" : days <= 60 ? "border-l-yellow-400" : "border-l-gray-300";

  const getBarColor = (days: number) =>
    days <= 14 ? "bg-red-500" : days <= 60 ? "bg-yellow-400" : "bg-gray-400";

  const getBadgeColor = (days: number) =>
    days <= 14 ? "bg-red-500 text-white" : "bg-yellow-400 text-gray-800";

  return (
    <AdminLayout>
      <div className="p-1 bg-gray-50 min-h-screen">
        <div className="mb-4">
          <h3 className="font-bold text-cyan-600 text-xl">Expiry Alerts</h3>
          <p className="text-gray-400 text-sm">Track and manage medicines approaching expiry</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center border-l-4 border-l-red-500">
            <div>
              <p className="text-gray-400 text-xs font-semibold">CRITICAL (≤14 DAYS)</p>
              <h3 className="font-bold text-2xl">{criticalCount}</h3>
              <small className="text-gray-400">Immediate action required</small>
            </div>
            <FaExclamationTriangle className="text-red-500 text-3xl" />
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center border-l-4 border-l-yellow-400">
            <div>
              <p className="text-gray-400 text-xs font-semibold">WARNING (15–60 DAYS)</p>
              <h3 className="font-bold text-2xl">{warningCount}</h3>
              <small className="text-gray-400">Plan clearance sales</small>
            </div>
            <FaClock className="text-yellow-400 text-3xl" />
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center border-l-4 border-l-green-500">
            <div>
              <p className="text-gray-400 text-xs font-semibold">POTENTIAL LOSS</p>
              <h3 className="font-bold text-2xl">${totalLoss.toLocaleString()}</h3>
              <small className="text-gray-400">Total at-risk value</small>
            </div>
            <FaDollarSign className="text-green-500 text-3xl" />
          </div>
        </div>

        {expiryData.map((item, index) => (
          <div key={index} className={`bg-white rounded-lg shadow-sm mb-4 p-4 border-l-4 ${getBorderColor(item.daysLeft)}`}>
            <div className="flex justify-between items-center mb-2">
              <div>
                <h5 className="font-semibold mb-1">
                  {item.name}
                  <span className={`text-xs ml-3 px-2 py-0.5 rounded-full ${getBadgeColor(item.daysLeft)}`}>
                    {item.daysLeft} days left
                  </span>
                </h5>
                <small className="text-gray-400">
                  Batch: {item.batch} · Expires: {item.expiry} · {item.units} units · ${item.value} value
                </small>
              </div>
              <div className="flex gap-2">
                <button className="border border-blue-500 text-blue-500 hover:bg-blue-50 text-xs px-3 py-1 rounded">Discount</button>
                <button className="border border-gray-400 text-gray-600 hover:bg-gray-50 text-xs px-3 py-1 rounded">Transfer</button>
                <button className="border border-red-500 text-red-500 hover:bg-red-50 text-xs px-3 py-1 rounded">Write Off</button>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className={`h-2 rounded-full ${getBarColor(item.daysLeft)}`} style={{ width: `${item.progress}%` }} />
            </div>
            <small className="text-gray-400">{item.progress}% through lifecycle</small>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default ExpiryAlertsMain;
