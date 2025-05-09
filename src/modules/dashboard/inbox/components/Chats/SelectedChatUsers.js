// import { IconButton, Dropdown } from "lucide-react";
import Offcanvas from '@/components/general/Offcanvas';
import Country from '@/components/general/countryWithCode';
import TimerClock from '@/modules/dashboard/template/components/timer';
import PropTypes from 'prop-types'
import Image from "next/image";
import { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import Link from "next/link";
// import SendMessage from "./SendMessage";
// import ReceivedMessage from "./ReceivedMessage";
// import DayStartChat from "./DayStartChat";
import MessageChat from "./MessageChat";

export default function SelectedChatUsers({ contactItem }) {
  const sampleSend = [{
    "type": "TYPE", //text, image

    /* TEXT MESSAGES ONLY */
    "text": { // the text object
      "preview_url": false,
      "body": "MESSAGE_CONTENT"
    },
    "text": { // the text object
      // the text object
      "preview_url": true,
      "body": "Message content including a URL begins with https:// or http://"
    },

    /* REACTION MESSAGES ONLY */
    "reaction": {
      "message_id": "wamid.HBgLM...",
      "emoji": "\uD83D\uDE00"
    },

    /* MEDIA MESSAGES ONLY. FOR EXAMPLE, FOR IMAGE MEDIA: */
    "image": {
      "link": "https://IMAGE_URL"
    },

    // using media id 
    "image": {
      "id": "MEDIA-OBJECT-ID"
    },
    /* LOCATION MESSAGES ONLY */
    "location": {
      "longitude": 11,//LONG_NUMBER,
      "latitude": 33,//LAT_NUMBER,
      "name": 44,//LOCATION_NAME,
      "address": 55//LOCATION_ADDRESS
    },

    /* CONTACTS MESSAGES ONLY */
    "contacts": [{
      "addresses": [{
          "street": "STREET",
          "city": "CITY",
          "state": "STATE",
          "zip": "ZIP",
          "country": "COUNTRY",
          "country_code": "COUNTRY_CODE",
          "type": "HOME"
        },
        {
          "street": "STREET",
          "city": "CITY",
          "state": "STATE",
          "zip": "ZIP",
          "country": "COUNTRY",
          "country_code": "COUNTRY_CODE",
          "type": "WORK"
        }],
      "birthday": "YEAR_MONTH_DAY",
      "emails": [{
          "email": "EMAIL",
          "type": "WORK"
        },
        {
          "email": "EMAIL",
          "type": "HOME"
        }],
      "name": {
        "formatted_name": "NAME",
        "first_name": "FIRST_NAME",
        "last_name": "LAST_NAME",
        "middle_name": "MIDDLE_NAME",
        "suffix": "SUFFIX",
        "prefix": "PREFIX"
      },
      "org": {
        "company": "COMPANY",
        "department": "DEPARTMENT",
        "title": "TITLE"
      },
      "phones": [{
          "phone": "PHONE_NUMBER",
          "type": "HOME"
        },
        {
          "phone": "PHONE_NUMBER",
          "type": "WORK",
          "wa_id": "PHONE_OR_WA_ID"
        }],
      "urls": [{
          "url": "URL",
          "type": "WORK"
        },
        {
          "url": "URL",
          "type": "HOME"
        }]
    }],

      // /* INTERACTIVE MESSAGES ONLY */ Templates 
      "interactive": {
        "type": "list",
        "header": {
          "type": "text",
          "text": "HEADER_TEXT"
        },
        "body": {
          "text": "BODY_TEXT"
        },
        "footer": {
          "text": "FOOTER_TEXT"
        },
        "action": {
          "button": "BUTTON_TEXT",
          "sections": [
            {
              "title": "SECTION_1_TITLE",
              "rows": [
                {
                  "id": "SECTION_1_ROW_1_ID",
                  "title": "SECTION_1_ROW_1_TITLE",
                  "description": "SECTION_1_ROW_1_DESCRIPTION"
                },
                {
                  "id": "SECTION_1_ROW_2_ID",
                  "title": "SECTION_1_ROW_2_TITLE",
                  "description": "SECTION_1_ROW_2_DESCRIPTION"
                }
              ]
            },
            {
              "title": "SECTION_2_TITLE",
              "rows": [
                {
                  "id": "SECTION_2_ROW_1_ID",
                  "title": "SECTION_2_ROW_1_TITLE",
                  "description": "SECTION_2_ROW_1_DESCRIPTION"
                },
                {
                  "id": "SECTION_2_ROW_2_ID",
                  "title": "SECTION_2_ROW_2_TITLE",
                  "description": "SECTION_2_ROW_2_DESCRIPTION"
                }
              ]
            }
          ]
        }
      }
}]
const [isOpenAttached, setIsOpenAttached] = useState(false);
const [status, setStatus] = useState("read"); //message (send,delivered,read) status on change on api response
const [messageType, setMessageType] = useState("image"); //Text, reaction, media(audio, document, image, sticker, or video), location, contacts, interactive,  response
const [previewUrl, setPreviewUrl] = useState(false) //true or false
const [gateWayType, setGateWayType] = useState("sender"); //sender or received response
const [mediaDownload, setMediaDownload] = useState(false) // send media download or not
const toggleAttachedDropdown = () => {
  setIsOpenAttached(!isOpenAttached);
};
const [isOpen, setIsOpen] = useState(false);

const whatsappRef = useRef();
const countryRef = useRef();
const [countryCodeRef, setCountryCodeRef] = useState(91);

// const [isOpenDetailsViewContact, setIsOpenDetailsViewContact] = useState(false);
// const handleToggle = () => {
//   setIsOpenDetailsViewContact(!isOpenDetailsViewContact);
// }
const handleSpecificFieldChange = () => {
  const selectedCountry = countryRef.current.value;
  const selectedCountryObj = Country.find((country) => country.country === selectedCountry);
  if (selectedCountryObj) {
    // Selected country found in the countries array
    setCountryCodeRef(selectedCountryObj.code);
    // console.log('Country Code:', countryCode);
  } else {
    // Selected country not found in the countries array
    console.log('Country not found');
  }
};

const toggleDropdown = () => {
  setIsOpen(!isOpen);
};

const moreIcon = <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#9E9E9E" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
</svg>;
const renderIconButton = (props, ref) => {
  return (
    <IconButton size="sm" {...props} ref={ref} icon={moreIcon} circle color="gray" appearance="gray" />
  );
};

const [selectMsgTypeDrop, setSelectMsgTypeDrop] = useState(false);
const [showEmojiPicker, setShowEmojiPicker] = useState(false);
const [openCanvasAddcontact, setOpenCanvasAddcontact] = useState(false);
const [message, setMessage] = useState('');
const msgRef = useRef();

const addEmoji = (emoji, e) => {
  let startString = msgRef.current.selectionStart;
  let endString = msgRef.current.selectionEnd;
  let newVal = message.substring(0, startString) + emoji.emoji + message.substring(endString, message.length);
  setMessage(newVal);
}

const handleKeyDown = (event) => {
  if (event.shiftKey) {
    if (event.key === 'Enter') {
      let startString = msgRef.current.selectionStart;
      let endString = msgRef.current.selectionEnd;
      let newVal = message.substring(0, startString) + '\n' + message.substring(endString, message.length);
      msgRef.current.value = newVal;
    }
  } else {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log('Submit Form');
    }
  }
  // if (event.key === 'Enter' && !event.shiftKey) {
  //     event.preventDefault(); // Prevent the default behavior (form submission)
  //     // Submit the form or perform other actions
  //     console.log('Submit form');
  //   } else if (event.key === 'Enter' && event.shiftKey) {
  //     let startString = msgRef.current.selectionStart;
  //     let endString = msgRef.current.selectionEnd;
  //     let newVal = message.substring(0, startString) + '\n' + message.substring(endString, message.length);
  //     setMessage(newVal); // Add a newline to the textarea value
  //   }
}

const changeMsgValue = (val, toChange) => {
  if (toChange) {
    setMessage(val);
  }
}

return contactItem ?
  <div className="flex flex-col justify-between items-center">
    <div className="w-full font-inter h-[60px] py-2 bg-white border-b border-gray-200 px-5">
      <div className="flex justify-between items-center bg-white">
        <div className="flex items-center w-full ">
          <div className="w-10 h-10 rounded-full flex mr-3 items-center justify-center text-emerald-600 bg-emerald-600/10">{contactItem.wa_profile_name.substring(0, 1)}</div>
          <div className="flex flex-col justify-start items-start">
            <h2 className="text-neutral-800 text-sm mb-0 title-font font-semibold">{contactItem.wa_profile_name}</h2>
            <span className="text-gray-500 text-[11px]">Select operator</span>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <TimerClock />
          <button onClick={() => setOpenCanvasAddcontact(true)} className="bg-gray-200 rounded-full p-2 hover:bg-emerald-600/10 duration-200 hover:text-emerald-600 text-gray-600 border border-gray-200 hover:border hover:border-emerald-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px]"><path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" /></svg></button>
          {/* <div className="relative">
              <button onClick={handleToggle} type="button" className="bg-gray-200  rounded-full p-2 hover:bg-emerald-600/10 duration-200 hover:text-emerald-600 text-gray-700 border border-gray-200 hover:border hover:border-emerald-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-[17px] h-[17px]"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" /></svg></button>
              {isOpenDetailsViewContact && (
                <div className={`absolute  right-0 mt-2 text-gray-800 bg-white px-4 text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg w-48  ${isOpenDetailsViewContact ? 'h-72 ' : 'h-0 '} transition-[height] duration-2000 ease-in-out`}>
                  <ul className="flex flex-col gap-y-4">
                    <li >
                      <Link href="/" className="text-gray-800 font-medium text-sm">View contact</Link>
                    </li>
                    <li >
                      <Link href="/" className="text-gray-800 font-medium text-sm">Media, links and docs</Link>
                    </li>
                    <li >
                      <Link href="/" className="text-gray-800 font-medium text-sm">Search</Link>
                    </li>
                    <li >
                      <Link href="/" className="text-gray-800 font-medium text-sm">Mute notification</Link>
                    </li>
                    <li >
                      <Link href="/" className="text-gray-800 font-medium text-sm">Disappearing message</Link>
                    </li>
                    <li >
                      <Link href="/" className="text-gray-800 font-medium text-sm">Wallpaper</Link>
                    </li>
                    <li >
                      <Link href="/" className="text-gray-800 font-medium text-sm">More</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div> */}
        </div>
      </div>
    </div>
    <div className="bg-[url('/images/wallpaper.jpg')] box-border bg-cover w-full h-full flex flex-col gap-2 text-sm tracking-wide px-2 sm:px-[68px] py-2">
      <MessageChat status={status} gateWayType={gateWayType}  messageType={messageType} previewUrl={previewUrl} mediaDownload={mediaDownload}/>
      {/* gateWayType  */}

      {/* <DayStartChat/>
          <SendMessage status={status} />
          <ReceivedMessage /> */}
    </div>
    <div className="w-full relative bottom-0 bg-white flex justify-center items-center gap-x-2.5 mt-auto px-4 py-2.5">
      {
        showEmojiPicker
          ? <><div className="fixed inset-0 w-full h-screen" onClick={() => setShowEmojiPicker(!showEmojiPicker)}></div><div className="absolute bottom-16 left-0"><EmojiPicker onEmojiClick={addEmoji} width={400} height={360} /></div></>
          : <></>
      }
      <button className="text-gray-600" onClick={() => setShowEmojiPicker(!showEmojiPicker)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" /></svg></button>
      <div className="relative inline-block text-left">
        {isOpenAttached && (
          <div className="absolute bottom-12 left-0 mt-2 w-80 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out p-4">
            <div className=" grid grid-cols-3 gap-2  text-sm font-medium">
              <button type="button" className="flex flex-col gap-2 items-center justify-center w-full p-2 rounded-md text-gray-700 hover:bg-gray-100">
                {/* <DocumentIcon className="h-5 w-5 mr-2" /> */}
                <div className="flex justify-center items-center w-12 h-12 rounded-full  bg-gradient-to-b from-purple-700 to-purple-500 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
                    <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                  </svg>

                </div>
                Document
              </button>
              <button type="button" className="flex flex-col gap-2 items-center justify-center w-full p-2 rounded-md text-gray-700 hover:bg-gray-100">
                {/* <DocumentIcon className="h-5 w-5 mr-2" /> */}
                <div className="flex justify-center items-center w-12 h-12 rounded-full  bg-gradient-to-b from-red-700 to-red-500 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
                  </svg>
                </div>
                Video

              </button>
              <button type="button" className="flex flex-col gap-2 items-center justify-center w-full p-2 rounded-md text-gray-700 hover:bg-gray-100">
                {/* <DocumentIcon className="h-5 w-5 mr-2" /> */}
                <div className="flex justify-center items-center w-12 h-12 rounded-full  bg-gradient-to-b from-pink-700 to-pink-500 text-white ">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                  </svg>
                </div>
                Image
              </button>
              <button type="button" className="flex flex-col gap-2 items-center justify-center w-full p-2 rounded-md text-gray-700 hover:bg-gray-100">
                {/* <DocumentIcon className="h-5 w-5 mr-2" /> */}
                <div className="flex justify-center items-center w-12 h-12 rounded-full  bg-gradient-to-b from-orange-700 to-orange-500 text-white ">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM9 8.25a.75.75 0 00-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75H9zm5.25 0a.75.75 0 00-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75h-.75z" clipRule="evenodd" />
                  </svg>

                </div>
                Audio
              </button>
              <button type="button" className="flex flex-col gap-2 items-center justify-center w-full p-2 rounded-md text-gray-700 hover:bg-gray-100">
                {/* <DocumentIcon className="h-5 w-5 mr-2" /> */}
                <div className="flex justify-center items-center w-12 h-12 rounded-full  bg-gradient-to-b from-green-700 to-green-500 text-white ">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                Location
              </button>
              <button type="button" className="flex flex-col gap-2 items-center justify-center w-full p-2 rounded-md text-gray-700 hover:bg-gray-100">
                {/* <DocumentIcon className="h-5 w-5 mr-2" /> */}
                <div className="flex justify-center items-center w-12 h-12 rounded-full  bg-gradient-to-b from-cyan-700 to-cyan-500 text-white ">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>

                </div>
                Contact
              </button>

            </div>
          </div>
        )}
        <button type="button" onClick={toggleAttachedDropdown}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" /></svg></button>

      </div>
      <textarea ref={msgRef} placeholder="Type a message" value={message} onChange={(e) => changeMsgValue(e.target.value, true)} onKeyDown={(e) => handleKeyDown(e)} rows={1} className="w-full resize-none text-sm bg-gray-200/80 p-3 outline-none placeholder:text-sm rounded-full" ></textarea>

      <button type="button" > <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-emerald-600"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg></button>
      <></>

    </div>

    {/* Add contact Offcanvas start*/}
    <Offcanvas
      title='Add Contact'
      slideClassName='md:translate-x-[350px]'
      widthClassName='md:w-[350px]'
      show={openCanvasAddcontact}
      onClose={() => setOpenCanvasAddcontact(false)}
      content={
        <>
          <div className='flex flex-col gap-y-3'>
            <form>
              <div className="relative z-0 w-full mb-3 group"><label htmlFor="firstname" className="text-sm text-gray-800">First Name</label><input id="firstname" type="text" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 mt-1" /></div>
              <div className="relative z-0 w-full mb-3 group"><label htmlFor="lastname" className="text-sm text-gray-800">Last Name</label><input id="lastname" type="text" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 mt-1" /></div>
              <div className="relative z-0 w-full mb-3 group">
                <label htmlFor="country" className="text-sm text-gray-800">Select Country</label>
                <select ref={countryRef} defaultValue="" onChange={handleSpecificFieldChange} type="country" placeholder="Your Country Code" className="border-gray-300 w-full placeholder:text-xs rounded-md border py-2.5 px-3 text-sm placeholder-gray-300 text-gray-600 outline-none focus:border-emerald-600">
                  <option value="" disabled={true}> Select Country</option>
                  {
                    Country.map((countryItem, index) => {
                      return <option key={index} value={countryItem.country}>{countryItem.country}</option>
                    })
                  }
                </select>
              </div>
              {/* <div className="relative z-0 w-full mb-3 group"><label htmlFor="phone" className="text-sm text-gray-800">Phone Number</label><input id="phone" type="tel" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 mt-1" /></div> */}
              <div className="relative z-0 w-full mb-3 group">
                <p className="text-sm text-gray-800">Mobile Number</p>
                <label className='relative flex w-full'>
                  <span className='left-2 border border-gray-300 w-20 flex justify-center items-center rounded-l-md bg-white pr-2 inset-y-0 text-sm text-gray-600'>+{countryCodeRef}</span>
                  <input ref={whatsappRef} type="tel" placeholder={`1234567890`} className="border-gray-300 w-full placeholder:text-sm rounded-r-md border bg-white py-2.5 px-2 text-sm placeholder-gray-500 outline-none" />
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group"><label htmlFor="email" className="text-sm text-gray-800">Email</label><input id="email" type="email" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 mt-1" /></div>

              <div className="relative z-0 w-full mb-3 group flex gap-x-4 ">
                <button type="button" className="text-gray-800 focus:outline-none font-medium text-sm w-full sm:w-auto px-5 py-1 text-center border border-gray-400 rounded-full">Cancel</button>

                <button type="submit" className="text-white bg-emerald-600 border border-emerald-600 focus:outline-none hover:bg-emerald-700 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center">Save Contacts</button>

              </div>
            </form>
          </div>
        </>
      } />
    {/* Add contact Offcanvas end*/}

  </div> : <></>


}



SelectedChatUsers.propTypes = {
  contactItem: PropTypes.object
};