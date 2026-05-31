import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import AnimatedText from '../shared/AnimatedText';
import SectionLabel from '../shared/SectionLabel';
import { DINING } from '@/lib/constants';
import { UtensilsCrossed } from 'lucide-react';

const images = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  "https://images.unsplash.com/photo-1540541338537-71cf5b4e4f73?w=800&q=80",
  "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80",
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=80",
];

const marqueeText = "GHANAIAN CLASSICS · INTERNATIONAL CUISINE · CHINESE KITCHEN · BBQ & GRILL · POOLSIDE BAR · CONTINENTAL BREAKFAST · FRESH SEAFOOD · ";

export default function DiningSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const track1 = useRef<HTMLDivElement>(null);
  const track2 = useRef<HTMLDivElement>(null);
  const restaurantRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.dining-card');
    gsap.set(cards, { y: 40, opacity: 0 });

    const triggerCards = ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(cards, { y: 0, opacity: 1, duration: 0.8, stagger: 0.14, ease: 'power3.out' });
      }
    });

    if (restaurantRef.current) {
      gsap.set(restaurantRef.current, { y: 20, opacity: 0 });
      ScrollTrigger.create({
        trigger: restaurantRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(restaurantRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
        }
      });
    }

    // Smooth GSAP marquee
    const speed = 55;
    let xPos1 = 0;
    let xPos2 = 0;
    let trackWidth = 0;

    const init = () => {
      if (!track1.current) return;
      trackWidth = track1.current.scrollWidth;
      xPos2 = trackWidth;
      gsap.set(track1.current, { x: xPos1 });
      gsap.set(track2.current, { x: xPos2 });
    };
    init();

    let raf: number;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      xPos1 -= speed * dt;
      xPos2 -= speed * dt;
      if (xPos1 <= -trackWidth) xPos1 = xPos2 + trackWidth;
      if (xPos2 <= -trackWidth) xPos2 = xPos1 + trackWidth;
      if (track1.current) gsap.set(track1.current, { x: xPos1 });
      if (track2.current) gsap.set(track2.current, { x: xPos2 });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      triggerCards.kill();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="dining" className="bg-cream py-24 sm:py-32 lg:py-40 overflow-hidden">
      {/* Section Header */}
      <div className="px-5 sm:px-8 lg:px-12 mb-10 sm:mb-14 max-w-7xl mx-auto">
        <SectionLabel label="Dining" variant="light" />
        <AnimatedText
          as="h2"
          className="font-cormorant text-[clamp(38px,5.5vw,80px)] text-ink leading-[1.1] tracking-[-0.015em] mb-5"
        >
          Culinary Journeys
        </AnimatedText>
        <p className="font-cormorant italic text-[clamp(18px,2vw,26px)] text-ink-muted font-light max-w-2xl">
          From poolside grills to elegant Ghanaian dinners — every meal a destination.
        </p>
      </div>

      {/* Restaurant highlight bar */}
      <div ref={restaurantRef} className="px-5 sm:px-8 lg:px-12 mb-10 sm:mb-12 max-w-7xl mx-auto">
        <div className="bg-forest px-6 sm:px-10 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center shrink-0">
              <UtensilsCrossed size={16} strokeWidth={1.5} className="text-gold" />
            </div>
            <div>
              <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold mb-0.5">On-site Restaurant</div>
              <div className="font-cormorant text-xl sm:text-2xl text-white leading-none">
                Sweet Garden Main Restaurant
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 sm:justify-end">
            {['Breakfast · 7am – 10am', 'Lunch · 12pm – 3pm', 'Dinner · 6pm – 10pm'].map((t) => (
              <span key={t} className="font-sans text-[11px] text-white/55 uppercase tracking-wider">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed-height marquee strip — both tracks vertically centered */}
      <div className="relative h-10 overflow-hidden bg-cream-dark mb-16 sm:mb-24 border-y border-border-light">
        <div
          ref={track1}
          className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-sans text-[11px] uppercase tracking-[0.22em] text-ink-faint"
        >
          {marqueeText}
        </div>
        <div
          ref={track2}
          className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-sans text-[11px] uppercase tracking-[0.22em] text-ink-faint"
        >
          {marqueeText}
        </div>
      </div>

      {/* Dining grid */}
      <div ref={gridRef} className="px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-12 sm:gap-y-16">
        {DINING.map((venue, i) => (
          <div key={i} className="dining-card flex flex-col group cursor-pointer">
            <div className="w-full aspect-[4/3] mb-5 relative overflow-hidden bg-forest">
              <img
                src={images[i]}
                alt={venue.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
            </div>
            <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-emerald mb-3">
              {venue.tag}
            </div>
            <h3 className="font-cormorant text-2xl lg:text-3xl text-ink mb-3">
              {venue.title}
            </h3>
            <p className="font-sans text-[13px] sm:text-[14px] text-ink-muted leading-[1.7] font-light max-w-md">
              {venue.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
