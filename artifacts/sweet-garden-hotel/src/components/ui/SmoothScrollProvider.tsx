import { ReactLenis } from '@studio-freight/react-lenis';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis 
      root 
      ref={lenisRef}
      options={{ 
        lerp: 0.085, 
        duration: 1.4, 
        smoothWheel: true, 
        wheelMultiplier: 0.8 
      }}
    >
      {children}
    </ReactLenis>
  );
}