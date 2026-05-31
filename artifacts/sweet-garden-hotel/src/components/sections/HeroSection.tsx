import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-config';
import LiquidButton from '../ui/LiquidButton';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const secondaryImgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });

    if (overlayRef.current) {
      gsap.set(overlayRef.current, { opacity: 1 });
      tl.to(overlayRef.current, { opacity: 0.65, duration: 1.8, ease: 'power2.out' }, 0);
    }

    if (eyebrowRef.current) {
      gsap.set(eyebrowRef.current, { y: 20, opacity: 0 });
      tl.to(eyebrowRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, 0.3);
    }

    if (headlineRef.current) {
      gsap.set(headlineRef.current, { y: 60, opacity: 0 });
      tl.to(headlineRef.current, { y: 0, opacity: 1, duration: 1.3, ease: 'power4.out' }, 0.5);
    }

    if (sublineRef.current) {
      gsap.set(sublineRef.current, { y: 30, opacity: 0 });
      tl.to(sublineRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, 0.75);
    }

    if (ctaRef.current) {
      gsap.set(ctaRef.current, { y: 20, opacity: 0 });
      tl.to(ctaRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, 0.95);
    }

    if (secondaryImgRef.current) {
      gsap.set(secondaryImgRef.current, { x: 50, opacity: 0 });
      tl.to(secondaryImgRef.current, { x: 0, opacity: 1, duration: 1.4, ease: 'power3.out' }, 1.5);
    }
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-forest">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&q=85"
        alt="Sweet Garden Hotel Pool"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />

      {/* Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(13,32,24,0.95) 0%, rgba(13,32,24,0.15) 60%, rgba(13,32,24,0.5) 100%)' }}
      />

      {/* Floating Secondary Image — desktop only */}
      <div
        ref={secondaryImgRef}
        className="absolute top-28 right-10 lg:right-20 w-[160px] h-[220px] sm:w-[200px] sm:h-[280px] lg:w-[260px] lg:h-[360px] z-10 hidden sm:block"
      >
        <img
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80"
          alt="Lush Gardens"
          className="w-full h-full object-cover shadow-2xl"
        />
        <div className="absolute inset-0 border border-white/10" />
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-16 sm:pb-20 px-5 sm:px-8 lg:px-20 z-20">
        <div className="max-w-4xl">

          <div ref={eyebrowRef} className="text-gold font-sans text-[9px] sm:text-[10px] tracking-[0.3em] mb-5 uppercase">
            Danyame · Kumasi · Ghana
          </div>

          <h1
            ref={headlineRef}
            className="font-cormorant font-light text-white leading-[0.95] tracking-[-0.02em] mb-5 sm:mb-7"
            style={{ fontSize: 'clamp(52px, 8vw, 120px)' }}
          >
            A Garden Oasis
          </h1>

          <p
            ref={sublineRef}
            className="font-cormorant italic text-white/70 mb-8 sm:mb-10 max-w-lg sm:max-w-2xl leading-relaxed"
            style={{ fontSize: 'clamp(17px, 2vw, 23px)' }}
          >
            Where lush tropical gardens meet the finest hospitality in Kumasi.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start">
            <LiquidButton variant="light">Reserve Your Stay</LiquidButton>
            <LiquidButton variant="outline-light">Explore the Garden</LiquidButton>
          </div>
        </div>
      </div>

      {/* Metadata Tags — desktop only */}
      <div className="absolute bottom-8 right-8 lg:right-20 flex flex-col items-end gap-2 z-20 hidden md:flex">
        {['Outdoor Pool · Leisure', 'Main Restaurant · Dining', '5 Event Spaces · Events'].map((tag, i) => {
          const [primary, secondary] = tag.split(' · ');
          return (
            <div key={i} className="font-sans text-[10px] uppercase tracking-wider text-right">
              <span className="text-white/75">{primary}</span>
              <span className="text-white/35"> · {secondary}</span>
            </div>
          );
        })}
      </div>

      {/* Phone number — mobile */}
      <div className="absolute bottom-6 right-5 z-20 md:hidden">
        <a href="tel:+233545903454" className="font-sans text-[10px] tracking-wider text-white/50">
          +233 54 590 3454
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 text-white/40 animate-bounce">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
