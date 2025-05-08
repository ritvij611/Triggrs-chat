import React, { useEffect } from 'react'
export default function GeneralModal({header=<></>, contentClassName='', content=<></>, isModalShow=false, modalClassName='w-[95%] sm:w-[70%] md:w-[50%] lg:max-w-sm', footerButton=<></>, onClose=()=>{}, topCancelButton=true}) {
    useEffect(() => {
      if(isModalShow){
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
      }else{
        document.getElementsByTagName('body')[0].style.overflowY = 'auto'
      }
    }, [isModalShow]); 
    return (
        <>
          <div onClick={onClose} className = {`w-screen h-screen bg-black/10 transition-all duration-200 backdrop-blur-md fixed z-50 inset-0 ${isModalShow ? '' : 'hidden'}`}></div>
          <div className={`${modalClassName} bg-white p-2.5 rounded-lg my-auto h-fit mx-auto lg:mx-auto transition-all duration-150 ease-in z-[99] fixed inset-x-0 top-0 bottom-0 shadow-md  ${isModalShow ? 'scale-100' : 'scale-0'}`}>
            <div className='w-full px-4 py-2 text-gray-900  modal-header flex justify-between items-center'>
              <div className='text-xl font-semibold'>{header}</div>
              { topCancelButton ? <button onClick={onClose} className="bg-gray-200 p-1 rounded-lg cursor-pointer relative z-20"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button> : <></>}
            </div>
            <div className={`${contentClassName} px-4  w-full modal-body bg-white`}>{content}</div>
            <div className=' px-4 py-2 mt-4'>
            {/* { showCtaButton?<button onClick={onCTAClick} className={`px-4 py-1.5 rounded ${ctaColor} ${ctaBackColor}`}>{cta}</button>: <></>}
              {cancelButton ? topCancelButton ? <></> : <button className='bg-gray-200 px-4 py-1.5 rounded' onClick={onClose}>Close</button> : <></>} */}
              {footerButton}
            </div>
          </div>
      </>
    )
  }