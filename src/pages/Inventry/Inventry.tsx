import { useState } from "react";
import DataTable from "react-data-table-component";
import type { TableColumn } from "react-data-table-component";
import { FaPlus, FaDownload, FaMapMarkerAlt } from "react-icons/fa";
import AdminLayout from "../../layout/AdminLayout";

interface Medicine {
  id: string;
  name: string;
  generic: string;
  category: string;
  batch: string;
  qty: number;
  price: number;
  expiry: string;
  rack: string;
  status: string;
}

const inventoryData: Medicine[] = [
  {
    id: "MED001",
    name: "Amoxicillin 500mg",
    generic: "Amoxicillin - Cipla Ltd",
    category: "Antibiotics",
    batch: "BT-2024-001",
    qty: 240,
    price: 2.5,
    expiry: "2025-06-15",
    rack: "A1-03",
    status: "In Stock",
  },
  {
    id: "MED002",
    name: "Paracetamol 650mg",
    generic: "Acetaminophen - GSK Pharma",
    category: "Analgesics",
    batch: "BT-2024-002",
    qty: 520,
    price: 0.8,
    expiry: "2026-03-20",
    rack: "B2-01",
    status: "In Stock",
  },
  {
    id: "MED003",
    name: "Atorvastatin 10mg",
    generic: "Sun Pharma",
    category: "Cardiovascular",
    batch: "BT-2024-003",
    qty: 18,
    price: 5.2,
    expiry: "2025-09-10",
    rack: "C1-02",
    status: "Low Stock",
  },
  {
    id: "MED004",
    name: "Metformin 500mg",
    generic: "Dr. Reddy's",
    category: "Antidiabetic",
    batch: "BT-2024-004",
    qty: 350,
    price: 1.2,
    expiry: "2026-01-05",
    rack: "D3-01",
    status: "In Stock",
  },
];

const Inventory = () => {
  const [search, setSearch] = useState("");

  const filteredData = inventoryData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns: TableColumn<Medicine>[] = [
    {
      name: "ID",
      selector: (row) => row.id,
      width: "100px",
    },
    {
      name: "MEDICINE",
      cell: (row) => (
        <div>
          <div className="fw-semibold">{row.name}</div>
          <small className="text-muted">{row.generic}</small>
        </div>
      ),
      grow: 2,
    },
    {
      name: "CATEGORY",
      cell: (row) => (
        <span className="badge bg-light text-dark border">
          {row.category}
        </span>
      ),
    },
    {
      name: "BATCH",
      selector: (row) => row.batch,
    },
    {
      name: "QTY",
      selector: (row) => row.qty,
      cell: (row) => (
        <span className={row.qty < 20 ? "text-warning fw-bold" : ""}>
          {row.qty}
        </span>
      ),
    },
    {
      name: "PRICE",
      selector: (row) => `$${row.price.toFixed(2)}`,
    },
    {
      name: "EXPIRY",
      selector: (row) => row.expiry,
    },
    {
      name: "RACK",
      cell: (row) => (
        <span>
          <FaMapMarkerAlt className="me-1 text-muted" />
          {row.rack}
        </span>
      ),
    },
    {
      name: "STATUS",
      cell: (row) => (
        <span
          className={`badge ${
            row.status === "In Stock"
              ? "bg-success"
              : "bg-warning text-dark"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout>
        <div className="container-fluid p-1 bg-light min-vh-100">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1 text-success">Inventory</h3>
          <p className="text-muted mb-0">
            Manage medicines, stock levels, and batch tracking
          </p>
        </div>

        <div>
          <button className="btn btn-outline-secondary me-2">
            <FaDownload className="me-2" />
            Export
          </button>
          <button className="btn btn-success">
            <FaPlus className="me-2" />
            Add Medicine
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, generic, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <select className="form-select">
              <option>All Categories</option>
              <option>Antibiotics</option>
              <option>Analgesics</option>
              <option>Cardiovascular</option>
            </select>
          </div>

          <div className="col-md-3">
            <select className="form-select">
              <option>All Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h6 className="fw-semibold mb-3">
            Medicines ({filteredData.length})
          </h6>

          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            highlightOnHover
            striped
            responsive
          />
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default Inventory;