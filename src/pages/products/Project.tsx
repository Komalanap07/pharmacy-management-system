 import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import type { TableColumn } from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import AdminLayout from '../../layout/AdminLayout'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Circles } from 'react-loader-spinner'
import jsPDF from 'jspdf'
import QRCode from 'qrcode'

const BASE_URL = import.meta.env.VITE_API_BASE_URL2

type Product = {
  id: string
  name: string
  expDate: string
  barcode: string
  manufacturer: string
  category: string
  quantity: number // New field for quantity
}

export function RecentProjects() {
  const navigate = useNavigate()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [cart, setCart] = useState<Product[]>([]) // Purchased products

  useEffect(() => {
    fetchProducts()
  }, [])

  // 🔥 Fetch All Products
  const fetchProducts = async () => {
    try {
      setLoading(true)

      const response = await fetch(`${BASE_URL}/products`)

      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()

      const formattedProducts: Product[] = data.map((item: any) => ({
        id: item._id,
        name: item.name || '-',
        expDate: item.expDate,
        barcode: item.barcode || '-',
        manufacturer: item.manufacturer || '-',
        category: item.category || '-',
        quantity: 0 // Initialize quantity
      }))

      setProducts(formattedProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  // 🔎 Search Products
  const handleSearch = async (value: string) => {
    setSearch(value)

    if (value.trim().length < 2) {
      fetchProducts()
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        `${BASE_URL}/products/search?query=${value}`
      )

      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data = await response.json()

      const formattedProducts: Product[] = data.map((item: any) => ({
        id: item._id,
        name: item.name || '-',
        expDate: item.expDate,
        barcode: item.barcode || '-',
        manufacturer: item.manufacturer || '-',
        category: item.category || '-',
        quantity: 0
      }))

      setProducts(formattedProducts)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (row: Product) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    )
    if (!confirmDelete) return

    try {
      const response = await fetch(
        `${BASE_URL}/products/${row.id}`,
        { method: 'DELETE' }
      )

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      fetchProducts()
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const handleEdit = (row: Product) => {
    navigate(`/EditProduct/${row.id}`)
  }

  // 🛒 Add product to purchased cart
  const handleAddToCart = (product: Product) => {
    if (product.quantity <= 0) {
      alert('Please enter quantity first')
      return
    }

    setCart(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) {
        return prev.map(p =>
          p.id === product.id ? { ...p, quantity: product.quantity } : p
        )
      }
      return [...prev, product]
    })
  }

  // 📝 Generate PDF invoice with QR code
  const handleGenerateBill = async () => {
    if (cart.length === 0) return

    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Invoice', 20, 20)

    let y = 30
    cart.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} - Qty: ${item.quantity}`, 20, y)
      y += 10
    })

    // Example: UPI deep link for payment (replace with your server/payment URL)
    const totalAmount = cart.reduce((acc, item) => acc + item.quantity * 10, 0) // Example: price = 10 per item
    const paymentUrl = `upi://pay?pa=ganeshpund0000-1@oksbi&pn=MerchantName&am=${totalAmount}&cu=INR`
    const qrDataUrl = await QRCode.toDataURL(paymentUrl)
    doc.addImage(qrDataUrl, 'PNG', 150, 20, 40, 40)

    doc.save('invoice.pdf')
  }

  const columns: TableColumn<Product>[] = [
    {
      name: '#',
      selector: (_, index) => (index ?? 0) + 1,
      width: '70px'
    },
    {
      name: 'Product Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Manufacturer',
      selector: row => row.manufacturer,
      sortable: true
    },
    {
      name: 'Category',
      selector: row => row.category,
      sortable: true
    },
    {
      name: 'Barcode',
      selector: row => row.barcode,
      sortable: true
    },
    {
      name: 'Expiry Date',
      selector: row =>
        new Date(row.expDate).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
      sortable: true
    },
    {
      name: 'Quantity',
      cell: row => (
        <input
          type='number'
          min={0}
          value={row.quantity}
          onChange={(e) => {
            const newQty = Number(e.target.value)
            setProducts(prev =>
              prev.map(p => p.id === row.id ? { ...p, quantity: newQty } : p)
            )
          }}
          style={{ width: '60px' }}
        />
      ),
      sortable: true
    },
    {
      name: 'Action',
      cell: row => (
        <div className='d-flex gap-2'>
          <FaEdit
            size={16}
            style={{ cursor: 'pointer' }}
            className='text-primary'
            onClick={() => handleEdit(row)}
            title='Edit'
          />

          <FaTrash
            size={16}
            style={{ cursor: 'pointer' }}
            className='text-danger'
            onClick={() => handleDelete(row)}
            title='Delete'
          />

          <button
            className='btn btn-success btn-sm'
            onClick={() => handleAddToCart(row)}
          >
            Add
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ]

  return (
    <AdminLayout>
      <div className='container-fluid mt-4'>
        <div className='card shadow-sm border-0 rounded-4'>
          
          {/* 🔥 Header with Search */}
          <div className='card-header bg-white border-bottom py-3'>
            <div className='d-flex justify-content-between align-items-center flex-wrap gap-2'>
              
              <h5 className='mb-0 fw-semibold'>Product</h5>

              <div className='d-flex gap-5'>

                {/* 🔎 Search Input */}
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search by name, barcode, manufacturer...'
                  style={{ width: '260px' }}
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                />

                <button
                  onClick={() => navigate('/NewProductByScann')}
                  className='btn btn-primary px-4'
                >
                  + New Product ocr
                </button>
                <button
                  onClick={() => navigate('/AIImgProcess')}
                  className='btn btn-primary px-4'
                >
                  + New Product by AI
                </button>
                <button
                  onClick={() => navigate('/NewProduct')}
                  className='btn btn-primary px-4'
                >
                  + New Product
                </button>

              </div>
            </div>
          </div>

          {/* 📋 Data Table */}
          <div className='card-body'>
            <DataTable
              columns={columns}
              data={products}
              progressPending={loading}
              progressComponent={
                <div className='d-flex justify-content-center py-4'>
                  <Circles
                    height='50'
                    width='50'
                    color='#0d6efd'
                    ariaLabel='loading'
                    visible={true}
                  />
                </div>
              }
              pagination
              paginationPerPage={5}
              highlightOnHover
              striped
              responsive
              pointerOnHover
            />

            {/* 📝 Generate Bill Button */}
            {cart.length > 0 && (
              <div className='mt-3'>
                <button
                  className='btn btn-primary'
                  onClick={handleGenerateBill}
                >
                  Generate Bill
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}