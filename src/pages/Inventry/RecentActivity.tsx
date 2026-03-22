const activities = [
  { title: "Stock Updated", desc: "Paracetamol 650mg – 200 units added", time: "12 min ago" },
  { title: "Low Stock Alert", desc: "Azithromycin 250mg – Only 8 units remaining", time: "45 min ago" },
  { title: "New Product Added", desc: "Dolo 650mg added to inventory", time: "1 hour ago" }
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h5 className="font-bold mb-3">Recent Activity</h5>
      <ul className="">
        {activities.map((item, index) => (
          <li key={index} className="flex justify-between border-b border-gray-200 py-2">
            <div>
              <div className="font-semibold text-sm">{item.title}</div>
              <small className="text-gray-400">{item.desc}</small>
            </div>
            <small className="text-gray-400 whitespace-nowrap ml-2">{item.time}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
