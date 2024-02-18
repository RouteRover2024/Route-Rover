import NavBar from "../components/generic/Navbar";

function LandingPage() {
	return (
		<div>
			<NavBar></NavBar>
			<div className="checking h-dvh w-dvw bg-background border-4 border-accent opacity-50 flex items-center justify-center text-4xl text-primary">
				Section1
			</div>
			<div className="checking h-dvh w-dvw bg-background border-4 border-accent opacity-50 flex items-center justify-center text-4xl text-primary">
				Section2
			</div>
			<div className="checking h-dvh w-dvw bg-background border-4 border-accent opacity-50 flex items-center justify-center text-4xl text-primary">
				Section3
			</div>
		</div>
	);
}

export default LandingPage;
