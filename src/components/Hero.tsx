"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  return (
    <header className="hero">
      <HeroScene />
      <div className="hero-copy">
        <h1 className="hero-name">
          <span>Archisha</span>
          <span>Sahai</span>
        </h1>
        <p className="hero-line">
          I write poems, design products and build with AI. Now I&rsquo;m doing business development at ZAVO.
        </p>
        <a className="hero-down" href="#about">
          Scroll to meet me
        </a>
      </div>
    </header>
  );
}
