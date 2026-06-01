import { useEffect, useState, useRef } from 'react';
import { Link } from 'wouter';
import { gsap } from '@/lib/gsap-config';
import LiquidButton from '../ui/LiquidButton';
import HotelLogo from '../ui/HotelLogo';
import { NAV_LINKS, HOTEL } from '@/lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
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
        duration: 0.7,
        ease: 'power4.inOut',
      });
      const links = mobileLinksRef.current.querySelectorAll('.mobile-link');
      gsap.fromTo(links,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.55, stagger: 0.08, delay: 0.35, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(mobileMenuRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.7,
        ease: 'power4.inOut',
      });
    }

    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navClass = scrolled
    ? 'bg-cream/95 backdrop-blur-md border-b border-border-light h-[60px]'
    : 'bg-transparent h-[68px]';

  const linkColor = scrolled
    ? 'text-ink hover:text-emerald'
    : 'text-white/90 hover:text-white';

  return (
    <>
      <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center px-5 sm:px-8 lg:px-12 ${navClass}`}>
        {/* Logo */}
        <div className="flex-1 min-w-0">
          <Link href="/">
            <HotelLogo
              nameColor={scrolled ? 'text-ink' : 'text-white'}
              subColor={scrolled ? 'text-emerald' : 'text-gold'}
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-sans text-[10.5px] uppercase tracking-[0.18em] relative group py-1.5 transition-colors duration-200 ${linkColor}`}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Book Now + Hamburger */}
        <div className="flex-1 flex justify-end items-center gap-4 sm:gap-6">
          <a href={`tel:${HOTEL.phone.replace(/\s/g, '')}`} className="hidden md:block">
            <LiquidButton variant={scrolled ? 'outline-dark' : 'outline-light'}>
              Book Now
            </LiquidButton>
          </a>
          <button
            className={`lg:hidden flex flex-col gap-[5px] w-6 justify-center relative z-50 transition-colors duration-300 ${mobileMenuOpen ? 'text-white' : linkColor}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[1.5px] bg-current transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-current transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-forest flex flex-col"
        style={{ clipPath: 'inset(0 0 100% 0)' }}
      >
        <div ref={mobileLinksRef} className="flex flex-col justify-center flex-1 px-8 pt-24 gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-link font-cormorant text-[clamp(36px,8vw,56px)] text-white leading-tight py-2 border-b border-white/10 flex items-center justify-between group"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
              <span className="text-gold/50 text-xl group-hover:text-gold transition-colors">→</span>
            </a>
          ))}
        </div>
        <div className="px-8 pb-12 flex flex-col gap-5">
          <a href={`tel:${HOTEL.phone.replace(/\s/g, '')}`}>
            <LiquidButton variant="light" className="w-full justify-center">
              Book Now · {HOTEL.phone}
            </LiquidButton>
          </a>
          <div className="text-white/45 font-sans text-[11px] tracking-wider space-y-1.5">
            <p>{HOTEL.address}</p>
            <p>{HOTEL.email}</p>
          </div>
        </div>
      </div>
    </>
  );
}
