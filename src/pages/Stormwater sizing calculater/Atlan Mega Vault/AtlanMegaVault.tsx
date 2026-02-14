import React, { useState,useMemo } from "react";
// import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../layout/AdminLayout";

const AtlanMegaVault: React.FC = () => {
  const navigate = useNavigate();

  

  
  const [formData, setFormData] = useState({
    lengthConstraint: "33.985",
    approxNetVolume: "0",

    moduleLength: "29.5",
    moduleWidth: "10.5",
    moduleDepth: "3",

    dimLength: "33.985",
    dimWidth: "12.135",
    dimDepth: "1.530",
    grossVolume: "630.9",
    netVolume: "599.4",

    bluemetalHeight: "0",
    bluemetalPercent: "36",

    includePeripheral: "Yes",
    infiltrativeArea: "483",

    volumeProvided: "599.4",
    volumeRequired: "283.7",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

//   const isSufficient =
//     parseFloat(formData.volumeProvided) >=
//     parseFloat(formData.volumeRequired);
 const grossVolume = useMemo(() => {
    return (
      (Number(formData.dimLength) || 0) *
      (Number(formData.dimWidth) || 0) *
      (Number(formData.dimDepth) || 0)
    );
  }, [formData.dimLength, formData.dimWidth, formData.dimDepth]);
const bluemetalVoid =
    (grossVolume *
      (Number(formData.bluemetalPercent) || 0)) /
    100;

  const netVolume = grossVolume - bluemetalVoid;

 const isSufficient =
    netVolume >= (Number(formData.volumeRequired) || 0);
  return (
<AdminLayout>
     <div className="container mt-4">
      <div className=" border-0 rounded-4">
        <div className=" bg-white">
          {/* <h4 className="mb-0">Atlan MegaVault Design</h4> */}
        </div>

        <div className="card-body">
{/* ================= LENGTH CONSTRAINT CARD ================= */}
<div className="card mb-4 shadow-sm border-0">
  <div className="card-body">
    <h6 className="text-success mb-3">Length Constraint</h6>

    <div className="row">
      <div className="col-md-6">
        <label>Length Constraint (m)</label>
        <input
          type="number"
          name="lengthConstraint"
          value={formData.lengthConstraint}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="col-md-6">
        <label>Approx. Net Volume (m³)</label>
        <input
          type="number"
          name="approxNetVolume"
          value={formData.approxNetVolume}
          onChange={handleChange}
          className="form-control"
        />
      </div>
    </div>
  </div>
</div>

          {/* ================= MODULES CARD (DISPLAY ONLY) ================= */}
          <div className="card mb-4 shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-success mb-3">Modules</h6>

              <div className="row">
                <div className="col-md-4">
                  <label>Length (m)</label>
                  <div className="form-control bg-light">
                    {formData.moduleLength}
                  </div>
                </div>

                <div className="col-md-4">
                  <label>Width (m)</label>
                  <div className="form-control bg-light">
                    {formData.moduleWidth}
                  </div>
                </div>

                <div className="col-md-4">
                  <label>Depth (m)</label>
                  <div className="form-control bg-light">
                    {formData.moduleDepth}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= VAULT DIMENSIONS (INPUT) ================= */}
          <div className="card mb-4 shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-success mb-3">Vault Dimensions</h6>

              <div className="row mb-3">
                <div className="col-md-3">
                  <label>Length (m)</label>
                  <input
                    type="number"
                    name="dimLength"
                    value={formData.dimLength}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-3">
                  <label>Width (m)</label>
                  <input
                    type="number"
                    name="dimWidth"
                    value={formData.dimWidth}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-3">
                  <label>Depth (m)</label>
                  <input
                    type="number"
                    name="dimDepth"
                    value={formData.dimDepth}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-3">
                  <label>Gross Volume (m³)</label>
                  <div className="form-control bg-light">
                    {grossVolume.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <label>Net Volume (m³)</label>
                  <div className="form-control bg-light">
                    {netVolume.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= BLUEMETAL BASE ================= */}
          <div className="card mb-4 shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-success mb-3">Bluemetal Base</h6>

              <div className="row">
                <div className="col-md-4">
                  <label>Base Height (m)</label>
                  <input
                    type="number"
                    name="bluemetalHeight"
                    value={formData.bluemetalHeight}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-4">
                  <label>Void %</label>
                  <input
                    type="number"
                    name="bluemetalPercent"
                    value={formData.bluemetalPercent}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ================= INFILTRATIVE AREA ================= */}
          <div className="card mb-4 shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-success mb-3">Infiltrative Area</h6>

              <div className="row">
                <div className="col-md-6">
                  <label>Include Half Height Peripheral</label>
                  <select
                    name="includePeripheral"
                    value={formData.includePeripheral}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label>Infiltrative Area (m²)</label>
                  <input
                    type="number"
                    name="infiltrativeArea"
                    value={formData.infiltrativeArea}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ================= DESIGN CHECK ================= */}
          {/* <div className="card mb-4 shadow-sm border-0">
            <div className="card-body">
              <h5 className="text-success mb-3">Design Check</h5>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label>Volume Required (m³)</label>
                  <input
                    type="number"
                    name="volumeRequired"
                    value={formData.volumeRequired}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label>Volume Provided (m³)</label>
                  <div className="form-control bg-light">
                    {netVolume.toFixed(2)}
                  </div>
                </div>
              </div>

              <div
                className={`alert ${
                  isSufficient
                    ? "alert-success"
                    : "alert-danger"
                } text-center fw-bold`}
              >
                {isSufficient
                  ? "VOL. SUFFICIENT"
                  : "VOL. NOT SUFFICIENT"}
              </div>
            </div>
          </div> */}

          {/* ================= BUTTONS ================= */}
          <div className="d-flex justify-content-between">
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
              Check design 
            </button>
          </div>

        </div>
      </div>
    </div>
</AdminLayout>
  );
};

export default AtlanMegaVault;
