import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import AnimatedText from '../shared/AnimatedText';
import SectionLabel from '../shared/SectionLabel';
import ParallaxImage from '../shared/ParallaxImage';
import LiquidButton from '../ui/LiquidButton';
import { HOTEL, STATS } from '@/lib/constants';

export default function WelcomeSection() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!statsRef.current) return;
    
    const statItems = statsRef.current.querySelectorAll('.stat-item');
    
    gsap.set(statItems, { y: 30, opacity: 0 });
    
    const trigger = ScrollTrigger.create({
      trigger: statsRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(statItems, {
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

  return (
    <section className="bg-cream py-32 lg:py-40 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Left Column */}
        <div className="lg:col-span-5">
          <SectionLabel label="Overview" variant="light" />
          <AnimatedText 
            as="h2" 
            className="font-cormorant text-[clamp(42px,5.5vw,80px)] text-ink leading-[1.1] tracking-[-0.015em] mb-12"
          >
            Who We Are
          </AnimatedText>
          
          <div className="w-full aspect-[3/4] relative">
            <ParallaxImage 
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80"
              alt="Hotel Entrance"
              speed={0.15}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 lg:pt-24 flex flex-col">
          <p className="font-cormorant italic text-[clamp(20px,2.2vw,28px)] text-ink font-light leading-relaxed mb-8">
            {HOTEL.description}
          </p>
          
          <p className="font-sans text-[15px] sm:text-[17px] text-ink-muted font-light leading-[1.7] mb-16 max-w-xl">
            Whether visiting for business or leisure, experience a true garden sanctuary. Our property offers a tranquil escape from the city bustle while remaining perfectly situated just minutes from Kumasi's key landmarks and airport.
          </p>
          
          {/* Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {STATS.map((stat, i) => (
              <div key={i} className="stat-item border-t border-border-light pt-6">
                <div className="font-cormorant text-[clamp(48px,6vw,96px)] font-light text-emerald leading-none mb-2">
                  {stat.number}
                </div>
                <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <LiquidButton variant="outline-dark">Explore Rooms</LiquidButton>
          </div>
        </div>
        
      </div>
    </section>
  );
}