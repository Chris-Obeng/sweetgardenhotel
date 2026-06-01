import { ReactLenis } from '@studio-freight/react-lenis';
import { useEffect, useRef, type ComponentType, type ReactNode, type Ref } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

type LenisRootProps = {
  root?: boolean;
  ref?: Ref<unknown>;
  options?: {
    lerp?: number;
    duration?: number;
    smoothWheel?: boolean;
    wheelMultiplier?: number;
  };
  children?: ReactNode;
};

const LenisRoot = ReactLenis as unknown as ComponentType<LenisRootProps>;

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
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
    <LenisRoot 
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
    </LenisRoot>
  );
}
