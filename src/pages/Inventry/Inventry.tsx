import { useState } from "react";
import DataTable from "react-data-table-component";
import type { TableColumn } from "react-data-table-component";
import { FaPlus, FaDownload, FaMapMarkerAlt } from "react-icons/fa";
import AdminLayout from "../../layout/AdminLayout";

interface Medicine {
  id: string; name: string; generic: string; category: string;
  batch: string; qty: number; price: number; expiry: string; rack: string; status: string;
}

const inventoryData: Medicine[] = [
  { id: "MED001", name: "Amoxicillin 500mg", generic: "Amoxicillin - Cipla Ltd", category: "Antibiotics", batch: "BT-2024-001", qty: 240, price: 2.5, expiry: "2025-06-15", rack: "A1-03", status: "In Stock" },
  { id: "MED002", name: "Paracetamol 650mg", generic: "Acetaminophen - GSK Pharma", category: "Analgesics", batch: "BT-2024-002", qty: 520, price: 0.8, expiry: "2026-03-20", rack: "B2-01", status: "In Stock" },
  { id: "MED003", name: "Atorvastatin 10mg", generic: "Sun Pharma", category: "Cardiovascular", batch: "BT-2024-003", qty: 18, price: 5.2, expiry: "2025-09-10", rack: "C1-02", status: "Low Stock" },
  { id: "MED004", name: "Metformin 500mg", generic: "Dr. Reddy's", category: "Antidiabetic", batch: "BT-2024-004", qty: 350, price: 1.2, expiry: "2026-01-05", rack: "D3-01", status: "In Stock" },
];

const Inventory = () => {
  const [search, setSearch] = useState("");
  const [showmodal, setshowmodal] = useState(false);

  const filteredData = inventoryData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns: TableColumn<Medicine>[] = [
    { name: "ID", selector: (row) => row.id, width: "100px" },
    {
      name: "MEDICINE",
      cell: (row) => (
        <div>
          <div className="font-semibold text-sm">{row.name}</div>
          <small className="text-gray-400">{row.generic}</small>
        </div>
      ),
      grow: 2,
    },
    {
      name: "CATEGORY",
      cell: (row) => (
        <span className="bg-gray-100 text-gray-700 border text-xs px-2 py-0.5 rounded">{row.category}</span>
      ),
    },
    { name: "BATCH", selector: (row) => row.batch },
    {
      name: "QTY",
      cell: (row) => (
        <span className={row.qty < 20 ? "text-yellow-500 font-bold" : ""}>{row.qty}</span>
      ),
    },
    { name: "PRICE", selector: (row) => `$${row.price.toFixed(2)}` },
    { name: "EXPIRY", selector: (row) => row.expiry },
    {
      name: "RACK",
      cell: (row) => (
        <span className="flex items-center gap-1">
          <FaMapMarkerAlt className="text-gray-400" />{row.rack}
        </span>
      ),
    },
    {
      name: "STATUS",
      cell: (row) => (
        <span className={`text-xs px-2 py-0.5 rounded-full text-white ${row.status === "In Stock" ? "bg-green-500" : "bg-yellow-400 text-gray-800"}`}>
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="p-1  min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-cyan-600 text-xl">Inventory</h3>
            <p className="text-gray-400 text-sm">Manage medicines, stock levels, and batch tracking</p>
          </div>
          <div className="flex gap-2">
            <button className="border border-gray-400 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded text-sm flex items-center gap-1">
              <FaDownload /> Export
            </button>
            <button className="bg-gradient-to-r from-[#099773] to-[#1f7ea1]  hover:bg-green-600 text-white px-3 py-2 rounded text-sm flex items-center gap-1" onClick={() => setshowmodal(true)}>
              <FaPlus /> Add Medicine
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              className="border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300 md:col-span-1"
              placeholder="Search by name, generic, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select className="border rounded px-3 py-2 text-sm outline-none">
              <option>All Categories</option>
              <option>Antibiotics</option>
              <option>Analgesics</option>
              <option>Cardiovascular</option>
            </select>
            <select className="border rounded px-3 py-2 text-sm outline-none">
              <option>All Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h6 className="font-semibold mb-3 text-sm">Medicines ({filteredData.length})</h6>
          <DataTable columns={columns} data={filteredData} pagination highlightOnHover striped responsive />
        </div>

        {showmodal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-2xl w-full max-w-xl shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xl font-semibold">Add New Medicine</p>
                <button onClick={() => setshowmodal(false)} className="text-gray-500 hover:text-red-500">✕</button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm">Medicine Name</label>
                  <input type="text" placeholder="e.g. Amoxicillin 500mg" className="w-full border p-2 rounded-2xl mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm">Generic Name</label>
                    <input type="text" placeholder="e.g. Amoxicillin" className="w-full border p-2 rounded-2xl mt-1" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm">Category</label>
                    <select className="border p-2 rounded-2xl mt-1">
                      <option value="" disabled>Select</option>
                      <option>Amoxicillin</option>
                      <option>Vitamins</option>
                      <option>Hormones</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm">Manufacturer</label>
                    <input type="text" placeholder="e.g. Cipla Ltd" className="w-full border p-2 rounded-2xl mt-1" />
                  </div>
                  <div>
                    <label className="text-sm">Batch Number</label>
                    <input type="text" className="w-full border p-2 rounded-2xl mt-1" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm">Quantity</label>
                    <input type="number" placeholder="0" className="w-full border p-2 rounded-2xl mt-1" />
                  </div>
                  <div>
                    <label className="text-sm">Unit Price ($)</label>
                    <input type="number" placeholder="0" className="w-full border p-2 rounded-2xl mt-1" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm">Expiry Date</label>
                    <input type="date" className="w-full border p-2 rounded-2xl mt-1" />
                  </div>
                  <div>
                    <label className="text-sm">Rack Location</label>
                    <input type="text" className="w-full border p-2 rounded-2xl mt-1" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button className="px-4 py-2 bg-gradient-to-r from-[#099773] to-[#1f7ea1]  w-full text-white rounded">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Inventory;
