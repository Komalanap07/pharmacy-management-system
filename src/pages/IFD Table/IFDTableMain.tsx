import React, { useState } from 'react'
import axios from 'axios'
import type { TableColumn } from 'react-data-table-component'
import AdminLayout from '../../layout/AdminLayout'
import IFDDataTable from './IFDTable'
const BASE_URL = import.meta.env.VITE_API_BASE_URL
type IFDRow = {
  duration_minutes: number
  values_mm_per_hr: {
    [key: string]: string
  }
}

const IFDTable: React.FC = () => {
  const [lat, setLat] = useState('-19.25685255334398')
  const [lon, setLon] = useState('146.81396661538298')
  const [data, setData] = useState<IFDRow[]>([])
  const [regionName, setRegionName] = useState('')
  const [regionId, setRegionId] = useState('') 
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const fetchIFDData = async () => {
    try {
      setLoading(true)

      const response = await axios.post(`${BASE_URL}/ifd/fetch_idf_data`, {
        lat,
        lon
      })

      setRegionName(response.data?.region_name || '')
      setRegionId(response.data?.region_id || '')  
      setData(response.data?.data || [])
    } catch (error) {
      console.error('Fetch Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleExcelUpload = async () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      setLoading(true)

      const response = await axios.post(
        `${BASE_URL}/excel/upload_excel`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )

      console.log('Upload Response:', response.data)

      const sheets = response.data?.parsed_sheets || []

      if (sheets.length > 0) {
        const firstSheet = sheets[0]

        setRegionName(firstSheet.region_name || '')
        setRegionId(firstSheet.region_id || '') 

        const formattedData = firstSheet.data.map((row: any) => {
          const formattedValues: { [key: string]: string } = {}

          Object.keys(row.values).forEach(key => {
            const cleanKey = key.replace('%', '')
            formattedValues[cleanKey] = row.values[key]
          })

          return {
            duration_minutes: row.duration_minutes,
            values_mm_per_hr: formattedValues
          }
        })

        setData(formattedData)
      } else {
        setData([])
      }
    } catch (error) {
      console.error('Upload Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateRegion = async () => {
    try {
      setLoading(true)

      const payload = {
        
        region_name: regionName,
        // latitude: lat,
        // longitude: lon,
        data: data 
      }

      const response = await axios.post(  
        `${BASE_URL}/ifd/ifd-region`,
        payload
      )

      console.log('Region Updated:', response.data)
    } catch (error) {
      console.error('Update Region Error:', error)
    } finally {
      setLoading(false)
    }
  }
 
  const columns: TableColumn<IFDRow>[] =
    data.length > 0
      ? [
          {
            name: 'Duration (Minutes)',
            selector: row => row.duration_minutes,
            sortable: true
          },
          ...Object.keys(data[0].values_mm_per_hr).map(key => ({
            name: `${key}% AEP`,
            selector: (row: IFDRow) => row.values_mm_per_hr?.[key] ?? '-',
            sortable: true
          }))
        ]
      : []

  return (
    <AdminLayout>
      <div className='container mt-4'>
        <div className='card-header bg-light text-success'></div>

        <div className='card shadow-sm p-2  '>
          <div className='card-header'>
            <h6 className='mb-0 text-success'>IFD Data Table</h6>
          </div>
          <div className='row mb-3'>
            <div className='col-md-4'>
              <label className='form-label'>Latitude</label>
              <input
                type='text'
                className='form-control'
                value={lat}
                onChange={e => setLat(e.target.value)}
              />
            </div>

            <div className='col-md-4'>
              <label className='form-label'>Longitude</label>
              <input
                type='text'
                className='form-control'
                value={lon}
                onChange={e => setLon(e.target.value)}
              />
            </div>
            <div className='col-md-1'></div>

            <div className='col-md-3 d-flex align-items-end'>
              <button className='btn btn-success w-100' onClick={fetchIFDData}>
                Fetch IFD Data
              </button>
            </div>
          </div>
        </div>

        <div className='card mb-3 shadow-sm border-0 mt-4'>
          <div className='card-header bg-light'>
            <h6 className='mb-0 text-success'>Upload Excel & Fetch IFD</h6>
          </div>

          <div className='card-body'>
            <div className='row'>
              <div className='col-md-4'>
                <input
                  type='file'
                  className='form-control'
                  onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                />
              </div>
              <div className='col-md-5'></div>

              <div className='col-md-3'>
                <button
                  className='btn btn-success w-100'
                  onClick={handleExcelUpload}
                  disabled={!selectedFile}
                >
                  Fetch IFD Data (File)
                </button>
              </div>
            </div>
          </div>
        </div>

        {data.length > 0  && (
          <div className='card shadow-sm p-3 mb-3'>
            <div className='row align-items-end'>
              <div className='card-header'>
                <div className=''>
                  {regionName && (
                    <div className=' fw-bold text-success '>
                      Region: {regionName}
                    </div>
                  )}
                </div>
              </div>

              <div className=' card-body col-md-6'>
                <label className='form-label fw-semibold text-success'>
                  Region Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  value={regionName}
                  onChange={e => setRegionName(e.target.value)}
                />
              </div>

              <div className='col-md-3'></div>

              <div className='col-md-3'>
                <button
                  className='btn btn-success w-100 mb-3'
                  onClick={handleUpdateRegion}
                >
                  Update IFD
                </button>
              </div>
            </div>
          </div>
        )}

        <div className='card'>
          <div className='card-header text-success'>
            <h6>IFD Data Value </h6>
          </div>
          <div className='card-body'>
            <IFDDataTable columns={columns} data={data} loading={loading} />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default IFDTable