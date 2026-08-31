import React from 'react';
import { motion } from 'framer-motion';

/**
 * Editorial vignette for the Free IT Assessment page.
 * A founder alone at a desk late at night, backlit by a laptop, with a loose
 * cluster of disconnected systems and alerts drifting overhead. Pure SVG so it
 * ships with no asset, no licence, and stays crisp in the dark navy palette.
 * Swap for a real photograph by replacing <FounderNightScene /> with an <img>.
 */

const tiles = [
  { x: 96, y: 60, r: -12, icon: 'padlock', badge: true },
  { x: 210, y: 38, r: 7, icon: 'user' },
  { x: 322, y: 50, r: -5, icon: 'cloud' },
  { x: 430, y: 40, r: 9, icon: 'warn-amber' },
  { x: 512, y: 92, r: -9, icon: 'warn-red', badge: true, pulse: true },
  { x: 470, y: 168, r: 6, icon: 'database' },
  { x: 110, y: 150, r: 13, icon: 'wifi' },
];

const connectors = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 6], [2, 5],
];

const Icon = ({ name }) => {
  const s = { fill: 'none', stroke: 'rgba(203,213,225,0.85)', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'user':
      return (<g style={s}><circle cx="0" cy="-4" r="5" /><path d="M-9 10 C -9 1 9 1 9 10" /></g>);
    case 'cloud':
      return (<g style={s}><path d="M-10 7 a7 7 0 0 1 2 -13 a9 9 0 0 1 17 2 a6 6 0 0 1 -1 11 Z" /></g>);
    case 'padlock':
      return (<g style={s}><rect x="-8" y="-1" width="16" height="12" rx="2" /><path d="M-5 -1 v-4 a5 5 0 0 1 10 -2" /></g>);
    case 'wifi':
      return (<g style={s}><path d="M-11 -3 a15 15 0 0 1 22 0" /><path d="M-7 2 a9 9 0 0 1 14 0" /><circle cx="0" cy="8" r="1.4" style={{ fill: 'rgba(203,213,225,0.85)' }} /></g>);
    case 'database':
      return (<g style={s}><ellipse cx="0" cy="-7" rx="9" ry="3.4" /><path d="M-9 -7 v14 a9 3.4 0 0 0 18 0 v-14" /><path d="M-9 0 a9 3.4 0 0 0 18 0" /></g>);
    case 'warn-amber':
      return (<g style={{ fill: 'none', stroke: 'rgba(251,191,36,0.95)', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M0 -11 L11 9 L-11 9 Z" /><line x1="0" y1="-3" x2="0" y2="3" /><circle cx="0" cy="6.5" r="0.9" style={{ fill: 'rgba(251,191,36,0.95)' }} /></g>);
    case 'warn-red':
      return (<g style={{ fill: 'none', stroke: 'rgba(248,113,113,0.95)', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M0 -11 L11 9 L-11 9 Z" /><line x1="0" y1="-3" x2="0" y2="3" /><circle cx="0" cy="6.5" r="0.9" style={{ fill: 'rgba(248,113,113,0.95)' }} /></g>);
    default:
      return null;
  }
};

const FounderNightScene = () => (
  <div className="relative rounded-xl border border-indigo-900/60 bg-gradient-to-b from-slate-900/70 to-[#0b0b2e]/80 overflow-hidden shadow-2xl">
    <svg viewBox="0 0 640 340" className="w-full h-auto block" role="img" aria-labelledby="night-scene-title" preserveAspectRatio="xMidYMid meet">
      <title id="night-scene-title">A founder alone at a desk late at night, surrounded by disconnected systems and alerts</title>
      <defs>
        <radialGradient id="fns-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(251,191,36,0.5)" />
          <stop offset="55%" stopColor="rgba(251,191,36,0.12)" />
          <stop offset="100%" stopColor="rgba(251,191,36,0)" />
        </radialGradient>
        <radialGradient id="fns-vignette" cx="50%" cy="40%" r="75%">
          <stop offset="60%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(3,4,20,0.55)" />
        </radialGradient>
        <linearGradient id="fns-figure" gradientUnits="userSpaceOnUse" x1="0" y1="92" x2="0" y2="260">
          <stop offset="0%" stopColor="#6b74b0" />
          <stop offset="100%" stopColor="#3f4780" />
        </linearGradient>
        <linearGradient id="fns-desk" gradientUnits="userSpaceOnUse" x1="0" y1="250" x2="0" y2="302">
          <stop offset="0%" stopColor="#9298a5" />
          <stop offset="14%" stopColor="#7c8290" />
          <stop offset="100%" stopColor="#565b68" />
        </linearGradient>
      </defs>

      {/* laptop backlight, behind the figure */}
      <ellipse cx="342" cy="196" rx="170" ry="120" fill="url(#fns-glow)" />

      {/* faint connectors between the drifting tiles */}
      <motion.g
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        {connectors.map(([a, b], i) => (
          <line
            key={i}
            x1={tiles[a].x} y1={tiles[a].y}
            x2={tiles[b].x} y2={tiles[b].y}
            stroke="rgba(148,163,184,0.16)"
            strokeWidth="1"
            strokeDasharray="3 5"
          />
        ))}
        {tiles.map((t, i) => (
          <g key={i} transform={`translate(${t.x} ${t.y}) rotate(${t.r})`}>
            <rect x="-19" y="-19" width="38" height="38" rx="9" fill="#111641" stroke="rgba(148,163,184,0.28)" strokeWidth="1" />
            <Icon name={t.icon} />
            {t.badge && (
              <motion.circle
                cx="15" cy="-15" r="4.5"
                fill={t.icon === 'warn-red' ? '#ef4444' : '#f59e0b'}
                animate={t.pulse ? { opacity: [1, 0.35, 1] } : undefined}
                transition={t.pulse ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } : undefined}
              />
            )}
          </g>
        ))}
      </motion.g>

      {/* desk */}
      <rect x="96" y="250" width="448" height="6" rx="3" fill="#a6abb6" />
      <rect x="96" y="256" width="448" height="46" fill="url(#fns-desk)" />

      {/* figure: hunched at the desk, both hands flying to the head, mouth open at the pile of work */}
      <g fill="url(#fns-figure)">
        {/* neck */}
        <path d="M254 138 h16 v30 h-16 Z" />
        {/* hunched shoulders / torso */}
        <path d="M206 252 C 205 218 214 189 234 179 C 246 174 278 174 290 179 C 310 189 319 218 318 252 Z" />
        {/* head */}
        <ellipse cx="262" cy="116" rx="22" ry="24.5" />
        {/* arms: shoulder up to a raised elbow, back in to the temple */}
        <path d="M234 183 L210 143 L243 112" fill="none" stroke="url(#fns-figure)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M290 183 L314 143 L281 112" fill="none" stroke="url(#fns-figure)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        {/* hands gripping the sides of the head */}
        <circle cx="243" cy="113" r="7" />
        <circle cx="281" cy="113" r="7" />
        {/* cool rim light down the back edge */}
        <path d="M212 250 C 211 216 219 188 236 179" fill="none" stroke="rgba(160,188,255,0.5)" strokeWidth="2.5" strokeLinecap="round" />
        {/* screen-lit worried face */}
        <g fill="none" strokeLinecap="round">
          <path d="M249 106 q5 -4.5 9.5 -1.5" stroke="#12162f" strokeWidth="2" />
          <path d="M265 104.5 q5 -4 9.5 0.5" stroke="#12162f" strokeWidth="2" />
          <circle cx="255" cy="115" r="3.3" fill="#12162f" />
          <circle cx="270" cy="114" r="3.3" fill="#12162f" />
          <ellipse cx="262" cy="130.5" rx="3.6" ry="5" fill="#0a0c22" />
        </g>
        {/* warm screen light on the jaw */}
        <path d="M245 130 q17 15 34 0" fill="none" stroke="rgba(251,191,36,0.4)" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* laptop on the desk */}
      <g>
        <rect x="316" y="212" width="52" height="34" rx="2" fill="#0a0d28" stroke="rgba(251,191,36,0.55)" strokeWidth="1.5" />
        <path d="M310 250 L374 250 L380 258 L304 258 Z" fill="#0a0d28" />
      </g>

      <rect x="0" y="0" width="640" height="340" fill="url(#fns-vignette)" />
    </svg>
  </div>
);

export default FounderNightScene;
