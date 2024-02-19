import { ThemeProvider } from "../ui/theme-provider";
import { ModeToggle } from "../ui/mode-toggle";

const NavBar = () => {
	return (
		<div className="w-[var(--full-width)] h-16 px-8 flex flex-row justify-between items-center sticky top-0 z-10 backdrop-blur-sm">
			<section className="leftside">
				<img
					src="src\assets\RouteRoverLogoText.svg"
					alt="logo"
					className="h-8"
				/>
			</section>
			<section className="centerstuff"></section>
			<section className="rightside">
				<ThemeProvider>
					<ModeToggle></ModeToggle>
				</ThemeProvider>
			</section>
		</div>
	);
};

export default NavBar;
