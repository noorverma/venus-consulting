//Used chatGPT to get an idea on how to changes the nummber of the years displayed and here is the prompt that I added 
//Give me code to create animation, years will display from 2000 to 2024 only the last digits of the years should change
//and the rest should stauy in place and also add background images in it, 4 images should be good and should change after every 5 years
"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion"; //Install framer motion dependency
import styles from "./page.module.css"; //Import styles from the css file

export default function LandingPage() {
  const initialYear = 2000; //Intial year for the year animation
  const currentYear = new Date().getFullYear();
  const [displayedYear, setDisplayedYear] = useState(initialYear);
  const [showContent, setShowContent] = useState(false);
  const images = [
    "/innovation.png",
    "/commerce-solution.png",
    "/budget.png",
    "/workers.png",
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundImageRef = useRef(null); 

  useEffect(() => {
    let year = initialYear;
    let imageIndex = 0;

    const interval = setInterval(() => {
      if (year < currentYear) {
        year++;
        setDisplayedYear(year);

        if ((year - initialYear) % 5 === 0) {
          imageIndex = (imageIndex + 1) % images.length;
          setCurrentImageIndex(imageIndex);
          if (backgroundImageRef.current) {
            backgroundImageRef.current.src = images[imageIndex]; 
          }
        }
      } else {
        clearInterval(interval);
        setShowContent(true);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentYear, initialYear]);

  return (
    <div className={styles.landingPage}>
      {!showContent ? (
        <div className={styles.yearContainer}>
          <Image
            ref={backgroundImageRef} 
            src={images[currentImageIndex]}
            alt="Background"
            className={styles.backgroundImage}
            width={300}
            height={300}
          />
          <div className={styles.yearText}>{displayedYear}</div>
        </div>
      ) : (
        <motion.div
          className={styles.mainContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className={styles.logoContainer}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <Image src="/logo.png" alt="Logo" width={56} height={56} />
            <span className={styles.companyName}>Electrical Consulting</span>
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Your Vision{" "}
            <motion.span
              className={styles.highlight}
              initial={{ backgroundPosition: "100% 0" }}
              animate={{ backgroundPosition: "0 0" }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            >
              Wired to Perfection
            </motion.span>
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            Delivering Advanced Electrical Engineering Solutions to Power your Success.
          </motion.p>

          <div className={styles.buttonContainer}>
            <Link href="/SignIn" legacyBehavior>
              <motion.a
                className={`${styles.button} ${styles.getStarted}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Get Started
              </motion.a>
            </Link>
            <Link href="/learnmore" legacyBehavior>
              <motion.a
                className={`${styles.button} ${styles.learnMore}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Learn More
              </motion.a>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
