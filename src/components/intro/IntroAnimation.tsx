'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroAnimationProps {
  children: React.ReactNode;
}

export default function IntroAnimation({ children }: IntroAnimationProps) {
  const [hasShown, setHasShown] = useState<boolean | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const introShown = sessionStorage.getItem('hf_intro_shown');
    
    if (introShown === 'true') {
      setHasShown(true);
      setAnimationComplete(true);
    } else {
      setHasShown(false);
    }
  }, []);

  useEffect(() => {
    if (hasShown === false && !animationComplete) {
      const timer = setTimeout(() => {
        setAnimationComplete(true);
        sessionStorage.setItem('hf_intro_shown', 'true');
      }, 2500); // Total animation duration

      return () => clearTimeout(timer);
    }
  }, [hasShown, animationComplete]);

  // Prevent flash of content
  if (hasShown === null) {
    return null;
  }

  // Skip animation if already shown
  if (hasShown === true) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {!animationComplete && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
              transition: {
                duration: 0.8,
                ease: [0.65, 0, 0.35, 1],
                clipPath: {
                  type: 'tween',
                  duration: 1.2,
                  ease: [0.65, 0, 0.35, 1],
                },
              },
            }}
          >
            <motion.div
              className="text-white text-4xl md:text-6xl font-bold"
              initial={{ y: '110%', opacity: 0 }}
              animate={{
                y: '0%',
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                ease: [0.65, 0, 0.35, 1],
                delay: 0.3,
              }}
            >
              Hafiz Fajar
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: animationComplete ? 1 : 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.2,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
