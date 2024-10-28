import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { Skeleton } from "@chakra-ui/react";
import About from "./pages/About";

const SignIn = React.lazy(() => import("./pages/SignIn"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const SearchMap = React.lazy(() => import("./pages/SearchMap"));
const History = React.lazy(() => import("./pages/History"));
const Reports = React.lazy(() => import("./pages/Reports"));
const Addresses = React.lazy(() => import("./pages/Addresses"));
const Settings = React.lazy(() => import("./pages/Settings"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const LandingPage = React.lazy(()=>import("./pages/LandingPage"));
const News = React.lazy(()=>import("./pages/About"));

function App() {
	return (
		<Router>
			<Suspense fallback={<Skeleton />}>
				<Routes>
					<Route exact path="/" element={<LandingPage/>} />
					<Route path="/signin" element={<SignIn />}/>
					<Route path="/home" element={<HomePage />}>
						<Route path="" element={<Dashboard />} />
						<Route path="create" element={<SearchMap />} />
						<Route path="history" element={<History />} />
						<Route path="reports" element={<Reports />} />
						<Route path="about" element={<About />} />
						<Route path="addresses" element={<Addresses />} />
						<Route path="settings" element={<Settings />} />
						<Route path="*" element={<NotFound link="/home" />} />
					</Route>
					<Route path="*" element={<NotFound link="/" />} />
				</Routes>
			</Suspense>
		</Router>
	);
}

export default App;
