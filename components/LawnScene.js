// Stylized SVG yard illustrations — stand-ins until real photos are added.
// Each variant is a hand-drawn scene: sky, house, lawn, plantings.

const PALETTES = {
  lush: { sky: "#cfe3d0", lawn: "#4b8a5c", lawnDark: "#3a7049", house: "#f7f2e7", roof: "#1d4d33", accent: "#d9a13c" },
  golden: { sky: "#f2e3c2", lawn: "#5c9a4e", lawnDark: "#47823c", house: "#efe7d3", roof: "#8a5a34", accent: "#b4552e" },
  dusk: { sky: "#c9cfe0", lawn: "#3f7d4e", lawnDark: "#2e6540", house: "#f0ece2", roof: "#39536b", accent: "#d9a13c" },
  scruffy: { sky: "#ddd8c8", lawn: "#a8a15c", lawnDark: "#8d874c", house: "#e8e0cd", roof: "#6b6455", accent: "#9a8f6a" },
};

export default function LawnScene({ variant = "lush", stripes = true, trees = 2, flowers = true }) {
  const p = PALETTES[variant] || PALETTES.lush;
  return (
    <svg viewBox="0 0 640 420" role="img" aria-label="Stylized illustration of a landscaped yard" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="420" fill={p.sky} />
      <circle cx="540" cy="70" r="38" fill={p.accent} opacity="0.85" />
      {/* house */}
      <rect x="210" y="120" width="220" height="140" fill={p.house} />
      <polygon points="195,120 320,50 445,120" fill={p.roof} />
      <rect x="245" y="160" width="42" height="42" fill={p.sky} stroke={p.roof} strokeWidth="5" />
      <rect x="355" y="160" width="42" height="42" fill={p.sky} stroke={p.roof} strokeWidth="5" />
      <rect x="300" y="185" width="44" height="75" fill={p.roof} />
      {/* lawn */}
      <rect x="0" y="260" width="640" height="160" fill={p.lawn} />
      {stripes && (
        <g opacity="0.28">
          <polygon points="60,260 140,260 40,420 -60,420" fill={p.lawnDark} />
          <polygon points="220,260 300,260 200,420 100,420" fill={p.lawnDark} />
          <polygon points="380,260 460,260 360,420 260,420" fill={p.lawnDark} />
          <polygon points="540,260 620,260 520,420 420,420" fill={p.lawnDark} />
        </g>
      )}
      {/* path */}
      <polygon points="305,260 340,260 380,420 260,420" fill={p.house} opacity="0.9" />
      {/* trees */}
      {trees > 0 && (
        <g>
          <rect x="86" y="180" width="14" height="86" fill={p.roof} />
          <circle cx="93" cy="150" r="52" fill={p.lawnDark} />
          <circle cx="63" cy="176" r="34" fill={p.lawn} />
        </g>
      )}
      {trees > 1 && (
        <g>
          <rect x="540" y="196" width="12" height="70" fill={p.roof} />
          <circle cx="546" cy="168" r="44" fill={p.lawnDark} />
        </g>
      )}
      {/* shrubs + flowers */}
      <circle cx="220" cy="262" r="22" fill={p.lawnDark} />
      <circle cx="425" cy="262" r="22" fill={p.lawnDark} />
      {flowers && (
        <g>
          {[150, 175, 470, 495, 520].map((x, i) => (
            <g key={x} transform={`translate(${x} ${300 + (i % 2) * 26})`}>
              <rect x="-1.5" y="0" width="3" height="20" fill={p.lawnDark} />
              <circle cx="0" cy="-4" r="7" fill={i % 2 ? p.accent : "#e8e0cd"} />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
