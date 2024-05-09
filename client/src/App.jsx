// App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import SearchMap from "./pages/SearchMap";
import History from "./pages/History";
import Reports from "./pages/Reports";
import Addresses from "./pages/Addresses";
import Settings from "./pages/Settings";
import { DataProvider } from "./context/DataContext";

function App() {
	return (
		<DataProvider>
			<Router>
				<Routes>
					<Route exact path="/" element={<SignIn />} />
					<Route path="/home" element={<HomePage />}>
						<Route path="" element={<Dashboard />} />
						<Route path="create" element={<SearchMap />} />
						<Route path="history" element={<History />} />
						<Route path="reports" element={<Reports />} />
						<Route path="addresses" element={<Addresses />} />
						<Route path="settings" element={<Settings />} />
					</Route>
				</Routes>
			</Router>
		</DataProvider>
	);
}

export default App;
