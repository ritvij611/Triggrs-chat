import { useEffect, useRef, useState } from "react";
import { Plus, X, File, FileText, Image } from 'lucide-react';
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { toast } from "sonner";
import PreviewPartComponent from "../../template/components/PreviewPartComponent";
import { useCreateCampaign } from "@/modules/dashboard/campaign/hooks/useCreateCampaign";
import { useFetchContacts } from "@/modules/dashboard/contact/hooks/useFetchContacts";
import { useFetchTemplates } from "@/modules/dashboard/template/hooks/useFetchTemplates";
import { useRouter } from "next/router";
import { useFetchUploadedFiles } from "../../inbox/hooks/useFetchUploadedFiles";
import { useFileUpload } from "../../inbox/hooks/useFileUpload";

const decodeComponents = (template) => {
  const components = template.components;
  const headerObj = components?.find((item) => item.type === "HEADER");
  const bodyObj = components?.find((item) => item.type === "BODY");
  const footerObj = components?.find((item) => item.type === "FOOTER");
  const buttonsObj = components?.find((item) => item.type === "BUTTONS") || [];
  const headerType = headerObj?.format === "TEXT" ? "Text" : "Media";
  const mediaType = headerObj?.format === "IMAGE" ? "Image" : headerObj?.format === "VIDEO" ? "Video" : headerObj?.format === "DOCUMENT" ? "Document" : headerObj?.format === "LOCATION" ? "Location" : "";
  const headerPart = headerObj?.text || "";
  const bodyPart = bodyObj?.text || "";
  const footerPart = footerObj?.text || "";
  const buttons = buttonsObj?.buttons || [];
  const bodyVariableValues = bodyObj?.example?.body_text || [];
  const headerVariableValues = headerObj?.example?.header_text || [];
  let ctaItems = [];
  let replyItems = [];
  buttons.forEach(item => {
    if (item.type === "PHONE_NUMBER") {
      ctaItems.push({
        ctaType: 'PHONE',
        label: item.text
      });
    } else if (item.type === "URL") {
      ctaItems.push({
        ctaType: 'URL',
        label: item.text
      });
    } else {
      replyItems.push(item.text);
    }
  });

  return { headerType, mediaType, headerPart, bodyPart, footerPart, ctaItems, replyItems, bodyVariableValues, headerVariableValues }
}

