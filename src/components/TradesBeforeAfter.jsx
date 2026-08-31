import React, { useState } from 'react';

/**
 * Before / after block for the Trades Website page.
 *
 * Photo-first: drop `trades-before.jpg` and `trades-after.jpg` into /public and
 * they are used automatically. Until then each panel falls back to a clean
 * flat silhouette illustration.
 *   before = tradesperson stuck at home, slumped in a chair, waiting
 *   after  = same tradesperson on site, hi-vis on, laying blocks, booked up
 */

const FIG = '#262c4f';

const Panel = ({ badge, tone, img, alt, children }) => {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative rounded-xl border border-indigo-900/60 overflow-hidden shadow-2xl bg-[#0b0b2e]">
      <span
        className={`absolute z-10 top-3 left-3 px-3 py-1.5 rounded-full text-[13px] font-extrabold uppercase tracking-wide shadow-lg ring-1 ring-white/25 ${tone}`}
      >
        {badge}
      </span>
      {!failed ? (
        <img
          src={img}
          alt={alt}
          onError={() => setFailed(true)}
          className="w-full aspect-[4/3] object-cover block"
        />
      ) : (
        <svg viewBox="0 0 340 260" className="w-full h-auto block" role="img" aria-label={alt} preserveAspectRatio="xMidYMid meet">
          {children}
        </svg>
      )}
    </div>
  );
};

const BeforeArt = (
  <>
    <defs>
      <linearGradient id="tb-room" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8f96ac" />
        <stop offset="1" stopColor="#787f98" />
      </linearGradient>
    </defs>

    {/* dim room */}
    <rect width="340" height="260" fill="url(#tb-room)" />
    <rect y="206" width="340" height="54" fill="#5f6578" />

    {/* plain window, flat grey day */}
    <rect x="214" y="44" width="90" height="86" rx="3" fill="#9aa1b6" />
    <rect x="218" y="48" width="82" height="78" fill="#bcc6da" />
    <line x1="259" y1="48" x2="259" y2="126" stroke="#9aa1b6" strokeWidth="4" />
    <line x1="218" y1="87" x2="300" y2="87" stroke="#9aa1b6" strokeWidth="4" />

    {/* armchair */}
    <rect x="90" y="118" width="98" height="58" rx="14" fill="#6e7488" />
    <rect x="84" y="150" width="30" height="60" rx="12" fill="#656b80" />
    <rect x="84" y="164" width="112" height="46" rx="12" fill="#787e94" />

    {/* figure: slumped forward, forearms toward the knees, head hanging */}
    <g stroke={FIG} fill={FIG} strokeLinecap="round">
      {/* far leg */}
      <line x1="146" y1="177" x2="184" y2="179" strokeWidth="15" />
      <line x1="184" y1="179" x2="188" y2="204" strokeWidth="13" />
      {/* torso, leaning forward */}
      <ellipse cx="158" cy="150" rx="15" ry="26" transform="rotate(20 158 150)" stroke="none" />
      {/* near leg */}
      <line x1="150" y1="172" x2="190" y2="170" strokeWidth="16" />
      <line x1="190" y1="170" x2="194" y2="203" strokeWidth="14" />
      <line x1="188" y1="204" x2="204" y2="204" strokeWidth="10" />
      {/* arm to the knee */}
      <line x1="168" y1="136" x2="185" y2="167" strokeWidth="13" />
      <line x1="185" y1="167" x2="196" y2="186" strokeWidth="12" />
      {/* head */}
      <circle cx="174" cy="115" r="13" stroke="none" />
    </g>
    {/* hard hat */}
    <path d="M160 114 a14 10 0 0 1 28 0 z" fill="#efc63f" />
    <rect x="157" y="112" width="34" height="4" rx="2" fill="#efc63f" />
    {/* silent phone in the loose hand */}
    <rect x="192" y="184" width="10" height="6" rx="1.5" fill="#0e1230" />
  </>
);

