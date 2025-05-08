import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from "@/components/general/header";
import Footer from '@/components/general/footer';



export default function AboutPage() {
  return (
    <>
    <Header/>
    <section id="Home" className="relative font-inter py-16 isolate bg-white snap-start w-full  overflow-hidden">
  <video autoPlay loop muted className="w-full h-[360px] lg:h-[800px] object-cover absolute top-0 left-0 right-0 bottom-0">
    <source src="https://twprojects.s3.ap-south-1.amazonaws.com/triggrs-chat/tc-4.mp4" type="video/mp4"/>
  </video>
 
  <div className="lg:max-w-[700px] mx-auto mt-14 px-4 text-center relative pb-14 z-10 lg:mt-28">
    <h1 className="text-white text-4xl lg:text-5xl lg:mb-6 font-bold font-inter mb-4"> Triggrs Chat</h1>
    <p className="text-white font-normal font-inter lg:mb-8 lg:text-base text-sm mb-5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that.</p>
    {/* <button href="/contact-us" className="bg-gradient-to-r from-emerald-600 to-teal-500 py-2 lg:mt-4  px-4 rounded-full text-white">Contact now</button> */}
  </div>
</section>

<section className=" font-inter bg-white">
      <div className="lg:max-w-[1300px] mx-auto flex px-5 py-10 lg:py-20 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="font-opensans lg:text-4xl text-3xl mb-4 font-bold text-slate-800">
           About <span className='font-bold  text-transparent  bg-clip-text bg-gradient-to-r  from-emerald-600 to-teal-500'>Triggrs Chat</span>
          </h1>
          <p className="mb-8 leading-relaxed">Meaningful and lasting customer relationships are nurtured through authentic conversations, one message at a time.</p>
          <div className="flex justify-center">
            <Link href="/register" className="inline-flex text-white bg-slate-800 px-4 py-3 rounded-full text-sm">
              Get started
            </Link>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image className="object-cover object-center rounded-xl" alt="hero" src="/images/about.webp" width={512} height={342}/>
        </div>
      </div>
    </section>

    <section className="text-gray-700 body-font bg-gray-100">
      <div className="lg:max-w-[1300px] px-5 py-20 mx-auto">
        <div className="text-center mb-8">
          <h1 className="lg:text-3xl text-36xl font-bold title-font text-slate-700 mb-4">
            Why Choose Us
          </h1>
          <p className="text-base lg:max-w-[850px] mx-auto text-gray-500">
            Choose Triggrs Chat for seamless WhatsApp integration, efficient automation, and proven results. Elevate your customer support and marketing efforts with our user-friendly, secure, and competitively priced solution.
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full  inline-flex"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
          <div className="p-4  text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full  mb-5 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10"
                viewBox="0 0 24 24"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                Shooting Stars
              </h2>
              <p className="leading-relaxed text-base">
                Blue bottle crucifix vinyl post-ironic four dollar toast vegan
                taxidermy. Gastropub indxgo juice poutine, ramps microdosing
                banh mi pug VHS try-hard.
              </p>
            </div>
          </div>
          <div className="p-4  text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full  mb-5 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10"
                viewBox="0 0 24 24"
              >
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                The Catalyzer
              </h2>
              <p className="leading-relaxed text-base">
                Blue bottle crucifix vinyl post-ironic four dollar toast vegan
                taxidermy. Gastropub indxgo juice poutine, ramps microdosing
                banh mi pug VHS try-hard.
              </p>
            </div>
          </div>
          <div className="p-4  text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full  mb-5 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10"
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                Neptune
              </h2>
              <p className="leading-relaxed text-base">
                Blue bottle crucifix vinyl post-ironic four dollar toast vegan
                taxidermy. Gastropub indxgo juice poutine, ramps microdosing
                banh mi pug VHS try-hard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

<div className="bg-white py-6  lg:py-8">
  <div className="mx-auto lg:max-w-[1200px] px-4 md:px-8">
    <div className="rounded-3xl border border-yellow-600 bg-yellow-600/10 px-4 py-6 md:py-8 lg:py-12">
      <p className="mb-2 text-center  font-semibold text-emerald-600 md:mb-3 lg:text-lg">Triggrs Chat</p>

      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Our Vision</h2>

      <p className="mx-auto max-w-screen-md text-center text-gray-700 md:text-lg">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated.</p>
    </div>
  </div>
</div>


<section>
<div  className="py-12 lg:py-14 font-inter bg-white">
  <div className="lg:max-w-[1300px]  items-center mx-auto px-6 text-gray-600 md:px-12 xl:px-6">
  <div className=" mx-auto items-center md:mb-8 lg:mb-8 ">
      <h2 className="mb-2 text-center text-3xl font-inter font-bold text-slate-700 lg:mb-0 lg:text-4xl">Our Blogs</h2>
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

<Footer/>
    </>
  )
}
