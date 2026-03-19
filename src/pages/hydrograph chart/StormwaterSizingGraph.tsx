import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const BASE_URL = import.meta.env.VITE_API_BASE_URL
interface HydrographProps {
  projectId: string | undefined
}

const Hydrograph: React.FC<HydrographProps> = ({ projectId }) => {
  const [data, setData] = useState<any[]>([])
  const [maxValue, setMaxValue] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchGraphData = async () => {
      // const {projectId} = useParams();
      console.log('hydrograph', projectId)
      try {
        // const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(
          `${BASE_URL}/stormwater/${projectId}`
        )

        const graph = response.data.data.tank_outputs.graph

        const formattedData = graph.minutes.map(
          (minute: number, index: number) => ({
            minute: minute,
            inflow: graph.inflow_volume[index] ?? 0,
            drainage: graph.drainage[index] ?? 0,
            net: graph.net_volume[index] ?? 0,
            orifice: graph.orifice_discharge[index] ?? 0,
            required: 0
          })
        )

        // 🔹 Calculate max value for stable scaling
        const allValues = [
          ...graph.inflow_volume,
          ...graph.drainage,
          ...graph.net_volume,
          ...graph.orifice_discharge
        ]

        const calculatedMax = Math.max(...allValues)
        setMaxValue(calculatedMax)

        setData(formattedData)
      } catch (error) {
        console.error('Error fetching hydrograph data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGraphData()
  }, [])

  return (
    <div className='card shadow-sm rounded-3 p-2 mt-3 boder-0'>
      <h5 className='fw-bold mb-3'>Hydrograph</h5>

      {loading ? (
        <div className='text-center my-4'>
          <div className='spinner-border text-primary' />
        </div>
      ) : (
        <ResponsiveContainer width='100%' height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />

            <XAxis
              dataKey='minute'
              label={{ value: 'Minutes', position: 'insideBottom', offset: -5 }}
            />

            {/* ✅ Fixed Proper Scaling */}
            <YAxis
              domain={[0, maxValue + maxValue * 0.3]} // add 30% padding
              tickCount={6}
              allowDecimals={false}
              label={{
                value: 'Volume (m³)',
                style: { fontSize: 9, marginTop: 5 },
                angle: -90,
                position: 'insideLeft',

                dx: -7
              }}
            />

            <Tooltip />
            <Legend />

            <Line
              type='monotone'
              dataKey='inflow'
              stroke='#1f5fd6'
              strokeWidth={3}
              name='Inflow Volume'
              dot={false}
            />

            <Line
              type='monotone'
              dataKey='drainage'
              stroke='#f2b705'
              strokeWidth={3}
              name='Drainage'
              dot={false}
            />

            <Line
              type='monotone'
              dataKey='orifice'
              stroke='#6f42c1'
              strokeWidth={2}
              name='Orifice Discharge'
              dot={false}
            />

            <Line
              type='monotone'
              dataKey='net'
              stroke='#17a2b8'
              strokeWidth={3}
              name='Net Volume'
              dot={false}
            />

            <Line
              type='monotone'
              dataKey='required'
              stroke='#fd7e14'
              strokeWidth={2}
              name='Volume Required'
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default Hydrograph
