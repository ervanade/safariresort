import GatheringPackageDetail from '@/components/GatheringPackageDetail';
import PackageDetail from '@/components/PackageDetail';
import React from 'react'

const fetchPackages = async (locale) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/packages?lang=${locale}`,
    {
      next: { revalidate: 60 * 5 },
      // cache: 'no-store',
      method: "GET",
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_APP_X_API_KEY,
      },
    },
  );
  if (res?.status === 404) {
    return notFound(); // Pastikan tidak menyebabkan error
  }

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const page = async ({ params }) => {
    const { gatheringSlug } = await params;
   
  
    return (
      <div className=''>
       <GatheringPackageDetail gatheringSlug={gatheringSlug}/>
  
      </div>
    )
  }

export default page
