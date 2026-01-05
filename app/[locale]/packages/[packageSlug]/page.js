import PackageDetail from '@/components/PackageDetail';
import React from 'react'

const page = async ({ params }) => {
    const { packageSlug } = await params;
  
    return (
      <div className=''>
       <PackageDetail packageSlug={packageSlug}/>
  
      </div>
    )
  }

export default page
