// import React, { useMemo, useState } from "react";
// import AdminLayout from "../../layout/AdminLayout";

// type Project = {
//   name: string;
//   type: string;
//   client: string;
//   date: string;
//   status: string;
// };

// const ITEMS_PER_PAGE = 5;

// export function RecentProjects() {
//   // ✅ Static Projects (Temporary)
//   const recentProjects: Project[] = [
//     {
//       name: "Melbourne Shopping Centre",
//       type: "Detention",
//       client: "ABC Developments",
//       status: "Completed",
//       date: "2026-02-01",
//     },
//     {
//       name: "Sydney Residential Estate",
//       type: "Infiltration",
//       client: "XYZ Builders",
//       status: "Draft",
//       date: "2026-02-03",
//     },
//     {
//       name: "Brisbane Office Park",
//       type: "Stormwater Sizing",
//       client: "Urban Projects Ltd",
//       status: "Completed",
//       date: "2026-01-28",
//     },
//   ];

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [page, setPage] = useState(1);

//   const filteredProjects = useMemo(() => {
//     return recentProjects.filter((project) => {
//       const matchesSearch =
//         project.name.toLowerCase().includes(search.toLowerCase()) ||
//         project.client.toLowerCase().includes(search.toLowerCase());

//       const matchesStatus =
//         statusFilter === "All" || project.status === statusFilter;

//       return matchesSearch && matchesStatus;
//     });
//   }, [search, statusFilter]);

//   const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

//   const paginatedProjects = filteredProjects.slice(
//     (page - 1) * ITEMS_PER_PAGE,
//     page * ITEMS_PER_PAGE
//   );

//   return (
//    <AdminLayout>
//     <div className="container-fluid mt-4">
//       <div className="card shadow-sm">
//         {/* Header */}
//         <div className="card-header bg-white">
//           <h5 className="mb-3">Projects</h5>

//           {/* Filters */}
//           <div className="row g-3">
//             <div className="col-md-4">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search project or client..."
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(1);
//                 }}
//               />
//             </div>

//             <div className="col-md-3">
//               <select
//                 className="form-select"
//                 value={statusFilter}
//                 onChange={(e) => {
//                   setStatusFilter(e.target.value);
//                   setPage(1);
//                 }}
//               >
//                 <option value="All">All Status</option>
//                 <option value="Completed">Completed</option>
//                 <option value="Draft">Draft</option>
//                 <option value="In Progress">In Progress</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="table-responsive">
//           <table className="table table-hover align-middle mb-0">
//             <thead className="table-light">
//               <tr>
//                 <th>#</th>
//                 <th>Project</th>
//                 <th>Type</th>
//                 <th>Client</th>
//                 <th>Date</th>
//                 <th>Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {paginatedProjects.length === 0 && (
//                 <tr>
//                   <td colSpan={6} className="text-center text-muted py-4">
//                     No projects found
//                   </td>
//                 </tr>
//               )}

//               {paginatedProjects.map((project, index) => (
//                 <tr key={project.name}>
//                   <td>
//                     {(page - 1) * ITEMS_PER_PAGE + index + 1}
//                   </td>

//                   <td className="fw-medium">
//                     {project.name}
//                   </td>

//                   <td>{project.type}</td>

//                   <td>{project.client}</td>

//                   <td>
//                     {new Date(project.date).toLocaleDateString("en-IN", {
//                       day: "2-digit",
//                       month: "short",
//                       year: "numeric",
//                     })}
//                   </td>

//                   <td>
//                     <span
//                       className={`badge ${
//                         project.status === "Completed"
//                           ? "bg-success-subtle text-success"
//                           : project.status === "Draft"
//                           ? "bg-secondary-subtle text-secondary"
//                           : "bg-warning-subtle text-warning"
//                       }`}
//                     >
//                       {project.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="card-footer d-flex justify-content-between align-items-center">
//             <span className="text-muted small">
//               Page {page} of {totalPages}
//             </span>

//             <div>
//               <button
//                 className="btn btn-outline-secondary btn-sm me-2"
//                 disabled={page === 1}
//                 onClick={() => setPage((p) => p - 1)}
//               >
//                 Prev
//               </button>

//               <button
//                 className="btn btn-outline-secondary btn-sm"
//                 disabled={page === totalPages}
//                 onClick={() => setPage((p) => p + 1)}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//     </AdminLayout>
//   );
// }

import { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-responsive-bs5";
import AdminLayout from "../../layout/AdminLayout";

type Project = {
  name: string;
  type: string;
  client: string;
  date: string;
  status: string;
};

export function RecentProjects() {
  const tableRef = useRef<HTMLTableElement>(null);

  const recentProjects: Project[] = [
    {
      name: "Melbourne Shopping Centre",
      type: "Detention",
      client: "ABC Developments",
      status: "Completed",
      date: "2026-02-01",
    },
    {
      name: "Sydney Residential Estate",
      type: "Infiltration",
      client: "XYZ Builders",
      status: "Draft",
      date: "2026-02-03",
    },
    {
      name: "Brisbane Office Park",
      type: "Stormwater Sizing",
      client: "Urban Projects Ltd",
      status: "Completed",
      date: "2026-01-28",
    },
  ];

  // useEffect(() => {
  //   if (tableRef.current) {
  //     $(tableRef.current).DataTable({
  //       pageLength: 5,
  //       lengthChange: false,
  //       responsive: true,
  //       ordering: true,
  //     });
  //   }

  //   return () => {
  //     if ($.fn.DataTable.isDataTable(tableRef.current)) {
  //       $(tableRef.current!).DataTable().destroy();
  //     }
  //   };
  // }, []);
useEffect(() => {
  if (!tableRef.current) return;

  const table = $(tableRef.current).DataTable({
    pageLength: 5,
    lengthChange: false,
    responsive: true,
    ordering: true,
  });

  return () => {
    if (table) {
      table.destroy();
    }
  };
}, []);

  return (
    <AdminLayout>
    <div className="container-fluid mt-4">
      <div className="card shadow-sm border-0 rounded-4">
        {/* Header */}
        <div className="card-header bg-white border-bottom py-3">
          <h5 className="mb-0 fw-semibold">Projects</h5>
        </div>

        {/* Table */}
        <div className="card-body">
          <div className="table-responsive">
            <table
              ref={tableRef}
              className="table table-hover align-middle table-striped"
              style={{ width: "100%" }}
            >
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Project</th>
                  <th>Type</th>
                  <th>Client</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentProjects.map((project, index) => (
                  <tr key={project.name}>
                    <td>{index + 1}</td>
                    <td className="">{project.name}</td>
                    <td>{project.type}</td>
                    <td>{project.client}</td>
                    <td>
                      {new Date(project.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      <span
                        className={`badge rounded-pill ${
                          project.status === "Completed"
                            ? "bg-success-subtle text-success"
                            : project.status === "Draft"
                            ? "bg-secondary-subtle text-secondary"
                            : "bg-warning-subtle text-warning"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}
