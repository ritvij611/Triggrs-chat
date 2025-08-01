import { useState, useRef, useEffect } from 'react';
import { Paperclip, Plus, X, Smile, Mic, Send, Check, Clock, MoreVertical, Phone, Video, Loader, File, FileText, Image } from 'lucide-react';
import { useFetchConversationMessages } from '../../hooks/useFetchConversationMessages';
import { toast } from 'sonner';
import { useSendMessage } from '../../hooks/useSendMessage';
import { DocumentUploader } from './DocumentUploader';
import PreviewPartComponent from '@/modules/dashboard/template/components/PreviewPartComponent';

const decodeComponents = (components = [], parameters = []) => {
  const headerObj = components.find(item => item.type === "HEADER");
  const bodyObj = components.find(item => item.type === "BODY");
  const footerObj = components.find(item => item.type === "FOOTER");
  const buttonsObj = components.find(item => item.type === "BUTTONS");

  const headerType = headerObj?.format === "TEXT" ? "Text" : "Media";

  const mediaType = (() => {
    switch (headerObj?.format) {
      case "IMAGE": return "Image";
      case "VIDEO": return "Video";
      case "DOCUMENT": return "Document";
      case "LOCATION": return "Location";
      default: return "";
    }
  })();

  const headerPart = headerObj?.text || "";
  const bodyPart = bodyObj?.text || "";
  const footerPart = footerObj?.text || "";

  const headerParams = parameters.find(p => p.type === "header")?.parameters || [];
  const bodyParams = parameters.find(p => p.type === "body")?.parameters || [];

  const headerVariableValues = headerParams.map(param => param.text);
  const bodyVariableValues = bodyParams.map(param => param.text);

  const buttons = buttonsObj?.buttons || [];
  const ctaItems = [];
  const replyItems = [];

  buttons.forEach(item => {
    if (item.type === "PHONE_NUMBER") {
      ctaItems.push({
        ctaType: 'PHONE',
        label: item.text
      });
    } else if (item.type === "URL") {
      ctaItems.push({
        ctaType: 'URL',
        label: item.text
      });
    } else {
      replyItems.push(item.text);
    }
  });

  const imageUploaded = headerObj?.format !== "TEXT";
  const headerHandle = headerParams?.[0]?.image?.link || "";
  console.log(headerParams)
  
  return {
    imageUploaded,
    headerHandle,
    headerType,
    mediaType,
    headerPart,
    bodyPart,
    footerPart,
    ctaItems,
    replyItems,
    bodyVariableValues,
    headerVariableValues
  };
};


