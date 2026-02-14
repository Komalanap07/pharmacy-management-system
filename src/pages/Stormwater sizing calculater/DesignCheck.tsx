import React from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layout/AdminLayout";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import "./DesignCheck.css";
export default function DesignCheck({ volumeRequired, volumeProvided }) {
  const navigate = useNavigate();

  const isSufficient = volumeProvided >= volumeRequired;

  return (
   <AdminLayout>
     <div className="container mt-4">

      {/* ================= SUCCESS / STATUS BANNER ================= */}
      {/* <div
  className={`status-card ${
    isSufficient ? "success" : "danger"
  }`}
>
  <div className="status-content">
   
<div className="status-icon">
  {isSufficient ? (
    <FaCheckCircle size={60} />
  ) : (
    <FaTimesCircle size={60} />
  )}
</div>


    <h2 className="status-text">
      {isSufficient
        ? "VOL. SUFFICIENT"
        : "VOL. NOT SUFFICIENT"}
    </h2>
  </div>
</div> */}
<div
  className={`status-card ${
    isSufficient ? "success" : "danger"
  }`}
>
  <div className="status-content">
    <div
      className={`status-icon ${
        isSufficient ? "text-success" : "text-danger"
      }`}
    >
      {isSufficient ? (
        <FaCheckCircle size={60} />
      ) : (
        <FaTimesCircle size={60} />
      )}
    </div>

    <h2
      className={`status-text ${
        isSufficient ? "text-success" : "text-danger"
      }`}
    >
      {isSufficient
        ? "VOL. SUFFICIENT"
        : "VOL. NOT SUFFICIENT"}
    </h2>
  </div>
</div>


      {/* ================= DESIGN CHECK SUMMARY ================= */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">Design Check Summary</h5>
        </div>

        <div className="card-body">
          <div className="row g-4">

            {/* Volume Required */}
            <div className="col-md-6">
              <div
                className="p-4 rounded-4 border"
                style={{
                  backgroundColor: "#eef2f7",
                  borderColor: "#cfd8e3",
                }}
              >
                <div className="text-muted mb-2">
                  Volume Required
                </div>
                <h2 className="fw-bold mb-0">
                  {volumeRequired.toFixed(2)}
                </h2>
                <small className="text-muted">m³</small>
              </div>
            </div>

            {/* Volume Provided */}
            <div className="col-md-6">
              <div
                className="p-4 rounded-4 border"
                style={{
                  backgroundColor: "#e8f5ec",
                  borderColor: "#b7e1c2",
                }}
              >
                <div className="text-muted mb-2">
                  Volume Provided
                </div>
                <h2 className="fw-bold text-success mb-0">
                  {volumeProvided.toFixed(2)}
                </h2>
                <small className="text-muted">m³</small>
              </div>
            </div>

          </div>

          {/* Buttons */}
         

        </div>
        
      </div>
       <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-outline-secondary px-4"
              onClick={() => navigate(-1)}
            >
              Back
            </button>

            <button
              className="btn btn-success px-4"
              onClick={() => navigate("/hydrograph")}
            >
            hydrograph
            </button>
          </div>
    </div>
   </AdminLayout>
  );
}