export default function CreateCampaignComponent({ companyID }) {
  const router = useRouter();
  const { createResponse, isCreateLoading, createError, handleCreate, cancelCreate } = useCreateCampaign();
  const { allContacts, totalContacts, loadingContacts, contactError, fetchContacts, cancelContactsOperation } = useFetchContacts();
  const { allTemplates, totalTemplates, loadingTemplates, templateError, fetchTemplates, cancelTemplatesOperation } = useFetchTemplates();
    const { uploadResponse, isUploadLoading, uploadError, handleUpload, cancelUpload } = useFileUpload();
  const { allFiles, totalFiles, loadingFiles, fileError, fetchFiles, cancelFilesOperation } = useFetchUploadedFiles();

  const [templates, setTemplates] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loadTemplates, setLoadTemplates] = useState(true);
  const [loadContacts, setLoadContacts] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignName, setCampaignName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [contactsDropdownOpen, setContactsDropdownOpen] = useState(false);
  const [searchTemplate, setSearchTemplate] = useState("");
  const [contactSearch, setContactSearch] = useState("");
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState({});

  const [loadPhotos, setLoadPhotos] = useState(true);
  const [uploadPhotos, setUploadPhotos] = useState(false);
  const totalPhotosRef = useRef(0);
  const totalTemplatesRef = useRef(0);
  const totalContactsRef = useRef(0);
  const photoInputRef = useRef(null);

  
  // New state for image and variables step
  const [selectedImage, setSelectedImage] = useState(null);
  const [headerVariables, setHeaderVariables] = useState([]);
  const [bodyVariables, setBodyVariables] = useState([]);
  const [variableDropdowns, setVariableDropdowns] = useState({});

  useEffect(() => {
    if (createResponse?.status === 200) {
      toast.success(`Campaign added successfully`);
      router.push("/dashboard/campaigns");
    } else if (createError) {
      toast.error(createError);
    }
  }, [createResponse, createError, router]);

  useEffect(() => {
    if (!loadTemplates) return;
    const fetch = async () => {
      if (companyID) {
        await fetchTemplates({
          companyID,
          index: templates.length / 10,
          limit: 10,
        });
      }
    };
    fetch();
  }, [loadTemplates]);

  useEffect(() => {
    if (!loadContacts) return;
    const fetch = async () => {
      if (companyID) {
        await fetchContacts({
          companyID,
          index: contacts.length / 10,
          limit: 10,
        });
      }
    };
    fetch();
  }, [loadContacts]);

  useEffect(() => {
    if (allTemplates) {
      setTemplates((prev) => [...prev, ...allTemplates]);
      totalTemplatesRef.current = totalTemplates;
      setLoadTemplates(false)
    } else if (templateError) {
      toast.error(templateError);
      setLoadTemplates(false);
    }
  }, [allTemplates, templateError]);

  useEffect(() => {
    if (allContacts) {
      setContacts((prev) => [...prev, ...allContacts]);
      totalContactsRef.current = totalContacts;
      setLoadContacts(false);
    } else if (contactError) {
      toast.error(contactError);
      setLoadContacts(false);
    }
  }, [contactError, allContacts]);

  // Initialize variables when template is selected
  useEffect(() => {
    if (selectedTemplate) {
      const decoded = decodeComponents(selectedTemplate);
      
      // Extract variables from header text
      const headerVars = [];
      if (decoded.headerPart) {
        const headerMatches = decoded.headerPart.match(/\{\{(\d+)\}\}/g);
        if (headerMatches) {
          headerMatches.forEach((match, index) => {
            headerVars.push({
              index: index,
              placeholder: match,
              value: "",
              type: "text"
            });
          });
        }
      }
      
      // Extract variables from body text
      const bodyVars = [];
      if (decoded.bodyPart) {
        const bodyMatches = decoded.bodyPart.match(/\{\{(\d+)\}\}/g);
        if (bodyMatches) {
          bodyMatches.forEach((match, index) => {
            bodyVars.push({
              index: index,
              placeholder: match,
              value: "",
              type: "text"
            });
          });
        }
      }
      
      setHeaderVariables(headerVars);
      setBodyVariables(bodyVars);
      
      // Reset image selection when template changes
      setSelectedImage(null);
    }
  }, [selectedTemplate]);

  useEffect(()=>{
    if (!loadPhotos) return;
    const fetch = async() => {
      if(companyID){
        await fetchFiles({
          companyID: '6804ded6bfe35d908ea0d489',
          category: "image",
          limit: 10,
          index: Math.floor(photos.length / 10),
        });
      }  
    };

    fetch();
  },[loadPhotos]);

  useEffect(() => {
      if(uploadResponse?.status === 200){
        toast.success("Media Uploaded Successfully");
        const upload = uploadResponse.upload
        if(upload.category === "image"){
          setUploadPhotos(false);
          setPhotos(prev => [upload, ...prev]);
          setSelectedPhoto(upload);
        }
      } else if(uploadError){
        setUploadPhotos(false);
        toast.error(uploadError);
      }
    },[uploadResponse,uploadError]);

  useEffect(() => {
    if(allFiles?.category == 'image')setLoadPhotos(false);
    if (allFiles?.files) {
      // console.log(allFiles.files)
      if(allFiles.category === 'image'){
        totalPhotosRef.current = totalFiles;
        setPhotos((prev) => {
          const existingPhotoIDs = new Set(prev.map(p => p?._id));
          const newUniquePhotos = allFiles?.files?.filter(
            p => !existingPhotoIDs.has(p?._id)
          );
          return [...prev, ...newUniquePhotos]
        });
        setLoadPhotos(false);
      }
    } else if (fileError) {
      toast.error(fileError);
    }
  }, [allFiles, fileError]);

  const onFileChange = async (e, category)=>{
      const file = e.target.files[0];
      const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

      if (!file) {
        toast.error(`Please select an image.`);
        return;
      }

      if (!allowedFileTypes.includes(file.type)) {
        toast.error('Invalid file format. Only JPEG, PNG, JPG, PDF, or MP4 are allowed.');
        return;
      }

      const maxValidSize = 4*1024*1024;

      if (file.size > maxValidSize) {
        toast.error(`File size exceeds the limit. Max allowed size for this type is ${maxValidSize / (1024 * 1024)}MB.`);
        return;
      }

      try {
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");
        if(category==='image')setUploadPhotos(true);
        await handleUpload({
          companyID: '6804ded6bfe35d908ea0d489',
          base64,
          fileName: file.name,
          fileType: file.type,
          category
        });

      } catch (error) {
        console.error('Upload failed:', error);
        toast.error('Failed to upload file. Please try again.');
        setUploadPhotos(false);
      }
  }

  useEffect(() => {
    totalContactsRef
  },[loadTemplates])

  const steps = [
    {
      step: 1,
      title: "Campaign Details",
    },
    {
      step: 2,
      title: "Media & Variables",
    },
    {
      step: 3,
      title: "Select Contacts",
    },
    {
      step: 4,
      title: "Review & Create",
    },
  ];

  const handleContactToggle = (contactId) => {
    setSelectedContacts(prev => {
      if (prev.includes(contactId)) {
        return prev.filter(id => id !== contactId);
      } else {
        return [...prev, contactId];
      }
    });
  };

  const getSelectedContactNames = () => {
    return contacts
      .filter(c => selectedContacts.includes(c._id))
      .map(c => `${c.firstName} ${c.lastName}`)
  };

  const handleVariableChange = (section, index, value) => {
    if (section === 'header') {
      setHeaderVariables(prev => 
        prev.map((variable, i) => 
          i === index ? { ...variable, value } : variable
        )
      );
    } else if (section === 'body') {
      setBodyVariables(prev => 
        prev.map((variable, i) => 
          i === index ? { ...variable, value } : variable
        )
      );
    }
  };

  const handleVariableTypeChange = (section, index, type) => {
    if (section === 'header') {
      setHeaderVariables(prev => 
        prev.map((variable, i) => 
          i === index ? { ...variable, type, value: "" } : variable
        )
      );
    } else if (section === 'body') {
      setBodyVariables(prev => 
        prev.map((variable, i) => 
          i === index ? { ...variable, type, value: "" } : variable
        )
      );
    }
  };

  const toggleVariableDropdown = (section, index) => {
    const key = `${section}-${index}`;
    setVariableDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmit = async () => {
    await handleCreate({
      companyID,
      campaignName,
      templateID: selectedTemplate.templateID,
      contacts: selectedContacts,
      selectedImage,
      headerVariables,
      bodyVariables
    });
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-3">Campaign Name</label>
              <input
                type="text"
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
                placeholder="Enter campaign name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-3">Select Template</label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full p-4 border rounded-lg bg-white text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-green-500"
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen)
                    setSearchTemplate("")
                  }}
                >
                  <span className="text-base">{selectedTemplate ? selectedTemplate?.templateName : "Select a template"}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-96 overflow-auto"
                    onScroll={(e) => {
                      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
                      if (scrollHeight - scrollTop <= clientHeight + 10 && templates.length < totalTemplatesRef.current) {
                        // User has scrolled to the bottom (or near)
                        setLoadTemplates(true);
                        console.log("hi")
                      }
                    }}>

                    {/* Search Input */}
                    <div className="sticky top-0 bg-white z-10 p-3 border-b">
                      <input
                        type="text"
                        placeholder="Search by name or category..."
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={searchTemplate}
                        onChange={(e) => setSearchTemplate(e.target.value)}
                      />
                    </div>

                    {/* Filtered Template List */}
                    {templates
                      .filter(template =>
                        (template.templateName.toLowerCase().includes(searchTemplate.toLowerCase()) ||
                          template.category.toLowerCase().includes(searchTemplate.toLowerCase())) && template.status === "APPROVED"
                      )
                      .map(template => (
                        <div
                          key={template.templateID}
                          className="p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer text-gray-600"
                          onClick={() => {
                            setSelectedTemplate(template);
                            setDropdownOpen(false);
                            setSearchTemplate("");
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`w-5 h-5 rounded-full border ${selectedTemplate === template ? 'bg-green-500 border-green-500' : 'border-gray-300'} mr-3 flex items-center justify-center`}>
                                {selectedTemplate === template && (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <span className="font-medium text-base">{template.templateName}</span>
                            </div>
                            <span className="text-sm text-gray-500">{template.category}</span>
                          </div>
                        </div>
                      ))}

                    {/* Loading Spinner */}
                    {loadTemplates && (
                      <div className="p-3 flex justify-center">
                        <span className="w-6 h-6 mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-transparent inline-block"></span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {selectedTemplate && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="block text-base font-medium text-gray-700">Template Preview</p>
                </div>
                <div className="border rounded-lg bg-gray-50 w-100">
                  <PreviewPartComponent {...decodeComponents(selectedTemplate)} />
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        const decoded = selectedTemplate ? decodeComponents(selectedTemplate) : {};
        let needsImage = decoded.mediaType === "Image";
        const hasVariables = headerVariables.length > 0 || bodyVariables.length > 0;
        
        return (
          <div className="space-y-8">
            <h3 className="text-xl font-semibold">Media & Variables Configuration</h3>
            
            {needsImage && (
              <div>
                <p className="block text-base font-medium text-gray-700">Select Image</p>
              <div className="p-4 border-1 rounded-lg"
            onScroll={(e) => {
            const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
            if (scrollHeight - scrollTop <= clientHeight + 10 && photos.length < totalPhotosRef.current) {
              // User has scrolled to the bottom (or near)
              setLoadPhotos(true);
            }
          }}
          >
            <div className="grid grid-cols-8 gap-2">
              {/* Upload new photo option */}
              <div
                onClick={() => photoInputRef.current?.click()}
                className={"aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors" + `${uploadPhotos ? 'cursor-progress':''}`}
              >
                {uploadPhotos ? (
                  <div className="p-3 flex justify-center">
                    <span className="w-6 h-6 mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-transparent inline-block"></span>
                  </div>
                ) : (
                  <>
                    <Plus className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500 text-center">Add Photo</span>
                  </>
                )}
              </div>
              
              {/* Existing photos */}
              {photos.map((photo) => (
                <div
                  key={photo?._id}
                  onClick={() => {
                    setSelectedPhoto(photo);
                  }}
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity ${selectedPhoto?._id === photo?._id ? 'border-4 border-green-500':'border-0'}`}
                >
                  <img
                    src={photo.link}
                    alt={photo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {/* Loading Spinner */}
            {loadPhotos && (
              <div className="p-3 flex justify-center">
                <span className="w-6 h-6 mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-transparent inline-block"></span>
              </div>
            )}
            </div>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {onFileChange(e, 'image')}}
              className="hidden"
            />
          </div>
          </div>
            )}

            {hasVariables && (
              <div className="space-y-6">
                <h4 className="text-lg font-medium text-gray-700">Template Variables</h4>
                
                {headerVariables.length > 0 && (
                  <div>
                    <h5 className="text-base font-medium text-gray-700 mb-3">Header Variables</h5>
                    <div className="space-y-4">
                      {headerVariables.map((variable, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-gray-50">
                          <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-medium text-gray-700">
                              Variable {index + 1} ({variable.placeholder})
                            </label>
                            <div className="relative">
                              <button
                                type="button"
                                className="px-3 py-1 text-sm border rounded-md bg-white flex items-center gap-2 hover:bg-gray-50"
                                onClick={() => toggleVariableDropdown('header', index)}
                              >
                                {variable.type === 'contact_name' ? 'Contact Name' :
                                 variable.type === 'contact_number' ? 'Contact Number' :
                                 variable.type === 'contact_country' ? 'Contact Country' : 'Custom Text'}
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                              
                              {variableDropdowns[`header-${index}`] && (
                                <div className="absolute right-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-10">
                                  {[
                                    { value: 'text', label: 'Custom Text' },
                                    { value: 'contact_name', label: 'Contact Name' },
                                    { value: 'contact_number', label: 'Contact Number' },
                                    { value: 'contact_country', label: 'Contact Country' }
                                  ].map((option) => (
                                    <button
                                      key={option.value}
                                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                      onClick={() => {
                                        handleVariableTypeChange('header', index, option.value);
                                        toggleVariableDropdown('header', index);
                                      }}
                                    >
                                      {option.label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {variable.type === 'text' && (
                            <input
                              type="text"
                              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                              placeholder="Enter custom text"
                              value={variable.value}
                              onChange={(e) => handleVariableChange('header', index, e.target.value)}
                            />
                          )}
                          
                          {variable.type !== 'text' && (
                            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                              <p className="text-sm text-green-700">
                                This will be automatically filled with each contact's{' '}
                                {variable.type === 'contact_name' ? 'name' :
                                 variable.type === 'contact_number' ? 'phone number' : 'country'}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {bodyVariables.length > 0 && (
                  <div>
                    <h5 className="text-base font-medium text-gray-700 mb-3">Body Variables</h5>
                    <div className="space-y-4">
                      {bodyVariables.map((variable, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-gray-50">
                          <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-medium text-gray-700">
                              Variable {index + 1} ({variable.placeholder})
                            </label>
                            <div className="relative">
                              <button
                                type="button"
                                className="px-3 py-1 text-sm border rounded-md bg-white flex items-center gap-2 hover:bg-gray-50"
                                onClick={() => toggleVariableDropdown('body', index)}
                              >
                                {variable.type === 'contact_name' ? 'Contact Name' :
                                 variable.type === 'contact_number' ? 'Contact Number' :
                                 variable.type === 'contact_country' ? 'Contact Country' : 'Custom Text'}
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                              
                              {variableDropdowns[`body-${index}`] && (
                                <div className="absolute right-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-10">
                                  {[
                                    { value: 'text', label: 'Custom Text' },
                                    { value: 'contact_name', label: 'Contact Name' },
                                    { value: 'contact_number', label: 'Contact Number' },
                                    { value: 'contact_country', label: 'Contact Country' }
                                  ].map((option) => (
                                    <button
                                      key={option.value}
                                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                      onClick={() => {
                                        handleVariableTypeChange('body', index, option.value);
                                        toggleVariableDropdown('body', index);
                                      }}
                                    >
                                      {option.label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {variable.type === 'text' && (
                            <input
                              type="text"
                              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                              placeholder="Enter custom text"
                              value={variable.value}
                              onChange={(e) => handleVariableChange('body', index, e.target.value)}
                            />
                          )}
                          
                          {variable.type !== 'text' && (
                            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                              <p className="text-sm text-green-700">
                                This will be automatically filled with each contact's{' '}
                                {variable.type === 'contact_name' ? 'name' :
                                 variable.type === 'contact_number' ? 'phone number' : 'country'}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {!needsImage && !hasVariables && (
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">This template doesn't require any additional media or variable configuration.</p>
              </div>
            )}

            {selectedTemplate && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="block text-base font-medium text-gray-700">Updated Preview</p>
                </div>
                <div className="border rounded-lg bg-gray-50 w-100">
                  <PreviewPartComponent imageUploaded={needsImage} headerHandle={selectedPhoto.link} {...decodeComponents(selectedTemplate)} />
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        const filteredContacts = contacts.filter((c) => {
          const query = contactSearch.toLowerCase();
          return (
            c.firstName?.toLowerCase().includes(query) ||
            c.lastName?.toLowerCase().includes(query) ||
            c.phoneNumber?.toLowerCase().includes(query)
          );
        });

        return (
          <div className="space-y-8">
            <div>
              <label className="block text-lg font-medium mb-3">Select Contacts</label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full p-4 border rounded-lg bg-white text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-green-500"
                  onClick={() => {
                    setContactsDropdownOpen(!contactsDropdownOpen)
                    setContactSearch("");
                  }}
                >
                  <span className="text-base">
                    {selectedContacts.length
                      ? `${selectedContacts.length} contact${selectedContacts.length > 1 ? 's' : ''} selected`
                      : "Select contacts"}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {contactsDropdownOpen && (
                  <div
                    className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-96 overflow-auto"
                    onScroll={(e) => {
                      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
                      if (scrollHeight - scrollTop <= clientHeight + 10 && contacts.length < totalContacts) {
                        setLoadContacts(true);
                      }
                    }}
                  >
                    {/* Search input */}
                    <div className="sticky top-0 bg-white p-3 border-b z-10">
                      <input
                        type="text"
                        placeholder="Search contacts..."
                        value={contactSearch}
                        onChange={(e) => setContactSearch(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    {/* Select All */}
                    <div className="p-3 border-b flex items-center">
                      <input
                        type="checkbox"
                        checked={
                          filteredContacts.length > 0 &&
                          filteredContacts.every((c) => selectedContacts.includes(c._id))
                        }
                        onChange={() => {
                          const filteredIds = filteredContacts.map((c) => c._id);
                          const allSelected = filteredIds.every((id) => selectedContacts.includes(id));
                          if (allSelected) {
                            // Deselect filtered contacts only
                            setSelectedContacts((prev) =>
                              prev.filter((id) => !filteredIds.includes(id))
                            );
                          } else {
                            // Add filtered contacts to selected list
                            setSelectedContacts((prev) => Array.from(new Set([...prev, ...filteredIds])));
                          }
                        }}
                        className="h-5 w-5 text-green-600 rounded border-gray-300 focus:ring-green-500 mr-3"
                      />
                      <span className="font-medium text-base">
                        {
                          filteredContacts.length > 0 &&
                            filteredContacts.every((c) => selectedContacts.includes(c._id))
                            ? "Deselect All"
                            : "Select All"
                        }
                      </span>
                    </div>

                    {/* 📝 Filtered Contacts */}
                    {contacts
                      .filter(c => {
                        const query = contactSearch.toLowerCase();
                        return (
                          c.firstName?.toLowerCase().includes(query) ||
                          c.lastName?.toLowerCase().includes(query) ||
                          c.phoneNumber?.toLowerCase().includes(query)
                        );
                      })
                      .map((contact) => (
                        <div
                          key={contact._id}
                          className="p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleContactToggle(contact._id)}
                        >
                          <div className="flex items-center">
                            <div className="mr-3">
                              <input
                                type="checkbox"
                                checked={selectedContacts.includes(contact._id)}
                                onChange={() => { }}
                                className="h-5 w-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                            <div>
                              <span className="font-medium text-base">{contact.firstName} {contact.lastName}</span>
                              <span className="text-gray-400 ml-3 text-sm">{contact.phoneNumber}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    }

                    {loadContacts && (
                      <div className="p-3 flex justify-center">
                        <span className="w-6 h-6 animate-spin rounded-full border-2 border-gray-300 border-t-transparent inline-block"></span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {selectedContacts.length > 0 && (
              <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                <p className="font-medium text-base mb-2">Selected contacts: {selectedContacts.length}</p>
                <p className="text-sm text-gray-500">
                  You've selected {selectedContacts.length} contact{selectedContacts.length !== 1 ? 's' : ''} to receive this campaign.
                </p>
              </div>
            )}
          </div>
        );

      case 4:
        needsImage = decoded.mediaType === "Image";
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Campaign Summary</h3>

            <div className="p-6 border rounded-lg bg-gray-50 space-y-6">
              <div>
                <p className="font-medium text-base mb-1">Campaign Name:</p>
                <p className="text-lg">{campaignName || "Not specified"}</p>
              </div>

              <div>
                <p className="font-medium text-base mb-1">Template Name:</p>
                <p className="text-lg">{selectedTemplate?.templateName || "None selected"}</p>
              </div>

              {selectedImage && (
                <div>
                  <p className="font-medium text-base mb-2">Selected Image:</p>
                  <img 
                    src={selectedImage.url} 
                    alt="Campaign" 
                    className="max-h-32 rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-500 mt-1">{selectedImage.name}</p>
                </div>
              )}

              {(headerVariables.length > 0 || bodyVariables.length > 0) && (
                <div>
                  <p className="font-medium text-base mb-2">Variable Configuration:</p>
                  <div className="space-y-2">
                    {headerVariables.map((variable, index) => (
                      <div key={`header-${index}`} className="text-sm">
                        <span className="font-medium">Header Variable {index + 1}:</span>
                        <span className="ml-2 text-gray-600">
                          {variable.type === 'contact_name' ? 'Contact Name (Dynamic)' :
                           variable.type === 'contact_number' ? 'Contact Number (Dynamic)' :
                           variable.type === 'contact_country' ? 'Contact Country (Dynamic)' :
                           `"${variable.value}"`}
                        </span>
                      </div>
                    ))}
                    {bodyVariables.map((variable, index) => (
                      <div key={`body-${index}`} className="text-sm">
                        <span className="font-medium">Body Variable {index + 1}:</span>
                        <span className="ml-2 text-gray-600">
                          {variable.type === 'contact_name' ? 'Contact Name (Dynamic)' :
                           variable.type === 'contact_number' ? 'Contact Number (Dynamic)' :
                           variable.type === 'contact_country' ? 'Contact Country (Dynamic)' :
                           `"${variable.value}"`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="font-medium text-base mb-2">Message Preview:</p>
                <div className="border rounded-lg w-100">
                  {selectedTemplate ? <PreviewPartComponent imageUploaded={needsImage} headerHandle={selectedPhoto.link} {...decodeComponents(selectedTemplate)} /> : "No template selected"}
                </div>
              </div>

              <div>
                <p className="font-medium text-base mb-2">
                  Selected Contacts ({selectedContacts.length})
                </p>

                <div className="mt-2 h-40 overflow-y-auto border rounded-lg p-4 bg-white">
                  {getSelectedContactNames().length > 0 ? (
                    getSelectedContactNames().map((name, index) => (
                      <p key={index} className="text-base text-gray-800 py-1 border-b last:border-b-0">
                        {name}
                      </p>
                    ))
                  ) : (
                    <p className="text-base text-gray-500">No contacts selected</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return campaignName && selectedTemplate;
      case 2:
        if (!selectedTemplate) return false;
        const decoded = decodeComponents(selectedTemplate);
        const needsImage = decoded.mediaType === "Image";
        const hasVariables = headerVariables.length > 0 || bodyVariables.length > 0;
        
        // Check if image is required and selected
        if (needsImage && !selectedPhoto) return false;
        
        // Check if all text variables have values
        const allHeaderVarsValid = headerVariables.every(v => v.type !== 'text' || v.value.trim());
        const allBodyVarsValid = bodyVariables.every(v => v.type !== 'text' || v.value.trim());
        
        return allHeaderVarsValid && allBodyVarsValid;
      case 3:
        return selectedContacts.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="bg-white px-6 py-8 rounded-lg max-w-4xl mx-auto shadow-sm">
      <h2 className="text-2xl font-bold mb-8">Create Campaign</h2>

      <Stepper value={currentStep} className="mb-10">
        {steps.map(({ step, title }) => (
          <StepperItem key={step} step={step} className="flex-1">
            <StepperTrigger
              className="w-full flex-col items-start gap-2 rounded"
              onClick={() => { }}
            >
              <StepperIndicator asChild className="bg-border h-2 w-full">
                <div className={`h-2 w-full rounded-full ${step <= currentStep ? 'bg-green-500' : 'bg-gray-200'}`}>
                  <span className="sr-only">{step}</span>
                </div>
              </StepperIndicator>
              <div className="space-y-1 mt-2">
                <StepperTitle className="text-sm font-medium">{title}</StepperTitle>
              </div>
            </StepperTrigger>
          </StepperItem>
        ))}
      </Stepper>

      <div className="min-h-96 mb-8">
        {renderStepContent()}
      </div>

      <div className="flex justify-between mt-10 pt-6 border-t">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-8 py-4 rounded-lg text-base font-medium ${
            currentStep === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>

        {currentStep < steps.length ? (
          <button
            onClick={nextStep}
            disabled={!isStepValid()}
            className={`px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 text-base font-medium ${!isStepValid() ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            Next
          </button>
        ) : (
          <button
            disabled={isCreateLoading}
            className="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 text-base font-medium"
            onClick={handleSubmit}
          >
            {isCreateLoading ? <span className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent inline-block"></span> : "Create Campaign"}
          </button>
        )}
      </div>
    </div>
  );
}