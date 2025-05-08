import { useState, useRef, useEffect } from "react";
import { Plus, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/router";
import GeneralModal from "@/components/general/GeneralModal";
import DataFetcher from "@/components/data-fetching/DataFetcher";
import { useFetchCompanies } from "@/modules/authentication/hooks/useFetchCompanies";

export default function SelectCompany(props) {
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
  const buttonRef = useRef(null);
  const [nameExists, setNameExists] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyLoading, setCompanyLoading] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    if (!props.user) {
      router.replace("/login");
      return;
    }

    if (!props.user.authorised) {
      router.replace("/login");
      return;
    }

    // Fetch companies
    fetchCompanies();
  }, [props.user, router, fetchCompanies]);

  const handleAddCompanyClick = () => {
    setOpen(true);
  };

  const handleAddCompany = (company) => {
    setOpen(false);
    toast.success("Company added successfully");
    
    // Create a new company object with the form data
    const newCompany = {
      _id: Date.now().toString(), // Temporary ID
      companyName: company.companyName,
      companyAddress: company.companyAddress,
      city: company.city,
      state: company.state,
      country: company.country,
      pincode: company.pincode,
      active: true
    };
    
    // Add the new company to the list
    setAllCompanies(prev => [...prev, newCompany]);
    
    // Clear the form
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
      router.push('/onboarding');
    } else {
      toast({
        title: "Error",
        description: "Please select a company to continue",
        variant: "destructive",
      });
    }
  };

  // This callback will receive company data from DataFetcher
  const renderCompanies = (companies) => {
    const filteredCompanies = (companies.companies || companies).filter(company => 
      company.active !== false
    );
    
    return (
      <>
        {error && (
          <div className="text-red-500 mb-4">
            {typeof error === 'string' ? error : 'An error occurred'}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {/* Company Cards */}
          {filteredCompanies.map((company, index) => (
            <div
              key={index}
              className={`bg-white hover:shadow-md transition-all duration-300 p-4 border flex justify-between rounded-lg items-center border-gray-200 cursor-pointer ${
                selectedCompany === company
                  ? "border-1 border-emerald-500 ring-1 ring-emerald-500"
                  : "border-gray-200 hover:border-emerald-500"
              }`}
              onClick={() => {
                setSelectedCompany(company);
                console.log("Selected Company:", {
                  id: company._id,
                  name: company.companyName,
                  address: company.companyAddress,
                  city: company.city,
                  state: company.state,
                  country: company.country,
                  pincode: company.pincode,
                  subscription: company.subscriptionType ? {
                    type: company.subscriptionType,
                    status: company.active,
                    startDate: new Date(company.startDate * 1000),
                    endDate: new Date(company.endDate * 1000),
                  } : undefined,
                });
              }}
            >
              <div className="flex gap-x-3 items-center">
                <div className="bg-emerald-50 p-2 rounded-lg shadow-sm">
                  <Building2 className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="font-medium text-neutral-800 text-lg">
                  {company.companyName}
                </h3>
              </div>
            </div>
          ))}
          
          {/* Add Company Card */}
          <div
            className="bg-white hover:shadow-md transition-all duration-300 p-4 border flex justify-between rounded-lg items-center border-dashed border-gray-300 cursor-pointer hover:border-emerald-500"
            onClick={handleAddCompanyClick}
          >
            <div className="flex gap-x-3 items-center">
              <div className="bg-emerald-50 p-2 rounded-lg shadow-sm">
                <Plus className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="font-medium text-neutral-800 text-lg">
                Add Company
              </h3>
            </div>
          </div>
        </div>
        
        {filteredCompanies.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No companies found yet.
          </div>
        )}
      </>
    );
  };

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

        {/* Using the DataFetcher component for companies */}
        <DataFetcher
          endpoint="/api/get-all-companies"
          dataKey="companies"
          errorMessage="Failed to fetch companies"
          skeletonCount={6}
        >
          {renderCompanies}
        </DataFetcher>

        {/* Next button in bottom right */}
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
        header={
          <h2 className="text-lg font-semibold text-gray-800">Add Company</h2>
        }
        content={
          <div className="space-y-4 ">
            <div>
              <label
                htmlFor="companyName"
                className="block text-xs text-gray-700 mb-1"
              >
                Company Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  className={`w-full rounded-md border ${
                    nameExists ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 text-sm focus:outline-none focus:ring-2 active:ring-2 focus:ring-green-500 focus:border-transparent`}
                  value={openContent.companyName || ""}
                  onChange={(e) => {
                    const newName = e.target.value;
                    setOpenContent({ ...openContent, companyName: newName });
                    // Check if name exists in companies list
                    const exists = allCompanies.some(
                      (company) =>
                        company.companyName.toLowerCase() ===
                        newName.toLowerCase()
                    );
                    setNameExists(exists);
                  }}
                  required
                />
                {nameExists && (
                  <div className="text-red-500 text-xs mt-1">
                    This company name is already taken. Please choose another
                    name.
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="addressLine1"
                className="block text-xs text-gray-700 mb-1"
              >
                Address Line 1
              </label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={openContent.companyAddress || ""}
                onChange={(e) =>
                  setOpenContent({
                    ...openContent,
                    companyAddress: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="country"
                  className="block text-xs text-gray-700 mb-1"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={openContent.country || ""}
                  onChange={(e) =>
                    setOpenContent({ ...openContent, country: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-xs text-gray-700 mb-1"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={openContent.state || ""}
                  onChange={(e) =>
                    setOpenContent({ ...openContent, state: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-xs text-gray-700 mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={openContent.city || ""}
                  onChange={(e) =>
                    setOpenContent({ ...openContent, city: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="pincode"
                  className="block text-xs text-gray-700 mb-1"
                >
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={openContent.pincode || ""}
                  onChange={(e) =>
                    setOpenContent({ ...openContent, pincode: e.target.value })
                  }
                  required
                />
              </div>
            </div>
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