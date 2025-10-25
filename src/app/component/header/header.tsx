"use client"

import React, {useRef} from 'react';
import styles from './header.module.scss'
import Image from "next/image";
import ContactButton from "@/app/component/header/component/contactButton/contactButton";

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {LucideHamburger, LucideMail, LucideMenu, LucidePhone, LucideX} from "lucide-react";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);

const Header = () => {
    const boxRef = useRef(null)
    const contactButtonRef = useRef(null)
    const closeRef = useRef(null)
    const contectInfoRef = useRef(null)
    const linksRef = useRef(null)
    const telRef = useRef(null)
    const mailRef = useRef(null)


    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: boxRef.current,  // element that triggers the animation
                start: "1px 1px",         // when the top of the element hits 80% of the viewport
                end: "30px 30px",        // when the bottom hits 20%
                scrub: 1// shows start/end markers (for debugging)
            },
        });

        tl.to(boxRef.current, {
            duration: 1,
            width: "75%",
        });

        const cbtl = gsap.timeline({
            scrollTrigger: {
                trigger: contactButtonRef.current,  // element that triggers the animation
                start: "1px 1px",         // when the top of the element hits 80% of the viewport
                end: "30px 30px",        // when the bottom hits 20%
                scrub: 1// shows start/end markers (for debugging)
            },
        });

        cbtl.to(contactButtonRef.current, {
            duration: 1,
            delay: 1,
            opacity: "1",
    display: "inline",
        });

        const rtl = gsap.timeline({
            scrollTrigger: {
                trigger: linksRef.current,  // element that triggers the animation
                start: "1px 1px",         // when the top of the element hits 80% of the viewport
                end: "30px 30px",        // when the bottom hits 20%
                scrub: 1// shows start/end markers (for debugging)
            },
        });

        rtl.to(linksRef.current, {
            duration: 1,
            transform: "translate(50%, -50%)"
        });
    });

    const openContact = () => {
        gsap.to(boxRef.current, {
            duration: 0.75,
            delay: 1,
            height: "90vh",           // 👈 animate height
            ease: "power2.inOut",  // smooth easing
        });

        gsap.to(closeRef.current, {
            duration: 1,
            opacity: 1,
            delay: 0.5,
            display: "inline",
            ease: "power2.inOut",  // smooth easing
        });

        gsap.to(contactButtonRef.current, {
            duration: 0.5,
            opacity: 0,
            display: "none",
            ease: "power2.inOut",  // smooth easing
        });

        gsap.to(contectInfoRef.current, {
            duration: 1,
            opacity: 1,
            delay: 1.5,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            ease: "power2.inOut",  // smooth easing
        });

        gsap.to(linksRef.current, {
            duration: 1,
            opacity: 0,
            display:"none",
            ease: "power2.inOut",  // smooth easing
        });

        gsap.to(telRef.current, {
            duration: 0.5,
            opacity: 1,
            display:"inline",
            ease: "power2.inOut",  // smooth easing
        });
        gsap.to(mailRef.current, {
            duration: 1,
            opacity: 1,
            display:"inline",
            ease: "power2.inOut",  // smooth easing
        });
        const html = document.getElementsByTagName('body')

        html[0].style.overflowY = "hidden";
    }


    const closeContact = () => {
        gsap.to(boxRef.current, {
            duration: 1,
            delay: 0.5,
            height: "100px",           // 👈 animate height
            ease: "power2.inOut",  // smooth easing
        });

        gsap.to(closeRef.current, {
            duration: 1,
            opacity: 0,
            display: "none",
            ease: "power2.inOut",  // smooth easing
        });

        gsap.to(contactButtonRef.current, {
            duration: 2,
            delay: 1,
            opacity: 1,
            display: "inline",
            ease: "power2.inOut",  // smooth easing
        });

        gsap.to(contectInfoRef.current, {
            duration: 1,
            opacity: 0,
            height: "0px",
            ease: "power2.inOut",  // smooth easing
        });

        gsap.to(linksRef.current, {
            duration: 1,
            delay: 1,
            opacity: 1,
            display:"flex",
            ease: "power2.inOut",  // smooth easing
        });
        const html = document.getElementsByTagName('body')

        html[0].style.overflowY = "auto";

    }


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
                    <li>Projekte</li>
                    <li>Services</li>
                    <li>Über D10</li>
                    <li>FAQ</li>
                    <li>Kontakt</li>
                </ul>

                <button className={styles.linksMenu + " button--secondary"}><LucideMenu size={18} strokeWidth={1.5} color="#f2f2f2"/>Menu</button>
                <ContactButton ref={contactButtonRef} callback={openContact}/>
                <button ref={closeRef} onClick={closeContact} className="button--icon"
                        style={{opacity: 0, display: "none"}}>
                    <LucideX strokeWidth={1.5} color="#f2f2f2"/>
                </button>
            </div>
            <div ref={contectInfoRef} style={{opacity: 0, height: "0px", display: "none", gap: 20}}>
                <h2>Kontaktdaten</h2>
                <Link href="tel:017660271509" className={styles.contactRow}>
                    <LucidePhone size={18} strokeWidth={1.5} color="#f2f2f2"/>
                    <p ref={telRef} style={{fontWeight: 500}}>0171 / 60271509</p>
                </Link>

                <Link href="mailto:mail@dominikgartz.de?subject=Kontaktanfrage%20über%2010d.de%20" className={styles.contactRow}>

                    <LucideMail size={18} strokeWidth={1.5} color="#f2f2f2"/>
                    <p ref={mailRef} style={{fontWeight: 500}}>mail@dominikgartz.de</p>
                </Link>

                <button className="button--primary"><Image src="/calendly.svg" width={18} height={18} alt="Calendly Icon"/>Jetzt Termin vereinbaren</button>
            </div>
        </header>
    );
};

export default Header;