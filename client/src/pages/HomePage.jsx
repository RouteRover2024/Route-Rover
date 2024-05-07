// HomePage.jsx
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import RouteRover from "../assets/RouteRoverLogoText.svg";
import axios from "axios";

import {
	ChartBarIcon,
	FolderIcon,
	HomeIcon,
	MenuIcon,
	XIcon,
	OfficeBuildingIcon,
	PlusCircleIcon,
} from "@heroicons/react/outline";

import { Link, Outlet, useNavigate } from "react-router-dom";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Example() {
	const navigate = useNavigate();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [userdata, setUserdata] = useState({});


	const getUser = async () => {
		try {
			const response = await axios.get(
				"http://localhost:6005/login/success",
				{ withCredentials: true }
			);
			setUserdata(response.data.user);
		} catch (error) {
			console.log("Error", error);
			navigate("/NotFound");
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	const navigation = [
		{ name: "Dashboard", to: "", icon: HomeIcon, current: true },
		{
			name: "New Search",
			to: "create",
			icon: PlusCircleIcon,
			current: true,
		},
		{ name: "History", to: "history", icon: FolderIcon, current: false },
		// { name: "Reports", to: "reports", icon: ChartBarIcon, current: false },
		{
			name: "Addresses",
			to: "addresses",
			icon: OfficeBuildingIcon,
			current: false,
		},
	];

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
							<div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-700">
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
											src={RouteRover}
											alt="RouteRover"
										/>
									</div>
									<nav className="mt-5 px-2 space-y-1">
										{navigation.map((item) => (
											<Link
												key={item.name}
												to={item.to}
												className={classNames(
													"text-white hover:bg-slate-500 hover:bg-opacity-75",
													"group flex items-center px-2 py-2 text-base font-medium rounded-md"
												)}
											>
												<item.icon
													className="mr-4 flex-shrink-0 h-6 w-6 text-slate-500"
													aria-hidden="true"
												/>
												{item.name}
											</Link>
										))}
									</nav>
								</div>
								<div className="flex-shrink-0 flex border-t border-slate-300 p-4">
									<Link
										to="settings"
										className="flex-shrink-0 group block"
									>
										<div className="flex items-center">
											<div>
												<img
													className="inline-block h-10 w-10 rounded-full"
													src={userdata?.image}
													alt=""
												/>
											</div>
											<div className="ml-3">
												<p className="text-base font-medium text-white">
													{userdata?.displayName}
												</p>
												<p className="text-sm font-medium text-slate-300 group-hover:text-white">
													View profile
												</p>
											</div>
										</div>
									</Link>
								</div>
							</div>
						</Transition.Child>
						<div
							className="flex-shrink-0 w-14"
							aria-hidden="true"
						></div>
					</Dialog>
				</Transition.Root>

				<div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
					<div className="flex-1 flex flex-col min-h-0 bg-slate-700">
						<div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
							<div className="flex items-center flex-shrink-0 px-4">
								<img
									className="h-8 w-auto"
									src={RouteRover}
									alt="RouteRover"
								/>
							</div>
							<nav className="mt-5 flex-1 px-2 space-y-1">
								{navigation.map((item) => (
									<Link
										key={item.name}
										to={item.to}
										className={classNames(
											"text-white hover:bg-slate-500 hover:bg-opacity-75",
											"group flex items-center px-2 py-2 text-sm font-medium rounded-md"
										)}
									>
										<item.icon
											className="mr-3 flex-shrink-0 h-6 w-6 text-slate-500"
											aria-hidden="true"
										/>
										{item.name}
									</Link>
								))}
							</nav>
						</div>
						<div className="flex-shrink-0 flex border-t border-slate-300 p-4">
							<Link
								to="settings"
								className="flex-shrink-0 w-full group block"
							>
								<div className="flex items-center">
									<div>
										<img
											className="inline-block h-9 w-9 rounded-full"
											src={userdata?.image}
											alt=""
										/>
									</div>
									<div className="ml-3">
										<p className="text-sm font-bold text-white">
											{userdata?.displayName}
										</p>
										<p className="text-xs font-medium text-slate-300 group-hover:text-white">
											View profile
										</p>
									</div>
								</div>
							</Link>
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
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
}
