import { useState, useRef, useEffect, useCallback } from "react";
import { Pause, Play } from "lucide-react";

const motivationalQuotes = [
  "Discipline is doing what needs to be done, even if you don't want to.",
  "The pain you feel today is the strength you feel tomorrow.",
  "Excuses don't burn calories.",
  "Your only limit is you.",
];

const conversations = [
  {
    id: "fitness-strict",
    title: "PLAN_UPDATE",
    messages: [
      { sender: "user", text: "Hey, I skipped leg day yesterday. Can we just do it on Saturday?" },
      { sender: "edith", text: "No. You skipped yesterday, so you're doing it today. Here is your adjusted schedule:" },
      { sender: "edith", isCard: true, title: "SCHEDULE_UPDATE", items: ["Leg day → TODAY (priority #1)", "Push day → pushed to tomorrow", "Pull day → pushed to Saturday", "Rest → Sunday (unchanged)"] },
      { sender: "user", text: "Fine... what about my shoulder? It's been sore" },
      { sender: "edith", text: "I've adjusted your upper body volume for tomorrow to avoid injury. Leg day today remains unchanged." },
      { sender: "edith", isCard: true, title: "MODIFIED_VOLUME", items: ["Legs (Today) → 100% volume", "Push (Tomorrow) → pressing reduced 30%", "Pull (Saturday) → add face pulls", "Accessory → resistance bands only"] },
      { sender: "user", text: "Got it. On my way." },
      { sender: "edith", text: "I'll be tracking your logged sets." },
      { sender: "user", text: "Just finished. Killed it." },
      { sender: "edith", text: "Good work. Tomorrow is upper body. Get 8 hours of sleep tonight." }
    ]
  },
  {
    id: "nutrition-check",
    title: "MACROS_LOGGED",
    messages: [
      { sender: "user", text: "Logged my meals for the day" },
      { sender: "edith", text: "I checked your logs. You're 35g under your protein target." },
      { sender: "edith", isCard: true, title: "MACROS_LOGGED", items: ["Protein → 145g (target: 180g)", "Carbs → 280g (over by 30g)", "Fat → 65g (under by 15g)", "Deficit → only 200 cal"] },
      { sender: "edith", text: "You need to eat 1.5 chicken breasts or the equivalent right now to hit your daily goal." },
      { sender: "user", text: "Can I just take a protein shake?" },
      { sender: "edith", text: "Yes, if you have to. But prioritize whole foods moving forward." },
      { sender: "edith", text: "Tomorrow's plan is updated." },
      { sender: "edith", isCard: true, title: "TOMORROW_MENU", items: ["Breakfast → 4 eggs, oatmeal", "Lunch → chicken breast, rice", "Pre-workout → banana, peanut butter", "Dinner → salmon, sweet potato"] },
      { sender: "user", text: "What if I have a social event tomorrow night?" },
      { sender: "edith", text: "Eat beforehand or stick to the cleanest options there. You agreed to hit your numbers this week." },
      { sender: "user", text: "Deal. Thanks EDITH." },
      { sender: "edith", text: "Don't thank me. Just do it." }
    ]
  },
  {
    id: "recovery-focus",
    title: "RECOVERY_PROTOCOL",
    messages: [
      { sender: "user", text: "I woke up with really bad lower back pain" },
      { sender: "edith", text: "On a scale of 1-10, how bad is it?" },
      { sender: "user", text: "Maybe a 6? It's dull and stiff when I move" },
      { sender: "edith", text: "That's likely fatigue from Tuesday's deadlifts. We're pausing lifts today." },
      { sender: "edith", isCard: true, title: "RECOVERY_PROTOCOL", items: ["Today → active rest only", "Mobility → 20 min stretching", "Ice/heat → 15 min each", "Tomorrow → reassess"] },
      { sender: "edith", text: "Do a 20-minute mobility routine today. Also, you only slept 5 hours. That's slowing your recovery down." },
      { sender: "user", text: "But I have a deadline at work..." },
      { sender: "edith", text: "You'll work better if you sleep. Prioritize getting 8 hours tonight." },
      { sender: "user", text: "Okay. I'll try to get more sleep." },
      { sender: "edith", text: "I'll check your sleep data tomorrow morning to confirm." }
    ]
  },
  {
    id: "motivation-push",
    title: "CONSISTENCY_STREAK",
    messages: [
      { sender: "user", text: "I don't feel like going to the gym today" },
      { sender: "edith", text: "Motivation fades. Discipline is what gets results. You committed to 5 days." },
      { sender: "user", text: "I've been going hard for 3 weeks straight though" },
      { sender: "edith", text: "That's how you build a habit. Skipping today sets you back." },
      { sender: "edith", text: "You just need one more week of consistency to hit your 90% target." },
      { sender: "edith", isCard: true, title: "TODAY_SESSION", items: ["Type → maintenance day", "Intensity → reduced 20%", "Duration → 45 min max", "Focus → technique over weight"] },
      { sender: "edith", text: "I've dropped the intensity by 20%. Just go in, do the work, and get out." },
      { sender: "user", text: "Alright. I'll go." },
      { sender: "edith", text: "Good choice." },
      { sender: "user", text: "Just finished. 45 minutes." },
      { sender: "edith", text: "Nice work. Your consistency score is now 82%." }
    ]
  },
  {
    id: "goal-check",
    title: "Q2_REASSESSMENT",
    messages: [
      { sender: "user", text: "It's been 3 months. How am I doing?" },
      { sender: "edith", text: "Here's your data. Goal: Lose 15 lbs, add 10 lbs to deadlift." },
      { sender: "edith", isCard: true, title: "Q2_REASSESSMENT", items: ["Weight → -12 lbs (target: -15)", "Deadlift → +8 lbs (target: +10)", "Consistency → 87%", "Protein adherence → 73%"] },
      { sender: "edith", text: "Weight loss is on track. Strength is lagging slightly." },
      { sender: "user", text: "What's holding me back on the deadlift?" },
      { sender: "edith", text: "Your training-day calories are too low. You can't build strength without enough fuel." },
      { sender: "edith", text: "I've added 200 calories to your training days. Focus on protein." },
      { sender: "user", text: "So I should keep going?" },
      { sender: "edith", text: "Yes. Most people quit by week 4. You're at week 12. Keep showing up." },
      { sender: "edith", text: "Your new plan is ready." }
    ]
  }
];

