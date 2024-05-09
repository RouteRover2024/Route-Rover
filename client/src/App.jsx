import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { Skeleton } from "@chakra-ui/react";

const SignIn = React.lazy(() => import("./pages/SignIn"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const SearchMap = React.lazy(() => import("./pages/SearchMap"));
const History = React.lazy(() => import("./pages/History"));
const Reports = React.lazy(() => import("./pages/Reports"));
const Addresses = React.lazy(() => import("./pages/Addresses"));
const Settings = React.lazy(() => import("./pages/Settings"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Skeleton/>}>
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
      </Suspense>
    </Router>
  );
}

export default App;
