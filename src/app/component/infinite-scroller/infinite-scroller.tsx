"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ButtonIcon from "@/app/component/button/icon/button-icon";
import ButtonSecondary from "@/app/component/button/secondary/button-secondary";
import styles from "./infinite-scroller.module.scss";

gsap.registerPlugin(ScrollTrigger);

interface Item {
	title: string;
	img: string;
}

interface Props {
	items: Item[];
}

export default function InfiniteScroller({ items }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState<number>(0);
	const [visibleItems, setVisibleItems] = useState<number>(0);
	const [loopItems, setLoopItems] = useState<Item[]>([]);
	const [url, setUrl] = useState("https://www.haus-hyazinthe.de");
	const [img, setImg] = useState<string | null>(null);

	async function takeScreenshot() {
		const res = await fetch(
			`/api/screenshot?url=${encodeURIComponent(url)}`,
		);
		const blob = await res.blob();
		setImg(URL.createObjectURL(blob));
	}
	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);

		handleResize(); // initial width
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		gsap.fromTo(
			"#infiniteScrollRef",
			{ opacity: 0, y: -20 },
			{
				opacity: 1,
				y: 1,
				scrollTrigger: {
					trigger: "#infiniteScrollRef",
					start: "top 70%",
					end: "bottom 20%",
					markers: true,
				},
			},
		);
	}, []);
	return (
		<div
			className={styles.scrollWrapper}
			id="infiniteScrollRef"
			ref={containerRef}
		>
			<div className={styles.scrollRow}>
				{loopItems.map((item) => (
					<div key={item.toString()}>
						<p
							style={{
								color: "#fff",
								position: "relative",
								zIndex: 20,
								fontWeight: 600,
							}}
						>
							{item.title}
						</p>
						{img ? (
							<Image
								src={img || ""}
								alt="screenshot"
								width={200}
								height={260}
								objectFit="cover"
								style={{
									border: "1px solid #ccc",
									position: "absolute",
									top: 0,
									left: 0,
									zIndex: -1,
								}}
							/>
						) : (
							"loading"
						)}
					</div>
				))}
			</div>

			<div className={styles.scroller}>
				<div className={styles.box}></div>
				<div className={styles.box}></div>
				<div className={styles.box}></div>
				<div className={styles.box}></div>
				<div className={styles.box}></div>
				<div className={styles.box}></div>
				<div className={styles.box}></div>
				<div className={styles.box}></div>

				<div className={styles.overlay}></div>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					gap: 24,
					alignItems: "center",
				}}
			>
				<ButtonSecondary text="Alle Projekte entdecken" />
				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						gap: 8,
						alignItems: "center",
					}}
				>
					<ButtonIcon icon={<LucideChevronLeft />} />
					<ButtonIcon icon={<LucideChevronRight />} />
				</div>
			</div>
		</div>
	);
}
