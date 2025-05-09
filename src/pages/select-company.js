import { useState, useRef, useEffect } from "react";
import { Plus, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/router";
import GeneralModal from "@/components/general/GeneralModal";
import DataFetcher from "@/components/data-fetching/DataFetcher";
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
  const [allCompaniesState, setAllCompanies] = useState([]);
  const [open, setOpen] = useState(false);
  const [openContent, setOpenContent] = useState({
    companyName: "",
    companyAddress: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });
  const buttonRef = useRef(null);
  const [nameExists, setNameExists] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // useEffect(() => {
  //   if (!props.user || !props.user.authorised) {
  //     setAuthLoading(false);
  //     router.push("/login");
  //     return;
  //   }

  //   setAuthLoading(false);
  //   fetchCompanies();
  // }, [props.user, router, fetchCompanies]);

  useEffect(() => {
    if (allCompanies && allCompanies.length > 0) {
      setAllCompanies(allCompanies);
    }
  }, [allCompanies]);

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

    setAllCompanies((prev) => [...prev, newCompany]);
    setOpenContent({
      companyName: "",
      companyAddress: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    });
  };

  const handleNextClick = () => {
    if (selectedCompany) {
      router.push("/onboarding");
    } else {
      toast.error("Please select a company to continue");
    }
  };

  // const renderCompanies = (companies) => {
  //   const filtered = allCompaniesState.filter((company) => company.active !== false);

  //   return (
  //     <>
  //       {error && (
  //         <div className="text-red-500 mb-4">
  //           {typeof error === "string" ? error : "An error occurred"}
  //         </div>
  //       )}
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
  //         {filtered.map((company, index) => (
  //           <div
  //             key={index}
  //             className={`bg-white hover:shadow-md transition-all duration-300 p-4 border flex justify-between rounded-lg items-center border-gray-200 cursor-pointer ${
  //               selectedCompany === company
  //                 ? "border-1 border-emerald-500 ring-1 ring-emerald-500"
  //                 : "border-gray-200 hover:border-emerald-500"
  //             }`}
  //             onClick={() => {
  //               setSelectedCompany(company);
  //             }}
  //           >
  //             <div className="flex gap-x-3 items-center">
  //               <div className="bg-emerald-50 p-2 rounded-lg shadow-sm">
  //                 <Building2 className="w-6 h-6 text-emerald-500" />
  //               </div>
  //               <h3 className="font-medium text-neutral-800 text-lg">
  //                 {company.companyName}
  //               </h3>
  //             </div>
  //           </div>
  //         ))}
  //         <div
  //           className="bg-white hover:shadow-md transition-all duration-300 p-4 border flex justify-between rounded-lg items-center border-dashed border-gray-300 cursor-pointer hover:border-emerald-500"
  //           onClick={handleAddCompanyClick}
  //         >
  //           <div className="flex gap-x-3 items-center">
  //             <div className="bg-emerald-50 p-2 rounded-lg shadow-sm">
  //               <Plus className="w-6 h-6 text-emerald-500" />
  //             </div>
  //             <h3 className="font-medium text-neutral-800 text-lg">Add Company</h3>
  //           </div>
  //         </div>
  //       </div>
  //       {filtered.length === 0 && (
  //         <div className="text-center py-8 text-gray-500">
  //           No companies found yet.
  //         </div>
  //       )}
  //     </>
  //   );
  // };



  return (
    <div className="bg-gray-50 min-h-screen p-8 relative">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="text-white p-3 rounded-full">
            <Link href="/" className="flex justify-center">
              <Image
                className="lg:rounded-[20px] w-[55px] h-[55px] rounded-[16px] shadow-md lg:w-[60px] lg:h-[60px]"
                src="/images/final-logo.svg"
                alt="Triggrs Chat Logo"
                width={65}
                height={65}
              />
            </Link>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-black mb-2">
          Select Company
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Choose a company to work with from your available options
        </p>
{/* 
        <DataFetcher
          endpoint="/api/get-user-companies"
          dataKey="companies"
          errorMessage="Failed to fetch companies"
          skeletonCount={6}
        >
          {renderCompanies}
        </DataFetcher> */}

        <div className="fixed bottom-8 right-8">
          <button
            className={`bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-md flex items-center transition-colors ${
              !selectedCompany ? "opacity-70" : ""
            }`}
            onClick={handleNextClick}
            disabled={!selectedCompany}
          >
            Next
            <ArrowRight size={18} className="ml-2" />
          </button>
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
