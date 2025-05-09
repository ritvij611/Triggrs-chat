import Country from '@/components/general/country';
import PropTypes from 'prop-types'

// export function TemplateLanguageInput({language, onChange}) {
//   return (
//     <label htmlFor='language' className='w-full flex flex-col gap-x-2 gap-y-1 my-1'>
//         <h3 className="text-[13px] font-medium text-gray-900">Language*</h3>
//         <div>
//         <select value={language} onChange={onChange} required id="language" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-emerald-600 focus:border-emerald-600 focus:outline-none  focus:border block w-full p-3">
//             <option value = "" disabled={true}></option>
//             <option value="en_US">English</option>
//         </select>
//         </div>
//     </label>
//   )
// }

// TemplateLanguageInput.propTypes = {
//   language: PropTypes.string,
//   onChange: PropTypes.func
// };

// TemplateLanguageInput.defaultProps = {
//   language: 'en_US',
//   onChange: () => console.log('It will work')
// }

export function TemplateActionButton({quickReplies, callToActions, onClickQuickReplies, checkInputReply, checkInputCTA, showDropDown, onClick, onClickWebsiteCTA, onRemoveQR, onRemoveCTA, onClickPhoneCTA, isCtaPhone, isCtaUrl}){

 return <div className='bg-white w-full rounded-md flex flex-col gap-2 p-4 my-1 border border-gray-200 shadow-sm'>
  <h3 className="text-base font-semibold text-slate-800 flex gap-1 items-center">Buttons <span className='text-xs rounded font-medium capitalize text-slate-500'>(Optional)</span></h3>
  <p className='text-sm text-gray-600 mb-2'>Create buttons that let customers respond to your message or take action.</p>
  <div className='w-full relative'>
    <button type='button' onClick={onClick} className='flex items-center gap-x-2 px-4 py-2 border border-gray-400 rounded-lg text-sm font-medium'>
      {
        showDropDown 
        ? <span>Close</span> 
        : <span>Add a button</span>
      }
      {
      showDropDown 
      ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
    }
    </button>
    {
     showDropDown 
     ? <div className={`absolute ${quickReplies.length >= 1 ? 'top-10' : 'bottom-10'} w-52 z-10 left-0 p-1 rounded-lg bg-white shadow-lg border border-gray-200`}>
      <h4 className='text-sm font-semibold px-3 py-2'>Call to action</h4>
      <div className='w-full flex justify-start mb-0.5 items-start flex-col gap-y-0.5 text-left'>
        <button type='button' disabled={isCtaUrl} className='text-sm hover:bg-gray-200 px-3 py-1.5 rounded-lg w-full text-left' onClick={onClickWebsiteCTA}>Website</button>
        <button type='button' disabled={isCtaPhone} className='text-sm hover:bg-gray-200 px-3 py-1.5 rounded-lg w-full text-left' onClick={onClickPhoneCTA}>Phone</button>
      </div>
      <div className='border border-gray-200'></div>
      <h4 className='text-sm font-semibold px-3 py-1.5'>Quick Reply</h4>
      <div className='w-full flex justify-start items-start flex-col text-left'>
        <button type='button' disabled={quickReplies.length > 9} className={`${quickReplies.length > 9 ? 'text-gray-500' : ''} text-sm hover:bg-gray-200 px-3 py-2 rounded-lg w-full text-left`} onClick={quickReplies.length > 9 ? () => alert('Cannot add more than 10') : onClickQuickReplies}>Custom</button>
      </div>
    </div>
    : <></>
    }
    <div className={`${showDropDown ? '' : 'hidden'} fixed inset-0 w-full h-screen`} onClick={onClick}></div>
  </div>
  {/* Grouping of CTA buttons */}
  <div className= 'w-full mt-4 relative' >
    {
      callToActions 
      ? callToActions.length > 0 
      ? <>
      <div className='absolute font-semibold bg-white px-2 text-xs py-0.5 -top-2 left-2 uppercase'>Call-to-actions</div>
      <div className='border-2 px-3 py-4 border-gray-400 border-dashed rounded-lg'>
        {
          callToActions.map((ctaItem, i) => {
            return ctaItem.ctaType == 'URL' 
            ? <div key={'cta-'+i}>
            <div className='w-full items-center gap-x-2 justify-center my-2 flex'>
            <div className='w-48 block'><input onChange={(e) => checkInputCTA(e.target.value, i, ctaItem.ctaType, 'LABEL')} value = {ctaItem.label} className='w-full bg-white block p-2.5 border border-gray-400 text-sm rounded-md' placeholder={`Enter Label`} /></div>
            {/* <div className='w-48 block'><input value = {ctaItem.label} className='w-full bg-white block p-2.5 border border-gray-400 text-sm rounded-md' placeholder={`Enter Label`} /></div> */}
            {/* onChange={(e) => checkInputCTA(e.target.value, i)} */}
            <div className='w-full'><input onChange={(e) => checkInputCTA(e.target.value, i, ctaItem.ctaType, 'VALUE')} value = {ctaItem.labelValue} className='w-full bg-white block p-2.5 border border-gray-400 text-sm rounded-md' placeholder={`Enter URL`} /></div>
            <button type='button' onClick={() => onRemoveCTA(i)} className='w-14 bg-gray-200 hover:bg-gray-300 p-2 rounded-lg text-center flex justify-center items-center text-gray-900 uppercase text-xs'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            </div>
            : <div key={'cta-'+i} className='w-full items-center gap-x-2 justify-center my-2 flex'>
            <div className='w-48 block'><input onChange={(e) => checkInputCTA(e.target.value, i, ctaItem.ctaType, 'LABEL')} value = {ctaItem.label} className='w-full bg-white block p-2.5 border border-gray-400 text-sm rounded-md' placeholder={`Enter Label`} /></div>
            <div className='w-48 block'><select defaultValue="" onChange={(e) => checkInputCTA(e.target.value, i, ctaItem.ctaType, 'COUNTRY_CODE')} type="country" className="border-gray-400 w-full placeholder:text-xs rounded-md border py-2.5 px-3 text-sm placeholder-gray-300 text-gray-600 outline-none focus:border-emerald-600">
                                    <option value = "" disabled={true}> Select Country</option>
                                    {
                                        Country.map((countryItem, index) => {
                                            return <option key={index} value={countryItem.code}>{countryItem.country} - {countryItem.code}</option>
                                        })
                                    }
                                </select></div>
            <div className='w-full'><input onChange={(e) => checkInputCTA(e.target.value, i, ctaItem.ctaType, 'VALUE')} value = {ctaItem.labelValue} className='w-full bg-white block p-2.5 border border-gray-400 text-sm rounded-md' placeholder={`Enter Phone Number`} /></div>
            <button type='button' onClick={() => onRemoveCTA(i)} className='w-14 bg-gray-200 hover:bg-gray-300 p-2 rounded-lg text-center flex justify-center items-center text-gray-900 uppercase text-xs'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
          })
        }
      </div>
      </>
      : <></> : <></>
    }
  </div>
  {/* Grouping of Quick Replies */}
  <div className= 'w-full mt-4 relative'>
    {
      quickReplies
      ? quickReplies.length > 0 
      ? <>
      <div className='absolute font-semibold bg-white px-2 text-xs py-0.5 -top-2 left-2 uppercase'>Quick Replies</div>
      <div className='border-2 w-full p-4 border-gray-400 border-dashed rounded-lg'>
        {
          quickReplies.map((qrItem, i) => {
            return <div key={'qr-'+i} className='w-full items-center justify-center my-2 flex'>
              <h4 className='w-16 block'>#{i+1}</h4>
              <div className='w-full'><input onChange={(e) => checkInputReply(e.target.value, i)} value={qrItem} className='w-full bg-white block p-2 border border-gray-400 text-sm rounded-md' placeholder={`Enter Reply ${i+1}`} /></div>
              <button type='button' onClick={() => onRemoveQR(i)} className='w-24 text-red-600 block uppercase text-xs'>REMOVE</button>
            </div>
          })
        }
      </div>
      </>
      : <></> : <></>
    }
  </div>
</div>
}

