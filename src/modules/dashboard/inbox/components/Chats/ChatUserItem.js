import PropTypes from 'prop-types'

export default function ChatUserItem({time="20:59", name="Tw", message='dofijhpjpo', messageCount=2, onClick=()=>{}, onMenuClick=()=>{}, chatStatus="Active"}) {
  return (
        <div onContextMenu={onMenuClick} className="flex flex-nowrap items-center px-3 w-full font-inter border-gray-200 h-[72px] border-b group hover:bg-green-400/10">
            {/* <Image alt="team" className="w-10 h-10 object-cover object-center flex-shrink-0 rounded-full mr-3" src="/images/dummy-image.png" width={100} height={100} /> */}
            <div className="w-10 h-10 rounded-full flex mr-3 items-center justify-center text-emerald-600 bg-emerald-600/10">{name.substring(0,1)}</div>
            <div onClick={onClick} role="button" className="w-full flex flex-col justify-between whitespace-nowrap overflow-hidden text-ellipsis flex-1">
                <h3 className="w-full flex justify-start gap-x-2 items-center">
                    <span className="inline-block text-left  w-fit font-medium text-neutral-800 mb-1 text-sm font-inter transition duration-100 truncate">{name}</span>
                    <span className={`${chatStatus == 'CLOSED' ? 'bg-red-600/10 text-red-600' : 'bg-green-600/10 text-green-600'} py-0.5 px-1 rounded-sm text-[10px] font-medium`}>{chatStatus}</span>
                </h3>
                <span className="block text-xs  text-gray-600 truncate w-[95%]">{message}</span>
            </div>
            <div className='flex flex-col gap-y-1 items-center w-fit justify-end'>
                <span className="text-xs text-gray-500">{time}</span>
                <div className='flex flex-row gap-x-2 justify-end items-center transition-all group-hover:-translate-x-1'>
                    {
                    messageCount > 0 
                    ? <div className="rounded-full text-white text-center w-5 h-5 flex bg-emerald-500 text-[13px] justify-center ml-auto items-center">{messageCount}</div> 
                    : <></>
                    }
                    <div className='w-fit hidden transition-all duration-75 group-hover:flex items-center'><button onClick={onMenuClick}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg></button></div>
                </div>
            </div>            
            {/* <div className="w-full sm:w-auto flex justify-between items-center border-t sm:border-none">
            </div> */}
        </div>
  )
}

ChatUserItem.propTypes = {
    time: PropTypes.string,
    name: PropTypes.string,
    message: PropTypes.string,
    messageCount: PropTypes.number,
    onClick: PropTypes.func,
    onMenuClick: PropTypes.func,
    chatStatus: PropTypes.string
}

ChatUserItem.defaultProps = {
    time: "10:23pm",
    name: "Name",
    message: "lkjsdflj ldjl lorem fdslks",
    messageCount: 0,
    onClick: () => alert('When user clicks here the particular user gets active'),
    onMenuClick: () => alert('when user clcks on menu button'),
    chatStatus: "OPEN"
}