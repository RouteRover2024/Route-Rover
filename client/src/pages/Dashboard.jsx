const routes = [
	{
		starting_point: "Vashi",
		destination: "Kharghar",
		date: "1st January 2024",
		mode_of_travel: "Cab",
	},
	{
		starting_point: "Santakruz",
		destination: "Andheri",
		date: "2nd February 2024",
		mode_of_travel: "Train",
	},
	{
		starting_point: "Versova",
		destination: "Marol Naka",
		date: "3rd March 2024",
		mode_of_travel: "Metro",
	},
	// More routes...
];

function Dashboard() {
	return (
		<div className="py-6">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				<h1 className="text-3xl font-semibold text-gray-900">
					Dashboard
				</h1>
			</div>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8">
				<div className="py-4">
					<div className="px-4 sm:px-6 lg:px-8">
						<div className="sm:flex sm:items-center">
							<div className="sm:flex-auto">
								<h1 className="text-xl font-semibold text-gray-900">
									Previously Searched
								</h1>
								<p className="mt-2 text-sm text-gray-700">
									A list of the most recent journeys.
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
														Mode of Travel
													</th>
													<th
														scope="col"
														className="relative py-3 pl-3 pr-4 sm:pr-6"
													>
														<span className="sr-only">
															View
														</span>
													</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-gray-200 bg-white">
												{routes.map((person) => (
													<tr key={person.date}>
														<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
															{
																person.starting_point
															}
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															{person.destination}
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															{person.date}
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															{
																person.mode_of_travel
															}
														</td>
														<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
															<a
																href="#"
																className="text-indigo-600 hover:text-indigo-900"
															>
																View
																<span className="sr-only">
																	,
																	{
																		person.starting_point
																	}
																</span>
															</a>
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
