"use client";

import { useEffect } from "react";

/** Lightweight scroll experience: reveals, reading progress, and anchor polish. */
export default function ScrollEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const progress = document.querySelector<HTMLElement>(".scroll-progress");
    const updateProgress = () => {
      if (!progress) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progress.style.transform = `scaleX(${amount / 100})`;
    };

    if (!reduceMotion && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      document.querySelectorAll("[data-reveal], [data-reveal-section]").forEach((el) => observer.observe(el));
      document.querySelectorAll(".section-pad > .container > *, .countdown-wrap > *, .manifesto-inner > *").forEach((el) => {
        if (!el.hasAttribute("data-reveal")) el.setAttribute("data-reveal", "up");
        observer.observe(el);
      });
      return () => observer.disconnect();
    }

    document.querySelectorAll("[data-reveal], [data-reveal-section]").forEach((el) => el.classList.add("is-visible"));
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    const progress = document.querySelector<HTMLElement>(".scroll-progress");
    const update = () => {
      if (!progress) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
