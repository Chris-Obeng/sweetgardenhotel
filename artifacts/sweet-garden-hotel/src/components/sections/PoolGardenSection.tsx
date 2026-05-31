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
        start: 'top 50%',
        once: true,
        onEnter: () => {
          gsap.to(overlayCardRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
          });
        }
      });
    }

    if (contentRef.current) {
      const elements = contentRef.current.children;
      gsap.set(elements, { y: 20, opacity: 0 });
      
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(elements, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
          });
        }
      });
    }
  }, []);

  return (
    <section id="pool" ref={sectionRef} className="bg-forest-mid relative lg:h-[100dvh] flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left 60% Image Area */}
      <div className="w-full lg:w-[60%] h-[60vh] lg:h-full relative">
        <ParallaxImage 
          src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=85"
          alt="Outdoor Pool and Garden"
          speed={0.15}
          className="h-full"
          containerClassName="h-full w-full"
        />
        
        {/* Floating Card */}
        <div 
          ref={overlayCardRef}
          className="absolute bottom-6 left-6 lg:bottom-12 lg:left-12 bg-forest p-6 border-l-2 border-gold z-10 shadow-2xl"
        >
          <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-white">
            <span className="text-gold">Open Daily</span> · 6:00am – 10:00pm
          </div>
        </div>
      </div>

      {/* Right 40% Content Area */}
      <div className="w-full lg:w-[40%] px-8 py-24 lg:py-0 flex items-center justify-center relative z-10">
        <div ref={contentRef} className="max-w-md w-full flex flex-col">
          
          <div className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold mb-6 font-medium">
            The Pool & Garden
          </div>
          
          <h2 className="font-cormorant text-[clamp(42px,4vw,64px)] text-white leading-[1.1] mb-8">
            The Heart of the Garden
          </h2>
          
          <div className="w-16 h-px bg-gold mb-8"></div>
          
          <p className="font-cormorant italic text-[clamp(20px,2vw,24px)] text-white/80 leading-relaxed font-light mb-8">
            Dive into the shimmering centrepiece of Sweet Garden. Our outdoor pool, surrounded by lush tropical plantings, is the beating heart of the estate — equally inviting at sunrise for quiet morning laps and at dusk for drinks beneath the evening sky.
          </p>
          
          <div className="w-16 h-px bg-gold mb-8"></div>
          
          <div className="mb-12 font-sans text-[11px] text-gold uppercase tracking-[0.2em]">
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