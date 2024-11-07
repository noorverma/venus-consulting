"use client";
import React from "react";
import styles from "./learnmore.module.css";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";

// Service data with images
const services = [
  {
    title: "Wall Painting",
    description: "High-quality professional wall painting.",
    image: "/painting.jpg"
  },
  {
    title: "Electrical Installation",
    description: "Safe and efficient installations.",
    image: "/electrical.jpg"
  },
  {
    title: "Flooring",
    description: "Quality flooring solutions.",
    image: "/flooring.jpg"
  },
  {
    title: "Carpentry",
    description: "Custom carpentry services.",
    image: "/carpentry.jpg"
  },
  {
    title: "HVAC",
    description: "Heating and cooling systems.",
    image: "/heating.jpg"
  },
  {
    title: "Plumbing",
    description: "Reliable plumbing services.",
    image: "/plumbing.jpg"
  }
];

export default function LearnMore() {
  const servicesRepeated = [...services, ...services, ...services];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        <ReactTyped
          strings={["Services We Provide"]}
          typeSpeed={50}
          backSpeed={50}
          loop
          cursorChar="|"
          showCursor={true}
          className={styles.typedText}
        />
      </h2>

      <div className={styles.marquee}>
        <div className={styles.marqueeContent}>
          {servicesRepeated.map((service, index) => (
            <motion.div
              key={index}
              className={styles.serviceCard}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src={service.image} alt={service.title} className={styles.serviceImage} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}