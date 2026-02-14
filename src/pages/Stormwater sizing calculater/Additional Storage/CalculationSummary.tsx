import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ConfigurationSummary() {
  /* ---------------- STATIC DATA ---------------- */

  const layoutL = 5
  const layoutW = 4
  const layoutH = 3

  const totalModules = 60

  const achievedStorage = 252.5
  const targetStorage = 250
  const variance = +(
    ((achievedStorage - targetStorage) / targetStorage) *
    100
  ).toFixed(1)

  const systemLength = 19.5
  const systemWidth = 14.4
  const systemHeight = 2.85

  const excavationDepth = 3.5
  const excavationVolume = 580.2
  const backfillVolume = 328.7

  const geotextileArea = 425.3
  const linerArea = 425.3

  const isValid = achievedStorage >= targetStorage * 0.98

  /* ---------------- UI ---------------- */

  return (
    <div className="card shadow-sm">
      <div className="card-body">

        {/* HEADER */}
        <h5 className="mb-4 fw-bold">
          Configuration Summary
        </h5>

        {/* ===============================
            MODULE CARDS
        =============================== */}

        <div className="row mb-4">

          {/* Layout Card */}
          <div className="col-md-6 mb-3">
            <div className="border rounded p-3 h-100 bg-light">
              <h6 className="fw-semibold mb-3">
                Module Layout
              </h6>

              <div className="d-flex justify-content-between mb-2">
                <span>Layout (L × W × H)</span>
                <strong>
                  {layoutL} × {layoutW} × {layoutH}
                </strong>
              </div>

              <div className="d-flex justify-content-between">
                <span>Storage Achieved</span>
                <strong className="text-success">
                  {achievedStorage.toFixed(1)} m³
                </strong>
              </div>
            </div>
          </div>

          {/* Total Modules Card */}
          <div className="col-md-6 mb-3">
            <div className="border rounded p-3 h-100 bg-light">
              <h6 className="fw-semibold mb-3">
                Total Modules
              </h6>

              <div className="d-flex justify-content-between mb-2">
                <span>Total Modules</span>
                <strong>{totalModules}</strong>
              </div>

              <div className="d-flex justify-content-between">
                <span>
                  Target {targetStorage.toFixed(1)} m³
                </span>
                <strong
                  className={
                    variance >= 0
                      ? 'text-success'
                      : 'text-danger'
                  }
                >
                  {variance > 0 ? '+' : ''}
                  {variance.toFixed(1)}%
                </strong>
              </div>
            </div>
          </div>

        </div>

        {/* ===============================
            VALIDATION MESSAGE
        =============================== */}

        <div
          className={`alert ${
            isValid ? 'alert-success' : 'alert-danger'
          } d-flex align-items-center`}
          role="alert"
        >
          {isValid ? (
            <span className="me-2">✔</span>
          ) : (
            <span className="me-2">✖</span>
          )}

          {isValid
            ? 'Calculation Valid – Storage achieved is within acceptable tolerance.'
            : 'Below Required Storage – Configuration does not meet target.'}
        </div>

        {/* ===============================
            SYSTEM DIMENSIONS
        =============================== */}

        <h6 className="fw-semibold mt-4 mb-3">
          System Dimensions
        </h6>

        <div className="table-responsive">
          <table className="table table-bordered table-sm">
            <thead className="table-light">
              <tr>
                <th>Item</th>
                <th>Specification</th>
                <th>Quantity / Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Module Dimensions</td>
                <td>3900 × 1200 × 950 mm</td>
                <td>{totalModules} ea</td>
              </tr>
              <tr>
                <td>System Length</td>
                <td>{systemLength} m</td>
                <td>1 ea</td>
              </tr>
              <tr>
                <td>System Width</td>
                <td>{systemWidth} m</td>
                <td>1 ea</td>
              </tr>
              <tr>
                <td>
                  System Height ({layoutH} stacks)
                </td>
                <td>{systemHeight} m</td>
                <td>1 ea</td>
              </tr>
              <tr>
                <td>Excavation Depth</td>
                <td>{excavationDepth} m (inc. base)</td>
                <td>1 ea</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ===============================
            BILL OF QUANTITIES
        =============================== */}

        <h6 className="fw-semibold mt-4 mb-3">
          Bill of Quantities
        </h6>

        <div className="table-responsive">
          <table className="table table-bordered table-sm">
            <thead className="table-light">
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Quantity / Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Stormwater Modules</td>
                <td>Atlan XL Module 3900 × 1200 × 950</td>
                <td>{totalModules} ea</td>
              </tr>
              <tr>
                <td>Excavation</td>
                <td>Bulk earthworks</td>
                <td>{excavationVolume.toFixed(1)} m³</td>
              </tr>
              <tr>
                <td>Backfill Material</td>
                <td>Compacted fill</td>
                <td>{backfillVolume.toFixed(1)} m³</td>
              </tr>
              <tr>
                <td>Geotextile</td>
                <td>Non-woven 200gsm</td>
                <td>{geotextileArea.toFixed(1)} m²</td>
              </tr>
              <tr>
                <td>Liner (if infiltration)</td>
                <td>HDPE 1.5mm</td>
                <td>{linerArea.toFixed(1)} m²</td>
              </tr>
              <tr>
                <td>Inlet Structures</td>
                <td>Precast concrete</td>
                <td>2 ea</td>
              </tr>
              <tr>
                <td>Outlet Structures</td>
                <td>Precast concrete with orifice</td>
                <td>1 ea</td>
              </tr>
            </tbody>
          </table>
        </div>
      <div className='d-flex justify-content-end'>
        <NavLink to={'/BOQPricing'} className={'btn btn-primary'}>
        View Pricing & BOQ
        </NavLink>
      </div>
      </div>
    </div>
  )
}
