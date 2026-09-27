/** Shared SVG gradients and filters used by the storyboard artwork. */

export function ArtDefs() {
  return (
    <defs>
      {/* form shading: light from the upper left */}
      <linearGradient id="vd-shade-x" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity={0.14} />
        <stop offset="0.45" stopColor="#FFFFFF" stopOpacity={0} />
        <stop offset="1" stopColor="#1B0F08" stopOpacity={0.24} />
      </linearGradient>
      <linearGradient id="vd-shade-y" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1B0F08" stopOpacity={0.22} />
        <stop offset="0.5" stopColor="#1B0F08" stopOpacity={0.02} />
        <stop offset="1" stopColor="#1B0F08" stopOpacity={0.14} />
      </linearGradient>
      <radialGradient id="vd-head-light" cx="0.35" cy="0.35" r="0.75">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity={0.16} />
        <stop offset="0.6" stopColor="#FFFFFF" stopOpacity={0} />
        <stop offset="1" stopColor="#1B0F08" stopOpacity={0.16} />
      </radialGradient>
      <radialGradient id="vd-glow">
        <stop offset="0" stopColor="#FFD27A" stopOpacity={0.75} />
        <stop offset="0.35" stopColor="#FFB84D" stopOpacity={0.3} />
        <stop offset="1" stopColor="#FFB84D" stopOpacity={0} />
      </radialGradient>
      <radialGradient id="vd-fire">
        <stop offset="0" stopColor="#FFE9A8" stopOpacity={0.9} />
        <stop offset="0.4" stopColor="#FF9A3C" stopOpacity={0.35} />
        <stop offset="1" stopColor="#FF7A2A" stopOpacity={0} />
      </radialGradient>
      <radialGradient id="vd-sun">
        <stop offset="0" stopColor="#FFF4C8" />
        <stop offset="0.45" stopColor="#FFD36E" />
        <stop offset="1" stopColor="#FFB347" stopOpacity={0} />
      </radialGradient>
      <linearGradient id="vd-wood" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8A5A34" />
        <stop offset="1" stopColor="#5E3A1F" />
      </linearGradient>
      <linearGradient id="vd-brass" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#E8C66A" />
        <stop offset="0.5" stopColor="#C99A2E" />
        <stop offset="1" stopColor="#8E6A1C" />
      </linearGradient>
      <linearGradient id="vd-copper" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#E29A6A" />
        <stop offset="0.5" stopColor="#B8683A" />
        <stop offset="1" stopColor="#7C4222" />
      </linearGradient>
      <linearGradient id="vd-leaf-palm" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E9D59A" />
        <stop offset="1" stopColor="#CDB26A" />
      </linearGradient>
      <filter id="vd-soft" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.6" />
      </filter>
      <filter id="vd-haze" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="0.8" />
      </filter>
    </defs>
  );
}
