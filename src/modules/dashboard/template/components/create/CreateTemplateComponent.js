import { useEffect, useRef, useState } from 'react'
import PreviewPartComponent from '../PreviewPartComponent';
import { TemplateLanguageInput, TemplateActionButton } from './TemplateLanguageInput';
import TemplateHeaderType from './TemplateHeaderType';
import dynamic from 'next/dynamic';
// import TemplateHeaderTextInput from './templatecreate/TemplateHeaderInput';
import { MediaOptions, DocumentMedia, ImageMedia, LocationMedia, VideoMedia } from './MediaOptions';
import { useRouter } from 'next/router';
import RadioList from '@/components/general/radiolist';
import { TemplateFooterInput } from './TemplateNameInput';
import { useResumableUpload } from '@/modules/dashboard/template/hooks/useResumableUpload';
import { useCreateTemplate } from '@/modules/dashboard/template/hooks/useCreateTemplate';
import { toast } from 'sonner';
import { useId } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { LayoutList, List } from 'lucide-react';
import { Combobox } from '@/components/ui/combobox';
import { TemplateLanguages } from '@/components/general/templatelanguage';


const EmojiPicker = dynamic(() => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);

export function RadioGroupList({options=[], value='', onChange=()=>{}}) {
  // optionItem
  return (
    <RadioGroup className="gap-2 grid grid-cols-3" onValueChange={onChange} value={value}>
      {/* Radio card #1 */}
      {
        options?.map((optionItem, i) => (
          <div className="border-input has-data-[state=checked]:bg-emerald-600/10 has-data-[state=checked]:border-emerald-600 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
            <RadioGroupItem value={optionItem.value} id={`radioItem-${i}`} aria-describedby={`radioItem-${i}-description`} className="order-1 after:absolute after:inset-0"/>
            <div className="flex grow items-start gap-3">
              <div className='w-6'><LayoutList size={20} /></div>
              <div className="grid grow gap-2">
                <Label htmlFor={`radioItem-${i}`}>{optionItem.label}</Label>
                <p id={`radioItem-${i}-description`} className="text-muted-foreground text-[11px]">{optionItem.description}</p>
              </div>
            </div>
          </div>
        ))
      }
    </RadioGroup>
  )
}

