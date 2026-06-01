import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import AnimatedText from '../shared/AnimatedText';
import SectionLabel from '../shared/SectionLabel';
import LiquidButton from '../ui/LiquidButton';
import { ROOMS } from '@/lib/constants';

export default function RoomsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    const slider = scrollContainerRef.current;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      slider.classList.add('cursor-grabbing');
      slider.classList.remove('cursor-grab');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const onMouseLeave = () => {
      isDown = false;
      slider.classList.remove('cursor-grabbing');
      slider.classList.add('cursor-grab');
    };
    const onMouseUp = () => {
      isDown = false;
      slider.classList.remove('cursor-grabbing');
      slider.classList.add('cursor-grab');
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener('mousedown', onMouseDown);
    slider.addEventListener('mouseleave', onMouseLeave);
    slider.addEventListener('mouseup', onMouseUp);
    slider.addEventListener('mousemove', onMouseMove);

    const cards = slider.querySelectorAll('.room-card');
    gsap.set(cards, { x: 60, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.to(cards, { x: 0, opacity: 1, duration: 0.85, stagger: 0.14, ease: 'power3.out' });
      }
    });

    return () => {
      slider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('mouseleave', onMouseLeave);
      slider.removeEventListener('mouseup', onMouseUp);
      slider.removeEventListener('mousemove', onMouseMove);
      trigger.kill();
    };
  }, []);

  return (
    <section id="rooms" ref={containerRef} className="bg-forest py-24 sm:py-32 lg:py-40">
      {/* Header */}
      <div className="px-5 sm:px-8 lg:px-12 mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6 max-w-7xl mx-auto">
        <div>
          <SectionLabel label="Accommodations" variant="dark" />
          <AnimatedText
            as="h2"
            className="font-cormorant text-[clamp(38px,5.5vw,80px)] text-white leading-[1.08] tracking-[-0.015em]"
          >
            Rooms & Suites
          </AnimatedText>
        </div>
        <div className="flex gap-3 shrink-0">
          <LiquidButton variant="outline-light">View All</LiquidButton>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-scroll no-scrollbar cursor-grab pl-5 sm:pl-8 lg:pl-12 pr-5 sm:pr-8 gap-5 sm:gap-6 pb-10 snap-x snap-mandatory"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {ROOMS.map((room) => (
          <div
            key={room.id}
            className="room-card shrink-0 w-[82vw] sm:w-[56vw] md:w-[40vw] lg:w-[33vw] snap-start flex flex-col"
          >
            {/* Image — 4:3 landscape */}
            <div className="w-full aspect-[4/3] mb-5 overflow-hidden relative group">
              <img
                src={room.imagePath}
                alt={room.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
              />
              <div className="absolute top-3 left-3 bg-forest/80 backdrop-blur-sm px-3 py-1.5 font-sans text-[10px] uppercase tracking-wider text-white/90">
                {room.size} m²
              </div>
            </div>

            <h3 className="font-cormorant text-2xl sm:text-[28px] text-white mb-2">
              {room.name}
            </h3>

            <p className="font-cormorant italic text-white/60 text-[16px] sm:text-[17px] mb-5 leading-relaxed">
              {room.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {room.features.slice(0, 4).map((feature, i) => (
                <span
                  key={i}
                  className="font-sans text-[10px] uppercase tracking-wider text-white/75 px-3 py-1.5 border border-white/20"
                >
                  {feature}
                </span>
              ))}
              {room.features.length > 4 && (
                <span className="font-sans text-[10px] uppercase tracking-wider text-white/35 px-3 py-1.5">
                  +{room.features.length - 4} more
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
