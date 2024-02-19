import NavBar from "../components/generic/Navbar";

function LandingPage() {
	return (
		<div>
			<NavBar></NavBar>
			<div id="home" className="landing-section">
				Home
			</div>
			<div id="features" className="landing-section">
				Features
			</div>
			<div id="details" className="landing-section">
				Details
			</div>
			<div id="aboutus" className="landing-section">
				About us
			</div>
		</div>
	);
}

export default LandingPage;
