
import React, { useState } from 'react';
import { Database, Settings, ShieldCheck, Network } from 'lucide-react';

// ── Colours ────────────────────────────────────────────────────────────────
const SEGMENT_COLORS = [
  { topStart: '#1e40af', topEnd: '#3b82f6', wall: '#0f2060', wallDark: '#091540' },
  { topStart: '#1e3a5f', topEnd: '#2563eb', wall: '#0f1e35', wallDark: '#09121f' },
  { topStart: '#4338ca', topEnd: '#7c3aed', wall: '#281e80', wallDark: '#1a1360' },
  { topStart: '#1e293b', topEnd: '#334155', wall: '#0d1520', wallDark: '#070d14' },
];

const ICONS = [
  <Network   size={26} strokeWidth={2} color="#fff" />,
  <Database  size={26} strokeWidth={2} color="#fff" />,
  <ShieldCheck size={26} strokeWidth={2} color="#fff" />,
  <Settings  size={26} strokeWidth={2} color="#fff" />,
];

// ── Geometry helpers ────────────────────────────────────────────────────────
function toRad(deg) { return (Math.PI * deg) / 180; }

function pt(cx, cy, r, deg) {
  return [cx + r * Math.cos(toRad(deg)), cy + r * Math.sin(toRad(deg))];
}

function donutArcPath(cx, cy, rOut, rIn, s, e) {
  const [x1, y1] = pt(cx, cy, rOut, s);
  const [x2, y2] = pt(cx, cy, rOut, e);
  const [x3, y3] = pt(cx, cy, rIn,  e);
  const [x4, y4] = pt(cx, cy, rIn,  s);
  const lg = e - s > 180 ? '1' : '0';
  return `M${x1} ${y1} A${rOut} ${rOut} 0 ${lg} 1 ${x2} ${y2} L${x3} ${y3} A${rIn} ${rIn} 0 ${lg} 0 ${x4} ${y4}Z`;
}

function outerWallPath(cx, cy, rOut, s, e, depth) {
  const [x1, y1] = pt(cx, cy, rOut, s);
  const [x2, y2] = pt(cx, cy, rOut, e);
  const lg = e - s > 180 ? '1' : '0';
  return `M${x1} ${y1} A${rOut} ${rOut} 0 ${lg} 1 ${x2} ${y2} L${x2} ${y2 + depth} A${rOut} ${rOut} 0 ${lg} 0 ${x1} ${y1 + depth}Z`;
}

function innerWallPath(cx, cy, rIn, s, e, depth) {
  const [x1, y1] = pt(cx, cy, rIn, s);
  const [x2, y2] = pt(cx, cy, rIn, e);
  const lg = e - s > 180 ? '1' : '0';
  return `M${x1} ${y1} A${rIn} ${rIn} 0 ${lg} 1 ${x2} ${y2} L${x2} ${y2 + depth} A${rIn} ${rIn} 0 ${lg} 0 ${x1} ${y1 + depth}Z`;
}

function sideWallPath(cx, cy, rOut, rIn, deg, depth) {
  const [ox, oy] = pt(cx, cy, rOut, deg);
  const [ix, iy] = pt(cx, cy, rIn,  deg);
  return `M${ox} ${oy} L${ix} ${iy} L${ix} ${iy + depth} L${ox} ${oy + depth}Z`;
}

