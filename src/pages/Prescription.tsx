import React from 'react'
import AdminLayout from '../layout/AdminLayout'
import { UploadIcon } from 'lucide-react'


function Prescription() {
  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between mb-6">
          <div> 
            <p className='text-xl font-semibold mb-1 text-cyan-600 '>Prescriptions</p>
            <p className='text-sm text-gray-500'>OCR-powered prescription scanning and verification</p></div>
          <div className=' bg-gradient-to-r from-[#099773] to-[#1f7ea1] text-white flex rounded-md py-2 justify-center px-3 h-fit '>
            <button className=' flex gap-2 text-md'> <UploadIcon />Upload Prescription</button>
          </div>

        </div>

        <div className='grid grid-cols-2'>
          <div className="scanner w-2/3 p-4 h-[500px] flex-col rounded-2xl shadow-md bg-white">
            <p className='font-medium font-semibold'>Scan Prescription</p>
           <div className='border-dashed border-black border-2 p-4 rounded-2xl'>
            <p>Drop prescription image here</p>
            <p className='text-gray-500'>or click to browse</p>
            <p>Supports JPG, PNG, PDF up to 10MB</p>

           </div>
           <div>
            <ul>OCR Capabilities
              <li>Medicine name extraction</li>
              <li>Dosage detection</li>
              <li>Doctor verification</li>
              <li>Auto-inventory lookup</li>
            
            </ul>
           </div>

          </div>
          <div className="scanner w-full p-4 h-[500px] rounded-2xl bg-white text-center flex justify-center items-center ">
            <p>View and manage scanned prescriptions</p>

          </div>

        </div>
      </div>
    </AdminLayout>

  )
}

export default Prescription