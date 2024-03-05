"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

export function useGsapHomepage(heroRef, boxRefs) {
  return useGSAP(
    (context, contextSafe) => {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "1% top",
          pin: true,
          scrub: 1,
        },
        delay: 1,
        onUpdate: () => heroTl.progress() > 0.98 && heroTl.kill(),
      });
      heroTl.to("#hero h1", { opacity: 0, y: -50, scaleY: 0.5 });
      heroTl.to("#hero__inner #hero__left", { xPercent: -100 }, "-=50%");
      heroTl.to("#hero__inner #hero__right", { xPercent: 100 }, "<");
      heroTl.set("#hero", { visibility: "hidden" });
      heroTl.fromTo(
        "#boxSection__heading",
        { opacity: 0, y: 50, scaleY: 0.5 },
        { opacity: 1, scaleY: 1, y: 0 }
      );
      heroTl.fromTo(
        "#boxSection__inner .box",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.1, ease: "elastic.out(1,0.75)" }
      );
      const openBox = contextSafe((e) => {
        boxRefs.current.forEach((item, index) => {
          const tl = gsap.timeline();
          if (!item.contains(e.target)) {
            tl.to(item, {
              opacity: 0,
              y: window.innerHeight,
              scale: 0.7,
              rotate: 120,
              delay: index * 0.05,
            });
          }
        });
        const headingLineTl = gsap.timeline({});
        headingLineTl.to("#boxSection__heading .boxSection_heading-line", {
          width: "100%",
          delay: 0.3,
        });
        headingLineTl.set("#boxSection__heading .boxSection_heading-line", {
          left: "auto",
          right: 0,
        });
        headingLineTl.set("#boxSection__heading span.heading", { opacity: 0 });
        headingLineTl
          .to("#boxSection__heading .boxSection_heading-line", { width: 0 })
          .then(
            () => (window.location.href = e.target.getAttribute("data-tab"))
          );
      });

      boxRefs.current.forEach((item) => {
        item.addEventListener("click", openBox);
      });
      // END USEGSAP FN
    },
    { scope: heroRef }
  );
}
