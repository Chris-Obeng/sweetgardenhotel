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
    const tl = gsap.timeline({ delay: 0.5 });
    
    if (overlayRef.current) {
      tl.to(overlayRef.current, { opacity: 0.6, duration: 1.5, ease: 'power2.out' }, 0);
    }
    
    if (eyebrowRef.current) {
      gsap.set(eyebrowRef.current, { y: 30, opacity: 0 });
      tl.to(eyebrowRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, 0.3);
    }
    
    if (headlineRef.current) {
      gsap.set(headlineRef.current, { y: 80, opacity: 0 });
      tl.to(headlineRef.current, { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }, 0.5);
    }
    
    if (sublineRef.current) {
      gsap.set(sublineRef.current, { y: 40, opacity: 0 });
      tl.to(sublineRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, 0.7);
    }
    
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { y: 30, opacity: 0 });
      tl.to(ctaRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, 0.9);
    }
    
    if (secondaryImgRef.current) {
      gsap.set(secondaryImgRef.current, { x: 60, opacity: 0 });
      tl.to(secondaryImgRef.current, { x: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }, 1.6);
    }
    
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-forest">
      {/* Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&q=85" 
        alt="Sweet Garden Hotel Pool" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Gradient Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-forest opacity-100"
        style={{ background: 'linear-gradient(to top, rgba(13,32,24,0.92) 0%, rgba(13,32,24,0.20) 100%)' }}
      />

      {/* Floating Secondary Image */}
      <div 
        ref={secondaryImgRef}
        className="absolute top-32 right-12 lg:right-24 w-[200px] h-[280px] lg:w-[280px] lg:h-[380px] z-10 hidden md:block"
      >
        <img 
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80" 
          alt="Lush Gardens" 
          className="w-full h-full object-cover shadow-2xl"
        />
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-20 px-8 lg:px-20 z-20">
        <div className="max-w-4xl">
          <div ref={eyebrowRef} className="text-gold font-sans text-[10px] tracking-[0.3em] mb-6 uppercase">
            Danyame · Kumasi · Ghana
          </div>
          
          <h1 
            ref={headlineRef} 
            className="font-cormorant font-light text-white leading-none tracking-[-0.02em] mb-6"
            style={{ fontSize: 'clamp(56px, 8vw, 120px)' }}
          >
            A Garden Oasis
          </h1>
          
          <p 
            ref={sublineRef}
            className="font-cormorant italic text-white/75 mb-10 max-w-2xl"
            style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}
          >
            Where lush tropical gardens meet the finest hospitality in Kumasi.
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
            <LiquidButton variant="light">Reserve Your Stay</LiquidButton>
            <LiquidButton variant="outline-light">Explore the Garden</LiquidButton>
          </div>
        </div>
      </div>

      {/* Metadata Tags */}
      <div className="absolute bottom-8 right-8 lg:right-20 flex flex-col items-end gap-2 z-20 hidden sm:flex">
        {['Outdoor Pool · Leisure', 'Main Restaurant · Dining', '5 Event Spaces · Events'].map((tag, i) => {
          const [primary, secondary] = tag.split(' · ');
          return (
            <div key={i} className="font-sans text-[10px] uppercase tracking-wider text-right">
              <span className="text-white/80">{primary}</span>
              <span className="text-white/40"> · {secondary}</span>
            </div>
          );
        })}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/50">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}