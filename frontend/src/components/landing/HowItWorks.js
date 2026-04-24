const steps = [
  {
    number: "01",
    title: "Follow your plan.",
    description: "EDITH creates a workout plan tailored to your schedule and goals. You just show up and execute.",
  },
  {
    number: "02",
    title: "Miss a session.",
    description: "Life happens. You skip a workout. Most apps ignore it. EDITH doesn't.",
  },
  {
    number: "03",
    title: "EDITH adapts and acts.",
    description: "Your plan adjusts automatically. You get a clear next action. No guilt — just execution protocol.",
  },
];

export default function HowItWorks() {
  const marqueeSteps = [...steps, ...steps, ...steps];

  return (
    <section id="how-it-works" className="nm-section-dark reveal-section" data-reveal data-testid="how-it-works-section">
      <div className="nm-container py-20 md:py-24">
        <div className="mb-12">
          <span className="nm-eyebrow text-black/50">
            The Process
          </span>
          <h2 className="mt-6 text-[clamp(2.4rem,5.5vw,4.4rem)] text-black leading-none">
            Three steps.
            <br />
            <span className="text-black/40">Zero excuses.</span>
          </h2>
        </div>
      </div>

      <div className="marquee-strip bg-[#111] text-[#f0efeb] py-5">
        <div className="flex w-max animate-marquee gap-8">
          {marqueeSteps.map((step, i) => (
            <div key={`${step.number}-${i}`} className="flex items-center gap-4 bg-transparent w-auto min-w-max px-4" data-testid={`step-${i % steps.length}`}>
              <span className="text-xs font-bold tracking-widest text-white/50">
                {step.number}
              </span>
              <h3 className="text-xl text-white font-medium whitespace-nowrap">
                {step.title}
              </h3>
              <span className="text-white/20">—</span>
            </div>
          ))}
          {marqueeSteps.map((step, i) => (
            <div key={`dup-${step.number}-${i}`} className="flex items-center gap-4 bg-transparent w-auto min-w-max px-4" data-testid={`step-dup-${i % steps.length}`}>
              <span className="text-xs font-bold tracking-widest text-white/50">
                {step.number}
              </span>
              <h3 className="text-xl text-white font-medium whitespace-nowrap">
                {step.title}
              </h3>
              <span className="text-white/20">—</span>
            </div>
          ))}
          {marqueeSteps.map((step, i) => (
            <div key={`dup2-${step.number}-${i}`} className="flex items-center gap-4 bg-transparent w-auto min-w-max px-4" data-testid={`step-dup2-${i % steps.length}`}>
              <span className="text-xs font-bold tracking-widest text-white/50">
                {step.number}
              </span>
              <h3 className="text-xl text-white font-medium whitespace-nowrap">
                {step.title}
              </h3>
              <span className="text-white/20">—</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}