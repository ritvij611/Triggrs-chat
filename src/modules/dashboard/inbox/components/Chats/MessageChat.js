import Image from 'next/image';
import React from 'react'

const MessageChat = ({ status, gateWayType, messageType, previewUrl, mediaDownload }) => {
    const customCSS = `
    .tailwind-clip {
      clip-path: polygon(15% 0, 100% 0, 100% 60%, 100% 100%, 14% 100%, 13% 8%, 0 0);
    }
  `;
    return (
        <>


            {/* Date of Chat start Date, Today ,yesterday */}
            <div className='bg-neutral-100 rounded-lg text-gray-600 w-fit mx-auto font-medium px-3 py-1 ' > <path />December 4,2023</div>
            {/* send message  */}
            {/* <style dangerouslySetInnerHTML={{ __html: customCSS }} /> */}
            <div className={`${gateWayType == "sender" ? 'bg-emerald-50 self-end sender_clip_path' : 'bg-white receiver_clip_path'} text-gray-800  max-w-[90%] lg:max-w-[75%]  rounded-lg relative'`}>
                <div className='flex gap-2 flex-wrap p-2 sm:p-3 relative'>
                    {/* main contain of message  */}
                    {messageType == 'text' ?
                        <div>
                            <span>Certainly! Here is an example of a double tick icon similar to WhatsApp using React and SVG:  of a filled headphone with the current color in a JSX component, you can insert an SVG element directly into your JSX and utilize the currentColor CSS property to fill the SVG icon with the current color defined by the parent elements </span>
                        </div>
                        : messageType == 'image' ? <div>
                            <div className="">
                                <Image className='w-full h-fit' width={300} height={400} src="/images/about.webp" alt='send image' />
                                {/* download button  */}
                                { <button type="button" className={`border-2 rounded-full ${!mediaDownload? 'visible absolute top-1/2 -translate-y-1/2 left-1/2 translate-x-1/2 text-white':'invisible'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                                    </svg>

                                </button>
                                }
                            </div>
                        </div> : messageType == 'video' ? <div>
                            <span>video </span>
                        </div> : <></>
                    }

                    {/* delivered
read
sent */}

                    <div className={`${status == "read" ? 'text-sky-500' : status == "delivered" ? 'text-gray-500' : 'text-gray-500'}  ${messageType == 'image' ? 'absolute bottom-3.5 right-0 grid grid-cols-2' : 'flex'} text-xs  gap-2 ml-auto w-fit mt-1 `}>

                        <span className={`${messageType == 'image' ? 'text-white' : 'text-gray-600'}`}>1:47PM</span>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"> <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg> */}
                        {gateWayType == "sender" ?

                            status == "read" || status == "delivered" ?

                                <svg className={`w-5 h-5`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 12.4852L12.243 16.7282L20.727 8.24316M3 12.4852L7.243 16.7282M15.728 8.24316L12.5 11.5002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    {/* single tick svg  */}
                                </svg>
                                : status == 'send' ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"> <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                </svg>
                                    : <></>

                            : <></>
                        }

                    </div>
                </div>
            </div>

            {/* received message  */}
            {/* <div className='bg-white text-gray-800 px-4 py-2 w-fit rounded-lg max-w-[90%] lg:max-w-[75%]'>
                <div className='flex gap-2 flex-wrap'>

                    <span className='w-fit'>To You could also </span>
                    <div className='text-sky-500 text-xs flex gap-2 w-fit ml-auto mt-1 '>
                        <span className='text-gray-600'>1:48PM</span>
                    </div>
                </div>

            </div> */}
        </>
    )
}

export default MessageChat