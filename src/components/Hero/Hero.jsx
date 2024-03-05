"use client";
import React, { useRef } from "react";
import Section from "../UI/Section";
import { boxData } from "../utils/data";
import Box from "../UI/Box";

import { useGsapHomepage } from "../utils/useGsapHooks";

export default function Hero() {
  const heroRef = useRef(null);
  const boxRefs = useRef([]);

  useGsapHomepage(heroRef, boxRefs);

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
        <div
          id="boxSection__inner"
          className="flex gap-4 sm:gap-8 flex-wrap justify-center">
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
