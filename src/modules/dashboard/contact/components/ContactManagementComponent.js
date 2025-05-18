import React from 'react'
import ViewContactManagement from './ViewContactManagement'

export default function ContactManagementComponent({companyID}) {
  return (
    <div className='max-w-6xl mx-auto pt-4'>
      <ViewContactManagement companyID={companyID} />
    </div>
  )
}
