import routerover from "../../assets/RouteRoverlogoText.svg";

const Footer = () => {
	return (
		<>
			<div className="bg-secondary w-full rounded-sm flex items-center justify-center pt-4">
				<img src={routerover} alt="RouteRover" className="w-[25%]" />
			</div>
			<div className="bg-secondary w-full rounded-sm flex flex-row flex-wrap items-center justify-center gap-8 p-4 pb-8 divide-x-2 dark:divide-slate-500">
				<div>
					<div className="w-80 flex flex-col items-center justify-center">
						<h2 className="text-lg font-worksans font-semibold">
							Nishita Panchal
						</h2>
						<div className="links mt-2 flex flex-col justify-center">
							<div class="link flex flex-row items-center justify-start gap-4 ">
								<i class="fa fa-github"></i>
								<a
									class="name"
									href="https://github.com/CSI-SPIT"
								>
									GitHub
								</a>
							</div>
							<div class="link flex flex-row items-center justify-start gap-4 ">
								<i class="fa fa-linkedin text-blue-400"></i>
								<a
									class="name"
									href="https://www.linkedin.com/company/s-p-i-t-csi/mycompany/"
								>
									LinkedIn
								</a>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="w-80 flex flex-col items-center justify-center">
						<h2 className="text-lg font-worksans font-semibold ">
							Manjiri Chavande
						</h2>
						<div className="links mt-2 flex flex-col justify-center">
							<div class="link flex flex-row items-center justify-start gap-4">
								<i class="fa fa-github"></i>
								<a
									class="name"
									href="https://github.com/CSI-SPIT"
								>
									GitHub
								</a>
							</div>
							<div class="link flex flex-row items-center justify-start gap-4">
								<i class="fa fa-linkedin text-blue-400"></i>
								<a
									class="name"
									href="https://www.linkedin.com/company/s-p-i-t-csi/mycompany/"
								>
									LinkedIn
								</a>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="w-80 flex flex-col items-center justify-center">
						<h2 className="text-lg font-worksans font-semibold ">
							Satyam Vyas
						</h2>
						<div className="links mt-2 flex flex-col justify-center">
							<div class="link flex flex-row items-center justify-start gap-4 ">
								<i class="fa fa-github"></i>
								<a
									class="name"
									href="https://github.com/CSI-SPIT"
								>
									GitHub
								</a>
							</div>
							<div class="link flex flex-row items-center justify-start gap-4 ">
								<i class="fa fa-linkedin text-blue-400"></i>
								<a
									class="name"
									href="https://www.linkedin.com/company/s-p-i-t-csi/mycompany/"
								>
									LinkedIn
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
