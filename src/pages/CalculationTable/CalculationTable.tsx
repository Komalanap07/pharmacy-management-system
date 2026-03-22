import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import type { TableColumn } from 'react-data-table-component'
const BASE_URL = import.meta.env.VITE_API_BASE_URL
import axios from 'axios'
interface CalculationTablePros {
  projectId: string | undefined
}
const CalculationTable: React.FC<CalculationTablePros> = ({ projectId }) => {
  const [tableData, setTableData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/stormwater/${projectId}`
        )

        const graph = response.data.data.tank_outputs.graph

        const formattedData = graph.minutes.map(
          (minute: number, index: number) => ({
            minutes: minute,
            minutesSelected: minute,
            rainfallIntensity: graph.mm_per_min[index] ?? 0,
            inflowVolume: graph.inflow_volume[index] ?? 0,
            drainage: graph.drainage[index] ?? 0,
            orificeDischarge: graph.orifice_discharge[index] ?? 0,
            netVolume: graph.net_volume[index] ?? 0
          })
        )

        setTableData(formattedData)
      } catch (error) {
        console.error('Error fetching table data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTableData()
  }, [])

  const peakNetVolume = useMemo(() => {
    if (!tableData.length) return 0
    return Math.max(...tableData.map(d => d.netVolume))
  }, [tableData])

  const columns: TableColumn<any>[] = [
    {
      name: 'Minutes',
      selector: row => row.minutes,
      sortable: true,
      center: true
    },
    {
      name: 'Minutes Selected',
      selector: row => row.minutesSelected,
      sortable: true,
      center: true
    },
    {
      name: 'Rainfall Intensity (mm/min)',
      selector: row => row.rainfallIntensity.toFixed(4),
      sortable: true,
      center: true
    },
    {
      name: 'Inflow Volume (L)',
      selector: row => row.inflowVolume.toFixed(2),
      sortable: true,
      center: true
    },
    {
      name: 'Drainage (L)',
      selector: row => row.drainage.toFixed(2),
      sortable: true,
      center: true
    },
    {
      name: 'Orifice Discharge (L)',
      selector: row => row.orificeDischarge.toFixed(2),
      sortable: true,
      center: true
    },
    {
      name: 'Net Volume (L)',
      cell: row => (
        <span
          className={
            row.netVolume === peakNetVolume && row.netVolume > 0
              ? 'text-green-600 font-bold'
              : ''
          }
        >
          {row.netVolume.toFixed(2)}
        </span>
      ),
      sortable: true,
      center: true
    }
  ]

  return (
    <div className='my-4'>
      <div className='card shadow-sm rounded-1'>
        <div className='card-body p-0'>
          <DataTable
            columns={columns}
            data={tableData}
            // pagination
            // paginationPerPage={30}
            highlightOnHover
            striped
            responsive
            progressPending={loading}
            fixedHeaderScrollHeight='500px'
            fixedHeader
          />
        </div>
      </div>
    </div>
  )
}

export default CalculationTable
