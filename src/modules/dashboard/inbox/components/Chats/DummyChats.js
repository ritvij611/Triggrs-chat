import { useEffect, useState } from 'react'

const dummyContacts = [
  {
    _id: '1',
    wa_profile_name: 'John Doe',
    message: 'Hi there! How can I help you today?',
    time: '2:30 PM',
    messageCount: 2,
    chatStatus: 'online'
  },
  {
    _id: '2',
    wa_profile_name: 'Jane Smith',
    message: 'I have a question about...',
    time: '1:45 PM',
    messageCount: 1,
    chatStatus: 'away'
  },
  {
    _id: '3',
    wa_profile_name: 'Mike Johnson',
    message: 'Thanks for your help!',
    time: '11:20 AM',
    messageCount: 3,
    chatStatus: 'offline'
  }
];

const DummyChats = ({ onSelect }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-4 p-4">
      {isLoading ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
          </div>
        </div>
      ) : (
        dummyContacts.map((item, i) => (
          <ChatUserItem
            key={i}
            name={item.wa_profile_name}
            message={item.message}
            time={item.time}
            messageCount={item.messageCount}
            chatStatus={item.chatStatus}
            onClick={() => onSelect(item._id)}
            onMenuClick={(e) => console.log('Menu clicked for:', item._id)}
          />
        ))
      )}
    </div>
  );
};

export default DummyChats;
