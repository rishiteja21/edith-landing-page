const problems = [
  {
    number: "01",
    title: "You skip workouts.",
    description: "Monday motivation fades by Wednesday. You tell yourself you'll go tomorrow. Tomorrow never comes.",
  },
  {
    number: "02",
    title: "You lose consistency.",
    description: "You start strong. Two weeks in, one missed session turns into a week off. Then a month. Then zero.",
  },
  {
    number: "03",
    title: "Plans don't adapt.",
    description: "Life happens. Your plan doesn't care. So you restart from scratch. Again. The cycle never breaks.",
  },
];

export default function ProblemSection() {
  const marqueeProblems = [...problems, ...problems, ...problems];

  return (
    <section id="problem" className="nm-section-dark reveal-section" data-reveal data-testid="problem-section">
      <div className="nm-container py-20 md:py-24">
        <div className="mb-12">
          <span className="nm-eyebrow inline-block text-black/50">
            The Problem
          </span>
          <h2 className="mt-6 text-[clamp(2.1rem,5vw,4rem)] text-black leading-none">
            Sound familiar?
          </h2>
          <p className="mt-6 text-base text-black/60 max-w-lg">
            You've been here before. The enthusiasm. The plan. The failure.
            The guilt. The restart.
          </p>
        </div>
      </div>

      <div className="marquee-strip bg-[#111] text-[#f0efeb] py-5">
        <div className="flex w-max animate-marquee gap-8">
          {marqueeProblems.map((p, i) => (
            <div key={`${p.number}-${i}`} className="flex items-center gap-4 bg-transparent w-auto min-w-max px-4" data-testid={`problem-card-${i % problems.length}`}>
              <span className="text-xs font-bold tracking-widest text-white/50">
                {p.number}
              </span>
              <h3 className="text-xl text-white font-medium whitespace-nowrap">
                {p.title}
              </h3>
              <span className="text-white/20">—</span>
            </div>
          ))}
          {marqueeProblems.map((p, i) => (
            <div key={`dup-${p.number}-${i}`} className="flex items-center gap-4 bg-transparent w-auto min-w-max px-4" data-testid={`problem-card-dup-${i % problems.length}`}>
              <span className="text-xs font-bold tracking-widest text-white/50">
                {p.number}
              </span>
              <h3 className="text-xl text-white font-medium whitespace-nowrap">
                {p.title}
              </h3>
              <span className="text-white/20">—</span>
            </div>
          ))}
          {marqueeProblems.map((p, i) => (
            <div key={`dup2-${p.number}-${i}`} className="flex items-center gap-4 bg-transparent w-auto min-w-max px-4" data-testid={`problem-card-dup2-${i % problems.length}`}>
              <span className="text-xs font-bold tracking-widest text-white/50">
                {p.number}
              </span>
              <h3 className="text-xl text-white font-medium whitespace-nowrap">
                {p.title}
              </h3>
              <span className="text-white/20">—</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}