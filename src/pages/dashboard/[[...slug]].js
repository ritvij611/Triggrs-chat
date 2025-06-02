import DashboardHeader from '@/modules/dashboard/components/header'
import InboxDashboardComponent from '@/modules/dashboard/inbox/components/InboxDashboardComponent'
import MainDashboardComponent from '@/modules/dashboard/main/components/MainDashboardComponent'
import TemplateManagementComponent from '@/modules/dashboard/template/components/TemplateManagementComponent'
import { parseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'
import ContactManagementComponent from '@/modules/dashboard/contact/components/ContactManagementComponent'
import { CampaignManagementComponent } from '@/modules/dashboard/campaign/components/CampaignManagementComponent'
import AgentManagementComponent from '@/modules/dashboard/agent/components/AgentManagementComponent'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { wsInitiate } from '@/store/wsInstance'
import WhatsAppNotification from '@/components/general/whatsAppNotification'

export async function getServerSideProps(context) {
    // Fetch data from external API
    try {
      const cookie = context.req.headers.cookie;
      if (cookie) {
        const token = parseCookie(cookie).get('twchat') ? parseCookie(cookie).get('twchat') : '';
        if (token) {
          const decoded = jwt.verify(token, process.env.SESS_SECRET_TOKEN);
        //   console.log('decoded',decoded);
          return { props: { status: 200, ...decoded } }
        } else {
          return {
            redirect: {
              permanent: false,
              destination: "/login",
            },
            props: { status: 200 },
          }
        }
      } else {
        return {
          redirect: {
            permanent: false,
            destination: "/login",
          },
          props: { status: 200 },
        }
      }
    } catch (e) {
      console.log('error data token', e);
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: { status: 200 },
      }
    }
  }

export default function DashboardPages(props) {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  const dispatch = useDispatch();
  const socket = useSelector(state => state.websocket.socket);
  const connected = useSelector(state => state.websocket.connected);
  const messages = useSelector((state) => state.websocket.messages);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const phoneID = "100315306037297"
    wsInitiate(dispatch, phoneID)
  },[dispatch]);


  if(!isHydrated) return;

  return (
    <div className='bg-slate-50 font-outfit min-h-screen'>
        <DashboardHeader loginData={props} />
        {
            router.query.slug?.[0] == 'inbox'
            ? <InboxDashboardComponent companyID={'6805ce5c8ceaf44cf44a9718'} messages={messages} />
            : router.query.slug?.[0] == 'templates'
            ? <TemplateManagementComponent companyID={'6805ce5c8ceaf44cf44a9718'} messages={messages}  />
            : router.query.slug?.[0] == 'contacts'
            ? <ContactManagementComponent companyID={'6805ce5c8ceaf44cf44a9718'} messages={messages} />
            : router.query?.slug?.[0] == 'campaigns'
            ? <CampaignManagementComponent companyID={'6805ce5c8ceaf44cf44a9718'} messages={messages} />
            : router.query.slug?.[0] == 'agents'
            ? <AgentManagementComponent />
            : <MainDashboardComponent />
        }
        
    </div>
  )
}
