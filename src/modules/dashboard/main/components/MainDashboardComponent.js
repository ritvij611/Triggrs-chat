import { Edit2Icon, InfoIcon } from 'lucide-react'
import React from 'react'

export default function MainDashboardComponent() {
  return (<>
    <div className='grid grid-cols-12 max-w-7xl mx-auto gap-x-2 py-2'>
      <div className='col-span-8'>
        <div className='w-full'>
          <div className='bg-white rounded-xl grid grid-cols-3 p-4 shadow border border-gray-200'>
            <div className='w-full'>
              <h5 className='text-sm font-medium flex gap-x-0.5 items-center'>Whatsapp Business API Status <InfoIcon size={14} /></h5>
              <p className='bg-green-600 mt-1 text-white px-3 py-1 rounded-full w-fit text-xs'>LIVE</p>
            </div>
            <div className='w-full'>
              <h5 className='text-sm font-medium flex gap-x-0.5 items-center'>Quality Ratings <InfoIcon size={14} /></h5>
              <p className='bg-green-600 mt-1 text-white px-3 py-1 rounded-full w-fit text-xs'>LIVE</p>
            </div>
            <div className='w-full'>
              <h5 className='text-sm font-medium flex gap-x-0.5 items-center'>Remaining Quota <InfoIcon size={14} /></h5>
              <p className='text-xl font-semibold'>1000</p>
            </div>
          </div>
          <div className='bg-white mt-1.5 rounded-xl flex items-center justify-between p-4 shadow border border-gray-200'>
            <div className='w-full'>Hello</div>
            <div className='w-full'>Hello</div>
          </div>
        </div>
      </div>
      <div className='col-span-4'>
        <div className='w-full space-y-1.5 '>
          <div className='bg-white rounded-xl p-4 shadow border border-gray-200'>
            <div className='w-full flex justify-between items-center'>
              <div className='w-full'>
                <h3 className='w-full font-semibold text-xl'>Your Current Plan</h3>
                <p className='text-sm text-gray-600'>BASIC (Monthly)</p>
              </div>
              <div className='w-full ml-auto'>
                <button className='w-fit block text-sm ml-auto text-white bg-gradient-to-br from-emerald-600 to-emerald-800 px-2 py-1 rounded text-end'>Upgrade Plan</button>
              </div>
            </div>
          </div>
          <div className='bg-white rounded-xl p-4 shadow border border-gray-200'>
            <div className='w-full flex justify-between items-center'>
              <div className='w-full'>
                <h3 className='w-full font-semibold text-xl'>Manage Profile</h3>
                <p className='text-sm text-gray-600'>Advertising Services</p>
              </div>
              <div className='w-fit ml-auto'>
                <button className='text-sm text-gray-900 bg-gray-200 p-2 rounded-md text-end'><Edit2Icon size={18} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    </>
  )
}