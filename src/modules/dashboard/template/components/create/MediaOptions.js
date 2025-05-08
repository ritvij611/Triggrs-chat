import PropTypes from 'prop-types'

export function MediaOptions({onChange, value}) {
  return (
    <div className='grid'>
                          <ul className="grid w-full grid-cols-5 gap-4">
                            {/* image select  */}
                            <li>
                              <input type="radio" id="Image" name="mediaValue" value="Image" className="hidden peer" onChange={onChange} checked={value === "Image"} />
                              <label htmlFor="Image" className="flex items-center justify-center gap-x-2 w-full py-1 px-1.5 text-gray-500 bg-white peer-checked:bg-emerald-600/10 border border-gray-400 rounded-full cursor-pointer peer-checked:border-emerald-600 peer-checked:text-emerald-600 hover:text-gray-600 hover:bg-emerald-600/10 ">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" /></svg>
                                <div className="w-fit text-sm text-center capitalize">Image</div>
                              </label>
                            </li>
                            {/* Video select  */}
                            <li>
                              <input type="radio" id="Video" name="mediaValue" value="Video" className="hidden peer" onChange={onChange} checked={value === "Video"} />
                              <label htmlFor="Video" className="flex items-center justify-center gap-x-2 w-full py-1 px-1.5 text-gray-500 bg-white peer-checked:bg-emerald-600/10 border border-gray-400 rounded-full cursor-pointer peer-checked:border-emerald-600 peer-checked:text-emerald-600 hover:text-gray-600 hover:bg-emerald-600/10 ">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" /></svg>
                                <div className="w-fit text-sm text-center capitalize">Video</div>
                              </label>
                            </li>
                            {/* Document select  */}
                            <li>
                              <input type="radio" id="Document" name="mediaValue" value="Document" className="hidden peer" onChange={onChange} checked={value === "Document"} />
                              <label htmlFor="Document" className="flex items-center justify-center gap-x-2 w-full py-1 px-1.5 text-gray-500 bg-white peer-checked:bg-emerald-600/10 border border-gray-400 rounded-full cursor-pointer peer-checked:border-emerald-600 peer-checked:text-emerald-600 hover:text-gray-600 hover:bg-emerald-600/10 ">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" /><path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" /></svg>
                                <div className="w-fit text-sm text-center capitalize">Document</div>
                              </label>
                            </li>
                            {/* Location select  */}
                            {/* <li>
                              <input type="radio" id="Location" name="mediaValue" value="Location" className="hidden peer" onChange={onChange} checked={value === "Location"} />
                              <label htmlFor="Location" className="flex items-center justify-center gap-x-2 w-full py-1 px-1.5 text-gray-500 bg-white peer-checked:bg-emerald-600/10 border border-gray-400 rounded-full cursor-pointer peer-checked:border-emerald-600 peer-checked:text-emerald-600 hover:text-gray-600 hover:bg-emerald-600/10 ">
                                <div className="block"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg></div>
                                <div className="w-full text-sm text-center capitalize">Location</div>
                              </label>
                            </li> */}
                          </ul>
                        </div>
  )
}

MediaOptions.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};

MediaOptions.defaultProps = {
  onChange: () => console.log('It will work'),
  value: ''
}


export function ImageMedia({onImageChange}){
    return (
        <div className='bg-white rounded-lg w-full p-2'>
          <div className=''>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="image_input">Upload Sample Image (Upto 4mb)</label>
              <input onChange={onImageChange} type="file" id="image_input" accept="image/*" className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none" />
              <p className="mt-1 text-xs text-gray-500" id="image_input_help">JPG or PNG (Max 4MB)</p>
            </div>
          </div>
        </div>
    );
}

ImageMedia.propTypes = {
  onImageChange: PropTypes.func,
  // value: PropTypes.string
};

ImageMedia.defaultProps = {
  onImageChange: () => console.log('It will work'),
  // value: ''
}

export function VideoMedia({onVideoChange}){
    return (
        <div className='bg-white rounded-md w-full p-2'>
                          <div>
                            <h3 className="mb-1 text-sm font-medium text-gray-900">Samples for header content</h3>
                            <p className='text-xs'>To assist us in reviewing your content, please provide examples of media in the header. Keep in mind that this is sample video content, and you can make changes before sending it to your contacts</p>
                          </div>
                          <div className='mt-4'>
                            <div>
                              <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="videoFile">Upload Video</label>
                              {/* <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg py-2.5 cursor-pointer bg-gray-50 " aria-describedby="image_input_help" id="image_input" type="file" accept="image/*"/> */}
                              <input type="file" id="videoFile" accept="video/mp4" onChange={onVideoChange} className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"/>
                              {/* <p className="mt-1 text-sm text-gray-500" id="image_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p> */}
                            </div>
                          </div>
                        </div>
    );
}

export function DocumentMedia({onDocumentChange}){
    return (
        <div className='bg-white rounded-lg w-full py-4 px-2'>
            <div>
            <h3 className="mb-1 text-sm font-medium text-gray-900">Sample for header content</h3>
            <p className='text-xs'>To help us review your content, provide examples of the variables or media in the header. Do not include any customer information. Cloud API hosted by Meta reviews templates and variable parameters to protect the security and integrity of our services.</p>
            </div>
            <div className='mt-4'>
            <div>
                {/* <label className="block mb-2 text-xs font-medium text-gray-900" htmlFor="documentInput">Upload Document</label> */}
                <input type="file" id="documentInput" accept='application/pdf' onChange={onDocumentChange} className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none" />
                <p className="mt-1 text-xs text-gray-500" id="image_input_help">PDF Only</p>
            </div>
            </div>
        </div>
    )
}

export function LocationMedia(){
    return (
        <p>Google map open automatic required some setup for that</p>
    )
}
