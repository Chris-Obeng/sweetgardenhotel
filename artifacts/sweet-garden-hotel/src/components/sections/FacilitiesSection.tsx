import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import AnimatedText from '../shared/AnimatedText';
import SectionLabel from '../shared/SectionLabel';
import { FACILITIES } from '@/lib/constants';
import * as Icons from 'lucide-react';

export default function FacilitiesSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll('.facility-item');
    
    gsap.set(items, { y: 30, opacity: 0 });
    
    const trigger = ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out'
        });
      }
    });

    return () => trigger.kill();
  }, []);

  return (
    <section id="facilities" className="bg-cream py-32 lg:py-40 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-24">
          <SectionLabel label="Facilities" variant="light" />
          <AnimatedText 
            as="h2" 
            className="font-cormorant text-[clamp(42px,5.5vw,80px)] text-ink leading-[1.1] tracking-[-0.015em] mb-6"
          >
            Everything You Need
          </AnimatedText>
          <p className="font-cormorant italic text-[clamp(20px,2vw,24px)] text-ink-muted font-light leading-relaxed">
            Affordable luxury that includes everything — for a premium experience at an accessible rate.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {FACILITIES.map((facility, i) => {
            const Icon = Icons[facility.icon as keyof typeof Icons] as React.ElementType;
            
            return (
              <div key={i} className="facility-item border-t border-border-light pt-8 group">
                <div className="mb-6 text-emerald transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
                  {Icon && <Icon size={28} strokeWidth={1.5} />}
                </div>
                <h3 className="font-cormorant text-2xl lg:text-[26px] text-ink mb-3">
                  {facility.name}
                </h3>
                <p className="font-sans text-[14px] text-ink-muted font-light leading-[1.6]">
                  {facility.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}