const AfterArt = (
  <>
    <defs>
      <linearGradient id="ta-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#a9c6ef" />
        <stop offset="1" stopColor="#e2ecf9" />
      </linearGradient>
      <radialGradient id="ta-sun" cx="79%" cy="15%" r="34%">
        <stop offset="0" stopColor="rgba(255,242,206,0.9)" />
        <stop offset="1" stopColor="rgba(255,242,206,0)" />
      </radialGradient>
    </defs>
    <rect width="340" height="260" fill="url(#ta-sky)" />
    <rect width="340" height="260" fill="url(#ta-sun)" />
    <rect y="206" width="340" height="54" fill="#707a86" />

    {/* ladder leaning in */}
    <g stroke="#c9ba8f" strokeLinecap="round">
      <line x1="42" y1="204" x2="64" y2="92" strokeWidth="4" />
      <line x1="54" y1="204" x2="76" y2="92" strokeWidth="4" />
      {[188, 164, 140, 116].map((y, i) => (
        <line key={y} x1={46 + i * 5} y1={y} x2={58 + i * 5} y2={y - 2} strokeWidth="3" />
      ))}
    </g>

    {/* block wall, staggered courses stepping down to the right */}
    <g>
      {[
        { y: 178, w: 170 }, { y: 163, w: 170 }, { y: 148, w: 146 },
        { y: 133, w: 118 }, { y: 118, w: 86 },
      ].map((c, r) => (
        <g key={r}>
          <rect x="70" y={c.y} width={c.w} height="15" fill={r % 2 ? '#c1b699' : '#cec4aa'} />
          <line x1="70" y1={c.y} x2={70 + c.w} y2={c.y} stroke="#a89d84" strokeWidth="1.5" />
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 70 + (r % 2 ? 18 : 36) + i * 36;
            return x < 70 + c.w - 4 ? (
              <line key={i} x1={x} y1={c.y} x2={x} y2={c.y + 15} stroke="#a89d84" strokeWidth="1.5" />
            ) : null;
          })}
        </g>
      ))}
      <line x1="70" y1="193" x2="240" y2="193" stroke="#a89d84" strokeWidth="1.5" />
    </g>

    {/* spare blocks */}
    <rect x="20" y="180" width="34" height="13" fill="#c1b699" />
    <rect x="20" y="167" width="34" height="13" fill="#cec4aa" />

    {/* figure: kneeling at the wall, placing a block, trowel in the other hand */}
    <g stroke={FIG} fill={FIG} strokeLinecap="round">
      {/* shin folded on the ground */}
      <line x1="238" y1="200" x2="208" y2="200" strokeWidth="15" />
      {/* thigh up to the hip */}
      <line x1="212" y1="198" x2="238" y2="174" strokeWidth="16" />
      {/* torso leaning to the wall */}
      <ellipse cx="234" cy="150" rx="14" ry="24" transform="rotate(-22 234 150)" stroke="none" />
      {/* back arm with trowel */}
      <line x1="230" y1="146" x2="244" y2="150" strokeWidth="11" />
      {/* front arm reaching to the wall */}
      <line x1="222" y1="146" x2="198" y2="167" strokeWidth="12" />
      {/* head */}
      <circle cx="214" cy="122" r="12" stroke="none" />
    </g>
    {/* hi-vis flash across the back */}
    <line x1="222" y1="138" x2="237" y2="152" stroke="#ecca4a" strokeWidth="6" strokeLinecap="round" />
    {/* hard hat */}
    <path d="M201 121 a13 9 0 0 1 26 0 z" fill="#f2cb47" />
    <rect x="198" y="119" width="32" height="4" rx="2" fill="#f2cb47" />
    {/* block in the placing hand */}
    <rect x="190" y="163" width="16" height="9" fill="#cec4aa" />
    {/* trowel */}
    <path d="M244 150 l12 -6 3 4 -12 6 z" fill="#9aa3b4" />
  </>
);

const TradesBeforeAfter = () => (
  <div>
    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
      <Panel
        badge="Right now"
        tone="bg-red-500 text-white"
        img="/trades-before.jpg"
        alt="A tradesperson stuck at home, slumped in an armchair, waiting for the phone to ring"
      >
        {BeforeArt}
      </Panel>
      <Panel
        badge="With the right site"
        tone="bg-green-500 text-white"
        img="/trades-after.jpg"
        alt="The same tradesperson on site in hi-vis, kneeling at a half-built block wall, fully booked"
      >
        {AfterArt}
      </Panel>
    </div>
    <p className="mt-3 text-center text-sm text-gray-300 font-medium">
      Same trade, same skills. The difference is being the one they find first.
    </p>
  </div>
);

export default TradesBeforeAfter;
