import React from "react";
import AdminLayout from "../../layout/AdminLayout";
import CalculationTable from "./CalculationTable";

const CalculationTableMain: React.FC = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto my-5 px-4">

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm mb-4 p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-1">© ATLAN</p>
              <p className="text-sm mb-1">Rainfall Location: Sydney</p>
              <p className="text-sm">Calculator: ATLAN Stormwater Sizing Calculator v2.0</p>
            </div>
            <div className="text-right">
              <p className="text-sm">Hydrograph Calculation Table</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 rounded p-2 mt-3 text-sm">
            <strong>Disclaimer:</strong> Please contact your ATLAN representative regarding this tool.
          </div>
        </div>

        <CalculationTable projectId={undefined} />

        {/* Engineering Footnotes */}
        <div className="bg-white rounded-lg shadow-sm mt-4 p-4">
          <h6 className="font-semibold mb-2">Engineering Footnotes</h6>
          <ul className="text-sm text-gray-400 space-y-1 list-disc pl-4">
            <li>Suggested runoff coefficients: Roof (0.9), Carpark (0.85), Landscaping (0.3)</li>
            <li>Tank total dimensions: L × W × D (gross volume before void ratio)</li>
            <li>Infiltrative area: Base area plus optional half-height peripheral area</li>
            <li>Volume provided: Sum of Atlan module net storage + additional storage volumes</li>
            <li>Drainage: Based on soil permeability and infiltrative area over time</li>
            <li>Orifice outlet discharge: Governed by local shire requirements</li>
          </ul>
        </div>

      </div>
    </AdminLayout>
  );
};

export default CalculationTableMain;
