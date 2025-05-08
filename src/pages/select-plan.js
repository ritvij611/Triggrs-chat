import Footer from "@/components/general/footer";
import { useEffect, useState } from "react";
import AnnualSelectPricing, { MonthlySelectPricing } from "@/components/general/selectPriceComponents";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import useCompany from "@/hooks/useCompany";

export default function SelectPlan() {
  const [planChanged, setPlanChanged] = useState('monthly');
  const { user } = useAuth();
  const { company } = useCompany();
  const router = useRouter();

  
  const planChange = (e) => {
    // e.preventDefault();
    setPlanChanged(e.target.value);
  }

  useEffect(() => {
    if (!user || !company) return;

    // console.log(user);
    if (!user.authorised) {
      router.replace('/login');
    }

    if(!company.present){
      router.replace('/select-company');
    }
    
  }, [user,company]);

  

  return (
    !user || !company || !user.authorised || !company.present ? <></>
    :
    <>
        <section id="pricing" className="relative overflow-hidden font-inter bg-white py-6 sm:py-12 ">
          <div className="lg:max-w-[1200px] mx-auto">
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <div className="mx-auto mb-8 max-w-[510px] text-center lg:mb-8">
                  <Link href="/" className="flex justify-center my-4">
                    <Image className='lg:rounded-[20px] w-[55px] h-[55px rounded-[16px] shadow-md lg:w-[60px] lg:h-[60px]' src="/images/final-logo.svg" alt="Triggrs Chat Logo" width={65} height={65} /></Link>
                  <h1 className="text-slate-700 font-inter font-bold mb-2 text-3xl sm:text-4xl md:text-[40px]">Select Plan</h1>
                  <p className="text-center text-slate-900 px-6 text-sm">{planChanged == 'annual' ? <span>Unlock huge savings of <span className="font-semibold">₹6000</span> by choosing our yearly plan!</span> : <span>Dive into endless possibilities with our flexible monthly plan!</span>}</p>
                </div>
              </div>
            </div>

            <ul className="grid w-60 rounded-lg mb-10 grid-cols-2 bg-emerald-600/10 mx-auto">
              <li>
                <input type="radio" defaultChecked={true} onChange={(e) => planChange(e)} id="monthlycharge" name="fees" value="monthly" className="hidden peer" required />
                <label htmlFor="monthlycharge" className="inline-flex items-center justify-between peer-checked:transition-all peer-checked:duration-200 w-full p-2 text-emerald-600 rounded-l-lg cursor-pointer text-center peer-checked:text-white peer-checked:rounded-l-lg peer-checked:bg-emerald-600 hover:text-emerald-600 hover:bg-emerald-600/10">                           <div className="w-full text-sm font-medium">Monthly</div></label>
              </li>
              <li>
                <input type="radio" onChange={(e) => planChange(e)} id="annualcharge" name="fees" value="annual" className="hidden peer" />
                <label htmlFor="annualcharge" className="inline-flex items-center justify-between peer-checked:transition-all peer-checked:duration-200 w-full p-2 text-emerald-600 rounded-r-lg cursor-pointer text-center peer-checked:text-white peer-checked:rounded-r-lg peer-checked:bg-emerald-600 hover:text-emerald-600 hover:bg-emerald-600/10"><div className="w-full text-sm font-medium">Yearly</div></label>
              </li>
            </ul>
            {
              planChanged == 'monthly' ? <MonthlySelectPricing user={user} company={company} /> : <AnnualSelectPricing user={user} company={company}/>
            }
          </div>
        </section>
        <Footer />
      </>
  )
}


