import { useEffect, useState, useRef } from 'react';
import { Search, Plus, Filter, X, ArrowRight } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import { toast } from 'sonner';
import useAuth from '@/hooks/useAuth';
import { useRouter } from "next/router";
import GeneralModal from '@/components/general/GeneralModal';


export default function SelectCompany() {
  const { user } = useAuth();
  const router = useRouter();
  const [showCompanyList, setShowCompanyList] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [userCompanies, setUserCompanies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openContent, setOpenContent] = useState({
    companyName: '',
    companyAddress: '',
    city: '',
    state: '',
    country: '',
    pincode: ''
  });
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);
  const [nameExists, setNameExists] = useState(false);
  
  const getAllCompanies = async() => {
    const response = await fetch('/api/get-all-companies/',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if(!response.ok){
      return;
    }
    const arr = data.companies.map(item => (
      item.companyName
    )); 
    setCompanies(arr);
  }

  const getUserCompanies = async() => {
    try {
      // Get token from cookies using a more reliable method
      const cookies = document.cookie;
      const tokenCookie = cookies
        .split('; ')
        .find(row => row.startsWith('twchat='))
        ?.split('=')[1];
        
      if (!tokenCookie) {
        console.error('No twchat token found in cookies');
        toast({
          title: 'Error',
          description: 'Authentication token missing. Please log in again.',
          variant: 'destructive',
        });
        router.replace('/login');
        return;
      }
  
      const response = await fetch(`/api/get-user-companies/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
  
      const data = await response.json();
      
      if(!response.ok){
        console.error('Error fetching user companies:', data.message || 'Unknown error');
        toast({
          title: 'Error',
          description: data.message || 'Failed to fetch user companies',
          variant: 'destructive',
        });
        return;
      }
  
      // Map API response to expected format: [{ companyName, active }, ...]
      const arr = (data.companies || []).map(item => ({
        companyName: item.companyName || item.companyID?.companyName, // Handle both structures
        active: item.active ?? item.companyID?.active, // Handle both structures, default to false if undefined
      }));
  
      console.log('Mapped user companies:', arr); // Debug mapped data
  
      setUserCompanies(arr);
      if (arr.length > 0) {
        setSelectedCompany(arr[0]);
      } else {
        console.warn('No user companies found in response');
      }
    } catch (error) {
      console.error('Error in getUserCompanies:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while fetching your companies',
        variant: 'destructive',
      });
    }
  };

  const findCompany = async(company) => {
    const response = await fetch(`/api/find-company/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userID": `${user.id}`,
        company
      })
    });
    
    const data = await response.json();
    if(!response.ok){
      setLoading(false);
      if(response.status == 404){
        toast({
          title: "Error",
          description: "Please get subscription to proceed",
          variant: "destructive"
        });
        router.replace(`/select-plan`);
      }
      else {
        toast({
          title: "Error",
          description: "Internal Server Error",
          variant: "destructive"
        });
      }
      return;
    }
    
    const token = data.token;
    await startCompanySession(token); 
    if(data.active){
      router.replace("/dashboard/main");
    } else {
      toast({
        title: "Error",
        description: "Please get subscription to proceed",
        variant: "destructive"
      });
      router.replace(`/select-plan`);
    }

    
  }

  useEffect(()=>{
    getAllCompanies();
  },[]);

  useEffect(() => {
    if (!user) return;
    if (!user.authorised) {
      router.replace('/login');
    }
    getUserCompanies();
    
  }, [user]);

  // Focus input when add company button is clicked
  useEffect(() => {
    if (showCompanyList && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showCompanyList]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowCompanyList(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, buttonRef]);
  
  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    setShowCompanyList(false);
  };
  
  const handleAddCompanyClick = () => {
    setOpen(true);
  };

  const handleAddCompany = (company) => {
    setUserCompanies([...userCompanies,company]);
    setShowCompanyList(false);
    handleSelectCompany(company);
    setOpenContent({
      companyName:'',
      companyAddress:'',
      city:'',
      state:'',
      pincode:'',
      country:''
    });
    setOpen(false);
  };

  const handleNextClick = async() => {
    if (selectedCompany) {
      setLoading(true);
      await findCompany(selectedCompany);
      setLoading(false);
    } else {
      toast({
        title: "Error",
        description: "Please select a company to continue",
        variant: "destructive"
      });
    }
  };
  
  return (
    !user || !user.authorised ? <></>: 
    <>
      <div className="bg-gray-50 min-h-screen p-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="text-white p-3 rounded-full">
            <Link href="/" className="flex justify-center">
            <Image className='lg:rounded-[20px] w-[55px] h-[55px rounded-[16px] shadow-md lg:w-[60px] lg:h-[60px]' src="/images/final-logo.svg" alt="Triggrs Chat Logo" width={65} height={65} /></Link>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-black mb-2">Select Company</h1>
          <p className="text-center text-gray-600 mb-8">Choose a company to work with from your available options</p>
          
          {/* Top bar with search and add button moved to right */}
          <div className="flex justify-center mb-6">
            <div ref={buttonRef} className="relative">
              
                <button  className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center transition-colors justify-center" onClick={()=>{handleAddCompanyClick()}}>
                  <Plus size={18} className="mr-2" />
                  Add Company
                </button>
                      
            </div>
          </div>
          
          {/* Grid of companies */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userCompanies.length > 0 ? (
              userCompanies.map((company,index) => (
                <div key={index} className={`bg-white hover:shadow-md transition-all duration-300 p-4 border flex justify-between rounded-lg items-center border-gray-200 cursor-pointer ${
                    selectedCompany === company 
                      ? 'border-emerald-600 ' 
                      : 'border-gray-200 hover:border-emerald-500'
                  }`}
                  onClick={() => setSelectedCompany(company)}
                >
                  <div className='flex gap-x-3 items-center'>
                 <div className='bg-emerald-50 p-2 rounded-lg shadow-sm'>
                 <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon size-6 text-gray-400 icon-tabler icons-tabler-outline icon-tabler-buildings"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 21v-15c0 -1 1 -2 2 -2h5c1 0 2 1 2 2v15" /><path d="M16 8h2c1 0 2 1 2 2v11" /><path d="M3 21h18" /><path d="M10 12v0" /><path d="M10 16v0" /><path d="M10 8v0" /><path d="M7 12v0" /><path d="M7 16v0" /><path d="M7 8v0" /><path d="M17 12v0" /><path d="M17 16v0" /></svg>
                 </div>
                  <h3 className="font-medium text-neutral-800 text-lg">{company.companyName}</h3>
                  </div>
                  {company.active ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Inactive
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-gray-500">
                No companies found please add a company.
              </div>
            )}
          </div>
          
          {/* Next button in bottom right */}
          <div className="fixed bottom-8 right-8">
            { isLoading ?
              <button type="button" className="flex w-full items-center justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold uppercase leading-6 text-white shadow-sm "><span className='w-3.5 h-3.5 mr-3 animate-spin rounded-full border-2 border-white border-l-2 border-l-transparent'></span><span>Wait...</span></button>
              :
              <button 
                className={`bg-green-600 text-white px-6 py-3 rounded-md flex items-center transition-colors ${
                  !selectedCompany ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                onClick={handleNextClick}
                disabled={!selectedCompany}
              >
                Next
                <ArrowRight size={18} className="ml-2" />
              </button>
            }
          </div>
        </div>
      </div>
      <GeneralModal
        header={<h2 className="text-lg font-semibold text-gray-800">Add Company</h2>}
        content={
          <div className="space-y-4 ">
            <div>
              <label htmlFor="companyName" className="block text-xs  text-gray-700 mb-1">
                Company Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  className={`w-full rounded-md border ${
                    nameExists ? 'border-red-500' : 'border-gray-300'
                  } px-3 py-2 text-sm focus:outline-none focus:ring-2  focus:ring-green-500 focus:border-transparent`}
                 
                  value={openContent.companyName || ''}
                  onChange={(e) => {
                    const newName = e.target.value;
                    setOpenContent({...openContent, companyName: newName});
                    // Check if name exists in companies list
                    const exists = companies.some(
                      company => company.toLowerCase() === newName.toLowerCase()
                    );
                    setNameExists(exists);
                  }}
                  required
                />
                {nameExists && (
                  <div className="text-red-500 text-xs mt-1">
                    This company name is already taken. Please choose another name.
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="addressLine1" className="block text-xs  text-gray-700 mb-1">
                Address Line 1
              </label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={openContent.companyAddress || ''}
                onChange={(e) => setOpenContent({...openContent, companyAddress: e.target.value})}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="country" className="block text-xs  text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={openContent.country || ''}
                  onChange={(e) => setOpenContent({...openContent, country: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="state" className="block text-xs  text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={openContent.state || ''}
                  onChange={(e) => setOpenContent({...openContent, state: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-xs  text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={openContent.city || ''}
                  onChange={(e) => setOpenContent({...openContent, city: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="pincode" className="block text-xs  text-gray-700 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={openContent.pincode || ''}
                  onChange={(e) => setOpenContent({...openContent, pincode: e.target.value})}
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
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-emerald-600 to-teal-500 border border-emerald-600'
            }`}
          >
            Continue
          </button>
        } 
      />
    </>
  );
}