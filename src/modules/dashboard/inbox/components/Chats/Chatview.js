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

  let time = '';
  const timestamp = conversation?.lastMessageBody?.timestamp;
  if (timestamp) {
    const date = new Date(Number(timestamp)*1000);
    if (!isNaN(date.getTime())) {
      time = date.toISOString();
    }
  }

  const message = conversation?.lastMessageBody?.text?.body || '';
  const messageCount = conversation.unreadMessages || 0;

  return { name, waID, time, message, messageCount };
};



const Chatview = ({phoneID}) => {
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
      )
      setConversationItem(selected);
      await markConversationRead({
        phoneID,
        waID
      })
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
    if (messages.length > 0 && read == false) {
      const lastMessage = messages[messages.length - 1];
      const message = lastMessage.message;
      const sender = lastMessage.sender;
      const waID = sender.wa_id;
      const newMessage = {
        messageObject: message, 
        messageType: "RECEIVED",
        read: false,
      }
      if(conversationItem?.waID == waID){
        setNewConversationMessage(newMessage)
      }

      setMessageMap((prev) => {
        const update = new Map(prev);
        const exist = update.get(waID);
        if(exist){
          update.set(waID, {
            messages: [newMessage, ...exist.messages],
            totalCount: exist.totalCount ? exist.totalCount + 1 : 0,
          })
        } else {
          update.set(waID, {
            messages: [newMessage],
            totalCount: 0,
          })
        }
        return update;
      })

      const existing = conversations.find(item => item.waID === waID);

      let updatedConversations;

      if (existing) {
        const updatedItem = {
          ...existing,
          lastMessageBody: message,
          unreadMessages: conversationItem?.waID === waID ? 0 : (existing.unreadMessages || 0) + 1,
        };

        updatedConversations = [
          updatedItem,
          ...conversations.filter(item => item.waID !== waID)
        ];
      } else {
        const newConversation = {
          waID,
          contactName: sender.profile.name,
          contactNumber: sender.wa_id, 
          lastMessageBody: message,
          unreadMessages: 1,
        };

        totalConversationsRef.current++;

        updatedConversations = [newConversation, ...conversations];
      }

      setConversations(updatedConversations);
      dispatch(markRead());
    }
  }, [messages]);


  useEffect(() => {
    if (allConversations) {
      setConversations((prev) => [...prev, ...allConversations]);
      if(!totalConversationsRef.current)totalConversationsRef.current = totalConversations;
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
        newConversationMessage={newConversationMessage} 
        phoneID={phoneID}
        messageMap={messageMap}
        setMessageMap={setMessageMap} />
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
