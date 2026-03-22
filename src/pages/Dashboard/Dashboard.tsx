import { FaBox, FaExclamationTriangle, FaClock, FaDollarSign, FaChartLine, FaTrash } from "react-icons/fa";

const stats = [
  { title: "Total Medicines", value: "1,248", sub: "+4.2% from last month", icon: <FaBox />, color: "text-green-500" },
  { title: "Low Stock", value: "23", sub: "Items below threshold", icon: <FaExclamationTriangle />, color: "text-yellow-500" },
  { title: "Expiring Soon", value: "14", sub: "Within 90 days", icon: <FaClock />, color: "text-red-500" },
  { title: "Inventory Value", value: "$285K", sub: "+8.1% from last month", icon: <FaDollarSign />, color: "text-green-500" },
  { title: "Monthly Sales", value: "$42.4K", sub: "+7.2% from last month", icon: <FaChartLine />, color: "text-blue-500" },
  { title: "Dead Stock", value: "7", sub: "No movement 90+ days", icon: <FaTrash />, color: "text-gray-500" }
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4  shadow-sm">
      {stats.map((item, index) => (
        <div key={index} className="bg-white hover:shadow-md rounded-lg shadow-sm border-0 p-4 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">{item.title}</p>
            <h4 className="font-bold text-xl">{item.value}</h4>
            <small className="text-gray-400">{item.sub}</small>
          </div>
          <div className={`text-3xl ${item.color}`}>{item.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
