import { useEffect, useState } from "react";
import Header from "@/components/general/header";
import Image from 'next/image'
import Link from 'next/link'
import Footer from "@/components/general/footer";

export default function HomePage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [planChanged, setPlanChanged] = useState('monthly');

const planChange = (e) => {
  // e.preventDefault();
  setPlanChanged(e.target.value);
}


useEffect(() => {
  setIsHydrated(true);
}, []);


if(!isHydrated) return;
  
return (
  <div className="bg-white font-outfit">
 <Header/>
 {/* <MobileHeader/> */}

 <div className="bg-white">
      <div className="relative isolate px-6  lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#34d399] to-[#34d399] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath:'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',}}/>
        </div>
        <div className="mx-auto lg:max-w-[1000px]  py-20 mt-12 lg:py-[140px]">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
           <div className="flex items-center gap-2  ring-1 ring-gray-900/20 hover:ring-emerald-600 rounded-full px-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6" fill="none" viewBox="0 0 256 258"><g clipPath="url(#clip0_10022_2)"><path fill="url(#paint0_linear_10022_2)" d="M5.464 127.455c-.006 21.677 5.658 42.843 16.428 61.499L4.434 252.696l65.232-17.104a122.993 122.993 0 0058.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01.013-32.867-12.775-63.773-36.009-87.025-23.23-23.25-54.125-36.06-87.043-36.076-67.823 0-123.022 55.18-123.05 123.004"></path><path fill="url(#paint1_linear_10022_2)" d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0 58.276 0 1.098 57.16 1.07 127.416zm40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06 20.003 20.018 31.01 46.628 31.003 74.93-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295-40.098 10.513 10.706-39.082v.001z"></path><path fill="#fff" d="M96.68 74.147c-2.387-5.303-4.898-5.41-7.167-5.503-1.858-.08-3.982-.074-6.104-.074-2.124 0-5.575.8-8.492 3.984-2.92 3.188-11.148 10.892-11.148 26.561 0 15.67 11.414 30.813 13.005 32.94 1.593 2.123 22.032 35.307 54.405 48.073 26.904 10.609 32.379 8.499 38.218 7.967 5.84-.53 18.844-7.702 21.497-15.139 2.655-7.436 2.655-13.81 1.859-15.142-.796-1.327-2.92-2.124-6.105-3.716-3.186-1.593-18.844-9.298-21.763-10.361-2.92-1.062-5.043-1.592-7.167 1.597-2.124 3.184-8.223 10.356-10.082 12.48-1.857 2.129-3.716 2.394-6.9.801-3.187-1.598-13.444-4.957-25.613-15.806-9.468-8.442-15.86-18.867-17.719-22.056-1.858-3.184-.198-4.91 1.398-6.497 1.432-1.427 3.187-3.719 4.781-5.578 1.588-1.86 2.118-3.187 3.18-5.311 1.063-2.126.531-3.986-.264-5.579-.798-1.593-6.987-17.344-9.82-23.64z" ></path></g><defs>
                <linearGradient id="paint0_linear_10022_2" x1="12361.1" x2="12361.1" y1="24829" y2="4.451" gradientUnits="userSpaceOnUse"><stop stopColor="#1FAF38"></stop><stop offset="1" stopColor="#60D669"></stop></linearGradient>
                <linearGradient id="paint1_linear_10022_2" x1="12800" x2="12800" y1="25714.7" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#F9F9F9"></stop><stop offset="1" stopColor="#fff"></stop></linearGradient>
                <clipPath id="clip0_10022_2"><path fill="#fff" d="M0 0H256V258H0z"></path></clipPath>
              </defs>
            </svg>
           <p className="relative py-1 text-sm leading-6 text-gray-600 ">
           Driven by the Official WhatsApp Business API
            </p>
           </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-inter font-extrabold lg:leading-[65px] text-gray-900 lg:text-6xl">Effortless Communication. Enhanced Engagement</h1>
            <p className="mt-6 text-base lg:text-lg  text-gray-700">
            Revolutionize Your Business with WhatsApp Solutions: Seamless Communication, Enhanced Engagement, and Unmatched Growth – Elevate Your Success Today!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="#" className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm">
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
       
      </div>
    </div>

    <section className="bg-gray-950">
    <div className="gap-8  items-center py-8 px-4 mx-auto w-full  md:grid md:grid-cols-2  lg:px-6">
        <Image className="w-full rounded-xl shadow-lg" width={992} height={715} src="/images/dashboard.png" alt="dashboard image"/>
      
        <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl font-extrabold text-white">About Triggrs Chat</h2>
            <p className="mb-6 font-light text-gray-100 md:text-lg">Welcome to our Chat Automation Service! Revolutionize your business communication and enhance customer experience with our cutting-edge chatbot solutions.</p>
            <Link href="/about" className="inline-flex items-center text-white bg-emerald-600 font-medium rounded-full text-sm px-5 py-2.5 text-center">
               Know more
            </Link>
        </div>
    </div>
</section>


<section id="features" className="bg-white  py-10 lg:py-10">
  <div className="py-8 px-4 mx-auto lg:max-w-[1200px] sm:py-16 lg:px-6">
      <div className="flex flex-col text-center w-full mb-20">
      <h1 className="lg:text-4xl text-3xl font-bold text-slate-700 mb-4 ">Features</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Our chatbots are designed to handle customer inquiries, provide instant responses, and even escalate complex issues to human agents when necessary</p>
    </div>
      <div className="space-y-8 px-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div className="hover:scale-105 duration-300">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-emerald-500/20 lg:h-12 lg:w-12">
              <svg className="w-6 h-6 text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm14.25 6a.75.75 0 01-.22.53l-2.25 2.25a.75.75 0 11-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 111.06-1.06l2.25 2.25c.141.14.22.331.22.53zm-10.28-.53a.75.75 0 000 1.06l2.25 2.25a.75.75 0 101.06-1.06L8.56 12l1.72-1.72a.75.75 0 10-1.06-1.06l-2.25 2.25z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">No Code Automation</h3>
              <span className="text-gray-500 "> From placing orders to making reservations, our chatbots provide a frictionless user experience by streamlining processes and eliminating unnecessary steps.</span>
          </div>
          <div className="hover:scale-105 duration-300">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-emerald-500/20 lg:h-12 lg:w-12">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-emerald-600"><path fillRule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold ">Contact Management</h3>
              <span className="text-gray-500 ">Easily import and organize your contact lists, segment them based on various criteria, and create personalized campaigns tailored to specific customer segments.</span>
          </div>
          <div className="hover:scale-105 duration-300">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-emerald-500/20 lg:h-12 lg:w-12">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="123" height="120" fill="none" viewBox="0 0 123 120" >
              <g clipPath="url(#clip0_8188_79)"> <path fill="#059669" d="M57.49 29.2v-5.67c-.69-.258-1.358-.57-2-.93a12.18 12.18 0 01-5.05-15.1 12.39 12.39 0 012.64-3.95A12.21 12.21 0 0157 .92 12 12 0 0161.66 0a12.14 12.14 0 0111.22 7.5 12.14 12.14 0 010 9.27 12.08 12.08 0 01-2.64 3.94l-.06.06c-.712.7-1.504 1.315-2.36 1.83a11.26 11.26 0 01-2 .93v5.67H94.3a15.472 15.472 0 0115.42 15.43v2.29H115a7.93 7.93 0 017.9 7.91V73.2a7.93 7.93 0 01-7.9 7.91h-5.25v2.07A15.48 15.48 0 0194.3 98.61H55.23l-23.42 20.11a2.585 2.585 0 01-2.858.339 2.573 2.573 0 01-.792-.629 2.63 2.63 0 01-.63-1.85l1.25-18h-.21a15.45 15.45 0 01-15.41-15.4v-2.07H7.91A7.93 7.93 0 010 73.2V54.83a7.93 7.93 0 017.9-7.91h5.26v-2.3A15.45 15.45 0 0128.57 29.2h28.92zm25.25 18.12a9.36 9.36 0 110 18.72 9.36 9.36 0 010-18.72zm-42.58 0a9.36 9.36 0 110 18.72 9.36 9.36 0 010-18.72zm6.38 31.36a2.277 2.277 0 01-.38-.38 2.18 2.18 0 01-.52-1.36 2.21 2.21 0 01.85-1.78 3.22 3.22 0 013.88-.08A22.36 22.36 0 0056 78.32a14.86 14.86 0 005.47 1 16.18 16.18 0 005.53-1.1A25.39 25.39 0 0072.75 75a3.24 3.24 0 013.89.18c.136.125.26.262.37.41.294.406.442.9.42 1.4a2.33 2.33 0 01-1.01 1.73 30.59 30.59 0 01-7.33 4 22.279 22.279 0 01-7.53 1.43A21.219 21.219 0 0154 82.87a27.778 27.778 0 01-7.41-4.16l-.05-.03zM94.29 34.4H28.57a10.26 10.26 0 00-10.22 10.23v38.55a10.26 10.26 0 0010.22 10.23h3.17a2.61 2.61 0 012.41 2.77l-1 14.58 19.3-16.61a2.56 2.56 0 011.83-.75h40a10.262 10.262 0 0010.22-10.23V44.62A10.236 10.236 0 0094.29 34.4z" ></path></g>
             <defs> <clipPath id="clip0_8188_79"><path fill="#fff" d="M0 0H122.88V119.35H0z"></path></clipPath></defs></svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold ">Chatbots</h3>
              <span className="text-gray-500">Empower instant user actions with our advanced chat automation service. Seamlessly connect with your customers through our intuitive chatbot platform.</span>
             </div>

          <div className="hover:scale-105 duration-300">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-emerald-500/20 lg:h-12 lg:w-12">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-emerald-600"><path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold ">Manage Auto-Replies</h3>
              <span className="text-gray-500 ">TriggrsChat empowers businesses to create custom auto responses that ensure prompt replies to customer messages.</span>
          </div>
          <div className="hover:scale-105 duration-300">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-emerald-500/20 lg:h-12 lg:w-12">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-emerald-600"><path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" /><path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" /></svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold ">Multiple Agents</h3>
              <span className="text-gray-500 ">Protect your organization, devices and stay compliant with our structured workflows and custom permissions made for you.</span>
          </div>
          <div className="hover:scale-105 duration-300">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-emerald-500/20 lg:h-12 lg:w-12">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-emerald-600"><path fillRule="evenodd" d="M5.636 4.575a.75.75 0 010 1.06 9 9 0 000 12.729.75.75 0 01-1.06 1.06c-4.101-4.1-4.101-10.748 0-14.849a.75.75 0 011.06 0zm12.728 0a.75.75 0 011.06 0c4.101 4.1 4.101 10.749 0 14.85a.75.75 0 11-1.06-1.061 9 9 0 000-12.728.75.75 0 010-1.06zM7.757 6.696a.75.75 0 010 1.061 6 6 0 000 8.485.75.75 0 01-1.06 1.061 7.5 7.5 0 010-10.607.75.75 0 011.06 0zm8.486 0a.75.75 0 011.06 0 7.5 7.5 0 010 10.607.75.75 0 01-1.06-1.06 6 6 0 000-8.486.75.75 0 010-1.06zM9.879 8.818a.75.75 0 010 1.06 3 3 0 000 4.243.75.75 0 11-1.061 1.06 4.5 4.5 0 010-6.363.75.75 0 011.06 0zm4.242 0a.75.75 0 011.061 0 4.5 4.5 0 010 6.364.75.75 0 01-1.06-1.06 3 3 0 000-4.244.75.75 0 010-1.06zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Broadcast</h3>
              <span className="text-gray-500 ">Discover the convenience and effectiveness of our WhatsApp broadcast feature and unlock new possibilities for your business.</span>
          </div>
      </div>
  </div>
</section>

<section className="bg-white py-6 sm:py-8 lg:py-12 ">
  <div className="mx-auto lg:max-w-[1280px] px-4 md:px-8">
    <div className="mb-4 flex flex-col items-center md:mb-8 lg:mb-12 lg:flex-row lg:justify-between">
      <h2 className="mb-2 text-center text-3xl  font-bold text-slate-700 lg:mb-0 lg:text-4xl">Integrations</h2>
      {/* <p className="max-w-md text-center text-gray-600 lg:text-right">Filler text is dummy text which has no meaning however looks very similar to real text.</p> */}
    </div>

    <div className="grid grid-cols-1 gap-4 rounded-lg lg:grid-cols-3 md:grid-cols-3 lg:gap-6">
     
      <div className="flex h-24 items-center justify-center rounded-2xl bg-emerald-500/10 p-4 text-gray-400 md:h-24 lg:h-32">
      <Image className=' w-[180px] h-[60px] lg:w-[220px] lg:h-[77px] md:w-[180px] md:h-[60px] hover:scale-110 duration-300' src="/images/shopify.png"  alt="Profile Image" width={220}  height={77}/> 
      </div>
      
      <div className="flex h-24 items-center justify-center rounded-2xl bg-emerald-500/10 p-4 text-gray-400 md:h-24 lg:h-32">
      <Image className='  w-[200px] h-[60px] lg:w-[280px] lg:h-[77px] md:w-[180px] md:h-[55px] hover:scale-110 duration-300' src="/images/googlesheet.png"  alt="Profile Image" width={250}  height={77}/> 
      </div>
     
      <div className="flex h-24 items-center justify-center rounded-2xl bg-emerald-500/10 p-4 text-gray-400 md:h-24 lg:h-32">
      <Image className='  w-[180px] h-[70px] lg:w-[210px] lg:h-[77px] md:w-[180px] md:h-[60px] hover:scale-110 duration-300' src="/images/hubspot.png"  alt="Profile Image" width={210}  height={77}/> 
      </div>
   
    </div>
  </div>
</section>

<section id="pricing" className="relative  overflow-hidden  bg-white pt-16 pb-12 lg:pt-[50px] lg:pb-[90px]">
  <div className="lg:max-w-[1200px] mx-auto">
    <div className="flex flex-wrap">
      <div className="w-full px-4">
        <div className="mx-auto mb-[45px] max-w-[510px] text-center lg:mb-10">
          <h2 className="text-slate-700  font-bold  mb-3 text-3xl sm:text-4xl md:text-[40px]">Our Pricing Plan</h2>
          <p className="text-body-color text-base">Flexible Pricing, No setup fees</p>
        </div>
      </div>
    </div>

<ul className="grid w-60 rounded-lg mb-3 grid-cols-2 bg-emerald-600/10 mx-auto">
    <li>
        <input type="radio" defaultChecked = {true} onChange={(e) => planChange(e)} id="monthlycharge" name="fees" value="monthly" className="hidden peer" required />
        <label htmlFor="monthlycharge" className="inline-flex items-center justify-between peer-checked:transition-all peer-checked:duration-200 w-full p-2 text-emerald-600 rounded-l-lg cursor-pointer text-center peer-checked:text-white peer-checked:rounded-l-lg peer-checked:bg-emerald-600 hover:text-emerald-600 hover:bg-emerald-600/10">                           <div className="w-full text-sm font-medium">Monthly</div></label>
    </li>
    <li>
        <input type="radio" onChange={(e) => planChange(e)} id="annualcharge" name="fees" value="annual" className="hidden peer" />
        <label htmlFor="annualcharge" className="inline-flex items-center justify-between peer-checked:transition-all peer-checked:duration-200 w-full p-2 text-emerald-600 rounded-r-lg cursor-pointer text-center peer-checked:text-white peer-checked:rounded-r-lg peer-checked:bg-emerald-600 hover:text-emerald-600 hover:bg-emerald-600/10"><div className="w-full text-sm font-medium">Yearly</div></label>
    </li>
</ul>
{/* <div className="mb-10 text-center text-slate-900 px-6 text-sm">{ planChanged == 'annual' ? <span>Unlock huge savings of <span className="font-semibold">₹6000</span> by choosing our yearly plan!</span> : <span>Dive into endless possibilities with our flexible monthly plan!</span>}</div>
    {
      planChanged == 'monthly' ? <MonthlyPricingComponent /> : <AnnualPricingComponent />
    } */}
  </div>
</section>

<section className=" bg-white py-8">
  <div className="lg:max-w-[1300px] px-2 pb-10 mx-auto">
    <div className="flex flex-col text-center px-3 w-full mb-8">
      <h1 className="lg:text-3xl text-2xl   font-bold text-slate-700">Billing based on Conversations, Not Messages</h1>
      <span className="text-lg text-emerald-600 mt-1 italic title-font ">Yes, that&apos;s correct. Each conversation has a 24-hour window where you can send unlimited messages.</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <div className="p-4 w-full">
        <div className="flex rounded-xl border-2 border-emerald-500 bg-emerald-500/10 duration-300 h-full  p-8 flex-col">
          <div className="flex gap-3 items-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#059669" className="w-8 h-8">
           <path fillRule="evenodd" d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 001.28.53l4.184-4.183a.39.39 0 01.266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
             </svg>
            <h2 className="text-slate-800 text-xl font-semibold">User Initiated Conversation</h2>
          </div>
          <div className="flex-grow">
            <p className="leading-relaxed text-base">If a user sends a message and the business responds, a 24-hour conversation session is triggered and remains active.</p>
          </div>
        </div>
      </div>
      <div className="p-4 w-full">
        <div className="flex rounded-xl border-2 border-emerald-500 duration-300 h-full bg-emerald-500/10 p-8 flex-col">
          <div className="flex gap-3 items-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#059669" className="w-8 h-8">
           <path fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
             <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
            </svg>
            <h2 className="text-slate-800 text-xl  font-semibold">Business Initiated Converstation</h2>
          </div>
          <div className="flex-grow">
            <p className="leading-relaxed text-base">If a business initiates the conversation by sending the first message, the conversation session is immediately activated and remains valid for 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<section className="py-14 bg-white">
  <div className="lg:max-w-[1250px] items-center text-center bg-slate-900 lg:rounded-2xl px-5 py-14 mx-auto">
    <div className="lg:max-w-[1000px] w-full mx-auto ">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline-block items-center justify-center w-8 h-8 text-emerald-600 mb-8" viewBox="0 0 975.036 975.036">
      <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zm-819 856.3c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
    </svg>
      <p className=" text-[21px] text-white font-semibold">Flexible and Tailored Pricing: WhatsApp Conversation Charges based on customer interactions, allowing you to pay for what you need. Fees per conversation vary by country, providing a customized solution.</p>
      <span className="inline-block h-1 w-20 rounded bg-emerald-500 mt-8 mb-6"></span>
    </div>
  </div>
</section>


<section>
<div  className="py-12 lg:py-20  bg-white">
  <div className="lg:max-w-[1300px]  items-center mx-auto px-6 text-gray-600 md:px-12 xl:px-6">
  <div className=" mx-auto items-center md:mb-8 lg:mb-8 ">
      <h2 className="mb-2 text-center text-3xl  font-bold text-slate-700 lg:mb-0 lg:text-4xl">Our Blogs</h2>
    </div>
    {/* <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
     <BlogCard/>
     <BlogCard/>
     <BlogCard/>
    </div> */}
    <div className="p-2  text-center mt-12">
          <Link href="/blogs" className=" text-white justify-center  bg-emerald-500  py-2 px-8 rounded-lg text-lg">View more</Link>
        </div>
  </div>
</div>
</section>

 <section className="pb-14 bg-white font-nunito">
        <div className="lg:max-w-[1280px]  mx-auto px-6">
          <div
            className={`relative z-10 overflow-hidden rounded-3xl   bg-gradient-to-r from-emerald-600 to-teal-500 py-12 px-8 md:p-[70px]`}
          >
            <div className="flex flex-wrap items-center -mx-4">
              <div className="w-full px-4 lg:w-1/2">
                <span className="mb-2 text-base font-semibold text-white">
                  Find Your Next Dream App
                </span>
                <h2 className="mb-6 text-3xl w-[80%]  font-bold leading-tight text-white sm:mb-8 lg:text-[38px] lg:mb-0">
                  Get started with our free trial
                </h2>
              </div>
              <div className="w-full px-4 lg:w-1/2">
                <div className="flex flex-wrap space-x-4 lg:justify-end">
                  <Link href="/price" className={`my-1 cursor-pointer inline-block rounded-full bg-info py-4 px-6 text-base font-medium text-white  bg-gray-100/30 md:px-9 lg:px-6 xl:px-9`} >
                    Go to Pro
                  </Link>
                 
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </section>

<Footer/>
  </div>
)
}
