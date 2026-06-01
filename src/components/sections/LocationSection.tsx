import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import AnimatedText from '../shared/AnimatedText';
import SectionLabel from '../shared/SectionLabel';
import { HOTEL, LOCATION_LANDMARKS } from '@/lib/constants';
import { Plane, MapPin, Phone } from 'lucide-react';

export default function LocationSection() {
  const landmarksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!landmarksRef.current) return;
    const items = landmarksRef.current.querySelectorAll('.landmark-item');

    gsap.set(items, { x: -25, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: landmarksRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          x: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out'
        });
      }
    });

    return () => trigger.kill();
  }, []);

  return (
    <section id="location" className="flex flex-col lg:flex-row min-h-screen">

      {/* Left Side (Dark) */}
      <div className="w-full lg:w-1/2 bg-forest py-24 sm:py-32 lg:py-40 px-5 sm:px-10 lg:px-16 xl:px-24 flex flex-col justify-center">
        <div className="max-w-xl">
          <SectionLabel label="Location" variant="dark" />
          <AnimatedText
            as="h2"
            className="font-cormorant text-[clamp(38px,5vw,64px)] text-white leading-[1.1] tracking-[-0.015em] mb-6 sm:mb-8"
          >
            At the Centre of Everything
          </AnimatedText>

          <p className="font-sans text-[14px] sm:text-[15px] text-white/65 font-light leading-[1.75] mb-8 sm:mb-12">
            Perfectly positioned in Kumasi's Danyame Estates — close to the city's key landmarks and Prempeh I International Airport, yet tucked away in a serene tropical setting.
          </p>

          {/* Airport callout */}
          <div className="bg-forest-mid p-4 sm:p-6 border-l-2 border-gold mb-8 sm:mb-12 flex items-center gap-4">
            <Plane className="text-gold shrink-0" size={22} />
            <div className="font-sans text-[11px] uppercase tracking-[0.15em] text-white">
              <span className="text-gold block mb-1">Prempeh I International Airport</span>
              10 minutes · 6.5 km away
            </div>
          </div>

          {/* Landmarks */}
          <div ref={landmarksRef} className="space-y-4 sm:space-y-5 mb-10 sm:mb-14">
            {LOCATION_LANDMARKS.slice(1, 7).map((landmark, i) => (
              <div key={i} className="landmark-item flex items-center justify-between border-l-2 border-emerald/50 pl-4">
                <span className="font-sans text-[13px] sm:text-[14px] text-white/85">{landmark.name}</span>
                <span className="font-sans text-[10px] uppercase tracking-wider text-emerald-pale bg-emerald/10 px-2 py-1 shrink-0 ml-4">
                  {landmark.distance}
                </span>
              </div>
            ))}
          </div>

          {/* Phone CTA */}
          <a
            href={`tel:${HOTEL.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-3 font-sans text-[13px] text-gold hover:text-white transition-colors duration-200 group"
          >
            <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center group-hover:border-white/40 transition-colors">
              <Phone size={15} strokeWidth={1.5} />
            </div>
            {HOTEL.phone}
          </a>
        </div>
      </div>

      {/* Right Side (Image) */}
      <div className="w-full lg:w-1/2 h-[55vw] sm:h-[50vw] lg:h-auto relative bg-cream">
        <img
          src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1200&q=80"
          alt="Kumasi, Ghana"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-forest/20" />

        {/* Pin overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-forest rounded-full flex items-center justify-center text-gold shadow-2xl mb-3 relative z-10 animate-bounce">
            <MapPin size={22} />
          </div>
          <div className="bg-forest px-4 sm:px-6 py-2 sm:py-3 shadow-xl">
            <div className="font-cormorant text-lg sm:text-xl text-white text-center">Sweet Garden Hotel</div>
            <div className="font-sans text-[8px] sm:text-[9px] uppercase tracking-widest text-gold text-center mt-0.5">Danyame Estates · Kumasi</div>
          </div>
        </div>
      </div>
    </section>
  );
}
