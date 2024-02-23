import "./styles/landing.css";
import { ReactTyped } from "react-typed";
import { Button } from "@/components/ui/button";
import map from "../assets/MapIllustration.svg";
//import manjiri from "../assets/Manjiri.jpg";
import profile from "../assets/profile_alt.jpeg";
// import nishita from "../assets/Nishita.jpg";
// import satyam from "../assets/Satyam.jpg";
import Footer from "@/components/generic/Footer";

import HorizontalCards from "@/components/generic/Horizontal";
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ChairIcon from "@mui/icons-material/Chair";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function LandingPage() {
	const features = [];
	const ourteam = [];
	if (features.length < 10) {
		for (let i = 0; i < 10; i++) {
			features.push("Features");
			ourteam.push("Our Team");
		}
	}

	return (
		<div className="flex flex-col items-center">
			<div
				id="Home"
				className="landing-section h-auto flex flex-col-reverse lg:flex-row justify-center items-center mt-8 -z-100"
			>
				<section className="text-foreground font-[Montserrat]  text-xl lg:text-4xl text-center p-4 px-4">
					<h2 className="leading-relaxed">
						Planning your Journey <br /> has never been this <br />
						<ReactTyped
							strings={["Easy", "Fast", "Cheap", "Comfortable"]}
							typeSpeed={100}
							loop
							backSpeed={20}
							cursorChar="|"
							showCursor={true}
							className="text-primary font-semibold text-4xl lg:text-7xl drop-shadow-[0_0_60px_hsl(var(--primary))]"
						/>
					</h2>
					<p className="text-sm lg:text-base mt-4 lg:mt-8 text-secondary-foreground font-worksans px-4 lg:px-16">
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
						className="w-72 lg:w-auto lg:h-[600px] drop-shadow-[0_0_60px_hsl(var(--primary))]"
					/>
				</section>
			</div>
			<div
				id="features"
				className="landing-section h-auto flex justify-center gap-4 md:gap-x-20 gap-y-40 items-center w-full flex-col md:flex-row flex-wrap -z-10"
			>
				<HorizontalCards headings={features} />
				<img
					src={map}
					alt="Map Skeleton"
					className="w-auto lg:w-[500px] rounded-lg drop-shadow-[0_0_60px_hsl(var(--primary))] -z-10"
				/>
				<ul className="Text-right h-auto w-auto text-md md:text-2xl mt-4 text-secondary-foreground font-worksans px-4 lg:px-16 flex-col">
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
							RouteRover finds the fastest way to travel from one
							place to the other!
						</p>
					</li>
					<li>
						<h2 className="flex items-center gap-2 my-2 text-primary font-semibold">
							<ChairIcon />
							<h2>Comfy!</h2>
						</h2>
						<p className="text-sm md:text-base text-secondary-foreground font-worksans">
							Filtering options based on Comfort helps the user
							find a soothing ride!
						</p>
					</li>
				</ul>
			</div>
			<div
				id="OurTeam"
				className="landing-section h-auto py-32 flex flex-row flex-wrap justify-evenly items-center gap-16 gap-y-40 -z-10"
			>
				<HorizontalCards headings={ourteam} className="-z-10" />
				<Card className="w-60 h-72 p-4 text-center md:scale-125 font-worksans md:hover:scale-[1.35] transition-all">
					<CardTitle className="text-xl">Nishita Panchal</CardTitle>
					<CardContent className="mt-4 flex flex-col items-center justify-center">
						<img
							src={profile}
							alt="Nishita P"
							className="rounded-md h-auto w-[75%] border-2 border-accent"
						/>
					</CardContent>
					<CardFooter className="text-center">
						MERN Stack Developer
					</CardFooter>
				</Card>
				<Card className="w-60 h-72 p-4 text-center md:scale-125 font-worksans md:hover:scale-[1.35] transition-all">
					<CardTitle className="text-xl">Manjiri Chavande</CardTitle>
					<CardContent className="mt-4 flex flex-col items-center justify-center">
						<img
							src={profile}
							alt="Manjiri C"
							className="rounded-md h-auto w-[75%] border-2 border-accent"
						/>
					</CardContent>
					<CardFooter className="text-center">
						MERN Stack Developer
					</CardFooter>
				</Card>
				<Card className="w-60 h-72 p-4 text-center md:scale-125 font-worksans md:hover:scale-[1.35] transition-all">
					<CardTitle className="text-xl">Satyam Vyas</CardTitle>
					<CardContent className="mt-4 flex flex-col items-center justify-center">
						<img
							src={profile}
							alt="Satyam V"
							className="rounded-md h-auto w-[75%] border-2 border-accent"
						/>
					</CardContent>
					<CardFooter className="text-center">
						MERN Stack Developer
					</CardFooter>
				</Card>
			</div>
			<Footer />
		</div>
	);
}

export default LandingPage;
