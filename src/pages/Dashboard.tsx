// import { NavLink, useNavigate } from "react-router-dom";
import { useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { NavLink,useNavigate } from 'react-router-dom'
type AdminDashboardProps = {
  onNext: () => void
}


const Dashboard = () => {

  const [selectedType, setSelectedType] = useState<string>("");
  const navigate = useNavigate();

  const handleProceed = () => {
    if (selectedType === "stormwater") {
      navigate("/NewProjectStormwater");
    } else if (selectedType === "ecocube") {
      navigate("/NewProjectEcocube");
    }
  };

  const stats = [
    { label: 'Total Projects', value: 24, helper: 'All active & archived' },
    { label: 'Completed This Month', value: 8, helper: 'Verified designs' },
    { label: 'Proposals Generated', value: 15, helper: 'PDF proposals' },
    {
      label: 'Avg. Completion Time',
      value: '2.5 d',
      helper: 'Design to approval'
    }
  ]

  return (
    <AdminLayout>
      <div className='container py-4'>
        {/* KPI Stats */}
        <div className='row g-4 mb-4'>
          {stats.map(stat => (
            <div key={stat.label} className='col-12 col-md-6 col-lg-3'>
              <div className='card border shadow-sm h-100'>
                <div className='card-body'>
                  <p className='text-muted small mb-2'>{stat.label}</p>
                  <h4 className='fw-semibold mb-1'>{stat.value}</h4>
                  <p className='text-muted small mb-0'>{stat.helper}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className='card border shadow-sm mb-4'>
          <div className='card-body'>
            <button    
          data-bs-toggle="modal"
          data-bs-target="#projectModal" className='btn btn-primary px-4'>
              + New Project
            </button>
            {/* <NavLink to='/ProjectType' className='btn btn-primary px-4'>
              + New Project
            </NavLink> */}
          </div>
        </div>
      </div>
      
{/* Project type model */}
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
    </AdminLayout>
  )
}

export default Dashboard
