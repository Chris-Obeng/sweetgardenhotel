import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap-config';

type Variant = 'outline-dark' | 'outline-light' | 'dark' | 'light';

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode;
}

export default function LiquidButton({ variant = 'outline-dark', children, className = '', ...props }: LiquidButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!fillRef.current) return;
    gsap.set(fillRef.current, { clipPath: 'ellipse(65% 18% at 50% 110%)' });
  }, []);

  const handleMouseEnter = () => {
    if (tlRef.current) tlRef.current.kill();
    tlRef.current = gsap.timeline();
    tlRef.current.to(fillRef.current, {
      clipPath: 'ellipse(80% 45% at 50% 95%)',
      duration: 0.2,
      ease: 'power2.out',
    }).to(fillRef.current, {
      clipPath: 'ellipse(140% 140% at 50% 50%)',
      duration: 0.3,
      ease: 'power2.inOut',
    });
  };

  const handleMouseLeave = () => {
    if (tlRef.current) tlRef.current.kill();
    tlRef.current = gsap.timeline();
    tlRef.current.to(fillRef.current, {
      clipPath: 'ellipse(65% 18% at 50% -10%)',
      duration: 0.4,
      ease: 'power2.inOut',
    }).set(fillRef.current, {
      clipPath: 'ellipse(65% 18% at 50% 110%)'
    });
  };

  const variantStyles = {
    'outline-dark': {
      container: 'bg-transparent border border-ink text-ink',
      fill: 'bg-ink text-cream',
    },
    'outline-light': {
      container: 'bg-transparent border border-white text-white',
      fill: 'bg-white text-forest',
    },
    'dark': {
      container: 'bg-forest border border-transparent text-white',
      fill: 'bg-white text-forest',
    },
    'light': {
      container: 'bg-cream border border-transparent text-ink',
      fill: 'bg-forest text-white',
    }
  };

  const styles = variantStyles[variant];

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center justify-center overflow-hidden relative cursor-pointer select-none px-8 py-3.5 min-w-[160px] font-sans text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${styles.container} ${className}`}
      style={{ borderRadius: 0 }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span 
        ref={fillRef} 
        className={`absolute inset-0 flex items-center justify-center z-20 ${styles.fill}`}
        style={{ willChange: 'clip-path' }}
        aria-hidden="true"
      >
        {children}
      </span>
    </button>
  );
}