// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import HomePage from "./HomePage";
import Dashboard from "./Dashboard";
import History from "./History";
import Reports from "./Reports";
import Addresses from "./Addresses";
import Settings from "./Settings";

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<SignIn />} />
				<Route path="/home" element={<HomePage />}>
					<Route path="" element={<Dashboard />} />
					<Route path="history" element={<History />} />
					<Route path="reports" element={<Reports />} />
					<Route path="addresses" element={<Addresses />} />
					<Route path="settings" element={<Settings />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
