"use client";

import Link from "next/link";
import { useEffect, useRef, useMemo } from "react";

const timeline = [
  { year: "2014", event: "After Vishal Garg’s first attempt to purchase his own dream home, he quickly realized that the homebuying process is unnecessarily broken. This inspired him to found a technology-first company led by engineers and data experts with the mission of digitizing and automating home finance to make it cheaper, easier, and faster for all." },
  { year: "2015", event: "Better Mortgage funds its first mortgage loan entirely online (without a single phone call!)." },
  { year: "2016", event: "Better Mortgage becomes a Fannie Mae approved seller + servicer and establishes relationships with top mortgage investors." },
  { year: "2017", event: "Better expands into the real estate market with Better Real Estate." },
  { year: "2018", event: "Better Mortgage partners with Ally Bank to build Ally powered by Better." },
  { year: "2019", event: "Better Mortgage launches its pilot partnership with American Express to deliver a seamless homebuying experience to AMEX customers." },
  { year: "2021", event: "Better acquires Trussle — The UK’s most innovative online mortgage broker." },
  { year: "2022", event: "Better Mortgage becomes the first fintech to fund $100B home loans entirely online." },
  { year: "2023", event: "Better Mortgage launches One Day Mortgage¹: The first offering to customers to go from application to full mortgage Commitment Letter within 24 hours vs. typical industry process of 30+ days. Better Mortgage launches the fully digital 3-day HELOC². Better Mortgage launches One Day Verified Approval Letter." },
  { year: "Today", event: "You become part of the story by joining tens of thousands of happy Better Mortgage borrowers." },
];

function useScrollFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        node.classList.add("opacity-100", "translate-y-0");
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return ref;
}

// Custom hook to generate an array of refs using useScrollFadeIn
function useScrollFadeInArray(length) {
  const refs = [];
  for (let i = 0; i < length; i++) {
    refs.push(useScrollFadeIn());
  }
  return refs;
}

export default function AboutUs() {
  // Use the custom hook to create refs for each timeline item
  const fadeInRefs = useScrollFadeInArray(timeline.length);
  return (
    <main className="min-h-screen flex flex-col items-center bg-[#f7f8fa]">
      {/* Header/Nav */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 md:px-8">
          <Link href="/" className="text-2xl font-bold text-[#171717] hover:text-[#1a73e8] transition-colors">Better</Link>
          <Link href="/start" className="ml-4 bg-[#1a73e8] hover:bg-[#155ab6] text-white font-semibold rounded-full px-6 py-2 text-base shadow transition-colors duration-200">Get started</Link>
        </div>
      </header>

      {/* Hero/Mission Section */}
      <section className="w-full flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-b from-white to-[#f7f8fa]">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#171717] mb-6 max-w-4xl">
          We’re making homeownership simpler, faster — and most importantly, more accessible for all Americans.
        </h1>
      </section>

      {/* The status quo is broken */}
      <section className="w-full max-w-3xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold text-[#1a73e8] mb-4">The status quo is broken</h2>
        <p className="text-lg text-[#444] mb-4">
          The traditional processes around homeownership are opaque and stressful. Fees aren’t transparent and some are simply outrageous in size. Traditional mortgage lending is rife with unnecessary fees and slow, painful processes. It’s a system set up to benefit insiders — not you. Better.com CEO, Vishal Garg, set out to change that.
        </p>
      </section>

      {/* How we’re changing things */}
      <section className="w-full max-w-3xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold text-[#1a73e8] mb-4">How we’re changing things</h2>
        <p className="text-lg text-[#444] mb-4">
          Homeownership is a huge part of our economy. Housing overall is a $33 trillion business, and mortgages account for $15 trillion. Yet home finance operates in the same way it has for decades — through opaque systems and expensive intermediaries whose interests are misaligned with consumers’.
        </p>
        <p className="text-lg text-[#444] mb-4">
          That’s why Better.com is redefining the homeownership process from the ground up. We’re using technology to make it faster and more efficient, and humans to help make it friendly and enjoyable.
        </p>
      </section>

      {/* (Optional) Backed By Section */}
      <section className="w-full max-w-3xl mx-auto py-8 px-4 flex flex-col items-center">
        <h2 className="text-xl font-bold text-[#171717] mb-4">Backed by</h2>
        <div className="flex gap-8 flex-wrap justify-center">
          <div className="w-32 h-12 bg-[#e0e7ef] rounded flex items-center justify-center text-[#b0b8c1]">[Logo]</div>
          <div className="w-32 h-12 bg-[#e0e7ef] rounded flex items-center justify-center text-[#b0b8c1]">[Logo]</div>
          <div className="w-32 h-12 bg-[#e0e7ef] rounded flex items-center justify-center text-[#b0b8c1]">[Logo]</div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="w-full max-w-2xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-[#1a73e8] mb-8 text-center">Company Timeline</h2>
        <ol className="relative border-l-2 border-[#1a73e8]">
          {timeline.map((item, i) => (
            <li
              key={item.year}
              ref={fadeInRefs[i]}
              className="opacity-0 translate-y-8 transition-all duration-700 mb-10 ml-6 bg-white rounded-xl shadow p-6 relative"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-[#1a73e8] rounded-full text-white font-bold">{item.year[0]}</span>
              <div className="font-semibold text-lg text-[#171717]">{item.year}</div>
              <div className="text-[#444]">{item.event}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* Call to Action */}
      <section className="w-full flex flex-col items-center justify-center py-12 px-4">
        <h3 className="text-2xl font-bold text-center text-[#171717] mb-4">You become part of the story by joining tens of thousands of happy Better Mortgage borrowers.</h3>
        <Link href="/start" className="bg-[#1a73e8] hover:bg-[#155ab6] text-white font-semibold rounded-full px-8 py-4 text-lg shadow transition-colors duration-200">Get started</Link>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-[#888] bg-white border-t mt-16">
        © 2025 Better Home & Finance Holding Company. NMLS #330511
      </footer>
    </main>
  );
} 