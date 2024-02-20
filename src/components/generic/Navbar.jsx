import { ThemeProvider } from "../ui/theme-provider";
import { ModeToggle } from "../ui/mode-toggle";

const NavBar = () => {
	return (
		<div className="w-[90dvw] overflow-x-clip h-16 px-4 sm:px-8 flex flex-row justify-between items-center fixed top-0 z-100 backdrop-blur-sm border-b-2 border-primary rounded-lg font-[montserrat]">
			<section className="leftstuff">
				<img
					src="src\assets\RouteRoverLogoText.svg"
					alt="logo"
					className="h-8"
				/>
			</section>
			<section className="centerstuff"></section>
			<section className="rightstuff flex-row items-center justify-between gap-4 hidden md:flex">
				<a href="#home" className="navbar-links">
					Home
				</a>

				<a href="#features" className="navbar-links">
					Features
				</a>

				<a href="#details" className="navbar-links">
					Details
				</a>

				<a href="#aboutus" className="navbar-links">
					About us
				</a>
				<ThemeProvider>
					<ModeToggle></ModeToggle>
				</ThemeProvider>
			</section>
		</div>
	);
};

export default NavBar;
