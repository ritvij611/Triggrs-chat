import Footer from '@/components/general/footer'
import TopHeader from '@/components/general/header'
import Link from 'next/link'
import { useState } from 'react'

export default function PrivacyPolicy() {

  return (
    <div className='bg-white w-full h-full'>
      <TopHeader />
      {/* Privacy policy starts */}
     <main className='w-11/12 mx-auto lg:max-w-[1200px] py-28'>
     <section className='py-2'>
      <h1 className='text-3xl mb-1 font-inter font-bold uppercase'>Privacy Policy</h1>
      <p className='text-base lg:text-sm'>Updated Date: 12/07/23</p>
      <div className='font-inter leading-5 space-y-6 my-10'>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-8'>Welcome to TriggrsChat. TriggrsChat (&quot;WE&quot;, &quot;US&quot; or &quot;OUR&quot;) operates the <Link href = "/" className='text-teal-700 underline'>chat.triggrsweb.com</Link> website (herein after referred to as the &quot;Service&quot;). Our Privacy Policy explains how we collect, use, disclose, and protect information that applies to our Service, and your choices about the collection and use of your information. This policy sets out how TriggrsChat collects and uses the information that we collect about you when you use the TriggrsChat services. This policy also explains the choices that you can make about the way that we use your information.</p>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-8'>By using the Website and registering yourself at <Link href = "/register" className='text-teal-700 underline' >chat.triggrsweb.com/register</Link> you authorize us to contact you via email or phone call or SMS and offer you our services, imparting product knowledge, offer promotional offers running on the website & offers offered by the associated third parties, for which reasons, personally identifiable information may be collected.</p>
      </div>
      </section>
      <section className='py-8'>
      <h2 className='text-2xl font-inter font-semibold uppercase'>Introduction</h2>
      <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-8 py-2'>TriggrsChat is a platform that allows businesses to engage with their customers. We collect personal information from users to provide them with a better experience on our platform. This privacy policy explains what personal information we collect, how we use it, and how we protect it.</p>
      </section>
      <section>
      <h2 className='text-2xl font-inter font-semibold uppercase'>Definitions</h2>
      <ul className='space-y-2 my-4 list-disc pl-4'>
        <li><span className='font-semibold'>Personal Data:</span> Personal data is any information that can be used to identify a living individual, such as their name, address, or email address.</li>
        <li><span className='font-semibold'>Usage Data:</span> Usage Data is data collected automatically either generated by the use of the Service or from the Service infrastructure itself.</li>
        <li><span className='font-semibold'>Cookies:</span> Cookies are small pieces stored on your device (computer or mobile device).</li>
      </ul>
      </section>
      <section className='py-8'>
      <h2 className='text-2xl font-inter font-semibold uppercase'>Personal Information We Collect</h2>
      <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-8 py-2'>We collect the following personal information from users:</p>
      <h3 className='text-xl font-inter font-semibold mb-1'>Personal Data</h3>
        <ul className='list-disc pl-4'>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Address</li>
          <li>Country</li>
          <li>Country code</li>
        </ul>
        <h3 className='text-xl font-inter font-semibold mt-8'>Usage Data</h3>
        <p className='py-2'>We may collect information about how you use our service, such as the pages you visit, the time you spend on each page, and the links you click. This information helps us to improve our service and to provide you with a better experience.</p>
        <p className='py-2'>We may also collect information about your device, such as your IP address, browser type, and operating system. This information helps us to troubleshoot problems with our service and to ensure that it is compatible with your device.</p>
        <p className='py-2'>We may use cookies and other tracking technologies to collect information about your use of our service. This information helps us to track your progress, to personalize your experience, and to measure the effectiveness of our marketing campaigns.</p>
        <p className='py-2'>We may share your usage data with third-party service providers who help us to operate our service. These service providers may use your data to provide us with analytics, advertising, and other services.</p>
      <p className='py-2'>We collect this personal information when users create an account on our platform, sign up for our newsletter, or contact us with customer support.</p>

      <h3 className='text-xl font-inter font-semibold mt-8'>Cookies Data</h3>
        <p className='py-2'>We use cookies and similar tracking technologies to track the activity on our Service and to store certain information. Cookies are small files that are sent to your browser from a website and stored on your device.</p>
        <p className='py-2'>We use cookies and other tracking technologies to collect information about how you use our Service. This information helps us to improve our Service and to provide you with a better experience. For example, we use cookies to track your progress through our website, to remember your preferences, and to measure the effectiveness of our marketing campaigns.</p>
        <p className='py-2'>You can choose to opt out of tracking by changing your browser settings or by using a privacy-focused browser. However, if you opt out of tracking, you may not be able to use all of the features of our Service.</p>
      </section>
      <section className='py-8'>
      <h2 className='text-2xl font-inter font-semibold uppercase'>How We Protect Personal Information</h2>
      <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-8 py-2'>We take steps to protect personal information from unauthorized access, use, or disclosure. These steps include:</p>
        <ul className='list-disc pl-5 space-y-2'>
          <li>Using secure servers to store personal information</li>
          <li>Using encryption to protect personal information in transit</li>
          <li>Requiring users to create strong passwords</li>
        </ul>
      </section>
      <section className='py-8'>
      <h2 className='text-2xl font-inter font-semibold uppercase'>User&apos;s Rights</h2>
      <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-8 py-2'>Users have the following rights with respect to their personal information:</p>
        <ul className='list-disc pl-5 space-y-2'>
          <li>The right to access their personal information</li>
          <li>The right to correct their personal information</li>
          <li>The right to delete their personal information</li>
          <li>The right to opt out of marketing communications</li>
        </ul>
      </section>

      <section className='py-8'>
        <h2 className='text-2xl font-inter font-semibold uppercase'>Data Transfer Policy</h2>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-7 py-2'>Your personal data may be transferred to and stored on servers located outside of your country of residence. This may include countries that have different data protection laws than your own country.</p>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-7 py-2'>By using our Service, you consent to the transfer of your personal data to countries outside of your country of residence. We will take all reasonable steps to ensure that your personal data is protected in accordance with this Privacy Policy.</p>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-7 py-2'>TriggrsChat will take all reasonable steps to protect your personal data. This includes using secure servers and encryption to protect your data from unauthorized access. We will also only transfer your personal data to organizations that have adequate security measures in place.</p>
      </section>

      <section className='py-8'>
        <h2 className='text-2xl font-inter font-semibold uppercase'>Data Deletion</h2>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-7 py-2'>You can request deletion of your Personal Data directly by deleting your account within your Account section. If you are unable to perform this action yourself, you can contact us at <Link href="mailto:support@triggrsweb.com" className='text-teal-700 underline'>support@triggrsweb.com</Link>.</p>
      </section>

      <section className='py-8'>
        <h2 className='text-2xl font-inter font-semibold uppercase'>Data Security</h2>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-7 py-2'>We take the security of your data very seriously. We use industry-standard security measures to protect your data, but no method of transmission or storage is 100% secure. We cannot guarantee the absolute security of your data.</p>
      </section>

      <section className='py-8'>
        <h2 className='text-2xl font-inter font-semibold uppercase'>Analytics</h2>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-7 py-2'>We may use third-party Service Providers to monitor and analyse the use of our Service.</p>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-7 py-2'><span className='font-semibold'>Google Analytics</span> is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualise and personalise the ads of its own advertising network. You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js, analytics.js, and dc.js) from sharing information with Google Analytics about visits activity.</p>
      </section>

      <section className='py-8'>
        <h2 className='text-2xl font-inter font-semibold uppercase'>Updates in Privacy Policy</h2>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-7 py-2'>We will notify you of any changes to this Privacy Policy by email or by posting a notice on our website. The changes will be effective immediately upon posting, or at such later date as specified in the notice. You should review this Privacy Policy periodically for any changes</p>
      </section>

      <section className='py-8'>
        <h2 className='text-2xl font-inter font-semibold uppercase'>Contact Us</h2>
        <p className='text-[16px] lg:text-[16px] leading-7 lg:leading-7 py-2'>For any questions about this Privacy Policy, please contact us at <Link href= "mailto:support@triggrsweb.com" className='text-teal-700 underline'>support@triggrsweb.com</Link></p>
      </section>
     </main>
     <Footer />
    </div>
  )
}
