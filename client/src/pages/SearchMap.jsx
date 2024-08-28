/*global google*/
import { useRef, useState, useEffect } from "react";
import { FaTimes, FaMapMarkerAlt } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import axios from "axios";

import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	DirectionsRenderer,
} from "@react-google-maps/api";

const center = { lat: 19.099279618216062, lng: 72.86539675765846 };

const libraries = ["places"];

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
	// Message / Notif
	const [message, setMessage] = useState("");
	const [messageColor, setMessageColor] = useState("");
	const [disabled, setDisable] = useState(true);
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
		return (
			<div className="h-screen w-full flex items-center justify-center">
				<h1 className="text-4xl font-semibold animate-pulse">
					Loading...
				</h1>
			</div>
		);
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
			setMessage("Calculating Route");
			setMessageColor(
				"text-white bg-gradient-to-r from-blue-500 to-blue-700"
			);
			setTimeout(() => setMessage(""), 3000);

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
				console.log(results);
			if (results.status === "OK") {
				setDirectionsResponse(results);
				setDisable(false);

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
					console.log(transitOptions);
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
		setMessage("Cleared Route");
		setMessageColor(
			"text-white bg-gradient-to-r from-rose-500 to-rose-700"
		);
		setTimeout(() => setMessage(""), 3000);
	}

	function handleRouteSelect(index) {
		setSelectedRouteIndex(index);
	}

	const saveHistory = async (e) => {
		e.preventDefault();

		setMessage("Saving Route...");
		setMessageColor(
			"text-white bg-gradient-to-r from-green-500 to-green-700"
		);
		setTimeout(() => setMessage("Route Saved!"), 3000);
		setTimeout(() => setMessage(""), 5000);

		// Check if route is available before accessing properties
		if (routesInfo[selectedRouteIndex]) {
			const route = routesInfo[selectedRouteIndex];
			let { distance, duration, fare } = route;
			fare = fare ? fare.text : "";

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
							alert("Route saved successfully!");


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
				<h1 className="text-3xl font-semibold text-slate-900">
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
				<div className="flex flex-col items-center justify-between sm:gap-4 gap-2 bg-gradient-to-r from-slate-800 to-slate-700 rounded-md p-4">
					<form action="POST" className="h-full flex flex-col">
						<input
							type="text"
							placeholder="Origin"
							ref={originRef}
							className="w-full block rounded-md focus:ring-purple-500 focus:border-purple-500 text-sm px-4 py-2 my-1 border-slate-600 border-2 font-bold font-mono bg-gradient-to-r from-slate-700 to-slate-600 text-white bg-clip-text"
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
							className="w-full block rounded-md :ring-purple-500 focus:focusborder-purple-500 text-sm px-4 py-2 my-1 border-slate-600 border-2 font-bold font-mono bg-gradient-to-r from-slate-700 to-slate-600 text-white bg-clip-text"
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
							<div className="flex flex-row gap-4 items-center mt-2">
								<div className="font-semibold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
									Select Travel Mode
								</div>
								<select
									value={travelMode}
									onChange={handleTravelModeChange}
									className="inline-flex items-center px-4 py-2 border border-slate-600 shadow-sm text-sm rounded-md bg-gradient-to-r from-slate-700 to-slate-600 text-white bg-clip-text /* Remove conflicting styles */ hover:bg-gradient-to-r hover:from-slate-600 hover:to-slate-500 focus:ring-purple-500 focus:border-purple-500 font-medium font-mono appearance-none outline-none"
								>
									<option
										className="text-black"
										value="DRIVING"
									>
										Driving
									</option>
									<option
										className="text-black"
										value="WALKING"
									>
										Walking
									</option>
									<option
										className="text-black"
										value="BICYCLING"
									>
										Cycling
									</option>
									<option
										className="text-black"
										value="TRANSIT"
									>
										Transit
									</option>
								</select>
							</div>
						</div>

						<div className="flex flex-col justify-evenly items-center w-full sm:mt-auto mt-2 mb-2 gap-2">
							{message && (
								<div
									className={`mt-auto visible w-full text-center rounded-xl py-1 px-2 font-bold ${messageColor}`}
								>
									{message}
								</div>
							)}
							<div className="flex flex-row justify-evenly items-center w-full sm:mt-auto mt-2 mb-2">
								<button
									type="button"
									onClick={calculateRoute}
									className="row-span-2 inline-flex items-center px-4 py-2 border-transparent shadow-sm text-sm font-medium rounded-md bg-gradient-to-r from-blue-600 to-blue-700 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								>
									<span className="text-white">
										Calculate Route
									</span>
								</button>
								<button
									type="button"
									disabled={disabled}
									onClick={saveHistory}
									title="SaveRoute"
									className="inline-flex items-center p-2 border-transparent rounded-full shadow-sm bg-gradient-to-r from-green-600 to-green-700 hover:bg-gradient-to-r hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
								>
									<FaSave className="text-white" />
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
									className="inline-flex items-center p-2 border-transparent rounded-full shadow-sm bg-gradient-to-r from-orange-600 to-orange-700 hover:bg-gradient-to-r hover:from-orange-700 hover:to-orange-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
									onClick={() => {
										map.panTo(center);
										map.setZoom(15);

										setMessage("Relocating Map");
										setMessageColor(
											"text-white bg-gradient-to-r from-orange-500 to-orange-700"
										);
										setTimeout(() => setMessage(""), 3000);
									}}
									title="ReLocate"
								>
									<FaMapMarkerAlt className="text-white" />
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className="p-2 sm:mx-4">
				{/* Route Options */}
				<div className="flex flex-row flex-wrap sm:flex-nowrap py-2 sm:flex-row items-center gap-4 sm:gap-8 mt-2 px-4 overflow-auto">
					{routesInfo.map((route, index) => (
						<div
							key={index}
							className={`p-2 border border-slate-300 rounded-md cursor-pointer ${
								selectedRouteIndex === index
									? "bg-slate-200"
									: "hover:bg-slate-300"
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
									className="bg-slate-700 rounded-lg shadow-lg overflow-hidden p-4"
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
												<p className="text-slate-400 text-sm">
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
									<p className="text-slate-400 text-sm">
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
							<ul className="flex list-none gap-2 text-black font-bold">
								{Array.from({
									length: Math.ceil(
										transitOptions.length / transitPerPage
									),
								}).map((_, index) => (
									<li key={index}>
										<button
											className={`px-3 py-1 rounded-md ${
												currentPageTransit === index + 1
													? "bg-slate-400"
													: "bg-slate-200"
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

				<div className="p-2 sm:m-4">
					<div className="font-semibold mb-4">Transit Agencies:</div>
					{transitOptions.length > 0 && (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
							{transitOptions
								.reduce((acc, option) => {
									const existingVehicleType = acc.find(
										(item) =>
											item.vehicleType ===
											option.vehicleType
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
										className="bg-slate-900 rounded-lg shadow-lg p-4 flex flex-col justify-between"
									>
										<div>
											<p className="text-white font-semibold mb-2">
												{
													option?.transitLine
														.agencies[0].name
												}
											</p>
											<p className="text-slate-300 mb-2">
												<span className="font-semibold">
													Phone:
												</span>{" "}
												{
													option?.transitLine
														.agencies[0].phone
												}
											</p>
											<button
												type="button"
												className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-100/10 dark:shadow-lg dark:shadow-blue-200/20 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
												onClick={() =>
													window.open(
														option?.transitLine
															.agencies[0].url,
														"_blank"
													)
												}
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
