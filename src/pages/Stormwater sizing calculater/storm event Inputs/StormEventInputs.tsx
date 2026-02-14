import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../layout/AdminLayout";

const StormEventInput = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    aep: "1",
    rainfallIncrease: "0.0",
    duration: "540",
    roofArea: "10000",
    roofCoeff: "1.00",
    carparkArea: "1000",
    carparkCoeff: "0.90",
    landscapeArea: "0",
    landscapeCoeff: "0.30",
    soilPermeability: "10",
    detentionAllowance: "0",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    console.log(formData);
    navigate("/AdditionalStoragee"); // change as needed
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <AdminLayout>
      <div className="container ">
      <div className="  order-0 rounded-2">
        <div className="  bg-white text-dark">
          {/* <h4 className="mb-0">Storm Event Input</h4> */}
        </div>

     <div className="card-body p-4">

  {/* ================= General Inputs Card ================= */}
  <div className="card mb-4 border-0 shadow-sm rounded-3">
    <div className="card-header bg-light">
      <h6 className="mb-0 text-success">General Inputs</h6>
    </div>

    <div className="card-body">
      <div className="row g-4">

        <div className="col-md-6">
  <label className="form-label fw-semibold">
    Annual Exceedence Probability (AEP) %
  </label>

  <select
    name="aep"
    value={formData.aep}
    onChange={handleChange}
    className="form-select"
  >
    <option value="">Select AEP</option>
    <option value="50">50% (2 yr ARI)</option>
    <option value="20">20% (5 yr ARI)</option>
    <option value="10">10% (10 yr ARI)</option>
    <option value="5">5% (20 yr ARI)</option>
    <option value="2">2% (50 yr ARI)</option>
    <option value="1">1% (100 yr ARI)</option>
    <option value="0.5">0.5% (200 yr ARI)</option>
  </select>

  <small className="text-muted">(1% = 100 yr ARI)</small>
</div>


        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Rainfall Intensity Increase Allowance %
          </label>
          <input
            type="number"
            name="rainfallIncrease"
            value={formData.rainfallIncrease}
            onChange={handleChange}
            className="form-control"
          />
          <small className="text-muted">(Future expansion)</small>
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Maximum Storm Duration (mins)
          </label>

          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="form-select"
          >
            <option value="60">60 mins</option>
            <option value="120">120 mins</option>
            <option value="240">240 mins</option>
            <option value="360">360 mins</option>
            <option value="540">540 mins (9 hrs)</option>
          </select>

          <small className="text-muted">(9 hrs)</small>
        </div>

      </div>
    </div>
  </div>

  {/* ================= Catchment Area Card ================= */}
  <div className="card mb-4 border-0 shadow-sm rounded-3">
    <div className="card-header bg-light">
      <h6 className="mb-0 text-success">Catchment Area</h6>
    </div>

    <div className="card-body">
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Surface</th>
              <th>Area (m²)</th>
              <th>Runoff Coefficient</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Roof</td>
              <td>
                <input
                  type="number"
                  name="roofArea"
                  value={formData.roofArea}
                  onChange={handleChange}
                  className="form-control border-0"
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  name="roofCoeff"
                  value={formData.roofCoeff}
                  onChange={handleChange}
                  className="form-control border-0"
                />
              </td>
            </tr>

            <tr>
              <td>Carpark</td>
              <td>
                <input
                  type="number"
                  name="carparkArea"
                  value={formData.carparkArea}
                  onChange={handleChange}
                  className="form-control border-0"
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  name="carparkCoeff"
                  value={formData.carparkCoeff}
                  onChange={handleChange}
                  className="form-control border-0"
                />
              </td>
            </tr>

            <tr>
              <td>Landscaping</td>
              <td>
                <input
                  type="number"
                  name="landscapeArea"
                  value={formData.landscapeArea}
                  onChange={handleChange}
                  className="form-control border-0"
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  name="landscapeCoeff"
                  value={formData.landscapeCoeff}
                  onChange={handleChange}
                  className="form-control border-0"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  {/* ================= Additional Inputs Card ================= */}
  <div className="card mb-4 border-0 shadow-sm rounded-3">
    <div className="card-header bg-light">
      <h6 className="mb-0 text-success">Additional Inputs</h6>
    </div>

    <div className="card-body">
      <div className="row g-4">

        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Soil Permeability (m/day)
          </label>
          <input
            type="number"
            name="soilPermeability"
            value={formData.soilPermeability}
            onChange={handleChange}
            className="form-control"
          />
          <small className="text-muted">
            (= 6.9444 mm/day approx)
          </small>
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Detention Tank Discharge Allowance (LPS)
          </label>
          <input
            type="number"
            name="detentionAllowance"
            value={formData.detentionAllowance}
            onChange={handleChange}
            className="form-control"
          />
          <small className="text-muted">
            (= 0.0 m³/hr)
          </small>
        </div>

      </div>
    </div>
  </div>

  {/* Buttons */}
  <div className="d-flex justify-content-between mt-4">
    <button
      type="button"
      className="btn btn-outline-secondary px-4"
      onClick={handleBack}
    >
      ← Back
    </button>

    <button
      type="button"
      className="btn btn-success px-4"
      onClick={handleNext}
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

export default StormEventInput;
