const testimonials = [
  {
    quote: "I've never stuck with a plan this long. EDITH doesn't let you quit.",
    duration: "12 weeks active",
  },
  {
    quote: "The accountability messages hit different. It's like having a drill sergeant in your pocket.",
    duration: "8 weeks active",
  },
  {
    quote: "Finally an app that adapts when I miss a day instead of making me restart from zero.",
    duration: "16 weeks active",
  },
];

export default function SocialProof({ count }) {
  return (
    <section className="nm-section-light reveal-section" data-reveal data-testid="social-proof-section">
      <div className="nm-container py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-8">
          <div className="lg:col-span-4">
            <span className="nm-eyebrow inline-block text-black/50">
              Social Proof
            </span>
            <span className="block text-[clamp(4rem,14vw,11rem)] text-black leading-none mt-4" data-testid="waitlist-count">
              {count}+
            </span>
            <span className="block text-xs font-bold text-black/60 mt-4 uppercase tracking-[0.22em]">
              On the waitlist
            </span>
          </div>
          <div className="lg:col-span-8 h-[1px] bg-black/10 mb-3 hidden lg:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-2 gap-3 md:gap-4">
          <div className="md:col-span-2 md:row-span-2 bg-[#e4e4de] border border-black/10 p-6 flex flex-col justify-between" data-testid={`testimonial-0`}>
            <p className="text-base text-black font-medium leading-relaxed">
              "{testimonials[0].quote}"
            </p>
            <span className="text-[10px] font-bold text-black/70 uppercase tracking-widest bg-[#d8d8d3] border border-black/10 px-2 py-1 rounded w-fit mt-4">
              {testimonials[0].duration} — Beta Tester
            </span>
          </div>
          <div className="md:col-span-2 md:row-span-1 bg-[#e8e8e3] border border-black/10 p-5" data-testid={`testimonial-1`}>
            <p className="text-sm text-black/80 font-medium leading-relaxed">
              "{testimonials[1].quote}"
            </p>
            <span className="text-[10px] font-bold text-black/70 uppercase tracking-widest bg-[#d8d8d3] border border-black/10 px-2 py-1 rounded w-fit mt-3 block">
              {testimonials[1].duration} — Beta Tester
            </span>
          </div>
          <div className="md:col-span-2 md:row-span-1 bg-[#e4e4de] border border-black/10 p-5" data-testid={`testimonial-2`}>
            <p className="text-sm text-black/80 font-medium leading-relaxed">
              "{testimonials[2].quote}"
            </p>
            <span className="text-[10px] font-bold text-black/70 uppercase tracking-widest bg-[#d8d8d3] border border-black/10 px-2 py-1 rounded w-fit mt-3 block">
              {testimonials[2].duration} — Beta Tester
            </span>
          </div>
          <div className="md:col-span-4 md:row-span-1 bg-[#111] border border-black/20 p-6 flex items-center justify-between cursor-pointer hover:bg-[#1a1a1a] transition-colors" data-testid={`testimonial-cta`}>
            <div>
              <p className="text-lg text-[#f0efeb] font-bold">Join them on the waitlist</p>
              <p className="text-xs text-[#f0efeb]/50 mt-1">Be the next success story</p>
            </div>
            <span className="text-4xl text-[#f0efeb] font-bold">→</span>
          </div>
        </div>
      </div>
    </section>
  );
}