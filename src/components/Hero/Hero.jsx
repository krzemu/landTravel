"use client";
import React, { useRef } from "react";
import Section from "../UI/Section";
import { boxData } from "../utils/data";
import Box from "./Box";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const boxRefs = useRef([]);

  useGSAP(
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

  return (
    <div id="hero-pin-container" ref={heroRef}>
      <Section className="bg-slate-950 z-10 relative" id="hero">
        <h1 className="text-3xl relative z-10">Start Journey</h1>
        <div
          id="hero__inner"
          className="hero__inner absolute inset-0 m-auto h-[inherit] flex ">
          <div id="hero__left" className="w-1/2 h-[inherit] bg-black"></div>
          <div id="hero__right" className="w-1/2 h-[inherit] bg-black"></div>
        </div>
      </Section>

      <Section id="boxSection" className="bg-slate-950 absolute inset-0 m-auto">
        <h2 id="boxSection__heading" className="text-3xl mb-16 w-max relative">
          <span className="heading">Welcome to our world</span>{" "}
          <span
            className="boxSection_heading-line absolute inset-y-0 m-auto bg-slate-50 h-full"
            style={{ left: 0, right: "auto" }}></span>
        </h2>
        <div id="boxSection__inner" className="flex gap-4 sm:gap-8">
          {boxData.map((item) => (
            <Box
              key={item.url}
              name={item.name}
              urlTag={item.url}
              ref={(item) => boxRefs.current.push(item)}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
