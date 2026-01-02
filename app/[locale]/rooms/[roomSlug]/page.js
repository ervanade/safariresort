import RoomDetail from '@/components/RoomDetail';
import React from 'react'

const page = async ({ params }) => {
    const { roomSlug } = await params;
  
    return (
      <div className=''>
       <RoomDetail roomSlug={roomSlug}/>
  
      </div>
    )
  }

export default page
