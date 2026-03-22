import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Tablets", value: 400 },
  { name: "Syrups", value: 300 },
  { name: "Capsules", value: 200 },
  { name: "Injections", value: 150 },
  { name: "Others", value: 100 }
];

const COLORS = ["#198754", "#0d6efd", "#ffc107", "#6f42c1", "#6c757d"];

const CategoryDistributionChart = () => {
  return (
    <div className="card bg-white p-3 rounded-2xl shadow-sm border-0">
      <div className="card-body">
        <h5 className="fw-bold font-semibold mb-3">Category Distribution</h5>

        <div style={{ height: 280 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CategoryDistributionChart;