import Image from 'next/image';
import PropTypes from 'prop-types';

export default function PreviewPartComponent({headerType, mediaType, headerPart, bodyPart, footerPart, ctaItems, replyItems, bodyVariableValues, headerVariableValues, headerHandle }) {
  // const [bodyState, setBodyState] = useState();
  // console.log(`media type- ${mediaType}`)
  const formatTextAccordingly = (inputSentence) => {
    // Define the input text.
    // const inputSentence = "This is a *sample* sentence with *words* in asterisks.";
    const regex1 = /\*([^*]+)\*/g;
    const replacedSentence1 = inputSentence?.replace(regex1, `<span class = "font-bold">$1</span>`);
    const regex2 = /\~([^~]+)\~/g;
    const replacedSentence2 = replacedSentence1?.replace(regex2, `<span class = "line-through" >$1</span>`);
    const regex3 = /\_([^_]+)\_/g;
    const replacedSentence3 = replacedSentence2?.replace(regex3, `<span class = "italic" >$1</span>`);
    return replacedSentence3;
  };

  // useEffect(() => {
  //   if(bodyPart){
  //     formatTextAccordingly(bodyPart);
  //   }else{
  //     setBodyState(bodyPart);
  //   }
  // }, [bodyPart]);
  return (
    <div className='w-full min-w-90 px-4 sticky top-[70px] py-2 bg-gray-100 rounded-lg'>
          {/* <h3 className='font-semibold text-lg mb-2'>Preview</h3> */}
        {
         !headerPart && !bodyPart && !footerPart && !headerType && !ctaItems?.length && !replyItems?.length
         ? <div className='w-full bg-white p-4 h-auto mt-4 rounded-md flex flex-col justify-center items-center'>
          <Image src = "/images/preview.svg" alt='Preview Part' className='w-32 h-32 object-contain' width={100} height={100} />
          <h3 className='text-gray-900 text-lg font-semibold my-0.5'>Template Preview</h3>
          <p className='text-sm text-gray-700 text-center'>You&apos;ll find preview part here! Start Creating template to view</p>
         </div>
         : <>
        <div className='bg-white shadow-sm mb-1 border border-gray-300 text-sm p-2 rounded-lg'>
          {
              headerType == 'Text'
              ? <h2 className='font-semibold text-base mb-2'>{headerPart}</h2>
              : headerType == 'Media'
              ? <div className='w-full border border-gray-100 mb-3 bg-gray-200 rounded-xl h-32 p-2'>
                  {
                      mediaType == 'Image' 
                      ? <div className="flex justify-center items-center text-gray-400 h-full">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14"><path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" /></svg>
                        </div>
                      : mediaType == 'Video' 
                      ? <div className="flex justify-center items-center text-gray-400 h-full">{<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14"><path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" /></svg>}</div>
                      : mediaType == 'Document'
                      ? <div className="flex justify-center items-center text-gray-400 h-full">{<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14"><path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" /><path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" /></svg>}</div>
                      : mediaType == 'Location' 
                      ? <div className="flex justify-center items-center text-gray-400 h-full"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14"><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg></div>
                      : <></>
                  }
              </div>
              : <></>
          }
          <div dangerouslySetInnerHTML={{__html: formatTextAccordingly(bodyPart)}}/>
          {
          footerPart == ''  || footerPart == null
          ? <></>
          : <p className='text-xs text-gray-800 mt-2 font-normal'>{footerPart}</p>
          }
        </div>
        {
         (ctaItems?.length + replyItems?.length) <= 3 
         ? <div className={`${(ctaItems.length + replyItems.length) % 2 == 0 ? 'grid-cols-2' : 'grid-cols-1'} grid gap-1`}>
          {
            ctaItems?.map((ctaItem, i) => {
              return ctaItem.ctaType == 'PHONE'
              ? <button key={'cta-'+i} type='button' className='w-full bg-white p-2 text-sm text-blue-500 rounded-lg'>{ctaItem.label}</button>
              : <button key={'cta-'+i} type='button' className='w-full bg-white p-2 text-sm text-blue-500 rounded-lg'>{ctaItem.label}</button>
            })
          }
          {
            replyItems?.map((replyItem, i) => {
              return <button key={'reply-'+i} type='button' className='w-full bg-white p-2 text-sm text-blue-500 rounded-lg'>{replyItem}</button>
            })
          }
        </div> 
        : <div className='w-full text-center text-sm p-1.5'>
          <button className='w-full flex justify-center items-center text-sm text-blue-500 p-1.5 rounded-md bg-white border border-gray-300 gap-x-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
            <span>List Button</span>
          </button>
        </div>
        }
         </>
          }
        </div>
  )
}

PreviewPartComponent.propTypes = {
    headerPart: PropTypes.string,
    bodyPart: PropTypes.string,
    footerPart: PropTypes.string,
    headerType: PropTypes.string,
    mediaType: PropTypes.string,
    ctaItems: PropTypes.array,
    replyItems: PropTypes.array,
    bodyVariableValues: PropTypes.array,
    headerVariableValues: PropTypes.array,
    headerHandle: PropTypes.array
};

PreviewPartComponent.defaultProps = {
    headerPart: '',
    bodyPart: '',
    footerPart: '',
    headerType: 'TEXT', // It will be Text, Media
    mediaType: 'Image', // Work Only if headerType is set to Media  Values will be: Image, Video, Document, Location
    ctaItems: [{
      ctaType: 'PHONE',
      label: '',
      labelValue: '',
      countryCode: ''
    }],
    replyItems: [],
    bodyVariableValues: [{key: '', value: ''}],
    headerVariableValues: [{key: '', value: ''}],
    headerHandle: ['']
}