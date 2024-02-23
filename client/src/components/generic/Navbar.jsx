import { ThemeProvider } from "../ui/theme-provider";
import { ModeToggle } from "../ui/mode-toggle";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../pages/styles/navbar.css";
import axios from "axios";

const NavBar = () => {
	const [userdata, setUserdata] = useState({});
	console.log("response", userdata);

	const getUser = async () => {
		try {
			const response = await axios.get(
				"http://localhost:6005/login/sucess",
				{ withCredentials: true }
			);

			setUserdata(response.data.user);
		} catch (error) {
			console.log("error", error);
		}
	};

	// logoout
	const logout = () => {
		window.open("http://localhost:6005/logout", "_self");
	};

	useEffect(() => {
		getUser();
	}, []);
	return (
		<div className="w-[90dvw] h-16 px-4 sm:px-8 flex flex-row justify-between items-center fixed top-0 backdrop-blur-sm border-b-4 border-primary rounded-lg font-[montserrat] shadow-[0_12px_32px_hsl(var(--primary))] hover:h-20 transition-all duration-300">
			<div className="leftstuff">
				<img
					src="src\assets\RouteRoverLogoText.svg"
					alt="logo"
					className="h-8"
				/>
			</div>
			<div className="centerstuff"></div>
			<ul className="rightstuff w-auto flex-row items-center justify-between gap-4 hidden md:flex text-foreground">
				{Object?.keys(userdata)?.length > 0 ? (
					<>
						<li>
							<NavLink to="/dashboard" className="navbar-links">
								Dashboard
							</NavLink>
						</li>
						<li
							onClick={logout}
							className="navbar-links text-destructive hover:text-destructive hover:drop-shadow-[0_0_32px_hsl(var(--destructive))]"
						>
							Logout
						</li>
						<li className="navbar-links">
							<div className="flex justify-center items-center gap-4">
								<img
									src={userdata?.image}
									alt="DP"
									className="h-8 rounded-full"
								/>
								<p>{userdata?.displayName}</p>
							</div>
						</li>
					</>
				) : (
					<>
						<li>
							<NavLink to="/" className="navbar-links">
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/login"
								className="navbar-links text-green-500 hover:text-green-500 hover:drop-shadow-[0_0_32px_green]"
							>
								Login
							</NavLink>
						</li>
					</>
				)}
				<li>
					<ThemeProvider>
						<ModeToggle />
					</ThemeProvider>
				</li>
			</ul>
		</div>
	);
};

export default NavBar;
