import { ThemeProvider } from "../ui/theme-provider";
import { ModeToggle } from "../ui/mode-toggle";

const NavBar = () => {
	return (
		<div className="w-dvw h-16 border-b-2 border-border flex flex-row justify-evenly items-center sticky top-0">
			<section className="leftside"></section>
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
