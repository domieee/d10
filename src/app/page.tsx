"use client";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import Threads from "@/app/component/threads/Threads";
import styles from "./page.module.scss";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
	const h1Ref = useRef(null);
	const h1SubtextRef = useRef(null);

	const heroRef = useRef(null);
	const textRef = useRef(null);
	const serviceHeaderRef = useRef(null);
	const blockOneRef = useRef(null);
	const blockTwoRef = useRef(null);
	const blockThreeRef = useRef(null);

	const servicesRef = useRef(null);

	useLayoutEffect(() => {
		if (!textRef.current || !heroRef.current || !servicesRef.current)
			return;

		let split: SplitText | null = null;

		const ctx = gsap.context(() => {
			// 1) Split
			split = new SplitText(textRef.current, { type: "words" });
			const words = split.words;
			const total = words.length;

			// 2) Initial state
			gsap.set(words, {
				opacity: 0,
				color: "#ccc",
				willChange: "transform,opacity,color",
			});

			// 3) Hero fade/scale (linear scrub)
			gsap.fromTo(
				heroRef.current,
				{ opacity: 1, scale: 1, transformOrigin: "50% 50%" },
				{
					opacity: 0,
					scale: 0.9,
					ease: "none",
					scrollTrigger: {
						trigger: servicesRef.current,
						start: "bottom bottom",
						end: "bottom 85%",
						scrub: true,
					},
				},
			);

			// 4) Words fade-in with stagger (scrubbed)
			gsap.to(words, {
				opacity: 1,
				scale: 1,
				ease: "none",
				stagger: 0.05,
				scrollTrigger: {
					trigger: "#projectCallWrapper",
					start: "20% 85%",
					end: "bottom 100%",
					scrub: true,
				},
			});

			// 5) Color gradient based on progress
			ScrollTrigger.create({
				trigger: "#projectCallWrapper",
				start: "top 75%",
				end: "bottom 60%",
				scrub: true,
				onUpdate: (self) => {
					words.forEach((word, i) => {
						const position = i / total;
						const distance = self.progress - position;
						const intensity =
							distance >= 0 ? Math.min(distance * 2, 1) : 0;

						gsap.set(word, {
							color: gsap.utils.interpolate(
								"#ccc",
								"#f2f2f2",
								intensity,
							),
						});
					});
				},
			});

			// Optional, falls Split/Fonts/Layout die Trigger-Positionen verändern:
			ScrollTrigger.refresh();
		});

		return () => {
			ctx.revert(); // killt Tweens/ScrollTriggers im Context [web:32]
			split?.revert(); // baut den Text DOM wieder zurück [web:69]
		};
	}, []);

	return (
		<div className={styles.page}>
			<section ref={servicesRef} className={styles.hero}>
				<Threads
					amplitude={0.4}
					distance={0.6}
					enableMouseInteraction={true}
				/>

				<article id="art" data-speed="2.0">
					<div ref={heroRef} className={styles.textWrap}>
						<h1 ref={h1Ref}>
							<span>Digitale Markenauftritte</span> <br /> mit
							technischer Tiefe.
						</h1>

						<p ref={h1SubtextRef}>
							d10 entwickelt technisch saubere Websites für lokale
							Marken mit Anspruch. <br /> Der Fokus liegt auf
							klarer Struktur, moderner Technologie und
							nachhaltiger Wartbarkeit.
						</p>
					</div>
				</article>
			</section>

			<section className={styles.services} id="services">
				<div
					className={`${styles.servicesHeader} headingWrapper`}
					ref={serviceHeaderRef}
				>
					<h2>Leistungen</h2>
				</div>
				<div className={styles.blockWrapper}>
					<div className={styles.block} ref={blockOneRef}>
						<div className={styles.blockHeader}>
							<h3>Marken-Website</h3>
							<ul>
								<li className={styles.blockChip}>
									Struktur & Informationsarchitektur
								</li>
								<li className={styles.blockChip}>
									Performance-Optimierung
								</li>
								<li className={styles.blockChip}>
									SEO-Grundlagen
								</li>
								<li className={styles.blockChip}>
									Barrierearme Umsetzung
								</li>
							</ul>
						</div>
						<p>
							Konzeption und Umsetzung eines professionellen
							Markenauftritts auf moderner technischer Basis.
						</p>
					</div>
					<div className={styles.block} ref={blockTwoRef}>
						<div className={styles.blockHeader}>
							<h3>Technische Neustrukturierung</h3>

							<p>
								Für bestehende Websites mit gewachsenem oder
								ineffizientem Unterbau.
							</p>
						</div>
						<ul>
							<li className={styles.blockChip}>
								Analyse der bestehenden Website
							</li>
							<li className={styles.blockChip}>
								Technische Neuaufsetzung
							</li>
							<li className={styles.blockChip}>
								Verbesserung von Ladezeiten und Struktur
							</li>
							<li className={styles.blockChip}>
								SEO-Optimierung
							</li>
						</ul>
					</div>

					<div className={styles.block} ref={blockThreeRef}>
						<div className={styles.blockHeader}>
							<h3>Betreuung & Weiterentwicklung</h3>
							<p>
								Langfristige technische Begleitung für Marken,
								die ihren Auftritt kontinuierlich verbessern
								möchten.
							</p>
						</div>

						<ul>
							<li className={styles.blockChip}>
								Technische Updates
							</li>
							<li className={styles.blockChip}>
								Funktionale Erweiterungen
							</li>
							<li className={styles.blockChip}>
								Performance-Feinschliff
							</li>
							<li className={styles.blockChip}>Beratung</li>
						</ul>
					</div>
				</div>
			</section>

			<section className={styles.ansatz}>
				<article>
					<div className="headingWrapper">
						<h2>Ansatz</h2>
					</div>

					<fieldset>
						<legend>Qualität vor Geschwindigkeit</legend>
						<p>
							Wir setzen auf sauberen, robusten Code und stabile
							Architekturen, damit digitale Produkte langfristig
							zuverlässig laufen.
						</p>
					</fieldset>
					<fieldset>
						<legend>Klarheit vor Effekten</legend>
						<p>
							Intuitive Interfaces und logische Strukturen stehen
							im Mittelpunkt, unnötige Spielereien bleiben außen
							vor.
						</p>
					</fieldset>
					<fieldset>
						<legend>Wartbarkeit vor Trends</legend>
						<p>
							Unsere Lösungen sind zukunftssicher, leicht
							erweiterbar und nachhaltig gepflegt.
						</p>
					</fieldset>
				</article>
			</section>

			<section
				className={styles.projectCallWrapper}
				id="projectCallWrapper"
			>
				<div className={styles.projectCall}>
					<blockquote className="big" ref={textRef}>
						Jedes Projekt basiert auf einer sauberen technischen
						Grundlage mit klarer Kommunikation.
					</blockquote>
				</div>
			</section>

			<section style={{ height: "100vh", textAlign: "center" }}>
				<article
					style={{
						display: "flex",
						justifyContent: "center",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<h2>Über D10</h2>
					<div style={{ marginTop: "1rem" }}>
						<p>
							Bei d10 entwickeln wir digitale Produkte, die Marken
							spürbar weiterbringen. Wir sind eine inhabergeführte
							Digitalagentur – nah dran an unseren Kund:innen und
							ihren Herausforderungen. Dabei legen wir Wert auf
							sauberen Code, wartbare Systeme und Lösungen, die
							auch in Zukunft Bestand haben. Unsere Zusammenarbeit
							ist direkt, transparent und geprägt von echtem
							Austausch. Mit klaren Prozessen, modernen
							Technologien und einem hohen Anspruch an Qualität
							schaffen wir digitale Erlebnisse, die Marken in der
							digitalen Welt stark und verlässlich machen.
						</p>
					</div>
					<figure
						style={{
							marginTop: "2rem",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: "0.5rem",
						}}
					>
						<div
							style={{
								width: 125,
								height: 125,
								position: "relative",
								aspectRatio: 3 / 4,
								borderRadius: "100%",
								overflow: "hidden",
							}}
						>
							<Image
								src="/profile (1).jpg"
								alt="Profil Bild"
								fill
								style={{
									objectFit: "cover",
									objectPosition: "0% 35%",
								}}
							/>
						</div>
						<figcaption>
							Dominik Gartz, Inhaber von D10 <br />
							Webentwickler und Designer
						</figcaption>
					</figure>
				</article>
			</section>

			<section className={styles.contact}>
				<article className="contact__article">
					<h2>Kontakt</h2>
					<div style={{ marginTop: "1rem" }}>
						<p>
							Für Projektanfragen oder technische Rückfragen –
							egal, ob Sie schon ein klares Konzept haben oder
							erst grob wissen, wo es hakt.
						</p>
						<form className="contact__article__form">
							<div className={styles.inputRow}>
								<input
									className="input primary"
									type="text"
									placeholder="Ihr Name"
								/>
								<input
									className="input primary"
									type="email"
									placeholder="Ihre E-Mail-Adresse für die Rückmeldung“"
								/>
							</div>
							<textarea
								className="input primary"
								placeholder="Was soll Ihre Website können? Wo stehen Sie aktuell?"
							/>
							<p
								className="subtext"
								style={{ textAlign: "center" }}
							>
								Wir melden uns in der Regel innerhalb von 1–2
								Werktagen. Ihre Angaben werden nur zur
								Beantwortung Ihrer Anfrage genutzt.
							</p>

							<button
								className="button--primary"
								style={{ marginTop: "1rem" }}
								type="submit"
							>
								Jetzt Kontakt anfragen
							</button>
						</form>
					</div>
				</article>
			</section>
		</div>
	);
}
