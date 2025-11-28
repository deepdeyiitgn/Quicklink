import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 500 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();

    const moveHandler = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const clickHandler = (e: MouseEvent) => {
      const id = Date.now();
      setClicks((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== id));
      }, 500);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('click', clickHandler);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('click', clickHandler);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          translateX: springX,
          translateY: springY,
          x: '-50%',
          y: '-50%',
        }}
      >
        <div className="w-5 h-5 rounded-full bg-cyan-400/80 shadow-[0_0_12px_#22d3ee] mix-blend-difference" />
      </motion.div>

      <AnimatePresence>
        {clicks.map(({ id, x, y }) => (
          <motion.div
            key={id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed pointer-events-none z-[9998]"
            style={{ top: y, left: x, x: '-50%', y: '-50%' }}
          >
            <div className="w-5 h-5 rounded-full border-2 border-cyan-300/70 shadow-[0_0_10px_#22d3ee]" />
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1,
                  x: Math.cos((i * Math.PI) / 3) * 20,
                  y: Math.sin((i * Math.PI) / 3) * 20,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-300 rounded-full"
                style={{ x: '-50%', y: '-50%' }}
              />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
