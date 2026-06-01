import { HOTEL } from '@/lib/constants';
import LiquidButton from '../ui/LiquidButton';
import { ArrowUp, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <footer className="bg-forest pt-20 sm:pt-28 pb-8 px-5 sm:px-8 lg:px-12 text-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-14 sm:gap-20">

        {/* Top — Brand + Nav */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-10 sm:gap-16">
          <div className="flex flex-col">
            <span className="font-cormorant font-light text-3xl sm:text-4xl leading-none text-white">Sweet Garden</span>
            <span className="font-sans text-[9px] uppercase tracking-[0.22em] font-medium text-gold mt-1.5">Hotel · Kumasi, Ghana</span>
            <p className="font-sans text-[13px] text-white/50 font-light mt-5 max-w-[260px] leading-relaxed">
              A tropical garden oasis in the heart of Kumasi's Danyame Estates.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 sm:gap-x-20 gap-y-3">
            {[
              { href: "#about", label: "About" },
              { href: "#rooms", label: "Rooms" },
              { href: "#dining", label: "Dining" },
              { href: "#events", label: "Events" },
              { href: "#gallery", label: "Gallery" },
              { href: "#location", label: "Location" },
              { href: "#pool", label: "Pool & Garden" },
              { href: "#facilities", label: "Facilities" },
            ].map((link) => (
              <a key={link.href} href={link.href} className="font-sans text-[11px] uppercase tracking-[0.15em] text-white/60 hover:text-gold transition-colors duration-200">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Middle — Contact + Social */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 border-t border-border-dark pt-14">

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <h4 className="font-cormorant text-2xl sm:text-3xl text-white">Get in Touch</h4>
            <div className="flex flex-col gap-4">
              <a href={`tel:${HOTEL.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 font-sans text-[14px] text-white/70 hover:text-gold transition-colors group">
                <Phone size={14} strokeWidth={1.5} className="shrink-0 text-gold" />
                {HOTEL.phone}
              </a>
              <a href={`mailto:${HOTEL.email}`} className="flex items-start gap-3 font-sans text-[14px] text-white/70 hover:text-gold transition-colors break-all">
                <Mail size={14} strokeWidth={1.5} className="shrink-0 text-gold mt-0.5" />
                {HOTEL.email}
              </a>
              <div className="flex items-start gap-3 font-sans text-[14px] text-white/70">
                <MapPin size={14} strokeWidth={1.5} className="shrink-0 text-gold mt-0.5" />
                {HOTEL.address}
              </div>
            </div>
            <div className="mt-2">
              <LiquidButton variant="outline-light">Book a Room</LiquidButton>
            </div>
          </div>

          {/* Hours */}
          <div className="flex flex-col gap-5">
            <h4 className="font-cormorant text-2xl sm:text-3xl text-white">Hours</h4>
            <div className="flex flex-col gap-3 font-sans text-[13px] text-white/60 font-light">
              {[
                { label: "Check-in", value: `From ${HOTEL.checkIn}` },
                { label: "Check-out", value: `By ${HOTEL.checkOut}` },
                { label: "Front Desk", value: "24 Hours" },
                { label: "Room Service", value: "24 Hours" },
                { label: "Pool", value: "6:00 – 22:00" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-4 border-b border-white/8 pb-3">
                  <span className="text-white/40 uppercase tracking-wider text-[10px]">{label}</span>
                  <span className="text-white/70">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-5">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.22em] text-gold">Follow Us</h4>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Instagram', handle: '@sweetgardenhotel' },
                { name: 'Facebook', handle: 'Sweet Garden Hotel' },
                { name: 'TikTok', handle: '@sweetgarden.gh' },
                { name: 'YouTube', handle: 'Sweet Garden Hotel' },
                { name: 'LinkedIn', handle: 'Sweet Garden Hotel' },
              ].map(({ name, handle }) => (
                <a key={name} href="#" className="flex items-center justify-between font-sans group">
                  <span className="text-[12px] uppercase tracking-wider text-white/60 group-hover:text-white transition-colors">{name}</span>
                  <span className="text-[11px] text-white/30 group-hover:text-gold transition-colors">{handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-border-dark pt-8">
          <div className="font-sans text-[10px] uppercase tracking-wider text-white/35 text-center sm:text-left leading-relaxed">
            © 2026 Sweet Garden Hotel · All Rights Reserved
            <span className="hidden sm:inline"> · </span>
            <br className="sm:hidden" />
            Privacy Policy · Terms of Service
          </div>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-colors shrink-0"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} strokeWidth={1.5} />
          </button>
        </div>

      </div>
    </footer>
  );
}
