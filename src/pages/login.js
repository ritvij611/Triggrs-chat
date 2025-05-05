import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';


export async function getServerSideProps(context) {
    // Fetch data from external API
    try {
      const cookie = context.req.headers.cookie;
      if (cookie) {
        const token = parseCookie(cookie).get('ft') ? parseCookie(cookie).get('ft') : '';
        if (token) {
          const decoded = jwt.verify(token, process.env.SESS_SECRET_TOKEN);
          return { props: { status: 200, ...decoded } }
        } else {
          return {
            redirect: {
              permanent: false,
              destination: "/login",
            },
            props: { status: 401 },
          }
        }
      } else {
        return {
          redirect: {
            permanent: false,
            destination: "/login",
          },
          props: { status: 401 },
        }
      }
    } catch (e) {
      console.log('error data token', e);
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: { status: 401 },
      }
    }
    // Pass data to the page via props
  }

const Login = (props) => {
  const [passwordComp, setPasswordComp] = useState(true)
  const router = useRouter();

  const pushPasswordComp = () =>{
    setPasswordComp(true);
  }

  const pushToOtpComp = () =>{
    setPasswordComp(false);
  }
 

  return (
    <>
     <section className="relative z-10 overflow-hidden bg-[url('/images/register-bg.svg')] bg-cover bg-center w-full h-screen flex justify-center items-center font-inter py-20 lg:py-20 bg-[#F4F7FF]">
      <div className="max-w-[1000px] min-w-[95%] md:min-w-[450px] mx-auto px-5">
        {/* {
          passwordComp
          ? <LoginWithPassword /> 
          : <LoginWithOtp/>
        } */}
       <div className='bg-white flex flex-col gap-5 shadow-t-sm shadow-b-gray-200 rounded-b-xl px-8 pb-4'>
       {/* {
       passwordComp
        ? <button onClick={pushToOtpComp} type="button" className="flex w-full  justify-center rounded-md bg-gradient-to-br to-gray-100 from-gray-200 px-3 py-2 text-sm font-semibold uppercase leading-6 text-slate-800 shadow-sm ">Login With OTP</button>
        : <button onClick={pushPasswordComp} type="button" className="flex w-full  justify-center rounded-md bg-gradient-to-br to-gray-100 from-gray-200 px-3 py-2 text-sm font-semibold uppercase leading-6 text-slate-800 shadow-sm">Login With Password</button>
        } */}
        <p className="text-center text-sm font-medium text-gray-600">Don&apos;t have an account? <Link href="/register" className="text-emerald-600 transition duration-100">Register</Link></p>
        </div>
      </div>
    </section>
   </>
  )
}

export default Login