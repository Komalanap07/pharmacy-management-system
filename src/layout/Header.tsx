import { useLocation } from 'react-router-dom'
import { useAuth } from '../../AuthContext'
import { useState } from 'react'
import DataTable from 'react-data-table-component'

const BASE_URL = import.meta.env.VITE_API_BASE_URL2

const Navbar = () => {
  const { logout } = useAuth()
  const location = useLocation()

  const [search, setSearch] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  const screenTitle = location.pathname.includes('/RecentProjects') ? 'Products' : 'Dashboard'

  const handleSearch = async (value: string) => {
    setSearch(value)
    if (value.length < 2) { setResults([]); return }
    try {
      const res = await fetch(`${BASE_URL}/products/search?query=${value}`)
      setResults(await res.json())
    } catch (error) { console.error(error) }
  }

  const handleSelectProduct = async (_id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/products/${_id}`)
      setSelectedProduct(await res.json())
      setResults([])
      setSearch('')
      setShowModal(true)
    } catch (error) { console.error(error) }
  }

  const columns = [
    { name: 'Product Name', selector: (row: any) => row.name },
    { name: 'Manufacturer', selector: (row: any) => row.manufacturer },
    { name: 'Category', selector: (row: any) => row.category },
    { name: 'Barcode', selector: (row: any) => row.barcode },
    { name: 'Expiry Date', selector: (row: any) => row.expDate },
    { name: 'GST %', selector: (row: any) => row.gstPercentage }
  ]

  return (
    <>
      <header className='bg-white  px-4 py-3 shadow-sm'>
        <div className='flex justify-between items-center'>
          <h5 className='text-cyan-600 font-semibold ' >{screenTitle}</h5>

          <div className='flex items-center gap-3'>
            <div className='relative w-[250px]'>
              <input
                type='text'
                className='w-full border rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-300'
                placeholder='Search product...'
                value={search}
                onChange={e => handleSearch(e.target.value)}
              />
              {results.length > 0 && (
                <div className='absolute top-9 w-full bg-white border shadow-md z-50'>
                  {results.map((item: any) => (
                    <div
                      key={item._id}
                      className='p-2 border-b text-sm cursor-pointer hover:bg-gray-50'
                      onClick={() => handleSelectProduct(item._id)}
                    >
                      <strong>{item.name}</strong>
                      <div className='text-gray-400'>{item.barcode}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={logout}
              className='border border-red-500 text-red-500 hover:bg-red-50 text-sm px-3 py-1.5 rounded'
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {showModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-xl w-full max-w-3xl'>
            <div className='flex justify-between items-center px-4 py-3 border-b'>
              <h5 className='font-semibold'>Product Details</h5>
              <button onClick={() => setShowModal(false)} className='text-gray-400 hover:text-gray-600 text-xl'>✕</button>
            </div>
            <div className='p-4'>
              {selectedProduct && (
                <DataTable columns={columns} data={[selectedProduct]} pagination={false} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
