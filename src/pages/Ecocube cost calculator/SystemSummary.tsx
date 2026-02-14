import React from "react";
import AdminLayout from "../../layout/AdminLayout";
import { useNavigate } from "react-router-dom";

const SystemSummary: React.FC = () => {
  const navigate = useNavigate();

  // 🔹 Static values
  const availableDepth = 2200;
  const maxLayers = 2;
  const layersInSystem = 2;
  const includeLiner = "Yes";
  const numberOfInlets = 0;
  const targetVolume = 196;
  const constrainingFactor = "Width";
  const constrainingDimension = 9;
  const numberOfOutlets = 0;

  // 🔹 Layout values
  const metresWide = 8.1;
  const metresLong = 16.15;
  const cubesWide = 7;
  const cubesLong = 14;

  const systemFootprint = 130.82;
  const tankStorage = 196.0;
  const excavationVolume = 403.29;
  const initialBackfill = 100.23;
  const finalBackfill = 98.99;

  const halfCubes = 392;
  const sidePlates = 84;
  const doubleClips = 175;
  const singleClips = 350;
  const geotextile = 421.61;
  const linerRequired = 363.45;

  return (
    <AdminLayout>
      <div className="container-fluid py-4 px-4 bg-body-tertiary min-vh-100">
 
        {/* ================= SYSTEM LAYOUT & CALCULATION ================= */}
        <div className="card border-0 shadow-sm rounded-3 mb-4">
          <div className="card-header">
            <h5 className="fw-bold">System Layout & Quantities</h5>
          </div>

          <div className="card-body p-4">

            {/* Layout Row */}
            <div className="row text-center mb-4">
              <div className="col-md-12">
                <h6 className="fw-semibold mb-3">System Layout</h6>
                <div className="d-flex justify-content-center gap-3 align-items-center flex-wrap">
                  <span className="badge bg-primary px-3 py-2">{metresWide}</span>
                  <span>X</span>
                  <span className="badge bg-primary px-3 py-2">{metresLong}</span>
                  <span>&</span>
                  <span className="badge bg-primary px-3 py-2">{cubesWide}</span>
                  <span>X</span>
                  <span className="badge bg-primary px-3 py-2">{cubesLong}</span>
                </div>
                <div className="text-muted small mt-2">
                  Metres Wide × Metres Long & Cubes Wide × Cubes Long
                </div>
              </div>
            </div>

            {/* Volume Summary */}
            <div className="row text-center g-4 mb-4">
              <div className="col-md-3">
                <div className="p-3 border rounded">
                  <div className="fw-semibold">System Footprint</div>
                  <div className="text-primary fw-bold">{systemFootprint} m²</div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="p-3 border rounded">
                  <div className="fw-semibold">Tank Storage</div>
                  <div className="text-primary fw-bold">{tankStorage} m³</div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="p-3 border rounded">
                  <div className="fw-semibold">Excavation Volume</div>
                  <div className="text-primary fw-bold">{excavationVolume} m³</div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="p-3 border rounded">
                  <div className="fw-semibold">Initial Backfill</div>
                  <div className="text-primary fw-bold">{initialBackfill} m³</div>
                </div>
              </div>
            </div>

            <div className="row text-center g-4">
              <div className="col-md-3">
                <div className="p-3 border rounded">
                  <div className="fw-semibold">Final Backfill</div>
                  <div className="text-primary fw-bold">{finalBackfill} m³</div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="p-3 border rounded">
                  <div className="fw-semibold"># of Half Cubes</div>
                  <div className="text-primary fw-bold">{halfCubes}</div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="p-3 border rounded">
                  <div className="fw-semibold"># of Side Plates</div>
                  <div className="text-primary fw-bold">{sidePlates}</div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="p-3 border rounded">
                  <div className="fw-semibold"># of Double Clips</div>
                  <div className="text-primary fw-bold">{doubleClips}</div>
                </div>
              </div>
            </div>

            <div className="row text-center g-4 mt-3">
              <div className="col-md-3">
                <div className="p-3 border rounded">
                  <div className="fw-semibold"># of Single Clips</div>
                  <div className="text-primary fw-bold">{singleClips}</div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="p-3 border rounded">
                  <div className="fw-semibold">Non-woven Geotextile</div>
                  <div className="text-primary fw-bold">{geotextile} m²</div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="p-3 border rounded">
                  <div className="fw-semibold">Liner Required</div>
                  <div className="text-primary fw-bold">{linerRequired} m²</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Assistance Text */}
        <div className="text-center small text-muted mt-3">
          <strong>ASSISTANCE:</strong> For assistance with design, drawings or pricing please have your completed system design aid ready, and contact your SPEL sales representative.
          <br />
          This tool is intended to assist in sizing stormwater management systems using SPEL products. It should be used for estimating purposes only and is not intended to be a final design tool.
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-outline-secondary px-4"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <button
            className="btn btn-success px-4"
            onClick={() => navigate("/DesignCheck")}
          >
           Check Design
          </button>
        </div>

      </div>
    </AdminLayout>
  );
};

export default SystemSummary;
