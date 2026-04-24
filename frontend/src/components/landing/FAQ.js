import { useState } from "react";

const faqs = [
  {
    question: "How does EDITH adapt to my schedule changes?",
    answer: "EDITH monitors your training logs, sleep data, and recovery metrics in real-time. When you miss a session or need to reschedule, it automatically recalculates your weekly volume and adjusts future workouts to maintain progressive overload without overtraining."
  },
  {
    question: "What happens if I skip a day?",
    answer: "Instead of resetting your progress or guilt-tripping you, EDITH analyzes why you missed the session. It factors in your recovery status, upcoming session demands, and adjusts the protocol accordingly. Skipping one planned day won't derail your program."
  },
  {
    question: "Is EDITH only for bodybuilders?",
    answer: "No. EDITH adapts to any fitness goal—weight loss, muscle gain, athletic performance, or general health. The AI adjusts its communication style and programming based on your specific objectives and experience level."
  },
  {
    question: "How does the accountability work?",
    answer: "EDITH sends push notifications with direct, no-nonsense messages. It tracks your consistency score and holds you to your commitments. If you fall off, it doesn't coddle you—it refocuses you on the next action step."
  },
  {
    question: "When does EDITH launch?",
    answer: "We're in closed beta with select testers. Join the waitlist now to secure early access. Early members get priority onboarding, reduced pricing, and direct input on feature development."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="nm-section-light reveal-section" data-reveal>
      <div className="nm-container py-20 md:py-24">
        <div className="mb-12">
          <span className="nm-eyebrow inline-block text-black/50">FAQ'S</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] text-black leading-none mt-4">
            Questions Answered.
          </h2>
        </div>

        <div className="max-w-2xl text-left">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border-b ${i === 0 ? "border-t" : ""} border-black/15`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full py-5 flex items-center justify-between text-left hover:bg-black/[0.02] transition-colors"
              >
                <span className="text-base font-bold text-[#1a1a1a] pr-8">{faq.question}</span>
                <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center border border-black/30 rounded text-sm font-bold transition-all duration-200 ${openIndex === i ? "bg-black text-white rotate-45" : "bg-transparent text-black"}`}>
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-48 pb-5" : "max-h-0"}`}
              >
                <p className="text-sm text-black/60 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}