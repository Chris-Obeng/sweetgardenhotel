import { HOTEL } from '@/lib/constants';
import LiquidButton from '../ui/LiquidButton';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <footer className="bg-forest pt-24 pb-8 px-6 lg:px-12 text-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Top Block */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex flex-col">
            <span className="font-cormorant font-light text-3xl leading-none text-white">Sweet Garden</span>
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-medium text-gold mt-1">Hotel</span>
          </div>
          
          <div className="grid grid-cols-2 gap-x-16 gap-y-4 font-sans text-[11px] uppercase tracking-[0.15em] text-white/70">
            <a href="#rooms" className="hover:text-gold transition-colors">Rooms</a>
            <a href="#pool" className="hover:text-gold transition-colors">Pool & Garden</a>
            <a href="#dining" className="hover:text-gold transition-colors">Dining</a>
            <a href="#facilities" className="hover:text-gold transition-colors">Facilities</a>
            <a href="#events" className="hover:text-gold transition-colors">Events</a>
            <a href="#location" className="hover:text-gold transition-colors">Location</a>
          </div>
        </div>

        {/* Middle Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-border-dark pt-16">
          
          <div className="flex flex-col gap-6">
            <h4 className="font-cormorant text-2xl text-white">Subscribe</h4>
            <p className="font-sans text-[13px] text-white/60 font-light">Join our newsletter for exclusive offers and updates.</p>
            <div className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-0 border-b border-white/20 text-[14px] pb-2 text-white placeholder:text-white/30 focus:outline-none focus:border-gold focus:ring-0 transition-colors rounded-none"
              />
              <div className="flex items-start gap-3 mt-2">
                <input type="checkbox" className="mt-1 bg-transparent border-white/30 rounded-none accent-gold" />
                <span className="font-sans text-[11px] text-white/50 leading-tight">
                  I agree to the privacy policy and consent to receiving marketing emails.
                </span>
              </div>
              <div className="mt-4">
                <LiquidButton variant="outline-light">Sign Up</LiquidButton>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-cormorant text-[36px] text-white leading-none">Contact Us</h4>
            <div className="flex flex-col gap-3 font-sans text-[14px] text-white/70 font-light">
              <p>{HOTEL.address}</p>
              <p>{HOTEL.phone}</p>
              <p>{HOTEL.email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold mb-2">Follow Us</h4>
            {['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'TikTok'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="font-sans text-[11px] uppercase tracking-wider text-white/60 hover:text-white transition-colors block w-max"
              >
                {social}
              </a>
            ))}
          </div>

        </div>

        {/* Bottom Block */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-border-dark pt-8">
          <div className="font-sans text-[10px] uppercase tracking-wider text-white/40 text-center md:text-left leading-relaxed">
            COPYRIGHT © 2025 SWEET GARDEN HOTEL. ALL RIGHTS RESERVED <br className="md:hidden" />
            <span className="hidden md:inline"> · </span> PRIVACY POLICY · TERMS OF SERVICE
          </div>
          
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold transition-colors shrink-0"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} strokeWidth={1.5} />
          </button>
        </div>

      </div>
    </footer>
  );
}