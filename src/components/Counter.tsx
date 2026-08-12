import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

export function Counter({ value, suffix = "", prefix = "", label, duration = 1800 }: CounterProps) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.4);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        <span className="text-accent-gradient">
          {prefix}
          {display.toLocaleString("en-IN")}
          {suffix}
        </span>
      </p>
      <p className="mt-2 text-sm font-medium text-primary-foreground/70">{label}</p>
    </div>
  );
}