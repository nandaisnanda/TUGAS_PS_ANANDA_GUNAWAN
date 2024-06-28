import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import styles from "./Hero.module.scss";
import { animateTitle, animateImage, revealMenu } from "./animations";

const Hero = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const timeline = useRef(gsap.timeline());
  const heroRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const tl = timeline.current;

      tl.add(animateTitle()).add(revealMenu(), 0).add(animateImage(), 0);
    }, heroRef);

    return () => context.revert();
  }, []);

  const switchTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <section
      className={`${styles.hero} ${
        isDarkMode ? styles["hero--dark"] : styles["hero--light"]
      }`}
      ref={heroRef}
    >
      <div className={styles.hero__top}>
        <span data-menu-item data-hidden>Destination</span>
        <span data-menu-item data-hidden>Home</span>
        <span data-menu-item data-hidden>About</span>
        <span data-menu-item data-hidden>Plan</span>
        <span data-menu-item data-hidden>
          <a
            href="https://uj1k.github.io/Peta_Navigasi_Jarak/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Maps
          </a>
        </span>
      </div>

      <h1 className={styles.hero__title}>
        <span data-hidden data-title-first>Yogyakarta Maps</span>
        <span data-hero-line className={styles.hero__line}></span>
        <span data-hidden data-title-last>Project</span>
      </h1>

      <div className={styles.hero__image}>
        <Image
          data-image
          src="/images/solo3.jpg"
          layout="responsive"
          width={800}
          height={400}
          alt="Surakarta"
          className={styles.hero__imageElement}
        />
      </div>

      <button id="theme-switcher" onClick={switchTheme}>
        <span className={styles.switch_circle}></span>
      </button>
    </section>
  );
};

export default Hero;
