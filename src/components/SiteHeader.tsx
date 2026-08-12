import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import logo from "@/assets/pravasx-logo.webp";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "border-b border-border/70 bg-background/90 backdrop-blur-xl" : "border-b border-transparent bg-transparent")}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center" aria-label="PravasX home">
          <img src={logo} alt="PravasX" width={112} height={44} className={cn("h-12 w-auto object-contain transition-all", !scrolled && "brightness-0 invert")} />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link key={link.to} to={link.to} activeOptions={{ exact: link.to === "/" }} className={cn("rounded-full px-4 py-2 text-sm font-semibold transition-colors", scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white")} activeProps={{ className: scrolled ? "bg-secondary text-foreground" : "bg-white/15 text-white" }}>
              {link.label}
            </Link>
          ))}
          <a href="#plan-trip" className={cn("ml-2 rounded-full px-5 py-2.5 text-sm font-bold transition", scrolled ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-white text-primary hover:bg-white/90")}>
            Plan a trip
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <a href="#plan-trip" className={cn("hidden rounded-full px-4 py-2 text-xs font-bold sm:inline-flex", scrolled ? "bg-primary text-primary-foreground" : "bg-white text-primary")}>
            Plan a trip
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild><Button variant={scrolled ? "outline" : "glass"} size="icon" aria-label="Open navigation menu"><Menu className="h-5 w-5" /></Button></SheetTrigger>
            <SheetContent side="right" className="w-80"><SheetTitle className="font-display text-lg">PravasX</SheetTitle><nav className="mt-6 flex flex-col gap-1">{links.map((link)=><Link key={link.to} to={link.to} onClick={()=>setOpen(false)} className="rounded-xl px-3 py-3 font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground" activeProps={{className:"bg-secondary text-foreground"}} activeOptions={{exact:link.to==="/"}}>{link.label}</Link>)}<a href="#plan-trip" onClick={()=>setOpen(false)} className="mt-4 rounded-xl bg-primary px-4 py-3 text-center text-sm font-bold text-primary-foreground">Plan a trip</a></nav></SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
