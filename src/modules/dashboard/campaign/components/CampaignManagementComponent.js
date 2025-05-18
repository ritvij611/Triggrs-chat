import ViewCampaignComponent from "./ViewCampaignComponent";
import { useRouter } from "next/router";
import React from "react";
import CreateCampaignComponent from "./CreateCampaignComponent";

export const CampaignManagementComponent = ({companyID}) => {
    const router = useRouter();

    return (
    <>
      {
        router.query?.slug.join('/') == 'campaigns/create'
        ? <CreateCampaignComponent companyID={companyID} />
        : <ViewCampaignComponent companyID={companyID} />
      }
    </>
  )
}