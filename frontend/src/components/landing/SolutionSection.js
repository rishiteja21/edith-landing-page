import React, { useState, useEffect } from "react";
import { Activity, RefreshCw, Play, ArrowRight, Zap } from "lucide-react";

const solutions = [
  {
    label: "Detect",
    title: "Detects missed workouts.",
    description: "EDITH knows when you skip. No hiding. No lying to yourself. The data doesn't lie.",
  },
  {
    label: "Adapt",
    title: "Adjusts your plan instantly.",
    description: "Your schedule changes. EDITH adapts. No restart required. The plan evolves with you.",
  },
  {
    label: "Execute",
    title: "Tells you what to do next.",
    description: "Clear, direct next action. Not suggestions — instructions. You just need to show up.",
  },
];

function AdaptiveFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { id: "detect", label: "Detect", desc: "Data Analysis", icon: Activity },
    { id: "adapt", label: "Adapt", desc: "Recalculation", icon: RefreshCw },
    { id: "execute", label: "Execute", desc: "Protocol Ready", icon: Zap }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center relative px-2">
      <div className="flex items-center justify-between w-full">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeStep;
          const isPast = index < activeStep;
          
          return (
            <React.Fragment key={step.id}>
              {/* Block */}
              <div 
                className={`relative flex flex-col items-center justify-center w-[76px] h-[76px] rounded-xl border transition-all duration-500 ease-smooth z-10 ${
                  isActive 
                    ? "bg-black text-white border-black scale-105 shadow-xl shadow-black/20" 
                    : isPast 
                      ? "bg-white text-black border-black/10 shadow-sm" 
                      : "bg-black/5 text-black/40 border-transparent"
                }`}
              >
                {/* Icon */}
                <Icon 
                  strokeWidth={isActive ? 2 : 1.5}
                  size={20} 
                  className={`mb-2 transition-transform duration-500 ${
                    isActive && index === 1 ? 'animate-[spin_4s_linear_infinite]' : isActive ? 'scale-110' : ''
                  }`} 
                />
                
                {/* Label */}
                <span className={`text-[10px] font-bold tracking-widest uppercase ${isActive ? 'text-white' : ''}`}>
                  {step.label}
                </span>

                {/* Active Indicator Dot */}
                {isActive && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                  </span>
                )}
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 h-[2px] bg-black/5 relative overflow-hidden flex items-center rounded-full z-0">
                  <div 
                    className={`absolute left-0 h-full bg-black transition-all ease-out ${
                      activeStep > index ? 'w-full duration-700' : 'w-0 duration-0'
                    }`}
                  />
                  {activeStep === index && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-black rounded-full animate-ping" />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {/* Dynamic Text Below */}
      <div className="mt-5 text-center h-[14px] overflow-hidden relative">
        <div 
          className="transition-transform duration-500 ease-smooth flex flex-col"
          style={{ transform: `translateY(-${activeStep * 14}px)` }}
        >
          {steps.map(step => (
            <span key={step.id} className="h-[14px] text-[10px] font-semibold text-black/50 uppercase tracking-[0.2em] block leading-none flex items-center justify-center">
              {step.desc}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatsTicker() {
  const stats = [
    { label: "Workouts", value: "247", change: "+12%" },
    { label: "Streak", value: "34d", change: "Active" },
    { label: "Missed", value: "3", change: "-50%" },
  ];

  return (
    <div className="space-y-2">
      {stats.map((s, i) => (
        <div key={i} className="flex items-center justify-between text-xs">
          <span className="text-black/50">{s.label}</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-black">{s.value}</span>
            <span className="text-[8px] bg-black text-white px-1.5 py-0.5 rounded font-medium">{s.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SolutionSection() {
  return (
    <section id="solution" className="nm-section-light reveal-section" data-reveal data-testid="solution-section">
      <div className="nm-container py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
          <div className="md:col-span-7">
            <span className="nm-eyebrow text-[#222]">The Protocol</span>
            <h2 className="mt-5 text-[clamp(2.1rem,5vw,3.8rem)] text-black leading-none">
              Meet EDITH.
            </h2>
          </div>
          <div className="md:col-span-5 flex items-end">
            <p className="text-base text-[#222]">
              Your AI accountability coach that doesn't accept excuses. Three
              core protocols — detect, adapt, execute.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-3 gap-3 md:gap-4">
          <div className="md:col-span-3 md:row-span-3 rounded-2xl bg-[#e4e4de] border border-black/10 p-5 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-black/50">Live Protocol</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                  <span className="text-[9px] text-black/40 uppercase">Running</span>
                </div>
              </div>
              <div className="h-40">
                <AdaptiveFlow />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-black/10">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={12} className="text-black/40" />
                <span className="text-[10px] font-bold uppercase text-black/60">Real-time adaptation</span>
              </div>
              <StatsTicker />
            </div>
          </div>
          
          <div className="nm-card md:col-span-3 p-4 border border-black/10 bg-[#e4e4de] hover:bg-[#dbdbd5] transition-colors duration-200 cursor-pointer flex flex-col justify-center" data-testid={`solution-card-2`}>
            <div className="flex items-start justify-between">
              <span className="block text-[10px] font-bold tracking-[0.1em] uppercase text-black/50">
                {solutions[2].label}
              </span>
              <ArrowRight size={14} className="text-black/40" />
            </div>
            <h3 className="text-lg text-black mt-1">
              {solutions[2].title}
            </h3>
            <p className="text-xs text-black/60 mt-1 leading-relaxed">
              {solutions[2].description}
            </p>
          </div>
          
          <div className="nm-card md:col-span-3 p-4 border border-black/10 bg-[#e4e4de] hover:bg-[#dbdbd5] transition-colors duration-200 cursor-pointer flex flex-col justify-center" data-testid={`solution-card-0`}>
            <div className="flex items-start justify-between">
              <span className="block text-[10px] font-bold tracking-[0.1em] uppercase text-black/50">
                {solutions[0].label}
              </span>
              <Activity size={14} className="text-black/40" />
            </div>
            <h3 className="text-lg text-black mt-1">
              {solutions[0].title}
            </h3>
            <p className="text-xs text-black/60 mt-1 leading-relaxed">
              {solutions[0].description}
            </p>
          </div>
          
          <div className="nm-card md:col-span-3 p-4 border border-black/10 bg-[#e4e4de] hover:bg-[#dbdbd5] transition-colors duration-200 cursor-pointer flex flex-col justify-center" data-testid={`solution-card-1`}>
            <div className="flex items-start justify-between">
              <span className="block text-[10px] font-bold tracking-[0.1em] uppercase text-black/50">
                {solutions[1].label}
              </span>
              <RefreshCw size={14} className="text-black/40" />
            </div>
            <h3 className="text-lg text-black mt-1">
              {solutions[1].title}
            </h3>
            <p className="text-xs text-black/60 mt-1 leading-relaxed">
              {solutions[1].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}