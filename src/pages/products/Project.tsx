import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import type { TableColumn } from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import AdminLayout from '../../layout/AdminLayout'
import { Circles } from 'react-loader-spinner'
import jsPDF from 'jspdf'
import QRCode from 'qrcode'

const BASE_URL = import.meta.env.VITE_API_BASE_URL2

type Product = {
  id: string; name: string; expDate: string; barcode: string;
  manufacturer: string; category: string; quantity: number;
}

export function RecentProjects() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => { fetchProducts() }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}/products`)
      if (!response.ok) throw new Error('Failed to fetch products')
      const data = await response.json()
      setProducts(data.map((item: any) => ({
        id: item._id, name: item.name || '-', expDate: item.expDate,
        barcode: item.barcode || '-', manufacturer: item.manufacturer || '-',
        category: item.category || '-', quantity: 0
      })))
    } catch (error) { console.error('Error fetching products:', error) }
    finally { setLoading(false) }
  }

  const handleSearch = async (value: string) => {
    setSearch(value)
    if (value.trim().length < 2) { fetchProducts(); return }
    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}/products/search?query=${value}`)
      if (!response.ok) throw new Error('Search failed')
      const data = await response.json()
      setProducts(data.map((item: any) => ({
        id: item._id, name: item.name || '-', expDate: item.expDate,
        barcode: item.barcode || '-', manufacturer: item.manufacturer || '-',
        category: item.category || '-', quantity: 0
      })))
    } catch (error) { console.error('Search error:', error) }
    finally { setLoading(false) }
  }

  const handleDelete = async (row: Product) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      const response = await fetch(`${BASE_URL}/products/${row.id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete product')
      fetchProducts()
    } catch (error) { console.error('Delete error:', error) }
  }

  const handleAddToCart = (product: Product) => {
    if (product.quantity <= 0) { alert('Please enter quantity first'); return }
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) return prev.map(p => p.id === product.id ? { ...p, quantity: product.quantity } : p)
      return [...prev, product]
    })
  }

  const handleGenerateBill = async () => {
    if (cart.length === 0) return
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Invoice', 20, 20)
    let y = 30
    cart.forEach((item, index) => { doc.text(`${index + 1}. ${item.name} - Qty: ${item.quantity}`, 20, y); y += 10 })
    const totalAmount = cart.reduce((acc, item) => acc + item.quantity * 10, 0)
    const paymentUrl = `upi://pay?pa=ganeshpund0000-1@oksbi&pn=MerchantName&am=${totalAmount}&cu=INR`
    const qrDataUrl = await QRCode.toDataURL(paymentUrl)
    doc.addImage(qrDataUrl, 'PNG', 150, 20, 40, 40)
    doc.save('invoice.pdf')
  }

  const columns: TableColumn<Product>[] = [
    { name: '#', selector: (_, index) => (index ?? 0) + 1, width: '70px' },
    { name: 'Product Name', selector: row => row.name, sortable: true },
    { name: 'Manufacturer', selector: row => row.manufacturer, sortable: true },
    { name: 'Category', selector: row => row.category, sortable: true },
    { name: 'Barcode', selector: row => row.barcode, sortable: true },
    {
      name: 'Expiry Date',
      selector: row => new Date(row.expDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      sortable: true
    },
    {
      name: 'Quantity',
      cell: row => (
        <input type='number' min={0} value={row.quantity}
          onChange={(e) => setProducts(prev => prev.map(p => p.id === row.id ? { ...p, quantity: Number(e.target.value) } : p))}
          className="w-16 border rounded px-1 py-0.5 text-sm"
        />
      )
    },
    {
      name: 'Action',
      cell: row => (
        <div className='flex gap-2 items-center'>
          <FaEdit size={16} className='text-blue-500 cursor-pointer' onClick={() => navigate(`/EditProduct/${row.id}`)} title='Edit' />
          <FaTrash size={16} className='text-red-500 cursor-pointer' onClick={() => handleDelete(row)} title='Delete' />
          <button className='bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded' onClick={() => handleAddToCart(row)}>Add</button>
        </div>
      ),
      ignoreRowClick: true, allowOverflow: true, button: true
    }
  ]

  return (
    <AdminLayout>
      <div className='p-4'>
        <div className='bg-white rounded-2xl shadow-md'>
          <div className='border-b shadow-md border-gray-300 px-4 py-4'>
            <div className='flex justify-between items-center flex-wrap gap-2'>
              <h5 className='font-semibold'>Product</h5>
              <div className='flex gap-2 flex-wrap'>
                <input
                  type='text'
                  className=' border rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-300 w-[260px]'
                  placeholder='Search by name, barcode, manufacturer...'
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <button onClick={() => navigate('/NewProductByScann')} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded text-sm'>+ New Product OCR</button>
                <button onClick={() => navigate('/AIImgProcess')} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded text-sm'>+ New Product by AI</button>
                <button onClick={() => navigate('/NewProduct')} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded text-sm'>+ New Product</button>
              </div>
            </div>
          </div>

          <div className='p-4'>
            <DataTable
              columns={columns} data={products} progressPending={loading}
              progressComponent={
                <div className='flex justify-center py-4'>
                  <Circles height='50' width='50' color='#3b82f6' ariaLabel='loading' visible={true} />
                </div>
              }
              pagination paginationPerPage={5} highlightOnHover striped responsive pointerOnHover
            />
            {cart.length > 0 && (
              <div className='mt-3'>
                <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm' onClick={handleGenerateBill}>
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
