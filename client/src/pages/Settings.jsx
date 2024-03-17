import React from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
	const navigate = useNavigate();
	const logout = () => {
		navigate("/logout");
	};

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
								<button
									type="button"
									onClick={logout}
									className="inline-flex items-center px-4 py-2 mt-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
								>
									Logout
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
