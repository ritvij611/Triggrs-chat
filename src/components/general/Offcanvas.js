import PropTypes from 'prop-types';
import { useEffect } from 'react';


export default function Offcanvas({title, slideClassName, widthClassName, show, onClose, content, ctaClick}) {
  useEffect(() => {
    if(show){
      document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    }else{
      document.getElementsByTagName('body')[0].style.overflowY = 'auto';
    }
  }, [show]);

  return (
    <>
        <div  className={`z-[55] w-[95%] h-screen ${widthClassName} fixed right-0 inset-y-0 shadow-lg transition-transform duration-300 transform bg-white ${show ? 'translate-x-0' : `${slideClassName} translate-x-[95%]`}`}>
            <div className='w-full flex justify-start gap-x-5 border-b border-b-gray-200 items-center p-4'>
                <button onClick={onClose} className='bg-gray-200 hover:bg-gray-300 rounded-full p-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" /></svg></button>
                <div className='font-semibold font-inter text-lg'>{title}</div>
            </div>
            <div className='w-full px-4 pt-4 mb-40 h-[calc(100%-80px)] overflow-y-auto'>
              {content}
            </div>
         {/* <div className='absolute bottom-0 right-0 left-0 bg-white border-t border-t-gray-200 p-4'>{ctaClick}</div> */}
        </div>
        {show ? <div onClick={onClose} className='fixed z-[51] inset-0 w-screen h-screen bg-black/40 backdrop-blur-sm'></div> : <></>}
    </>
  )
}

Offcanvas.propTypes = {
  widthClassName: PropTypes.string,
  slideClassName: PropTypes.string,
  title: PropTypes.any,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  content: PropTypes.node,
  ctaClick: PropTypes.node
}

Offcanvas.defaultProps = {
  widthClassName: 'sm:w-[400px] md:w-[700px]',
  slideClassName: 'md:translate-x-[700px] sm:translate-x-[400px]',
  title: 'Title Goes here',
  show: false,
  onClose: () => {console.log('Use this CTA Click')},
  content: <div>This will be content</div>,
  ctaClick: <>Put Actions here</>
}