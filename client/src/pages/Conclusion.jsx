import styles from "../styles/bubble.module.css"
import { motion } from "framer-motion";

const Example = () => {
	return (
		<div className="grid mb-24 mt-12 place-content-center gap-12 place-items-center">
			<BubbleText />
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				transition={{ duration: 0.2, ease: "easeInOut" }}
				href="#"
				className="flex items-center justify-center gap-4 group text-base md:text-lg w-fit text-white font-bold py-2 px-4 rounded-full mt-2 bg-indigo-500 hover:shadow-[0_0_24px_#444fff]"
			>
				<h2 className="translate-x-5 md:group-hover:translate-x-0 transition-all">
					Get Started with RouteRover
				</h2>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
					className="w-6 h-6 md:opacity-0 md:-translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all invisible md:visible"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
					/>
				</svg>
			</motion.button>
		</div>
	);
};

const BubbleText = () => {
	return (
		<h2 className="text-center text-5xl font-thin text-indigo-300">
			{"So, what are you waiting for <3".split("").map((child, idx) => (
				<span className={styles.hoverText} key={idx}>
					{child}
				</span>
			))}
		</h2>
	);
};

export default Example;