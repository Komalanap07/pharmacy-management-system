const expiryData = [
  { name: "Ibuprofen 400mg", days: 6, units: 95, value: "$171" },
  { name: "Pantoprazole 40mg", days: 21, units: 12, value: "$42" },
  { name: "Omeprazole 20mg", days: 39, units: 180, value: "$540" },
  { name: "Clopidogrel 75mg", days: 75, units: 65, value: "$442" },
  { name: "Amoxicillin 500mg", days: 103, units: 240, value: "$600" }
];

const ExpiryAlerts = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-3">
        <h5 className="font-bold">Expiry Alerts</h5>
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">5 Items</span>
      </div>

      <ul className="">
        {expiryData.map((item, index) => (
          <li key={index} className="flex justify-between py-2 border-gray-200 border-b">
            <div>
              <div className="font-semibold text-sm">{item.name}</div>
              <small className="text-gray-400">{item.units} units • {item.value}</small>
            </div>
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded self-start">
              {item.days}d left
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpiryAlerts;
