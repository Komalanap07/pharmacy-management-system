// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import AdminLayout from '../../layout/AdminLayout'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// const BASE_URL = import.meta.env.VITE_API_BASE_URL
// const NewProjectStormWater: React.FC = () => {
//   const navigate = useNavigate()

//   const [projectName, setProjectName] = useState('')
//   const [siteAddress, setSiteAddress] = useState('')
//   const [clientName, setClientName] = useState('')
//   const [calculationType, setCalculationType] = useState('Detention System')
//   const [customerType, setCustomerType] = useState('Direct Customer')
//   const [projectType, setProjectType] = useState('')

//   // ✅ NEW REGION STATES
//   type Region = {
//     region_id: string

//     region_name: string
//   }

//   const [regions, setRegions] = useState<Region[]>([])
//   const [rainfallLocationId, setRainfallLocationId] = useState('')

//   const selectedRoute =
//     projectType === 'no' ? '/StormEventInput' : '/system-configration'

//   useEffect(() => {
//     fetchRegions()
//   }, [])

//   const fetchRegions = async () => {
//     try {
//       const response = await fetch(
//         `${BASE_URL}/ifd/ifd-regions`
//       )

//       if (!response.ok) {
//         throw new Error('Failed to fetch regions')
//       }

//       const data = await response.json()

//       if (data.regions) {
//         setRegions(data.regions)
//       }
//     } catch (error) {
//       console.error('Region fetch error:', error)
//       toast.error('Failed to load regions')
//     }
//   }
//   const handleCreateProject = async () => {
//     try {
//       if (
//         !projectName ||
//         !siteAddress ||
//         !clientName ||
//         !projectType ||
//         !rainfallLocationId
//       ) {
//         toast.warning('Please fill all required fields')
//         return
//       }

//       const payload = {
//         project_name: projectName,
//         project_address: siteAddress,
//         client_name: clientName,
//         rainfall_location_id: rainfallLocationId,
//         calculator_type: projectType === 'yes',
//         calculator_version: calculationType,
//         status: 'draft',
//         created_by: '660e8400-e29b-41d4-a716-446655440111'
//       }

//       const response = await fetch(`${BASE_URL}/projects/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       })

//       if (!response.ok) {
//         throw new Error('Failed to create project')
//       }

//       const data = await response.json()
//       const projectId = data.project_id

//       toast.success('Project created successfully 🎉')

//       setTimeout(() => {
//         navigate(`${selectedRoute}/${projectId}`)
//       }, 1000)
//     } catch (error) {
//       console.error('Error creating project:', error)
//       toast.error('Failed to create project')
//     }
//   }

//   return (
//     <AdminLayout>
//       <div className='container-fluid py-4 px-4 bg-body-tertiary min-vh-100'>
//         <div className='card border-0 shadow-sm rounded-3'>
//           <div className='card-body p-4'>
//             <div className='row'>
              
//               <div className='col-md-8 mb-3'>
//                 <label className='form-label fw-medium'>
//                   Project Name <span className='text-danger'>*</span>
//                 </label>
//                 <input
//                   type='text'
//                   className='form-control'
//                   placeholder='Project name'
//                   value={projectName}
//                   onChange={e => setProjectName(e.target.value)}
//                 />
//               </div>

//               <div className='col-md-4 mb-3'>
//                 <label className='form-label fw-medium'>
//                   Do you know the volume? <span className='text-danger'>*</span>
//                 </label>
//                 <select
//                   className='form-select'
//                   value={projectType}
//                   onChange={e => setProjectType(e.target.value)}
//                 >
//                   <option value=''>Select type</option>
//                   <option value='yes'>Yes</option>
//                   <option value='no'>No</option>
//                 </select>
//               </div>
//             </div>

//             <div className='row'>
//               <div className='col-md-6 mb-3'>
//                 <label className='form-label fw-medium'>
//                   Site Address <span className='text-danger'>*</span>
//                 </label>
//                 <input
//                   type='text'
//                   className='form-control'
//                   placeholder='e.g., 123 Main Street, Melbourne VIC 3000'
//                   value={siteAddress}
//                   onChange={e => setSiteAddress(e.target.value)}
//                 />
//               </div>

//               <div className='col-md-6 mb-3'>
//                 <label className='form-label fw-medium'>
//                   Region <span className='text-danger'>*</span>
//                 </label>
//                 <select
//                   className='form-select'
//                   value={rainfallLocationId}
//                   onChange={e => setRainfallLocationId(e.target.value)}
//                 >
//                   <option value=''>Select Region</option>
//                   {regions.map(region => (
//                     <option key={region.region_id} value={region.region_id}>
//                       {region.region_name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className='mb-3'>
//               <label className='form-label fw-medium'>
//                 Client Name <span className='text-danger'>*</span>
//               </label>
//               <input
//                 type='text'
//                 className='form-control'
//                 value={clientName}
//                 onChange={e => setClientName(e.target.value)}
//               />
//             </div>