// ── Component ───────────────────────────────────────────────────────────────
export default function DonutChartInteractive({
  size = 340,
  segmentLabels = [
    'Monitoring and Observability',
    'Database',
    'Troubleshooting',
    'Automation',
  ],
  onSegmentClick,
}) {
  const [active, setActive] = useState(0);

  const GAP   = 4;            // degrees gap between segments
  const DEPTH = 30;           // 3-D thickness in SVG px
  const cx    = size / 2;
  const cy    = size / 2;
  const rOut  = size / 2 - 10;
  const rIn   = size / 2 - 60;
  const svgH  = size + DEPTH + 10;

  const segs = [
    { start:   0 + GAP / 2, end:  90 - GAP / 2 },
    { start:  90 + GAP / 2, end: 180 - GAP / 2 },
    { start: 180 + GAP / 2, end: 270 - GAP / 2 },
    { start: 270 + GAP / 2, end: 360 - GAP / 2 },
  ];

  // Painter's order: back (top of SVG = away from viewer with rotateX) → front
  // Segment mid-angle sine: seg0→45°(+), seg1→135°(+), seg2→225°(-), seg3→315°(-)
  // Higher positive sine = lower Y = closer to viewer → render last
  const renderOrder = [2, 3, 0, 1];

  // Icon / label midpoint helpers
  const iconR  = (rOut + rIn) / 2;
  const midDeg = (i) => (segs[i].start + segs[i].end) / 2;

  return (
    <div
      style={{
        width: size,
        margin: '0 auto',
        position: 'relative',
        perspective: '700px',
        perspectiveOrigin: `${cx}px ${cy * 0.55}px`,
      }}
    >
      <svg
        width={size}
        height={svgH}
        viewBox={`0 0 ${size} ${svgH}`}
        style={{
          display: 'block',
          overflow: 'visible',
          transform: 'rotateX(46deg)',
          transformOrigin: `${cx}px ${cy}px`,
        }}
      >
        <defs>
          {SEGMENT_COLORS.map((c, i) => (
            <React.Fragment key={i}>
              <linearGradient id={`tg${i}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor={c.topStart} />
                <stop offset="100%" stopColor={c.topEnd}   />
              </linearGradient>
              <linearGradient id={`wg${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={c.wall}     />
                <stop offset="100%" stopColor={c.wallDark} />
              </linearGradient>
            </React.Fragment>
          ))}
          <radialGradient id="holeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0a1018" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ── Bottom faces ─────────────────────────────────────────────── */}
        {renderOrder.map((i) => (
          <path
            key={`bot-${i}`}
            d={donutArcPath(cx, cy + DEPTH, rOut, rIn, segs[i].start, segs[i].end)}
            fill={SEGMENT_COLORS[i].wallDark}
            opacity={0.7}
          />
        ))}

        {/* ── Outer walls ──────────────────────────────────────────────── */}
        {renderOrder.map((i) => (
          <path
            key={`ow-${i}`}
            d={outerWallPath(cx, cy, rOut, segs[i].start, segs[i].end, DEPTH)}
            fill={`url(#wg${i})`}
          />
        ))}

        {/* ── Inner walls (front-facing segments only) ──────────────────── */}
        {[0, 1].map((i) => (
          <path
            key={`iw-${i}`}
            d={innerWallPath(cx, cy, rIn, segs[i].start, segs[i].end, DEPTH)}
            fill={`url(#wg${i})`}
            opacity={0.35}
          />
        ))}

        {/* ── Radial side walls at each gap ────────────────────────────── */}
        {[90, 180, 270].map((angle) => (
          <path
            key={`sw-${angle}`}
            d={sideWallPath(cx, cy, rOut, rIn, angle - GAP / 2, DEPTH)}
            fill="#0a1018"
            opacity={0.4}
          />
        ))}

        {/* ── Top faces (clickable) ─────────────────────────────────────── */}
        {renderOrder.map((i) => (
          <g
            key={`top-${i}`}
            style={{ cursor: 'pointer' }}
            onClick={() => { setActive(i); if (onSegmentClick) onSegmentClick(i); }}
          >
            <path
              d={donutArcPath(cx, cy, rOut, rIn, segs[i].start, segs[i].end)}
              fill={`url(#tg${i})`}
              stroke={i === active ? '#93c5fd' : 'rgba(255,255,255,0.1)'}
              strokeWidth={i === active ? 2 : 0.5}
              opacity={i === active ? 1 : 0.8}
              filter={i === active ? 'url(#glow)' : undefined}
              style={{ transition: 'opacity 0.3s, stroke 0.3s' }}
            />

            {/* Icon centred in segment arc */}
            <foreignObject
              x={cx + iconR * Math.cos(toRad(midDeg(i))) - 18}
              y={cy + iconR * Math.sin(toRad(midDeg(i))) - 18}
              width={36}
              height={36}
            >
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 36, height: 36,
                  opacity: i === active ? 1 : 0.55,
                  transition: 'opacity 0.3s',
                }}
              >
                {ICONS[i]}
              </div>
            </foreignObject>
          </g>
        ))}

        {/* ── Donut hole ────────────────────────────────────────────────── */}
        <circle cx={cx} cy={cy + DEPTH} r={rIn - 4} fill="url(#holeGrad)" opacity={0.6} />
        <circle cx={cx} cy={cy}         r={rIn - 4} fill="url(#holeGrad)" />
        <circle cx={cx} cy={cy}         r={rIn - 4} fill="none"
          stroke="rgba(255,255,255,0.07)" strokeWidth={1} />

        {/* ── Centre label (rendered on top face, tilts with chart) ─────── */}
        <foreignObject
          x={cx - (rIn - 8)}
          y={cy - (rIn - 8)}
          width={(rIn - 8) * 2}
          height={(rIn - 8) * 2}
        >
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '100%', height: '100%',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: 15,
              lineHeight: 1.25,
              color: '#e2e8f0',
              pointerEvents: 'none',
            }}
          >
            {segmentLabels[active]}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
