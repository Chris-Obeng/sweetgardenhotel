import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import SectionLabel from '../shared/SectionLabel';
import AnimatedText from '../shared/AnimatedText';

const GALLERY_IMAGES = [
  {
    src: "/pool/pool.png",
    alt: "Sweet Garden Hotel pool",
    caption: "Outdoor Pool",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/rooms/executive_suite.avif",
    alt: "Executive Suite",
    caption: "Executive Suite",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/dining/food2.webp",
    alt: "Sweet Garden dining spread",
    caption: "Signature Dining",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/events/IMG-20260527-WA0014.jpg",
    alt: "Private garden dining setup",
    caption: "Garden Gatherings",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/rooms/twin.jpg",
    alt: "Twin guest room",
    caption: "Twin Guest Room",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/events/IMG-20260527-WA0033.jpg",
    alt: "Private dining room",
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
          className="columns-1 sm:columns-2 lg:columns-3 gap-3 lg:gap-4"
        >
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className="gallery-item overflow-hidden relative group break-inside-avoid mb-3 lg:mb-4 bg-forest"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.025]"
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
      </div>
    </section>
  );
}