function AnimatedRadar({ isVisible }) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    const duration = 1200;
    let animationFrame;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / duration, 1);
      
      const c1 = 1.70158;
      const c3 = c1 + 1;
      const easedProgress = 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      
      setProgress(easedProgress);
      
      if (t < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isVisible]);

  const labels = ["Strength", "Endurance", "Consistency", "Recovery", "Motivation"];
  const data = [75, 60, 85, 65, 90];
  const cx = 120, cy = 120, maxR = 75;
  
  const points = labels.map((_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    return { x: cx + maxR * Math.cos(angle), y: cy + maxR * Math.sin(angle) };
  });

  const currentData = data.map((d, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    const val = (d / 100) * maxR * progress;
    return { x: cx + val * Math.cos(angle), y: cy + val * Math.sin(angle) };
  });

  return (
    <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-sm overflow-visible">
      {/* Background Grid */}
      {[0.25, 0.5, 0.75, 1].map((scale, i) => (
        <circle 
          key={i} 
          cx={cx} cy={cy} 
          r={maxR * scale} 
          fill="none" 
          stroke="rgba(0,0,0,0.15)" 
          strokeWidth="1" 
          strokeDasharray={i === 3 ? "none" : "2 2"} 
        />
      ))}
      
      {/* Axes */}
      {points.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
      ))}
      
      {/* Interactive Group */}
      <g 
        className="group origin-center transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.12] cursor-pointer" 
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        {/* Filled Polygon */}
        <polygon 
          points={currentData.map(p => `${p.x},${p.y}`).join(" ")} 
          className="fill-black/10 stroke-[#111] group-hover:fill-black/20 transition-colors duration-300"
          strokeWidth="1.5" 
        />
        
        {/* Data Points */}
        {currentData.map((p, i) => (
          <circle 
            key={`dot-${i}`} 
            cx={p.x} cy={p.y} 
            r="3" 
            fill="#111" 
          />
        ))}

      </g>

      {/* Labels */}
      {labels.map((label, i) => {
        const angle = (i * 72 - 90) * (Math.PI / 180);
        const textR = maxR + 18;
        let anchor = "middle";
        
        if (i === 1 || i === 2) anchor = "start";
        if (i === 3 || i === 4) anchor = "end";
        if (i === 0) anchor = "middle";

        const xPos = cx + textR * Math.cos(angle);
        const yPos = cy + textR * Math.sin(angle) + (i === 0 ? -4 : 2);

        return (
          <g 
            key={`label-${i}`} 
            className="group/label cursor-pointer transition-transform duration-300 ease-out hover:scale-125"
            style={{ transformOrigin: `${xPos}px ${yPos}px` }}
          >
            <text 
              x={xPos} 
              y={yPos} 
              fontSize="10" 
              fontWeight="800"
              textAnchor={anchor} 
              dominantBaseline="middle"
              className="fill-black/60 group-hover/label:fill-black transition-colors duration-300 uppercase tracking-[0.1em]"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function AnimatedGraph({ isVisible }) {
  const [bars, setBars] = useState([0, 0, 0, 0, 0, 0, 0]);
  
  useEffect(() => {
    if (!isVisible) return;

    const intervals = bars.map((_, i) => 
      setTimeout(() => setBars(prev => { const n = [...prev]; n[i] = Math.random() * 40 + 30 + (i * 8); return n; }), 200 + i * 100)
    );
    return () => intervals.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <div className="flex items-end justify-center gap-1 h-20">
      {bars.map((height, i) => <div key={i} className="w-3 bg-black rounded-t transition-all duration-1000 ease-out" style={{ height: `${height}%` }} />)}
    </div>
  );
}

function DailyMotivation() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setCurrentQuote(prev => (prev + 1) % motivationalQuotes.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      setCurrentQuote(prev => (prev + 1) % motivationalQuotes.length);
    } else if (isRightSwipe) {
      setCurrentQuote(prev => (prev - 1 + motivationalQuotes.length) % motivationalQuotes.length);
    }
  };

  return (
    <div 
      className="nm-card bg-[#e4e4de] p-5 flex-1 flex flex-col justify-center border border-black/10"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndHandler}
      style={{ touchAction: "pan-y" }}
    >
      <span className="text-[10px] font-bold tracking-[0.2em] text-black/60 uppercase mb-3 block">Daily Motivation</span>
      <p className="text-sm text-[#1a1a1a] font-medium text-center italic leading-relaxed transition-all duration-500">"{motivationalQuotes[currentQuote]}"</p>
      <div className="flex justify-center gap-1 mt-3">
        {motivationalQuotes.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentQuote ? "bg-black" : "bg-black/20"}`} />
        ))}
      </div>
    </div>
  );
}



export default function AIPreview() {
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [currentCardState, setCurrentCardState] = useState({ title: "", items: [] });
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // start false
  const [conversationIndex, setConversationIndex] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  
  const chatContainerRef = useRef(null);
  const userScrollingTimerRef = useRef(null);
  const chatSectionRef = useRef(null);
  const statsSectionRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    
    const chatObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true);
          chatObserver.disconnect();
        }
      },
      { threshold: isMobile ? 0.25 : 0.5 }
    );

    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
          statsObserver.disconnect();
        }
      },
      { threshold: isMobile ? 0.25 : 0.5 }
    );
    
    if (chatSectionRef.current) chatObserver.observe(chatSectionRef.current);
    if (statsSectionRef.current) statsObserver.observe(statsSectionRef.current);
    
    return () => {
      chatObserver.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  const currentConversation = conversations[conversationIndex];

  const scrollToBottom = useCallback(() => {
    const el = chatContainerRef.current;
    if (el && !isUserScrolling) {
      el.scrollTop = el.scrollHeight;
    }
  }, [isUserScrolling]);

  const handleScroll = useCallback(() => {
    const el = chatContainerRef.current;
    if (!el) return;

    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    
    if (!isAtBottom) {
      setIsUserScrolling(true);
      if (userScrollingTimerRef.current) {
        clearTimeout(userScrollingTimerRef.current);
      }
      userScrollingTimerRef.current = setTimeout(() => {
        setIsUserScrolling(false);
      }, 2000);
    } else {
      setIsUserScrolling(false);
      if (userScrollingTimerRef.current) {
        clearTimeout(userScrollingTimerRef.current);
      }
    }
  }, []);

  const addMessage = useCallback((msg) => {
    setDisplayedMessages(prev => [...prev, { ...msg, displayed: true }]);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const messages = currentConversation.messages;
    
    if (currentIndex >= messages.length) {
      setTimeout(() => {
        setConversationIndex(prev => (prev + 1) % conversations.length);
        setDisplayedMessages([]);
        setCurrentIndex(0);
        setCurrentText("");
        setIsTyping(false);
        setIsComplete(false);
      }, 3000);
      return;
    }

    const msg = messages[currentIndex];

    if (!isTyping) {
      setIsTyping(true);
      setCurrentText("");
      setCurrentCardState({ title: msg.title || "", items: msg.items ? Array(msg.items.length).fill("") : [] });
    }
  }, [currentIndex, isPlaying, isTyping, isComplete, addMessage, currentConversation]);

  useEffect(() => {
    if (!isTyping) return;
    
    const messages = currentConversation.messages;
    if (currentIndex >= messages.length) return;
    
    const msg = messages[currentIndex];
    
    let timeoutId;

    if (msg.isCard) {
      let currentItemIndex = 0;
      let charIndex = 0;
      
      const typeNextCardChar = () => {
        if (currentItemIndex < msg.items.length) {
          const currentItemText = msg.items[currentItemIndex];
          if (charIndex < currentItemText.length) {
            setCurrentCardState(prev => {
              const newItems = [...prev.items];
              newItems[currentItemIndex] = currentItemText.slice(0, charIndex + 1);
              return { ...prev, items: newItems };
            });
            charIndex++;
            scrollToBottom();
            
            const char = currentItemText[charIndex - 1];
            let delay = 10 + Math.random() * 15; 
            if (['.', '!', '?'].includes(char)) delay += 100;
            else if ([',', ';', ':'].includes(char)) delay += 40;
            
            timeoutId = setTimeout(typeNextCardChar, delay);
          } else {
            currentItemIndex++;
            charIndex = 0;
            timeoutId = setTimeout(typeNextCardChar, 150); 
          }
        } else {
          setIsTyping(false);
          setIsComplete(true);
          setCurrentIndex(prev => prev + 1);
          addMessage(msg);
        }
      };
      
      timeoutId = setTimeout(typeNextCardChar, 300);
    } else {
      let charIndex = 0;
      setCurrentText("");
      
      const typeNextChar = () => {
        if (charIndex < msg.text.length) {
          setCurrentText(msg.text.slice(0, charIndex + 1));
          charIndex++;
          scrollToBottom();
          
          const char = msg.text[charIndex - 1];
          let delay = 15 + Math.random() * 20; 
          
          if (['.', '!', '?'].includes(char)) delay += 150;
          else if ([',', ';', ':'].includes(char)) delay += 60;
          else if (char === ' ') delay += 15;
          
          timeoutId = setTimeout(typeNextChar, delay);
        } else {
          setIsTyping(false);
          setIsComplete(true);
          setCurrentIndex(prev => prev + 1);
          addMessage({ ...msg, text: msg.text });
        }
      };
      
      timeoutId = setTimeout(typeNextChar, msg.sender === "user" ? 600 : 250);
    }

    return () => clearTimeout(timeoutId);
  }, [isTyping, currentIndex, scrollToBottom, addMessage, currentConversation]);


  const visibleMessages = displayedMessages;

  return (
    <section id="ai-preview" className="nm-section-light reveal-section" data-reveal data-testid="ai-preview-section">
      <div className="nm-container py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
          <div className="lg:col-span-7">
            <div className="pb-4 flex flex-wrap items-center gap-4">
              <span className="nm-eyebrow text-black">AI Preview</span>
              <span className="text-[10px] font-bold text-black uppercase tracking-[0.2em] border border-black px-3 py-1 rounded-md">
                Live Demo
              </span>
            </div>
            <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] text-black leading-none">
              This is what<br /><span className="inline-block mt-2">EDITH sounds like.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-base text-[#1a1a1a] font-medium">No gentle reminders. No "it's okay." Just protocol.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div ref={chatSectionRef} className="lg:col-span-7">
            <div className="rounded-2xl border border-black/15 bg-[#e8e8e3] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-black/10 bg-[#ddddd8]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase">EDITH v1.0</span>
                  <span className="text-[8px] text-black/40 ml-2 uppercase">● Live</span>
                  <span className="text-[8px] text-black/50 ml-2 px-2 py-0.5 bg-black/5 rounded">{currentConversation.title.split("_").join(" ")}</span>
                </div>
                <button onClick={() => setIsPlaying(!isPlaying)} className="text-[10px] font-bold text-black border border-black/30 px-2 py-1 rounded uppercase tracking-wider hover:bg-black hover:text-[#f0efeb] transition-colors flex items-center gap-1">
                  {isPlaying ? <><Pause size={8} /> Pause</> : <><Play size={8} /> Play</>}
                </button>
              </div>

              <div ref={chatContainerRef} onScroll={handleScroll} className="chat-scroll-container p-4 flex flex-col gap-2 min-h-[380px] max-h-[380px] bg-[#ebebe6]">
                {visibleMessages.map((msg, i) => (
                  <div key={i} className={`${msg.sender === "user" ? "self-end max-w-[85%]" : "self-start max-w-[90%]"}`}>
                    {msg.sender === "user" && <span className="text-[9px] font-bold text-black/40 uppercase tracking-[0.15em] block mb-0.5 text-right">YOU</span>}
                    {msg.isCard ? (
                      <div className="border border-black/15 rounded-lg bg-[#e2e2dd]">
                        <div className="border-b border-black/10 px-3 py-2 flex items-center justify-between bg-[#d8d8d3] rounded-t-lg">
                          <span className="text-[9px] font-bold tracking-widest text-black uppercase">EDITH::{msg.title}</span>
                          <span className="text-[9px] font-bold text-black/70 border border-black/30 px-1.5 py-0.5 rounded">NOW</span>
                        </div>
                        <div className="p-3 space-y-1">
                          {msg.items.map((item, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <span className="text-black/70 text-xs mt-0.5 flex-shrink-0 font-bold">→</span>
                              <span className="text-xs text-[#1a1a1a]">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        {msg.sender === "edith" && <span className="block text-[9px] font-bold tracking-[0.2em] text-black/50 mb-0.5 uppercase">EDITH</span>}
                        <div className={`px-3 py-2 text-xs leading-relaxed border rounded-lg ${msg.sender === "edith" ? "bg-[#ddddd8] text-[#1a1a1a] border-black/12" : "bg-[#1a1a1a] text-[#f0efeb] border-black/40"}`}>
                          {msg.text}
                        </div>
                      </>
                    )}
                  </div>
                ))}
                
                {isTyping && currentConversation.messages[currentIndex] && (
                  <div className={`${currentConversation.messages[currentIndex].sender === "user" ? "self-end max-w-[85%]" : "self-start max-w-[90%]"}`}>
                    {currentConversation.messages[currentIndex].isCard ? (
                      <div className="border border-black/15 rounded-lg bg-[#e2e2dd]">
                        <div className="border-b border-black/10 px-3 py-2 flex items-center justify-between bg-[#d8d8d3] rounded-t-lg">
                          <span className="text-[9px] font-bold tracking-widest text-black uppercase">EDITH::{currentCardState.title}</span>
                          <span className="text-[9px] font-bold text-black/70 border border-black/30 px-1.5 py-0.5 rounded">NOW</span>
                        </div>
                        <div className="p-3 space-y-1">
                          {currentCardState.items.map((item, j) => {
                            const activeItemIndex = currentCardState.items.findIndex((it, idx) => it.length < currentConversation.messages[currentIndex].items[idx].length);
                            const isTypingThisItem = j === activeItemIndex;
                            const hasStarted = item.length > 0 || isTypingThisItem;
                            
                            return hasStarted ? (
                              <div key={j} className="flex items-start gap-2">
                                <span className="text-black/70 text-xs mt-0.5 flex-shrink-0 font-bold">→</span>
                                <span className="text-xs text-[#1a1a1a]">
                                  {item}
                                  {isTypingThisItem && (
                                    <span className="inline-block w-[3px] h-[12px] bg-black/60 align-middle ml-[2px] animate-blink" />
                                  )}
                                </span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    ) : currentConversation.messages[currentIndex].sender === "user" ? (
                      <>
                        <span className="text-[9px] font-bold text-black/40 uppercase tracking-[0.15em] block mb-0.5 text-right">YOU</span>
                        <div className="px-3 py-2 text-xs leading-relaxed border rounded-lg bg-[#1a1a1a] text-[#f0efeb] border-black/40">
                          <span>{currentText}</span>
                          <span className="inline-block w-[3px] h-[12px] bg-white/60 align-middle ml-[2px] animate-blink" />
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="block text-[9px] font-bold tracking-[0.2em] text-black/50 mb-0.5 uppercase">EDITH</span>
                        <div className="px-3 py-2 text-xs bg-[#ddddd8] border border-black/12 rounded-lg leading-relaxed">
                          <span>{currentText}</span>
                          <span className="inline-block w-[3px] h-[12px] bg-black/60 align-middle ml-[2px] animate-blink" />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="px-4 py-3 bg-[#ddddd8] border-t border-black/10 flex items-center gap-2">
                <span className="text-xs font-bold text-black/50">›</span>
                <div className="flex-1 text-xs text-black/40 font-mono uppercase tracking-wider">Live conversation demo</div>
              </div>
            </div>
          </div>

          <div ref={statsSectionRef} className="lg:col-span-5 flex flex-col gap-4">
            <div className="nm-card bg-[#e4e4de] p-5 border border-black/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold tracking-[0.2em] text-black/70 uppercase">Performance Radar</span>
                <span className="text-[8px] text-black/40 uppercase">This Week</span>
              </div>
              <div className="h-44"><AnimatedRadar isVisible={isStatsVisible} /></div>
            </div>

            <div className="nm-card bg-[#e4e4de] p-5 border border-black/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold tracking-[0.2em] text-black/70 uppercase">Weekly Progress</span>
                <span className="text-[8px] text-black/40 uppercase">7 day streak</span>
              </div>
              <AnimatedGraph isVisible={isStatsVisible} />
            </div>

            <DailyMotivation />
          </div>
        </div>
      </div>
    </section>
  );
}