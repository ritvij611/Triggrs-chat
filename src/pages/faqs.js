
import Footer from "@/components/general/footer";
import Header from "@/components/general/header";
import React, { useState } from 'react';

export default function FAQs() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [isOpen8, setIsOpen8] = useState(false);
  const [isOpen9, setIsOpen9] = useState(false);

  const toggleCollapse = (isOpen, setIsOpen) => {
    setIsOpen(!isOpen);
  };
    return(
        <>
    <Header/>
    <section className="bg-white  font-nunito">
    <div className="lg:max-w-[900px] px-4 py-12 lg:py-24 mx-auto">
        <h1 className="text-3xl text-center font-extrabold text-slate-700 lg:text-3xl mt-14 lg:mt-5">Frequently asked questions.</h1>
        <p className="mb-8 lg:max-w-[800px] mx-auto text-lg text-gray-600 text-center">Explore our FAQs to find answers to common questions about Triggrs Chat. If you can&apos;t find what you&apos;re looking for, feel free to contact our support team for further assistance.</p>
        <div className="grid grid-cols-1 gap-4 mt-5 lg:mt-10">
   {/* FAQ 1 */}
             <button onClick={() => toggleCollapse(isOpen1, setIsOpen1)} className="border h-auto border-gray-200 px-3 py-4 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="faq-question cursor-pointer text-start text-slate-800 font-bold text-lg">
                What is Triggrs Chat
                </span>
                <p className={`bg-emerald-500 p-[2px] rounded-full ${isOpen1 ? 'transform rotate-180' : 'transform rotate-0'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </p>
              </div>
              {isOpen1 && <div className="faq-answer pl-1 text-start text-gray-600 mt-1">Triggrs Chat is a SaaS platform that enables businesses to leverage WhatsApp for chat support, automation, and bulk messaging.</div>}
            </button>

            {/* FAQ 2 */}
            <button onClick={() => toggleCollapse(isOpen2, setIsOpen2)} className="border h-auto border-gray-200 px-3 py-4 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="faq-question cursor-pointer text-start text-slate-800 font-bold text-lg">
                How do I get started with Triggrs Chat?
                </span>
                <p className={`bg-emerald-500 p-[2px] rounded-full ${isOpen2 ? 'transform rotate-180' : 'transform rotate-0'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </p>
              </div>
              {isOpen2 && <div className="faq-answer pl-1 text-start text-gray-600 mt-1">Getting started is easy. Sign up for an account, complete the onboarding process, and connect your WhatsApp Business API.</div>}
            </button>

            {/* FAQ 3 */}
            <button onClick={() => toggleCollapse(isOpen3, setIsOpen3)} className="border h-auto border-gray-200 px-3 py-4 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="faq-question cursor-pointer text-start text-slate-800 font-bold text-lg">Is Triggrs Chat compliant with data protection regulations?</span>
                <p className={`bg-emerald-500 p-[2px] rounded-full ${isOpen3 ? 'transform rotate-180' : 'transform rotate-0'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </p>
              </div>
              {isOpen3 && <div className="faq-answer pl-1 text-start text-gray-600 mt-1">Yes, we prioritize data security and comply with all relevant regulations, such as GDPR and CCPA.</div>}
            </button>

            {/* FAQ 4 */}
            <button onClick={() => toggleCollapse(isOpen4, setIsOpen4)} className="border h-auto border-gray-200 px-3 py-4 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="faq-question cursor-pointer text-start text-slate-800 font-bold text-lg">Can I send bulk messages with Triggrs Chat?</span>
                <p className={`bg-emerald-500 p-[2px] rounded-full ${isOpen4 ? 'transform rotate-180' : 'transform rotate-0'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </p>
              </div>
              {isOpen4 && <div className="faq-answer pl-1 text-start text-gray-600 mt-1">Yes, you can create and manage bulk messaging campaigns to reach your audience effectively.</div>}
            </button>

            {/* FAQ 5 */}
            <button onClick={() => toggleCollapse(isOpen5, setIsOpen5)} className="border h-auto border-gray-200 px-3 py-4 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="faq-question cursor-pointer text-start text-slate-800 font-bold text-lg">
                How can I automate responses with Triggrs Chat?
                </span>
                <p className={`bg-emerald-500 p-[2px] rounded-full ${isOpen4 ? 'transform rotate-180' : 'transform rotate-0'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </p>
              </div>
              {isOpen5 && <div className="faq-answer pl-1 text-start text-gray-600 mt-1">You can set up automated replies for frequently asked questions and routine tasks to save time.</div>}
            </button>

             {/* FAQ 6 */}
             <button onClick={() => toggleCollapse(isOpen6, setIsOpen6)} className="border h-auto border-gray-200 px-3 py-4 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="faq-question cursor-pointer text-start text-slate-800 font-bold text-lg">
                Is customer support available if I need assistance?
                </span>
                <p className={`bg-emerald-500 p-[2px] rounded-full ${isOpen4 ? 'transform rotate-180' : 'transform rotate-0'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </p>
              </div>
              {isOpen6 && <div className="faq-answer pl-1 text-start text-gray-600 mt-1">Absolutely! Our customer support team is here to help you with any questions or issues you may encounter.</div>}
            </button>

             {/* FAQ 7 */}
             <button onClick={() => toggleCollapse(isOpen7, setIsOpen7)} className="border h-auto border-gray-200 px-3 py-4 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="faq-question cursor-pointer text-start text-slate-800 font-bold text-lg">
                What is the WhatsApp Business API, and how do I integrate it?
                </span>
                <p className={`bg-emerald-500 p-[2px] rounded-full ${isOpen4 ? 'transform rotate-180' : 'transform rotate-0'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </p>
              </div>
              {isOpen7 && <div className="faq-answer pl-1 text-start text-gray-600 mt-1">The WhatsApp Business API is a tool provided by WhatsApp to enable business communications. We&apos;ll guide you through the integration process.</div>}
            </button>

             {/* FAQ 8 */}
             <button onClick={() => toggleCollapse(isOpen8, setIsOpen8)} className="border h-auto border-gray-200 px-3 py-4 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="faq-question cursor-pointer text-start text-slate-800 font-bold text-lg">
                Is there an API for Triggrs Chat?
                </span>
                <p className={`bg-emerald-500 p-[2px] rounded-full ${isOpen4 ? 'transform rotate-180' : 'transform rotate-0'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </p>
              </div>
              {isOpen8 && <div className="faq-answer pl-1 text-start text-gray-600 mt-1">Yes, we provide an API to help you customize and extend the functionality of our platform.</div>}
            </button>

             {/* FAQ 9 */}
             <button onClick={() => toggleCollapse(isOpen9, setIsOpen9)} className="border h-auto border-gray-200 px-3 py-4 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="faq-question cursor-pointer text-start text-slate-800 font-bold text-lg">
                Can I use Triggrs Chat on mobile devices?
                </span>
                <p className={`bg-emerald-500 p-[2px] rounded-full ${isOpen4 ? 'transform rotate-180' : 'transform rotate-0'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </p>
              </div>
              {isOpen9 && <div className="faq-answer pl-1 text-start text-gray-600 mt-1">Yes, our platform is accessible on both desktop and mobile devices for your convenience.</div>}
            </button>

        </div>
    </div>
</section>

<Footer/>
        </>
        
    )
}


