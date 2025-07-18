"use client";

import Link from "next/link";
import { useState } from "react";

const LOAN_TERMS = [30, 20, 15];
const DEFAULTS = {
  price: 300000,
  down: 60000,
  rate: 6.5,
  years: 30,
  tax: 265,
  zip: "421005",
  insurance: 100,
  hoa: 0,
  utilities: 100,
};

function calcPrincipalInterest({ price, down, rate, years }) {
  const principal = price - down;
  const monthlyRate = rate / 100 / 12;
  const n = years * 12;
  if (monthlyRate === 0) return principal / n;
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
}

export default function MortgageCalculator() {
  const [inputs, setInputs] = useState(DEFAULTS);
  const [downType, setDownType] = useState("amount"); // 'amount' or 'percent'

  // Sync down payment amount/percent
  const downPercent = Math.round((inputs.down / inputs.price) * 100);
  const handleDownChange = (val, type) => {
    if (type === "amount") {
      setInputs(i => ({ ...i, down: +val }));
    } else {
      setInputs(i => ({ ...i, down: Math.round(i.price * (+val / 100)) }));
    }
    setDownType(type);
  };

  const principalInterest = calcPrincipalInterest(inputs);
  const monthlyTax = inputs.tax / 12;
  const monthlyPayment =
    principalInterest + monthlyTax + +inputs.insurance + +inputs.hoa + +inputs.utilities;

  return (
    <main className="min-h-screen flex flex-col items-center bg-[#f7f8fa]">
      {/* Header/Nav */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 md:px-8">
          <Link href="/" className="text-2xl font-bold text-[#171717] hover:text-[#1a73e8] transition-colors">Better</Link>
          <Link href="/start" className="ml-4 bg-[#1a73e8] hover:bg-[#155ab6] text-white font-semibold rounded-full px-6 py-2 text-base shadow transition-colors duration-200">Get started</Link>
        </div>
      </header>

      {/* Hero/Title Section */}
      <section className="w-full flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-b from-white to-[#f7f8fa]">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#171717] mb-4">Mortgage Calculator</h1>
        <p className="text-lg md:text-xl text-center text-[#444] max-w-2xl mb-2">
          Free mortgage calculator to estimate your monthly mortgage payments with annual amortization. Discover how all factors can affect your payment.
        </p>
      </section>

      {/* Calculator Card */}
      <section className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow p-8 mt-8 mb-8">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2 flex gap-2 mb-2">
            {LOAN_TERMS.map(term => (
              <button
                type="button"
                key={term}
                className={`px-4 py-2 rounded-full border font-medium text-sm transition-colors duration-150 ${inputs.years === term ? "bg-[#1a73e8] text-white border-[#1a73e8]" : "bg-white text-[#171717] border-[#e0e7ef] hover:bg-[#f0f4fa]"}`}
                onClick={() => setInputs(i => ({ ...i, years: term }))}
              >
                {term} years
              </button>
            ))}
          </div>
          <div>
            <label className="block mb-1 font-medium text-[#171717]">Home price ($)</label>
            <input type="number" className="w-full border rounded px-3 py-2 text-neutral-800" min={0} value={inputs.price} onChange={e => setInputs(i => ({ ...i, price: +e.target.value }))} />
          </div>
          <div>
            <label className="block mb-1 font-medium text-[#171717]">Down payment</label>
            <div className="flex gap-2">
              <input
                type="number"
                className="w-1/2 border rounded px-3 py-2 text-neutral-800"
                min={0}
                value={downType === "amount" ? inputs.down : downPercent}
                onChange={e => handleDownChange(e.target.value, downType)}
              />
              <select
                className="border rounded px-2 py-2 text-neutral-800"
                value={downType}
                onChange={e => handleDownChange(downType === "amount" ? downPercent : inputs.down, e.target.value)}
              >
                <option value="amount">$</option>
                <option value="percent">%</option>
              </select>
            </div>
            <div className="text-xs text-[#888] mt-1">{downPercent}% down</div>
          </div>
          <div>
            <label className="block mb-1 font-medium text-[#171717]">Interest rate (%)</label>
            <input type="number" step="0.01" className="w-full border rounded px-3 py-2 text-neutral-800" min={0} value={inputs.rate} onChange={e => setInputs(i => ({ ...i, rate: +e.target.value }))} />
          </div>
          <div>
            <label className="block mb-1 font-medium text-[#171717]">ZIP code</label>
            <input type="text" className="w-full border rounded px-3 py-2 text-neutral-800" value={inputs.zip} onChange={e => setInputs(i => ({ ...i, zip: e.target.value }))} />
          </div>
          <div>
            <label className="block mb-1 font-medium text-[#171717]">Property tax (yearly $)</label>
            <input type="number" className="w-full border rounded px-3 py-2 text-neutral-800" min={0} value={inputs.tax} onChange={e => setInputs(i => ({ ...i, tax: +e.target.value }))} />
          </div>
        </form>
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-lg text-[#444] mb-1">Monthly payment</div>
            <div className="text-4xl font-bold text-[#1a73e8]">${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}/mo</div>
          </div>
          <Link href="/start" className="bg-[#1a73e8] hover:bg-[#155ab6] text-white font-semibold rounded-full px-8 py-4 text-lg shadow transition-colors duration-200">Get pre-approved</Link>
        </div>
        {/* Monthly payment breakdown */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-black mb-4">Monthly payment breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between"><span className="text-neutral-700">Principal & interest</span><span className="text-neutral-700">${principalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
            <div className="flex justify-between"><span className="text-neutral-700">Property taxes</span><span className="text-neutral-700">${monthlyTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
            <div className="flex justify-between"><span className="text-neutral-700">Homeowners insurance</span><span className="text-neutral-700">${(+inputs.insurance).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
            <div className="flex justify-between"><span className="text-neutral-700">HOA fees</span><span className="text-neutral-700">${(+inputs.hoa).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
            <div className="flex justify-between"><span className="text-neutral-700">Utilities</span><span className="text-neutral-700">${(+inputs.utilities).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
          </div>
        </div>
      </section>

      {/* FAQ/Info Section */}
      <section className="w-full max-w-3xl mx-auto mt-12 px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6 text-[#171717] text-center">How does a mortgage calculator help me?</h2>
        <p className="mb-4 text-[#444]">A mortgage calculator helps you understand the monthly cost of a home. Ours lets you enter different down payments and interest rates to help determine what is affordable for you.</p>
        <h3 className="text-xl font-bold mb-2 text-[#1a73e8]">How much monthly mortgage payment can I afford?</h3>
        <p className="mb-4 text-[#444]">Lenders determine how much you can afford on a monthly housing payment by calculating your debt-to-income ratio (DTI). The maximum DTI you can have in order to qualify for most mortgage loans is often between 45-50%, with your anticipated housing costs included.</p>
        <h3 className="text-xl font-bold mb-2 text-[#1a73e8]">How to calculate monthly mortgage payments?</h3>
        <p className="mb-4 text-[#444]">Your monthly mortgage payment includes loan principal and interest, property taxes, homeowners insurance, and mortgage insurance (PMI), if applicable. This calculator factors in all these typical monthly costs so you can really crunch the numbers.</p>
        <h3 className="text-xl font-bold mb-2 text-[#1a73e8]">How is Better’s mortgage calculator different?</h3>
        <p className="mb-4 text-[#444]">This mortgage calculator shows your payments with taxes and insurance, PMI, and HOA fees, so you can get a true sense of your monthly costs.</p>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-[#888] bg-white border-t mt-16">
        © 2025 Better Home & Finance Holding Company. NMLS #330511
      </footer>
    </main>
  );
} 