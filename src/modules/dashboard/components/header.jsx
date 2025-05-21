import { useRouter } from 'next/router';
import Link from 'next/link';
import CompanyLogo from '@/components/general/companylogo';
import { BoltIcon, Building, LogOut, UserCircle2Icon} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { BellIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

const truncateMessage = (message) => {
    if (message.length <= 30) return message;
    return message.substring(0, 30) + '...';
  };

const decodeMessage = (message) =>{
  const id = message.message.id;
  const image = "@/public/images/final-logo.svg";
  const user = message.sender.wa_id;
  const date = new Date(Number(message.timestamp)*1000);
  let timestamp;
  if (!isNaN(date.getTime())) {
    timestamp = date.toISOString();
  }
  const target = truncateMessage(message.message.text.body);
  const action = "";
  const unread = true;
  return { id, image, user, action, target, timestamp, unread };
}

const initialNotifications = [
  {
    id: 1,
    image: "/avatar-80-01.jpg",
    user: "Chris Tompson",
    action: "requested review on",
    target: "PR #42: Feature implementation",
    timestamp: "15 minutes ago",
    unread: true,
  },
  {
    id: 2,
    image: "/avatar-80-02.jpg",
    user: "Emma Davis",
    action: "shared",
    target: "New component library",
    timestamp: "45 minutes ago",
    unread: true,
  },
  {
    id: 3,
    image: "/avatar-80-03.jpg",
    user: "James Wilson",
    action: "assigned you to",
    target: "API integration task",
    timestamp: "4 hours ago",
    unread: false,
  },
  {
    id: 4,
    image: "/avatar-80-04.jpg",
    user: "Alex Morgan",
    action: "replied to your comment in",
    target: "Authentication flow",
    timestamp: "12 hours ago",
    unread: false,
  },
  {
    id: 5,
    image: "/avatar-80-05.jpg",
    user: "Sarah Chen",
    action: "commented on",
    target: "Dashboard redesign",
    timestamp: "2 days ago",
    unread: false,
  },
  {
    id: 6,
    image: "/avatar-80-06.jpg",
    user: "Miky Derya",
    action: "mentioned you in",
    target: "Origin UI open graph image",
    timestamp: "2 weeks ago",
    unread: false,
  },
]

function Dot({ className }) {
  return (<svg width="6" height="6" fill="currentColor" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true"><circle cx="3" cy="3" r="3" /></svg>)
}

export function NotificationComponent() {
  const messages = useSelector(state => state.websocket.messages);
  const read = useSelector(state => state.websocket.read);
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0);

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        unread: false,
      }))
    )
  }

  const handleNotificationClick = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    )
  }

  useEffect(() => {
    if(read == false && messages.length > 0){
      setNotifications((prev) => [
        ...prev, {...decodeMessage(messages[messages.length-1])}]
      )
      setUnreadCount((prev) => prev+1);
    }
  },[messages, read]);

  useEffect(() => {
    if(notifications.length > 0)console.log(notifications)
  }, [notifications])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button size="icon" className="relative flex rounded-full hover:bg-gray-100 p-2 items-center" aria-label="Open notifications">
          <BellIcon size={20} aria-hidden="true" />
          {unreadCount > 0 && (<Badge className="absolute text-xs -top-1 left-full min-w-5 -translate-x-[80%] px-px">{unreadCount > 99 ? "99+" : unreadCount}</Badge>)}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-1" align='end'>
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-semibold">Notifications</div>
          {unreadCount > 0 && (
            <button className="text-xs font-medium hover:underline" onClick={handleMarkAllAsRead}>
              Dismiss all
            </button>
          )}
        </div>
        <div role="separator" aria-orientation="horizontal" className="bg-border -mx-1 my-1 h-px"></div>
        {notifications.map((notification,index) => (
          <div key={index} className="hover:bg-accent rounded-md px-3 py-2 text-sm transition-colors">
            <div className="relative flex items-start gap-3 pe-3">
              <div className="flex-1 space-y-1">
                <button className="text-foreground/80 text-left after:absolute after:inset-0" onClick={() => handleNotificationClick(notification.id)}>
                  <span className="text-foreground font-medium hover:underline">{notification.user}</span>{" "}
                  {notification.action}{" "}
                  <span className="text-foreground font-medium hover:underline">
                    {notification.target}
                  </span>
                  .
                </button>
                <div className="text-muted-foreground text-xs">
                  {notification.timestamp}
                </div>
              </div>
              {notification.unread && (
                <div className="absolute end-0 self-center">
                  <Dot />
                </div>
              )}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export default function DashboardHeader({loginData}) {
  const router = useRouter();

  return (
    <>
      <header className='font-inter border-b py-0.5 bg-white border-b-gray-200 sticky top-0 z-50'>
        <div className='flex justify-between items-center px-5'>
          <div className='w-full'><CompanyLogo className='size-[50px]' /></div>
        <ul className='w-full flex items-center gap-x-2 text-sm'>
            <li className='hover:text-emerald-700 hover:bg-emerald-700/10 px-2 py-1.5 rounded-md'><Link href="/dashboard">Dashboard</Link></li>
            <li className='hover:text-emerald-700 hover:bg-emerald-700/10 px-2 py-1.5 rounded-md'><Link href="/dashboard/contacts">Contacts</Link></li>
            <li className='hover:text-emerald-700 hover:bg-emerald-700/10 px-2 py-1.5 rounded-md'><Link href="/dashboard/templates">Templates</Link></li>
            <li className='hover:text-emerald-700 hover:bg-emerald-700/10 px-2 py-1.5 rounded-md'><Link href="/dashboard/campaigns">Campaigns</Link></li>
            <li className='hover:text-emerald-700 hover:bg-emerald-700/10 px-2 py-1.5 rounded-md'><Link href="/dashboard/inbox">Inbox</Link></li>
            <li className='hover:text-emerald-700 hover:bg-emerald-700/10 px-2 py-1.5 rounded-md'><Link href="/dashboard/agents">Agents</Link></li>
        </ul>
          <nav className="bg-white w-full flex justify-end items-center lg:px-4 py-0.5">
            <ul className="relative flex flex-wrap justify-end gap-x-2 text-slate-800 items-center">
              <li><NotificationComponent /></li>
              {
                !(loginData)
                ? <li><Link href = "/login" className="border border-emerald-600 text-emerald-600 bg-white hover:bg-gradient-to-br from-emerald-600 text-sm font-medium via-emerald-500 to-emerald-700 hover:text-white rounded-lg py-2 px-6" >Login</Link></li>
                : <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex hover:bg-gray-100 p-1.5 rounded-md items-center gap-2 cursor-pointer">
                    <div className="relative">
                      {/* <Image className="object-cover w-9 h-9 rounded-full outline-2 outline-emerald-600 ring-2 ring-white border-4 border-white" src="/images/pro.png" alt="Profile Image" width={100} height={100} /> */}
                      <UserCircle2Icon size={32} strokeWidth={1.2} aria-hidden="true" />
                      <span className="h-2 w-2 rounded-full bg-emerald-500 absolute right-1 ring-1 ring-white bottom-0"></span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-sm cursor-pointer font-semibold text-gray-800">{loginData?.firstName} {loginData?.lastName}</h2>
                      </div>
                      <p className="text-gray-600 text-left text-xs">{loginData?.phoneNumber}</p>
                    </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuItem><BoltIcon size={14} aria-hidden="true" />Edit Profile</DropdownMenuItem>
                      <DropdownMenuItem><Building size={14} aria-hidden="true" />Manage Organizations</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem variant="destructive"><LogOut size={16} aria-hidden="true" />Logout</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              }
            </ul>

          </nav>
        </div>
      </header>
    </>
  )
}