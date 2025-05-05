import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
    return(
        <>
 <footer className="p-4 bg-gray-900 font-nunito md:p-8 lg:p-10 ">
  <div className="mx-auto max-w-screen-xl text-center">
      <div className="flex gap-3 font-nunito font-extrabold justify-center items-center text-2xl py-5 text-gray-100 ">
        <Link href = "/" ><Image className=' rounded-[20px] shadow-md 'src="/images/final-logo.svg" alt="Profile Image"width={65} height={65} /></Link>
        Triggrs Chat
      </div>
      {/* <p className="my-6 text-gray-300">Open-source library of over 400+ web components and interactive elements built for better web.</p> */}
      <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 ">
          <li><Link href="/about" className="mr-4 text-gray-200  md:mr-6 ">About</Link></li>
          <li><Link href="/#features" className="mr-4  text-gray-200 md:mr-6">Features</Link></li>
          <li><Link href="/#pricing" className="mr-4 text-gray-200  md:mr-6 ">Pricing</Link></li>
          <li><Link href="#" className="mr-4 text-gray-200 md:mr-6">How it work?</Link></li>
          <li><Link href="/blogs" className="mr-4 text-gray-200  md:mr-6">Blogs</Link></li>
          <li><Link href="/faqs" className="mr-4 text-gray-200 md:mr-6">FAQs</Link></li>
          <li><Link href="/contact" className="mr-4 text-gray-200 md:mr-6">Contact</Link></li>
          <li><Link href="/privacy-policy" className="mr-4 text-gray-200 md:mr-6">Privacy Policy</Link></li>
          <li><Link href="/terms-and-conditions" className="mr-4 text-gray-200 md:mr-6">Terms of Use</Link></li>
          <li><Link href="/cancellation-policy" className="mr-4 text-gray-200 md:mr-6">Cancellation Policy</Link></li>
          {/* <li><Link href="/cancellation-policy" className="mr-4 text-gray-200 md:mr-6">Cancell</Link></li> */}
      </ul>
      <span className="text-sm text-gray-300 sm:text-center ">© 2023 <Link href="#" className="">Triggrs Chat</Link>. All Rights Reserved.</span>
  </div>
</footer>
 
        </>
    )
}


{/* <li><button className='bg-emerald-600 px-4 py-2 rounded-lg text-white font-medium'> 
      Upgrade
      </button></li> */}