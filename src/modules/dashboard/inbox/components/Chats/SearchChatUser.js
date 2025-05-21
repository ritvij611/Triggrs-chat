import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRightIcon, SearchIcon } from 'lucide-react';
import PropTypes from 'prop-types';
import { useId, useState } from 'react';

export default function SearchChatUser({searchTerm, setSearchTerm}) {
  const id = useId()
  return (
    <div className="*:not-first:mt-2 px-4 py-2.5">
      <div className="relative">
        <Input id={id} className="peer ps-9 h-10 pe-9" placeholder="Search Contacts" type="search" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}} />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50"><SearchIcon size={16} /></div>
        <button className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50" aria-label="Submit search" type="submit"><ArrowRightIcon size={16} aria-hidden="true" /></button>
      </div>
    </div>
  )
}

SearchChatUser.propTypes = {
    placeholder: PropTypes.string
};

SearchChatUser.defaultProps = {
    placeholder: 'Search Contacts'
}