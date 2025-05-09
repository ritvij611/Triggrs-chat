import Image from 'next/image'
// import WebSocket from 'ws';
import ChatLayout from './ChatLayout';
import SearchChatUser from './SearchChatUser'
import ChatUserItem from './ChatUserItem'
import { useCallback, useEffect, useRef, useState } from 'react';
import SelectedChatUsers from './SelectedChatUsers';
// import Cookies from 'universal-cookie';



const Chatview = () => {
  const [contactList, setContactList] = useState([]);
  const [contactItem, setContactItem] = useState();
  const [connectionId, setConnectionId] = useState();
  // const ws = new WebSocket('wss://un0j7cplid.execute-api.ap-south-1.amazonaws.com/dev');
  const ws = useRef(null);
  // let socket = new WebSocket('wss://un0j7cplid.execute-api.ap-south-1.amazonaws.com/dev');
  // const [loginData, setLoginData] = useState();
  // const cookies = new Cookies();
// const checkSession = async () => {
  

//   if (cookies.get('twchat')) {
//     const sessionData = await fetch('/api/check-session', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         'token': cookies.get('twchat')
//       })
//     });
//     let response = await sessionData.json();
//     if (cookies.get('twchat')) {
//       setLoginData(response);
//       console.log(response);
//     }
//   }
// }

const getConversations = async (phone_number_id, skip, limit) => {
  const conversationData = await fetch(`https://wa-api.triggrsweb.com/conversation?phone_number_id=${phone_number_id}&skip=${skip}&limit=${limit}`, {
    method:'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const responseData = await conversationData.json();
  console.log(responseData);
  setContactList(responseData.data);
}


// https://wa-api.triggrsweb.com/conversation?phone_number_id=100315306037297&skip=0&limit=10
  // const socket = io('wss://un0j7cplid.execute-api.ap-south-1.amazonaws.com/dev');
  // const ws = new WebSocket('wss://un0j7cplid.execute-api.ap-south-1.amazonaws.com/dev');

  const selectUser = (i) => {
    setContactItem(contactList.filter(item => item._id == i)[0]);
  }

  const showRightDropDown = (e, i) => {
    e.preventDefault();
    alert('It works-'+i);
  }


  const onSocketOpen = useCallback(() => {
    ws.current?.send(JSON.stringify({ message: 'getConnId', body: "data" }));
    console.log('Socket open');
  }, []);

  const onSocketClose = useCallback(() => {
    console.log('Socket Close');
  }, []);

  const onSocketMessage = useCallback((event) => {
    let responseData = JSON.parse(event);
    const {body, requestContext} = responseData;
    // const data = JSON.parse(body);
    // console.log(data);
    // console.log(requestContext);
    if(responseData && requestContext && requestContext.routeKey == 'getConnId'){
      ws.current?.send(JSON.stringify({ message: 'createConnId', body: {waba_id: 100464582688618, phone_number_id: 100315306037297, user_id: '64c0aeb05824e51c2dce28ec', agent_id: null}}));
    }else if(responseData && requestContext && requestContext.routeKey == 'sendMessage'){
      console.log(responseData);
    }else{
      console.log('Something Else');
    }
    // console.log(responseData);
    // if(responseData && responseData.requestContext && responseData.requestContext.routeKey == 'getConnId'){
    //   ws.current?.send(JSON.stringify({ message: 'createConnId', body: {waba_id: 100464582688618, phone_number_id: 100315306037297}}));
    // }
    // // else if(responseData.requestContext.routeKey == 'createConnId'){} // Update WABA here
    // // else{
    //   console.log(JSON.parse(responseData.body));
    // }
  }, []);

  const onConnect = useCallback(() => {
    if (ws.current?.readyState !== WebSocket.OPEN) {
      ws.current = new WebSocket('wss://un0j7cplid.execute-api.ap-south-1.amazonaws.com/dev');
      ws.current?.addEventListener('open', onSocketOpen);
      ws.current?.addEventListener('close', onSocketClose);
      ws.current?.addEventListener('message', (event) => {
        onSocketMessage(event.data);
      });
    }
  }, []);

  const onDisconnect = useCallback(() => {
    if (connectionId) {
      ws.current?.close();
    }
  }, [connectionId]);

  useEffect(() => {
    getConversations('100315306037297', 0, 20);
    // console.log(ws.readyState);
    // if(ws.readyState == ws.CONNECTING && !connectionId){
    //   // When connection starts open then this will work
    //   ws.onopen = (event) => {
    //     // console.log('open');
    //     // ws.send(JSON.stringify({message: "getConnId", body: {send: 'Connection'}}));
    //     // ws.send(JSON.stringify({message: "sendMessage", body: {send: 'Connection'}}))
    //     console.log(event);
    //   }

    //   // When connection receives message from server then this will work
    //   ws.onmessage = (event) => {
    //     // console.log(event);
    //     if(connectionId){
    //       console.log('Actual Code work here');
    //     }else{
    //       if(event && event.data && JSON.parse(event.data).requestContext && JSON.parse(event.data).requestContext.connectionId){
    //         console.log(JSON.parse(event.data).requestContext.connectionId);
    //         setConnectionId(JSON.parse(event.data).requestContext.connectionId);
    //       }
    //     }
    //   }

    //   // When connection receives error by server then this will work
    //   ws.onerror = (event) => {
    //     console.log('not work');
    //     console.log(event);
    //   }

    //   // When connection is closed by server then this will work
    //   ws.onclose = (event) => {
    //     console.log('closed');
    //     console.log(event);
    //   }
    // }else{
    //   console.log('This will not work');
    // }

    // return () => {
    //   if(ws){
    //     if(ws.readyState == ws.OPEN){
    //       ws.close();
    //     }
    //   }
    // }
    onConnect();
  }, []);

  useEffect(() => {
    return () => {
      ws.current?.close();
    };
  }, []);


  return (
    <>
      <ChatLayout>
      <div className="w-full font-inter  overflow-y-auto sticky top-0 bg-white bottom-0 lg:h-[calc(100vh-65px)]" aria-label="Sidenav">
                <SearchChatUser placeholder='Search Contacts' />
                <div className = "h-full border-r border-gray-200">
                    <div className="w-full  overflow-y-auto">
                        {
                        contactList && contactList.length > 0 
                        ? contactList.map((contactItem,i) => {
                            return <ChatUserItem 
                                key={i} 
                                name={contactItem.wa_profile_name} 
                                message={contactItem.message} 
                                time={contactItem.time} 
                                messageCount={contactItem.messageCount} 
                                chatStatus={contactItem.chatStatus}
                                onClick={() => selectUser(contactItem._id)} 
                                onMenuClick={(e) => showRightDropDown(e, i)}
                            />
                        })
                        : <>Not found</>
                        }
                    </div>
                </div>
            </div>
            {contactItem  ?  
        <SelectedChatUsers contactItem = {contactItem} />:<div className='hidden sm:flex flex-col justify-center items-center bg-slate-200/80 h-full w-full p-4'>
                  {/* <button onClick={onConnect}>Connect</button> */}
                  <div className='max-w-[500px] w-full'>
                    <Image 
                      className='object-contain w-full h-auto' 
                      alt='default background image' 
                      width={500} 
                      height={400} 
                      src="/images/empty-chatbox.svg"
                    />
                    <p className='text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-neutral-800 font-bold mt-8 w-full text-center lg:whitespace-nowrap'>Hello! I&apos;m here to assist you with any questions or concerns.</p>
                  </div>
                </div>}
      </ChatLayout>

    </>

  )

}



export default Chatview;
