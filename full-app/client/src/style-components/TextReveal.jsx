import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, memo } from "react";

export const FadeInText = memo(({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

FadeInText.displayName = 'FadeInText';

export const BlurText = memo(({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ filter: "blur(10px)", opacity: 0 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1 } : { filter: "blur(10px)", opacity: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

BlurText.displayName = 'BlurText';

export const TypewriterText = memo(({ text, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div ref={ref} className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 0.03,
            delay: delay + index * 0.03,
            ease: "easeOut"
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
});

TypewriterText.displayName = 'TypewriterText';

export const GlitchText = memo(({ children, className = "" }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        textShadow: [
          "0 0 0 transparent",
          "2px 0 0 #ff0000, -2px 0 0 #00ffff",
          "0 0 0 transparent"
        ]
      }}
      transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
    >
      {children}
    </motion.div>
  );
});

GlitchText.displayName = 'GlitchText';