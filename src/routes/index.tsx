import { FormEvent, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, BadgeCheck, CalendarDays, CarFront, Check, CheckCircle2, ChevronRight, Clock3,
  Compass, Heart, Languages, MapPin, MessageCircle, Navigation, Quote, ShieldCheck, Sparkles,
  Star, Users, WalletCards, X,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import mumbaiImg from "@/assets/mumbai.jpg";
import puneImg from "@/assets/pune.jpg";
import sambhajinagarImg from "@/assets/sambhajinagar.jpg";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { saveTripRequest, buildWhatsAppUrl, type TripRequest } from "@/lib/booking";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PravasX — Travel with a Local, Not Just a Booking" },
      { name: "description", content: "PravasX matches travellers with local guides and arranges travel around the way they want to explore." },
    ],
  }),
  component: Home,
});

const destinations = [
  { name: "Mumbai", tag: "City + Coast", image: mumbaiImg, text: "Heritage lanes, local food, sea views and the Mumbai you don't get from a checklist." },
  { name: "Pune", tag: "Culture + Cafés", image: puneImg, text: "Blend old Pune, food, neighbourhoods and nearby escapes with a local who knows the city." },
  { name: "Chhatrapati Sambhajinagar", tag: "Heritage", image: sambhajinagarImg, text: "Build a heritage-first experience around caves, architecture, stories and local context." },
];

const guides = [
  { name: "Aarav Mehta", city: "Mumbai", score: 94, rating: "4.9", trips: 128, languages: "Hindi · English · Marathi", speciality: "Heritage + local food", initials: "AM", tone: "Gateway walks, old neighbourhoods and the stories behind them.", image: mumbaiImg },
  { name: "Riya Kulkarni", city: "Pune", score: 91, rating: "4.8", trips: 96, languages: "English · Hindi · Marathi", speciality: "Culture + cafés", initials: "RK", tone: "A slower, more local Pune built around food, culture and hidden corners.", image: puneImg },
  { name: "Kabir Shaikh", city: "Sambhajinagar", score: 89, rating: "4.9", trips: 84, languages: "Hindi · Marathi · English", speciality: "Heritage + photography", initials: "KS", tone: "Heritage storytelling with the best light, angles and local context.", image: sambhajinagarImg },
];

const interests = ["History", "Nature", "Food", "Culture", "Photography", "Adventure", "Shopping"];
const styles = ["Local & slow", "Classic highlights", "Food-first", "Photo-first"];

function matchGuide(destination: string, selected: string[], language: string) {
  const base = destination === "Mumbai" ? 94 : destination === "Pune" ? 91 : 89;
  return Math.min(98, base + (selected.includes("Food") ? 1 : 0) + (language === "Marathi" ? 1 : 0));
}

