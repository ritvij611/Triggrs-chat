import Image from 'next/image'
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CompanyLogo from '@/components/general/companylogo';

export default function DashboardHeader({loginData}) {
  const [showDrop, setShowDrop] = useState(false);
  const router = useRouter();

  return (
    <>
      <header className='font-inter border-b py-0.5 bg-white border-b-gray-200 sticky top-0 z-50'>
        <div className='flex justify-between items-center px-5'>
          <div className='w-full'><CompanyLogo className='size-[50px]' /></div>
        <ul className='w-full flex items-center gap-x-2 text-sm'>
            <li className='hover:text-emerald-700 hover:bg-emerald-700/10 px-2 py-1.5 rounded-md'><Link href="/dashboard">Dashboard</Link></li>
            <li className='hover:text-emerald-700 hover:bg-emerald-700/10 px-2 py-1.5 rounded-md'><Link href="/dashboard/contacts">Contacts</Link></li>
            <li className='hover:text-emerald-700 hover:bg-emerald-700/10 px-2 py-1.5 rounded-md'><Link href="/dashboard/templates">Templates</Link></li>
            <li className='hover:text-emerald-700 hover:bg-emerald-700/10 px-2 py-1.5 rounded-md'><Link href="/dashboard/campaigns">Campaigns</Link></li>
            <li className='hover:text-emerald-700 hover:bg-emerald-700/10 px-2 py-1.5 rounded-md'><Link href="/dashboard/inbox">Inbox</Link></li>
            <li className='hover:text-emerald-700 hover:bg-emerald-700/10 px-2 py-1.5 rounded-md'><Link href="/dashboard/agents">Agents</Link></li>
        </ul>
          <nav className="bg-white w-full flex justify-end items-center lg:px-4 py-0.5">
            <ul className="relative flex flex-wrap justify-end gap-x-5 text-slate-800 items-center">
              <li><button className='flex gap-2 text-sm hover:bg-gray-100 justify-center items-center w-10 h-10 rounded-md' onClick={() => alert(true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6 hover:bg-transparent"><path strokeLinecap="round" strokeLinejoin="round" style={{ background: 'transparent' }} d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" /></svg></button></li>
              {
                !(loginData)
                ? <li><Link href = "/login" className="border border-emerald-600 text-emerald-600 bg-white hover:bg-gradient-to-br from-emerald-600 text-sm font-medium via-emerald-500 to-emerald-700 hover:text-white rounded-lg py-2 px-6" >Login</Link></li>
                : <li>
                <button onClick={() => setShowDrop(!showDrop)} className="flex hover:bg-gray-100 p-1.5 rounded-md items-center gap-2 cursor-pointer">
                <div className="relative">
                  {/* <Image className="object-cover w-9 h-9 rounded-full outline-2 outline-emerald-600 ring-2 ring-white border-4 border-white" src="/images/pro.png" alt="Profile Image" width={100} height={100} /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 absolute right-1 ring-1 ring-white bottom-0"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-sm cursor-pointer font-semibold text-gray-800">{loginData?.firstName} {loginData?.lastName}</h2>
                  </div>
                  <p className="text-gray-600 text-left text-xs">{loginData?.phoneNumber}</p>
                </div>
                </button>
                {
                  showDrop 
                  ? <div className='absolute z-10 top-[51px] right-0 bg-white p-2 shadow-sm w-40 rounded-b-md'>
                    <ul className='w-full text-sm'>
                      <li className='w-full mb-2 pb-2 border-b border-b-gray-300'>
                      <div className='w-full flex items-center justify-start gap-x-2'>
                        <span className='text-green-600'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                        <div className='flex-col flex'>
                          <p className='uppercase font-bold text-sm'>Connected</p>
                          <p className='text-xs text-gray-600'>Platform is healthy</p>
                        </div>
                      </div>
                      </li>
                      <li className='w-full'><button className='p-2 hover:bg-gray-50 block rounded-md w-full text-left' onClick={() => {router.push('/dashboard/profile'), setShowDrop(false)}}>Edit Profile</button></li>
                      <li className='w-full'><button className='p-2 hover:bg-gray-50 block rounded-md w-full text-left' onClick={() => {router.push('/dashboard/profile'), setShowDrop(false)}}>Manage Number</button></li>
                      <li className='w-full'><button className='p-2 hover:bg-gray-50 block rounded-md w-full text-left' onClick={() => {router.push('/dashboard/profile'), setShowDrop(false)}}>Manage WABA</button></li>
                      <li className='w-full'><button className='p-2 hover:bg-gray-50 rounded-md text-left w-full text-red-600' onClick={() => userLogout()}>Logout</button></li>
                    </ul>
                  </div> 
                  : <></>
                }
                {
                  showDrop 
                  ? <div className='fixed inset-0 w-full h-screen' onClick={() => setShowDrop(false)}></div>
                  : <></>
                }
              </li>
              }
            </ul>

          </nav>
        </div>
      </header>
    </>
  )
}