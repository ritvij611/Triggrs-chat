import { useRouter } from 'next/router'
import React from 'react'
import ViewTemplatesComponent from './ViewTemplatesComponent';
import CreateTemplateComponent from './create/CreateTemplateComponent';

export default function TemplateManagementComponent() {
  const router = useRouter();

  return (
    <>
      {
        router.query?.slug.join('/') == 'templates/create'
        ? <CreateTemplateComponent />
        : <ViewTemplatesComponent />
      }
    </>
  )
}