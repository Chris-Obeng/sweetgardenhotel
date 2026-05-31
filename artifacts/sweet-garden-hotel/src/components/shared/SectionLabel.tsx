export default function SectionLabel({ label, variant = "light" }: { label: string, variant?: "light" | "dark" }) {
  return (
    <div className={`text-[10px] sm:text-[11px] uppercase tracking-[0.25em] mb-4 sm:mb-6 font-medium font-sans ${variant === 'light' ? 'text-emerald' : 'text-gold'}`}>
      {label}
    </div>
  );
}