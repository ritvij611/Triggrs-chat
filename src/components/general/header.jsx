import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CompanyLogo from './companylogo';

export default function Header() {
 const [showDrawer, setShowDrawer] = useState(false);
 useEffect(() => {
  if(showDrawer){
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
  }else{
    document.getElementsByTagName('body')[0].style.overflowY = 'auto';
  }
 }, [showDrawer]); 


    return(
        <>
  <header>
    <nav className="w-full fixed inset-x-0 top-0 z-20 bg-white shadow-sm  px-4 lg:px-6 lg:py-1.5 py-2">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link href = "/"  className=''><CompanyLogo className='size-[60px]' /></Link>
            <div className="flex gap-2 items-center lg:order-2">
                <Link href="/login" className="text-emerald-600 border border-emerald-600 uppercase font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">Log in</Link>
                <Link href="/register" className="text-white hidden lg:block bg-emerald-600 uppercase font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">Get started</Link>
                <button onClick={() => setShowDrawer(true)}  type="button" className="inline-flex items-center p-1.5 ml-1 text-sm text-gray-500 cursor-pointer rounded-lg lg:hidden bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 20 20" ><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
            </div>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <nav className='mx-auto w-fit mt-2'>
        <ul className='w-fit text-base gap-x-5 font-normal flex justify-center items-center py-2'>
          <li className='relative after:w-0 after:duration-200 after:h-0.5 after:absolute after:mx-auto after:left-0 flex justify-center after:flex after:justify-center after:items-center after:right-0 after:bottom-0 after:transition-all after:bg-emerald-600 hover:after:w-full'><Link href='/about'>About</Link></li>
          <li className='relative after:w-0 after:duration-200 after:h-0.5 after:absolute after:mx-auto after:left-0 flex justify-center after:flex after:justify-center after:items-center after:right-0 after:bottom-0 after:transition-all after:bg-emerald-600 hover:after:w-full'><Link href='/#features'>Features</Link></li>
          <li className='relative after:w-0 after:duration-200 after:h-0.5 after:absolute after:mx-auto after:left-0 flex justify-center after:flex after:justify-center after:items-center after:right-0 after:bottom-0 after:transition-all after:bg-emerald-600 hover:after:w-full'><Link href = '/how-it-work' >How it Work?</Link></li>
          <li className='relative after:w-0 after:duration-200 after:h-0.5 after:absolute after:mx-auto after:left-0 flex justify-center after:flex after:justify-center after:items-center after:right-0 after:bottom-0 after:transition-all after:bg-emerald-600 hover:after:w-full'><Link href = '/#pricing'>Pricing</Link></li>
          <li className='relative after:w-0 after:duration-200 after:h-0.5 after:absolute after:mx-auto after:left-0 flex justify-center after:flex after:justify-center after:items-center after:right-0 after:bottom-0 after:transition-all after:bg-emerald-600 hover:after:w-full'><Link href = '/blogs'>Blog</Link></li>
          <li className='relative after:w-0 after:duration-200 after:h-0.5 after:absolute after:mx-auto after:left-0 flex justify-center after:flex after:justify-center after:items-center after:right-0 after:bottom-0 after:transition-all after:bg-emerald-600 hover:after:w-full'><Link href='/FAQs'>FAQs</Link></li>
          <li className='relative after:w-0 after:duration-200 after:h-0.5 after:absolute after:mx-auto after:left-0 flex justify-center after:flex after:justify-center after:items-center after:right-0 after:bottom-0 after:transition-all after:bg-emerald-600 hover:after:w-full'><Link href='/contact'>Contact</Link></li>
        </ul>
        </nav>
        </div>
        <div className= {`${showDrawer ? '' : '-translate-x-72'} fixed left-0 duration-200 transition-all top-0 bottom-0 w-72 z-30`}>
            <div className="flex flex-col w-full p-4 list-none bg-white h-screen">
                <li><Link href="/" className=" items-start text-gray-900 "><Image src="/images/sidebar-logo.png" alt="Footer Logo" width={180} height={60} className="w-[180px] h-[60px] " /></Link></li>
                <li className=""><Link className="flex font-medium items-center mt-5" href="/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-700"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" /></svg><span className="ml-3 mt-1 font-medium text-gray-600"></span>Home</Link></li>
                <li className="mt-2 "><Link className="flex font-medium items-center mt-5" href="/about"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-700"> <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" /> </svg> <span className="ml-3 mt-1 font-medium text-gray-600"></span>About</Link></li>
                <li className="mt-2 "><Link className="flex font-medium items-center mt-5" href="/#features"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-700"><path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" /></svg><span className="ml-3 mt-1 font-medium text-gray-600"></span>Features</Link></li>
                <li className="mt-2 "><Link className="flex font-medium items-center mt-5" href="/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-700"> <path fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" /> <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" /> </svg> <span className="ml-3 mt-1 font-medium text-gray-600"></span>How it Work?</Link></li>
                <li className="mt-2 "><Link className="flex font-medium items-center mt-5" href="/#pricing"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-700"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 7.5A.75.75 0 009 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 009 12h3.622a2.251 2.251 0 01-2.122 1.5H9a.75.75 0 00-.53 1.28l3 3a.75.75 0 101.06-1.06L10.8 14.988A3.752 3.752 0 0014.175 12H15a.75.75 0 000-1.5h-.825A3.733 3.733 0 0013.5 9H15a.75.75 0 000-1.5H9z" clipRule="evenodd" /></svg><span className="ml-3 mt-1 font-medium text-gray-600"></span>Pricing</Link></li>
                <li className="mt-2 "><Link className="flex font-medium items-center mt-5" href="/blogs"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-700"><path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" /><path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" /></svg><span className="ml-3 mt-1 font-medium text-gray-600"></span>Blog</Link></li>
                <li className="mt-2 "><Link className="flex font-medium items-center mt-5" href="/FAQs"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-700"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" /></svg><span className="ml-3 mt-1 font-medium text-gray-600"></span>FAQs</Link></li>
                <li className="mt-2 "><Link className="flex font-medium items-center mt-5" href="/contact"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-700"> <path fillRule="evenodd" d="M15 3.75a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V5.56l-4.72 4.72a.75.75 0 11-1.06-1.06l4.72-4.72h-2.69a.75.75 0 01-.75-.75z" clipRule="evenodd" /> <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" /> </svg> <span className="ml-3 mt-1 font-medium text-gray-600"></span>Contact</Link></li>
                <li className="mt-6  w-full"><Link href="/register" className="text-white bg-teal-600 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 block text-center w-full">Get started</Link></li>
            </div>
        </div>
        <div onClick={() => setShowDrawer(!showDrawer)} className= {`${showDrawer ? '' : 'hidden'} bg-gray-300 bg-opacity-30 w-full text-gray-900 absolute inset-0 h-screen`}></div>
        </div>
    </nav>
</header>
        </>
    )
}