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
	// Autocomplete,
	DirectionsRenderer,
} from "@react-google-maps/api";

const center = { lat: 48.8584, lng: 2.2945 };

const libraries = ["places"];

function debounce(func, delay) {
	let timer;
	return function (...args) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
}

function renderVehicleType(vehicleType) {
	switch (vehicleType) {
		case "RAIL":
			return "Rail";
		case "METRO_RAIL":
			return "Metro";
		case "SUBWAY":
			return "Metro";
		case "TRAM":
			return "Above ground light rail";
		case "MONORAIL":
			return "Monorail";
		case "HEAVY_RAIL":
			return "Local train";
		case "COMMUTER_TRAIN":
			return "Commuter rail";
		case "HIGH_SPEED_TRAIN":
			return "High speed train";
		case "BUS":
			return "Bus";
		case "INTERCITY_BUS":
			return "Intercity bus";
		case "TROLLEYBUS":
			return "Trolleybus";
		case "SHARE_TAXI":
			return "Share taxi";
		case "FERRY":
			return "Ferry";
		case "CABLE_CAR":
			return "Cable car";
		case "GONDOLA_LIFT":
			return "Aerial cable car";
		case "FUNICULAR":
			return "Funicular";
		default:
			return "Other";
	}
}


function SearchMap() {
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "api_key",
		libraries: libraries,
	});

	const [map, setMap] = useState(null);
	const [directionsResponse, setDirectionsResponse] = useState(null);
	const [distance, setDistance] = useState("");
	const [duration, setDuration] = useState("");
	const [transitOptions, setTransitOptions] = useState([]);
	const [travelMode, setTravelMode] = useState("DRIVING"); // Default travel mode is driving
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

	const debouncedSearch = debounce((searchTerm) => {
		// Perform the search or API call with searchTerm
		console.log("Searching with term:", searchTerm);

	}, 700);

	const handleOriginInputChange = (event) => {
		debouncedSearch(event.target.value);
	};

	const handleDestinationInputChange = (event) => {
		debouncedSearch(event.target.value);
	};

	const handleTravelModeChange = (event) => {
		setTravelMode(event.target.value);
	};


	async function calculateRoute() {
		if (!originRef.current.value || !destinationRef.current.value) {
			return;
		}

		try {
			const directionsService = new google.maps.DirectionsService();
			const results = await directionsService.route({
				origin: originRef.current.value,
				destination: destinationRef.current.value,
				travelMode: travelMode,
				provideRouteAlternatives: true, // Set to true to provide alternative routes
				avoidFerries: true,
				avoidHighways: true,
				avoidTolls: true,
			});

			if (results.status === "OK") {
				setDirectionsResponse(results);
				setDistance(results.routes[0].legs[0].distance.text);
				setDuration(results.routes[0].legs[0].duration.text);
				console.log(results);
				// Extract transit options if the travel mode is transit
				if (travelMode === "TRANSIT") {
					const transitOptions = extractTransitOptions(results);
					setTransitOptions(transitOptions);
				} else {
					// Clear transit options if the travel mode is not transit
					setTransitOptions([]);
				}
			} else {
				// Handle error cases, e.g., route not found
				console.error("Error fetching route:", results.status);
				setDirectionsResponse(null);
				setDistance("");
				setDuration("");
				setTransitOptions([]);
			}
		} catch (error) {
			// Handle any other errors that occur during route calculation
			console.error("An error occurred during route calculation:", error);
			setDirectionsResponse(null);
			setDistance("");
			setDuration("");
			setTransitOptions([]);
		}
	}


	function extractTransitOptions(directionsResponse) {
		const routes = directionsResponse.routes;
		let options = [];

		routes.forEach((route) => {
			const legs = route.legs;
			legs.forEach((leg) => {
				const steps = leg.steps; // Initialize steps here
				console.log(steps); // Move this line here
				steps.forEach((step) => {
					if (step.transit && step.transit.line && step.transit.line.vehicle) {
						const vehicleType = step.transit.line.vehicle.type;
						const departureTime = new Date(step.transit.departure_time.value);
						const arrivalTime = new Date(step.transit.arrival_time.value);
						const routingPreference = step.transit.routing_preference;
						options.push({
							vehicleType: vehicleType,
							departureTime: departureTime,
							arrivalTime: arrivalTime,
							routingPreference: routingPreference,
							duration: steps.duration,
							instructions: steps.instructions,
						});
					}
				});
			});
		});

		return options;
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
						<DirectionsRenderer
							directions={directionsResponse}
						/>
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
							onChange={handleOriginInputChange}
						/>
						{/* </Autocomplete> */}
					</div>
					<div className="basis-1/2 min-w-[300px]">
						{/* <Autocomplete>  */}
						<input
							type="text"
							placeholder="Destination"
							ref={destinationRef}
							className="w-full block rounded-md focus:ring-slate-500 focus:border-slate-500 text-sm px-4 py-2 my-2 border-zinc-300 border-2"
							onChange={handleDestinationInputChange}
						/>
						{/* </Autocomplete>  */}
					</div>
				</div>

				<div className="flex w-full justify-between gap-16 gap-y-4 sm:gap-24 flex-wrap mt-4">
					<span className="flex flex-row gap-4 items-center">
						<div className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
							<FaRoad />
						</div>
						<span className="flex flex-row gap-4 items-center">
							<div className="font-semibold">Select Travel Mode:</div>
							<select
								value={travelMode}
								onChange={handleTravelModeChange}
								className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
							>
								<option value="DRIVING">Driving</option>
								<option value="WALKING">Walking</option>
								<option value="BICYCLE">Cycling</option>
								<option value="TRANSIT">Transit</option>
							</select>
						</span>
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
				{/* Transit options */}
				<div className="p-2 sm:m-4">
					{transitOptions.length > 0 && (
						<div>
							<label htmlFor="transit-options" className="font-semibold">
								Transit Options:
							</label>
							<div
								id="transit-options"
								onChange={(e) => console.log("Selected transit option:", e.target.value)}
								className="p-2 sm:m-4"							>
								{transitOptions.map((option, index) => (
									<option key={index} value={index}>
										{`
										Departure Time: ${option.departureTime.toLocaleString()},
										  Arrival Time: ${option.arrivalTime.toLocaleString()}
										  Mode: ${renderVehicleType(option.vehicleType)}
										
										`}
									</option>
								))}
							</div>
						</div>
					)}
				</div>

			</div>
		</div>
	);
}

export default SearchMap;
