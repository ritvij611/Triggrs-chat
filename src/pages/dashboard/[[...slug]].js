import DashboardHeader from '@/modules/dashboard/components/header'
import InboxDashboardComponent from '@/modules/dashboard/inbox/components/InboxDashboardComponent'
import MainDashboardComponent from '@/modules/dashboard/main/components/MainDashboardComponent'
import TemplateManagementComponent from '@/modules/dashboard/template/components/TemplateManagementComponent'
import { parseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'
import ContactManagementComponent from '@/modules/dashboard/contact/components/ContactManagementComponent'
import CampaignManagementComponent from '@/modules/dashboard/campaign/components/CampaignManagementComponent'
import AgentManagementComponent from '@/modules/dashboard/agent/components/AgentManagementComponent'
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    setIsHydrated(true);
  }, []);


  if(!isHydrated) return;

  return (
    <div className='bg-slate-50 min-h-screen'>
        <DashboardHeader loginData={props} />
        {
            router.query.slug?.join('/') == 'inbox'
            ? <InboxDashboardComponent />
            : router.query.slug?.[0] == 'templates'
            ? <TemplateManagementComponent />
            : router.query.slug?.join('/') == 'contacts'
            ? <ContactManagementComponent />
            : router.query?.slug?.join('/') == 'campaigns'
            ? <CampaignManagementComponent companyID={'6805ce5c8ceaf44cf44a9718'}/>
            : router.query.slug?.join('/') == 'agents'
            ? <AgentManagementComponent />
            : <MainDashboardComponent />
        }
    </div>
  )
}
