
import React, { useState } from 'react';
import { Database, Settings, ShieldCheck, Network } from 'lucide-react';

// Brand-aligned colors (adjust as needed)
const segmentColors = [
  'url(#seg1)', // Blue (Monitoring)
  'url(#seg2)', // Teal (Database)
  'url(#seg3)', // Slate (Troubleshooting)
  'url(#seg4)', // Orange/Gold (Automation)
];

const icons = [
  <Network size={32} strokeWidth={2.2} />, // Monitoring
  <Database size={32} strokeWidth={2.2} />, // Database
  <ShieldCheck size={32} strokeWidth={2.2} />, // Troubleshooting
  <Settings size={32} strokeWidth={2.2} />, // Automation
];

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

  // Angles for 4 segments
  const segments = [
    { start: 0, end: 90 },
    { start: 90, end: 180 },
    { start: 180, end: 270 },
    { start: 270, end: 360 },
  ];

  // Helper to describe an SVG arc
  function describeArc(cx, cy, rOuter, rInner, startAngle, endAngle) {
    const toRad = (deg) => (Math.PI * deg) / 180;
    const x1 = cx + rOuter * Math.cos(toRad(startAngle));
    const y1 = cy + rOuter * Math.sin(toRad(startAngle));
    const x2 = cx + rOuter * Math.cos(toRad(endAngle));
    const y2 = cy + rOuter * Math.sin(toRad(endAngle));
    const x3 = cx + rInner * Math.cos(toRad(endAngle));
    const y3 = cy + rInner * Math.sin(toRad(endAngle));
    const x4 = cx + rInner * Math.cos(toRad(startAngle));
    const y4 = cy + rInner * Math.sin(toRad(startAngle));
    const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      `M ${x1} ${y1}`,
      `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4}`,
      'Z',
    ].join(' ');
  }

  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size / 2 - 8;
  const rInner = size / 2 - 56;


  return (
    <div style={{ width: size, height: size, margin: '0 auto', position: 'relative' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
        <defs>
          <linearGradient id="seg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b5360" />
            <stop offset="100%" stopColor="#6b8a99" />
          </linearGradient>
          <linearGradient id="seg2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4b6b7a" />
            <stop offset="100%" stopColor="#7ca6b6" />
          </linearGradient>
          <linearGradient id="seg3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5c7a86" />
            <stop offset="100%" stopColor="#3b5360" />
          </linearGradient>
          <linearGradient id="seg4" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffb300" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>
        {/* Outer shadow for 3D effect */}
        <circle cx={cx} cy={cy} r={rOuter + 6} fill="#0a101a" opacity="0.18" />
        {segments.map((seg, i) => (
          <g key={i} style={{ cursor: 'pointer', transition: 'filter 0.2s' }}
            onClick={() => {
              setActive(i);
              if (onSegmentClick) onSegmentClick(i);
            }}>
            <path
              d={describeArc(cx, cy, rOuter, rInner, seg.start, seg.end)}
              fill={segmentColors[i]}
              style={{
                opacity: i === active ? 1 : 0.7,
                filter: i === active ? 'drop-shadow(0 0 0px #fff) drop-shadow(0 0 12px #ffb300cc)' : 'none',
                stroke: i === active ? '#fff' : 'none',
                strokeWidth: i === active ? 4 : 0,
                transition: 'filter 0.3s, opacity 0.3s, stroke 0.3s',
              }}
            />
            {/* Center icon in segment (visually centered in arc) */}
            <g style={{ pointerEvents: 'none' }}>
              <foreignObject
                x={cx + (rOuter + rInner) / 2 * Math.cos(toRad((seg.start + seg.end) / 2)) - 20}
                y={cy + (rOuter + rInner) / 2 * Math.sin(toRad((seg.start + seg.end) / 2)) - 20}
                width={40}
                height={40}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, opacity: i === active ? 1 : 0.6, transition: 'opacity 0.3s' }}>
                  {icons[i]}
                </div>
              </foreignObject>
            </g>
          </g>
        ))}
        {/* Donut hole with inner shadow */}
        <circle cx={cx} cy={cy} r={rInner - 8} fill="#fff" stroke="#0a101a" strokeWidth="8" filter="url(#innershadow)" />
        <defs>
          <filter id="innershadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.10" />
          </filter>
        </defs>
      </svg>
      {/* Center label */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 22,
        color: '#222',
        width: '60%',
        pointerEvents: 'none',
        lineHeight: 1.2,
      }}>
        {segmentLabels[active]}
      </div>
    </div>
  );
}

// Helper for radians
function toRad(deg) {
  return (Math.PI * deg) / 180;
}
