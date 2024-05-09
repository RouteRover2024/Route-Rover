import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Skeleton from "./Skeleton";

const SignIn = React.lazy(() => import("./SignIn"));
const HomePage = React.lazy(() => import("./HomePage"));
const Dashboard = React.lazy(() => import("./Dashboard"));
const History = React.lazy(() => import("./History"));
const Reports = React.lazy(() => import("./Reports"));
const Addresses = React.lazy(() => import("./Addresses"));
const Settings = React.lazy(() => import("./Settings"));
const Error = React.lazy(() => import("./Error"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Skeleton/>}>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/NotFound" element={<Error />} />
          <Route path="/home" element={<HomePage />}>
            <Route path="" element={<Dashboard />} />
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
