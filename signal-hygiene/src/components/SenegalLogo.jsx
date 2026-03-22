export default function SenegalLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ flexShrink: 0 }}>
      <defs>
        <clipPath id="flagClip">
          <circle cx="60" cy="60" r="56" />
        </clipPath>
      </defs>
      <circle cx="60" cy="60" r="58" fill="#1A1A1A" opacity="0.08" />
      <g clipPath="url(#flagClip)">
        <rect x="4" y="4" width="37.3" height="112" fill="#00853F" />
        <rect x="41.3" y="4" width="37.3" height="112" fill="#FDEF42" />
        <rect x="78.7" y="4" width="37.3" height="112" fill="#E31B23" />
      </g>
      <circle cx="60" cy="60" r="56" fill="none" stroke="white" strokeWidth="2" opacity="0.3" />
      <polygon
        points="60,35 66.9,53.8 87,53.8 70.5,65.2 77.4,84 60,72.6 42.6,84 49.5,65.2 33,53.8 53.1,53.8"
        fill="#00853F" opacity="0.9"
      />
    </svg>
  )
}