const TemplateCreate = ({companyID}) => {
  const { createResponse, isCreateLoading, createError, handleCreate, cancelCreate } = useCreateTemplate();
  const { uploadResponse, isUploadLoading, uploadError, handleUpload, cancelUpload } = useResumableUpload();
  const [sessionData, setSessionData] = useState();
  const templateNameRef = useRef();
  const headerValueRef = useRef();
  const headerRefErr = useRef();
  const bodyRefErr = useRef();
  const errFormRef = useRef();
  const [globalProfileData, setGlobalProfileData] = useState();
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [currentLanguageLabel, setCurrentLanguageLabel] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [templateCategory, setTemplateCategory] = useState('');
  const [isLoadingTempCreate, setIsLoadingTempCreate] = useState(false);
  const router = useRouter();
  // for Create Template or edit template step Divide
  const [selectedHeader, setSelectedHeader] = useState('');
  const [mediaValue, setMediaValue] = useState("Image");
  const [footerPart, setFooterPart] = useState('');
  const [headerHandle, setHeaderHandle] = useState([]);
  //***** */ header val operation  start **********
  const [headerVariables, setHeaderVariables] = useState([]); //for Variable count
  const [headerCurrentText, setHeaderCurrentText] = useState(''); // header current text to use in api
  const [sampleHeaderVariable, setSampleHeaderVariable] = useState([]);
  const [previewHeaderWithVariable, setPreviewHeaderWithVariable] = useState('');
  const [sampleVariableHeaderTextValue, setSampleVariableHeaderTextValue] = useState('');
  // ****** Template body Operation Start ****** 
  // variable assignment - 
  const MAX_VARIABLE_COUNT = 25; // Define the maximum number of variables
  // const [variableCount, setVariableCount] = useState(0);
  const [bodyCurrentText, setBodyCurrentText] = useState('');
  const [bodyVariables, setBodyVariables] = useState([]); // useState([{ key: '', value: '' }]); //for Variable count
  const bodyTextValueRef = useRef(null);
  // For Buttons
  const [showDropDown, setShowDropDown] = useState(false);
  const [callToActions, setCallToActions] = useState([]);
  const [quickReplies, setQuickReplies] = useState([]);
  const [isCtaUrl, setIsCtaUrl] = useState(false);
  const [isCtaPhone, setIsCtaPhone] = useState(false);
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    if(uploadResponse?.message === "Media uploaded successfully"){
      setHeaderHandle(uploadResponse.fileHandle);
      toast.success("Media Uploaded Successfully");
    } else if(uploadError){
      toast.error(uploadError);
    }
  },[uploadResponse,uploadError]);

  useEffect(() => {
    if(createResponse?.message === "template added successfully"){
      toast.success("Template Added Successfully");
      router.push("/dashboard/templates");
    } else if(createError){
      toast.error(createError);
    }
  },[createResponse,createError]);

  const checkInputCTAFunc = (ctaInp, index, ctaType, inputType) => {
    let cta = [...callToActions];
    cta.find((val, i) => {
      if (index == i) {
        inputType == 'LABEL'
          ? cta[i].label = ctaInp
          : inputType == 'COUNTRY_CODE'
            ? cta[i].countryCode = ctaInp
            : cta[i].labelValue = ctaInp
        setCallToActions(cta);
      }
    });
  }

  const addCTA = (ctaType) => {
    // console.log(ctaType);
    let phoneCta = [];
    let urlCta = [];
    let cta = [];
    cta = callToActions;
    if (callToActions.length == 0) {
      ctaType == 'URL'
        ? cta.push({
          ctaType: 'URL',
          label: '',
          labelValue: '',
          countryCode: ''
        })
        : cta.push({
          ctaType: 'PHONE',
          label: '',
          labelValue: '',
          countryCode: ''
        });
    } else {
      if (ctaType == 'URL') {
        cta.push({
          ctaType: 'URL',
          label: '',
          labelValue: '',
          countryCode: ''
        });
        // setCallToActions((oldCTA) => [...oldCTA, 'URL']);
      } else if (ctaType == 'PHONE') {
        cta.push({
          ctaType: 'PHONE',
          label: '',
          labelValue: '',
          countryCode: ''
        });
        // setCallToActions((oldCTA) => [...oldCTA, 'PHONE'])
      }
    }
    cta.map((ctaItem) => {
      // console.log(ctaItem);
      if (ctaItem.ctaType == 'URL') {
        urlCta.push('URL');
      } else if (ctaItem.ctaType == 'PHONE') {
        phoneCta.push('PHONE');
      }
    });
    if (phoneCta.length == 1 && urlCta.length == 2) {
      setIsCtaPhone(true);
      setIsCtaUrl(true);
    } else if (urlCta.length == 2) {
      setIsCtaUrl(true);
    } else if (phoneCta.length == 1) {
      setIsCtaPhone(true);
    } else {
      setIsCtaPhone(false);
      setIsCtaUrl(false);
    }
    setCallToActions(cta);
    setShowDropDown(false);
  }
  // const getWhatsappBusinessProfile = async () => {
  //   const profileData = await fetch('https://wa-api.triggrsweb.com/users?userid='+loginData.userId, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //   let response = await profileData.json();
  //   if (response.status == 200) {
  //     // console.log(response);
  //     getProfilethroughFB(response.data);
  //     setGlobalProfileData(response.data);
  //   } else {
  //     console.log('Something went wrong');
  //   }
  // }
  const removeCTA = (index) => {
    let phoneCta = [];
    let urlCta = [];
    let tempCTA = [...callToActions];
    tempCTA.splice(index, 1); // Remove the item at the provided index

    tempCTA.forEach((ctaItem) => {
      if (ctaItem.ctaType === 'URL') {
        urlCta.push('URL');
      } else if (ctaItem.ctaType === 'PHONE') {
        phoneCta.push('PHONE');
      }
    });

    // console.log(tempCTA);
    setCallToActions(tempCTA);
    setIsCtaPhone(phoneCta.length >= 1);
    setIsCtaUrl(urlCta.length >= 2);
  }

  const removeQuickReplies = (index) => {
    const tempQR = quickReplies.filter((qrItem, i) => {
      return i != index;
    });
    setQuickReplies(tempQR);
  }

  const checkInputReplyFunc = (replyInp, index) => {
    let replies = [...quickReplies];
    replies.find((val, i) => {
      if (index == i) {
        replies[i] = replyInp;
      }
    });
    setQuickReplies(replies);
  }

  const addQuickReply = () => {
    if (quickReplies.length == 0) {
      setQuickReplies([1]);
    } else {
      const addedReply = quickReplies.length;
      setQuickReplies(initquickReply => [...initquickReply, addedReply]);
    }
    setShowDropDown(false);
  }

  const handleChangeHeader = (value, setSelectedHeader) => {
    setSelectedHeader(value)
    value == 'Media'
      ? setMediaValue('Image')
      : setMediaValue('');
  }

  const onChangeMediaValue = async (e) => {
    // console.log(mediaValue)
    setMediaValue(e.target.value);
    // console.log(event.target.value);
  }

  const detectHeaderVariables = (text) => {
    // Regular expression to find {{variables}}
    // const variableRegex = /\{\{([^}]+)\}\}/g;
    const variableRegex = /{{\d+}}/g;
    let match, variables = [];
    // Loop through all matches of {{variables}} in the input text
    while ((match = variableRegex.exec(text)) !== null) {
      variables.push(match[1]);
    }
    setHeaderVariables(variables);
    // headerVariablesArray = text.match(/{{\d}}/g);
    if (variables) {
      setHeaderVariables(variables);
      if (variables.length > 1) {
        headerRefErr.current.innerHTML = 'Please enter only 1 variable';
      } else {
        // console.log('Starting text is only text not variable')
        // headerRefErr.current.innerHTML = '';
      }
    }
  };

  const addHeaderVariable = () => {
    const headerInput = headerValueRef.current;
    if (headerInput) {
      const startPos = headerInput.selectionStart;
      const endPos = headerInput.selectionEnd;
      const newHeaderValue =
        headerCurrentText.substring(0, startPos) + '{{1}}' + headerCurrentText.substring(endPos, headerCurrentText.length);
      setHeaderCurrentText(newHeaderValue);
      // console.log(newHeaderValue);
      // Place the cursor after the inserted variable
      const newCursorPos = startPos + '{{1}}'.length;
      headerInput.setSelectionRange(newCursorPos, newCursorPos);
      detectHeaderVariables(headerCurrentText);
      headerInput.focus();
    }
  }

  const handleHeaderInputChange = (e) => {
    setHeaderCurrentText(e.target.value);
    detectHeaderVariables(e.target.value);
  };

  const handleHeaderInputVariableChange = (e) => {
    const newVariableValue = e.target.value;
    setSampleVariableHeaderTextValue(newVariableValue);
    // Replace all occurrences of "{{1}}" with the new variable value
    const updatedHeaderText = headerCurrentText.replace(/{{1}}/g, newVariableValue);
    setPreviewHeaderWithVariable(updatedHeaderText);
  };
  //***** */ header val operation  End **********


  const detectBodyVariables = (text) => {
    const variableRegex = /({{\d+}})/g;
    let match, variables = [];
    // Loop through all matches of {{variables}} in the input text
    while ((match = variableRegex.exec(text)) !== null) {
      variables.push({ key: match[1], value: match[1] });  // Push the matched string
    }
    if (bodyVariables) {
      setBodyVariables(variables);
    }
  }

  /* Body Operation Starts */

  const addEmojiDataEditor = (emoji) => {
    const bodyInput = bodyTextValueRef.current;
    const startPos = bodyInput.selectionStart;
    const endPos = bodyInput.selectionEnd;
    const newBodyValue = bodyCurrentText.substring(0, startPos) + emoji + bodyCurrentText.substring(endPos, bodyCurrentText.length);
    setBodyCurrentText(newBodyValue);
    bodyInput.focus();
    setShowEmojiPicker(false);
  }

  const addBodyVariable = () => {
    const bodyInput = bodyTextValueRef.current;
    const startPos = bodyInput.selectionStart;
    const endPos = bodyInput.selectionEnd;
    const newBodyValue = bodyCurrentText.substring(0, startPos) + `{{${bodyVariables.length + 1}}} ` + bodyCurrentText.substring(endPos, bodyCurrentText.length);
    setBodyCurrentText(newBodyValue);
    detectBodyVariables(newBodyValue);
    bodyInput.focus();
  }
 
  const handleSubmitCreateTemplate = async (e) => {
    e.preventDefault();
    let templateName = templateNameRef.current.value;
    let components = [];
    if (!templateCategory) {
      errFormRef.current.innerHTML = 'Select Category that describes your message template';
      return;
    }
    if (!templateName) {
      errFormRef.current.innerHTML = "Template name can't be empty";
      return;
    }
    if (!currentLanguage) {
      errFormRef.current.innerHTML = "Select the language of your template";
      return;
    }
    
    // Add HEADER
    if (headerCurrentText && selectedHeader === "Text") {
      components.push({
        type: "HEADER",
        format: selectedHeader.toUpperCase(),
        text: headerCurrentText,
        ...(sampleVariableHeaderTextValue !== ''
          ? {
              example: {
                header_text: [sampleVariableHeaderTextValue],
              },
            }
          : null),
      });
    }
    // Add MEDIA HEADER
    if (selectedHeader === "Media" && ["Image", "Video", "Document"].includes(mediaValue)) {
      components.push({
        type: "HEADER",
        format: mediaValue.toUpperCase(),
        example: {
          header_handle: headerHandle,
        },
      });
    }
    
    // Add BODY
    const bodyVariableValues = bodyVariables?.length
      ? bodyVariables.map((v) => v.value)
      : [];

    components.push({
      type: "BODY",
      text: bodyCurrentText,
      ...(bodyVariables.length >= 1
        ? {
            example: {
              body_text: [bodyVariableValues],
            },
          }
        : null),
    });

    // Add FOOTER
    if (footerPart) {
      components.push({
        type: "FOOTER",
        text: footerPart,
      });
    }

    // Add BUTTONS
    if (quickReplies.length > 0 || callToActions.length > 0) {
      const buttons = [...callToActions, ...quickReplies].map((button) => {
        if (button.ctaType === "PHONE") {
          return {
            type: "PHONE_NUMBER",
            text: button.label,
            phone_number: parseInt(
              button.countryCode.toString() + button.labelValue.toString()
            ),
          };
        } else if (button.ctaType === "URL") {
          return {
            type: "URL",
            text: button.label,
            url: button.labelValue,
          };
        } else {
          return {
            type: "QUICK_REPLY",
            text: button,
          };
        }
      });

      components.push({
        type: "BUTTONS",
        buttons,
      });
    }
    try {
      console.log(components);
      await handleCreate({
        companyID,
        name: templateName,
        language: currentLanguage,
        label: currentLanguageLabel,
        category: templateCategory,
        components
      });
    } catch (error) {
      console.error('Create Template Hook Error:', error);
    } 
    
  };
      //  else if(response.status === 'REJECTED') {
      //   setIsLoadingTempCreate(false)
      //   let category = response.category;
      //   let id = response.id
      //   let status = response.status
      //   errFormRef.current.innerHTML = '';
      //   templateNameRef.current.value = ''
      //   setTemplateCategory('')
      //   setCurrentLanguage('')
      //   setSelectedHeader('')
      //   setHeaderCurrentText('')
      //   setBodyCurrentText('')
      //   setFooterPart('')
      //   // console.log(response)
      // }

  // for add multiple variable 
  const handleBodyVariableInputChange = (variableName, index, e) => {
    const { value } = e.target;
    // bodyVarVal[i] = value;
    let tempBodyVar = [...bodyVariables];
    tempBodyVar.forEach((tempVar) => {
      if (tempVar.key == variableName) {
        tempBodyVar[index].value = value;
      }
    })
    // console.log(tempBodyVar);
    setBodyVariables(tempBodyVar);
  };

  // for input field text count 
  const handleBodyInputChange = (e) => {
    let text = e.target.value.toString();
    const startPos = bodyTextValueRef.current.selectionStart;
    const endPos = bodyTextValueRef.current.selectionEnd;
    const beforeCursor = bodyCurrentText.slice(0, startPos);
    let regex = /({{\d+}})/g;
    let bodyVary = [];
    bodyVary = text.match(regex);
    if (bodyVary ? bodyVary.length > 1 : false) {
      let last = bodyVary[bodyVary.length - 1];
      let secondLast = bodyVary[bodyVary.length - 2];
      const lastVariable = parseInt(last.substring(2, 3));
      const secondLastVariable = parseInt(secondLast.substring(2, 3));
      if ((lastVariable - secondLastVariable) > 1 || lastVariable == secondLastVariable) {
        // console.log('It should be replaced');
        let currentBodyText = text.split(`${bodyVary[bodyVary.length - 1]}`).join(`{{${secondLastVariable + 1}}}`);;
        setBodyCurrentText(currentBodyText);
      } else {
        setBodyCurrentText(text);
      }
    } else {
      setBodyCurrentText(text);
    }
    detectBodyVariables(text);
  };

  const handleRadioChange = (checkedVal) => {
    // setSelectedValue(event.target.value);
    setTemplateCategory(checkedVal);
  };

  const getLanguageLabel = (value) => {
    const match = TemplateLanguages.find(lang => lang.value === value);
    return match ? match.label : 'Unknown';
  }
  const changeCurrentLanguage = (language) => {
    setCurrentLanguage(language);
    setCurrentLanguageLabel(getLanguageLabel(language));
  }


  const isValid = (obj) => {
    for (const key in obj) {
      if (!obj[key] || obj[key].trim() === "") {
        return false;
      }
    }
    return true;
  };

  const validateArray = (dataArray) => {
    for (const obj of dataArray) {
      if (!isValid(obj)) {
        return false;
      }
    }
    return true;
  };

  // const result = validateArray(data);

  const getWhatsappBusinessProfile = async (inpdata) => {
    const profileData = await fetch('https://wa-api.triggrsweb.com/users?userid='+inpdata.userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let response = await profileData.json();
    if (response.status == 200) {
      // console.log(response);
      setSessionData(response.data.data);
      setGlobalProfileData(response.data);
    } else {
      console.log('Something went wrong');
    }
  }

  const onFileChange = async (e)=>{
      const file = e.target.files[0];
      // console.log(file)
      const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'application/pdf'];

      const maxSizeByType = {
        'image/jpeg': 4 * 1024 * 1024,
        'image/jpg': 4 * 1024 * 1024,
        'image/png': 4 * 1024 * 1024,
        'application/pdf': 10 * 1024 * 1024,
        'video/mp4': 10 * 1024 * 1024,
      };

      if (!file) {
        setFileError(`Please select a ${mediaValue} file.`);
        return;
      }

      if (!allowedFileTypes.includes(file.type)) {
        setFileError('Invalid file format. Only JPEG, PNG, JPG, PDF, or MP4 are allowed.');
        return;
      }

      const maxValidSize = maxSizeByType[file.type] || 0;

      if (file.size > maxValidSize) {
        setFileError(`File size exceeds the limit. Max allowed size for this type is ${maxValidSize / (1024 * 1024)}MB.`);
        return;
      }

      setFileError('');

      try {
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");
        await handleUpload({
          companyID,
          base64,
          fileName: file.name,
          fileType: file.type,
        });

      } catch (error) {
        console.error('Upload failed:', err);
        setFileError('Failed to upload file. Please try again.');
      }
  }

  return (
    <>
    <section className='max-w-6xl mx-auto grid grid-cols-[auto_360px] items-start justify-center'>
      <div className='w-full mx-auto pl-4 bg-transparent'>
        <form className='max-w-[1300px] mx-auto' onSubmit={handleSubmitCreateTemplate}>
          <div className='w-full'>
            {/* 1st part of form  */}
            <div className='flex flex-col rounded-xl bg-white gap-4 px-6 py-4 my-2 border border-gray-200 shadow-sm'>
              <div className='border-b pb-2 border-b-gray-300'>
                <h3 className="text-lg font-semibold text-slate-800">Category</h3>
                <p className='text-xs text-emerald-600'>Category that best describes your message template</p>
              </div>
              <RadioGroupList 
                onChange={(e) => handleRadioChange(e)} 
                value = {templateCategory}
                options={
                  [
                    {label: 'Marketing', description: 'Promotions or information about your business, products or services.', value: 'MARKETING'},
                    {label: 'Utility', description: 'Messages about specific transaction, notification or customer request', value: 'UTILITY'},
                    {label: 'Authentication', description: 'Send One Time Password for authentication or login', value: 'AUTHENTICATION'}
                  ]
                }
              />
            </div>

            <div className="w-full bg-white rounded-xl p-6 my-2 border border-gray-200 shadow-sm grid grid-cols-2 gap-2">
              <label htmlFor='template_name' className='w-full flex flex-col gap-x-2 gap-y-1 my-1'>
                {/* <h3 className="text-[13px] font-medium text-gray-900">Template Name</h3> */}
                <div><input ref={templateNameRef} type="text" id="template_name" placeholder='Template Name' minLength={3} maxLength={512} className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-emerald-600 focus:border-emerald-600 placeholder:text-gray-500 focus:outline-none focus:border block w-full p-3" /></div>
              </label>
              <Combobox
                onChange={(e) => changeCurrentLanguage(e)}
                value={currentLanguage}
                options={TemplateLanguages}
                className='w-full h-[45px] text-gray-600 mt-1 font-normal border-gray-300'
                placeholder='Select Language'
                icon={true}
                required={true}
              />
              {/* 2nd part of form  */}

            </div>

            {/* Header Part */}
            <div className="w-full rounded-md p-4 border border-gray-200 shadow-sm">
              <h3 className="text-[13px] font-semibold text-slate-800 flex gap-1  items-center">Header <span className='text-xs rounded font-medium capitalize text-slate-500'>(Optional)</span></h3>
              <p className='text-xs text-gray-600'>Add a title or choose which type of media you&apos;ll use for this header.</p>
              <div className="space-y-4 rounded-md w-full">
                <div className='w-full flex flex-wrap gap-4'>
                  <TemplateHeaderType value={selectedHeader} onChange={(e) => handleChangeHeader(e.target.value, setSelectedHeader)} />
                  {
                    selectedHeader == "Text"
                      ? <div className='flex justify-end flex-col gap-y-1 w-full'>
                        <input
                          ref={headerValueRef}
                          onChange={handleHeaderInputChange}
                          value={headerCurrentText}
                          autoComplete="off"
                          type="text" id="template_title" minLength={3} maxLength={60}
                          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 focus:outline-none focus:border block w-full p-2.5 mt-4"
                          placeholder="Enter Template Header Message"
                        />
                        {/* <TemplateHeaderTextInput ref={headerValueRef} onChange={handleHeaderInputChange} value={headerCurrentText} /> */}
                        <div ref={headerRefErr} className='text-xs text-red-600'></div>
                        <p className="text-xs text-end mb-2 text-gray-500">{headerCurrentText.length}/60</p>
                        <button type='button' disabled={headerVariables ? headerVariables.length >= 1 : false} onClick={addHeaderVariable} className='bg-gray-300 px-3 py-1 text-xs text-gray-800 w-fit ml-auto rounded-md'>Add Variable</button>
                        {headerVariables && headerVariables.length >= 1
                          ? <div className='flex gap-2 items-center justify-center'>
                            <span className="bg-gray-200 text-slate-800 font-medium px-3 py-2.5 rounded-lg">{`{{${headerVariables.length}}}`}</span>
                            <input
                              value={sampleVariableHeaderTextValue}
                              onChange={handleHeaderInputVariableChange}
                              autoComplete="off"
                              type="text"
                              id="template_title_variable"
                              minLength="3"
                              maxLength="60"
                              className=" bg-white border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-emerald-600 focus:border-emerald-600 focus:outline-none focus:border block w-full p-2.5 "
                              placeholder='Enter Sample Value'
                            />
                          </div>
                          : <></>
                        }
                      </div>
                      : selectedHeader == "Media"
                        ? <MediaOptions onChange={onChangeMediaValue} value={mediaValue} />
                        : <></>
                  }
                </div>
                {
                  (() => {
                    if (mediaValue === 'Image' && selectedHeader == 'Media') {
                      return <ImageMedia onImageChange={onFileChange} />;
                    } else if (mediaValue === 'Video' && selectedHeader == 'Media') {
                      return <VideoMedia onVideoChange={onFileChange} />;
                    } else if (mediaValue === 'Document' && selectedHeader == 'Media') {
                      return <DocumentMedia onDocumentChange={onFileChange} />;
                    } else if (mediaValue === 'Location' && selectedHeader == 'Media') {
                      return <LocationMedia />;
                    } else if (selectedHeader == 'Media') {
                      return (<></>)
                    }
                  })()
                }
              </div>
              <p className='text-xs text-red-600'>{fileError}</p>
            </div>

            {/* Body Part */}
            <div className='w-full rounded-md bg-white my-1  p-4 border border-gray-200 shadow-sm'>
              <label htmlFor='template_body' className='w-full relative text-xs'>
                <h3 className="mb-2 text-base font-semibold text-slate-900  flex items-center">Body</h3>
                <p>Use text formatting - <b>*bold*</b> , <i>_italic_</i> & <span className='linethrough'>~strikethrough~</span> and for variables use {'{{1}} {{2}}'}</p>
                <p className='mb-3 text-green-600 font-medium'><strong>Eg:</strong> Hello {'{{1}}'}, get this offer it is valid till {'{{2}}'}</p>
                <textarea
                  ref={bodyTextValueRef}
                  onChange={handleBodyInputChange}
                  value={bodyCurrentText}
                  onFocus={() => setShowEmojiPicker(false)}
                  autoComplete="off"
                  id="body_text"
                  name="body_text"
                  rows={4}
                  minLength={3}
                  maxLength={1024}
                  className="bg-white border resize-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 focus:outline-none appearance-none block w-full p-2.5 mt-2"
                  placeholder="Your message goes here">
                </textarea>
                <div className='absolute z-10 top-20 left-0'>
                  {
                    showEmojiPicker ? <EmojiPicker onEmojiClick={(emojiData, e) => addEmojiDataEditor(emojiData.emoji)} width={360} height={400} /> : <></>
                  }
                </div>
                <p className="text-sm text-end mb-2 text-gray-600">{bodyCurrentText ? bodyCurrentText.length : 0}/1024</p>
                <p ref={bodyRefErr} className='text-xs text-red-600 mb-1'></p>
                <div className='flex items-center pb-2 gap-x-2 justify-start'>
                  <button type='button' role='button' disabled={false} onClick={() => setShowEmojiPicker(!showEmojiPicker)} className='bg-gray-200 px-1 py-1 text-xs text-gray-900 w-fit rounded-md'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" /></svg></button>
                  <button type='button' role='button' disabled={false} onClick={addBodyVariable} className='bg-gray-200 px-2 py-1.5 text-xs text-gray-900 w-fit rounded-md'>Add Variable</button>
                </div>
              </label>
              {
                <div className='flex flex-col gap-y-2 mt-4'>
                  {bodyVariables.map((variableItem, index) => {
                    const variableName = `{{${index + 1}}}`;
                    return (
                      <div key={'variable-' + index} className='flex gap-2 items-center justify-center'>
                        <span className="bg-gray-300 px-3 text-sm py-2.5 rounded-lg">{`{{${index + 1}}}`}</span>
                        <input
                          value={variableItem.value}
                          onChange={(e) => handleBodyVariableInputChange(variableItem.key, index, e)}
                          autoComplete="off"
                          type="text"
                          minLength="3"
                          maxLength="60"
                          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 focus:outline-none block w-full p-2.5"
                          placeholder={`Enter Value for Variable ${index + 1}`}
                        />
                      </div>
                    );
                  })}
                </div>
              }
            </div>

            {/* Footer Part */}
            <TemplateFooterInput value={footerPart} onChange={(e) => setFooterPart(e.target.value)} />

            {/* Buttons Part Starts */}
            <TemplateActionButton
              quickReplies={quickReplies}
              onClickWebsiteCTA={() => addCTA('URL')}
              onClickPhoneCTA={() => addCTA('PHONE')}
              onClickQuickReplies={() => addQuickReply()}
              onClick={() => setShowDropDown(!showDropDown)}
              onRemoveQR={removeQuickReplies}
              showDropDown={showDropDown}
              checkInputReply={checkInputReplyFunc}
              checkInputCTA={checkInputCTAFunc}
              onRemoveCTA={removeCTA}
              isCtaPhone={isCtaPhone}
              isCtaUrl={isCtaUrl}
              callToActions={callToActions}
            />
            {/* Buttons Part Ends */}
            <div ref={errFormRef} className="text-sm  flex items-center px-2  text-red-600"></div>
            {
              isCreateLoading
                ? <button type="submit" className="flex w-fit items-center justify-centertext-base justify-end  text-center mt-4 mb-8 bg-emerald-600 text-white py-2 px-4 rounded-lg "><span className='w-3.5 h-3.5 mr-3 animate-spin rounded-full border-2 border-white border-l-2 border-l-transparent'></span><span>Adding...</span></button>
                : isUploadLoading ? 
                <button type="submit" className="flex w-fit items-center justify-centertext-base justify-end  text-center mt-4 mb-8 bg-emerald-600 text-white py-2 px-4 rounded-lg "><span className='w-3.5 h-3.5 mr-3 animate-spin rounded-full border-2 border-white border-l-2 border-l-transparent'></span><span>Uploading Media...</span></button>
                :<button type="submit" className='text-base justify-end  text-center mt-4 mb-8 bg-emerald-600 text-white  block py-2 px-4 rounded-lg'>Save and Submit</button>
            }
          </div>

        </form>
      </div>


      {/* Preview Part */}
      <PreviewPartComponent headerType={selectedHeader} bodyVariableValues={bodyVariables} ctaItems={callToActions} replyItems={quickReplies} headerPart={headerCurrentText} bodyPart={bodyCurrentText} mediaType={mediaValue} footerPart={footerPart} />
    </section>
      </>

  )
}

export default TemplateCreate