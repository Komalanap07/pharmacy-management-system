const expiryData = [
  { name: "Ibuprofen 400mg", days: 6, units: 95, value: "$171" },
  { name: "Pantoprazole 40mg", days: 21, units: 12, value: "$42" },
  { name: "Omeprazole 20mg", days: 39, units: 180, value: "$540" },
  { name: "Clopidogrel 75mg", days: 75, units: 65, value: "$442" },
  { name: "Amoxicillin 500mg", days: 103, units: 240, value: "$600" }
];

const ExpiryAlerts = () => {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <h5 className="fw-bold">Expiry Alerts</h5>
          <span className="badge bg-danger">5 Items</span>
        </div>

        <ul className="list-group list-group-flush">
          {expiryData.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              <div>
                <div className="fw-semibold">{item.name}</div>
                <small className="text-muted">
                  {item.units} units • {item.value}
                </small>
              </div>
              <span className="badge bg-light text-dark">
                {item.days}d left
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpiryAlerts;