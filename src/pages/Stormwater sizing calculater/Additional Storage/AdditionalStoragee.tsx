import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../layout/AdminLayout";

const AdditionalStoragee: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roofPonding: "",
    carparkPonding: "",
    landscapingPonding: "",

    soakwell1200x1500: "",
    soakwell1800x1500: "",
    soakwell1200x900: "",

    pipe1500: "",
    pipe1200: "",
    pipe900: "",

    otherVolume: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
  <AdminLayout>
      <div className="container ">
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-header bg-white text-dark ">
          <h4 className="mb-0">Additional Storage</h4>
        </div>

        <div className="card-body">

          {/* Catchment Area Storage */}
          <h5 className="text-primary mb-3">
            Catchment Area Storage (Ponding)
          </h5>

          {[
            { label: "Roof", name: "roofPonding" },
            { label: "Carpark", name: "carparkPonding" },
            { label: "Landscaping", name: "landscapingPonding" },
          ].map((item) => (
            <div className="row mb-3" key={item.name}>
              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  {item.label} (mm)
                </label>
              </div>
              <div className="col-md-4">
                <input
                  type="number"
                  name={item.name}
                  value={(formData as any)[item.name]}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter mm"
                />
              </div>
              <div className="col-md-4 d-flex align-items-center">
                <span className="text-muted">0.00 m³</span>
              </div>
            </div>
          ))}

          {/* <hr /> */}

          {/* Precast Soakwells */}
          <h5 className="text-primary mb-3">
            Precast Soakwells (Size & Quantity)
          </h5>

          {[
            { label: "Ø1200 x 1500", name: "soakwell1200x1500" },
            { label: "Ø1800 x 1500", name: "soakwell1800x1500" },
            { label: "Ø1200 x 900", name: "soakwell1200x900" },
          ].map((item) => (
            <div className="row mb-3" key={item.name}>
              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  {item.label}
                </label>
              </div>
              <div className="col-md-4">
                <input
                  type="number"
                  name={item.name}
                  value={(formData as any)[item.name]}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Quantity"
                />
              </div>
              <div className="col-md-4 d-flex align-items-center">
                <span className="text-muted">0.00 m³</span>
              </div>
            </div>
          ))}

          {/* <hr /> */}

          {/* Stormwater Pipes */}
          <h5 className="text-primary mb-3">
            Stormwater Pipes (Diameter & Length)
          </h5>

          {[
            { label: "1500 mm", name: "pipe1500" },
            { label: "1200 mm", name: "pipe1200" },
            { label: "900 mm", name: "pipe900" },
          ].map((item) => (
            <div className="row mb-3" key={item.name}>
              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  {item.label}
                </label>
              </div>
              <div className="col-md-4">
                <input
                  type="number"
                  name={item.name}
                  value={(formData as any)[item.name]}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Length"
                />
              </div>
              <div className="col-md-4 d-flex align-items-center">
                <span className="text-muted">0.00 m³</span>
              </div>
            </div>
          ))}


          {/* Other Volume */}
          <div className="row mb-4">
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Other Volume (m³)
              </label>
            </div>
            <div className="col-md-4">
              <input
                type="number"
                name="otherVolume"
                value={formData.otherVolume}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter volume"
              />
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <span className="text-muted">0.00 m³</span>
            </div>
          </div>

          <hr />
          {/* Buttons */}
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-outline-secondary px-4"
              onClick={() => navigate(-1)}
            >
              Back
            </button>

            <button
              className="btn btn-primary px-4"
              onClick={() => navigate("/AdditionalStorage")}
            >
              Next →
            </button>
          </div>

        </div>
      </div>
    </div>
  </AdminLayout>
  );
};

export default AdditionalStoragee;
