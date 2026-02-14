import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const ProjectType = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const navigate = useNavigate();

  const handleProceed = () => {
    if (selectedType === "stormwater") {
      navigate("/stormwater");
    } else if (selectedType === "ecocube") {
      navigate("/ecocube");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 text-center">
        <h3>Select Project Type</h3>

        {/* Button to Open Modal */}
        <button
          className="btn btn-primary mt-3"
          data-bs-toggle="modal"
          data-bs-target="#projectModal"
        >
          Choose Project
        </button>
      </div>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="projectModal"
        tabIndex={-1}
        aria-labelledby="projectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="projectModalLabel">
                Select Project Type
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="projectType"
                  value="stormwater"
                  onChange={(e) => setSelectedType(e.target.value)}
                />
                <label className="form-check-label">
                  Stormwater Sizing Calculator
                </label>
              </div>

              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="projectType"
                  value="ecocube"
                  onChange={(e) => setSelectedType(e.target.value)}
                />
                <label className="form-check-label">
                  Ecocube Cost Calculator
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                disabled={!selectedType}
                onClick={handleProceed}
              >
                Proceed
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectType;
