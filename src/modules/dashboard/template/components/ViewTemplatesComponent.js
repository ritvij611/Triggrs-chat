import Link from "next/link";
import { useEffect, useState } from "react";
import PreviewPartComponent from "./PreviewPartComponent";
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from "next/router";
import TemplateTableCards from "./TemplateTableCards";

export default function ViewTemplatesComponent(){
    const router = useRouter();
    const [sessionData, setSessionData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadingTempDelete, setIsLoadingTempDelete] = useState(false);
    const [nextDisabled, setNextDisabled] = useState(false);
    const [showPreviewTemplateModal, setShowPreviewTemplateModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [searchTemplatesValue, setSearchTemplatesValue] = useState('');
    const [searchTemplates, setSearchTemplates] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedHeader, setSelectedHeader] = useState('');
    const [headerCurrentText, setHeaderCurrentText] = useState('');
    const [templateName, setTemplateName] = useState('');
    const [templateId, setTemplateId] = useState('');
    const [mediaValue, setMediaValue] = useState('');
    const [callToActions, setCallToActions] = useState([]);
    const [quickReplies, setQuickReplies] = useState([]);
    const [footerPart, setFooterPart] = useState('');
    const [bodyCurrentText, setBodyCurrentText] = useState('');
    const [snackBarContent, setSnackBarContent] = useState('template');
    const [showSnackBar, setShowSnackBar] = useState(false);


    const limits = 10;

    const paginate = (data) => {
        // Calculate the start and end indexes for the current page
        const startIndex = (currentPage - 1) * limits;
        const endIndex = startIndex + limits;
        // Slice the data to get the items for the current page
        return data.slice(startIndex, endIndex);
    };
    // fetch all template 
    const fetchTemplates = async (currentPageContacts, limit, createdBy) => {
        setIsLoading(true);
        try {
            // const response = await fetch(`https://wa-api.triggrsweb.com/contacts?page=${currentPageContacts}&limit=${limit}&importedBy=${importedBy}`,
            const response = await fetch(`https://wa-api.triggrsweb.com/templates?page=${currentPageContacts}&limit=${limit}&createdBy=${createdBy}`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
            const newData = await response.json();
            if (newData) {
                // console.log(newData)
                if (newData.status == 200) {
                    if (newData.data.data.length <= limits) {
                        setNextDisabled(true);
                    } else if (newData.data.data.length >= limits) {
                        setNextDisabled(false);
                    }
                    setTimeout(() => {
                        if (templates.length > 0) {
                            setTemplates((initialContacts) => [...initialContacts, ...newData.data.data]);
                        } else {
                            setTemplates(newData.data.data);
                        }
                        setIsLoading(false);
                    }, 600);
                } else {
                    setIsLoading(false);
                    setNextDisabled(true);
                }
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
            // throw error;
        }
    }
    // pagination prev button func 
    const prevTemplatesData = () => {
        setCurrentPage((initialPage) => initialPage - 1);
        setNextDisabled(false);
        // fetchContacts(page, limits, '64aec2d3c165164507bc21eb');
    }
    // pagination next button func 
    const nextTemplatesData = () => {
        let page = currentPage + 1;
        const startIndex = (currentPage - 1) * limits + limits;
        const endIndex = startIndex + limits;
        // Slice the data to get the items for the current page
        if (templates.slice(startIndex, endIndex).length == 0) {
            setNextDisabled(true);
            fetchTemplates(page, limits, '64c0aeb05824e51c2dce28ec');
        } else if (templates.slice(startIndex, endIndex).length > 0 && templates.slice(startIndex, endIndex).length < limits) {
            setNextDisabled(true);
        } else {
            setNextDisabled(false);
        }
        setCurrentPage((initialPage) => initialPage + 1);
    }
    // setting Search string onkeyup 
    const handleSearchTemplate = (searchString) => {
        // console.log(searchString)
        setSearchTemplatesValue(searchString)
    }
    // search template api 
    const loadSearchTemplates = useDebouncedCallback(async (searchValue, createdBy) => {
        const response = await fetch(`https://wa-api.triggrsweb.com/templates/search?name=${searchValue}&createdBy=${createdBy}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
        let searchData = []
        searchData = await response.json();
        // console.log(searchData)
        // if()
        // const search = JSON.parse(searchData);
        // console.log(searchData.status)
        // console.log(searchData.data.data)
        // console.log(searchData.data.data.length) 
        if (searchData.data.length >= 1) {
            setSearchTemplates(searchData.data);

            // console.log(searchTemplates)
        } else {
            setSearchTemplates([]);
        }
    },
        // delay in ms
        1000
    )

    // first letter capital
    function capitalizeString(inputString) {
        // Split the string into an array of words
        const words = inputString.toLowerCase().split(' ');

        // Capitalize the first letter of each word
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

        // Join the words back into a string
        const capitalizedString = capitalizedWords.join(' ');

        return capitalizedString;
    }
    // show preview modal func 
    const showPreviewModal = (id, template) => {
        // template?.components.type == "HEADER" ? setSelectedHeader(templates?.components.type.format)  : ''
        // console.log(template)
        template.components.map((component, index) => {
            // console.log(component)
            // console.log(component.format)
            if (component.type == "HEADER") {
                setSelectedHeader(capitalizeString(component.format))
                if (component.format == "TEXT") {
                    setHeaderCurrentText(component.text)
                    // (component.text)
                    // other case 1 remain of varible header 
                } else {
                    setSelectedHeader('Media')

                }
                // if(component.format == "IMAGE" ){

                // }
                // other case 4 remain of  image, video , document, location 
                if (component.format == "IMAGE" || component.format == "DOCUMENT" || component.format == "VIDEO") {
                    setMediaValue(capitalizeString(component.format))

                }
            }
            // body part  variable body part remain
            if (component.type == "BODY") {
                setBodyCurrentText(component.text)
                //other cases remain like variable
            }
            // body part  variable body part remain
            if (component.type == "FOOTER") {
                setFooterPart(component.text)
            }
            if (component.type == "BUTTONS") {
                component.buttons.map((button, i) => {
                    // remain logic 
                    if (button.type = "PHONE_NUMBER") {
                        if (callToActions.length == 0) {
                            setCallToActions([1]);
                        }
                        setCallToActions(button)
                    }
                    if (button.type = "URL") {
                        if (callToActions.length == 0) {
                            setCallToActions([1]);
                        }
                        setCallToActions(button)
                    }
                    if (button.type = "QUICK_REPLY") {
                        if (quickReplies.length == 0) {
                            setQuickReplies([1]);
                        }
                        setQuickReplies(button)
                    }

                })
                // setfooterPart(component.text)
                //other cases remain like variable
            }
        })
        setShowPreviewTemplateModal(true)
    }
    // show delete modal func 
    const showDeleteModalFunc = async (tempId, tempName, action) => {
        setShowDeleteModal(true)
        setTemplateId(tempId)
        setTemplateName(tempName)
    }


    // get session data waid 
    const getWhatsappBusinessProfile = async (inpdata) => {
        const profileData = await fetch('https://wa-api.triggrsweb.com/users?userid=' + inpdata.userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let response = await profileData.json();
        if (response.status == 200) {
            // console.log(response);
            setSessionData(response.data.data);
            //   setGlobalProfileData(response.data);
        } else {
            console.log('Something went wrong');
        }
    }


    // delete temp api 
    const deleteDeleteTemplate = async (id, name) => {
        // console.log(`delete id- ${id} & name - ${ name}`);
        setIsLoadingTempDelete(true)
        let createdBy = sessionData._id;
        let token = sessionData.access_token;
        // let phoneId = sessionData.phone_number_id;
        let waba_id = sessionData.waba_id;
        const templateData = await fetch(`https://wa-api.triggrsweb.com/templates/delete?waba_id=${waba_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "name": name,
                "id": id,
                "waba_id": waba_id
            })
        });
        const DBresponse = await templateData.json();
        if (DBresponse.status == 200) {
            setSnackBarContent(DBresponse.data.message);
            setTimeout(() => {
                setShowSnackBar(true);
            }, 50);
            // console.log(`delete res-${JSON.stringify(DBresponse)}`)
            let newTemplates = templates.filter((template) => template.id !== id);
            setTemplates(newTemplates);
            setIsLoadingTempDelete(false);
            setShowDeleteModal(false)

            // errFormRef.current.innerHTML = '';
            // templateNameRef.current.value = '';
            // setTemplateCategory('');
            // setCurrentLanguage('');
            // setSelectedHeader('');
            // setHeaderCurrentText('');
            // setBodyCurrentText('');
            // setFooterPart('');
        } else {
            // errFormRef.current.innerHTML = `<span className="text-red-600">${DBresponse.data.message}</span>`
            setIsLoadingTempDelete(false);
            if (DBresponse.data.error) {
                setSnackBarContent(DBresponse.data.error.message);
            }
            setTimeout(() => {
                setShowSnackBar(true);
            }, 50);
            // console.log(DBresponse)
        }
        setTimeout(() => {
            setShowSnackBar(false);
        }, 3000);
    }
 

    useEffect(() => {
        if (templates.length == 0) {
            fetchTemplates(currentPage, limits, '64c0aeb05824e51c2dce28ec');
        }
        if (searchTemplatesValue && searchTemplatesValue.length > 0) {
            loadSearchTemplates(searchTemplatesValue, '64c0aeb05824e51c2dce28ec')
        }
    }, [searchTemplatesValue]);

    return (
        <>
            <div className="flex px-5 py-2.5 items-center justify-between w-full bg-white">
                <div className="relative">
                    <input type="text" id="hs-leading-icon" onChange={(e) => handleSearchTemplate(e.target.value)} name="hs-leading-icon" className="py-2 px-4 pl-4 block w-[350px] border-gray-300 border  rounded-md text-sm focus:outline-none" placeholder="Search template" />
                    <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none z-[50] pl-4">
                        <button type='button' className="text-white bg-emerald-600 rounded-r-md px-2 py-[9px]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg></button></div>
                </div>
                <Link href="/dashboard/templates/create" className="pr-4 flex gap-2 text-sm items-center bg-gradient-to-br to-emerald-500  from-teal-600 py-2 text-white px-4 rounded-md" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w- h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Create Templates</span>
                </Link>
            </div>
            <section className="lg:max-w-full h-[calc(100vh-175px)] bg-slate-200 mx-auto">
                <div className="overflow-x-auto">
                    {
                        isLoading
                            ? <div className='flex w-full h-60 items-center justify-center text-center'>
                                <div className='flex justify-center items-center text-center gap-x-4'>
                                    <span className='border-2 w-5 h-5 border-gray-800 border-b border-b-transparent animate-spin rounded-full'></span>
                                    <span>Loading...</span>
                                </div>
                            </div> :
                            <table className="w-full text-sm text-left ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-t border-gray-200">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Template name</th>
                                        <th scope="col" className="px-4 py-3">Category</th>
                                        <th scope="col" className="px-4 py-3 flex items-center gap-x-1">
                                            <span>Status</span>
                                            <div className="relative group">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" /></svg>
                                                {/* <TWGeneralTooltip toggleClassName="capitalize hidden group-hover:block" content="When it gets approved you can start using this template" /> */}
                                            </div>
                                        </th>
                                        <th scope="col" className="px-4 py-3">Language</th>
                                        <th scope="col" className="px-4 py-3">Last update</th>
                                        <th scope="col" className="px-4 py-3">Action</th>
                                    </tr>
                                </thead>
                                {searchTemplatesValue && searchTemplatesValue.length > 0
                                    ? searchTemplates && searchTemplates.length > 0
                                        ? <tbody className="">
                                            {
                                                searchTemplates.map((template) => {
                                                    return <TemplateTableCards
                                                        key={template._id}
                                                        id={template.id}
                                                        templateName={template.name}
                                                        category={template.category}
                                                        status={template.status}
                                                        language={template.language}
                                                        lastupdate={template.updatedAt}
                                                        onShowViewModal={() => showPreviewModal(template.id, template)}
                                                        // handleContactCheck={handleCheckboxChange}
                                                        // onShowEditModal={() => showEditModal(contact._id, contact)}
                                                        onShowDeleteModal={() => showDeleteModalFunc(template.id, template.name, !showDeleteModal)}
                                                    // checkedItem={checkedItems.filter((item) => item == contact.phone).length > 0 ? true : false
                                                    // }
                                                    />
                                                })
                                            }
                                        </tbody> : <></>
                                    :
                                    <tbody>

                                        {/* <TemplateTableCards /> */}
                                        {
                                            paginate(templates).length > 0 || paginate(templates)
                                                ? paginate(templates).map((template) => {
                                                    return <TemplateTableCards
                                                        key={template._id}
                                                        id={template._id}
                                                        templateName={template.name}
                                                        category={template.category}
                                                        status={template.status}
                                                        language={template.language}
                                                        lastupdate={template.updatedAt}
                                                        onShowViewModal={() => showPreviewModal(template.id, template)}
                                                        onShowDeleteModal={() => showDeleteModalFunc(template.id, template.name, !showDeleteModal)}
                                                    />
                                                }) : <>No Templates found</>
                                        }
                                    </tbody>
                                }
                            </table>
                    }
                </div>

            </section>
            <div className='sticky bottom-0 left-0 right-0 w-full mx-auto'>

                {searchTemplatesValue.length < 1 ? <div className='bg-white border-t border-t-gray-200 shadow-md px-2 py-2 flex justify-between items-center'>
                    <button type="button" disabled={currentPage <= 1} onClick={prevTemplatesData} className='text-neutral-900 bg-neutral-300 px-3.5 rounded-md gap-x-2 text-center flex justify-center items-center w-fit h-10 text-sm font-medium'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" /></svg>PREVIOUS</button>
                    <span className='text-center text-base justify-center items-center font-semibold w-fit flex flex-col'>{currentPage}<span className='text-xs font-normal'>ACTIVE</span></span>
                    <button type="button" disabled={nextDisabled} onClick={nextDisabled == false ? nextTemplatesData : console.log('Will not work')} className='bg-neutral-300 px-3.5 text-neutral-900 rounded-md text-center flex justify-center items-center w-fit h-10 text-sm'>NEXT<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg></button>
                </div> : <></>}
            </div>
            {/* Delete Modal Code Starts for Contacts */}
            {/* <GeneralModal
                isModalShow={showDeleteModal}
                onClose={() => setShowDeleteModal(false)
                }
                contentClassName='h-56'
                topCancelButton={false}
                content={
                    < div className='flex w-full flex-col justify-center items-center space-y-4' >
                        <div className='bg-gray-200 rounded-full p-4'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-11 h-11"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg></div>
                        <h3 className='text-center'>Are you sure want to delete <span className="font-semibold ">{templateName}</span> template?<br /> You&apos;ll not be able to recover it again</h3>
                        <div className='flex gap-x-3 items-center justify-center font-medium'>
                            <button type="button" className='text-sm uppercase bg-gray-300 text-gray-900 px-2 py-1.5 rounded-md' onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            {isLoadingTempDelete ? <button type="button" className="flex w-fit items-center justify-centertext-base justify-end  text-sm uppercase bg-red-500 text-white px-2 py-1.5 rounded-md "><span className='w-3.5 h-3.5 mr-3 animate-spin rounded-full border-2 border-white border-l-2 border-l-transparent'></span><span>Deleting...</span></button> : <button type="button" className='text-sm uppercase bg-red-600 text-white px-2 py-1.5 rounded-md' onClick={() => deleteDeleteTemplate(templateId, templateName)} >Delete</button>

                            }

                        </div>
                    </div >
                }
                header={<></>}
            /> */}

            {/* preview modal =  */}
            {/* <GeneralModal isModalShow={showPreviewTemplateModal}
                onClose={() => setShowPreviewTemplateModal(false)}
                modalClassName={'max-w-sm m-8 lg:max-w-sm h-fit'}
                header={<span className='capitalize text-base'>Preview</span>}
                content={
                    <>
                        <div className="-mx-4">
                            <PreviewPartComponent headerType={selectedHeader} headerPart={headerCurrentText} mediaType={mediaValue} bodyPart={bodyCurrentText} footerPart={footerPart} ctaItems={callToActions} replyItems={quickReplies} />
                        </div>
                    </>

                }
                footerButton={<div className='flex gap-x-3 items-center justify-center font-medium '>
                    <button type="button" className='text-sm uppercase bg-gray-300 text-gray-900 px-2 py-1.5 rounded-md' onClick={() => setShowPreviewTemplateModal(false)}>Close</button>
                </div>}
            /> */}

        </>
    )

}
