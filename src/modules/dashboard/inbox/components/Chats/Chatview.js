import Image from 'next/image'
import ChatLayout from './ChatLayout';
import SearchChatUser from './SearchChatUser'
import ChatUserItem from './ChatUserItem'
import { useCallback, useEffect, useRef, useState } from 'react';
import {ConversationArea} from './ConversationArea';
import { MessageSquarePlus } from 'lucide-react';
import { useFetchConversations } from '../../hooks/useFetchConversations';
import { useSelector, useDispatch } from 'react-redux';
import { markRead } from '@/store/webSocketSlice';
import { useMarkConversationRead } from '../../hooks/useMarkConversationRead';
import { toast } from 'sonner';

const decodeMessage = (conversation) => {
  const name = conversation.contactName || '';
  const waID = conversation.waID || '';

  let time = '-';
  const timestamp = conversation?.lastMessageBody?.sentAt;
  if (timestamp) {
    const date = new Date(Number(timestamp)*1000);
    if (!isNaN(date.getTime())) {
      time = date.toISOString();
    }
  }

  const msg = conversation?.lastMessageBody?.messageObject?.text?.body || conversation?.lastMessageBody?.messageObject?.image?.caption || conversation?.lastMessageBody?.messageObject?.video?.caption || conversation?.lastMessageBody?.messageObject?.document?.caption || '';
  const message = msg.substring(0, 40) + (msg.length > 40 ? '...':'');
  const messageCount = conversation.unreadMessages || 0;
  const messageType = conversation?.lastMessageBody?.messageType
  const status = conversation?.lastMessageBody?.status
  const type = conversation?.lastMessageBody?.messageObject?.type


  return { name, waID, time, message, messageCount, messageType, status, type };
};



