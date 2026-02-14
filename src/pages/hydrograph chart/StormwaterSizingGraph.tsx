import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AdminLayout from "../../layout/AdminLayout";

const Hydrograph: React.FC = () => {
  // 🔹 Static Data (You will replace with API later)
  const data = [
    { minute: 1, inflow: 50000, drainage: 0, net: 40000, orifice: 1000, required: 0 },
    { minute: 2, inflow: 90000, drainage: 2000, net: 80000, orifice: 1000, required: 0 },
    { minute: 3, inflow: 120000, drainage: 5000, net: 100000, orifice: 1000, required: 0 },
    { minute: 4, inflow: 150000, drainage: 8000, net: 130000, orifice: 1000, required: 0 },
    { minute: 5, inflow: 200000, drainage: 12000, net: 170000, orifice: 1000, required: 0 },
    { minute: 6, inflow: 250000, drainage: 30000, net: 210000, orifice: 1000, required: 0 },
    { minute: 7, inflow: 300000, drainage: 50000, net: 230000, orifice: 1000, required: 0 },
    { minute: 8, inflow: 330000, drainage: 70000, net: 250000, orifice: 1000, required: 0 },
    { minute: 9, inflow: 360000, drainage: 90000, net: 260000, orifice: 1000, required: 0 },
    { minute: 10, inflow: 390000, drainage: 120000, net: 270000, orifice: 1000, required: 0 },
    { minute: 11, inflow: 450000, drainage: 180000, net: 280000, orifice: 1000, required: 0 },
    { minute: 12, inflow: 520000, drainage: 250000, net: 290000, orifice: 1000, required: 0 },
    { minute: 13, inflow: 600000, drainage: 400000, net: 260000, orifice: 1000, required: 0 },
    { minute: 14, inflow: 700000, drainage: 600000, net: 220000, orifice: 1000, required: 0 },
    { minute: 15, inflow: 850000, drainage: 850000, net: 150000, orifice: 1000, required: 0 },
    { minute: 16, inflow: 980000, drainage: 1000000, net: 0, orifice: 1000, required: 0 },
    { minute: 17, inflow: 1100000, drainage: 1150000, net: 0, orifice: 1000, required: 0 },
    { minute: 18, inflow: 1150000, drainage: 0, net: 0, orifice: 1000, required: 0 },
    { minute: 19, inflow: 0, drainage: 0, net: 0, orifice: 1000, required: 0 },
    { minute: 20, inflow: 0, drainage: 0, net: 1000, orifice: 1000, required: 0 },
    { minute: 21, inflow: 0, drainage: 0, net: 2000, orifice: 1000, required: 0 },
    { minute: 22, inflow: 0, drainage: 0, net: 2000, orifice: 1000, required: 0 },
    { minute: 23, inflow: 0, drainage: 0, net: 2000, orifice: 1000, required: 0 },
    { minute: 24, inflow: 0, drainage: 0, net: 2000, orifice: 1000, required: 0 },
    { minute: 25, inflow: 0, drainage: 0, net: 2000, orifice: 1000, required: 0 },
    { minute: 26, inflow: 0, drainage: 0, net: 3000, orifice: 1000, required: 0 },
    { minute: 27, inflow: 0, drainage: 0, net: 3000, orifice: 1000, required: 0 },
    { minute: 28, inflow: 0, drainage: 0, net: 3000, orifice: 1000, required: 0 },
    { minute: 29, inflow: 0, drainage: 0, net: 3000, orifice: 1000, required: 0 },
  ];

  return (
    <AdminLayout>
        <div className="card shadow-sm rounded-3 p-3">
      <h5 className="fw-bold mb-3">Hydrograph</h5>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="minute"
            label={{ value: "Minutes", position: "insideBottom", offset: -5 }}
          />

          <YAxis
            label={{ value: "Volume (m³)", angle: -90, position: "insideLeft" }}
          />

          <Tooltip />
          <Legend />

          {/* 🔵 Inflow Volume */}
          <Line
            type="monotone"
            dataKey="inflow"
            stroke="#1f5fd6"
            strokeWidth={3}
            name="Inflow Volume"
            dot={false}
          />

          {/* 🟡 Drainage */}
          <Line
            type="monotone"
            dataKey="drainage"
            stroke="#f2b705"
            strokeWidth={3}
            name="Drainage"
            dot={false}
          />

          {/* 🟣 Orifice Discharge */}
          <Line
            type="monotone"
            dataKey="orifice"
            stroke="#6f42c1"
            strokeWidth={2}
            name="Orifice Discharge"
            dot={false}
          />

          {/* 🔵 Net Volume */}
          <Line
            type="monotone"
            dataKey="net"
            stroke="#17a2b8"
            strokeWidth={3}
            name="Net Volume"
            dot={false}
          />

          {/* 🟠 Volume Required */}
          <Line
            type="monotone"
            dataKey="required"
            stroke="#fd7e14"
            strokeWidth={2}
            name="Volume Required"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
    </AdminLayout>
  );
};

export default Hydrograph;
