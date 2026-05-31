import { useEffect, useState, useRef } from 'react';
import { Link } from 'wouter';
import { gsap } from '@/lib/gsap-config';
import LiquidButton from '../ui/LiquidButton';
import { NAV_LINKS, HOTEL } from '@/lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current, 
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current || !mobileLinksRef.current) return;
    
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(mobileMenuRef.current, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.8,
        ease: 'power4.inOut'
      });
      
      const links = mobileLinksRef.current.querySelectorAll('.mobile-link');
      gsap.fromTo(links, 
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.4, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(mobileMenuRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.8,
        ease: 'power4.inOut'
      });
    }
    
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navClass = scrolled 
    ? 'bg-cream/95 backdrop-blur border-b border-border-light h-[60px]' 
    : 'bg-transparent h-[72px]';

  const logoColor = scrolled ? 'text-ink' : 'text-white';
  const logoAccent = scrolled ? 'text-emerald' : 'text-gold';
  const linkColor = scrolled ? 'text-ink' : 'text-white';

  return (
    <>
      <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center px-6 lg:px-12 ${navClass}`}>
        <div className="flex-1">
          <Link href="/" className="inline-flex flex-col">
            <span className={`font-cormorant font-light text-2xl leading-none ${logoColor}`}>Sweet Garden</span>
            <span className={`font-sans text-[9px] uppercase tracking-[0.2em] font-medium ${logoAccent}`}>Hotel</span>
          </Link>
        </div>

        <div className="hidden lg:flex flex-1 justify-center space-x-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              className={`font-sans text-[11px] uppercase tracking-[0.18em] relative group py-2 ${linkColor}`}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex-1 flex justify-end items-center space-x-6">
          <div className="hidden md:block">
            <LiquidButton variant={scrolled ? 'outline-dark' : 'outline-light'}>
              Book Now
            </LiquidButton>
          </div>
          <button 
            className={`lg:hidden flex flex-col space-y-1.5 w-6 h-6 justify-center z-50 relative ${mobileMenuOpen ? 'text-white' : linkColor}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`block w-full h-[1px] transition-all duration-300 ${mobileMenuOpen ? 'bg-white rotate-45 translate-y-[7px]' : 'bg-current'}`}></span>
            <span className={`block w-full h-[1px] transition-all duration-300 ${mobileMenuOpen ? 'bg-transparent' : 'bg-current'}`}></span>
            <span className={`block w-full h-[1px] transition-all duration-300 ${mobileMenuOpen ? 'bg-white -rotate-45 -translate-y-[7px]' : 'bg-current'}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-forest flex flex-col pt-24 pb-12 px-8"
        style={{ clipPath: 'inset(0 0 100% 0)' }}
      >
        <div ref={mobileLinksRef} className="flex flex-col space-y-6 flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.href} 
              href={link.href}
              className="mobile-link font-cormorant text-4xl sm:text-5xl text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col space-y-8 mt-auto">
          <LiquidButton variant="light" className="w-full">Book Now</LiquidButton>
          <div className="text-white/60 font-sans text-xs tracking-wider space-y-1">
            <p>{HOTEL.phone}</p>
            <p>{HOTEL.address}</p>
          </div>
        </div>
      </div>
    </>
  );
}