import React, { useRef, useState, useEffect } from "react";
// import { gmapkey } from "../../../server/app";
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
	DirectionsRenderer,
} from "@react-google-maps/api";


const center = { lat: 19.099279618216062, lng: 72.86539675765846 };

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
		googleMapsApiKey: "api_key_here",
		libraries: libraries,
	});

	const [map, setMap] = useState(null);
	const [directionsResponse, setDirectionsResponse] = useState(null);
	const [routesInfo, setRoutesInfo] = useState([]);
	const [transitOptions, setTransitOptions] = useState([]);
	const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
	const [travelMode, setTravelMode] = useState("DRIVING");
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
				provideRouteAlternatives: true,
				avoidFerries: false,
				avoidHighways: false,
				avoidTolls: false,
			});

			if (results.status === "OK") {
				setDirectionsResponse(results);

				const routesInfo = results.routes.map((route, index) => ({
					summary: route.summary,
					fare: route?.fare,
					distance: route.legs[0].distance.text,
					duration: route.legs[0].duration.text,
					index: index,
				}));
				setRoutesInfo(routesInfo);

				if (travelMode === "TRANSIT") {
					const transitOptions = extractTransitOptions(results);
					setTransitOptions(transitOptions);
				} else {
					setTransitOptions([]);
				}
			} else {
				console.error("Error fetching route:", results.status);
				setDirectionsResponse(null);
				setTransitOptions([]);
			}
		} catch (error) {
			console.error("An error occurred during route calculation:", error);
			setDirectionsResponse(null);
			setTransitOptions([]);
		}
	}

	function extractTransitOptions(directionsResponse) {
		const routes = directionsResponse.routes;
		let options = [];

		routes.forEach((route) => {
			const legs = route.legs;
			legs.forEach((leg) => {
				const steps = leg.steps;
				steps.forEach((step) => {
					if (step.transit && step.transit.line && step.transit.line.vehicle) {
						const vehicleType = step.transit.line.vehicle.type;
						const departureTime = new Date(step.transit.departure_time.value);
						const arrivalTime = new Date(step.transit.arrival_time.value);
						const instructions = step.instructions;
						const fare = route.fare;
						const num_stops = step.transit.num_stops;
						const transitLine = step.transit.line;
						options.push({
							vehicleType: vehicleType,
							departureTime: departureTime,
							arrivalTime: arrivalTime,
							instructions: instructions,
							fare: fare,
							num_stops: num_stops,
							transitLine: transitLine,
						});
					}
				});
			});
		});

		return options;
	}

	function clearRoute() {
		setDirectionsResponse(null);
		setRoutesInfo([]);
		originRef.current.value = "";
		destinationRef.current.value = "";
	}

	function handleRouteSelect(index) {
		setSelectedRouteIndex(index);
	}

	console.log("transitOptions", transitOptions);
	console.log("routesInfo", routesInfo);
	console.log("directionsResponse", directionsResponse);

	return (
		<div className="pt-6">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				<h1 className="text-3xl font-semibold text-gray-900">New Journey</h1>
			</div>
			{/* Map */}
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
							routeIndex={selectedRouteIndex}
						/>
					)}
				</GoogleMap>
			</div>
			{/* Inputs and Controls */}
			<div className="p-2 sm:m-4">
				<div className="py-2 px-2 flex flex-col sm:flex-row items-center flex-wrap w-full">
					<div className="min-w-[300px]">
						<input
							type="text"
							placeholder="Origin"
							ref={originRef}
							className="w-full block rounded-md focus:ring-slate-500 focus:border-slate-500 text-sm px-4 py-2 my-2 border-zinc-300 border-2"
							onChange={handleOriginInputChange}
						/>
					</div>
					<div className="min-w-[300px]">
						<input
							type="text"
							placeholder="Destination"
							ref={destinationRef}
							className="w-full block rounded-md focus:ring-slate-500 focus:border-slate-500 text-sm px-4 py-2 my-2 border-zinc-300 border-2"
							onChange={handleDestinationInputChange}
						/>
					</div>
				</div>
				{/* Route Options */}
				<div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-4">
					{routesInfo.map((route, index) => (
						<div
							key={index}
							className={`p-2 border border-gray-300 rounded-md cursor-pointer ${selectedRouteIndex === index
								? "bg-gray-100"
								: "hover:bg-gray-100"
								}`}
							onClick={() => handleRouteSelect(route.index)}
						>
							<p className="font-semibold">Route {index + 1}</p>
							{travelMode != "TRANSIT" && (
								<p>Summary: {route.summary}</p>
							)}

						</div>
					))}
				</div>
				{/* Travel Mode Selector */}
				<div className="flex flex-row items-center gap-4 sm:gap-8 mt-4">
					<div className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
						<FaRoad />
					</div>
					<div className="flex flex-row gap-4 items-center">
						<div className="font-semibold">Select Travel Mode:</div>
						<select
							value={travelMode}
							onChange={handleTravelModeChange}
							className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
						>
							<option value="DRIVING">Driving</option>
							<option value="WALKING">Walking</option>
							<option value="BICYCLING">Cycling</option>
							<option value="TRANSIT">Transit</option>
						</select>
					</div>
					<div className="font-semibold">
						Distance:{" "}
						{routesInfo[selectedRouteIndex]
							? routesInfo[selectedRouteIndex].distance
							: ""}
					</div>
				</div>
				{/* Other Controls */}
				<div className="flex flex-row items-center gap-4 sm:gap-8 mt-4">
					<div className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
						<FaMapMarkerAlt />
					</div>
					<div className="font-semibold">
						Duration:{" "}
						{routesInfo[selectedRouteIndex]
							? routesInfo[selectedRouteIndex].duration
							: ""}
					</div>
					<div className="flex gap-8 justify-evenly">
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
			{/* Transit options */}

			<div className="p-2 sm:m-4">
				{transitOptions.length > 0 && (
					<div>
						<label htmlFor="transit-options" className="font-semibold">
							Transit Options:
						</label>
						<div
							id="transit-options"
							onChange={(e) =>
								console.log("Selected transit option:", e.target.value)
							}
							className="p-2 sm:m-4"
						>
							{transitOptions
								.sort((a, b) => a.departureTime - b.departureTime) // Sort by departure time

								.map((option, index) => (
									<div key={index}>
										<p>Departure Time: {option.departureTime.toLocaleString()}</p>
										<p>Arrival Time: {option.arrivalTime.toLocaleString()}</p>
										<p>Mode: {renderVehicleType(option.vehicleType)}</p>
										<p>Instructions: {option.instructions}</p>
										{option?.fare && option?.num_stops && (
											<div>
												<p>Fare: {option.fare.text}</p>
												<p>Currency: {option.fare.currency}</p>
												<p>Total Number of stops: {option.num_stops}</p>
											</div>
										)}

										{option?.transitLine.vehicle && (
											<div>
												<img src={option.transitLine.vehicle.icon} alt="Vehicle Icon" />
												<p>Vehicle Type: {option.transitLine.vehicle.name}</p>
												<p>Vehicle Name: {option.transitLine.name}</p>
											</div>
										)}
									</div>
								))}
						</div>
					</div>
				)}
				<div className="p-2 sm:m-4">
					<div className="font-semibold">Transit Agencies:</div>
					{transitOptions.length > 0 && (
						<div>
							{transitOptions
								.reduce((acc, option) => {
									const existingVehicleType = acc.find(item => item.vehicleType === option.vehicleType);								
									if (!existingVehicleType) {
										acc.push(option);
										return acc;
									}
									return acc;
								}, [])
								.map((option, index) => (
									<div key={index}>
										<div>
											<p>Transit Agency Name: {option?.transitLine.agencies[0].name}</p>
											<p>Transit Agency Phone: {option?.transitLine.agencies[0].phone}</p>
											<p>Transit Agency URL: <a href={option?.transitLine.agencies[0].url}>{option?.transitLine.agencies[0].url}</a></p>

										</div>
									</div>
								))}
						</div>
					)}
				</div>

			</div>
		</div>
	);
}

export default SearchMap;
