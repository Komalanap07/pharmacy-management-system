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
      if (!name || !expDate || !barcode || !manufacturer || !category || gstPercentage === '') {
        toast.warning('Please fill all required fields')
        return
      }
      const response = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, expDate, barcode, manufacturer, category, gstPercentage: Number(gstPercentage) })
      })
      if (!response.ok) throw new Error('Failed to create product')
      toast.success('Product added successfully 🎉')
      setTimeout(() => navigate('/RecentProjects'), 1000)
    } catch (error) {
      console.error('Error creating product:', error)
      toast.error('Failed to create product')
    }
  }

  const inputClass = "w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
  const labelClass = "block text-sm font-medium mb-1"

  return (
    <AdminLayout>
      <div className="p-4 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Product Name <span className="text-red-500">*</span></label>
              <input type="text" className={inputClass} value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Expiry Date <span className="text-red-500">*</span></label>
              <input type="date" className={inputClass} value={expDate} onChange={e => setExpDate(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Barcode <span className="text-red-500">*</span></label>
              <input type="text" className={inputClass} value={barcode} onChange={e => setBarcode(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Manufacturer <span className="text-red-500">*</span></label>
              <input type="text" className={inputClass} value={manufacturer} onChange={e => setManufacturer(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Category <span className="text-red-500">*</span></label>
              <input type="text" className={inputClass} value={category} onChange={e => setCategory(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>GST Percentage <span className="text-red-500">*</span></label>
              <input type="number" className={inputClass} min="0" value={gstPercentage} onChange={e => setGstPercentage(Number(e.target.value))} />
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button onClick={() => navigate(-1)} className="border border-gray-400 text-gray-600 hover:bg-gray-50 px-6 py-2 rounded text-sm">
              Cancel
            </button>
            <button onClick={handleCreateProduct} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded text-sm">
              + Add Product
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </AdminLayout>
  )
}

export default AddProductManualy