//             <div className='row'>
//               <div className='col-md-6 mb-3'>
//                 <label className='form-label fw-medium'>
//                   Calculation Type <span className='text-danger'>*</span>
//                 </label>
//                 <select
//                   className='form-select'
//                   value={calculationType}
//                   onChange={e => setCalculationType(e.target.value)}
//                 >
//                   <option>Detention System</option>
//                   <option>Infiltration System</option>
//                 </select>
//               </div>

//               <div className='col-md-6 mb-3'>
//                 <label className='form-label fw-medium'>
//                   Customer Type <span className='text-danger'>*</span>
//                 </label>
//                 <select
//                   className='form-select'
//                   value={customerType}
//                   onChange={e => setCustomerType(e.target.value)}
//                 >
//                   <option>Direct Customer</option>
//                   <option>Distributor</option>
//                 </select>
//               </div>
//             </div>

//             <div className='border rounded-3 bg-primary bg-opacity-10 p-3 mt-2'>
//               <h6 className='fw-semibold mb-1'>Selected: {calculationType}</h6>
//               <small className='text-muted'>
//                 Calculate module configuration based on selected system.
//               </small>
//             </div>

//             <div className='d-flex justify-content-between align-items-center mt-4'>
//               <button
//                 onClick={() => navigate(-1)}
//                 className='btn btn-outline-secondary px-4'
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleCreateProject}
//                 className='btn btn-success px-4'
//               >
//                 → Start Engineering
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <ToastContainer position='top-right' autoClose={3000} />
//     </AdminLayout>
//   )
// }

// export default NewProjectStormWater


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../layout/AdminLayout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const BASE_URL = import.meta.env.VITE_API_BASE_URL2

const NewProjectStormWater: React.FC = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [expDate, setExpDate] = useState('')
  const [barcode, setBarcode] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [category, setCategory] = useState('')
  const [gstPercentage, setGstPercentage] = useState<number | ''>('')

  const handleCreateProduct = async () => {
    try {
      if (
        !name ||
        !expDate ||
        !barcode ||
        !manufacturer ||
        !category ||
        gstPercentage === ''
      ) {
        toast.warning('Please fill all required fields')
        return
      }

      const payload = {
        name,
        expDate,
        barcode,
        manufacturer,
        category,
        gstPercentage: Number(gstPercentage)
      }

      const response = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Failed to create product')
      }

      toast.success('Product added successfully 🎉')

      setTimeout(() => {
        navigate('/RecentProjects') // back to list page
      }, 1000)
    } catch (error) {
      console.error('Error creating product:', error)
      toast.error('Failed to create product')
    }
  }

  return (
    <AdminLayout>
      <div className='container-fluid py-4 px-4 bg-body-tertiary min-vh-100'>
        <div className='card border-0 shadow-sm rounded-3'>
          <div className='card-body p-4'>

            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label className='form-label fw-medium'>
                  Product Name <span className='text-danger'>*</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className='col-md-6 mb-3'>
                <label className='form-label fw-medium'>
                  Expiry Date <span className='text-danger'>*</span>
                </label>
                <input
                  type='date'
                  className='form-control'
                  value={expDate}
                  onChange={e => setExpDate(e.target.value)}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label className='form-label fw-medium'>
                  Barcode <span className='text-danger'>*</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  value={barcode}
                  onChange={e => setBarcode(e.target.value)}
                />
              </div>

              <div className='col-md-6 mb-3'>
                <label className='form-label fw-medium'>
                  Manufacturer <span className='text-danger'>*</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  value={manufacturer}
                  onChange={e => setManufacturer(e.target.value)}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label className='form-label fw-medium'>
                  Category <span className='text-danger'>*</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                />
              </div>

              <div className='col-md-6 mb-3'>
                <label className='form-label fw-medium'>
                  GST Percentage <span className='text-danger'>*</span>
                </label>
                <input
                  type='number'
                  className='form-control'
                  min='0'
                  value={gstPercentage}
                  onChange={e => setGstPercentage(Number(e.target.value))}
                />
              </div>
            </div>

            <div className='d-flex justify-content-between align-items-center mt-4'>
              <button
                onClick={() => navigate(-1)}
                className='btn btn-outline-secondary px-4'
              >
                Cancel
              </button>

              <button
                onClick={handleCreateProduct}
                className='btn btn-success px-4'
              >
                + Add Product
              </button>
            </div>

          </div>
        </div>
      </div>

      <ToastContainer position='top-right' autoClose={3000} />
    </AdminLayout>
  )
}

export default NewProjectStormWater