import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import { SearchIcon } from 'lucide-react'
function QRCodeGenerator() {
    return (
        <AdminLayout>


            <div>
                <div className="heading h-full mb-4 w-full ">
                    <p className='text-xl text-cyan-600  font-bold'>QR Scanner & Authentication</p>
                    <p className='text-sm text-gray-500 font-normal'>Verify medicine authenticity via QR code or batch lookup</p>
                </div>
                <div className='grid grid-cols-2 gap-6 h-full w-full '>
                    <div className="scanner w-full p-4 h-full rounded-2xl space-y-4 shadow-md  rounded-xl bg-white  transition-colors cursor-pointer ">
                        <p className='font-semibold text-md p-2'>Scan or search</p>
                        <div className='h-[250px] ml-[50px] w-[300px] flex justify-center items-center  rounded-2xl border-gray-500 border-2 border-dashed hover:border-primary/40 bg-green-50'>
                            <p className='text-center text-gray-500 text-md p-3'>Camera-based scanning available on mobile. Use manual search below.</p>

                        </div>
                        <div className="search flex gap-3">
                            <input type="text" placeholder='Search by batch number or medicine name' className='border w-full p-2 rounded-2xl' />
<div className='bg-gradient-to-r from-[#099773] to-[#1f7ea1] rounded-md text-white p-2'><SearchIcon /></div>
                        </div>

                    </div>
                    <div className="scanner shadow-md w-full p-5 h-full rounded-2xl bg-white text-center flex justify-center items-center ">
                        <p>Scan a QR code or enter a medicine ID to verify authenticity</p>

                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default QRCodeGenerator