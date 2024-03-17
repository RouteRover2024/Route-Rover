import React from "react";
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

function Settings() {
	return (
		<div className="py-6">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				<h1 className="text-3xl font-semibold text-gray-900">
					Settings
				</h1>
			</div>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8">
				<div className="py-4">
					<div className="px-4 sm:px-6 lg:px-8">
						<div className="sm:flex sm:items-center">
							<div className="sm:flex-auto">
								<h1 className="text-xl font-semibold text-gray-900">
									Profile
								</h1>
								<p className="mt-2 text-sm text-gray-700">
									Verify and Alter your data with us
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
