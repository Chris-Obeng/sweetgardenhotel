import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import AnimatedText from '../shared/AnimatedText';
import SectionLabel from '../shared/SectionLabel';
import { HOTEL, LOCATION_LANDMARKS } from '@/lib/constants';
import { Plane, MapPin } from 'lucide-react';

export default function LocationSection() {
  const landmarksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!landmarksRef.current) return;
    const items = landmarksRef.current.querySelectorAll('.landmark-item');
    
    gsap.set(items, { x: -30, opacity: 0 });
    
    const trigger = ScrollTrigger.create({
      trigger: landmarksRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        });
      }
    });

    return () => trigger.kill();
  }, []);

  return (
    <section id="location" className="flex flex-col lg:flex-row min-h-[100dvh]">
      
      {/* Left Side (Dark) */}
      <div className="w-full lg:w-1/2 bg-forest py-32 lg:py-40 px-6 lg:px-16 xl:px-24 flex flex-col justify-center">
        <div className="max-w-xl">
          <SectionLabel label="Location" variant="dark" />
          <AnimatedText 
            as="h2" 
            className="font-cormorant text-[clamp(42px,5vw,64px)] text-white leading-[1.1] tracking-[-0.015em] mb-8"
          >
            At the Centre of Everything
          </AnimatedText>
          
          <p className="font-sans text-[15px] text-white/70 font-light leading-[1.7] mb-12">
            {HOTEL.description.split('.')[0]}. Perfectly positioned for both business travelers and leisure guests who want to be close to the action yet tucked away in tranquility.
          </p>

          <div className="bg-forest-mid p-6 border-l-2 border-gold mb-12 flex items-center gap-4">
            <Plane className="text-gold shrink-0" size={24} />
            <div className="font-sans text-[11px] uppercase tracking-[0.15em] text-white">
              <span className="text-gold block mb-1">Prempeh I International Airport</span>
              10 minutes drive
            </div>
          </div>

          <div ref={landmarksRef} className="space-y-6 mb-16">
            {LOCATION_LANDMARKS.slice(1, 6).map((landmark, i) => (
              <div key={i} className="landmark-item flex items-center justify-between border-l border-emerald pl-4">
                <span className="font-sans text-[14px] text-white/90">{landmark.name}</span>
                <span className="font-sans text-[10px] uppercase tracking-wider text-emerald-pale bg-emerald/10 px-2 py-1">
                  {landmark.distance}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-cream/5 p-6 rounded-none">
            <p className="font-cormorant italic text-lg text-gold-muted leading-relaxed">
              "Luxury comfort at an affordable rate. Premium experience, accessible pricing in the heart of Kumasi."
            </p>
          </div>
        </div>
      </div>

      {/* Right Side (Image/Map placeholder) */}
      <div className="w-full lg:w-1/2 h-[60vh] lg:h-auto relative bg-cream">
        <img 
          src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1200&q=80" 
          alt="Kumasi Map Area" 
          className="absolute inset-0 w-full h-full object-cover grayscale-[30%] opacity-90 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-cream/20"></div>
        
        {/* Pin overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center text-gold shadow-2xl mb-4 relative z-10 animate-bounce">
            <MapPin size={28} />
          </div>
          <div className="bg-forest px-6 py-3 shadow-xl">
            <div className="font-cormorant text-xl text-white">Sweet Garden Hotel</div>
            <div className="font-sans text-[9px] uppercase tracking-widest text-gold text-center mt-1">Danyame Estates</div>
          </div>
        </div>
      </div>

    </section>
  );
}