interface HotelLogoProps {
  nameColor?: string;
  subColor?: string;
  className?: string;
  size?: number;
}

export default function HotelLogo({
  nameColor = 'text-white',
  subColor = 'text-gold',
  className = '',
  size = 38,
}: HotelLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/hotel-logo.png"
        alt="Sweet Garden Hotel"
        width={size}
        height={size}
        className="shrink-0 object-contain"
        style={{ width: size, height: size }}
      />
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
