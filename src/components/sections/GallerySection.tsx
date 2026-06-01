import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import SectionLabel from '../shared/SectionLabel';
import AnimatedText from '../shared/AnimatedText';

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&q=85",
    alt: "Pool at Sunset",
    caption: "Outdoor Pool",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80",
    alt: "Deluxe Room",
    caption: "Deluxe Garden Room",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80",
    alt: "Dining",
    caption: "Main Restaurant",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&q=80",
    alt: "Garden",
    caption: "Tropical Gardens",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&q=80",
    alt: "Pool Suite",
    caption: "Pool View Suite",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=900&q=85",
    alt: "Events",
    caption: "Private Dining",
    span: "col-span-2 row-span-1",
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll('.gallery-item');

    gsap.set(items, { opacity: 0, scale: 0.94, y: 30 });

    const trigger = ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.85,
          stagger: {
            each: 0.1,
            from: 'start',
          },
          ease: 'power3.out',
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="bg-cream py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <SectionLabel label="Gallery" variant="light" />
            <AnimatedText
              as="h2"
              className="font-cormorant text-[clamp(40px,5.5vw,76px)] text-ink leading-[1.08] tracking-[-0.015em]"
            >
              A Glimpse Inside
            </AnimatedText>
          </div>
          <p className="font-cormorant italic text-ink-muted text-[clamp(17px,1.8vw,22px)] leading-relaxed max-w-xs">
            Every corner of Sweet Garden tells a story of warmth and beauty.
          </p>
        </div>

        {/* Grid — desktop masonry, mobile stack */}
        <div
          ref={gridRef}
          className="hidden sm:grid grid-cols-4 grid-rows-3 gap-3 lg:gap-4"
          style={{ gridAutoRows: '220px' }}
        >
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className={`gallery-item overflow-hidden relative group ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/30 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/90">
                  {img.caption}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile — simple 2-col grid */}
        <div className="grid sm:hidden grid-cols-2 gap-3">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className={`gallery-item overflow-hidden relative group ${i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-forest/60 to-transparent px-3 py-2">
                <span className="font-sans text-[9px] uppercase tracking-wider text-white/80">
                  {img.caption}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
