import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AdminLayout from "../../layout/AdminLayout";

const NewProjectStormWater: React.FC = () => {
  const [projectName, setProjectName] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [calculationType, setCalculationType] = useState("Detention System");
  const [customerType, setCustomerType] = useState("Direct Customer");

  return (
  <AdminLayout>
      <div className="container-fluid py-4 px-4 bg-body-tertiary min-vh-100">
      {/* Page Header */}
      {/* <div className="mb-4">
        <h2 className="fw-bold mb-1">New Project</h2>
        <p className="text-muted mb-0">
          Create a new engineering calculation project
        </p>
      </div> */}

      {/* Card */}
      <div className="card border-0 shadow-sm rounded-3">
        <div className="card-body p-4">

          {/* Section Title */}
          {/* <div className="mb-4">
            <h5 className="fw-semibold mb-1">Project</h5>
            <small className="text-muted">
              Enter the basic details for your new project
            </small>
          </div> */}

          {/* Project Name */}
          <div className="mb-3">
            <label className="form-label fw-medium">
              Project Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control"
              placeholder="e.g., Melbourne Shopping Centre - Detention System"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          {/* Site Address */}
          <div className="mb-3">
            <label className="form-label fw-medium">
              Site Address <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., 123 Main Street, Melbourne VIC 3000"
              value={siteAddress}
              onChange={(e) => setSiteAddress(e.target.value)}
            />
          </div>

          {/* Row */}
          <div className="row">
            {/* Calculation Type */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-medium">
                Calculation Type <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                value={calculationType}
                onChange={(e) => setCalculationType(e.target.value)}
              >
                <option>Detention System</option>
                <option>Retention System</option>
              </select>
            </div>

            {/* Customer Type */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-medium">
                Customer Type <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                value={customerType}
                onChange={(e) => setCustomerType(e.target.value)}
              >
                <option>Direct Customer</option>
                <option>Distributor</option>
              </select>
            </div>
          </div>

          {/* Selected Highlight Box */}
          <div className="border rounded-3 bg-primary bg-opacity-10 p-3 mt-2">
            <h6 className="fw-semibold mb-1">
              Selected: {calculationType}
            </h6>
            <small className="text-muted">
              Calculate module configuration for known storage volume with
              detention requirements.
            </small>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button className="btn btn-outline-secondary px-4">
              Cancel
            </button>

            {/* <button className="btn btn-primary px-4">
              → Start Engineering
            </button> */}
            <NavLink to='/StormEventInput' className="btn btn-success px-4">
 → Start Engineering
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
  );
};

export default NewProjectStormWater;
