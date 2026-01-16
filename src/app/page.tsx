"use client";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ButtonSecondary from "@/app/component/button/secondary/button-secondary";
import styles from "./page.module.scss";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
	return (
		<div className={styles.page}>
			<section className={styles.hero}>
				<article id="art" data-speed="2.0">
					<h1>Digitale Markenauftritte mit technischer Tiefe.</h1>

					<div>
						<p>
							d10 entwickelt technisch saubere Websites für lokale
							Marken mit Anspruch. <br /> Der Fokus liegt auf
							klarer Struktur, moderner Technologie und
							nachhaltiger Wartbarkeit.
						</p>
					</div>
				</article>
			</section>

			<section className={styles.services}>
				<div className={styles.servicesHeader}>
					<h2>Leistungen</h2>
					<p>Technologie für einen klaren Markenauftritt.</p>
				</div>
				<div className={styles.block}>
					<h3>Marken-Website</h3>
					<div>
						<p>
							Konzeption und Umsetzung eines professionellen
							Markenauftritts auf moderner technischer Basis.
						</p>
						<ul>
							<li>Struktur & Informationsarchitektur</li>
							<li>Performance-Optimierung</li>
							<li>SEO-Grundlagen</li>
							<li>Barrierearme Umsetzung</li>
						</ul>
					</div>
				</div>
				<div className={styles.block}>
					<h3>Technische Neustrukturierung</h3>
					<div>
						<p>
							Für bestehende Websites mit gewachsenem oder
							ineffizientem Unterbau.
						</p>
						<ul>
							<li>Analyse der bestehenden Website</li>
							<li>Technische Neuaufsetzung</li>
							<li>Verbesserung von Ladezeiten und Struktur</li>
							<li>SEO-Optimierung</li>
							<li>Saubere Codebasis</li>
						</ul>
					</div>
				</div>

				<div className={styles.block}>
					<h3>Betreuung & Weiterentwicklung</h3>
					<div>
						<p>
							Langfristige technische Begleitung für Marken, die
							ihren Auftritt kontinuierlich verbessern möchten.
						</p>
						<ul>
							<li>Technische Updates</li>
							<li>Funktionale Erweiterungen</li>
							<li>Performance-Feinschliff</li>
							<li>Beratung</li>
						</ul>
					</div>
				</div>
			</section>

			<section style={{ height: "100vh" }}>
				<article>
					<h2>Ansatz</h2>
					<p>
						d10 arbeitet reduziert, strukturiert und
						technologieorientiert.
					</p>

					<ul>
						<li>Qualität vor Geschwindigkeit</li>
						<li> Klarheit vor Effekten</li>
						<li>Wartbarkeit vor Trends</li>
					</ul>
					<p>
						Jedes Projekt basiert auf einer sauberen technischen
						Grundlage und klarer Kommunikation.
					</p>
				</article>
			</section>

			<section>
				<article>
					<h2>Über D10</h2>
					<p>
						d10 ist eine inhabergeführte Digitalagentur mit Fokus
						auf Marken und Technologie. Die Zusammenarbeit ist
						direkt, transparent und auf langfristige Qualität
						ausgelegt.
					</p>
				</article>
			</section>

			<section>
				<article>
					<h2>Kontakt</h2>
					<p>hi@d10.digital</p>
				</article>
			</section>
		</div>
	);
}
