import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../layout/AdminLayout'
import { toast } from 'react-toastify'
const BASE_URL = import.meta.env.VITE_API_BASE_URL
interface Project {
  id: string
  project_name: string
  project_address: string
  client_name: string
  calculator_version: string
  customer_type: string
  calculator_type: boolean
  rainfall_location_id: string
}

interface Region {
  region_id: string
  region_name: string
}

const EditProjectStormWater: React.FC = () => {
  const navigate = useNavigate()
  const { projectId } = useParams()

  const [projectName, setProjectName] = useState('')
  const [siteAddress, setSiteAddress] = useState('')
  const [clientName, setClientName] = useState('')
  const [calculationType, setCalculationType] = useState('Detention System')
  const [customerType, setCustomerType] = useState('Direct Customer')
  const [projectType, setProjectType] = useState('')

  const [regions, setRegions] = useState<Region[]>([])
  const [selectedRegionId, setSelectedRegionId] = useState<string>('')

  const selectedRoute =
    projectType === 'no' ? '/StormEventInput' : '/system-configration'

  const fetchRegions = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/ifd/ifd-regions`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch regions')
      }

      const data = await response.json()

      if (data.regions) {
        setRegions(data.regions)
      }
    } catch (error) {
      console.error('Region fetch error:', error)
      toast.error('Failed to load regions')
    }
  }

  const fetchProject = async () => {
    if (!projectId) return

    try {
      const response = await fetch(
        `${BASE_URL}/projects/${projectId}`
      )

      if (!response.ok) throw new Error('Failed to fetch project')

      const data: Project = await response.json()

      setProjectName(data.project_name)
      setSiteAddress(data.project_address)
      setClientName(data.client_name)
      setCalculationType(data.calculator_version)
      setCustomerType(data.customer_type || 'Direct Customer')
      setProjectType(data.calculator_type ? 'yes' : 'no')

      setSelectedRegionId(data.rainfall_location_id)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const init = async () => {
      await fetchRegions()
      await fetchProject()
    }

    init()
  }, [projectId])

  const handleUpdateProject = async () => {
    if (!projectId) return

    try {
      const payload = {
        project_name: projectName,
        project_address: siteAddress,
        client_name: clientName,
        calculator_version: calculationType,
        customer_type: customerType,
        calculator_type: projectType === 'yes',
        rainfall_location_id: selectedRegionId
      }

      const response = await fetch(
        `${BASE_URL}/projects/${projectId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      )

      if (!response.ok) throw new Error('Failed to update project')

      navigate('/RecentProjects')
    } catch (error) {
      console.error('Error updating project:', error)
      toast.error('Failed to update project')
    }
  }

  return (
    <AdminLayout>
      <div className='container-fluid py-4 px-4 bg-body-tertiary min-vh-100'>
        <div className='card border-0 shadow-sm rounded-3'>
          <div className='card-body p-4'>
            <div className='row'>
              <div className='col-md-8 mb-3'>
                <label className='form-label fw-medium'>
                  Project Name <span className='text-danger'>*</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                />
              </div>

              <div className='col-md-4 mb-3'>
                <label className='form-label fw-medium'>
                  Do you know the volume? <span className='text-danger'>*</span>
                </label>
                <select
                  className='form-select'
                  value={projectType}
                  disabled
                  onChange={e => setProjectType(e.target.value)}
                >
                  <option value=''>Select type</option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </select>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label className='form-label fw-medium'>
                  Site Address <span className='text-danger'>*</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  value={siteAddress}
                  onChange={e => setSiteAddress(e.target.value)}
                />
              </div>

              <div className='col-md-6 mb-3'>
                <label className='form-label fw-medium'>Region</label>
                <select
                  className='form-select'
                  value={selectedRegionId}
                  onChange={e => setSelectedRegionId(e.target.value)}
                >
                  <option value=''>Select Region</option>
                  {regions.map(region => (
                    <option key={region.region_id} value={region.region_id}>
                      {region.region_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='mb-3'>
              <label className='form-label fw-medium'>
                Client Name <span className='text-danger'>*</span>
              </label>
              <input
                type='text'
                className='form-control'
                value={clientName}
                onChange={e => setClientName(e.target.value)}
              />
            </div>

            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label className='form-label fw-medium'>Calculation Type</label>
                <select
                  className='form-select'
                  disabled
                  value={calculationType}
                  onChange={e => setCalculationType(e.target.value)}
                >
                  <option>Detention System</option>
                  <option>Retention System</option>
                  <option>Infiltration System</option>
                </select>
              </div>

              <div className='col-md-6 mb-3'>
                <label className='form-label fw-medium'>Customer Type</label>
                <select
                  className='form-select'
                  disabled
                  value={customerType}
                  onChange={e => setCustomerType(e.target.value)}
                >
                  <option>Direct Customer</option>
                  <option>Distributor</option>
                </select>
              </div>
            </div>

            <div className='border rounded-3 bg-primary bg-opacity-10 p-3 mt-2'>
              <h6 className='fw-semibold mb-1'>Selected: {calculationType}</h6>
            </div>

            <div className='d-flex justify-content-between align-items-center mt-4'>
              <button
                className='btn btn-outline-secondary px-4'
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateProject}
                className='btn btn-success px-4'
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default EditProjectStormWater
