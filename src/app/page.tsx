"use client";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ButtonSecondary from "@/app/component/button/secondary/button-secondary";
import InfiniteScroller from "@/app/component/infinite-scroller/infinite-scroller";
import SeoCheck from "@/app/component/seo-check/seo-check";
import styles from "./page.module.scss";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const observedElementRef = useRef(null);

	useEffect(() => {
		if (observedElementRef.current) {
			const observer = new ResizeObserver((entries) => {
				for (const entry of entries) {
					setDimensions({
						width: entry.contentRect.width,
						height: entry.contentRect.height,
					});
				}
			});

			observer.observe(observedElementRef.current);

			// Cleanup function
			return () => {
				observer.disconnect();
			};
		}
	}, []);
	useEffect(() => {
		gsap.utils.toArray("#art").forEach((wrapper) => {
			gsap.fromTo(
				"#art",
				{ opacity: 1 },
				{
					opacity: 0,
					scrollTrigger: {
						trigger: "#art",
						start: "top 20%",
						end: "bottom 10%",
						scrub: 1,
					},
				},
			);
		});

		// --- main timeline (paused initially)
		const tl = gsap.timeline({ paused: true });

		tl.to("#curlet", { duration: 0.0001 })
			.to("#E1", {
				duration: 0.12,
				display: "inline-block",
				onComplete() {
					gsap.to("#curlet", { opacity: 1 });
				},
			})
			.to("#N2", {
				duration: 0.12,
				display: "inline-block",
				onComplete() {
					gsap.to("#curlet", { opacity: 1 });
				},
			})
			.to("#T3", {
				duration: 0.12,
				display: "inline-block",
				onComplete() {
					gsap.to("#curlet", { opacity: 1 });
				},
			})
			.to("#W4", {
				duration: 0.12,
				display: "inline-block",
				onComplete() {
					gsap.to("#curlet", { opacity: 1 });
				},
			})
			.to("#I5", {
				duration: 0.12,
				display: "inline-block",
				onComplete() {
					gsap.to("#curlet", { opacity: 1 });
				},
			})
			.to("#C6", {
				duration: 0.12,
				display: "inline-block",
				onComplete() {
					gsap.to("#curlet", { opacity: 1 });
				},
			})
			.to("#K7", {
				duration: 0.12,
				display: "inline-block",
				onComplete() {
					gsap.to("#curlet", { opacity: 1 });
				},
			})
			.to("#E8", {
				duration: 0.12,
				display: "inline-block",
				onComplete() {
					gsap.to("#curlet", { opacity: 1 });
				},
			})
			.to("#L9", {
				duration: 0.12,
				display: "inline-block",
				onComplete() {
					gsap.to("#curlet", { opacity: 1 });
				},
			})
			.to("#N10", {
				duration: 0.12,
				display: "inline-block",
				onComplete() {
					gsap.to("#curlet", { opacity: 1 });
				},
			})
			.to("#entwickeln", {
				duration: 0.00001,
				backgroundColor: "blue",
				delay: 0.5,
			});

		gsap.fromTo(
			"#designSelect",
			{
				width: "0%",

				height: "0%",
			},
			{
				width: "100%",
				height: "100%",
				scrollTrigger: {
					trigger: "#designSelect",
					start: "top 60%",
					end: "top 20%",
					markers: true,
					scrub: true,
				},
			},
		);

		// --- trigger when #wir scrolls into view
		gsap.fromTo(
			"#wir",
			{ opacity: 0, y: -50 },
			{
				opacity: 1,
				y: 1,
				scrollTrigger: {
					trigger: "#wir",
					start: "top 70%",
					end: "top 20%",
				},
				onComplete() {
					setTimeout(() => {
						tl.play();
					}, 100);
				},
			},
		);

		gsap.fromTo(
			"#curlet",
			{ opacity: 0 },
			{
				opacity: 1,
				scrollTrigger: {
					trigger: "#curlet",
					start: "20% 20%",
					end: "20% 20%",
				},
			},
		);

		const curletTl = gsap.timeline({ repeat: -1 });
		curletTl
			.to("#curlet", { duration: 0.1, display: "none", delay: 0.4 })
			.to("#curlet", { duration: 0.1, display: "inline", delay: 0.4 });

		return () => {
			ScrollTrigger.getAll().forEach((st) => st.kill());
		};
	}, []);

	return (
		<div className={styles.page}>
			<section className="article-wrapper">
				<article id="art" data-speed="2.0">
					<h1>Mehr Wachstum für Change-Maker</h1>

					<div>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Dicta esse exercitationem harum impedit
							molestiae necessitatibus odio sequi? Cupiditate
							debitis, dicta! Ad alias assumenda at aut autem
							blanditiis cum deserunt dolorem, earum est eum
							facilis fugiat incidunt ipsa ipsum iste itaque iusto
							magni maxime mollitia nam natus necessitatibus non
							nulla, odit pariatur porro quasi qui quibusdam
							quidem quis quisquam quod repudiandae rerum, sint
							vitae voluptatem. Accusamus, aliquam at blanditiis
							culpa delectus eligendi et fugiat id, inventore iure
							libero maiores maxime minus natus nihil nobis
							numquam possimus quasi quidem quisquam rerum sit
							soluta totam, unde veritatis. Ad alias corporis in
							natus odit.
						</p>
					</div>
					<div
						style={{
							display: "flex",
							gap: 20,
							width: "100%",
							justifyContent: "center",
							marginTop: 20,
						}}
					>
						<ButtonSecondary text="Alle Projekte entdecken" />
						<button className="button--primary">
							Jetzt durchstarten
						</button>
					</div>
				</article>
			</section>

			<section className={styles.services}>
				<article
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 10,
						alignItems: "center",
					}}
				>
					<p style={{ display: "block" }}>
						<span id="wir" className="bold">
							ICH
						</span>
					</p>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							position: "relative",
						}}
					>
						<div>
							<p id="entwickeln">
								<span className="bold" id="E1">
									E
								</span>{" "}
								<span className="bold" id="N2">
									N
								</span>
								<span className="bold" id="T3">
									T
								</span>{" "}
								<span className="bold" id="W4">
									W
								</span>
								<span className="bold" id="I5">
									I
								</span>{" "}
								<span className="bold" id="C6">
									C
								</span>
								<span className="bold" id="K7">
									K
								</span>
								<span className="bold" id="E8">
									L
								</span>{" "}
								<span className="bold" id="L9">
									E
								</span>
							</p>
						</div>
						<span
							className="bold"
							style={{
								position: "absolute",
								right: "0%",
								translate: "100% 0%",
							}}
						>
							<span id="curlet">_</span>
						</span>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "center",
							position: "relative",
						}}
					>
						<div
							id="designen"
							style={{ display: "flex", gap: "0" }}
						>
							{[
								["D", "D1", 40],
								["E", "E2", 35],
								["S", "S3", 37],
								["I", "I4", 15],
								["G", "G5", 45],
								["N", "N6", 40],
								["E", "E7", 30],
							].map(([char, id, width]) => (
								<div
									key={id || ""}
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										position: "relative",
										width: width,
										height: "50px",
									}}
								>
									<span
										style={{
											position: "absolute",
										}}
										className="bold"
										id={id}
									>
										{char}
									</span>
								</div>
							))}
						</div>

						<div
							id="designSelect"
							ref={observedElementRef}
							className={styles.designSelect}
						>
							<Image
								src="pointinghand.svg"
								alt=""
								width={48}
								height={48}
							/>
							<div
								id="designTooltip"
								className={styles.designTooltip}
							>
								<p>{`${dimensions.width.toFixed(2)}px x ${dimensions.height.toFixed(2)}px`}</p>
							</div>
						</div>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "center",
							position: "relative",
						}}
					>
						<p id="skalieren">
							<span className="bold" id="S1">
								S
							</span>
							<span className="bold" id="K2">
								K
							</span>
							<span className="bold" id="A3">
								A
							</span>
							<span className="bold" id="L4">
								L
							</span>
							<span className="bold" id="I52">
								I
							</span>
							<span className="bold" id="E6">
								E
							</span>
							<span className="bold" id="R7">
								R
							</span>
							<span className="bold" id="E82">
								E
							</span>
						</p>
					</div>

					<InfiniteScroller
						items={[{ img: "asdasd", title: "Haus Hyazinthe" }]}
					/>
				</article>
			</section>

			<section>
				<SeoCheck />
			</section>
		</div>
	);
}
