import { useState } from "react";
import { ArrowRight, Activity, Brain, Target, Zap, TrendingUp, Shield } from "lucide-react";

const features = [
  { icon: Brain, label: "AI-Powered", desc: "Smart adaptation" },
  { icon: Target, label: "Zero Excuses", desc: "No missed sessions" },
  { icon: TrendingUp, label: "100% Adaptive", desc: "Plans evolve" },
];

export default function HeroSection({ onSubmit, loading, submitted, message, waitlistCount }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) onSubmit(email);
  };

  return (
    <section
      id="hero"
      className="nm-section-light reveal-section pt-[90px] overflow-hidden"
      data-reveal
      data-testid="hero-section"
    >
      <div className="nm-container py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/50">Introducing</span>
              <div className="h-[1px] flex-1 bg-black/10 max-w-[120px]" />
            </div>

            <h1
              className="text-[clamp(2.6rem,6vw,5rem)] leading-[0.92] text-[#111]"
              data-testid="hero-headline"
            >
              Discipline
              <br />
              as a
              <br />
              <span className="text-[#f0efeb] bg-[#111] px-2 -ml-1 inline-block mt-1">Service.</span>
            </h1>

            <p className="mt-6 text-lg text-[#333] max-w-sm leading-relaxed">
              Most fitness apps give you a plan. EDITH holds you to it. 
              When you skip, it adapts. When you slack, it pushes.
              When you quit, it won't let you.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <a href="#solution" className="nm-primary-btn inline-flex items-center gap-2 px-6 py-3 text-sm font-bold">
                See how it works
                <ArrowRight size={16} />
              </a>
              <span className="text-xs font-bold uppercase tracking-wider text-black/40 self-center">
                {waitlistCount || 200}+ on waitlist
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#e4e4de] border border-black/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-black/50">Join the movement</span>
                <Zap size={14} className="text-black/40" />
              </div>
              
              <div className="space-y-3">
                <div className="p-4 bg-[#d8d8d3] rounded-xl border border-black/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity size={12} className="text-black/40" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-black/40">Live stat</span>
                  </div>
                  <div className="text-2xl font-bold text-black">{waitlistCount || 200}+</div>
                  <div className="text-[10px] text-black/40">People waiting for accountability</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-[#d8d8d3] rounded-xl border border-black/10">
                    <Target size={14} className="text-black/40 mb-2" />
                    <div className="text-lg font-bold text-black">3</div>
                    <div className="text-[9px] text-black/50">Core protocols</div>
                  </div>
                  <div className="p-3 bg-[#d8d8d3] rounded-xl border border-black/10">
                    <Shield size={14} className="text-black/40 mb-2" />
                    <div className="text-lg font-bold text-black">100%</div>
                    <div className="text-[9px] text-black/50">AI-driven</div>
                  </div>
                </div>

                {submitted ? (
                  <div className="bg-[#d8d8d3] rounded-xl p-4 border border-black/10" data-testid="hero-success">
                    <p className="text-black text-sm font-bold">✓ You're on the list</p>
                    <p className="text-xs text-black/50 mt-1">We'll be in touch soon</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} data-testid="hero-waitlist-form">
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        data-testid="hero-email-input"
                        className="w-full bg-[#d8d8d3] border border-black/20 rounded-xl px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        data-testid="hero-submit-btn"
                        className="absolute right-1 top-1 bottom-1 bg-black text-white px-3 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-black/80 transition-colors disabled:opacity-50"
                      >
                        {loading ? "..." : "→"}
                      </button>
                    </div>
                    {message && !submitted && (
                      <p className="mt-2 text-xs text-black/60" data-testid="hero-message">{message}</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
          {features.map((f, i) => (
            <div key={i} className="bg-[#e4e4de] p-4 flex items-center gap-3 border border-black/10">
              <div className="w-10 h-10 rounded-lg bg-[#d8d8d3] flex items-center justify-center flex-shrink-0 border border-black/10">
                <f.icon size={18} className="text-black/55" />
              </div>
              <div>
                <span className="block text-xs font-bold text-black">{f.label}</span>
                <span className="block text-[10px] text-black/40">{f.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}