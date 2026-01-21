import MeetingRoomDetail from '@/components/MeetingRoomDetail';
import React from 'react'

const page = async ({ params }) => {
    const { meetingSlug } = await params;
  
    return (
      <div className=''>
       <MeetingRoomDetail meetingSlug={meetingSlug}/>
  
      </div>
    )
  }

export default page
