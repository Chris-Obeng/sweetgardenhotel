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
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!fillRef.current) return;
    gsap.set(fillRef.current, { clipPath: 'ellipse(65% 18% at 50% 110%)' });

    return () => {
      if (tlRef.current) tlRef.current.kill();
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    };
  }, []);

  const clearResetTimer = () => {
    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  };

  const fillButton = () => {
    if (!fillRef.current) return;
    clearResetTimer();
    if (tlRef.current) tlRef.current.kill();
    tlRef.current = gsap.timeline({ defaults: { overwrite: 'auto' } });
    tlRef.current
      .to(fillRef.current, {
        clipPath: 'ellipse(78% 34% at 50% 98%)',
        duration: 0.24,
        ease: 'sine.out',
      })
      .to(fillRef.current, {
        clipPath: 'ellipse(150% 150% at 50% 50%)',
        duration: 0.46,
        ease: 'power3.inOut',
      });
  };

  const drainButton = () => {
    if (!fillRef.current) return;
    clearResetTimer();
    if (tlRef.current) tlRef.current.kill();
    tlRef.current = gsap.timeline({ defaults: { overwrite: 'auto' } });
    tlRef.current
      .to(fillRef.current, {
        clipPath: 'ellipse(92% 30% at 50% -12%)',
        duration: 0.42,
        ease: 'power3.inOut',
      })
      .set(fillRef.current, {
        clipPath: 'ellipse(65% 18% at 50% 110%)'
      });
  };

  const drainAfterTap = () => {
    clearResetTimer();
    resetTimerRef.current = window.setTimeout(drainButton, 260);
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse') fillButton();
    props.onPointerEnter?.(event);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLButtonElement>) => {
    drainButton();
    props.onPointerLeave?.(event);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    fillButton();
    props.onPointerDown?.(event);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse') drainAfterTap();
    props.onPointerUp?.(event);
  };

  const handlePointerCancel = (event: React.PointerEvent<HTMLButtonElement>) => {
    drainButton();
    props.onPointerCancel?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    drainButton();
    props.onBlur?.(event);
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
      {...props}
      ref={buttonRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onBlur={handleBlur}
      className={`inline-flex items-center justify-center overflow-hidden relative cursor-pointer select-none px-7 py-3 min-w-[150px] font-sans text-[11px] uppercase tracking-[0.18em] transition-transform duration-300 ease-out active:scale-[0.985] ${styles.container} ${className}`}
      style={{ borderRadius: '6px' }}
    >
      <span className="relative z-10">{children}</span>
      <span
        ref={fillRef}
        className={`absolute inset-0 flex items-center justify-center z-20 ${styles.fill}`}
        style={{ willChange: 'clip-path', borderRadius: '6px', transform: 'translateZ(0)' }}
        aria-hidden="true"
      >
        {children}
      </span>
    </button>
  );
}
