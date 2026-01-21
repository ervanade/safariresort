import GatheringPackageDetail from '@/components/GatheringPackageDetail';
import PackageDetail from '@/components/PackageDetail';
import React from 'react'

const page = async ({ params }) => {
    const { gatheringSlug } = await params;
  
    return (
      <div className=''>
       <GatheringPackageDetail gatheringSlug={gatheringSlug}/>
  
      </div>
    )
  }

export default page
