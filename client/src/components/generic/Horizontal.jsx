import React, { useEffect, useRef } from "react";

const HorizontalCards = ({ headings }) => {
	const logosRef = useRef(null);

	useEffect(() => {
		if (logosRef.current) {
			let ul = logosRef.current;
			ul.insertAdjacentHTML("afterend", ul.outerHTML);
			ul.nextSibling.setAttribute("aria-hidden", "true");
		}
	}, []);

	return (
		<div className="text-center">
			<div className="w-[90dvw] font-worksans inline-flex flex-nowrap overflow-hidden mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)">
				<ul
					ref={logosRef}
					className="flex items-center justify-center md:justify-start &_li:mx-8 &_img:max-w-none animate-infinite-scroll h-16"
				>
					{headings.map((heading, index) => (
						<li
							key={index}
							className="px-8 font-bold text-lg text-secondary-foreground w-fit bg-accent shadow-inner"
						>
							<h3 className="w-24">{heading}</h3>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default HorizontalCards;