function TripPlanner() {
  const [form, setForm] = useState<TripRequest>({
    name: "", phone: "", destination: "Mumbai", pickup: "", date: "", time: "10:00", duration: "8 hours",
    travellers: "2", budget: "₹2,500–₹5,000", travelStyle: "Local & slow", interests: ["Culture"], pace: "Balanced", guideLanguage: "Hindi", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [matchedGuide, setMatchedGuide] = useState(guides[0]);
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const update = <K extends keyof TripRequest>(key: K, value: TripRequest[K]) => setForm((current) => ({ ...current, [key]: value }));
  const toggleInterest = (item: string) => update("interests", form.interests.includes(item) ? form.interests.filter((x) => x !== item) : [...form.interests, item]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const guide = guides.find((g) => g.city === form.destination) ?? guides[0];
    const score = matchGuide(form.destination, form.interests, form.guideLanguage);
    const selectedGuide = { ...guide, score };
    const ref = saveTripRequest(form, score, guide.name);
    setMatchedGuide(selectedGuide);
    setReference(ref);
    setWhatsappUrl(buildWhatsAppUrl(form, ref, guide.name));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section id="plan-trip" className="bg-navy py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-elevated sm:p-10">
              <div className="flex items-center gap-3 text-gold"><CheckCircle2 className="h-6 w-6" /><span className="text-xs font-bold uppercase tracking-[0.18em]">PravasX Match ready</span></div>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-5xl">Meet your local.</h2>
              <p className="mt-3 max-w-xl text-white/65">Based on your destination, interests, language and travel style, here's the local we would start with.</p>
              <div className="mt-8 rounded-3xl bg-white p-5 text-foreground sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy text-lg font-black text-gold">{matchedGuide.initials}</div>
                  <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-display text-xl font-extrabold">{matchedGuide.name}</h3><BadgeCheck className="h-5 w-5 text-accent" /></div><p className="mt-1 text-sm text-muted-foreground">{matchedGuide.city} · {matchedGuide.speciality}</p><div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold"><span className="rounded-full bg-accent/10 px-3 py-1 text-accent">{matchedGuide.score}% match</span><span className="rounded-full bg-secondary px-3 py-1">★ {matchedGuide.rating}</span><span className="rounded-full bg-secondary px-3 py-1">{matchedGuide.trips} trips</span></div></div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">“{matchedGuide.tone}”</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-secondary p-3"><p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Languages</p><p className="mt-1 text-sm font-semibold">{matchedGuide.languages}</p></div><div className="rounded-2xl bg-secondary p-3"><p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Why matched</p><p className="mt-1 text-sm font-semibold">{form.interests.slice(0, 2).join(" + ")} · {form.travelStyle}</p></div></div>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Button variant="brand" size="xl" asChild><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> Confirm on WhatsApp</a></Button><Button variant="goldOutline" size="xl" onClick={() => setSubmitted(false)}>Edit trip</Button></div>
              <p className="mt-4 text-xs text-white/40">Reference {reference} · No payment collected in this demo.</p>
            </div>
            <div className="rounded-[2rem] bg-card p-7 shadow-elevated sm:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Your trip preview</p>
              <h3 className="mt-2 font-display text-2xl font-extrabold">{form.destination} · {form.duration}</h3>
              <div className="mt-6 space-y-4">
                {["Meet your local at your pickup", `${form.interests[0] || "Local"} experience + key highlights`, "Local food / break based on your style", "Flexible final stop + return"].map((item, i) => <div key={item} className="flex gap-3"><div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">{i + 1}</div><div><p className="font-semibold">{item}</p><p className="mt-1 text-xs text-muted-foreground">Planned around your preferences</p></div></div>)}
              </div>
              <div className="mt-7 rounded-2xl border bg-background p-4"><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Estimated trip range</span><span className="font-display font-extrabold">{form.budget}</span></div><p className="mt-2 text-xs text-muted-foreground">Final price depends on vehicle, guide availability and confirmed itinerary.</p></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="plan-trip" className="bg-navy py-20 sm:py-28" aria-labelledby="plan-trip-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">PravasX Match™</p><h2 id="plan-trip-heading" className="mt-3 font-display text-3xl font-extrabold text-white sm:text-5xl">Tell us how you travel. We’ll find your local.</h2><p className="mt-4 text-base leading-relaxed text-white/65">Destination, interests, language and pace become your trip brief — not just a booking form.</p></div>
        <form onSubmit={submit} className="mx-auto mt-10 max-w-5xl rounded-[2rem] bg-card p-6 shadow-elevated sm:p-9">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold">Your name<input required value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-2 w-full rounded-xl border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-accent" placeholder="e.g. Ravindra" /></label>
            <label className="text-sm font-semibold">Phone / WhatsApp<input required pattern="[0-9+() -]{8,}" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-2 w-full rounded-xl border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-accent" placeholder="Your number" /></label>
            <label className="text-sm font-semibold">Destination<select value={form.destination} onChange={(e) => update("destination", e.target.value)} className="mt-2 w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-accent"><option>Mumbai</option><option>Pune</option><option>Chhatrapati Sambhajinagar</option></select></label>
            <label className="text-sm font-semibold">Pickup point<input required value={form.pickup} onChange={(e) => update("pickup", e.target.value)} className="mt-2 w-full rounded-xl border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-accent" placeholder="Station, hotel, area…" /></label>
            <label className="text-sm font-semibold">Date<input required min={minDate} type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className="mt-2 w-full rounded-xl border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-accent" /></label>
            <label className="text-sm font-semibold">Start time<input required type="time" value={form.time} onChange={(e) => update("time", e.target.value)} className="mt-2 w-full rounded-xl border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-accent" /></label>
            <label className="text-sm font-semibold">Trip duration<select value={form.duration} onChange={(e) => update("duration", e.target.value)} className="mt-2 w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-accent"><option>4 hours</option><option>8 hours</option><option>2 days</option><option>3+ days</option></select></label>
            <label className="text-sm font-semibold">Travellers<select value={form.travellers} onChange={(e) => update("travellers", e.target.value)} className="mt-2 w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-accent"><option>1</option><option>2</option><option>3–4</option><option>5–8</option><option>9+</option></select></label>
          </div>
          <div className="mt-7"><p className="text-sm font-bold">What do you want from the trip?</p><div className="mt-3 flex flex-wrap gap-2">{interests.map((item) => <button type="button" key={item} onClick={() => toggleInterest(item)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${form.interests.includes(item) ? "border-accent bg-accent text-white" : "bg-background hover:border-accent/50"}`}>{form.interests.includes(item) && <Check className="mr-1 inline h-3.5 w-3.5" />}{item}</button>)}</div></div>
          <div className="mt-7 grid gap-5 sm:grid-cols-3">
            <label className="text-sm font-semibold">Budget<select value={form.budget} onChange={(e) => update("budget", e.target.value)} className="mt-2 w-full rounded-xl border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-accent"><option>Under ₹2,500</option><option>₹2,500–₹5,000</option><option>₹5,000–₹10,000</option><option>₹10,000+</option></select></label>
            <label className="text-sm font-semibold">Travel style<select value={form.travelStyle} onChange={(e) => update("travelStyle", e.target.value)} className="mt-2 w-full rounded-xl border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-accent">{styles.map((x) => <option key={x}>{x}</option>)}</select></label>
            <label className="text-sm font-semibold">Guide language<select value={form.guideLanguage} onChange={(e) => update("guideLanguage", e.target.value)} className="mt-2 w-full rounded-xl border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-accent"><option>Hindi</option><option>English</option><option>Marathi</option></select></label>
          </div>
          <div className="mt-7"><p className="text-sm font-bold">Preferred pace</p><div className="mt-3 flex flex-wrap gap-2">{["Slow & flexible", "Balanced", "Packed day"].map((item) => <button type="button" key={item} onClick={() => update("pace", item)} className={`rounded-full border px-4 py-2 text-sm font-semibold ${form.pace === item ? "border-navy bg-navy text-white" : "bg-background"}`}>{item}</button>)}</div></div>
          <label className="mt-7 block text-sm font-semibold">Anything your local should know?<textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={3} className="mt-2 w-full resize-none rounded-xl border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-accent" placeholder="Food preferences, must-see places, accessibility needs, special occasion…" /></label>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row"><div className="flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-accent" /> No payment · human confirmation after matching</div><Button type="submit" variant="brand" size="xl">Find my local <ArrowRight className="h-4 w-4" /></Button></div>
        </form>
      </div>
    </section>
  );
}

function Home() {
  const [guideFilter, setGuideFilter] = useState("All");
  const filteredGuides = guides.filter((g) => guideFilter === "All" || g.city === guideFilter);
  return (
    <main>
      <section className="relative isolate min-h-[760px] overflow-hidden bg-navy">
        <img src={heroImg} alt="Travel destination" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy/75 to-orange/25" />
        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur"><Sparkles className="h-4 w-4 text-gold" /> Travel + local guide</div>
            <h1 className="mt-7 max-w-4xl font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-7xl">Don't just visit.<br /><span className="text-accent-gradient">Travel with a local.</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">PravasX combines your travel, a matched local guide and a flexible itinerary into one guided experience — built around how you actually want to explore.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#plan-trip" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-navy shadow-elevated transition hover:-translate-y-0.5">Build my trip <ArrowRight className="h-4 w-4" /></a><a href="#guides" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur hover:bg-white/10">Meet local guides</a></div>
            <div className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3"><div className="border-l border-white/20 pl-4"><p className="text-2xl font-extrabold text-white">1</p><p className="text-xs text-white/55">trip brief</p></div><div className="border-l border-white/20 pl-4"><p className="text-2xl font-extrabold text-white">1</p><p className="text-xs text-white/55">matched local</p></div><div className="border-l border-white/20 pl-4"><p className="text-2xl font-extrabold text-white">∞</p><p className="text-xs text-white/55">ways to explore</p></div></div>
          </div>
        </div>
      </section>

      <section className="border-b bg-background py-5"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground sm:px-6 lg:px-8"><span className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-accent" /> Local-first</span><span className="flex items-center gap-2"><Heart className="h-4 w-4 text-accent" /> Built around you</span><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> Human-confirmed</span><span className="flex items-center gap-2"><Navigation className="h-4 w-4 text-accent" /> Travel + guide</span></div></section>

      <section id="how-it-works" className="py-20 sm:py-28"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">How it works</p><h2 className="mt-3 font-display text-3xl font-extrabold sm:text-5xl">A better trip starts with the right local.</h2></div><div className="mt-12 grid gap-5 md:grid-cols-4">{[{icon:Compass,title:"Describe your trip",text:"Tell us destination, interests, budget, language and pace."},{icon:Sparkles,title:"Get matched",text:"PravasX turns your preferences into a guide match."},{icon:CarFront,title:"Shape the route",text:"Travel, pickup and a flexible itinerary come together."},{icon:Heart,title:"Explore like a local",text:"Your guide brings the context, stories and local know-how."}].map(({icon:Icon,title,text},i)=><Reveal key={title} delay={i*80}><article className="relative h-full rounded-3xl border bg-card p-6 shadow-sm"><span className="text-xs font-black text-accent">0{i+1}</span><Icon className="mt-6 h-6 w-6 text-navy" /><h3 className="mt-5 font-display text-lg font-extrabold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></article></Reveal>)}</div></div></section>

      <section id="guides" className="bg-sand py-20 sm:py-28"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Meet your local</p><h2 className="mt-3 font-display text-3xl font-extrabold sm:text-5xl">People, not package cards.</h2><p className="mt-4 max-w-2xl text-muted-foreground">Every match starts with a person who knows the destination. Pick by city, interests, language and the kind of day you want.</p></div><div className="flex flex-wrap gap-2">{["All","Mumbai","Pune","Sambhajinagar"].map((x)=><button key={x} onClick={()=>setGuideFilter(x === "Sambhajinagar" ? "Chhatrapati Sambhajinagar" : x)} className={`rounded-full border px-4 py-2 text-xs font-bold ${guideFilter === (x === "Sambhajinagar" ? "Chhatrapati Sambhajinagar" : x) ? "bg-navy text-white" : "bg-white"}`}>{x}</button>)}</div></div><div className="mt-10 grid gap-6 md:grid-cols-3">{filteredGuides.map((guide)=><article key={guide.name} className="overflow-hidden rounded-[2rem] border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-elevated"><div className="relative h-44 overflow-hidden"><img src={guide.image} alt={guide.city} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" /><div className="absolute bottom-4 left-4 flex items-center gap-3 text-white"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-sm font-black text-navy">{guide.initials}</div><div><p className="font-display font-extrabold">{guide.name}</p><p className="text-xs text-white/70">{guide.city}</p></div></div><span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold text-navy">{guide.score}% match</span></div><div className="p-6"><div className="flex items-center justify-between"><span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">{guide.speciality}</span><span className="text-xs font-bold">★ {guide.rating}</span></div><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{guide.tone}</p><div className="mt-5 grid grid-cols-2 gap-2 text-xs"><span className="rounded-xl bg-secondary p-3"><Languages className="mb-1 h-4 w-4 text-accent" />{guide.languages}</span><span className="rounded-xl bg-secondary p-3"><Users className="mb-1 h-4 w-4 text-accent" />{guide.trips} trips</span></div><button onClick={()=>document.getElementById("plan-trip")?.scrollIntoView({behavior:"smooth"})} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-bold text-white hover:bg-navy-deep">Match me with this local <ArrowRight className="h-4 w-4" /></button></div></article>)}</div></div></section>

      <section className="py-20 sm:py-28"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Local knowledge layer</p><h2 className="mt-3 font-display text-3xl font-extrabold sm:text-5xl">The things a search result can't tell you.</h2><p className="mt-5 text-muted-foreground">PravasX is designed around the local context that makes a trip memorable: what to skip, where locals actually eat, which stories matter and how to move through a place at the right pace.</p><a href="#plan-trip" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-accent">Build a local-first trip <ArrowRight className="h-4 w-4" /></a></div><div className="grid gap-4 sm:grid-cols-2">{[{icon:MapPin,title:"Neighbourhoods",text:"Go beyond the landmark and understand the area around it."},{icon:Quote,title:"Local stories",text:"Turn places into experiences with context from someone who knows them."},{icon:WalletCards,title:"Honest planning",text:"See a clear budget range before the final human confirmation."},{icon:Heart,title:"Your pace",text:"Slow, balanced or packed — your guide adapts the day."}].map(({icon:Icon,title,text})=><div key={title} className="rounded-3xl border bg-card p-6"><Icon className="h-6 w-6 text-accent" /><h3 className="mt-5 font-display font-extrabold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}</div></div></section>

      <section className="bg-navy py-16"><div className="mx-auto max-w-5xl px-4 text-center sm:px-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Why PravasX</p><h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">One trip. One local. One clear plan.</h2><div className="mt-10 grid gap-4 text-left md:grid-cols-3">{[{icon:CarFront,title:"Travel included",text:"Request the travel side and guide side together instead of coordinating them separately."},{icon:BadgeCheck,title:"Match-first",text:"Your interests, language and pace influence who we recommend."},{icon:ShieldCheck,title:"Human-confirmed",text:"The MVP keeps the final availability and price confirmation with the PravasX team."}].map(({icon:Icon,title,text})=><div key={title} className="rounded-3xl border border-white/10 bg-white/[0.05] p-6"><Icon className="h-6 w-6 text-gold" /><h3 className="mt-5 font-display font-extrabold text-white">{title}</h3><p className="mt-2 text-sm leading-relaxed text-white/60">{text}</p></div>)}</div></div></section>

      <section id="destinations" className="py-20 sm:py-28"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex items-end justify-between gap-6"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Explore</p><h2 className="mt-3 font-display text-3xl font-extrabold sm:text-5xl">Start somewhere worth remembering.</h2></div><Link to="/about" className="hidden items-center gap-1 text-sm font-bold text-accent sm:flex">About PravasX <ChevronRight className="h-4 w-4" /></Link></div><div className="mt-10 grid gap-6 md:grid-cols-3">{destinations.map((d)=><article key={d.name} className="group overflow-hidden rounded-[2rem] border bg-card"><div className="h-60 overflow-hidden"><img src={d.image} alt={d.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-6"><span className="text-xs font-bold uppercase tracking-wider text-accent">{d.tag}</span><h3 className="mt-2 font-display text-2xl font-extrabold">{d.name}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.text}</p></div></article>)}</div></div></section>

      <TripPlanner />

      <section id="faq" className="py-20 sm:py-28"><div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"><div className="text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">FAQ</p><h2 className="mt-3 font-display text-3xl font-extrabold sm:text-5xl">Good questions before a good trip.</h2></div><Accordion type="single" collapsible className="mt-10">{[{q:"Does PravasX provide both travel and a guide?",a:"Yes. PravasX is built around combining the travel side with a local guide. The exact vehicle and guide arrangement is confirmed after your trip brief."},{q:"How does PravasX Match work?",a:"Your destination, interests, language, budget, travel style and pace influence the recommended local. The MVP uses transparent rule-based matching; a production version can evolve into a richer recommendation engine."},{q:"Are the guides actually available on my date?",a:"Availability is human-confirmed in this MVP. The next production step would connect guide calendars so availability can be shown live."},{q:"Is the price final?",a:"No. The trip builder shows a budget range. Final pricing depends on the confirmed vehicle, guide, duration and itinerary."},{q:"Can I change the itinerary?",a:"Yes. The trip is intentionally flexible. Add must-see places or preferences to your brief and confirm the final route with your local."}].map((item,i)=><AccordionItem key={item.q} value={`item-${i}`}><AccordionTrigger>{item.q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{item.a}</AccordionContent></AccordionItem>)}</Accordion></div></section>
    </main>
  );
}
