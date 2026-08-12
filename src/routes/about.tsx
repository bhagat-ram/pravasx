import { createFileRoute, Link } from "@tanstack/react-router";
import { CarFront, CheckCircle2, Compass, Heart, MapPin, MessageCircle, Sparkles, Users } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About PravasX — Travel + Guide" },
      {
        name: "description",
        content: "PravasX brings travel and local guidance together, with pickup, guide-driver support and personalised itineraries.",
      },
    ],
  }),
  component: About,
});

const principles = [
  { icon: Compass, title: "Start with the traveller", text: "The trip begins with where you want to go, how long you have and what you want to experience." },
  { icon: CarFront, title: "Travel + guide together", text: "The service is designed so the ride and local guidance can be arranged as one experience." },
  { icon: Heart, title: "Keep it personal", text: "Pickup, pace and itinerary can be discussed around the actual group instead of forcing everyone into the same route." },
];

const experience = [
  "Choose your destination and time limit",
  "Share your pickup point and trip preferences",
  "Get a guide who can pick you up and drive you, where available",
  "Agree the itinerary before the trip",
];

function About() {
  return (
    <>
      <section className="relative isolate flex min-h-[62vh] items-center overflow-hidden">
        <img src={heroImg} alt="Road journey through Maharashtra" width={1920} height={1088} className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-hero-gradient" aria-hidden="true" />
        <div className="mx-auto w-full max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">About PravasX</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-6xl">Travel is easier when the journey and the local experience speak to each other.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">PravasX is being shaped around a simple idea: arrange travel and a local guide together, then build the day around the traveller.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="what-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <Reveal><p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">What PravasX does</p><h2 id="what-heading" className="mt-3 text-3xl font-extrabold sm:text-4xl">One request instead of several moving parts.</h2></Reveal>
            <Reveal delay={100}><p className="text-base leading-relaxed text-muted-foreground">A traveller can choose a place, choose a time limit and tell PravasX where they want to be picked up. The experience can then combine transport, a local guide, guide-as-driver support and an itinerary built around the request.</p><p className="mt-5 text-base leading-relaxed text-muted-foreground">The website is currently an MVP: it captures the trip brief and sends it to the PravasX team for confirmation. Pricing, availability and final routing are intentionally left for the team to confirm rather than pretending they are already automated.</p></Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">{principles.map(({icon:Icon,title,text},i)=><Reveal key={title} delay={i*100}><article className="h-full rounded-3xl border border-border bg-card p-7 shadow-sm"><span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gradient text-accent-foreground"><Icon className="h-5 w-5" /></span><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></article></Reveal>)}</div>
        </div>
      </section>

      <section className="bg-secondary/60 py-20 sm:py-28" aria-labelledby="experience-heading">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal><p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">The experience</p><h2 id="experience-heading" className="mt-3 text-3xl font-extrabold sm:text-4xl">A practical flow from idea to itinerary.</h2><p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">The MVP keeps the first version intentionally simple. A customer submits a clear trip brief; the team confirms the details and takes the conversation forward.</p></Reveal>
          <Reveal delay={100}><ol className="space-y-4">{experience.map((item,i)=><li key={item} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i+1}</span><div><p className="font-semibold">{item}</p><p className="mt-1 text-sm text-muted-foreground">{i===0?"Destination and duration set the shape of the trip.":i===1?"The pickup point helps the team understand the starting point.":i===2?"Guide-driver availability depends on the requested trip.":"The final plan is confirmed with the traveller."}</p></div></li>)}</ol></Reveal>
        </div>
      </section>

      <section className="bg-navy py-20 sm:py-28" aria-labelledby="mvp-heading">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8"><Reveal><span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold"><Sparkles className="h-5 w-5" /></span><h2 id="mvp-heading" className="mt-5 font-display text-3xl font-extrabold text-white sm:text-4xl">Built to prove the idea, not hide the gaps.</h2><p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65">The current product focuses on the part that matters first: getting a real trip request from a real traveller to the team with enough detail to act on it.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button variant="brand" size="xl" asChild><Link to="/">Plan a trip</Link></Button><Button variant="goldOutline" size="xl" asChild><a href="https://wa.me/919970348409" target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> Talk to PravasX</a></Button></div></Reveal></div>
      </section>
    </>
  );
}
