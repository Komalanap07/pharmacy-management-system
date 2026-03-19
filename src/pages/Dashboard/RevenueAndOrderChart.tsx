import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const data = [
  { month: "Aug", revenue: 30000 },
  { month: "Sep", revenue: 34000 },
  { month: "Oct", revenue: 37000 },
  { month: "Nov", revenue: 35000 },
  { month: "Dec", revenue: 42000 },
  { month: "Jan", revenue: 39000 },
  { month: "Feb", revenue: 45000 }
];

const RevenueOrdersChart = () => {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h5 className="fw-bold mb-3">Revenue & Orders</h5>

        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#198754" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueOrdersChart;