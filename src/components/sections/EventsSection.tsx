import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import AnimatedText from '../shared/AnimatedText';
import SectionLabel from '../shared/SectionLabel';
import LiquidButton from '../ui/LiquidButton';
import { EVENTS, PRIVATE_SPACES } from '@/lib/constants';

export default function EventsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const spacesGridRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!carouselRef.current) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    const slider = carouselRef.current;

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

    if (copyRef.current) {
      gsap.set(copyRef.current, { y: 20, opacity: 0 });
      ScrollTrigger.create({
        trigger: copyRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(copyRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
        }
      });
    }

    const cards = slider.querySelectorAll('.event-card');
    gsap.set(cards, { opacity: 0, x: 40 });

    const trigger1 = ScrollTrigger.create({
      trigger: slider,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(cards, { opacity: 1, x: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out' });
      }
    });

    if (spacesGridRef.current) {
      const spaceCards = spacesGridRef.current.querySelectorAll('.space-card');
      gsap.set(spaceCards, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: spacesGridRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(spaceCards, { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out' });
        }
      });
    }

    return () => {
      slider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('mouseleave', onMouseLeave);
      slider.removeEventListener('mouseup', onMouseUp);
      slider.removeEventListener('mousemove', onMouseMove);
      trigger1.kill();
    };
  }, []);

  return (
    <section id="events" ref={containerRef} className="bg-forest py-24 sm:py-32 lg:py-40 text-white overflow-hidden">

      {/* Header + copy */}
      <div className="px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto mb-12 sm:mb-16">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 sm:gap-12 mb-8 sm:mb-10">
          <div className="flex-1">
            <SectionLabel label="Private Venues" variant="dark" />
            <AnimatedText
              as="h2"
              className="font-cormorant text-[clamp(38px,5.5vw,80px)] leading-[1.1] tracking-[-0.015em]"
            >
              Private Events & Gatherings
            </AnimatedText>
          </div>
          <div className="shrink-0 sm:pt-10">
            <LiquidButton variant="outline-light">View All Spaces</LiquidButton>
          </div>
        </div>

        {/* Compelling copy */}
        <div ref={copyRef} className="max-w-2xl border-l-2 border-gold/50 pl-5 sm:pl-6">
          <p className="font-cormorant italic text-[clamp(18px,1.8vw,22px)] text-white/80 leading-relaxed mb-3">
            Your milestones deserve a beautiful setting.
          </p>
          <p className="font-sans text-[13px] sm:text-[14px] text-white/55 font-light leading-[1.75] max-w-xl">
            From boardroom meetings and birthday celebrations to bridal showers and romantic proposal nights — our five private venues are dressed to impress. Beautifully styled, expertly catered, and priced to make luxury accessible. Because every occasion, big or small, deserves to feel extraordinary.
          </p>
        </div>
      </div>

      {/* Drag carousel */}
      <div
        ref={carouselRef}
        className="flex overflow-x-scroll no-scrollbar cursor-grab pl-5 sm:pl-8 lg:pl-12 pr-5 sm:pr-8 lg:pr-32 gap-5 mb-20 sm:mb-28 snap-x snap-mandatory pb-6"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {EVENTS.map((event) => (
          <div key={event.id} className="event-card shrink-0 w-[78vw] sm:w-[52vw] md:w-[36vw] lg:w-[26vw] snap-start flex flex-col">
            <div className="w-full aspect-[3/4] mb-5 overflow-hidden">
              <img
                src={event.imagePath}
                alt={event.title}
                className="w-full h-full object-cover pointer-events-none transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-emerald-pale mb-2">
              {event.category}
            </div>
            <h3 className="font-cormorant text-2xl lg:text-[28px] mb-3">{event.title}</h3>
            <p className="font-sans text-[13px] sm:text-[14px] text-white/55 font-light leading-relaxed">{event.description}</p>
          </div>
        ))}
      </div>

      {/* Private Spaces grid */}
      <div ref={spacesGridRef} className="px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
        {PRIVATE_SPACES.map((space, i) => (
          <div key={i} className="space-card group cursor-pointer relative overflow-hidden bg-forest-mid aspect-[16/9]">
            <img
              src={space.imagePath}
              alt={space.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-transparent" />
            <div className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-end">
              <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-emerald-pale mb-2">
                {space.highlight}
              </div>
              <h3 className="font-cormorant text-2xl sm:text-[28px] mb-2">{space.name}</h3>
              <div className="font-sans text-[10px] uppercase tracking-wider text-white/80 border border-white/20 inline-block px-3 py-1 w-max">
                Up to {space.capacity} Guests
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
