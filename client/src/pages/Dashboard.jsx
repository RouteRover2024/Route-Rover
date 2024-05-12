import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
	const [routes, setRoutes] = useState([]);
	const [isLoading, setIsLoading] = useState(true); // Added state for loading

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"http://localhost:6005/histories"
				);
				setRoutes(response.data);
			} catch (err) {
				console.error("Error fetching history:", err);
			} finally {
				setIsLoading(false); // Set loading to false after fetching (success or error)
			}
		};

		fetchData();
	}, []);

	// Function to calculate total distance traveled
	const calculateTotalDistance = (data) => {
		return data.reduce(
			(acc, route) => acc + parseFloat(route.distance.replace(/,/g, "")),
			0
		); // Sum distances, removing commas for proper calculation
	};

	// Function to calculate total duration of all trips
	const calculateTotalDuration = (data) => {
		const totalMinutes = data.reduce((acc, route) => {
			const minutes = parseInt(route.duration.split(" ")[0]); // Extract minutes from duration string
			return acc + minutes;
		}, 0);

		const hours = Math.floor(totalMinutes / 60);
		const remainingMinutes = totalMinutes % 60;

		return `${hours}hrs ${remainingMinutes}mins`; // Format total duration as "Xhrs Ymins"
	};

	// Function to calculate total cost of all trips
	const calculateTotalCost = (data) => {
		return data.reduce((acc, route) => {
			const cost = parseFloat(route.fare.replace(/₹|\,/g, "")); // Remove currency symbol and commas

			// Check if cost is empty string or "N/A" (case-insensitive)
			if (cost !== "" && cost !== "N/A") {
				return acc + cost;
			} else {
				return acc; // Ignore empty or "N/A" values
			}
		}, 0);
	};

	// Function to find the most frequent source location
	const findMostFrequentSource = (data) => {
		const sourceCounts = {};
		for (const route of data) {
			const source = route.src;
			sourceCounts[source] = (sourceCounts[source] || 0) + 1;
		}

		let mostFrequentSource = null;
		let maxCount = 0;
		for (const source in sourceCounts) {
			if (sourceCounts[source] > maxCount) {
				mostFrequentSource = source;
				maxCount = sourceCounts[source];
			}
		}

		return mostFrequentSource;
	};

	// Function to find the most frequent destination location
	const findMostFrequentDestination = (data) => {
		const destinationCounts = {};
		for (const route of data) {
			const destination = route.dest;
			destinationCounts[destination] =
				(destinationCounts[destination] || 0) + 1;
		}

		let mostFrequentDestination = null;
		let maxCount = 0;
		for (const destination in destinationCounts) {
			if (destinationCounts[destination] > maxCount) {
				mostFrequentDestination = destination;
				maxCount = destinationCounts[destination];
			}
		}

		return mostFrequentDestination;
	};

	const mostFrequentSource = findMostFrequentSource(routes);
	const mostFrequentDestination = findMostFrequentDestination(routes);
	const totalDuration = calculateTotalDuration(routes);
	const totalDistance = calculateTotalDistance(routes).toFixed(1) + " km"; // Format distance with one decimal place
	const totalCost = calculateTotalCost(routes).toFixed(2); // Format cost with two decimal places

	return (
		<div className="py-6">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				<h1 className="text-3xl font-semibold text-gray-900">
					Dashboard
				</h1>
			</div>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8">
				<div className="flex flex-col bg-gradient-to-r from-slate-700 to-indigo-500 rounded-lg shadow-md p-8 text-white">
					<h2 className="text-2xl font-bold text-center hover:text-gray-200 transition duration-300 p-6 pt-2">
						Navigation Summary
					</h2>
					<div className="flex flex-col md:flex-row md:space-x-4 mt-4 gap-8 justify-between">
						<div className="flex flex-col items-center space-y-2 hover:scale-110 transition duration-300 rounded-md py-2 px-4 text-center">
							<span className="text-base font-medium text-slate-300">
								Most Frequent Source
							</span>
							<span className="text-lg font-bold">
								{mostFrequentSource}
							</span>
						</div>
						<div className="flex flex-col items-center space-y-2 hover:scale-110 transition duration-300 rounded-md py-2 px-4 text-center">
							<span className="text-base font-medium text-slate-300">
								Most Frequent Destination
							</span>
							<span className="text-lg font-bold">
								{mostFrequentDestination}
							</span>
						</div>
						<div className="flex flex-col items-center space-y-2 hover:scale-110 transition duration-300 rounded-md py-2 px-4 text-center">
							<span className="text-base font-medium text-slate-300">
								Total Cost
							</span>
							<span className="text-lg font-bold">
								₹{totalCost}
							</span>
						</div>
						<div className="flex flex-col items-center space-y-2 hover:scale-110 transition duration-300 rounded-md py-2 px-4 text-center">
							<span className="text-base font-medium text-slate-300">
								Total Distance
							</span>
							<span className="text-lg font-bold">
								{totalDistance}
							</span>
						</div>
						<div className="flex flex-col items-center space-y-2 hover:scale-110 transition duration-300 rounded-md py-2 px-4 text-center">
							<span className="text-base font-medium text-slate-300">
								Total Duration
							</span>
							<span className="text-lg font-bold">
								{totalDuration}
							</span>
						</div>
					</div>
				</div>

				<div className="py-4">
					<div className="px-4 sm:px-6 lg:px-8">
						<div className="sm:flex sm:items-center">
							<div className="sm:flex-auto flex flex-col mt-4">
								<h1 className="text-xl font-semibold text-gray-900">
									Previously Searched
								</h1>
								<div className="flex flex-col sm:flex-row justify-between sm:items-center">
									<p className="mt-2 text-sm text-gray-700">
										A list of the most recent journeys.
									</p>
									<Link
										to="/home/history"
										className="bg-indigo-500 p-2 w-fit rounded-full text-white font-bold px-4"
									>
										See Complete History
									</Link>
								</div>
							</div>
						</div>
						<div className="mt-8 flex flex-col">
							<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
									<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
										<table className="min-w-full divide-y divide-gray-300">
											<thead className="bg-gray-50">
												<tr>
													<th
														scope="col"
														className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
													>
														Source
													</th>
													<th
														scope="col"
														className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
													>
														Destination
													</th>
													<th
														scope="col"
														className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
													>
														Date
													</th>
													<th
														scope="col"
														className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
													>
														Distance
													</th>
													<th
														scope="col"
														className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
													>
														Duration
													</th>
													<th
														scope="col"
														className="px-3 py-3 pr-6 text-right text-xs font-medium uppercase tracking-wide text-gray-500 sm:pr-6"
													>
														Cost
													</th>
												</tr>
											</thead>
											<tbody>
												{routes
													.slice()
													.reverse()
													.slice(0, 5)
													.map((person) => (
														<tr key={person._id}>
															<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
																{person.src}
															</td>
															<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
																{person.dest}
															</td>
															<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
																{
																	person.time.split(
																		"T"
																	)[0]
																}
															</td>
															<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
																{
																	person.distance
																}
															</td>
															<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
																{
																	person.duration
																}
															</td>
															<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm text-green-500 font-medium sm:pr-6">
																{person.fare}
															</td>
														</tr>
													))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
