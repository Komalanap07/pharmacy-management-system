import React from 'react'
import AdminLayout from '../../layout/AdminLayout'

type BOQItem = {
  category: string
  item: string
  description: string
  quantity: number
  unit: string
  unitCost: number
  source: string
}

export default function BOQPricing() {
  /* ---------------- STATIC DATA ---------------- */

  const markupPercentage = 25

  const items: BOQItem[] = [
    {
      category: 'Modules',
      item: 'Atlan XL Stormwater Module',
      description: '3900 x 1200 x 950mm modular storage unit',
      quantity: 60,
      unit: 'ea',
      unitCost: 285,
      source: 'Calculator'
    },
    {
      category: 'Geofabric',
      item: 'Geotextile Non-Woven',
      description: '200gsm separation fabric',
      quantity: 425.3,
      unit: 'm²',
      unitCost: 8.5,
      source: 'Calculator'
    },
    {
      category: 'Liner',
      item: 'HDPE Liner 1.5mm',
      description: 'Impermeable liner for detention',
      quantity: 425.3,
      unit: 'm²',
      unitCost: 22,
      source: 'Calculator'
    },
    {
      category: 'Backfill',
      item: 'Compacted Fill Material',
      description: 'Clean fill, compacted to 95% MDD',
      quantity: 328.7,
      unit: 'm³',
      unitCost: 35,
      source: 'Calculator'
    },
    {
      category: 'Freight',
      item: 'Transport & Delivery',
      description: 'Delivery to site (Melbourne Metro)',
      quantity: 1,
      unit: 'lot',
      unitCost: 2850,
      source: 'System'
    },
    {
      category: 'Structures',
      item: 'Inlet Structure',
      description: 'Precast concrete inlet pit',
      quantity: 2,
      unit: 'ea',
      unitCost: 850,
      source: 'Calculator'
    },
    {
      category: 'Structures',
      item: 'Outlet Structure',
      description: 'Precast outlet pit with orifice plate',
      quantity: 1,
      unit: 'ea',
      unitCost: 1250,
      source: 'Calculator'
    }
  ]

  /* ---------------- CALCULATIONS ---------------- */

  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.unitCost,
    0
  )

  const markupValue = (subtotal * markupPercentage) / 100
  const total = subtotal + markupValue

  /* ---------------- UI ---------------- */

  return (
   <AdminLayout>
     <div className="container-fluid py-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">
            Bill of Quantities & Pricing
          </h3>
          <small className="text-muted">
            Review and export project BOQ with pricing
          </small>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm">
            Pricing Sheet v1.0
          </button>
          <button className="btn btn-outline-primary btn-sm">
            Edit Pricing
          </button>
          <button className="btn btn-primary btn-sm">
            Generate Proposal
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <small className="text-muted">
                Subtotal (Materials)
              </small>
              <h3 className="fw-bold mt-2">
                ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <small className="text-muted">
                Markup ({markupPercentage}%)
              </small>
              <h3 className="fw-bold mt-2 text-warning">
                ${markupValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h3>
            </div>
          </div>
        </div>

      </div>

      {/* TABLE */}
      <div className="card shadow-sm border-0">
        <div className="card-body">

          <div className="d-flex justify-content-between mb-3">
            <h5 className="fw-semibold mb-0">
              Bill of Quantities
            </h5>

            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary btn-sm">
                Export Excel
              </button>
              <button className="btn btn-outline-secondary btn-sm">
                Export PDF
              </button>
              <button className="btn btn-outline-secondary btn-sm">
                Export CSV
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Item</th>
                  <th>Description</th>
                  <th>Qty / Unit</th>
                  <th>Unit Cost</th>
                  <th>Total Cost</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const totalCost = item.quantity * item.unitCost

                  return (
                    <tr key={index}>
                      <td className="fw-medium">
                        {item.item}
                      </td>
                      <td className="text-muted">
                        {item.description}
                      </td>
                      <td>
                        {item.quantity} {item.unit}
                      </td>
                      <td>
                        ${item.unitCost.toLocaleString()}
                      </td>
                      <td className="fw-semibold">
                        ${totalCost.toLocaleString(undefined, {
                          minimumFractionDigits: 2
                        })}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            item.source === 'System'
                              ? 'bg-secondary'
                              : 'bg-primary'
                          }`}
                        >
                          {item.source}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* TOTAL BAR */}
      <div className="card mt-4 border-0 bg-dark text-white">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Total (ex GST)</h5>
          <h4 className="mb-0 fw-bold">
            ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h4>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-outline-secondary">
          ← Back to Calculator
        </button>

        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary">
            Save BOQ
          </button>
          <button className="btn btn-primary">
            Generate Proposal
          </button>
        </div>
      </div>

    </div>
   </AdminLayout>
  )
}
