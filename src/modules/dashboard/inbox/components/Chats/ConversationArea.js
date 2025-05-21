import { useState, useRef, useEffect } from 'react';
import { Paperclip, Smile, Mic, Send, Check, Clock, MoreVertical, Phone, Video } from 'lucide-react';
import { useFetchConversationMessages } from '../../hooks/useFetchConversationMessages';

const MessageStatus = ({ status }) => {
  if (status === "sent") {
    return <Check className="text-gray-400 w-4 h-4" />;
  } else if (status === "delivered") {
    return (
      <div className="flex">
        <Check className="text-gray-400 w-4 h-4" />
        <Check className="text-gray-400 w-4 h-4 -ml-2" />
      </div>
    );
  } else if (status === "read") {
    return (
      <div className="flex">
        <Check className="text-blue-500 w-4 h-4" />
        <Check className="text-blue-500 w-4 h-4 -ml-2" />
      </div>
    );
  } else {
    return <Clock className="text-gray-400 w-4 h-4" />;
  }
};

export const ConversationArea = ({
  conversationItem, 
  newConversationMessage, 
  phoneID,
  messageMap,
  setMessageMap,
}) => {
  const { allConversationMessages, totalConversationMessages, loadingConversationMessages, conversationMessageError, fetchConversationMessages, cancelConversationMessagesOperation } = useFetchConversationMessages();
  const [conversationMessages, setConversationMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const [loadMessages, setLoadMessages] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if(conversationItem){
      setConversationMessages(messageMap.get(conversationItem.waID) || []);
      setNewMessage("");
      scrollToBottom();
    }
  },[conversationItem]);

  useEffect(()=>{
    if (loadMessages == false) return;
    const fetch = async() => {
      if(phoneID && conversationItem.waID){
        await fetchConversationMessages({
          phoneID,
          waID: conversationItem.waID,
          limit: 10,
          index: conversationMessages.length / 10,
        });
      }  
    };

    fetch();
  },[loadMessages]);


  useEffect(()=>{
    if(newConversationMessage && conversationMessages && conversationMessages.length > 0)
      setConversationMessages(prev => [newConversationMessage, ...prev]);
      scrollToBottom();
  },[newConversationMessage]);


  useEffect(() => {
    if (allConversationMessages.length > 0) {
      const previousScrollHeight = messagesContainerRef.current.scrollHeight;
      setConversationMessages((prev) => [...prev, ...allConversationMessages]);
      setMessageMap((prev) => {
        const updated = new Map(prev);
        updated.set(conversationItem.waID, conversationMessages);
        return updated;
      });
      setLoadMessages(false);
      requestAnimationFrame(() => {
        const newScrollHeight = messagesContainerRef.current.scrollHeight;
        messagesContainerRef.current.scrollTop = newScrollHeight - previousScrollHeight;
      });
    } else if (conversationMessageError) {
      toast.error(conversationMessageError);
      setLoadMessages(false);
    }
  }, [allConversationMessages, conversationMessageError, totalConversationMessages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleString('en-US', { 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true 
    });
    
    const newMsg = {
      id: messages.length + 1,
      content: newMessage,
      timestamp: formattedTime,
      sender: "self",
      status: "sent"
    };
    
    setConversationMessages([newMsg, ...conversationMessages]);
    setNewMessage("");
  
  };

  return (
    <div className="flex flex-col h-[90vh] bg-gray-100 border-l border-gray-200">
      {/* Chat header  */}
      <div className="flex items-center justify-between p-3 bg-green-600 text-white h-16">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
            {conversationItem.contactName.charAt(0)}
          </div>
          <div className="ml-3">
            <div className="font-semibold">{conversationItem.contactName}</div>
          </div>
        </div>
        <div className="flex items-center">
          <button className="text-white p-2">
            <Video className="w-5 h-5" />
          </button>
          <button className="text-white p-2">
            <Phone className="w-5 h-5" />
          </button>
          <button className="text-white p-2">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 p-4 overflow-y-auto bg-[#e5ded8] flex flex-col"
        onScroll={(e) => {
          const { scrollTop } = e.currentTarget;
          if (scrollTop == 0 && conversationMessages.length < totalConversationMessages){
            setLoadMessages(true);
          }
        }}
      >
        {/* Loading Spinner at top */}
        {loadMessages && (
          <div className="p-3 flex justify-center items-center">
            <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2 text-sm text-gray-600">Loading messages...</span>
          </div>
        )}

        
        {/* Show messages in chronological order (oldest to newest) */}
        {(conversationMessages && conversationMessages.length > 0) 
        ? 
        ([...conversationMessages].reverse().map((message) => (
          <div 
            key={message.messageObject.id} 
            className={`flex ${message.messageType !== 'RECEIVED' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div 
              className={`p-3 rounded-lg max-w-xs md:max-w-md ${
                message.messageType !== 'RECEIVED' 
                  ? 'bg-green-100 rounded-tr-none' 
                  : 'bg-white rounded-tl-none'
              }`}
            >
              <div className="text-sm break-words">{message.messageObject.text.body}</div>
              <div className="text-right mt-1 flex items-center justify-end">
                <span className="text-xs text-gray-500 mr-1">{message.messageObject.timestamp}</span>
                {message.messageType !== 'RECEIVED' && <MessageStatus status={message.status} />}
              </div>
            </div>
          </div>
        )))
        :
        (
          <div 
            className={`flex ${conversationItem.lastMessageBody.messageType === 'RECEIVED' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div 
              className={`p-3 rounded-lg max-w-xs md:max-w-md ${
                conversationItem.lastMessageBody.messageType === 'RECEIVED' 
                  ? 'bg-green-100 rounded-tr-none' 
                  : 'bg-white rounded-tl-none'
              }`}
            >
              <div className="text-sm break-words">{conversationItem.lastMessageBody.text.body}</div>
              <div className="text-right mt-1 flex items-center justify-end">
                <span className="text-xs text-gray-500 mr-1">{conversationItem.lastMessageBody.text.body}</span>
                {conversationItem.lastMessageBody.messageType === 'RECEIVED' && <MessageStatus status={message.status} />}
              </div>
            </div>
          </div>
        )
      }

        {/* Reference for auto-scrolling to bottom */}
        <span ref={messagesEndRef} />
      
      </div>

      {/* Message input area */}
      <div className="bg-gray-100 p-3 h-16">
        <div className="flex items-center bg-white rounded-full px-4 py-2 h-full">
          <button className="text-gray-500 mr-2 flex-shrink-0">
            <Smile className="w-6 h-6" />
          </button>
          <button className="text-gray-500 mr-2 flex-shrink-0">
            <Paperclip className="w-6 h-6" />
          </button>
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 outline-none bg-transparent min-w-0"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          <button 
            className={`ml-2 p-2 rounded-full flex-shrink-0 ${newMessage.trim() ? 'bg-green-500 text-white' : 'text-gray-500'}`}
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            {newMessage.trim() ? <Send className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}