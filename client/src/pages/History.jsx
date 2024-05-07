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
	{
		source: "Borivali",
		destination: "Churchgate",
		date: "4th April 2024",
		duration: "32mins",
		distance: "20km",
		cost: 45,
	},
	{
		source: "Dadar",
		destination: "CSMT",
		date: "5th May 2024",
		duration: "40mins",
		distance: "20km",
		cost: 25,
	},
	{
		source: "Thane",
		destination: "Kalyan",
		date: "6th June 2024",
		duration: "1hr",
		distance: "20km",
		cost: 80,
	},
	{
		source: "Goregaon",
		destination: "Malad",
		date: "7th July 2024",
		duration: "40mins",
		distance: "20km",
		cost: 40,
	},
	{
		source: "Kurla",
		destination: "Ghatkopar",
		date: "8th August 2024",
		duration: "10mins",
		distance: "20km",
		cost: 10,
	},
	{
		source: "Mumbai Central",
		destination: "Mahalaxmi",
		date: "9th September 2024",
		duration: "30mins",
		distance: "20km",
		cost: 50,
	},
	{
		source: "Wadala",
		destination: "Dadar",
		date: "10th October 2024",
		duration: "10mins",
		distance: "20km",
		cost: 25,
	},
];

function History() {
	return (
		<div className="py-6">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				<h1 className="text-3xl font-semibold text-gray-900">
					History
				</h1>
			</div>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8">
				<div className="py-4">
					<div className="px-4 sm:px-6 lg:px-8">
						<div className="sm:flex sm:items-center">
							<div className="sm:flex-auto">
								<h1 className="text-xl font-semibold text-gray-900">
									Searched over time
								</h1>
								<p className="mt-2 text-sm text-gray-700">
									A list of all the routes taken previously
									including their starting point, destination,
									date of travel and the mode of travel.
								</p>
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

export default History;
