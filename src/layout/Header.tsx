import { useLocation } from 'react-router-dom'
import { useAuth } from '../../AuthContext'
import { useState } from 'react'
import DataTable from 'react-data-table-component'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Modal } from 'bootstrap'

const BASE_URL = import.meta.env.VITE_API_BASE_URL2

const Navbar = () => {
  const { logout } = useAuth()
  const location = useLocation()

  const [search, setSearch] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  let screenTitle = 'Dashboard'

  if (location.pathname.includes('/RecentProjects')) {
    screenTitle = 'Products'
  }

  // 🔍 Search
  const handleSearch = async (value: string) => {
    setSearch(value)

    if (value.length < 2) {
      setResults([])
      return
    }

    try {
      const res = await fetch(
        `${BASE_URL}/products/search?query=${value}`
      )
      const data = await res.json()
      setResults(data)
    } catch (error) {
      console.error(error)
    }
  }

  // 👇 Open modal with product details
  const handleSelectProduct = async (_id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/products/${_id}`)
      const data = await res.json()

      setSelectedProduct(data)
      setResults([])
      setSearch('')

     const modalElement = document.getElementById('productModal')

if (modalElement) {
  const modal = new Modal(modalElement)
  modal.show()
}
    } catch (error) {
      console.error(error)
    }
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
      <header className='bg-white border-bottom px-4 py-3 shadow-sm'>
        <div className='d-flex justify-content-between align-items-center'>
          <h5 className='mb-0 text-success'>{screenTitle}</h5>

          <div className='d-flex align-items-center gap-3'>

            {/* 🔍 Search */}
            <div style={{ position: 'relative', width: '250px' }}>
              <input
                type='text'
                className='form-control form-control-sm'
                placeholder='Search product...'
                value={search}
                onChange={e => handleSearch(e.target.value)}
              />

              {results.length > 0 && (
                <div
                  className='border bg-white shadow-sm'
                  style={{
                    position: 'absolute',
                    top: '38px',
                    width: '100%',
                    zIndex: 1000
                  }}
                >
                  {results.map((item: any) => (
                    <div
                      key={item._id}
                      className='p-2 border-bottom small'
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        handleSelectProduct(item._id)
                      }
                    >
                      <strong>{item.name}</strong>
                      <div className='text-muted'>
                        {item.barcode}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={logout}
              className='btn btn-outline-danger btn-sm'
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* 🔥 Bootstrap Modal */}
      <div
        className='modal fade'
        id='productModal'
        tabIndex={-1}
      >
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Product Details</h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
              ></button>
            </div>

            <div className='modal-body'>
              {selectedProduct && (
                <DataTable
                  columns={columns}
                  data={[selectedProduct]}
                  pagination={false}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar