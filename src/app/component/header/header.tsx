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
import styles from "./header.module.scss";

gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(ScrollTrigger);

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.logoWrapper}>
				<Image
					src="/d10.svg"
					alt="Logo von Dimension Zehn"
					width={48}
					height={48}
					className={`${styles.logo} ${styles.desktop}`}
					priority
				/>
			</div>

			<ul className={styles.links}>
				<a href="https://www.google.de">Leistungen</a>
				<a href="https://www.google.de">Ansatz</a>
				<a href="https://www.google.de">Über D10</a>
				<a href="https://www.google.de">Kontakt</a>
			</ul>

			<div className={styles.menuWrap}>
				<ButtonIcon
					icon={<LucidePhone size={20} />}
					callback={() => {}}
				/>
			</div>
		</header>
	);
};

export default Header;
