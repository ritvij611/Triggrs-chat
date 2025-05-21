import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { markRead } from '@/store/webSocketSlice';

export default function WhatsAppNotification() {
  const messages = useSelector(state => state.websocket.messages)
  const dispatch = useDispatch();
  const read = useSelector(state => state.websocket.read)
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const router = useRouter();
  
  useEffect(() => {
    if(messages.length > 0 && read == false){
        setUnreadMessages(messages);
        setIsVisible(true)
    }
  }, [messages]);
  
  const handleClose = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    dispatch(markRead());
  };
  
  const truncateMessage = (message) => {
    if (message.length <= 30) return message;
    return message.substring(0, 30) + '...';
  };
  
  return (
    <div 
      className={`fixed flex items-end bottom-8 transition-all duration-500 ease-in-out ${isVisible ? 'right-8' : '-right-80'}`}
    >  
          <button 
            onClick={handleClose}
            className="text-white h-3 hover:text-gray-200 focus:outline-none"
            aria-label="Close notification"
          >
            
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="black">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            
          </button>
      <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ width: isExpanded ? '320px' : '300px', transition: 'width 0.3s ease-in-out' }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onClick={() => router.push("/dashboard/inbox")}
      >
        {/* Notification header */}
        <div className="bg-green-600 text-white p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className='w-6 h-6 rounded-full bg-white text-green-600 flex items-center justify-center font-bold'>
              {unreadMessages.length}
            </div>
            <span className="font-semibold">New Messages</span>
          </div>
          
        </div>
        
        {/* Messages container (shown when expanded) */}
        {isExpanded && (
          <div className="max-h-64 overflow-y-auto">
            {unreadMessages.map((msg,index) => (
              <div key={index} className="p-3 border-b hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="font-medium text-gray-800">{msg.sender.profile.name}</div>
                  <div className="text-xs text-gray-500">{msg.sender.wa_id}</div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {truncateMessage(msg.message.text.body)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}