import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import logo from "@/assets/pravasx-logo.webp";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr]">
          <div>
            <img src={logo} alt="PravasX" width={140} height={56} loading="lazy" className="h-14 w-auto object-contain brightness-0 invert" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
              Travel and local guidance brought together. Choose your place, time and pickup; the guide can drive you and help shape the itinerary.
            </p>
            <div className="mt-6 flex flex-wrap gap-3"><a href="https://wa.me/919970348409" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 hover:border-gold/50 hover:text-gold"><MessageCircle className="h-4 w-4" /> WhatsApp</a><a href="tel:+919970348409" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 hover:border-gold/50 hover:text-gold"><Phone className="h-4 w-4" /> Call</a></div>
          </div>
          <nav aria-label="Footer navigation"><h2 className="font-display text-sm font-bold uppercase tracking-widest text-gold">Explore</h2><ul className="mt-4 space-y-3 text-sm text-white/70"><li><Link to="/" className="hover:text-gold">Home</Link></li><li><Link to="/about" className="hover:text-gold">About</Link></li><li><a href="#how-it-works" className="hover:text-gold">How it works</a></li><li><a href="#packages" className="hover:text-gold">Packages</a></li><li><a href="#faq" className="hover:text-gold">FAQ</a></li></ul></nav>
          <div id="contact"><h2 className="font-display text-sm font-bold uppercase tracking-widest text-gold">Talk to PravasX</h2><ul className="mt-4 space-y-4 text-sm text-white/70"><li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><a href="tel:+919970348409" className="hover:text-gold">+91 99703 48409</a></li><li className="flex items-start gap-3"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><a href="https://wa.me/919970348409" target="_blank" rel="noreferrer" className="hover:text-gold">WhatsApp us</a></li><li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><a href="mailto:hello@pravasx.com" className="hover:text-gold">hello@pravasx.com</a></li><li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>Maharashtra, India</span></li></ul></div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} PravasX.</p><p>Travel + guide, done your way.</p></div>
      </div>
    </footer>
  );
}
