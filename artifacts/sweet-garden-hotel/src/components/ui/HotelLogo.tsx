interface HotelLogoProps {
  nameColor?: string;
  subColor?: string;
  iconColor?: string;
  className?: string;
}

export default function HotelLogo({
  nameColor = 'text-white',
  subColor = 'text-gold',
  iconColor = 'text-white',
  className = '',
}: HotelLogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Botanical mark */}
      <svg
        width="28"
        height="34"
        viewBox="0 0 28 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${iconColor} transition-colors duration-300`}
      >
        {/* Center leaf — pointing up */}
        <path
          d="M14 1C17.5 6.5 19 14 14 22C9 14 10.5 6.5 14 1Z"
          stroke="currentColor"
          strokeWidth="1.1"
          fill="currentColor"
          fillOpacity="0.12"
          strokeLinejoin="round"
        />
        {/* Left leaf */}
        <path
          d="M14 22C9.5 17.5 3 14.5 1.5 8C7 10 12 15.5 14 22Z"
          stroke="currentColor"
          strokeWidth="1.1"
          fill="currentColor"
          fillOpacity="0.12"
          strokeLinejoin="round"
        />
        {/* Right leaf */}
        <path
          d="M14 22C18.5 17.5 25 14.5 26.5 8C21 10 16 15.5 14 22Z"
          stroke="currentColor"
          strokeWidth="1.1"
          fill="currentColor"
          fillOpacity="0.12"
          strokeLinejoin="round"
        />
        {/* Stem */}
        <line
          x1="14"
          y1="22"
          x2="14"
          y2="32"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        {/* Base flourish */}
        <path
          d="M9 32 Q14 29.5 19 32"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        {/* Small dot at center */}
        <circle cx="14" cy="22" r="1.2" fill="currentColor" opacity="0.5" />
      </svg>

      {/* Name + Hotel wordmark */}
      <div className="flex flex-col leading-none">
        <span className={`font-cormorant font-light text-xl sm:text-2xl leading-none ${nameColor} transition-colors duration-300`}>
          Sweet Garden
        </span>
        <span className={`font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.28em] font-medium mt-0.5 ${subColor} transition-colors duration-300`}>
          Hotel
        </span>
      </div>
    </div>
  );
}
