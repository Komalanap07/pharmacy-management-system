
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../layout/AdminLayout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const BASE_URL = import.meta.env.VITE_API_BASE_URL2

const AddProductManualy: React.FC = () => {
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

export default AddProductManualy