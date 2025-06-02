import { useState, useRef, useEffect } from "react";
import { Plus, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/router";
import GeneralModal from "@/components/general/GeneralModal";
import { useFetchCompanies } from "@/modules/authentication/hooks/useFetchCompanies";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";


export async function getServerSideProps(context) {
  // Fetch data from external API
  try {
    const cookie = context.req.headers.cookie;
    if (cookie) {
      const token = parseCookie(cookie).get('twchat') ? parseCookie(cookie).get('twchat') : '';
      if (token) {
        return { props: { status: 200 } }
      } else {
        return {
          redirect: {
            permanent: false,
            destination: "/login",
          },
          props: { status: 200 },
        }
      }
    } else {
       return {
          redirect: {
            permanent: false,
            destination: "/login",
          },
          props: { status: 200 },
        }
    }
  } catch (e) {
    console.log('error data token', e);
     return {
          redirect: {
            permanent: false,
            destination: "/login",
          },
          props: { status: 200 },
        }
  }
}


export default function SelectCompany(props) {
  console.log('props', props)
  const router = useRouter();
  const { allCompanies, loading, error, fetchCompanies } = useFetchCompanies();
  const [open, setOpen] = useState(false);
  const [openContent, setOpenContent] = useState({
    companyName: "",
    companyAddress: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });
  const [nameExists, setNameExists] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, [])

  const handleAddCompanyClick = () => {
    setOpen(true);
  };

  const handleAddCompany = (company) => {
    setOpen(false);
    toast.success("Company added successfully");

    const newCompany = {
      _id: Date.now().toString(),
      companyName: company.companyName,
      companyAddress: company.companyAddress,
      city: company.city,
      state: company.state,
      country: company.country,
      pincode: company.pincode,
      active: true,
    };
    setOpenContent({companyName: "", companyAddress: "", city: "", state: "", country: "", pincode: ""});
  };

  const handleNextClick = () => {
    if (selectedCompany) {
      router.push("/select-plan?companyId=" + selectedCompany);
    } else {
      toast.error("Please select a company to continue");
    }
  };

  return (
    <div className="bg-white min-h-screen font-outfit relative">
      <div className="w-full grid grid-cols-12 h-screen items-center">
        <Image src={'/images/select.png'} className="object-contain col-span-4 w-auto h-screen" width={2160} height={3840} />
        <div className="max-w-5xl w-full mx-auto col-span-8  p-8">
        <div className="flex justify-center mb-6">
          <div className="text-white p-3 rounded-full">
            <Link href="/" className="flex justify-center"><Image className="lg:rounded-[20px] bg-white w-[55px] h-[55px] rounded-[16px] shadow-md lg:w-[60px] lg:h-[60px]" src="/images/final-logo.svg" alt="Triggrs Chat Logo" width={65} height={65}/></Link>
          </div>
        </div>

        <h4 className="text-3xl font-bold text-center text-black mb-2">Select Company</h4>
        <p className="text-center text-gray-600 mb-8">Choose a company to work with from your available options</p>
        <div className="max-w-sm mx-auto bg-white p-4 shadow-sm rounded-xl border">
          {
            allCompanies?.map((companyItem, companyIndex) => (
              <div className="w-full grid grid-cols-12 border-b items-center justify-between group px-4 py-3.5 hover:bg-emerald-100 rounded-lg">
                <label htmlFor={'companyId-'+companyIndex} className="w-full col-span-11">{
                <div className="w-full grid grid-cols-12 items-center">
                  <div className="col-span-2"><div className="bg-gray-200 group-hover:bg-emerald-600 group-hover:text-white size-8 p-2 rounded-md"><Building2 size={18} /></div></div>
                  <div className="col-span-8">
                    <h4>{companyItem?.companyName}</h4>
                    <p className="text-xs">{companyItem?.companyAddress}</p>
                  </div>
                </div>
              }</label>
              <input id={'companyId-'+companyIndex} type="radio" name="company" className="col-span-1 size-4 accent-emerald-600" value={companyItem?._id} onChange={(e) => setSelectedCompany(e.target.value)} />
              </div>
            ))
          }
        </div>
        <div className="fixed bottom-8 right-8">
          <button className={`bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-md flex items-center transition-colors ${!selectedCompany ? "opacity-70" : ""}`} onClick={handleNextClick} disabled={!selectedCompany}>Next<ArrowRight size={18} className="ml-2" /></button>
        </div>
        </div>
      </div>

      <GeneralModal
        header={<h2 className="text-lg font-semibold text-gray-800">Add Company</h2>}
        content={
          <div className="space-y-4">
            {/* Form inputs here, unchanged */}
            {/* ... */}
          </div>
        }
        topCancelButton={true}
        cancelButton={false}
        showCtaButton={false}
        isModalShow={open}
        onClose={() => setOpen(false)}
        footerButton={
          <button
            onClick={() => handleAddCompany(openContent)}
            type="button"
            disabled={nameExists || !openContent.companyName}
            className={`text-white block w-full rounded-md p-2 text-center text-base font-medium ${
              nameExists || !openContent.companyName
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-600 to-teal-500 border border-emerald-600"
            }`}
          >
            Continue
          </button>
        }
      />
    </div>
  );
}
