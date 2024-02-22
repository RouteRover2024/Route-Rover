// import NavBar from "../components/generic/Navbar";
import "./styles/landing.css";
import { ReactTyped } from "react-typed";
import { Button } from "@/components/ui/button";
import map from "../assets/MapIllustration.svg";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ChairIcon from "@mui/icons-material/Chair";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function LandingPage() {
	return (
		<div className="flex flex-col items-center">
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
						src="src/assets/HeroAsset.png"
						alt="HeroAsset"
						className="w-72 md:w-auto md:h-[600px]"
					/>
				</section>
			</div>
			<div>
				<hr className="w-[90dvw] h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
				<div
					id="features"
					className="landing-section flex-col gap-16 h-auto md:h-[70dvh]"
				>
					<div className="flex justify-center gap-4 md:gap-40 items-center w-full flex-col md:flex-row">
						<img
							src={map}
							alt="Map Skeleton"
							className="w-auto md:w-[400px] rounded-lg drop-shadow-[0_0_60px_hsl(var(--primary))] -z-10"
						/>
						<ul className="Text-right text-md md:text-2xl mt-4 text-secondary-foreground font-worksans px-4 lg:px-16 max-w-[600px] flex flex-col justify-between">
							<li>
								<h2 className="flex items-center gap-2 my-2 text-primary font-semibold">
									<CurrencyRupeeIcon />
									<h2>Cheap!</h2>
								</h2>
								<p className="text-sm md:text-base text-secondary-foreground font-worksans">
									Discover the most cost-effective route to work,
									saving you money effortlessly
								</p>
							</li>
							<li>
								<h2 className="flex items-center gap-2 my-2 text-primary font-semibold">
									<AccessTimeFilledIcon />
									<h2>Fast!</h2>
								</h2>
								<p className="text-sm md:text-base text-secondary-foreground font-worksans">
									RouteRover finds the fastest way to travel from
									one place to the other!
								</p>
							</li>
							<li>
								<h2 className="flex items-center gap-2 my-2 text-primary font-semibold">
									<ChairIcon />
									<h2>Comfy!</h2>
								</h2>
								<p className="text-sm md:text-base text-secondary-foreground font-worksans">
									Filtering options based on Comfort helps the
									user find a soothing ride!
								</p>
							</li>
						</ul>
					</div>
				</div>
				<hr className="w-[90dvw] h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
				<div id="details" className="landing-section">
					Details
				</div>
			</div>
			<div id="aboutus" className="landing-section">
				About us
			</div>
		</div>
	);
}

export default LandingPage;
