import {
	motion,
	useMotionTemplate,
	useMotionValue,
	animate,
} from "framer-motion";

import { useEffect } from "react";
import Dashboard from "../assets/Dashboad.png";
import History from "../assets/History.png";
import Options from "../assets/Options.png";
import SearchMap from "../assets/SearchMap.png";

const COLORS = ["#00B9E8", "#007FFF", "#6699CC", "#318CE7", "#00BFFF"];

const Features = () => {
	const color = useMotionValue(COLORS[0]);
	const border = useMotionTemplate`2px solid ${color}`;
	const boxShadow = useMotionTemplate`0px 0px 24px ${color}`;
	const filter = useMotionTemplate`drop-shadow(0 0 32px ${color})`;

	useEffect(() => {
		animate(color, COLORS, {
			ease: "easeInOut",
			duration: 10,
			repeat: Infinity,
			repeatType: "mirror",
		});
	}, []);
	return (
		<section className="mx-auto max-w-7xl px-4 py-12 text-slate-500 w-[100%]">
			<div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:px-8">
				<h2 className="max-w-lg text-4xl font-bold md:text-5xl text-center sm:text-start">
					Route faster with our
					<span className="text-slate-200"> all in one Rover</span>
				</h2>
			</div>
			<div className="mb-4 grid grid-cols-12 gap-4">
				<BounceCard className="col-span-12 md:col-span-4">
					<CardTitle>find the FASTEST path...</CardTitle>
					<img
						src={SearchMap}
						className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-violet-400 to-indigo-400 p-2 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]"
					></img>
				</BounceCard>
				<BounceCard className="col-span-12 md:col-span-8">
					<CardTitle>that is also CHEAP...</CardTitle>
					<img
						src={Options}
						className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-amber-400 to-orange-400 p-2 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]"
					></img>
				</BounceCard>
			</div>
			<div className="grid grid-cols-12 gap-4">
				<BounceCard className="col-span-12 md:col-span-8">
					<CardTitle>and is SAVED in history...</CardTitle>
					<img
						src={History}
						className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-green-400 to-emerald-400 p-2 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]"
					></img>
				</BounceCard>
				<BounceCard className="col-span-12 md:col-span-4">
					<CardTitle>and ANALYSED</CardTitle>
					<img
						src={Dashboard}
						className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-pink-400 to-red-400 p-2 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]"
					></img>
				</BounceCard>
			</div>
		</section>
	);
};

// eslint-disable-next-line react/prop-types
const BounceCard = ({ className, children }) => {
	return (
		<motion.div
			whileHover={{ scale: 0.95, rotate: "-1deg" }}
			className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-slate-800 p-8 ${className}`}
		>
			{children}
		</motion.div>
	);
};

// eslint-disable-next-line react/prop-types
const CardTitle = ({ children }) => {
	return (
		<h3 className="mx-auto text-center text-3xl font-semibold text-slate-200">
			{children}
		</h3>
	);
};

export default Features;