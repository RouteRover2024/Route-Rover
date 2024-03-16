import { useRef, useState, useEffect } from 'react';
/* global google */
import { FaMapMarkerAlt, FaRoad, FaTimes, FaLocationArrow } from 'react-icons/fa';

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';

const center = { lat: 48.8584, lng: 2.2945 };

function SearchMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "api_key",
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const originRef = useRef();
  const destinationRef = useRef();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        center.lat = latitude;
        center.lng = longitude;
      });
    }
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  async function calculateRoute() {
    if (!originRef.current.value || !destinationRef.current.value) {
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destinationRef.current.value = '';
  }

  return (
    <div className="flex flex-col items-center relative h-screen w-screen">
      <div className="absolute top-0 left-0 h-full w-full">
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} icon={<FaMapMarkerAlt size={24} color="#FFA500" />} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </div>
      <div className="p-4 rounded-lg m-0 bg-gradient-to-r from-blue-700 to-blue-800 shadow-base min-w-[640px] z-10 text-white w-screen">
      <div className='p-4 rounded-lg m-4 bg-gradient-to-r from-blue-700 to-blue-800 shadow-base min-w-[400px] z-10 text-white'>
        <div className="flex justify-between space-x-2">
          <div className="flex-grow w-1/3">
            <Autocomplete>
              <input
                type="text"
                placeholder="Origin"
                ref={originRef}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
              />
            </Autocomplete>
          </div>
          <div className="flex-grow w-1/3">
            <Autocomplete>
              <input
                type="text"
                placeholder="Destination"
                ref={destinationRef}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
              />
            </Autocomplete>
          </div>
          <div>
            <button
              type="button"
              className="px-4 py-2 text-black bg-blue-500 rounded-lg focus:outline-none"
              onClick={calculateRoute}
            >
               Calculate Route
            </button>
            <button type="button" onClick={clearRoute} className="ml-2">
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-4 space-x-4">
          <span><FaRoad className="mr-2" /> Distance: {distance}</span>
          <span><FaMapMarkerAlt className="mr-2" /> Duration: {duration}</span>
          <button
            type="button"
            className="text-black bg-blue-500 rounded-full focus:outline-none"
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          >
            <FaLocationArrow />
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default SearchMap;
