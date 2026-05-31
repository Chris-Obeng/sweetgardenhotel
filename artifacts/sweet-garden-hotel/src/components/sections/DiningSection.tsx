import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import AnimatedText from '../shared/AnimatedText';
import { DINING } from '@/lib/constants';

const images = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  "https://images.unsplash.com/photo-1540541338537-71cf5b4e4f73?w=800&q=80",
  "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80",
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=80"
];

export default function DiningSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.dining-card');
    
    gsap.set(cards, { y: 40, opacity: 0 });
    
    const trigger = ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        });
      }
    });

    return () => trigger.kill();
  }, []);

  const marqueeText = "GHANAIAN CLASSICS · INTERNATIONAL CUISINE · CHINESE KITCHEN · BBQ & GRILL · POOLSIDE BAR · PIZZA · CONTINENTAL BREAKFAST · FRESH SEAFOOD · ";

  return (
    <section id="dining" className="bg-cream py-32 lg:py-40 overflow-hidden">
      <div className="px-6 lg:px-12 mb-16 max-w-7xl mx-auto">
        <AnimatedText 
          as="h2" 
          className="font-cormorant text-[clamp(42px,5.5vw,80px)] text-ink leading-[1.1] tracking-[-0.015em] mb-6"
        >
          Culinary Journeys
        </AnimatedText>
        <p className="font-cormorant italic text-[clamp(20px,2vw,28px)] text-ink font-light">
          From poolside grills to elegant Ghanaian dinners — every meal a destination.
        </p>
      </div>

      <div className="relative flex overflow-hidden bg-cream-dark py-4 mb-24 border-y border-border-light">
        <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap flex font-sans text-[11px] uppercase tracking-[0.2em] text-ink-faint">
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
        <div className="absolute top-0 animate-[marquee_20s_linear_infinite] whitespace-nowrap flex font-sans text-[11px] uppercase tracking-[0.2em] text-ink-faint" style={{ left: '100%' }}>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>

      <div ref={gridRef} className="px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
        {DINING.map((venue, i) => (
          <div key={i} className="dining-card flex flex-col group cursor-pointer">
            <div className="w-full aspect-[3/2] mb-6 relative overflow-hidden bg-forest">
              <img 
                src={images[i]} 
                alt={venue.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15"></div>
            </div>
            
            <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-emerald mb-3">
              {venue.tag}
            </div>
            <h3 className="font-cormorant text-2xl lg:text-3xl text-ink mb-4">
              {venue.title}
            </h3>
            <p className="font-sans text-[15px] text-ink-muted leading-[1.7] font-light max-w-md">
              {venue.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}