import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cream px-6">
      <div className="w-full max-w-md border border-forest/15 bg-white/70 p-8 text-forest shadow-2xl shadow-forest/10">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-7 w-7 text-gold" />
          <h1 className="font-cormorant text-3xl font-light">Page Not Found</h1>
        </div>
        <p className="mt-4 font-sans text-sm leading-6 text-forest/70">
          The page you requested is not part of the Sweet Garden Hotel experience.
        </p>
      </div>
    </div>
  );
}
