import { useEffect } from "react";
import HeroAsset from "../assets/HeroAsset.png";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    animate,
} from "framer-motion";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Features from "./Features";
import Conclusion from "./Conclusion";
// import Footer from "./Footer";
//import SignIn from "./SignIn";

const COLORS = ["#00B9E8", "#007FFF", "#6699CC", "#318CE7", "#00BFFF"];

const signIn = () => {
    window.open("/signin");
};


function LandingSection() {
    const color = useMotionValue(COLORS[0]);
    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
    const border = useMotionTemplate`2px solid ${color}`;
    const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
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
        <div>
            <motion.section
                className="h-auto md:h-[90dvh] flex flex-col-reverse md:flex-row items-center justify-center p-6 md:p-24 gap-x-8 gap-y-2 w-dvw"
                style={{
                    backgroundImage,
                }}
            >
                <article className="relative z-10 font-sans flex flex-col justify-center gap-4 md:gap-8 items-center md:items-start text-center md:text-left h-full">
                    <h1 className="text-3xl md:text-5xl md:leading-[4rem] font-bold text-white">
                        Planning your commute was never this{" "}
                        <motion.span style={{ color }}>Easy!</motion.span>
                    </h1>
                    <p className="text-base md:text-lg text-zinc-300">
                        Effortlessly explore routes, compare costs, and make
                        informed travel decisions tailored to your preferences and
                        budget
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        onClick={signIn}
                        className="flex items-center justify-center gap-4 group text-base md:text-lg w-fit text-white font-bold py-2 px-4 rounded-full mt-2 backdrop-blur-sm"
                        style={{
                            border,
                            boxShadow,
                        }}
                    >
                        Get Started with RouteRover{" "}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6 md:opacity-0 md:-translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </motion.button>
                </article>
                <article className="relative z-10">
                    <motion.img
                        src={HeroAsset}
                        className="h-full w-80 sm:w-[400px] md:w-[600px] max-w-[600px]"
                        style={{ filter }}
                    ></motion.img>
                </article>
                <div className="z-0 absolute inset-0">
                    <Canvas>
                        <Stars radius={25} count={1500} factor={4} fade speed={2} />
                    </Canvas>
                </div>
            </motion.section>
            <Features />
            <Conclusion />
            {/* <Footer /> */}
        </div>
    );
}

export default LandingSection;