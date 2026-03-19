const activities = [
  { title: "Stock Updated", desc: "Paracetamol 650mg – 200 units added", time: "12 min ago" },
  { title: "Low Stock Alert", desc: "Azithromycin 250mg – Only 8 units remaining", time: "45 min ago" },
  { title: "New Product Added", desc: "Dolo 650mg added to inventory", time: "1 hour ago" }
];

const RecentActivity = () => {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h5 className="fw-bold mb-3">Recent Activity</h5>

        <ul className="list-group list-group-flush">
          {activities.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              <div>
                <div className="fw-semibold">{item.title}</div>
                <small className="text-muted">{item.desc}</small>
              </div>
              <small className="text-muted">{item.time}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentActivity;