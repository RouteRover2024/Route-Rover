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
		<div className="w-[90dvw] overflow-x-clip h-16 px-4 sm:px-8 flex flex-row justify-between items-center fixed top-0 z-100 backdrop-blur-sm border-b-2 border-primary rounded-lg font-[montserrat] shadow-[0_12px_32px_hsl(var(--primary))] hover:h-20 transition-all duration-300">
			<div className="leftstuff">
				<img
					src="src\assets\RouteRoverLogoText.svg"
					alt="logo"
					className="h-8"
				/>
			</div>
			<div className="centerstuff"></div>
			<ul className="rightstuff w-auto flex-row items-center justify-between gap-4 hidden md:flex text-foreground">
				<li>
					<NavLink to="/" className="navbar-links">
						Home
					</NavLink>
				</li>
				{Object?.keys(userdata)?.length > 0 ? (
					<>
						<li>{userdata?.displayName}</li>
						<li>
							<NavLink to="/dashboard">Dashboard</NavLink>
						</li>
						<li onClick={logout}>Logout</li>
						<li>
							<img src={userdata?.image} alt="DP" />
						</li>
					</>
				) : (
					<>
						<li>
							<NavLink to="/#Features" className="navbar-links">
								Features
							</NavLink>
						</li>
						<li>
							<NavLink to="/#OurTeam" className="navbar-links">
								Our Team
							</NavLink>
						</li>
						<li>
							<NavLink to="/login" className="navbar-links">
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
