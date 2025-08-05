"use client";

import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "../lib/i18n";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function Home() {
  const { t } = useTranslation();

  const navSections = [
    { label: t.home, desc: t.homeDesc, href: "/" },
    { label: t.aboutUs, desc: t.aboutUsDesc, href: "/about-us" },
    { label: t.mortgageCalculator, desc: t.mortgageCalculatorDesc, href: "/mortgage-calculator" },
    { label: t.start, desc: t.startDesc, href: "/start" },
  ];

  const features = [
    {
      title: t.oneDayMortgage,
      desc: t.oneDayMortgageDesc,
      icon: "🏠",
    },
    {
      title: t.betterHeloc,
      desc: t.betterHelocDesc,
      icon: "💵",
    },
    {
      title: t.insurance,
      desc: t.insuranceDesc,
      icon: "🛡️",
    },
  ];

  const faqs = [
    {
      q: t.aiMortgageQuestion,
      a: t.aiMortgageAnswer,
    },
    {
      q: t.oneDayQuestion,
      a: t.oneDayAnswer,
    },
    {
      q: t.getStartedQuestion,
      a: t.getStartedAnswer,
    },
  ];

  useEffect(() => {
    const cards = document.querySelectorAll(".fade-in-card");
    const onScroll = () => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          card.classList.add("opacity-100", "translate-y-0");
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center bg-[#f7f8fa]">
      {/* Header/Nav */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 md:px-8">
          <div className="text-2xl font-bold text-[#171717]">Better</div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/start" className="bg-[#1a73e8] hover:bg-[#155ab6] text-white font-semibold rounded-full px-6 py-2 text-base shadow transition-colors duration-200">{t.getStarted}</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-b from-white to-[#f7f8fa]">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-[#171717] mb-6 leading-tight max-w-3xl">
          {t.heroTitle}
        </h1>
        <p className="text-lg md:text-2xl text-center text-[#444] mb-6 max-w-2xl">
          {t.heroSubtitle}
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <Link
            href="/start"
            className="bg-[#1a73e8] hover:bg-[#155ab6] text-white font-semibold rounded-full px-8 py-4 text-lg shadow transition-colors duration-200"
          >
            {t.getStarted}
          </Link>
          <span className="bg-[#e8f0fe] text-[#1a73e8] rounded-full px-4 py-2 text-base font-medium ml-0 md:ml-4">{t.noHardCreditCheck}</span>
        </div>
        <div className="w-full max-w-xl flex flex-col items-center mt-8">
          <Image src="/hero.png" alt="Better logo and arrow" width={320} height={320} className="rounded-xl shadow-lg" priority />
        </div>
      </section>

      {/* Navigation Sections */}
      <section className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 px-4">
        {navSections.map((section, i) => (
          <Link
            key={section.label}
            href={section.href}
            className="fade-in-card opacity-0 translate-y-8 transition-all duration-700 bg-white rounded-xl shadow p-8 flex flex-col items-start hover:bg-[#f0f4fa] focus:bg-[#e8f0fe] outline-none"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="text-2xl font-bold text-[#171717] mb-2">{section.label}</div>
            <div className="text-[#444]">{section.desc}</div>
          </Link>
        ))}
      </section>

      {/* Feature Cards */}
      <section className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-4">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className="fade-in-card opacity-0 translate-y-8 transition-all duration-700 bg-white rounded-xl shadow p-8 flex flex-col items-center text-center"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h2 className="text-xl font-bold mb-2 text-[#171717]">{feature.title}</h2>
            <p className="mb-4 text-[#444]">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Trust/Stats Section */}
      <section className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 mt-16 px-4">
        <div className="flex items-center gap-4">
          <span className="text-3xl">⭐</span>
          <div>
            <div className="text-2xl font-bold text-[#171717]">{t.excellentRating} <span className="text-[#1a73e8]">4.4</span> {t.outOfFive}</div>
            <div className="text-[#444] text-sm">{t.basedOnReviews}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#e0e7ef]" />
          <div className="w-12 h-12 rounded-full bg-[#e0e7ef]" />
          <div className="w-12 h-12 rounded-full bg-[#e0e7ef]" />
          <div className="ml-4 text-lg text-[#171717] font-semibold">{t.overBillionFunded}</div>
        </div>
      </section>

      {/* FAQ/Contact Section */}
      <section className="w-full max-w-3xl mx-auto mt-20 px-4">
        <h2 className="text-2xl font-bold mb-6 text-[#171717] text-center">Got questions? We’ve got answers</h2>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-white rounded-xl shadow p-6">
              <div className="font-semibold text-[#1a73e8] mb-2">{faq.q}</div>
              <div className="text-[#171717]">{faq.a}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 text-[#444]">
          <div>{t.callUs} <a href="tel:4155238837" className="text-[#1a73e8] underline">(415) 523-8837</a></div>
          <div>{t.email} <a href="mailto:hello@better.com" className="text-[#1a73e8] underline">hello@better.com</a></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-[#888] bg-white border-t mt-16">
        {t.copyright}
      </footer>
    </main>
  );
}
