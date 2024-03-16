// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Login";
import SearchMap from "./pages/SearchMap";
import Dashboard from "./components/Dashboard";
import Error from "./components/generic/Error";
import NavBar from "./components/generic/Navbar";


function App() {
	return (
		
		<Router>
			<div className="flex flex-col items-center">
				<NavBar className="z-100" />
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/dashboard" element={<Dashboard />} />
					
					<Route path="/maps" element={<SearchMap />} />
					
					<Route path="*" element={<Error />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
