import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

interface AnimatedTextProps {
  children: string;
  as?: React.ElementType;
  splitBy?: 'words' | 'chars';
  className?: string;
  delay?: number;
}

export default function AnimatedText({ 
  children, 
  as: Component = 'div', 
  splitBy = 'words', 
  className = '',
  delay = 0
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const elements = containerRef.current.querySelectorAll('.animate-inner');
    if (elements.length === 0) return;

    gsap.set(elements, { y: '100%', opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(elements, {
          y: '0%',
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          stagger: splitBy === 'words' ? 0.06 : 0.03,
          delay: delay
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [splitBy, delay]);

  const tokens = splitBy === 'words' ? children.split(' ') : children.split('');

  return (
    <Component ref={containerRef} className={className}>
      {tokens.map((token, index) => (
        <span key={index} className="inline-flex overflow-hidden relative">
          <span className="animate-inner inline-block relative">
            {token === ' ' && splitBy === 'chars' ? '\u00A0' : token}
          </span>
          {splitBy === 'words' && index < tokens.length - 1 && '\u00A0'}
        </span>
      ))}
    </Component>
  );
}