const MessageStatus = ({ status }) => {
  if (status === "SENT") {
    return <Check className="text-gray-400 w-4 h-4" />;
  } else if (status === "DELIVERED") {
    return (
      <div className="flex">
        <Check className="text-gray-400 w-4 h-4" />
        <Check className="text-gray-400 w-4 h-4 -ml-2" />
      </div>
    );
  } else if (status === "READ") {
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
  setConversationItem,
  newConversationMessage, 
  phoneID, companyID,
  messageMap,
  setMessageMap,
  statusUpdate,
  send, setSend
}) => {
  const { allConversationMessages, totalConversationMessages, loadingConversationMessages, conversationMessageError, fetchConversationMessages, cancelConversationMessagesOperation } = useFetchConversationMessages();
  const { sendResponse, isSending, sendError, handleSend, cancelSend } = useSendMessage();
  const [conversationMessages, setConversationMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const totalConversationMessagesRef = useRef(0);
  const [selectedPhoto, setSelectedPhoto] = useState({});
  const [selectedDoc, setSelectedDoc] = useState({});

  const [loadMessages, setLoadMessages] = useState(true);

  const [photos, setPhotos] = useState([]);
  
  const [docs, setDocs] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (statusUpdate?.id) {
      setConversationMessages((prev) =>
        prev.map(item => {
          if (item.messageObject?.id === statusUpdate.id) {
            return {
              ...item,
              status: statusUpdate.status.toUpperCase(),
              sentAt: statusUpdate.status == "sent" ? statusUpdate.timestamp : item.sentAt
            };
          }
          return item;
        })
      );
    }
  }, [statusUpdate]);


  useEffect(() => {
    if(conversationItem){
      setConversationMessages(messageMap.get(conversationItem.waID)?.messages || []);
      totalConversationMessagesRef.current = messageMap.get(conversationItem.waID)?.totalCount || 0;
      setNewMessage("");
      setSelectedDoc({});
      setSelectedPhoto({});
      setUploaderOpen(false)
      if(totalConversationMessagesRef.current == 0){
        setLoadMessages(true)
      }
    }
  },[conversationItem?.waID]);

  useEffect(()=>{
    if (loadMessages == false) return;
    const fetch = async() => {
      if(phoneID && conversationItem.waID){
        await fetchConversationMessages({
          phoneID,
          waID: conversationItem.waID,
          limit: 10,
          index: Math.floor(conversationMessages.length/10),
        });
      }  
    };

    fetch();
  },[loadMessages]);


  useEffect(()=>{
    if(newConversationMessage && conversationMessages && conversationMessages.length > 0)
      setConversationMessages(prev => [newConversationMessage, ...prev]);
      totalConversationMessagesRef.current++;
      scrollToBottom();
  },[newConversationMessage]);


  useEffect(() => {
    if (allConversationMessages) {
      totalConversationMessagesRef.current = totalConversationMessages;
      setConversationMessages(prev => {
        const existingMsgIDs = new Set(prev.map(msg => msg.messageObject.id));
        const newUniqueMessages = allConversationMessages.filter(
          msg => !existingMsgIDs.has(msg.messageObject.id)
        );
        return [...prev, ...newUniqueMessages];
      });
      const previousScrollHeight = messagesContainerRef.current.scrollHeight;
      requestAnimationFrame(() => {
        const newScrollHeight = messagesContainerRef.current.scrollHeight;
        messagesContainerRef.current.scrollTop = newScrollHeight - previousScrollHeight;
      });
       
      setLoadMessages(false);
    } else if (conversationMessageError) {
      toast.error(conversationMessageError);
      setLoadMessages(false);
    }
  }, [allConversationMessages, conversationMessageError]);

  

  useEffect(() => {
    setMessageMap((prev) => {
      const updated = new Map(prev);
      updated.set(conversationItem.waID, {messages: conversationMessages, totalCount: totalConversationMessagesRef.current});
      return updated;
    }); 
  },[conversationMessages?.length, totalConversationMessagesRef.current]);

  useEffect(() => {

    if(sendResponse?.status == 200){
      const newMsg = {
        messageObject: {
          id: sendResponse?.data.messages[0].id,
          type: sendResponse.type,
        },
        messageType: "SEND",
        sentAt: "-",
        status: "unknown"
      };
      switch (sendResponse.type) {
        case "text":
          newMsg.messageObject.text = {
            body: newMessage,
          }
          break;
        case "image":
          newMsg.messageObject.image = {
            caption: newMessage,
            link: selectedPhoto.link
          }
          break;
        case "video":
          newMsg.messageObject.video = {
            caption: newMessage,
            link: selectedPhoto.link
          }
          break;
        case "document":
          newMsg.messageObject.video = {
            caption: newMessage,
            link: selectedDoc.link,
            filename: selectedDoc.name
          }
          break;
      
        default:
          break;
      }
      setConversationMessages((prev) => [newMsg, ...prev]);
      setConversationItem((prev) => ({
        ...prev, 
        lastMessageBody: newMsg
      }));
      setSend(true)
      setNewMessage("");
      setSelectedDoc({});
      setSelectedPhoto({});
      setUploaderOpen(false)
      setSending(false);
    } else if(sendError){
      toast.error("Sending message failed");
      setSending(false);
    }
  },[sendResponse, sendError])


  const handleSendMessage = async() => {
    
    const currentTime = (Math.floor(new Date())/1000).toString();
    if(currentTime >= conversationItem.serviceWindowExpiry){
      toast.error("Customer service window for this contact has expired")
      return;
    }
    const formattedTime = currentTime?.toLocaleString('en-US', { 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true 
    });
    
    setSending(true);

    await handleSend({
      phoneID,
      waID: conversationItem.waID,
      message: newMessage,
      imageURL: selectedPhoto.link || '',
      docURL: selectedDoc.link || '',
      fileName: selectedDoc.name || '',
    })
    
    // setConversationMessages([newMsg, ...conversationMessages]);
    // setNewMessage("");
  
  };
  const [uploaderOpen, setUploaderOpen] = useState(false);
  const handleUpload = (file) => {
    console.log('Uploading:', file);
    setUploaderOpen(false);
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
          if (scrollTop == 0 && conversationMessages?.length < totalConversationMessagesRef.current){
            setLoadMessages(true);
          }
        }}
      >
        {/* Loading Spinner at top */}
        {loadMessages && (
          <div className="p-3 flex justify-center items-center">
            <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        
        {/* Show messages in chronological order (oldest to newest) */}
        {(conversationMessages?.length) 
        ? 
        ([...conversationMessages].reverse().map((message) => (
          <div 
            key={message?.messageObject.id} 
            className={`flex ${message?.messageType !== 'RECEIVED' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div 
              className={`p-3 rounded-lg max-w-xs md:max-w-md ${
                message?.messageType !== 'RECEIVED' 
                  ? 'bg-green-100 rounded-tr-none' 
                  : 'bg-white rounded-tl-none'
              }`}
            >

              {message?.messageObject?.type === "template" ? 
              (<PreviewPartComponent putValue={true} {...decodeComponents(message?.messageObject?.template?.body, message?.messageObject?.template?.parameters)} />)
              :
              (<div>{message?.messageObject?.type === "image" && 
              <div>
                {message?.messageObject?.image?.link ?
                <img className='w-80' src={message?.messageObject?.image?.link} /> : <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop" />}
              </div>}
              {message?.messageObject?.type === "video" && 
              <div>
                {message?.messageObject?.video?.link ?
                <img className='w-80' src={message?.messageObject?.video?.link} /> : <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop" />}
              </div>}
              {message?.messageObject?.type === "document" && 
              <div>
                {message?.messageObject?.document?.link ?
                <img className='w-80' src={message?.messageObject?.document?.link} /> : <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop" />}
              </div>}
              <div className="text-sm break-words">{message?.messageObject?.text?.body || message?.messageObject?.image?.caption || message?.messageObject?.video?.caption || message?.messageObject?.document?.caption}</div>
              </div>)}
              <div className="text-right mt-1 flex items-center justify-end">
                <span className="text-xs text-gray-500 mr-1">{message?.sentAt}</span>
                {message?.messageType !== 'RECEIVED' && <MessageStatus status={message?.status} />}
              </div>
            </div>
          </div>
        )))
        :
        (
          <div 
            className={`flex ${conversationItem.lastMessageBody?.messageType !== 'RECEIVED' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div 
              className={`p-3 rounded-lg max-w-xs md:max-w-md ${
                conversationItem.lastMessageBody?.messageType !== 'RECEIVED' 
                  ? 'bg-green-100 rounded-tr-none' 
                  : 'bg-white rounded-tl-none'
              }`}
            >
              <div className="text-sm break-words">{conversationItem.lastMessageBody?.messageObject?.text?.body || "🚫 THIS MESSAGE CAN BE VIEWED IN THE ORIGINAL WHATSAPP APP"}</div>
              <div className="text-right mt-1 flex items-center justify-end">
              </div>
            </div>
          </div>
        )
      }

        {/* Reference for auto-scrolling to bottom */}
        <span ref={messagesEndRef} />
      
      </div>

      {/* Document Uploader */}
      <DocumentUploader 
        companyID={companyID}
        isOpen={uploaderOpen} 
        onUpload={handleUpload}
        setSelectedDoc={setSelectedDoc}
        selectedPhoto={selectedPhoto}
        setSelectedPhoto={setSelectedPhoto}
        selectedDoc={selectedDoc}
        photos={photos}
        setPhotos={setPhotos}
        docs={docs}
        setDocs={setDocs}
      />

      {/* Message input area */}
      <div className="bg-gray-100 p-3 h-16">
        <div className="flex items-center bg-white rounded-full px-4 py-2 h-full">
          <button className="text-gray-500 mr-2 flex-shrink-0">
            <Smile className="w-6 h-6" />
          </button>
          <button className="text-gray-500 mr-2 flex-shrink-0">
            <Paperclip className="w-6 h-6" onClick={() => {
              if(uploaderOpen){
                setSelectedPhoto({});
                setSelectedDoc({});
              }
              setUploaderOpen(!uploaderOpen);
            }} />
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
            className={`ml-2 p-2 rounded-full flex-shrink-0 ${newMessage.trim()  || selectedPhoto?.link || selectedDoc?.link ? 'bg-green-500 text-white' : 'text-gray-500'}`}
            onClick={handleSendMessage}
            disabled={(newMessage.trim() == "" && !selectedPhoto?.link && !selectedDoc?.link)}
          >
            {(newMessage.trim() == "" && !selectedPhoto?.link && !selectedDoc?.link) ? <Mic className="w-5 h-5" /> : sending ? <Loader className='w-5 h-5' /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}