import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const EnterOtp = () => {
    const [errRef, setErrRef] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const router = useRouter();

    const startUserSession = async (country, whatsapp) => {
        const sessionData = await fetch('/api/start-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'phone': whatsapp,
                'country': country
            })
        });
        const getSessData = await sessionData.json();
        if (getSessData) {
            // console.log(getSessData);
            cookies.set('twchat', getSessData.token, {
                expires: new Date((getSessData.exp * 1000) + 2592000000), // 1 day
                path: '/',
                sameSite: true,
                // secure: true
            });
        } else {
            setSnackBarContent(() => 'Something went wrong!');
            showSnackBar(true);
        }
    }

    const handleChange = (e) => {
      const { value } = e.target;
      setOtp(value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setErrRef('Please enter OTP');
    };
  
    return (
        <>
        <section className="relative z-10 overflow-hidden bg-[url('/images/register-bg.svg')] bg-cover bg-center w-full h-screen flex justify-center items-center font-inter py-20 lg:py-20 bg-[#F4F7FF]">
      <div className="max-w-[1000px] min-w-[95%] md:min-w-[450px] mx-auto px-5">
      <div className="flex flex-wrap lg:justify-center bg-white shadow-t-sm shadow-t-gray-200 rounded-t-xl px-4 pt-4">
                <div className="text-center mx-auto"><Image className="mx-auto inline-block mb-3 rounded-2xl shadow-sm shadow-gray-200" src="/images/final-logo.svg" alt="logo" width={60} height={60} />
                </div>
                <div className="w-full px-4 py-10">
                    <div className="relative">
                        <h2 className="text-center text-3xl font-extrabold text-slate-900">Enter OTP</h2>
                        <p className='text-sm text-center'>OTP Sent Successfully to your WhatsApp number</p>
                        <form className="mt-8" onSubmit={handleSubmit} method="POST">
                            <div className="mb-2 w-full ">
                                <input className='border-gray-300 w-full placeholder:text-sm rounded-md border bg-white py-2.5 px-2 text-sm placeholder-gray-500 outline-none' type="text" id="otp" name="otp" value={otp} onChange={handleChange} placeholder="Enter OTP here" maxLength={6} pattern="[0-9]*" />
                            </div>
                            <div className='w-full text-xs font-medium mb-4 h-2.5 text-red-600 text-start'>{errRef}</div>
                            <div className='flex flex-col gap-2'>
                                {
                                    isLoading 
                                    ? <button type="button" className="flex w-full items-center justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold uppercase leading-6 text-white shadow-sm "><span className='w-3.5 h-3.5 mr-3 animate-spin rounded-full border-2 border-white border-l-2 border-l-transparent'></span><span>Loading...</span></button>
                                    : <button type="submit" className="flex w-full justify-center rounded-md bg-gradient-to-br to-emerald-500  from-teal-600 px-3 py-2 text-sm font-semibold uppercase leading-6 text-white shadow-sm ">Continue</button>
                                }

                            </div>
                        </form>
                        <div className='w-full flex justify-between items-center py-5'>
                            <button type='button' onClick={() => router.back()} className='text-slate-800 text-sm gap-2 flex justify-start items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" /></svg>
                                <span>Go Back</span>
                            </button>
                            <button type='button' className='text-emerald-600 text-sm'>Resend OTP</button>
                        </div>
                    </div>
                </div>
            </div>       
      </div>
    </section>
        </>
    )
}

export default EnterOtp