import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (trip) GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label
    }
    await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        '{NAME}',
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.03] transition-all bg-white dark:bg-neutral-900">
        {/* Image */}
        <img
          src={photoUrl || '/placeholder.jpg'}
          alt={trip?.userSelection?.location?.label || 'Trip Destination'}
          className="object-cover w-full h-56"
        />

        {/* Text below image */}
        <div className="p-3">
          <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100 line-clamp-1">
            {trip?.userSelection?.location?.label || 'Unknown Destination'}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {trip?.userSelection?.noOfDays || 'N/A'} Days trip with{' '}
            {trip?.userSelection?.budget || 'Standard'} budget.
          </p>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
