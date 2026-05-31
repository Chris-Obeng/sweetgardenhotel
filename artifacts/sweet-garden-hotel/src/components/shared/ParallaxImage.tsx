import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  containerClassName?: string;
}

export default function ParallaxImage({ 
  src, 
  alt, 
  speed = 0.2, 
  className = '', 
  containerClassName = '' 
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imgRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      animation: gsap.fromTo(imgRef.current, 
        { y: `-${speed * 100}%` }, 
        { y: `${speed * 100}%`, ease: 'none' }
      )
    });

    return () => {
      trigger.kill();
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${containerClassName}`}>
      <img 
        ref={imgRef}
        src={src} 
        alt={alt} 
        className={`absolute inset-0 w-full object-cover origin-center ${className}`}
        style={{ height: `${100 + (speed * 200)}%`, top: `-${speed * 100}%` }}
      />
    </div>
  );
}