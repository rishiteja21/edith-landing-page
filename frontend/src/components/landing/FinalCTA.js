import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function FinalCTA({ onSubmit, loading, submitted, message }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) onSubmit(email);
  };

  return (
    <section id="final-cta" className="nm-section-light reveal-section" data-reveal data-testid="final-cta-section">
      <div className="nm-container py-20 md:py-24">
        <div className="pb-8">
          <span className="nm-eyebrow inline-block text-black/50">
            Final Protocol
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-10 md:py-16">
          <div className="pr-0 lg:pr-10">
            <h2 className="text-[clamp(2.2rem,5vw,4.4rem)] text-black leading-none">
              Stop
              <br />
              restarting.
              <br />
              <span className="text-black/30">Start</span>
              <br />
              <span className="bg-[#111] text-[#f0efeb] px-3 py-1 inline-block mt-2 rounded-lg">
                finishing.
              </span>
            </h2>
          </div>

          <div className="pl-0 lg:pl-10 pt-4 lg:pt-0 flex flex-col justify-center">
            <p className="text-lg text-black/70 mb-8 max-w-sm font-medium">
              EDITH is launching soon. Get early access and be the first
              to experience real AI accountability.
            </p>

            {submitted ? (
              <div className="bg-[#e4e4de] p-6 border border-black/10" data-testid="final-success">
                <p className="text-black text-sm font-bold uppercase tracking-wide">
                  ✓ You're on the list
                </p>
                <p className="text-xs text-black/50 mt-1">We'll be in touch soon</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md" data-testid="final-waitlist-form">
                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/50 block">
                  Your email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="final-email-input"
                  className="bg-[#e4e4de] border border-black/20 rounded-xl px-5 py-4 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black"
                />
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="final-submit-btn"
                  className="bg-black text-white px-5 py-4 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50 rounded-xl hover:bg-black/80 transition-colors"
                >
                  {loading ? "Joining..." : "Join the Waitlist"}
                  {!loading && <ArrowRight size={15} strokeWidth={2.5} />}
                </button>
                {message && !submitted && (
                  <p className="mt-2 text-xs text-black/60" data-testid="final-message">
                    {message}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}