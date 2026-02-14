import React, { useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { useNavigate } from "react-router-dom";

const SystemConfigration: React.FC = () => {
  const [availableDepth, setAvailableDepth] = useState("");
  const [maxLayers, setMaxLayers] = useState("");
  const [layersInSystem, setLayersInSystem] = useState("");
  const [includeLiner, setIncludeLiner] = useState("Yes");
  const [numberOfInlets, setNumberOfInlets] = useState("");
  const [targetVolume, setTargetVolume] = useState("");
  const [constrainingFactor, setConstrainingFactor] = useState("Width");
  const [constrainingDimension, setConstrainingDimension] = useState("");
  const [numberOfOutlets, setNumberOfOutlets] = useState("");
const navigate = useNavigate();
  return (
  <AdminLayout>
      <div className="container-fluid py-4 px-4 bg-body-tertiary min-vh-100">
      <div className="card border-0 shadow-sm rounded-3">
        <div className="card-header">
            <h5 className="fw-bold ">System Configuration</h5>
        </div>
        <div className="card-body p-4 ">


          {/* Row 1 */}
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label fw-medium">
                Available Depth to Invert (mm)
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Available Depth"
                value={availableDepth}
                onChange={(e) => setAvailableDepth(e.target.value)}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label fw-medium">
                Max Layers Possible
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Max Layers"
                value={maxLayers}
                onChange={(e) => setMaxLayers(e.target.value)}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label fw-medium">
                Layers in this System
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="332"
                disabled
                value={layersInSystem}
                onChange={(e) => setLayersInSystem(e.target.value)}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="row">

            <div className="col-md-4 mb-3">
              <label className="form-label fw-medium">
                Include Liner
              </label>
              <select
                className="form-select"
                value={includeLiner}
                onChange={(e) => setIncludeLiner(e.target.value)}
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label fw-medium">
                Number of Inlets
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="254"
                disabled
                value={numberOfInlets}
                onChange={(e) => setNumberOfInlets(e.target.value)}
              />
            </div>
             <div className="col-md-4 mb-3">
              <label className="form-label fw-medium">
                Number of Outlets
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="454"
                disabled 
                value={numberOfOutlets}
                onChange={(e) => setNumberOfOutlets(e.target.value)}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="row">

           
              <div className="col-md-4 mb-3">
              <label className="form-label fw-medium">
                Target Storage Volume (m³)
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Storage Volume"
                value={targetVolume}
                onChange={(e) => setTargetVolume(e.target.value)}
              />
            </div>
             <div className="col-md-4 mb-3">
              <label className="form-label fw-medium">
                Constraining Factor
              </label>
              <select
                className="form-select"
                value={constrainingFactor}
                onChange={(e) => setConstrainingFactor(e.target.value)}
              >
                <option>Width</option>
                <option>Length</option>
                <option>Depth</option>
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label fw-medium">
                Constraining Dimension (m)
              </label>
              <input
                type="number"
                className="form-control"
                value={constrainingDimension}
                placeholder="Constraining Dimension"
                onChange={(e) =>
                  setConstrainingDimension(e.target.value)
                }
              />
            </div>
          </div>

          {/* Row 4 */}
        

          {/* Row 5 */}
          <div className="row">
            
          </div>

          {/* Info Text */}
          <div className="text-muted small mt-2">
            * Minimum recommended values are already included in calculations
          </div>

          <div className="text-muted small">
            (Accommodates pipes up to 450mm)
          </div>

        </div>
      </div>
       <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-outline-secondary px-4"
              onClick={() => navigate(-1)}
            >
             ← Back
            </button>

            <button
              className="btn btn-primary px-4"
              onClick={() => navigate("/system-summary")}
            >
              Next →
            </button>
          </div>
    </div>
  </AdminLayout>
  );
};

export default SystemConfigration;
