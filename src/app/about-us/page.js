"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useTranslation } from "../../lib/i18n";
import LanguageSwitcher from "../../components/LanguageSwitcher";

export default function AboutUs() {
  const { t } = useTranslation();
  
  // Use a single ref to store all timeline item refs
  const fadeInRefs = useRef([]);

  const timeline = [
    { year: "2014", event: t.timeline2014 },
    { year: "2015", event: t.timeline2015 },
    { year: "2016", event: t.timeline2016 },
    { year: "2017", event: t.timeline2017 },
    { year: "2018", event: t.timeline2018 },
    { year: "2019", event: t.timeline2019 },
    { year: "2021", event: t.timeline2021 },
    { year: "2022", event: t.timeline2022 },
    { year: "2023", event: t.timeline2023 },
    { year: "Today", event: t.timelineToday },
  ];

  useEffect(() => {
    const handleScroll = () => {
      fadeInRefs.current.forEach(node => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          node.classList.add("opacity-100", "translate-y-0");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center bg-[#f7f8fa]">
      {/* Header/Nav */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 md:px-8">
          <Link href="/" className="text-2xl font-bold text-[#171717] hover:text-[#1a73e8] transition-colors">Better</Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/start" className="bg-[#1a73e8] hover:bg-[#155ab6] text-white font-semibold rounded-full px-6 py-2 text-base shadow transition-colors duration-200">{t.getStarted}</Link>
          </div>
        </div>
      </header>

      {/* Hero/Mission Section */}
      <section className="w-full flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-b from-white to-[#f7f8fa]">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#171717] mb-6 max-w-4xl">
          {t.missionTitle}
        </h1>
      </section>

      {/* The status quo is broken */}
      <section className="w-full max-w-3xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold text-[#1a73e8] mb-4">{t.statusQuoTitle}</h2>
        <p className="text-lg text-[#444] mb-4">
          {t.statusQuoText}
        </p>
      </section>

      {/* How we're changing things */}
      <section className="w-full max-w-3xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold text-[#1a73e8] mb-4">{t.changingThingsTitle}</h2>
        <p className="text-lg text-[#444] mb-4">
          {t.changingThingsText1}
        </p>
        <p className="text-lg text-[#444] mb-4">
          {t.changingThingsText2}
        </p>
      </section>

      {/* (Optional) Backed By Section */}
      <section className="w-full max-w-3xl mx-auto py-8 px-4 flex flex-col items-center">
        <h2 className="text-xl font-bold text-[#171717] mb-4">{t.backedBy}</h2>
        <div className="flex gap-8 flex-wrap justify-center">
          <div className="w-32 h-12 bg-[#e0e7ef] rounded flex items-center justify-center text-[#b0b8c1]">[Logo]</div>
          <div className="w-32 h-12 bg-[#e0e7ef] rounded flex items-center justify-center text-[#b0b8c1]">[Logo]</div>
          <div className="w-32 h-12 bg-[#e0e7ef] rounded flex items-center justify-center text-[#b0b8c1]">[Logo]</div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="w-full max-w-2xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-[#1a73e8] mb-8 text-center">{t.companyTimeline}</h2>
        <ol className="relative border-l-2 border-[#1a73e8]">
          {timeline.map((item, i) => (
            <li
              key={item.year}
              ref={el => fadeInRefs.current[i] = el}
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
        <h3 className="text-2xl font-bold text-center text-[#171717] mb-4">{t.becomePartOfStory}</h3>
        <Link href="/start" className="bg-[#1a73e8] hover:bg-[#155ab6] text-white font-semibold rounded-full px-8 py-4 text-lg shadow transition-colors duration-200">{t.getStarted}</Link>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-[#888] bg-white border-t mt-16">
        {t.copyright}
      </footer>
    </main>
  );
} 