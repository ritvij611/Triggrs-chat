import { useRef, useState } from 'react';
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from 'next/router';
import { useRegister } from '@/modules/authentication/hooks/useRegister';
import { Combobox } from '@/components/ui/combobox';
import Country from '@/components/general/country';
import { toast } from 'sonner';

const Register = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const whatsappRef = useRef();
  const passwordRef = useRef();
  const [country, setCountry] = useState({ country: 'India', code: 91 });
  const [errRef, setErrRef] = useState('');
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const { handleRegister, isLoading, error } = useRegister();

  const submitRegister = async (e) => {
    e.preventDefault();
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const whatsapp = whatsappRef.current.value;
    const password = passwordRef.current.value;

    if (whatsapp == '' || country.country == '' || country.code == '' || password == '') {
      setErrRef("Please fill all input");
    } else {
      try {
        const userData = {
          firstName,
          lastName,
          phoneNumber: parseInt(whatsapp),
          country: country.country,
          countryCode: parseInt(country.code),
          password
        };

        const result = await handleRegister(userData);
        if (result.token) {
          // Store the token in cookies
          document.cookie = `twchat=${result.token}; path=/; max-age=31536000`;
          // Show success toast
          toast.success('Registration successful!');
          // Redirect to select company
          router.replace('/select-company');
        }
      } catch (error) {
        console.error('Register error:', error);
        setErrRef('Something went wrong. Please try again later.');
      }
    }
  }

  return (
    <>
      <section className="lg:py-5 py-12 bg-[url('/images/register-bg.svg')] bg-cover bg-center w-full h-screen flex justify-center items-center font-inter">
        <div className="container mx-auto mt-4">
          <div className="flex flex-wrap justify-center items-center">
            <div className="w-full p-4">
              <div className="relative mx-auto max-w-[450px] flex justify-center items-center flex-col overflow-hidden rounded-xl bg-white shadow-md shadow-gray-200 px-5 lg:px-12 lg:py-8 text-center">
                <div className="mb-8 text-center">
                  <Image className="inline-block mb-3 items-center rounded-2xl shadow-md" src="/images/final-logo.svg" alt="logo" width={65} height={65} />
                  <h1 className="text-2xl font-extrabold text-slate-900">Register an account</h1>
                  <span className="text-sm mt-1 mx-auto w-3/4 lg:max-w-[400px] text-gray-600">Register and Maximize Your Reach With WhatsApp!</span>
                </div>
                <form onSubmit={submitRegister} method="POST" className='w-full'>
                  <div className='w-full'>
                    <div>
                      <div className="mb-6 w-full">
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
                          }}
                        />
                      </div>
                      <div className="mb-6 w-full">
                        <label className='relative flex w-full'>
                          <span className='left-2 border border-gray-300 border-r-0 w-[64px] flex justify-center items-center rounded-l-md bg-white pr-2 inset-y-0 text-sm text-gray-600'>+{country.code}</span>
                          <input ref={whatsappRef} type="tel" placeholder={`WhatsApp Number`} className="border-gray-300 w-full placeholder:text-sm rounded-r-md border bg-white py-2.5 px-2 text-sm placeholder-gray-500 outline-none" />
                        </label>
                      </div>
                      <div className="mb-6">
                        <input ref={firstNameRef} type="text" placeholder="Firstname" className="border-gray-300 w-full placeholder:text-sm rounded-md border bg-white py-2.5 px-5 text-sm placeholder-gray-500 outline-none focus:border-emerald-600" />
                      </div>
                      <div className="mb-6">
                        <input ref={lastNameRef} type="text" placeholder="Lastname" className="border-gray-300 w-full placeholder:text-sm rounded-md border bg-white py-2.5 px-5 text-sm placeholder-gray-500 outline-none focus:border-emerald-600" />
                      </div>
                      <div className="mb-2">
                        <label className='relative flex w-full'>
                          <input ref={passwordRef} type={showPass ? "text" : "password"} placeholder={`Password`} className="border-gray-300 outline-none focus:border-emerald-600 w-full placeholder:text-sm rounded-md border bg-white py-2.5 px-2 text-sm placeholder-gray-500" />
                          <button type='button' onClick={() => setShowPass(!showPass)} className='absolute right-0 w-16 border rounded-r-md border-gray-300 m-auto font-semibold bg-white text-gray-500 p-2.5 top-0 bottom-0 text-xs'>{showPass ? <>HIDE</> : <>SHOW</>}</button>
                        </label>
                      </div>
                      <div className='w-full text-sm mb-6 text-red-600 text-start'>{errRef}</div>
                      <div className="mb-5">
                        {isLoading ? (
                          <button type="submit" className="flex w-full items-center justify-center rounded-md bg-gradient-to-br to-emerald-500 from-teal-600 px-3 py-2 text-sm font-semibold uppercase leading-6 text-white shadow-sm">
                            <span className='w-3.5 h-3.5 mr-3 animate-spin rounded-full border-2 border-white border-l-2 border-l-transparent'></span>
                            <span>Loading...</span>
                          </button>
                        ) : (
                          <button type="submit" className="flex w-full justify-center rounded-md bg-gradient-to-br to-emerald-500 from-teal-600 px-3 py-2 text-sm font-semibold uppercase leading-6 text-white shadow-sm">
                            Create an account
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
                <div className="flex items-center justify-center">
                  <p className="text-center text-sm font-medium text-gray-600">Already have an account? <Link href="/login" className="text-emerald-500 transition duration-100">Login</Link></p>
                </div>
                <div>
                  <span className="absolute top-1 right-1">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="1.39737" cy="38.6026" r="1.39737" transform="rotate(-90 1.39737 38.6026)" fill="#22c55e"/>
                      <circle cx="1.39737" cy="1.99122" r="1.39737" transform="rotate(-90 1.39737 1.99122)" fill="#22c55e"/>
                      <circle cx="13.6943" cy="38.6026" r="1.39737" transform="rotate(-90 13.6943 38.6026)" fill="#22c55e"/>
                      <circle cx="13.6943" cy="1.99122" r="1.39737" transform="rotate(-90 13.6943 1.99122)" fill="#22c55e"/>
                      <circle cx="25.9911" cy="38.6026" r="1.39737" transform="rotate(-90 25.9911 38.6026)" fill="#22c55e"/>
                      <circle cx="25.9911" cy="1.99122" r="1.39737" transform="rotate(-90 25.9911 1.99122)" fill="#22c55e"/>
                      <circle cx="38.288" cy="38.6026" r="1.39737" transform="rotate(-90 38.288 38.6026)" fill="#22c55e"/>
                      <circle cx="38.288" cy="1.99122" r="1.39737" transform="rotate(-90 38.288 1.99122)" fill="#22c55e"/>
                      <circle cx="1.39737" cy="26.3057" r="1.39737" transform="rotate(-90 1.39737 26.3057)" fill="#22c55e"/>
                      <circle cx="13.6943" cy="26.3057" r="1.39737" transform="rotate(-90 13.6943 26.3057)" fill="#22c55e"/>
                      <circle cx="25.9911" cy="26.3057" r="1.39737" transform="rotate(-90 25.9911 26.3057)" fill="#22c55e"/>
                      <circle cx="38.288" cy="26.3057" r="1.39737" transform="rotate(-90 38.288 26.3057)" fill="#22c55e"/>
                      <circle cx="1.39737" cy="14.0086" r="1.39737" transform="rotate(-90 1.39737 14.0086)" fill="#22c55e"/>
                      <circle cx="13.6943" cy="14.0086" r="1.39737" transform="rotate(-90 13.6943 14.0086)" fill="#22c55e"/>
                      <circle cx="25.9911" cy="14.0086" r="1.39737" transform="rotate(-90 25.9911 14.0086)" fill="#22c55e"/>
                      <circle cx="38.288" cy="14.0086" r="1.39737" transform="rotate(-90 38.288 14.0086)" fill="#22c55e"/>
                    </svg>
                  </span>
                  <span className="absolute left-1 bottom-1">
                    <svg width="35" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="1.39737" cy="38.6026" r="1.39737" transform="rotate(-90 1.39737 38.6026)" fill="#22c55e"/>
                      <circle cx="1.39737" cy="1.99122" r="1.39737" transform="rotate(-90 1.39737 1.99122)" fill="#22c55e"/>
                      <circle cx="13.6943" cy="38.6026" r="1.39737" transform="rotate(-90 13.6943 38.6026)" fill="#22c55e"/>
                      <circle cx="13.6943" cy="1.99122" r="1.39737" transform="rotate(-90 13.6943 1.99122)" fill="#22c55e"/>
                      <circle cx="25.9911" cy="38.6026" r="1.39737" transform="rotate(-90 25.9911 38.6026)" fill="#22c55e"/>
                      <circle cx="25.9911" cy="1.99122" r="1.39737" transform="rotate(-90 25.9911 1.99122)" fill="#22c55e"/>
                      <circle cx="38.288" cy="38.6026" r="1.39737" transform="rotate(-90 38.288 38.6026)" fill="#22c55e"/>
                      <circle cx="38.288" cy="1.99122" r="1.39737" transform="rotate(-90 38.288 1.99122)" fill="#22c55e"/>
                      <circle cx="1.39737" cy="26.3057" r="1.39737" transform="rotate(-90 1.39737 26.3057)" fill="#22c55e"/>
                      <circle cx="13.6943" cy="26.3057" r="1.39737" transform="rotate(-90 13.6943 26.3057)" fill="#22c55e"/>
                      <circle cx="25.9911" cy="26.3057" r="1.39737" transform="rotate(-90 25.9911 26.3057)" fill="#22c55e"/>
                      <circle cx="38.288" cy="26.3057" r="1.39737" transform="rotate(-90 38.288 26.3057)" fill="#22c55e"/>
                      <circle cx="1.39737" cy="14.0086" r="1.39737" transform="rotate(-90 1.39737 14.0086)" fill="#22c55e"/>
                      <circle cx="13.6943" cy="14.0086" r="1.39737" transform="rotate(-90 13.6943 14.0086)" fill="#22c55e"/>
                      <circle cx="25.9911" cy="14.0086" r="1.39737" transform="rotate(-90 25.9911 14.0086)" fill="#22c55e"/>
                      <circle cx="38.288" cy="14.0086" r="1.39737" transform="rotate(-90 38.288 14.0086)" fill="#22c55e"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;