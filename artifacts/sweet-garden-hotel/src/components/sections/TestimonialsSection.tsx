import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import AnimatedText from '../shared/AnimatedText';
import SectionLabel from '../shared/SectionLabel';
import { TESTIMONIALS } from '@/lib/constants';

export default function TestimonialsSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.testimonial-card');

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
          stagger: 0.18,
          ease: 'power3.out'
        });
      }
    });

    return () => trigger.kill();
  }, []);

  return (
    <section className="bg-cream py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto mb-12 sm:mb-16 text-center flex flex-col items-center">
        <SectionLabel label="Guest Reviews" variant="light" />
        <AnimatedText
          as="h2"
          className="font-cormorant text-[clamp(38px,5vw,64px)] text-ink leading-[1.1] tracking-[-0.015em] max-w-2xl"
        >
          What Our Guests Say
        </AnimatedText>
      </div>

      <div
        ref={gridRef}
        className="px-5 sm:px-8 lg:px-12 flex overflow-x-auto lg:grid lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 snap-x snap-mandatory no-scrollbar pb-6 lg:pb-0 max-w-7xl mx-auto"
      >
        {TESTIMONIALS.map((testimonial, i) => (
          <div
            key={i}
            className="testimonial-card shrink-0 w-[82vw] sm:w-[60vw] lg:w-auto snap-center bg-white p-7 sm:p-10 flex flex-col border border-border-light relative"
          >
            <div className="font-cormorant text-[70px] sm:text-[80px] text-emerald leading-none absolute top-3 left-5 opacity-25 select-none">
              "
            </div>
            <p className="font-cormorant italic text-[17px] sm:text-[19px] text-ink leading-relaxed flex-grow relative z-10 mb-8 pt-4">
              {testimonial.quote}
            </p>
            <div className="mt-auto flex flex-col gap-1 border-t border-border-light pt-5">
              <span className="font-sans text-[13px] font-semibold text-ink">
                {testimonial.author}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-wider text-ink-faint">
                {testimonial.source}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
