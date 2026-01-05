import DiningDetail from '@/components/DiningDetail';
import React from 'react'

const page = async ({ params }) => {
    const { diningSlug } = await params;
  
    return (
      <div className=''>
       <DiningDetail diningSlug={diningSlug}/>
  
      </div>
    )
  }

export default page
