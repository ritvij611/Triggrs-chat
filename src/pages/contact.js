import Footer from "@/components/general/footer";
import Header from "@/components/general/header";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
    return(
        <>
    <Header/>
   
{/* <section className=" bg-white lg:mt-10 lg:py-20 py-14">
  <div className="lg:max-w-[1200px] mx-auto flex px-5 py-14 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left  items-start text-start">
      <h1 className="lg:text-3xl text-3xl mb-4 font-bold text-slate-800">Get in Touch with Us Today!</h1>
      <p className="mb-8 text-xl lg:text-base text-gray-700 leading-relaxed">&quot;We&apos;re passionate about helping businesses connect with their customers through Triggrs Chat. Let us show you how.&quot; </p>
      <div className="divide-y space-y-4 ">
        <div className="mt-4 flex gap-4 md:items-center">
        <div className="bg-emerald-600/10 rounded-full p-2.5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-emerald-600"> <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" /> <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" /> </svg>
        </div>
          <div className="w-5/6">
            <Link href="mailto:sales@triggrsweb.com" className="font-bold hover:underline text-2xl text-slate-800">sales@triggrsweb.com</Link>
          </div> 
        </div> 
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full mt-5 md:w-1/2 w-5/6">
      <Image width={500} height={500} className="object-cover w-24 h-24 object-center rounded-2xl" alt="contact Triggrs Chat " src="/images/contact-us.webp"/>
    </div>
  </div>
</section> */}

<section className="  bg-white font-inter py-20">
      <div className="lg:max-w-[1200px] mx-auto flex px-5 py-10 lg:py-20 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="font-opensans lg:text-3xl text-2xl mb-4 font-bold text-slate-700">
          Get in Touch with Us Today!
          </h1>
          <p className="mb-8 leading-relaxed">
          &quot;We&apos;re passionate about helping businesses connect with their customers through Triggrs Chat. Let us show you how.&quot; 
          </p>
          <div className="flex justify-center">
          <div className="divide-y space-y-4 ">
        <div className="mt-4 flex gap-4 md:items-center">
        <div className="bg-emerald-600/10 rounded-full p-2.5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-emerald-600"> <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" /> <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" /> </svg>
        </div>
          <div className="w-5/6">
            <Link href="mailto:sales@triggrsweb.com" className="font-bold hover:underline text-2xl text-slate-800">sales@triggrsweb.com</Link>
          </div> 
        </div> 
      </div>
           
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image className="object-cover object-center shadow-lg rounded-3xl" alt="triggrs Chat Contact" src="/images/contact-us.webp" width={512} height={342}/>
        </div>
      </div>
    </section>
<Footer/>
        </>
    )
}


