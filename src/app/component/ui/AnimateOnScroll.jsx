"use client";

import { motion } from "framer-motion";

/**
 * Animation variants for scroll-triggered reveals.
 * Each variant defines an initial (hidden) and animate (visible) state.
 */
const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

/**
 * Reusable scroll-triggered animation wrapper using framer-motion.
 *
 * @param {"fadeUp"|"fadeDown"|"fadeLeft"|"fadeRight"|"scaleUp"|"fadeIn"} variant - animation type
 * @param {number} delay - delay in seconds before animation starts
 * @param {number} duration - animation duration in seconds
 * @param {string} className - additional CSS classes
 * @param {React.ReactNode} children
 */
export default function AnimateOnScroll({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
  amount = 0.2,
}) {
  const selected = variants[variant] || variants.fadeUp;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={selected}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered container — children animate one after another.
 * Wrap each child in AnimateOnScroll for individual item animations.
 */
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
  amount = 0.15,
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * A single stagger child — must be used inside StaggerContainer.
 */
export function StaggerItem({
  children,
  className = "",
  variant = "fadeUp",
  duration = 0.5,
}) {
  const selected = variants[variant] || variants.fadeUp;

  return (
    <motion.div
      variants={selected}
      transition={{
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
