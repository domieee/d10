'use client';

import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LucidePhone } from 'lucide-react';
import ButtonIcon from '@/app/component/button/icon/button-icon';
import styles from './header.module.scss';

gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(ScrollTrigger);

const Header = () => {
    return (
        <header className={styles.header}>
            <a href="/" className={styles.logoWrapper}>
                <p>D10</p>
            </a>

            <ul className={styles.links}>
                <a href="https://www.google.de">Leistungen</a>
                <a href="https://www.google.de">Ansatz</a>
                <a href="https://www.google.de">Über D10</a>
                <a href="https://www.google.de">Kontakt</a>
            </ul>

            <div className={styles.menuWrap}>
                <ButtonIcon icon={<LucidePhone size={20} />} callback={() => {}} />
            </div>
        </header>
    );
};

export default Header;
