import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const shapes = [
  // x%, y%, size, rotation speed, move range, delay, color, type
  { x: '8%',  y: '12%', size: 28, dur: 14, dx: 60,  dy: -40, delay: 0,   color: 'rgba(99,102,241,0.18)',  type: 'diamond' },
  { x: '88%', y: '8%',  size: 20, dur: 18, dx: -50, dy: 55,  delay: 1.5, color: 'rgba(139,92,246,0.15)', type: 'square'  },
  { x: '75%', y: '70%', size: 34, dur: 22, dx: -70, dy: -30, delay: 3,   color: 'rgba(59,130,246,0.14)', type: 'diamond' },
  { x: '15%', y: '65%', size: 18, dur: 16, dx: 45,  dy: 50,  delay: 5,   color: 'rgba(167,139,250,0.13)', type: 'square' },
  { x: '50%', y: '20%', size: 14, dur: 20, dx: -40, dy: 60,  delay: 2,   color: 'rgba(99,102,241,0.12)',  type: 'circle' },
  { x: '30%', y: '80%', size: 22, dur: 24, dx: 55,  dy: -45, delay: 7,   color: 'rgba(124,58,237,0.13)', type: 'circle'  },
  { x: '92%', y: '45%', size: 16, dur: 19, dx: -60, dy: -50, delay: 4,   color: 'rgba(79,70,229,0.16)',  type: 'diamond' },
  { x: '60%', y: '88%', size: 26, dur: 28, dx: 30,  dy: -65, delay: 9,   color: 'rgba(139,92,246,0.11)', type: 'square'  },
];

const Shape = ({ x, y, size, dur, dx, dy, delay, color, type }) => {
  const style = {
    position: 'absolute',
    left: x,
    top: y,
    width: size,
    height: size,
    opacity: 1,
  };

  let inner;
  if (type === 'diamond') {
    inner = (
      <div style={{
        width: size, height: size,
        background: color,
        transform: 'rotate(45deg)',
        borderRadius: 3,
        border: `1px solid ${color.replace(/[\d.]+\)$/, '0.35)')}`,
      }} />
    );
  } else if (type === 'square') {
    inner = (
      <div style={{
        width: size, height: size,
        background: 'transparent',
        borderRadius: 4,
        border: `1.5px solid ${color.replace(/[\d.]+\)$/, '0.4)')}`,
      }} />
    );
  } else {
    inner = (
      <div style={{
        width: size, height: size,
        borderRadius: '50%',
        background: 'transparent',
        border: `1.5px solid ${color.replace(/[\d.]+\)$/, '0.35)')}`,
      }} />
    );
  }

  return (
    <motion.div
      style={style}
      animate={{
        x: [0, dx, dx * 0.4, 0],
        y: [0, dy * 0.5, dy, 0],
        rotate: type === 'diamond' ? [45, 90, 45] : [0, 15, -10, 0],
        opacity: [0.6, 1, 0.7, 0.6],
      }}
      transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {inner}
    </motion.div>
  );
};

const AnimatedHeroBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Soft glow blobs */}
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -50, 30, 0], scale: [1, 1.15, 0.92, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-800/25 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -30, 50, 0], y: [0, 40, -35, 0], scale: [1, 0.88, 1.2, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute -top-16 -right-24 w-[420px] h-[420px] rounded-full bg-purple-800/20 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 25, -40, 0], y: [0, 60, -20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
        className="absolute top-1/3 left-1/4 w-[380px] h-[380px] rounded-full bg-indigo-900/20 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -50, 20, 0], y: [0, -30, 55, 0], scale: [1, 1.18, 0.9, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 12 }}
        className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-violet-900/15 blur-3xl"
      />

      {/* Floating geometric shapes — desktop only */}
      {!isMobile && shapes.map((s, i) => <Shape key={i} {...s} />)}

      {/* Subtle dot-grid overlay — desktop only */}
      {!isMobile && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(148,130,246,0.6) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      )}
    </div>
  );
};

export default AnimatedHeroBackground;
