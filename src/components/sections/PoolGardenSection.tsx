import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import ParallaxImage from '../shared/ParallaxImage';
import AnimatedText from '../shared/AnimatedText';
import LiquidButton from '../ui/LiquidButton';

export default function PoolGardenSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayCardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (overlayCardRef.current) {
      gsap.set(overlayCardRef.current, { y: 30, opacity: 0 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        once: true,
        onEnter: () => {
          gsap.to(overlayCardRef.current, {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          });
        }
      });
    }

    if (contentRef.current) {
      const elements = Array.from(contentRef.current.children);
      gsap.set(elements, { y: 20, opacity: 0 });
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(elements, {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          });
        }
      });
    }
  }, []);

  return (
    <section id="pool" ref={sectionRef} className="bg-forest-mid relative flex flex-col lg:flex-row overflow-hidden min-h-[90vh] lg:min-h-screen">

      {/* Left — Image */}
      <div className="w-full lg:w-[58%] h-[55vw] sm:h-[45vw] lg:h-auto relative">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=85"
          alt="Outdoor Pool and Garden"
          speed={0.12}
          className="h-full"
          containerClassName="h-full w-full"
        />
        {/* Floating card */}
        <div
          ref={overlayCardRef}
          className="absolute bottom-5 left-5 sm:bottom-10 sm:left-10 bg-forest p-4 sm:p-6 border-l-2 border-gold z-10 shadow-2xl"
        >
          <div className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white">
            <span className="text-gold">Open Daily</span> · 6:00 am – 10:00 pm
          </div>
        </div>
      </div>

      {/* Right — Content */}
      <div className="w-full lg:w-[42%] px-5 sm:px-10 py-16 sm:py-20 lg:py-0 flex items-center justify-center">
        <div ref={contentRef} className="max-w-md w-full flex flex-col">

          <div className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold mb-5 font-medium">
            The Pool & Garden
          </div>

          <AnimatedText
            as="h2"
            className="font-cormorant text-[clamp(38px,4vw,64px)] text-white leading-[1.1] mb-7"
          >
            The Heart of the Garden
          </AnimatedText>

          <div className="w-12 h-px bg-gold mb-7" />

          <p className="font-cormorant italic text-[clamp(18px,1.8vw,22px)] text-white/75 leading-relaxed font-light mb-7">
            Dive into the shimmering centrepiece of Sweet Garden. Our outdoor pool is surrounded by lush tropical plantings — equally inviting at sunrise for quiet morning laps and at dusk for drinks beneath the evening sky.
          </p>

          <div className="w-12 h-px bg-gold mb-7" />

          <div className="mb-10 font-sans text-[11px] text-gold uppercase tracking-[0.2em]">
            Leisure · Relaxation · Drinks
          </div>

          <div>
            <LiquidButton variant="outline-light">Discover the Pool</LiquidButton>
          </div>

        </div>
      </div>
    </section>
  );
}
