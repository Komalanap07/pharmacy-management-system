 import "bootstrap/dist/css/bootstrap.min.css";
import AdminLayout from "../../layout/AdminLayout";
import CalculationTable from "./CalculationTable";

const CalculationTableMain: React.FC = () => {
    return <>
    <AdminLayout>
        <div className="container my-5">
            
        {/* Header Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body d-flex justify-content-between">
          <div>
            <p className="mb-1 small text-muted">© ATLAN</p>
            <p className="mb-1 small">Rainfall Location: Sydney</p>
            <p className="small">
              Calculator: ATLAN Stormwater Sizing Calculator v2.0
            </p>
          </div>

          <div className="text-end">
            <p className="small mb-2">Hydrograph Calculation Table</p>
          </div>
        </div>

        <div className="alert alert-warning m-3 py-2 small">
          <strong>Disclaimer:</strong> Please contact your ATLAN representative regarding this tool.
        </div>
      </div>
        <CalculationTable />

         {/* Engineering Footnotes */}
      <div className="card shadow-sm mt-4 ">
        <div className="card-body">
          <h6>Engineering Footnotes</h6>
          <ul className="small text-muted mb-0">
            <li>Suggested runoff coefficients: Roof (0.9), Carpark (0.85), Landscaping (0.3)</li>
            <li>Tank total dimensions: L × W × D (gross volume before void ratio)</li>
            <li>Infiltrative area: Base area plus optional half-height peripheral area</li>
            <li>Volume provided: Sum of Atlan module net storage + additional storage volumes</li>
            <li>Drainage: Based on soil permeability and infiltrative area over time</li>
            <li>Orifice outlet discharge: Governed by local shire requirements</li>
          </ul>
        </div>
      </div>
   </div>
    </AdminLayout>
    </>
}
export default CalculationTableMain;
