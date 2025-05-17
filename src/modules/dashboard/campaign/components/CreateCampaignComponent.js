import { useEffect, useState } from "react";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { SelectIcon } from "@radix-ui/react-select";
import PreviewPartComponent from "../../template/components/PreviewPartComponent";

const decodeComponents = (template) => {
    const components = template.components
    const headerObj = components?.find((item)=> item.type==="HEADER");
    const bodyObj = components?.find((item)=> item.type==="BODY");
    const footerObj = components?.find((item)=> item.type==="FOOTER");
    const buttonsObj = components?.find((item)=> item.type==="BUTTONS") || [];
    const headerType = headerObj?.format === "TEXT" ? "Text" : "Media";
    const mediaType = headerObj?.format === "IMAGE" ? "Image" : headerObj?.format === "VIDEO" ? "Video" : headerObj?.format === "DOCUMENT" ? "Document" : headerObj?.format === "LOCATION" ? "Location" : "";
    const headerPart = headerObj?.text || "";
    const bodyPart = bodyObj?.text || "";
    const footerPart = footerObj?.text || "";
    const buttons = buttonsObj?.buttons || [];
    const bodyVariableValues = bodyObj?.example?.body_text || [];
    const headerVariableValues = headerObj?.example?.header_text || [];
    const headerHandle = headerObj?.example?.header_handle || [];
    let ctaItems = [];
    let replyItems = [];
    buttons.forEach(item => {
      if(item.type === "PHONE_NUMBER"){
        ctaItems.push({
          ctaType: 'PHONE',
          label: item.text
        });
      } else if(item.type === "URL"){
        ctaItems.push({
          ctaType: 'URL',
          label: item.text
        });
      } else {
        replyItems.push(item.text);
      }
    });

    return {headerType, mediaType, headerPart, bodyPart, footerPart, ctaItems, replyItems, bodyVariableValues, headerVariableValues, headerHandle}

  } 

export default function CreateCampaignDialog({
        templates = [{templateID:1,templateName:"A"}], 
        contacts = [], 
        handleCreate, setOpen,
        totalTemplates,
        totalContacts,
        loadContacts,
        loadTemplates,
        setLoadContacts,
        setLoadTemplates,
        limit = 1
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignName, setCampaignName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [contactsDropdownOpen, setContactsDropdownOpen] = useState(false);

  useEffect(()=>{
    if(!templates.length)setLoadTemplates(true);
    if(!contacts.length)setLoadContacts(true);
  });


  const steps = [
    {
      step: 1,
      title: "Campaign Details",
    },
    {
      step: 2,
      title: "Select Contacts",
    },
    {
      step: 3,
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
    console.log(contacts);
    return contacts
      .filter(c => selectedContacts.includes(c._id))
      .map(c => `${c.firstName} ${c.lastName}`)
      
  };

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
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-medium mb-2">Campaign Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter campaign name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-lg font-medium mb-2">Select Template</label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full p-3 border rounded-lg bg-white text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-green-500"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span>
                    {selectedTemplate ? selectedTemplate?.templateName : "Select a template"}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {dropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
                  onScroll={(e) => {
                      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
                      if (scrollHeight - scrollTop <= clientHeight + 10 && templates.length < totalTemplates) {
                        // User has scrolled to the bottom (or near)
                        setLoadTemplates(true);
                      }
                    }}>
                    {templates.map((template) => (
                      <div 
                        key={template.templateID} 
                        className="p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setSelectedTemplate(template);
                          setDropdownOpen(false);
                        }}
                      >

                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border ${parseInt(selectedTemplate) === template.id ? 'bg-green-500 border-green-500' : 'border-gray-300'} mr-3 flex items-center justify-center`}>
                            {selectedTemplate === template && (
                            //   <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                            //     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            //   </svg>
                            <SelectIcon />
                            )}
                          </div>
                          <span className="font-medium">{template.templateName}</span>
                        </div>
                      </div>
                    ))}
                    {loadTemplates && <div><span className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-transparent inline-block"></span></div>}
                  </div>
                )}
              </div>
            </div>
            
            {selectedTemplate && (
              <div className="mt-4">
                <p className="block text-lg font-medium mb-2">Template Preview</p>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <PreviewPartComponent {...decodeComponents(selectedTemplate)} />
                </div>
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-lg font-medium mb-2">Select Contacts</label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full p-3 border rounded-lg bg-white text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-green-500"
                  onClick={() => setContactsDropdownOpen(!contactsDropdownOpen)}
                >
                  <span>
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
                    className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
                    onScroll={(e) => {
                      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
                      if (scrollHeight - scrollTop <= clientHeight + 10 && contacts.length < totalContacts) {
                        // User has scrolled to the bottom (or near)
                        setLoadContacts(true);
                      }
                    }}
                  >
                    {contacts.map((contact) => (
                      <div 
                        key={contact._id} 
                        className="p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleContactToggle(contact._id)}
                      >
                        <div className="flex items-center">
                          <div className="mr-3">
                            <input
                              type="checkbox"
                              id={`contact-${contact.id}`}
                              checked={selectedContacts.includes(contact._id)}
                              onChange={() => {}}
                              className="h-5 w-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          <div>
                            <span className="font-medium">{`${contact.firstName} ${contact.lastName}`}</span>
                            <span className="text-gray-400 ml-2 text-sm">{contact.phoneNumber}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {loadContacts && <div><span className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-transparent inline-block"></span></div>}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Campaign Summary</h3>
            
            <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
              <div>
                <p className="font-medium">{`Campaign Name: ${campaignName || "Not specified"}`}</p>
              </div>
              
              <div>
                <p className="font-medium">{`Template Name: ${selectedTemplate?.templateName || "None selected"}`}</p>
              </div>
              
              <div>
                <p className="font-medium">Message Preview:</p>
                <div className="p-3 border rounded bg-white mt-1">
                  {selectedTemplate ? <PreviewPartComponent {...decodeComponents(selectedTemplate)} /> : "No template selected"}
                </div>
              </div>
              
              <div>
              <p className="font-medium">
                Selected Contacts ({selectedContacts.length}):
              </p>

              <div className="mt-2 h-32 overflow-y-auto border rounded p-2 bg-gray-50">
                {getSelectedContactNames().length > 0 ? (
                  getSelectedContactNames().map((name, index) => (
                    <p key={index} className="text-sm text-gray-800">
                      {name}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No contacts selected</p>
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

  return (
    <div className="bg-white px-4 rounded-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Create Campaign</h2>
      
      <Stepper value={currentStep} className="mb-4">
        {steps.map(({ step, title }) => (
          <StepperItem key={step} step={step} className="flex-1">
            <StepperTrigger 
              className="w-full flex-col items-start gap-2 rounded"
              onClick={() => {}}
            >
              <StepperIndicator asChild className="bg-border h-1 w-full">
                <div className={`h-1 w-full ${step <= currentStep ? 'bg-green-500' : 'bg-gray-200'}`}>
                  <span className="sr-only">{step}</span>
                </div>
              </StepperIndicator>
              <div className="space-y-0.5">
                <StepperTitle className="text-sm font-medium">{title}</StepperTitle>
              </div>
            </StepperTrigger>
          </StepperItem>
        ))}
      </Stepper>
      
      <div className="min-h-64">
        {renderStepContent()}
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-lg ${
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
            disabled={currentStep == 1 && (!campaignName || !selectedTemplate) || 
                (currentStep == 2 && !selectedContacts.length)
            }
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Next
          </button>
        ) : (
          <button
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={() => {}}
          >
            Create Campaign
          </button>
        )}
      </div>
    </div>
  );
}
