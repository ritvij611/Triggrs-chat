import React, { useEffect, useRef, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { parseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import Country from '@/components/general/country';
import CompanyLogo from '@/components/general/companylogo';
import { Combobox } from '@/components/ui/combobox';
import { useLogin } from '@/modules/authentication/hooks/useLogin';

export async function getServerSideProps(context) {
  // Fetch data from external API
  try {
    const cookie = context.req.headers.cookie;
    if (cookie) {
      const token = parseCookie(cookie).get('twchat') ? parseCookie(cookie).get('twchat') : '';
      if (!token) {
        return { props: { status: 200 } }
      } else {
        return {
          redirect: {
            permanent: false,
            destination: "/dashboard",
          },
          props: { status: 200 },
        }
      }
    } else {
      return { props: { status: 200 } }
    }
  } catch (e) {
    console.log('error data token', e);
    return { props: { status: 200 } }
  }
}

const Login = (props) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();
  const whatsappRef = useRef();
  const passwordRef = useRef();
  const [errRef, setErrRef] = useState('');
  const [country, setCountry] = useState({country: 'India', code: 91});
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {handleLogin, isLoginLoading, loginError, loginResponse} = useLogin();
  
  // Remove this if not using it - less state is better
  // const [openForgot, setOpenForgot] = useState(false);

  const submitLoginPasswordAccess = async (e) => {
    e.preventDefault();
    const whatsapp = whatsappRef.current.value;
    const password = passwordRef.current.value;

    if (!whatsapp || !password) {
      setErrRef("Please fill all input");
      return;
    }

    handleLogin({
      "phoneNumber": parseInt(whatsapp),
      "country": country.country,
      "countryCode": parseInt(country.code),
      "password": password
    });

    // Use router.push instead of replace and wait for it to complete
    // router.push('/select-company').then(() => {
    //   setTimeout(() => setShowSnackBar(false), 3000);
    // });
  };


  useEffect(() => {
    console.log({isLoginLoading, loginError, loginResponse});
  }, [isLoginLoading, loginError, loginResponse]);


  // Only use for hydration check
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (typeof window == 'undefined') return;

  if(!isHydrated) return;

  return (
    <>
     <section className="relative z-10 overflow-hidden bg-[url('/images/register-bg.svg')] bg-cover bg-center w-full h-screen flex justify-center items-center font-inter py-20 lg:py-20 bg-[#F4F7FF]">
      <div className="max-w-[1000px] min-w-[95%] md:min-w-[450px] mx-auto px-5">
      <div className="flex flex-wrap lg:justify-center bg-white shadow-md shadow-gray-200 rounded-t-xl px-4 pt-4">
                <div className="text-center mx-auto"><div className="mx-auto inline-block mb-3 rounded-2xl shadow-md shadow-gray-200" ><CompanyLogo className="size-[60px]" /></div></div>
                <div className="w-full p-4">
                    <div className="relative">
                        <h2 className="text-center text-2xl font-bold text-slate-900">Welcome Back!</h2>
                        <form onSubmit={submitLoginPasswordAccess} className="mt-4" method="POST">
                            <div className="mb-6 w-full ">
                                <Combobox 
                                  options={Country.map((country) => ({ value: country.country, label: country.country }))} 
                                  placeholder='Select Country'
                                  searchPlaceholder='Search Country'
                                  icon={true}
                                  className='w-full font-normal h-11'
                                  value={country?.country}
                                  onChange={(value) => {
                                      const selectedCountry = Country.find((country) => country.country === value);
                                      if (selectedCountry) {
                                        setCountry(selectedCountry);
                                      }
                                    }
                                  }
                                />
                            </div>
                            <div className="mb-6 w-full ">
                                <label className='relative flex w-full'>
                                    <span className='left-2 border border-gray-300 border-r-0 w-[64px] flex justify-center items-center rounded-l-md bg-white pr-2 inset-y-0 text-sm text-gray-600'>+{country?.code}</span>
                                    <input ref={whatsappRef} type="tel" placeholder={`WhatsApp Number`} className="border-gray-300 w-full placeholder:text-sm rounded-r-md border bg-white py-2.5 px-2 text-sm placeholder-gray-500 outline-none" />
                                </label>
                            </div>
                            <div className="mb-2 w-full ">
                                <label className='relative flex w-full'>
                                    <input ref={passwordRef} type={showPass ? "text" : "password"} placeholder={`Password`} className="border-gray-300 w-full placeholder:text-sm rounded-md border bg-white py-2.5 px-2 text-sm placeholder-gray-500 outline-none" />
                                    <button type='button' onClick={() => setShowPass(!showPass)} className='absolute right-0 w-16 border rounded-r-md border-gray-300 m-auto font-semibold bg-white text-gray-500 p-2.5 top-0 bottom-0 text-xs'>{showPass ? <>HIDE</> : <>SHOW</>}</button>
                                </label>
                            </div>
                            <div className='w-full text-sm h-2.5 mb-4 text-red-600 text-start'>{errRef}</div>
                            <div className='w-full flex justify-end items-center'>
                                <button onClick={()=> alert('alert')} type="button" className="font-medium text-xs md:text-sm text-gray-500 w-fit mb-3">Forgot password?</button>
                            </div>
                            <div className='flex flex-col gap-5'>
                                {
                                    isLoginLoading 
                                    ? <button type="button" className="flex w-full items-center justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold uppercase leading-6 text-white shadow-sm "><span className='w-3 h-3 mr-1.5 animate-spin rounded-full border-2 border-white border-l-2 border-l-transparent'></span><span>Loading...</span></button>
                                    : <button type="submit" className="flex w-full  justify-center rounded-md bg-gradient-to-br to-emerald-500  from-teal-600 px-3 py-2 text-sm font-semibold uppercase leading-6 text-white shadow-sm ">Login</button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
       <div className='bg-white flex flex-col gap-5 shadow-t-sm shadow-b-gray-200 rounded-b-xl px-8 pb-4'>

        <p className="text-center text-sm font-medium text-gray-600">Don&apos;t have an account? <Link href="/register" className="text-emerald-600 transition duration-100">Register</Link></p>
        </div>
      </div>
    </section>
   </>
  )
}

export default Login