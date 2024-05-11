import { Link } from "react-router-dom";

const routes = [
	{
		source: "Vashi",
		destination: "Kharghar",
		date: "1st January 2024",
		duration: "1hr",
		distance: "20km",
		cost: 100,
	},
	{
		source: "Santacruz",
		destination: "Andheri",
		date: "2nd February 2024",
		duration: "1hr 7mins",
		distance: "20km",
		cost: 20,
	},
	{
		source: "Versova",
		destination: "Marol Naka",
		date: "3rd March 2024",
		duration: "20mins",
		distance: "20km",
		cost: 40,
	},
	// More routes...
];

const mostFrequentSource = "Downtown"; // Replace with actual data
const mostFrequentDestination = "Central Park"; // Replace with actual data
const totalDuration = "10hrs 7mins"; // Replace with actual data
const totalDistance = "89km"; // Replace with actual data
const totalCost = 1452; // Replace with actual data (number)

function Dashboard() {
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
								{totalCost}
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
												{routes.map((person) => (
													<tr key={person.date}>
														<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
															{person.source}
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															{person.destination}
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															{person.date}
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															{person.distance}
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															{person.duration}
														</td>
														<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm text-green-500 font-medium sm:pr-6">
															{person.cost}
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
