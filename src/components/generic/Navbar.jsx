import { ThemeProvider } from "../ui/theme-provider";
import { ModeToggle } from "../ui/mode-toggle";
import { Button, buttonVariants } from "../ui/button";

const NavBar = () => {
	return (
		<div className="w-[var(--full-width)] h-16 px-4 sm:px-8 flex flex-row justify-between items-center fixed top-0 z-10 backdrop-blur-sm border-b-2 border-[hsl(var(--border))] rounded-lg">
			<section className="leftstuff">
				<img
					src="src\assets\RouteRoverLogoText.svg"
					alt="logo"
					className="h-8"
				/>
			</section>
			<section className="centerstuff"></section>
			<section className="rightstuff flex flex-row items-center justify-between gap-4">
				<a
					href="#home"
					className="px-4 py-2 hover:border-b-2 hover:border-[hsl(var(--primary))] transition-all hover:text-[hsl(var(--primary))]"
				>
					Home
				</a>

				<a
					href="#features"
					className="px-4 py-2 hover:border-b-2 hover:border-[hsl(var(--primary))] transition-all hover:text-[hsl(var(--primary))]"
				>
					Features
				</a>

				<a
					href="#details"
					className="px-4 py-2 hover:border-b-2 hover:border-[hsl(var(--primary))] transition-all hover:text-[hsl(var(--primary))]"
				>
					Details
				</a>

				<a
					href="#aboutus"
					className="px-4 py-2 hover:border-b-2 hover:border-[hsl(var(--primary))] transition-all hover:text-[hsl(var(--primary))]"
				>
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
