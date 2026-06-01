import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import AnimatedText from '../shared/AnimatedText';
import SectionLabel from '../shared/SectionLabel';
import { LOCATION_LANDMARKS } from '@/lib/constants';
import { Phone, Plane, Star } from 'lucide-react';

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
          ease: 'power3.out',
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section id="location" className="flex flex-col lg:flex-row min-h-screen">
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
            Perfectly positioned on Circular Road in Ridge Danyame, Kumasi, close to the city's key landmarks and Prempeh I International Airport, yet tucked away in a serene tropical setting.
          </p>

          <div className="bg-forest-mid p-4 sm:p-6 border-l-2 border-gold mb-8 sm:mb-12 flex items-center gap-4">
            <Plane className="text-gold shrink-0" size={22} />
            <div className="font-sans text-[11px] uppercase tracking-[0.15em] text-white">
              <span className="text-gold block mb-1">Prempeh I International Airport</span>
              10 minutes · 6.5 km away
            </div>
          </div>

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

          <a
            href="tel:+233240881143"
            className="inline-flex items-center gap-3 font-sans text-[13px] text-gold hover:text-white transition-colors duration-200 group"
          >
            <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center group-hover:border-white/40 transition-colors">
              <Phone size={15} strokeWidth={1.5} />
            </div>
            +233 24 088 1143
          </a>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-forest-mid p-5 sm:p-8 lg:p-10 flex items-center">
        <div className="w-full bg-forest border border-white/10 shadow-2xl">
          <div className="relative h-[360px] sm:h-[450px] lg:h-[620px] overflow-hidden">
            <iframe
              title="Sweet Garden Hotel & Restaurant map"
              src="https://maps.google.com/maps?q=6.671489,-1.629873&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full grayscale-[20%]"
            />
          </div>
          <div className="px-5 sm:px-7 py-5 sm:py-6 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <div className="font-cormorant text-2xl sm:text-3xl text-white leading-tight">
                  Sweet Garden Hotel & Restaurant
                </div>
                <div className="font-sans text-[11px] uppercase tracking-[0.16em] text-white/50 mt-2">
                  Circular Rd, Ridge Danyame, Kumasi, Ghana
                </div>
              </div>
              <div className="flex items-center gap-2 text-gold font-sans text-[11px] uppercase tracking-[0.14em] shrink-0">
                <Star size={14} fill="currentColor" strokeWidth={1.5} />
                4.2 · 1,455 reviews
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
