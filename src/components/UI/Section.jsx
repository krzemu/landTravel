import React from "react";

export default function Section({ className, children, ...props }) {
  return (
    <section
      id="hero"
      className={`${className} h-[100svh] flex flex-col justify-center items-center`}
      {...props}>
      {children}
    </section>
  );
}
