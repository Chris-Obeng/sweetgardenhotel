import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import AnimatedText from '../shared/AnimatedText';
import SectionLabel from '../shared/SectionLabel';
import { DINING } from '@/lib/constants';

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
          stagger: 0.14,
          ease: 'power3.out',
        });
      }
    });

    // Smooth GSAP marquee (instead of CSS animation)
    const speed = 60; // px per second
    let xPos1 = 0;
    let xPos2 = 0;
    let width = 0;

    const measureAndAnimate = () => {
      if (!track1.current || !track2.current) return;
      width = track1.current.scrollWidth;
      xPos2 = width;
      gsap.set(track1.current, { x: xPos1 });
      gsap.set(track2.current, { x: xPos2 });
    };

    measureAndAnimate();

    let raf: number;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      xPos1 -= speed * dt;
      xPos2 -= speed * dt;
      if (track1.current && xPos1 <= -width) xPos1 = xPos2 + width;
      if (track2.current && xPos2 <= -width) xPos2 = xPos1 + width;
      if (track1.current) gsap.set(track1.current, { x: xPos1 });
      if (track2.current) gsap.set(track2.current, { x: xPos2 });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      trigger.kill();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="dining" className="bg-cream py-24 sm:py-32 lg:py-40 overflow-hidden">
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

      {/* GSAP-driven infinite marquee */}
      <div className="relative flex overflow-hidden bg-cream-dark py-4 mb-16 sm:mb-24 border-y border-border-light">
        <div className="absolute inset-0 flex">
          <div
            ref={track1}
            className="shrink-0 whitespace-nowrap font-sans text-[11px] uppercase tracking-[0.22em] text-ink-faint"
          >
            {marqueeText}
          </div>
          <div
            ref={track2}
            className="absolute top-1/2 -translate-y-1/2 shrink-0 whitespace-nowrap font-sans text-[11px] uppercase tracking-[0.22em] text-ink-faint"
          >
            {marqueeText}
          </div>
        </div>
        <div className="invisible whitespace-nowrap font-sans text-[11px] uppercase tracking-[0.22em]" aria-hidden>
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
