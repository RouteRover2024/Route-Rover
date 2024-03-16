import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import {
	ChartBarIcon,
	FolderIcon,
	HomeIcon,
	MenuIcon,
	XIcon,
	OfficeBuildingIcon,
} from "@heroicons/react/outline";

const navigation = [
	{ name: "Dashboard", href: "#", icon: HomeIcon, current: true },
	{ name: "History", href: "#", icon: FolderIcon, current: false },
	{ name: "Reports", href: "#", icon: ChartBarIcon, current: false },
	{
		name: "Addresses",
		href: "#",
		icon: OfficeBuildingIcon,
		current: false,
	},
];

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
		date: "1st January 2024",
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

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Example() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<>
			<div>
				<Transition.Root show={sidebarOpen} as={Fragment}>
					<Dialog
						as="div"
						className="fixed inset-0 flex z-40 md:hidden"
						onClose={setSidebarOpen}
					>
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
						</Transition.Child>
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<div className="relative flex-1 flex flex-col max-w-xs w-full bg-indigo-700">
								<Transition.Child
									as={Fragment}
									enter="ease-in-out duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in-out duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="absolute top-0 right-0 -mr-12 pt-2">
										<button
											type="button"
											className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
											onClick={() =>
												setSidebarOpen(false)
											}
										>
											<span className="sr-only">
												Close sidebar
											</span>
											<XIcon
												className="h-6 w-6 text-white"
												aria-hidden="true"
											/>
										</button>
									</div>
								</Transition.Child>
								<div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
									<div className="flex-shrink-0 flex items-center px-4">
										<img
											className="h-8 w-auto"
											src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
											alt="Workflow"
										/>
									</div>
									<nav className="mt-5 px-2 space-y-1">
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													item.current
														? "bg-indigo-800 text-white"
														: "text-white hover:bg-indigo-600 hover:bg-opacity-75",
													"group flex items-center px-2 py-2 text-base font-medium rounded-md"
												)}
											>
												<item.icon
													className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
													aria-hidden="true"
												/>
												{item.name}
											</a>
										))}
									</nav>
								</div>
								<div className="flex-shrink-0 flex border-t border-indigo-800 p-4">
									<a
										href="#"
										className="flex-shrink-0 group block"
									>
										<div className="flex items-center">
											<div>
												<img
													className="inline-block h-10 w-10 rounded-full"
													src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
													alt=""
												/>
											</div>
											<div className="ml-3">
												<p className="text-base font-medium text-white">
													Tom Cook
												</p>
												<p className="text-sm font-medium text-indigo-200 group-hover:text-white">
													View profile
												</p>
											</div>
										</div>
									</a>
								</div>
							</div>
						</Transition.Child>
						<div className="flex-shrink-0 w-14" aria-hidden="true">
							{/* Force sidebar to shrink to fit close icon */}
						</div>
					</Dialog>
				</Transition.Root>

				{/* Static sidebar for desktop */}
				<div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className="flex-1 flex flex-col min-h-0 bg-indigo-700">
						<div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
							<div className="flex items-center flex-shrink-0 px-4">
								<img
									className="h-8 w-auto"
									src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
									alt="Workflow"
								/>
							</div>
							<nav className="mt-5 flex-1 px-2 space-y-1">
								{navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className={classNames(
											item.current
												? "bg-indigo-800 text-white"
												: "text-white hover:bg-indigo-600 hover:bg-opacity-75",
											"group flex items-center px-2 py-2 text-sm font-medium rounded-md"
										)}
									>
										<item.icon
											className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
											aria-hidden="true"
										/>
										{item.name}
									</a>
								))}
							</nav>
						</div>
						<div className="flex-shrink-0 flex border-t border-indigo-800 p-4">
							<a
								href="#"
								className="flex-shrink-0 w-full group block"
							>
								<div className="flex items-center">
									<div>
										<img
											className="inline-block h-9 w-9 rounded-full"
											src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
											alt=""
										/>
									</div>
									<div className="ml-3">
										<p className="text-sm font-medium text-white">
											Tom Cook
										</p>
										<p className="text-xs font-medium text-indigo-200 group-hover:text-white">
											View profile
										</p>
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
				<div className="md:pl-64 flex flex-col flex-1">
					<div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
						<button
							type="button"
							className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
							onClick={() => setSidebarOpen(true)}
						>
							<span className="sr-only">Open sidebar</span>
							<MenuIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<main className="flex-1">
						<div className="py-6">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
								<h1 className="text-3xl font-semibold text-gray-900">
									Dashboard
								</h1>
							</div>
							<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8">
								{/* Replace with your content */}
								<div className="py-4">
									<div className="px-4 sm:px-6 lg:px-8">
										<div className="sm:flex sm:items-center">
											<div className="sm:flex-auto">
												<h1 className="text-xl font-semibold text-gray-900">
													Previously Searched
												</h1>
												<p className="mt-2 text-sm text-gray-700">
													A list of all the routes
													taken previously including
													their starting point,
													destination, date of travel
													and the mode of travel.
												</p>
											</div>
											<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
												<button
													type="button"
													className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
												>
													Add a Journey
												</button>
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
																		Mode of
																		Travel
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
																{routes.map(
																	(
																		person
																	) => (
																		<tr
																			key={
																				person.date
																			}
																		>
																			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
																				{
																					person.starting_point
																				}
																			</td>
																			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
																				{
																					person.destination
																				}
																			</td>
																			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
																				{
																					person.date
																				}
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
																	)
																)}
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
					</main>
				</div>
			</div>
		</>
	);
}
