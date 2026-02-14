import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../layout/AdminLayout";

const AdditionalStoragee: React.FC = () => {
  const navigate = useNavigate();
const [soakwells, setSoakwells] = useState<
  { size: string; quantity: string }[]
>([
   { size: "", quantity: "" } 
]);

const [pipes, setPipes] = useState<
  { diameter: string; length: string }[]
>([{ diameter: "", length: "" }]);  



const addSoakwell = () => {
  setSoakwells([...soakwells, { size: "", quantity: "" }]);
};

const removeSoakwell = (index: number) => {
  const updated = [...soakwells];
  updated.splice(index, 1);
  setSoakwells(updated);
};

const handleSoakwellChange = (
  index: number,
  field: string,
  value: string
) => {
  const updated = [...soakwells];
  (updated[index] as any)[field] = value;
  setSoakwells(updated);
};


/* ================= Stormwater Pipes ================= */

const addPipe = () => {
  setPipes([...pipes, { diameter: "", length: "" }]);
};

const removePipe = (index: number) => {
  if (pipes.length === 1) return; // prevent deleting last row
  const updated = [...pipes];
  updated.splice(index, 1);
  setPipes(updated);
};

const handlePipeChange = (
  index: number,
  field: string,
  value: string
) => {
  const updated = [...pipes];
  (updated[index] as any)[field] = value;
  setPipes(updated);
};
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
    <div className="container">
  <div className=" border-0 rounded-4">
    {/* <div className="card-header bg-white"> */}
      {/* <h4 className="mb-0">Additional Storage</h4> */}
    {/* </div> */}

    {/* <div className="card-body"> */}

      {/* ================= Catchment Area Storage Card ================= */}
      <div className="card mb-4 border-0 shadow-sm rounded-3">
        <div className="card-header bg-light">
          <h6 className="mb-0 text-success">
            Catchment Area Storage (Ponding)
          </h6>
        </div>
        <div className="card-body">

          {[
            { label: "Roof", name: "roofPonding" },
            { label: "Carpark", name: "carparkPonding" },
            { label: "Landscaping", name: "landscapingPonding" },
          ].map((item) => (
            <div className="row mb-3" key={item.name}>
              <div className="col-md-4">
                <label className="fw-semibold">
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
                  placeholder="value"
                />
              </div>
              <div className="col-md-4 d-flex align-items-center">
                <span className="text-muted">0.00 m³</span>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* ================= Precast Soakwells Card ================= */}
      <div className="card mb-4 border-0 shadow-sm rounded-3">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h6 className="mb-0 text-success">
            Precast Soakwells
          </h6>

          <button
            type="button"
            className="btn btn-sm btn-outline-success"
            onClick={addSoakwell}
          >
            + Add
          </button>
        </div>

        <div className="card-body">

          {soakwells.map((item, index) => (
            <div className="row mb-3 align-items-center" key={index}>
              <div className="col-md-4">
                <select
                  className="form-select"
                  value={item.size}
                  onChange={(e) =>
                    handleSoakwellChange(index, "size", e.target.value)
                  }
                >
                  <option value="">Select Size</option>
                  <option value="1200x1500">Ø1200 x 1500</option>
                  <option value="1800x1500">Ø1800 x 1500</option>
                  <option value="1200x900">Ø1200 x 900</option>
                </select>
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    handleSoakwellChange(index, "quantity", e.target.value)
                  }
                />
              </div>

              <div className="col-md-3 text-muted">
                0.00 m³
              </div>

              <div className="col-md-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeSoakwell(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* ================= Stormwater Pipes Card ================= */}
   {/* ================= Stormwater Pipes Card ================= */}
<div className="card mb-4 border-0 shadow-sm rounded-3">
  <div className="card-header bg-light d-flex justify-content-between align-items-center">
    <h6 className="mb-0 text-success">
      Stormwater Pipes
    </h6>

    <button
      type="button"
      className="btn btn-sm btn-outline-success"
      onClick={addPipe}
    >
      + Add
    </button>
  </div>

  <div className="card-body">

    {pipes.map((item, index) => (
      <div className="row mb-3 align-items-center" key={index}>
        <div className="col-md-4">
          <select
            className="form-select"
            value={item.diameter}
            onChange={(e) =>
              handlePipeChange(index, "diameter", e.target.value)
            }
          >
            <option value="">Select Diameter</option>
            <option value="1500">1500 mm</option>
            <option value="1200">1200 mm</option>
            <option value="900">900 mm</option>
          </select>
        </div>

        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Length"
            value={item.length}
            onChange={(e) =>
              handlePipeChange(index, "length", e.target.value)
            }
          />
        </div>

        <div className="col-md-3 text-muted">
          0.00 m³
        </div>

        <div className="col-md-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => removePipe(index)}
          >
            Remove
          </button>
        </div>
      </div>
    ))}

  </div>
</div>


      {/* Buttons */}
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-outline-secondary px-4"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <button
          className="btn btn-success px-4"
          onClick={() => navigate("/AtlanMegaVault")}
        >
          Next →
        </button>
      </div>

    {/* </div> */}
  </div>
</div>

    
  </AdminLayout>
  );
};

export default AdditionalStoragee;
