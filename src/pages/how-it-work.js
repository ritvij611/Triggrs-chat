import Footer from '@/components/general/footer'
import Header from "@/components/general/header";
import Image from 'next/image';

const Howitwork = () => {


  return (
    <>
    <Header/>
    <section className="relative font-nunito z-10 bg-emerald-500 py-14 lg:py-[100px]">
        <div className="w-full">
          <div className="flex ">
            <div className="w-full px-4 mt-16 lg:mt-16">
              <div className="mx-auto max-w-[1100px] text-center">
                <h4 className="mb-3 text-4xl lg:text-5xl font-extrabold text-white">
                  How it work
                </h4>
                <p className="mb-8 text-lg text-white">
                Welcome to Triggrs Chat, the ultimate WhatsApp chat application for businesses. In this section, we&apos;ll guide you through the simple steps of how our platform works, empowering your business with powerful WhatsApp tools.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 flex items-center justify-between w-full h-full space-x-5 -z-10 md:space-x-8 lg:space-x-14">
          <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
          <div className="flex w-1/3 h-full">
            <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
            <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
          </div>
          <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
        </div>
      </section>


<div className="bg-white lg:py-16 font-nunito  overflow-x-hidden">
  <div className="lg:max-w-[1000px] mx-auto px-5">
   
      <div className="flex items-center gap-4 flex-col-reverse py-7 lg:py-0 lg:flex-row lg:gap-6 my-5 ">
        <div className="md:flex gap-2 gap-x-4 px-4 md:px-8 w-full lg:w-[60%] mt-2 lg:mt-0">
        <div>
           <p className='text-3xl font-bold text-whatsapp2'>#1</p> 
        </div>
        <div>
          <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-1 lg:mb-1.5">
            <a className="font-bold text-emerald-800">Sign Up and Onboarding</a>
          </h2>
          <p className="text-gray-500  text-base "><span className='text-base text-slate-700 font-bold'>Create Your Account:-</span> Get started by signing up for <span className='text-emerald-500 font-medium'>Triggrs Chat</span>. It&apos;s quick and easy.</p>
          <p className="text-gray-500  text-base "><span className='text-base text-slate-700 font-bold'>Verify Your WhatsApp Business Account:-</span> We&apos;ll help you through the process of verifying your WhatsApp Business Account.</p>
          <p className="text-gray-500  text-base "><span className='text-base text-slate-700 font-bold'>Access Your Dashboard:-</span> Once verified, log in to your personalized dashboard.</p>
          </div>
        </div>
        <p className="group relative block h-[300px] w-full shrink-0 self-center overflow-hidden  lg:h-auto lg:w-[40%]">
          <Image src="/images/TC-1.svg" width={300} height={200} alt="Sign Up and Onboarding" className="  object-cover  object-center" />
        </p>
      </div>

  
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-6 py-10 lg:py-32">
      <a  className="group relative block h-auto w-full shrink-0 self-center overflow-hidden  lg:h-auto lg:w-[40%]">
          <Image src="/images/TC-2.svg"  width={300} height={200}  alt="Set Up Your WhatsApp Business Profile" className=" object-cover object-center" />
        </a>
        <div className="md:flex gap-2 gap-x-4 px-4 md:px-8 w-full lg:w-[60%] mt-2 lg:mt-0">
        <div>
           <p className='text-3xl font-bold text-whatsapp2'>#2</p> 
        </div>
        <div>
          <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-1 lg:mb-1.5">
            <a className="font-bold text-emerald-800">Set Up Your WhatsApp Business Profile</a>
          </h2>
          <p className="text-gray-500 text-base"><span className='text-base text-slate-700 font-bold'>Customize Your Business Profile:-</span> Add your business name, logo, contact information, and a brief description.</p>
          <p className="text-gray-500 text-base"><span className='text-base text-slate-700 font-bold'>Connect WhatsApp:-</span> Link your WhatsApp Business Account to our platform.</p>
          <p className="text-gray-500 text-base"><span className='text-base text-slate-700 font-bold'>Import Contacts:-</span> Easily import your customer contacts.</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 flex-col-reverse lg:flex-row lg:gap-6 mt-5">
        <div className="md:flex gap-2 gap-x-4 px-4 md:px-8 w-full lg:w-[60%] mt-2 lg:mt-0">
        <div>
           <p className='text-3xl font-bold text-whatsapp2'>#3</p> 
        </div>
        <div>
          <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-1 lg:mb-1.5">
            <a data-aos="fade-right" data-aos-delay="200" data-aos-duration="900" className="font-bold text-emerald-800">Chat Support and Automation</a>
          </h2>
          <p data-aos="fade-right" data-aos-delay="400" data-aos-duration="900" className="text-gray-500  text-base "><span className='text-base text-slate-700 font-bold'>Engage with Customers:-</span> Use the chat interface to provide real-time support to your customers.</p>
          <p data-aos="fade-right" data-aos-delay="700" data-aos-duration="900" className="text-gray-500  text-base "><span className='text-base text-slate-700 font-bold'>Automate Responses:-</span> Create automated responses for common inquiries using our chatbot features.</p>
          <p data-aos="fade-right" data-aos-delay="1000" data-aos-duration="900" className="text-gray-500  text-base "><span className='text-base text-slate-700 font-bold'>Manage Conversations:-</span> Organize and manage all your conversations efficiently.</p>
          </div>
        </div>
        <a  className="group relative block h-[300px] w-full shrink-0 self-center overflow-hidden  lg:h-auto lg:w-[40%]">
          <Image data-aos="zoom-in-up" data-aos-delay="200" data-aos-duration="1000" src="/images/TC-3.svg"  width={300} height={200} alt="Chat Support and Automation" className=" object-cover object-center" />
        </a>
      </div>

  
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-6 py-14 lg:py-32">
      <a  className="group relative block h-[300px] w-full shrink-0 self-center overflow-hidden  lg:h-auto lg:w-[40%]">
          <Image data-aos="zoom-in-up" data-aos-delay="200" data-aos-duration="1000" src="/images/TC-4.svg"  width={300} height={200} alt="WhatsApp Bulk Messaging" className=" object-cover object-center" />
        </a>
        <div className="md:flex gap-2 gap-x-4 px-4 md:px-8 w-full lg:w-[60%] mt-2 lg:mt-0">
        <div>
           <p className='text-3xl font-bold text-whatsapp2'>#4</p> 
        </div>
        <div>
          <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-1 lg:mb-1.5">
            <a data-aos="fade-left" data-aos-delay="200" data-aos-duration="900" className="font-bold text-emerald-800">WhatsApp Bulk Messaging</a>
          </h2>
          <p data-aos="fade-left" data-aos-delay="400" data-aos-duration="900" className="text-gray-500  text-base "><span className='text-base text-slate-700 font-bold'>Create Campaigns:-</span> Design and launch targeted campaigns with our bulk messaging system.</p>
          <p data-aos="fade-left" data-aos-delay="700" data-aos-duration="900" className="text-gray-500  text-base "><span className='text-base text-slate-700 font-bold'>Track Performance:-</span> Monitor the performance of your campaigns through our analytics tools.</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 flex-col-reverse lg:flex-row py-7 lg:py-0 lg:gap-6 mt-5">
        <div className="md:flex gap-2 gap-x-4 px-4 md:px-8 w-full lg:w-[60%] mt-2 lg:mt-0">
        <div>
           <p className='text-3xl font-bold text-whatsapp2'>#5</p> 
        </div>
        <div>
          <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-1 lg:mb-1.5">
            <a data-aos="fade-right" data-aos-delay="200" data-aos-duration="900" className="font-bold text-emerald-800">Monitor and Improve</a>
          </h2>
          <p data-aos="fade-right" data-aos-delay="400" data-aos-duration="900" className="text-gray-500  text-base "><span className='text-base text-slate-700 font-bold'>Analyze Data:-</span> Utilize analytics to gain insights into customer interactions.</p>
          <p data-aos="fade-right" data-aos-delay="700" data-aos-duration="900" className="text-gray-500  text-base "><span className='text-base text-slate-700 font-bold'>Continuous Improvement:-</span> Adapt and improve your strategies based on data and customer feedback.</p>
          </div>
        </div>
        <a  className="group relative block h-[300px] w-full shrink-0 self-center overflow-hidden  lg:h-auto lg:w-[40%]">
          <Image data-aos="zoom-in-up" data-aos-delay="200" data-aos-duration="1000" src="/images/TC-5.svg"  width={300} height={200} alt="Monitor and Improve" className=" object-cover object-center" />
        </a>
      </div>

  
      {/* <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-6 py-10 lg:py-32">
      <a  className="group relative block h-[300px] w-full shrink-0 self-center overflow-hidden rounded-lg lg:h-[270px] lg:w-[40%]">
          <Image src="/images/contact-bg.webp" loading="lazy" width={100} height={100} alt="Web Design and Development by Triggrs Web Solutions" className="absolute inset-0 h-full w-full object-cover object-center" />
        </a>
        <div className="md:flex gap-2 gap-x-4 px-4 md:px-8 w-full lg:w-[60%] mt-2 lg:mt-0">
        <div>
           <p className='text-3xl font-bold text-whatsapp2'>#6</p> 
        </div>
        <div>
          <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-1 lg:mb-1.5">
            <a className="font-bold text-slate-700">Enjoy your New Stuff</a>
          </h2>
          <p className="text-gray-500  text-lg ">Web development is the process of creating websites and web applications using a variety of programming languages and technologies. It encompasses everything from designing the user interface to coding the back-end functionality and deploying the website to a server.</p>
          </div>
        </div>
      </div> */}

      {/* <div className="flex items-center gap-4 flex-col-reverse lg:flex-row lg:gap-6 mt-5">
        <div className="md:flex gap-2 gap-x-4 px-4 md:px-8 w-full lg:w-[60%] mt-2 lg:mt-0">
        <div>
           <p className='text-3xl font-bold text-whatsapp2'>#7</p> 
        </div>
        <div>
          <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-1 lg:mb-1.5">
            <a  className="font-bold text-slate-700">Choose a payment</a>
          </h2>
          <p className="text-gray-500  text-lg ">Web development is the process of creating websites and web applications using a variety of programming languages and technologies. It encompasses everything from designing the user interface to coding the back-end functionality and deploying the website to a server.</p>
          </div>
        </div>
        <a  className="group relative block h-[300px] w-full shrink-0 self-center overflow-hidden rounded-lg lg:h-[270px] lg:w-[40%]">
          <Image src="/images/contact-bg.webp" loading="lazy" width={100} height={100} alt="Web Design and Development by Triggrs Web Solutions" className="absolute inset-0 h-full w-full object-cover object-center" />
        </a>
      </div> */}
       </div>
   </div>
   <Footer/>
  </>
  )
}

export default Howitwork