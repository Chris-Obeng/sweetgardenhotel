import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap-config';

type Variant = 'outline-dark' | 'outline-light' | 'dark' | 'light';

const RESTING_CLIP = 'ellipse(70% 18% at 50% 112%)';
const RISING_CLIP = 'ellipse(86% 42% at 50% 96%)';
const FILLED_CLIP = 'ellipse(155% 155% at 50% 50%)';
const DRAINING_CLIP = 'ellipse(132% 72% at 50% -18%)';
const EXIT_CLIP = 'ellipse(58% 16% at 50% -24%)';
const BUTTON_RADIUS = '999px';

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
    gsap.set(fillRef.current, { clipPath: RESTING_CLIP, yPercent: 0 });

    return () => {
      if (tlRef.current) tlRef.current.kill();
      if (fillRef.current) gsap.killTweensOf(fillRef.current);
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
    if (!fillRef.current || props.disabled) return;
    clearResetTimer();
    if (tlRef.current) tlRef.current.kill();
    gsap.killTweensOf(fillRef.current);
    tlRef.current = gsap.timeline({
      defaults: { overwrite: 'auto', force3D: true },
    });
    tlRef.current
      .to(fillRef.current, {
        clipPath: RISING_CLIP,
        yPercent: 1.5,
        duration: 0.14,
        ease: 'sine.out',
      })
      .to(fillRef.current, {
        clipPath: FILLED_CLIP,
        yPercent: 0,
        duration: 0.3,
        ease: 'power3.out',
      });
  };

  const drainButton = () => {
    if (!fillRef.current) return;
    clearResetTimer();
    if (tlRef.current) tlRef.current.kill();
    gsap.killTweensOf(fillRef.current);
    tlRef.current = gsap.timeline({
      defaults: { overwrite: 'auto', force3D: true },
    });
    tlRef.current
      .to(fillRef.current, {
        clipPath: DRAINING_CLIP,
        yPercent: -18,
        duration: 0.24,
        ease: 'power2.inOut',
      })
      .to(fillRef.current, {
        clipPath: EXIT_CLIP,
        yPercent: -42,
        duration: 0.14,
        ease: 'sine.in',
      })
      .set(fillRef.current, {
        clipPath: RESTING_CLIP,
        yPercent: 0
      });
  };

  const drainAfterTap = () => {
    clearResetTimer();
    resetTimerRef.current = window.setTimeout(drainButton, 90);
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'touch') fillButton();
    props.onPointerEnter?.(event);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'touch') drainButton();
    props.onPointerLeave?.(event);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'touch') {
      event.currentTarget.setPointerCapture?.(event.pointerId);
      fillButton();
    }
    props.onPointerDown?.(event);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (event.pointerType !== 'mouse') drainAfterTap();
    props.onPointerUp?.(event);
  };

  const handlePointerCancel = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    drainButton();
    props.onPointerCancel?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    drainButton();
    props.onBlur?.(event);
  };

  const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
    fillButton();
    props.onFocus?.(event);
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
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`inline-flex items-center justify-center overflow-hidden relative cursor-pointer select-none px-7 py-3 min-w-[150px] font-sans text-[11px] uppercase tracking-[0.18em] transition-transform duration-200 ease-out active:scale-[0.985] disabled:pointer-events-none disabled:opacity-55 ${styles.container} ${className}`}
      style={{ borderRadius: BUTTON_RADIUS }}
    >
      <span className="relative z-10">{children}</span>
      <span
        ref={fillRef}
        className={`absolute inset-0 flex items-center justify-center z-20 ${styles.fill}`}
        style={{ willChange: 'clip-path', borderRadius: BUTTON_RADIUS, transform: 'translateZ(0)' }}
        aria-hidden="true"
      >
        {children}
      </span>
    </button>
  );
}
