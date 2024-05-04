import { useState, useEffect } from "react";

function Addresses() {
	// State to hold address data
	const [addressData, setAddressData] = useState({
		home: "",
		work1: "",
		work2: "",
		custom1: "",
		custom2: "",
	});

	// Function to handle input changes
	const handleInputChange = (name, value) => {
		setAddressData({ ...addressData, [name]: value });
	};

	// Function to save data to local storage
	const saveToLocalStorage = () => {
		localStorage.setItem("addresses", JSON.stringify(addressData));
		// Provide feedback that addresses are saved
		setFeedbackMessage("Addresses saved successfully!");
		setTimeout(() => {
			setFeedbackMessage("");
		}, 3000); // Clear feedback message after 3 seconds
	};

	// Function to clear addresses from local storage
	const clearLocalStorage = () => {
		localStorage.removeItem("addresses");
		// Clear addresses from state
		setAddressData({
			home: "",
			work1: "",
			work2: "",
			custom1: "",
			custom2: "",
		});
		// Provide feedback that addresses are cleared
		setFeedbackMessage("Addresses deleted successfully!");
		setTimeout(() => {
			setFeedbackMessage("");
		}, 3000); // Clear feedback message after 3 seconds
	};

	// Function to retrieve data from local storage when component mounts
	useEffect(() => {
		const savedAddresses = localStorage.getItem("addresses");
		if (savedAddresses) {
			setAddressData(JSON.parse(savedAddresses));
		}
	}, []);

	// State to hold feedback message
	const [feedbackMessage, setFeedbackMessage] = useState("");

	return (
		<div className="py-6">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				<h1 className="text-3xl font-semibold text-gray-900">
					Addresses
				</h1>
			</div>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8">
				<div className="py-4">
					<div className="px-4 sm:px-6 lg:px-8">
						<div className="sm:flex sm:items-center">
							<div className="sm:flex-auto">
								<h1 className="text-xl font-semibold text-gray-900">
									Save your addresses here
								</h1>
								{/* Input fields for addresses */}
								<div className="mt-4">
									<input
										type="text"
										placeholder="Home Address"
										className="border rounded-md px-3 py-2 w-full"
										value={addressData.home}
										onChange={(e) =>
											handleInputChange(
												"home",
												e.target.value
											)
										}
									/>
								</div>
								<div className="mt-4">
									<input
										type="text"
										placeholder="Work 1 Address"
										className="border rounded-md px-3 py-2 w-full"
										value={addressData.work1}
										onChange={(e) =>
											handleInputChange(
												"work1",
												e.target.value
											)
										}
									/>
								</div>
								<div className="mt-4">
									<input
										type="text"
										placeholder="Work 2 Address"
										className="border rounded-md px-3 py-2 w-full"
										value={addressData.work2}
										onChange={(e) =>
											handleInputChange(
												"work2",
												e.target.value
											)
										}
									/>
								</div>
								<div className="mt-4">
									<input
										type="text"
										placeholder="Custom 1 Address"
										className="border rounded-md px-3 py-2 w-full"
										value={addressData.custom1}
										onChange={(e) =>
											handleInputChange(
												"custom1",
												e.target.value
											)
										}
									/>
								</div>
								<div className="mt-4">
									<input
										type="text"
										placeholder="Custom 2 Address"
										className="border rounded-md px-3 py-2 w-full"
										value={addressData.custom2}
										onChange={(e) =>
											handleInputChange(
												"custom2",
												e.target.value
											)
										}
									/>
								</div>
								{/* Add input fields for other addresses */}
								<div className="mt-4 flex flex-row gap-4">
									<button
										onClick={saveToLocalStorage}
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
									>
										Save Addresses
									</button>
									<button
										onClick={clearLocalStorage}
										className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
									>
										Clear Addresses
									</button>
								</div>
								{/* Display feedback message */}
								{feedbackMessage && (
									<p className="mt-4 text-green-600">
										{feedbackMessage}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Addresses;
