import routerover from "../../assets/RouteRoverlogoText.svg";
const Footer = () => {
	return (
		<div className="bg-secondary w-full border-2 border-red-400 rounded-sm flex flex-row flex-wrap items-center justify-center gap-8 p-4">
			<div className="w-full flex items-center justify-center">
				<img src={routerover} alt="RouteRover" className="w-[25%]" />
			</div>
			<div>
				<h2 className="text-lg font-worksans font-semibold border-green-500 border-2 w-80 flex flex-col items-center justify-center">
					Nishita Panchal
				</h2>
			</div>
			<div>
				<h2 className="text-lg font-worksans font-semibold border-green-500 border-2 w-80 flex flex-col items-center justify-center">
					Manjiri Chavande
				</h2>
			</div>
			<div>
				<h2 className="text-lg font-worksans font-semibold border-green-500 border-2 w-80 flex flex-col items-center justify-center">
					Satyam Vyas
				</h2>
			</div>
		</div>
	);
};

export default Footer;
