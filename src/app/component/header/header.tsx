"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LucideMail, LucideMenu, LucidePhone, LucideX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import ButtonIcon from "@/app/component/button/icon/button-icon";
import ContactButton from "@/app/component/header/component/contactButton/contactButton";
import styles from "./header.module.scss";

gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(ScrollTrigger);

const Header = () => {
	const boxRef = useRef(null);
	const contactButtonRef = useRef(null);
	const closeRef = useRef(null);
	const contectInfoRef = useRef(null);
	const linksRef = useRef(null);
	const telRef = useRef(null);
	const mailRef = useRef(null);

	useEffect(() => {
		ScrollTrigger.refresh();
	});

	useGSAP(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: boxRef.current, // element that triggers the animation
				start: "1px 1px", // when the top of the element hits 80% of the viewport
				end: "1px 1px",
				scrub: true,
			},
		});

		tl.to(boxRef.current, {
			duration: 0.25,
			width: "75%",
			boxShadow: "inset 2px 2px 2px -2px #FFFFFF",
			webkitBoxShadow: "inset 2px 2px 2px -2px #FFFFFF",
		});

		const cbtl = gsap.timeline({
			scrollTrigger: {
				trigger: contactButtonRef.current, // element that triggers the animation
				start: "45px 25px", // when the top of the element hits 80% of the viewport
				end: "30px 30px", // when the bottom hits 20%
				scrub: true,
			},
		});

		cbtl.to(contactButtonRef.current, {
			duration: 0.25,
			delay: 1,
			opacity: "1",
			display: "inline",
		});

		const rtl = gsap.timeline({
			scrollTrigger: {
				trigger: linksRef.current, // element that triggers the animation
				start: "20px 30px", // when the top of the element hits 80% of the viewport
				end: "30px 30px", // when the bottom hits 20%
				scrub: true,
			},
		});

		rtl.to(linksRef.current, {
			duration: 0.25,

			transform: "translate(50%, -50%)",
		});
	});

	const openContact = () => {
		gsap.to(boxRef.current, {
			duration: 0.25,
			delay: 1,

			width: "90vw",
			height: "90vh", // 👈 animate height
			ease: "power2.inOut", // smooth easing
		});

		gsap.to(closeRef.current, {
			duration: 1,
			opacity: 1,
			delay: 0.5,
			display: "inline",
			ease: "power2.inOut", // smooth easing
		});

		gsap.to(contactButtonRef.current, {
			duration: 0.5,
			opacity: 0,
			display: "none",
			ease: "power2.inOut", // smooth easing
		});

		gsap.to(contectInfoRef.current, {
			duration: 0.5,
			opacity: 1,
			delay: 1.5,
			height: "fit-content",
			display: "flex",
			flexDirection: "column",

			ease: "power2.inOut", // smooth easing
		});

		gsap.to(linksRef.current, {
			duration: 0.25,
			opacity: 0,
			display: "none",
			ease: "power2.inOut", // smooth easing
		});

		const html = document.getElementsByTagName("body");

		html[0].style.overflowY = "hidden";
	};

	const closeContact = () => {
		gsap.to(boxRef.current, {
			duration: 0.75,
			delay: 0.5,
			height: "100px",
			width: "75vw",
			ease: "power2.inOut", // smooth easing
		});

		gsap.to(closeRef.current, {
			duration: 0.5,
			opacity: 0,
			display: "none",
			ease: "power2.inOut", // smooth easing
		});

		gsap.to(contactButtonRef.current, {
			duration: 0.5,
			delay: 1.25,
			opacity: 1,
			display: "inline",
			ease: "power2.inOut", // smooth easing
		});

		gsap.to(contectInfoRef.current, {
			duration: 0.75,
			opacity: 0,
			ease: "power2.inOut", // smooth easing
		});

		gsap.to(linksRef.current, {
			duration: 0.5,
			delay: 1,
			opacity: 1,
			display: "flex",
			ease: "power2.inOut", // smooth easing
		});
		const html = document.getElementsByTagName("body");

		html[0].style.overflowY = "auto";
	};

	return (
		<header ref={boxRef} className={styles.header}>
			<div className={styles.navFirstRow}>
				<div className={styles.logoWrapper}>
					<Image
						src="/image/DIMENSIONZEHN.svg"
						alt="Logo von Dimension Zehn"
						width={170}
						height={21}
						className={`${styles.logo} ${styles.desktop}`}
						priority
					/>
					<Image
						src="/image/D10-Logo-mobile.svg"
						alt="Mobiles Logo von Dimension Zehn"
						width={64}
						height={64}
						className={`${styles.logo} ${styles.mobile}`}
						priority
					/>
				</div>
				<ul className={styles.links} ref={linksRef}>
					<a href="https://www.google.de">Projekte</a>
					<a href="https://www.google.de">Services</a>
					<a href="https://www.google.de">Über D10</a>
					<a href="https://www.google.de">FAQ</a>
					<a href="https://www.google.de">Kontakt</a>
				</ul>
				<div className={styles.menuWrap}>
					<ContactButton
						ref={contactButtonRef}
						callback={openContact}
					/>

					<button
						type="button"
						className={`${styles.linksMenu} button--icon`}
					>
						<LucideMenu
							size={24}
							strokeWidth={1.5}
							color="#f2f2f2"
						/>
					</button>
				</div>

				<ButtonIcon
					icon={
						<LucideX
							size={24}
							width={24}
							height={24}
							strokeWidth={1.5}
							color="#f2f2f2"
						/>
					}
					ref={closeRef}
				/>
			</div>
			<div
				ref={contectInfoRef}
				style={{
					opacity: 0,
					height: "0px",
					display: "none",
					gap: 20,
					marginTop: 40,
				}}
			>
				<h5>Get in touch</h5>
				<Link href="tel:017660271509" className={styles.contactRow}>
					<LucidePhone size={18} strokeWidth={1.5} color="#f2f2f2" />
					<p style={{ fontWeight: 500 }}>0171 / 60271509</p>
				</Link>

				<Link
					href="mailto:mail@dominikgartz.de?subject=Kontaktanfrage%20über%2010d.de%20"
					className={styles.contactRow}
				>
					<LucideMail size={18} strokeWidth={1.5} color="#f2f2f2" />
					<p style={{ fontWeight: 500 }}>mail@dominikgartz.de</p>
				</Link>

				<button type="button" className="button--primary">
					<Image
						src="/calendly.svg"
						width={18}
						height={18}
						alt="Calendly Icon"
					/>
					Jetzt Termin vereinbaren
				</button>
			</div>
		</header>
	);
};

export default Header;
