import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import AnimatedText from '../shared/AnimatedText';
import LiquidButton from '../ui/LiquidButton';
import { ROOMS } from '@/lib/constants';

export default function RoomsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    // Draggable functionality
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

    // Enter animations for cards
    const cards = slider.querySelectorAll('.room-card');
    gsap.set(cards, { x: 80, opacity: 0 });
    
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        });
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
    <section id="rooms" ref={containerRef} className="bg-forest py-32 lg:py-40">
      <div className="px-6 lg:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <AnimatedText 
            as="h2" 
            className="font-cormorant text-[clamp(42px,5.5vw,80px)] text-white leading-[1.1] tracking-[-0.015em]"
          >
            Rooms & Suites
          </AnimatedText>
        </div>
        <div className="shrink-0">
          <LiquidButton variant="outline-light">View All</LiquidButton>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-scroll no-scrollbar cursor-grab pl-6 lg:pl-12 pr-6 lg:pr-32 gap-6 pb-12 snap-x snap-mandatory"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {ROOMS.map((room) => (
          <div 
            key={room.id} 
            className="room-card shrink-0 w-[85vw] md:w-[45vw] snap-start flex flex-col"
          >
            <div className="w-full aspect-[3/4] mb-6 overflow-hidden relative group">
              <img 
                src={room.imagePath} 
                alt={room.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
              />
            </div>
            
            <h3 className="font-cormorant text-3xl text-white mb-3">
              {room.name}
            </h3>
            
            <p className="font-cormorant italic text-white/70 text-lg mb-6 leading-relaxed">
              {room.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {room.features.slice(0, 4).map((feature, i) => (
                <span 
                  key={i} 
                  className="font-sans text-[10px] uppercase tracking-wider text-white/90 px-3 py-1 border border-white/20"
                >
                  {feature}
                </span>
              ))}
              {room.features.length > 4 && (
                <span className="font-sans text-[10px] uppercase tracking-wider text-white/60 px-3 py-1 border border-transparent">
                  +{room.features.length - 4} more
                </span>
              )}
            </div>
            
            <div className="mt-auto">
              <LiquidButton variant="outline-light" className="w-full sm:w-auto">
                Discover Room
              </LiquidButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}