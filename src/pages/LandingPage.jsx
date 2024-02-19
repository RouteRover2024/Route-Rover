import NavBar from "../components/generic/Navbar";

function LandingPage() {
	return (
		<div>
			<NavBar></NavBar>
			<div
				id="home"
				className="landing-section grid grid-rows-2 grid-cols-none md:grid-cols-2 md:grid-rows-none place-items-center "
			>
				<section className="text-primary-background">
					Left Section
				</section>
				<section className=" text-foreground">Right Section</section>
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
