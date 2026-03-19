import { FaBox, FaExclamationTriangle, FaClock, FaDollarSign, FaChartLine, FaTrash } from "react-icons/fa";

const stats = [
  { title: "Total Medicines", value: "1,248", sub: "+4.2% from last month", icon: <FaBox />, color: "success" },
  { title: "Low Stock", value: "23", sub: "Items below threshold", icon: <FaExclamationTriangle />, color: "warning" },
  { title: "Expiring Soon", value: "14", sub: "Within 90 days", icon: <FaClock />, color: "danger" },
  { title: "Inventory Value", value: "$285K", sub: "+8.1% from last month", icon: <FaDollarSign />, color: "success" },
  { title: "Monthly Sales", value: "$42.4K", sub: "+7.2% from last month", icon: <FaChartLine />, color: "primary" },
  { title: "Dead Stock", value: "7", sub: "No movement 90+ days", icon: <FaTrash />, color: "secondary" }
];

const DashboardStats = () => {
  return (
    <div className="row g-4">
      {stats.map((item, index) => (
        <div key={index} className="col-12 col-md-6 col-xl-4">
          <div className="card shadow-sm border-0">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted">{item.title}</h6>
                <h4 className="fw-bold">{item.value}</h4>
                <small className="text-muted">{item.sub}</small>
              </div>
              <div className={`text-${item.color} fs-3`}>
                {item.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;