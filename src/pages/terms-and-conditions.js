import Footer from '@/components/general/footer'
import TopHeader from '@/components/general/header'
import Link from 'next/link'
import React from 'react'

export default function TermsAndConditions() {
  return (
    <div className='bg-white w-full h-full'>
      <TopHeader />
      {/* Privacy policy starts */}
     <main className='w-11/12 mx-auto lg:max-w-[1200px] py-28'>
     <section className='py-2'>
        <h1 className='text-3xl mb-1 font-inter font-bold uppercase'>Terms and Conditions</h1>
        <p className='text-base lg:text-sm'>Updated Date: 12/07/23</p>
      </section>

      <section className='py-8 mt-10'>
        <h2 className='text-2xl font-inter font-semibold uppercase'>Introduction</h2>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-8 py-2'>TriggrsChat is a platform that allows businesses to communicate with their customers via WhatsApp. These terms and conditions govern your use of TriggrsChat.</p>
      </section>

      <section>
        <h2 className='text-2xl font-inter font-semibold uppercase'>Acceptance</h2>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-8 py-2'>By using TriggrsChat, you agree to be bound by these terms and conditions. If you do not agree to these terms and conditions, you may not use TriggrsChat</p>
      </section>

      <section className='py-8'>
        <h2 className='text-2xl font-inter font-semibold uppercase'>Our Services Via TriggrsChat</h2>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-8 py-2'>TriggrsChat provides a platform that allows businesses to communicate with their customers via WhatsApp. You may use TriggrsChat to send and receive messages, create and manage contact lists, and track messages.</p>
      </section>

      <section className='py-8'>
      <h2 className='text-2xl font-inter font-semibold uppercase'>About Content</h2>
      <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-8 py-2'>You are responsible for all content that you create or post on TriggrsChat. TriggrsChat does not control the content that users create or post on TriggrsChat, and does not guarantee the accuracy, completeness, or quality of such content.</p>
      </section>

      {/* <section className='py-8'>
      <h2 className='text-2xl font-inter font-semibold uppercase'>TriggrsChat Rights</h2>
      <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-8 py-2'>TriggrsChat owns all intellectual property rights in TriggrsChat, including the TriggrsChat name and logo. You may not use the TriggrsChat name or logo without the express written permission of TriggrsChat.</p>
      </section> */}

      <section className='py-8'>
        <h2 className='text-2xl font-inter font-semibold uppercase'>Liabilities</h2>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-7 py-2'>TriggrsChat is not liable for any damages that you may suffer as a result of using TriggrsChat. TriggrsChat makes no warranties or representations about the accuracy, completeness, or quality of TriggrsChat or the content that users create or post on TriggrsChat.</p>
      </section>

      <section className='py-8'>
        <h2 className='text-2xl font-inter font-semibold uppercase'>Changes to Terms and Conditions</h2>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-7 py-2'>TriggrsChat may update these terms and conditions from time to time. If we make any significant changes, we will notify you by email or through a notice on our website.</p>
      </section>

      <section className='py-8'>
        <h2 className='text-2xl font-inter font-semibold uppercase'>Additional Terms of use</h2>
        <ul className='space-y-2 my-4 list-disc pl-4'>
        <li>You must be at least 18 years old to use TriggrsChat.</li>
        <li>You may not use TriggrsChat for any illegal or unauthorized purpose.</li>
        <li>You are responsible for keeping your account information secure.</li>
        <li>You may not use TriggrsChat to spam or harass other users.</li>
        <li>You may not use TriggrsChat to violate the privacy of other users.</li>
        <li>TriggrsChat may terminate your account if you violate these terms and conditions.</li>
      </ul>
      </section>

      <section className='py-8'>
        <h2 className='text-2xl font-inter font-semibold uppercase'>Contact Us</h2>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-7 py-2'>For any questions about this Terms of use, please contact us at <Link href= "mailto:support@triggrsweb.com" className='text-teal-700 underline'>support@triggrsweb.com</Link></p>
      </section>


     </main>
     <Footer />
    </div>
  )
}
