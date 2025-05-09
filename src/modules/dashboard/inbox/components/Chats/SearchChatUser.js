import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function SearchChatUser({placeholder}) {
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const handleToggleFilter = () => {
      setIsOpenFilter(!isOpenFilter);
    }
  return (
    <div className='w-full flex items-center  bg-white z-20 sticky top-0 border-b border-b-gray-200'>
       <form className="flex items-center py-2.5 w-full px-2.5">   
    <label htmlFor="simple-search" className="sr-only">Search</label>
    <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-600"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
        </div>
        <input type="text" id="simple-search" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full pl-10 p-2" placeholder="Search Contacts..." />
    </div>
    <div className='relative'>
    <button onClick={handleToggleFilter} type="button" className="p-2 ml-2 text-sm font-medium text-white bg-gray-100 border border-gray-300 rounded-lg">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-600"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" /></svg>
        {/* <span className="sr-only">Search</span> */}
    </button>
    {isOpenFilter && (
        <div className={`absolute  right-0 mt-2 text-gray-800 bg-white px-4 text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg w-48  ${isOpenFilter? 'h-64 ':'h-0 '} transition-[height] duration-2000 ease-in-out`}>
         <ul className="flex flex-col gap-y-4">
            {/* {links.map((link, index) => ( */}
              <li >
              {/* All chats, Active chats, Open, Pending, Solved, Bloked chat */}
                <Link href="/" className="text-gray-800 font-medium text-sm">All chats</Link>
              </li>
              <li >
                <Link href="/" className="text-gray-800 font-medium text-sm">Active chats</Link>
              </li>
              <li >
                <Link href="/" className="text-gray-800 font-medium text-sm">Open</Link>
              </li>
              <li >
                <Link href="/" className="text-gray-800 font-medium text-sm">Pending</Link>
              </li>
              <li >
                <Link href="/" className="text-gray-800 font-medium text-sm">Solved</Link>
              </li>
              <li >
                <Link href="/" className="text-gray-800 font-medium text-sm">Blocked chat</Link>
              </li>
              
            {/* ))} */}
          </ul>
        </div>
      )}

    </div>
</form>
    </div>
  )
}

SearchChatUser.propTypes = {
    placeholder: PropTypes.string
};

SearchChatUser.defaultProps = {
    placeholder: 'Search Contacts'
}