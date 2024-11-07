//Took help from chatGPT
//prompt used: Can you give me code for learn more page in this I want to showcase the services that the company provides
//and I want to add animations in that. So the services should scroll from left to right in an animation and the service cards 
//should have hover effect on them I also want to insert images and use react typed for services we offer text that will be written on the top.
"use client";
import React from "react";
import styles from "./learnmore.module.css";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed"; //Install the dependency 

 
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