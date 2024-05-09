import { useRef, useState, useEffect } from "react";
// import { gmapkey } from "../../../server/app";
import { FaTimes, FaLocationArrow } from "react-icons/fa";
import { CiSaveUp1 } from "react-icons/ci";
import { TbHistory, TbHistoryOff } from "react-icons/tb";
import axios from "axios";

import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	DirectionsRenderer,
} from "@react-google-maps/api";
import HistTable from "./HistTable";

const center = { lat: 19.099279618216062, lng: 72.86539675765846 };

const libraries = ["places"];
//const google = window.google
// function debounce(func, delay) {
// 	let timer;
// 	return function (...args) {
// 		clearTimeout(timer);
// 		timer = setTimeout(() => {
// 			func.apply(this, args);
// 		}, delay);
// 	};
// }

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
	const googleMapsApiKey = import.meta.env.VITE_MAPS_API;

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: googleMapsApiKey,
		libraries: libraries,
	});

	const [map, setMap] = useState(null);
	const [directionsResponse, setDirectionsResponse] = useState(null);
	const [routesInfo, setRoutesInfo] = useState([]);
	const [transitOptions, setTransitOptions] = useState([]);
	const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
	const [travelMode, setTravelMode] = useState("DRIVING");
	// Define state for pagination
	const [currentPageTransit, setCurrentPageTransit] = useState(1);
	const transitPerPage = 6; // Adjust this number as per your preference

	// Calculate index of the last transit option on current page
	const indexOfLastTransit = currentPageTransit * transitPerPage;
	// Calculate index of the first transit option on current page
	const indexOfFirstTransit = indexOfLastTransit - transitPerPage;
	// Get transit options for the current page
	const currentTransitOptions = transitOptions.slice(
		indexOfFirstTransit,
		indexOfLastTransit
	);

	// Function to handle page change for transit options
	const paginateTransit = (pageNumber) => setCurrentPageTransit(pageNumber);

	const originRef = useRef();
	const destinationRef = useRef();

	// State to hold saved addresses
	const [savedAddresses, setSavedAddresses] = useState([]);
	const [src, setSrc] = useState("");
	const [dest, setDest] = useState("");
	const [data, setData] = useState([]);

	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};


	useEffect(() => {
		const addressesData = JSON.parse(localStorage.getItem("addresses"));
		if (addressesData) {
			const addressesArray = [];
			for (const key in addressesData) {
				if (Object.hasOwnProperty.call(addressesData, key)) {
					addressesArray.push(addressesData[key]);
				}
			}
			setSavedAddresses(addressesArray);
		}
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

	// const debouncedSearch = debounce((searchTerm) => {
	// 	console.log("Searching with term:", searchTerm);
	// }, 700);

	// const handleOriginInputChange = (event) => {
	// 	debouncedSearch(event.target.value);
	// };

	// const handleDestinationInputChange = (event) => {
	// 	debouncedSearch(event.target.value);
	// };

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

				const routesInfo = results.routes?.map((route, index) => ({
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
					if (
						step.transit &&
						step.transit.line &&
						step.transit.line.vehicle
					) {
						const vehicleType = step.transit.line.vehicle.type;
						const departureTime = new Date(
							step.transit.departure_time.value
						);
						const arrivalTime = new Date(
							step.transit.arrival_time.value
						);
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

	const saveHistory = async (e) => {
		e.preventDefault();

		// Check if route is available before accessing properties
		if (routesInfo[selectedRouteIndex]) {
			const route = routesInfo[selectedRouteIndex];
			let { distance, duration, fare } = route;
			fare = fare ? fare.text : '';

			try {
				await axios
					.post("http://localhost:6005/", {
						src,
						dest,
						fare: fare,
						distance,
						duration,
					})
					.then((res) => {
						if (res.data === "failed") {
							alert("Failed to save data!");
						} else {

							setData(res.data);
							console.log(res);

						}
					});
				console.log("Route saved successfully!");
			} catch (err) {
				console.error("Error saving route:", err);
			}
		} else {
			console.error("No route selected for saving");
		}
	};
	return (
		<div className="mt-6 ">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				<h1 className="text-3xl font-semibold text-gray-900">
					New Journey
				</h1>
			</div>
			{/* Map */}
			<div className="flex flex-col md:flex-row p-2 md:p-4 gap-4 w-full justify-center mt-4">
				<div className="rounded-md lg:w-[70%] sm:min-w-[450px] min-w-[325px]">
					<GoogleMap
						center={center}
						zoom={15}
						mapContainerStyle={{
							height: "400px",
							borderRadius: "6px",
						}}
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
				<div className="flex flex-col items-center justify-between sm:gap-4 gap-2 bg-gradient-to-r from-gray-800 to-gray-700 rounded-md p-4">
					<form action="POST">
						<input
							type="text"
							placeholder="Origin"
							ref={originRef}
							className="w-full block rounded-md focus:ring-purple-500 focus:border-purple-500 text-sm px-4 py-2 my-1 border-gray-600 border-2 font-bold font-mono bg-gradient-to-r from-gray-700 to-gray-600 text-white bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
							//onChange={handleOriginInputChange}
							list="origin-addresses"
							onChange={(e) => {
								setSrc(e.target.value);
							}}
						/>
						<datalist id="origin-addresses">
							{savedAddresses.map((address, index) => (
								<option key={index} value={address} />
							))}
						</datalist>

						<input
							type="text"
							placeholder="Destination"
							ref={destinationRef}
							className="w-full block rounded-md :ring-purple-500 focus:focusborder-purple-500 text-sm px-4 py-2 my-1 border-gray-600 border-2 font-bold font-mono bg-gradient-to-r from-gray-700 to-gray-600 text-white bg-clip-text"
							//onChange={handleDestinationInputChange}
							list="destination-addresses"
							onChange={(e) => {
								setDest(e.target.value);
							}}
						/>
						<datalist id="destination-addresses">
							{savedAddresses.map((address, index) => (
								<option key={index} value={address} />
							))}
						</datalist>

						<div className="flex flex-row items-center gap-4 sm:gap-8">
							<div className="flex flex-row gap-4 items-center">
								<div className="font-semibold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
									Select Travel Mode
								</div>
								<select
									value={travelMode}
									onChange={handleTravelModeChange}
									className="inline-flex items-center px-4 py-2 border border-gray-600 shadow-sm text-sm rounded-md bg-gradient-to-r from-gray-700 to-gray-600 text-white bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-500 focus:ring-purple-500 focus:border-purple-500 font-medium font-mono appearance-none outline-none">
									<option value="DRIVING">Driving</option>
									<option value="WALKING">Walking</option>
									<option value="BICYCLING">Cycling</option>
									<option value="TRANSIT">Transit</option>
								</select>
							</div>
						</div>

						<div className="flex flex-row justify-evenly items-center w-full sm:mt-auto mt-2 mb-2">
							<button
								type="button"
								onClick={calculateRoute}
								className="row-span-2 inline-flex items-center px-4 py-2 border-transparent shadow-sm text-sm font-medium rounded-md bg-gradient-to-r from-green-600 to-green-700 hover:bg-gradient-to-r hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
							>
								<span className="text-white">
									Calculate Route
								</span>
							</button>
							<button
								type="button"
								onClick={saveHistory}
								className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-300 p-1 rounded-full"
							>
								<span className="text-white"><CiSaveUp1 /></span>
							</button>
							<button
								type="button"
								onClick={clearRoute}
								title="Clear Route"
								className="inline-flex items-center p-2 border-transparent rounded-full shadow-sm bg-gradient-to-r from-rose-600 to-rose-700 hover:bg-gradient-to-r hover:from-rose-700 hover:to-rose-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
							>
								<FaTimes className="text-white" />
							</button>
							<button
								type="button"
								className="inline-flex items-center p-2 border-transparent rounded-full shadow-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:bg-gradient-to-r hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
								onClick={() => {
									map.panTo(center);
									map.setZoom(15);
								}}
								title="ReLocate"
							>
								<FaLocationArrow className="text-white" />
							</button>
						</div>
					</form>
				</div>
			</div>
			{/* Transit options */}
			<div className="p-2 sm:mx-4">
				{/* Route Options */}
				<div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-4 px-4 overflow-auto">
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
				<div className="flex flex-col items-start gap-1 sm:gap-2 p-2 sm:m-4">
					<div className="font-semibold">
						Duration:{" "}
						{routesInfo[selectedRouteIndex]
							? routesInfo[selectedRouteIndex].duration
							: ""}
					</div>
					<div className="font-semibold">
						Distance:{" "}
						{routesInfo[selectedRouteIndex]
							? routesInfo[selectedRouteIndex].distance
							: ""}
					</div>
				</div>

				<hr className="border-1 border-black my-2" />
				{transitOptions.length > 0 && (
					<div>
						<label
							htmlFor="transit-options"
							className="font-semibold text-white"
						>
							Transit Options
						</label>
						<div
							id="transit-options"
							onChange={(e) =>
								console.log(
									"Selected transit option:",
									e.target.value
								)
							}
							className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2"
						>
							{currentTransitOptions.map((option, index) => (
								<div
									key={index}
									className="bg-gray-700 rounded-lg shadow-lg overflow-hidden p-4"
								>
									{option?.transitLine.vehicle && (
										<div className="flex items-center gap-2">
											<img
												src={
													option.transitLine.vehicle
														.icon
												}
												alt="Vehicle Icon"
												className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 p-1 rounded-full"
											/>
											<div>
												<p className="text-white font-semibold">
													{renderVehicleType(
														option.vehicleType
													)}
												</p>
												<p className="text-gray-400 text-sm">
													{option.transitLine?.name}
												</p>
											</div>
										</div>
									)}
									<div className="flex items-center justify-between">
										<span className="font-bold text-white">
											{option.departureTime.toLocaleTimeString(
												[],
												{
													hour: "2-digit",
													minute: "2-digit",
												}
											)}
										</span>
										<span className="font-bold text-white">
											{option.arrivalTime.toLocaleTimeString(
												[],
												{
													hour: "2-digit",
													minute: "2-digit",
												}
											)}
										</span>
									</div>
									<p className="text-gray-400 text-sm">
										{option.instructions}
									</p>
									{option?.fare && option?.num_stops && (
										<div className="text-white">
											<p>
												<span className="font-bold">
													{option.fare.text}
												</span>
											</p>
											<p className="font-light text-sm">
												Total Number of stops:{" "}
												{option?.num_stops}
											</p>
										</div>
									)}
								</div>
							))}
						</div>
						{/* Pagination controls */}
						<div className="flex justify-center items-center mt-4">
							<ul className="flex list-none gap-2">
								{Array.from({
									length: Math.ceil(
										transitOptions.length / transitPerPage
									),
								}).map((_, index) => (
									<li key={index}>
										<button
											className={`px-3 py-1 rounded-md ${currentPageTransit === index + 1
												? "bg-gray-400"
												: "bg-gray-200"
												}`}
											onClick={() =>
												paginateTransit(index + 1)
											}
										>
											{index + 1}
										</button>
									</li>
								))}
							</ul>
						</div>
					</div>
				)}

				{/* Accordin */}
				<div className="mt-8">
					<div className="bg-white rounded-lg shadow-md overflow-hidden">
						<div className="border-s">
							<button
								type="button"
								className="flex w-full items-center justify-between px-4 py-3 text-left text-gray-900"
								onClick={toggleAccordion}
							>
								<span className="text-lg font-medium">View History</span>
								{isOpen ? (
									<TbHistory className="h-5 w-5 text-gray-500" />
								) : (
									<TbHistoryOff className="h-5 w-5 text-gray-500" />
								)}
							</button>
						</div>
						{isOpen && (
							<div className="p-4">
								<HistTable data={data} />
							</div>
						)}
					</div>
				</div>
				{/* Transit */}
				<div className="p-2 sm:m-4">
					<div className="font-semibold mb-4">Transit Agencies:</div>
					{transitOptions.length > 0 && (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
							{transitOptions
								.reduce((acc, option) => {
									const existingVehicleType = acc.find(
										(item) => item.vehicleType === option.vehicleType
									);
									if (!existingVehicleType) {
										acc.push(option);
										return acc;
									}
									return acc;
								}, [])
								.map((option, index) => (
									<div
										key={index}
										className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col justify-between"
									>
										<div>
											<p className="text-white font-semibold mb-2">
												{option?.transitLine.agencies[0].name}
											</p>
											<p className="text-gray-300 mb-2">
												<span className="font-semibold">Phone:</span>{" "}
												{option?.transitLine.agencies[0].phone}
											</p>
											<button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-100/10 dark:shadow-lg dark:shadow-blue-200/20 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
												onClick={() => window.open(option?.transitLine.agencies[0].url, "_blank")}
											>
											
												Visit Website
											</button>
										</div>
										{/* <div>
											<div
												className={`bg-${option.vehicleType === "BUS"
													? "purple-700"
													: option.vehicleType === "TRAIN"
														? "green-700"
														: "orange-700"
													} text-white px-4 py-2 rounded-md flex items-center justify-center mt-4`}
											>
												<span className="uppercase font-semibold">
													{option.vehicleType}
												</span>
											</div>
										</div> */}
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
