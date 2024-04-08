import { useRef, useState, useEffect } from "react";
import {
	FaMapMarkerAlt,
	FaRoad,
	FaTimes,
	FaLocationArrow,
} from "react-icons/fa";

import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	Autocomplete,
	DirectionsRenderer,
} from "@react-google-maps/api";

const center = { lat: 48.8584, lng: 2.2945 };
const libraries = ["places"];
function SearchMap() {
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyDjz6bjlVwYYVBy6JAIEFoKbGtQ8yiKAQU",
		libraries: libraries,
	});

	const [map, setMap] = useState(null);
	const [directionsResponse, setDirectionsResponse] = useState(null);
	const [distance, setDistance] = useState("");
	const [duration, setDuration] = useState("");
	const originRef = useRef();
	const destinationRef = useRef();

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
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
		setDistance("");
		setDuration("");
		originRef.current.value = "";
		destinationRef.current.value = "";
	}

	return (
		<div className="pt-6">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				<h1 className="text-3xl font-semibold text-gray-900">
					New Journey
				</h1>
			</div>
			<div className="p-2 m-2 sm:p-4">
				<GoogleMap
					center={center}
					zoom={15}
					mapContainerStyle={{ width: "100%", height: "425px" }}
					onLoad={(map) => setMap(map)}
				>
					<Marker position={center} />
					{directionsResponse && (
						<DirectionsRenderer directions={directionsResponse} />
					)}
				</GoogleMap>
			</div>
			<div className="p-2 sm:m-4">
				<div className="py-2 px-2 flex flex-col sm:flex-row items-center flex-wrap w-full">
					<div className="basis-1/2 min-w-[300px]">
						{/* <Autocomplete> */}
						<input
							type="text"
							placeholder="Origin"
							ref={originRef}
							className="basis-1/2 w-full block rounded-md focus:ring-slate-500 focus:border-slate-500 text-sm px-4 py-2 my-2 border-zinc-300 border-2"
						/>
						{/* </Autocomplete> */}
					</div>
					<div className="basis-1/2 min-w-[300px]">
						{/* <Autocomplete> */}
						<input
							type="text"
							placeholder="Destination"
							ref={destinationRef}
							className="w-full block rounded-md focus:ring-slate-500 focus:border-slate-500 text-sm px-4 py-2 my-2 border-zinc-300 border-2"
						/>
						{/* </Autocomplete> */}
					</div>
				</div>

				<div className="flex w-full justify-between gap-16 gap-y-4 sm:gap-24 flex-wrap mt-4">
					<span className="flex flex-row gap-4 items-center">
						<div className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
							<FaRoad />
						</div>
						<div className="font-semibold">
							Distance: {distance}
						</div>
					</span>
					<span className="flex flex-row gap-4 items-center mr-auto">
						<div className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
							<FaMapMarkerAlt />
						</div>
						<div className="font-semibold">
							Duration: {duration}
						</div>
					</span>
					<div className="flex flex-row items-center gap-8 justify-evenly">
						<button
							type="button"
							onClick={calculateRoute}
							className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
						>
							Calculate Route
						</button>
						<button
							type="button"
							onClick={clearRoute}
							className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
						>
							<FaTimes />
						</button>
						<button
							type="button"
							className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
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