TemplateActionButton.propTypes = {
  quickReplies: PropTypes.array,
  callToActions: PropTypes.array,
  checkInputCTA: PropTypes.func,
  checkInputReply: PropTypes.func,
  onClickQuickReplies: PropTypes.func,
  showDropDown: PropTypes.bool,
  onClick: PropTypes.func,
  onClickWebsiteCTA: PropTypes.func,
  onRemoveQR: PropTypes.func,
  onClickPhoneCTA: PropTypes.func,
  isCtaPhone: PropTypes.bool,
  isCtaUrl: PropTypes.bool,
  onRemoveCTA: PropTypes.func
}

TemplateActionButton.defaultProps = {
  quickReplies: [],
  callToActions: [{
    ctaType: 'PHONE',
    label: '',
    labelValue: '',
    countryCode: ''
  }],
  checkInputCTA: () => alert('input cta works'),
  checkInputReply: () => alert('it works'),
  onClickQuickReplies: () => alert('It Works'),
  onRemoveCTA: () => console.log('it will work'),
  showDropDown: false,
  onClick: () => alert('It Works'),
  onClickWebsiteCTA: () => alert('Website CTA Works'),
  onRemoveQR: () => alert('Remove Quick Replies'),
  onClickPhoneCTA: () => alert('Phone CTA Works'),
  isCtaPhone: false,
  isCtaUrl: false
}