import Header from '@/components/general/header'
import Footer from '@/components/general/footer'
import React from 'react'
import Link from 'next/link'

export default function CancellationPolicy() {
  return (
    <div className='bg-white w-full h-full'>
      <Header/>
      {/* Privacy policy starts */}
     <main className='w-11/12 mx-auto lg:max-w-[1200px] py-28'>
     <section className='py-2'>
      <h1 className='text-3xl mb-1 font-inter font-bold uppercase'>Cancellation Policy</h1>
      <p className='text-base lg:text-sm'>Last updated on Jul 16th 2023</p>
      <div className='font-inter leading-5 space-y-6 my-10'>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-8'>Triggrsweb solutions believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:</p>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-8'>Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</p>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-8 '>Triggrsweb solutions does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.</p>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-8 '>In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 30+ days of receipt of the products.</p>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-8 '>In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 30+ days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.</p>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-8 '>In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.</p>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-8 '>In case of any Refunds approved by the Triggrsweb solutions, it’ll take 3-5 days for the refund to be processed to the end customer.</p>
      </div>
      </section>
     
      <section className=''>
        <h2 className='text-2xl font-inter font-semibold uppercase'>Contact Us</h2>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-7 py-2'>For any questions about this Cancellation Policy, please contact us at <Link href= "mailto:support@triggrsweb.com" className='text-teal-700 underline'>support@triggrsweb.com</Link></p>
      </section>
     </main>
     <Footer/>
    </div>
  )
}