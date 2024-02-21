import NavBar from "../components/generic/Navbar";
import "./styles/landing.css";
import { ReactTyped } from "react-typed";
import { Button, buttonVariants } from "@/components/ui/button";
import heroasset from "../images/HeroAsset.png";

function LandingPage() {
	return (
		<div className="flex flex-col items-center">
			<NavBar></NavBar>
			<div
				id="home"
				className="landing-section h-auto md:h-[80dvh] md:overflow-y-hidden flex flex-col-reverse md:flex-row justify-center items-center mt-8 md:mt-24 "
			>
				<section className="text-foreground font-[Montserrat]  text-xl md:text-4xl text-center p-4 px-4">
					<h2 className="leading-relaxed">
						Planning your Journey <br /> has never been this <br />
						<ReactTyped
							strings={["Easy", "Fast", "Cheap", "Comfortable"]}
							typeSpeed={100}
							loop
							backSpeed={20}
							cursorChar="|"
							showCursor={true}
							className="text-primary font-semibold text-4xl md:text-7xl drop-shadow-[0_0_60px_hsl(var(--primary))]"
						/>
					</h2>
					<p className="text-sm md:text-base mt-4 md:mt-8 text-secondary-foreground font-worksans px-4 lg:px-16">
						Effortlessly explore routes, compare costs, & prioritize
						comfort to make informed travel decisions tailored to
						your preferences and budget.
					</p>
					<Button
						variant="default"
						className="mt-8 font-worksans font-bold hover:shadow-[0_0_60px_hsl(var(--primary))] transition-all duration-300"
					>
						Start your Journey
					</Button>
				</section>
				<section className=" text-foreground flex-shrink-0">
					<img
						src={heroasset}
						alt="HeroAsset"
						className="w-72 md:w-auto md:h-[600px]"
					/>
				</section>
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
