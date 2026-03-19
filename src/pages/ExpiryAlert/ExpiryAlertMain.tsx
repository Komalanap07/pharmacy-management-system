import { FaExclamationTriangle, FaClock, FaDollarSign } from "react-icons/fa";
import AdminLayout from "../../layout/AdminLayout";

interface ExpiryItem {
  name: string;
  batch: string;
  expiry: string;
  units: number;
  value: number;
  daysLeft: number;
  progress: number;
}

const expiryData: ExpiryItem[] = [
  {
    name: "Ibuprofen 400mg",
    batch: "BT-2024-007",
    expiry: "2025-03-10",
    units: 95,
    value: 171,
    daysLeft: 6,
    progress: 97,
  },
  {
    name: "Pantoprazole 40mg",
    batch: "BT-2024-011",
    expiry: "2025-03-25",
    units: 12,
    value: 42,
    daysLeft: 21,
    progress: 88,
  },
  {
    name: "Omeprazole 20mg",
    batch: "BT-2024-006",
    expiry: "2025-04-12",
    units: 180,
    value: 540,
    daysLeft: 39,
    progress: 75,
  },
];

const ExpiryAlertsMain = () => {
  const criticalCount = expiryData.filter((i) => i.daysLeft <= 14).length;
  const warningCount = expiryData.filter(
    (i) => i.daysLeft > 14 && i.daysLeft <= 60
  ).length;
  const totalLoss = expiryData.reduce((sum, item) => sum + item.value, 0);

  const getBorderColor = (days: number) => {
    if (days <= 14) return "danger";
    if (days <= 60) return "warning";
    return "secondary";
  };

  return (
    <AdminLayout>
        <div className="container-fluid p-1 bg-light min-vh-100">
      {/* Header */}
      <div className="mb-4 ">
        <h3 className="fw-bold text-success">Expiry Alerts</h3>
        <p className="text-muted">
          Track and manage medicines approaching expiry
        </p>
      </div>

      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4 ">
          <div className="card border-start border-0 border-danger shadow">
            <div className="card-body d-flex justify-content-between">
              <div>
                <h6 className="text-muted">CRITICAL (≤14 DAYS)</h6>
                <h3 className="fw-bold">{criticalCount}</h3>
                <small className="text-muted">
                  Immediate action required
                </small>
              </div>
              <FaExclamationTriangle className="text-danger fs-3" />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-start border-0 border-warning shadow">
            <div className="card-body d-flex justify-content-between">
              <div>
                <h6 className="text-muted">WARNING (15–60 DAYS)</h6>
                <h3 className="fw-bold">{warningCount}</h3>
                <small className="text-muted">
                  Plan clearance sales
                </small>
              </div>
              <FaClock className="text-warning fs-3" />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-start border-0 border-success shadow">
            <div className="card-body d-flex justify-content-between">
              <div>
                <h6 className="text-muted">POTENTIAL LOSS</h6>
                <h3 className="fw-bold">${totalLoss.toLocaleString()}</h3>
                <small className="text-muted">
                  Total at-risk value
                </small>
              </div>
              <FaDollarSign className="text-success fs-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Expiry Items */}
      {expiryData.map((item, index) => (
        <div
          key={index}
          className={`card shadow-sm mb-4 border-start border-0 border-${getBorderColor(
            item.daysLeft
          )}`}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h5 className="fw-semibold mb-1">
                  {item.name}
                  <span
                    className={`badge ms-3 ${
                      item.daysLeft <= 14
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {item.daysLeft} days left
                  </span>
                </h5>
                <small className="text-muted">
                  Batch: {item.batch} · Expires: {item.expiry} ·{" "}
                  {item.units} units · ${item.value} value
                </small>
              </div>

              <div>
                <button className="btn btn-outline-primary btn-sm me-2">
                  Discount
                </button>
                <button className="btn btn-outline-secondary btn-sm me-2">
                  Transfer
                </button>
                <button className="btn btn-outline-danger btn-sm">
                  Write Off
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress" style={{ height: "8px" }}>
              <div
                className={`progress-bar bg-${getBorderColor(
                  item.daysLeft
                )}`}
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>

            <small className="text-muted">
              {item.progress}% through lifecycle
            </small>
          </div>
        </div>
      ))}
    </div>
    </AdminLayout>
  );
};

export default ExpiryAlertsMain;