const Chatview = ({phoneID, companyID}) => {
  const { allConversations, totalConversations, loadingConversations, conversationError, fetchConversations, cancelConversationsOperation } = useFetchConversations();
  const { markReadResponse, loadingMark, markingError, markConversationRead, cancelMarkingOperation } = useMarkConversationRead()
  const totalConversationsRef = useRef(0);
  const messages = useSelector(state => state.websocket.messages);
  const read = useSelector(state => state.websocket.read);
  const dispatch = useDispatch();

  const [conversations, setConversations] = useState([]);
  const [conversationItem, setConversationItem] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [loadConversations, setLoadConversations] = useState(true);
  const [newConversationMessage, setNewConversationMessage] = useState({});
  const [statusUpdate, setStatusUpdate] = useState({id:'', status:'', timestamp:''});
  const [send, setSend] = useState(false);

  const [messageMap, setMessageMap] = useState(new Map());

  const selectUser = (i) => {
    setConversationItem(conversations.filter(item => item._id == i)[0]);
  }

  const showRightDropDown = (e, i) => {
    e.preventDefault();
    alert('It works-'+i);
  }

  const handleConversationClick = async(waID) => {
    if(!conversationItem || conversationItem.waID !== waID){
      const selected = conversations.find(item => item.waID == waID);
      setConversations(prev => 
        prev.map((item => {
          if(item.waID == waID){
            return {
              ...item,
              unreadMessages: 0,
            }
          }
          return item
        }))
      );
      
      setConversationItem(selected);
      if(selected.unreadMessages){
        await markConversationRead({
          phoneID,
          waID
        })
      }
    }
  }

  useEffect(() =>{
    if(markReadResponse.status === 200){
      toast.success(markReadResponse.message);
    } else if(markingError){
      toast.error(markingError)
    }
  },[markReadResponse, markingError])

  useEffect(()=>{
    if (!loadConversations) return;
    const fetch = async() => {
      if(phoneID){
        await fetchConversations({
          phoneID,
          limit: 10,
          index: conversations.length / 10,
        });
      }  
    };

    fetch();
  },[loadConversations]);

  useEffect(() => {
  if (messages.length === 0 || read) return;

  const lastMessage = messages[messages.length - 1];

  if (lastMessage.type === "Inbox Message") {
    const { message, sender } = lastMessage;
    const waID = sender.wa_id;

    const newMessage = {
      messageObject: message,
      messageType: "RECEIVED",
      sentAt: message.timestamp

    };

    if (conversationItem?.waID === waID) {
      setNewConversationMessage(newMessage);
    }

    setMessageMap((prev) => {
      const update = new Map(prev);
      const exist = update.get(waID);

      const newMessages = exist ? [newMessage, ...exist.messages] : [newMessage];
      const totalCount = exist ? (exist.totalCount || 0) + 1 : 1;

      update.set(waID, {
        messages: newMessages,
        totalCount,
      });

      return update;
    });

    setConversations((prev) => {
      const existing = prev.find(item => item.waID === waID);
      const isCurrent = conversationItem?.waID === waID;

      const updatedItem = {
        ...existing,
        waID,
        contactName: sender.profile.name,
        contactNumber: waID,
        lastMessageBody: newMessage,
        unreadMessages: isCurrent ? 0 : ((existing?.unreadMessages || 0) + 1),
        serviceWindowExpiry: (Number(message.timestamp) + 86400).toString(),
      };

      const filtered = prev.filter(item => item.waID !== waID);
      return [updatedItem, ...filtered];
    });

    dispatch(markRead());

  } else if (lastMessage.type === "Message Status Change") {
    const message = lastMessage.message;
    const waID = message.recipient_id;

    // Update status for active conversation
    if (waID === conversationItem?.waID) {
      setStatusUpdate({
        id: message.id,
        status: message.status,
        timestamp: message.timestamp
      });
    }

    // Update status in messageMap
    setMessageMap((prev) => {
      const update = new Map(prev);
      const messages = update.get(waID)?.messages || [];

      const updatedMessages = messages.map(item => {
        if (item.messageObject?.id !== message.id) return item;
        return {
          ...item,
          status: message.status.toUpperCase(),
          sentAt: message.status == "sent" ? message.timestamp : item.sentAt 
        };
      });

      update.set(waID, {
        messages: updatedMessages,
        totalCount: update.get(waID)?.totalCount || 0,
      });

      return update;
    });

    setConversations(prev => {
      return prev.map(item => {
        if (item.lastMessageBody?.messageObject?.id === message.id) {
          return {
            ...item,
            lastMessageBody: {
              ...item.lastMessageBody,
              status: message.status.toUpperCase(),
              sentAt: message.status === "sent" ? message.timestamp : item.lastMessageBody.sentAt
            }
          };
        }
        return item;
      });
    });

  }
}, [messages]);


  useEffect(() => {
    if(send){
      setConversations((prev) => [
        conversationItem, ...prev.filter(item => item.waID != conversationItem.waID)
      ])
      setSend(false)
    }
  },[send]);

  useEffect(() => {
    if (allConversations) {
      setConversations(prev => {
        const existingMap = new Map(prev.map(conv => [conv.waID, conv]));
        allConversations.forEach(conv => {
          existingMap.set(conv.waID, conv); 
        });
        return Array.from(existingMap.values());
      });

      if (!totalConversationsRef.current) {
        totalConversationsRef.current = totalConversations;
      }

      setLoadConversations(false);
    } else if (conversationError) {
      toast.error(conversationError);
      setLoadConversations(false);
    }
  }, [allConversations, conversationError, totalConversations]);





  return (
    <>
      <div className="w-full rounded-lg font-inter sticky top-0 shadow border border-gray-100 bg-white bottom-0 lg:h-[calc(100vh-65px)]" aria-label="Sidenav">
        <div className='w-full sticky top-0 bg-white'>
          <div className='w-full flex justify-between items-center px-6 pt-4 pb-1'>
          <h3 className='text-xl font-semibold'>Inbox</h3>
          <MessageSquarePlus size={20} className='opacity-70' />
        </div>
        <SearchChatUser searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder='Search Contacts' />
        <hr/>
        </div>
        <div className = "border-r border-gray-200">
          <div className="w-full overflow-y-auto"
          onScroll={(e) => {
            const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
            if (scrollHeight - scrollTop <= clientHeight + 10 && conversations.length < totalConversationsRef.current) {
              // User has scrolled to the bottom (or near)
              setLoadConversations(true);
            }
          }}>

            {/* Filtered Template List */}
            {conversations.filter(conversation =>
                        (conversation.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          conversation.contactNumber.toLowerCase().includes(searchTerm.toLowerCase()))
                      )
                      .map(conversation => (
                        <ChatUserItem 
                        {...decodeMessage(conversation)}
                        chatStatus={`${conversation?.serviceWindowExpiry >= ((new Date())/1000).toString() ? "Active":"Closed"}`}
                        onClick={() => handleConversationClick(conversation.waID)} />
                      ))}
            {/* Loading Spinner */}
            {loadConversations && (
              <div className="p-3 flex justify-center">
                <span className="w-6 h-6 mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-transparent inline-block"></span>
              </div>
            )}
                            
          </div>
        </div>
      </div>
      <div className='w-full'>
      {
        conversationItem 
        ? <ConversationArea 
        conversationItem = {conversationItem} 
        setConversationItem={setConversationItem}
        newConversationMessage={newConversationMessage} 
        statusUpdate={statusUpdate}
        phoneID={phoneID}
        companyID={companyID}
        messageMap={messageMap}
        setMessageMap={setMessageMap}
        send={send}
        setSend={setSend}
        />
        : <div className='hidden sm:flex flex-col justify-center items-center h-full w-full p-4'>
            <div className='max-w-[500px] w-full mx-auto'>
              <Image className='object-contain w-80 h-auto mx-auto' alt='default background image' width={500} height={300} src="/images/empty-chatbox.svg"/>
              <p className='text-sm sm:text-base text-neutral-800/40 font-semibold mt-8 w-full text-center lg:whitespace-nowrap'>Hello! I&apos;m here to assist you with any questions or concerns.</p>
            </div>
        </div>
      }
      </div>
    </>

  )

}



export default Chatview;
