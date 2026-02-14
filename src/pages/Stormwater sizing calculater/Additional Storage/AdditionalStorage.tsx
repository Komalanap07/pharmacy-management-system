import React, { useState } from 'react'
import ConfigurationSummary from './CalculationSummary'
import AdminLayout from '../../../layout/AdminLayout'
// import ConfigurationSummary from '../pages/CalculationSummary'

export default function AdditionalStorage() {
  /* ---------------- STATIC DATA ---------------- */

  const [formData, setFormData] = useState({
    targetStorageVolume: 250,
    stackHeight: 3,
    maxLength: 20,
    maxWidth: 15,
    systemType: 'Detention',
    optimization: 'Auto',
    numberOfInlets: 2,
    numberOfOutlets: 1
  })

  const [showSummary, setShowSummary] = useState(false)

  /* ---------------- CALCULATIONS ---------------- */

  const MODULE_VOLUME = 4.208
  const MODULE_LENGTH = 3.9
  const MODULE_WIDTH = 1.2
  const MODULE_HEIGHT = 0.95

  const totalModules = Math.ceil(
    formData.targetStorageVolume / MODULE_VOLUME
  )

  const achievedStorage = +(totalModules * MODULE_VOLUME).toFixed(2)

  const modulesPerLength = Math.floor(
    formData.maxLength / MODULE_LENGTH
  )

  const modulesPerWidth = Math.floor(
    formData.maxWidth / MODULE_WIDTH
  )

  const systemHeight = +(formData.stackHeight * MODULE_HEIGHT).toFixed(2)
  const systemLength = +(modulesPerLength * MODULE_LENGTH).toFixed(2)
  const systemWidth = +(modulesPerWidth * MODULE_WIDTH).toFixed(2)

  const variance = +(
    ((achievedStorage - formData.targetStorageVolume) /
      formData.targetStorageVolume) *
    100
  ).toFixed(1)

  const isValid = achievedStorage >= formData.targetStorageVolume * 0.98

  /* ---------------- HANDLER ---------------- */

  const handleChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value })
  }

  /* ---------------- UI ---------------- */

  return (
  <AdminLayout>
      <div className="container py-4">
      <div className="row">

        {/* LEFT SIDE */}
        <div className="col-lg-10">

          {/* SYSTEM PARAMETERS */}
          <div className="card mb-3 shadow-sm">
            <div
              className="card-header bg-light"
              data-bs-toggle="collapse"
              data-bs-target="#parameters"
              style={{ cursor: 'pointer' }}
            >
              <strong>System Parameters</strong>
            </div>

            <div id="parameters" className="collapse show">
              <div className="card-body">
                <div className="row g-3">

                  <div className="col-md-6">
                    <label className="form-label">
                      Target Storage Volume (m³)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.targetStorageVolume}
                      onChange={(e) =>
                        handleChange(
                          'targetStorageVolume',
                          +e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Stack Height</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.stackHeight}
                      onChange={(e) =>
                        handleChange('stackHeight', +e.target.value)
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Max Length (m)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.maxLength}
                      onChange={(e) =>
                        handleChange('maxLength', +e.target.value)
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Max Width (m)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.maxWidth}
                      onChange={(e) =>
                        handleChange('maxWidth', +e.target.value)
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">System Type</label>
                    <select
                      className="form-select"
                      value={formData.systemType}
                      onChange={(e) =>
                        handleChange('systemType', e.target.value)
                      }
                    >
                      <option>Detention</option>
                      <option>Infiltration</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Optimization</label>
                    <select
                      className="form-select"
                      value={formData.optimization}
                      onChange={(e) =>
                        handleChange('optimization', e.target.value)
                      }
                    >
                      <option>Auto</option>
                      <option>Manual</option>
                    </select>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* INLET / OUTLET */}
          <div className="card mb-3 shadow-sm">
            <div
              className="card-header bg-light"
              data-bs-toggle="collapse"
              data-bs-target="#connections"
              style={{ cursor: 'pointer' }}
            >
              <strong>Inlet / Outlet Configuration</strong>
            </div>

            <div id="connections" className="collapse show">
              <div className="card-body">
                <div className="row g-3">

                  <div className="col-md-6">
                    <label className="form-label">Number of Inlets</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.numberOfInlets}
                      onChange={(e) =>
                        handleChange(
                          'numberOfInlets',
                          +e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Number of Outlets</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.numberOfOutlets}
                      onChange={(e) =>
                        handleChange(
                          'numberOfOutlets',
                          +e.target.value
                        )
                      }
                    />
                  </div>

                </div>

                <button
                  className="btn btn-primary mt-4 w-100"
                  onClick={() => setShowSummary(true)}
                >
                  Calculate Configuration
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="col-lg-10">
          {showSummary && (
            <ConfigurationSummary
              layoutL={modulesPerLength}
              layoutW={modulesPerWidth}
              layoutH={formData.stackHeight}
              totalModules={totalModules}
              achievedStorage={achievedStorage}
              targetStorage={formData.targetStorageVolume}
              variance={variance}
              systemLength={systemLength}
              systemWidth={systemWidth}
              systemHeight={systemHeight}
              excavationDepth={3.5}
              excavationVolume={580.2}
              backfillVolume={328.7}
              geotextileArea={425.3}
              linerArea={425.3}
              isValid={isValid}
            />
          )}
        </div>

      </div>
    </div>
  </AdminLayout>
  )
}
