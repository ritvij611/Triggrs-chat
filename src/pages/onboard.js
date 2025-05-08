import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'
import useCompany from '@/hooks/useCompany'
import { useRouter } from 'next/router'
import FacebookSDK from '@/components/facebookSDK'
import useFacebookAuth from '@/hooks/useFacebookAuth'

const Onboard = () => {
  const { user } = useAuth();
  const { company } = useCompany();
  const router = useRouter();
  const [FB, setFB] = useState(null);
  const { launchWhatsAppSignup, isReady } = useFacebookAuth(FB);

  useEffect(() => {
    if(!user || !company) return;
    
    if(!user.authorised) {
      router.replace('/login');
    }

    if(!company.present) {
      router.replace('/select-company');
    }
    if(!company.active) {
      router.replace('/select-plan');
    }
    
  }, [user, company]);


  return (
    !user || !company || !user.authorised || !company.active
      ? <></> 
      : (
        <section className='bg-white w-full h-screen bg-[url("/images/register-bg.svg")] bg-cover flex justify-center items-center'>
          <FacebookSDK 
            appId={process.env.NEXT_PUBLIC_FB_APP_ID}
            onLoad={setFB}
          />
          
          <div className='w-[95%] border border-emerald-500 shadow-md shadow-emerald-200 rounded-xl p-5 bg-white md:w-[460px] lg:w-[500px] mx-auto text-gray-800'>
            <div href="/" className='flex justify-center py-8'>
              <Image className='rounded-[20px] shadow-md' src="/images/final-logo.svg" alt="Profile Image" width={65} height={65} />
            </div>
            
            <div className='w-full my-2 flex flex-col text-center'>
              <h1 className='font-bold text-2xl text-gray-900 uppercase'>Start Onboarding</h1>
              <span className='text-sm pb-8 pt-2'>
                To continue with the platform, you must integrate your account with facebook business account. No need to perform extra steps just click:
              </span>
              
              <button 
                onClick={() => launchWhatsAppSignup(company.companyID)} 
                disabled={!isReady}
                className={`block text-white text-sm px-2 py-2 rounded ${isReady ? 'bg-emerald-600' : 'bg-gray-400'}`}
              >
                {isReady ? 'CONTINUE WITH FACEBOOK' : 'LOADING...'}
              </button>
            </div>
          </div>
        </section>
      )
  )
}

export default Onboard