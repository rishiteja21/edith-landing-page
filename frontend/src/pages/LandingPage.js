import { useState, useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import HowItWorks from "@/components/landing/HowItWorks";
import AIPreview from "@/components/landing/AIPreview";
import SocialProof from "@/components/landing/SocialProof";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function LandingPage() {
  const [waitlistCount, setWaitlistCount] = useState(200);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get(`${API}/waitlist/count`);
        if (res.data.count > 0) {
          setWaitlistCount(200 + res.data.count);
        }
      } catch (e) {
        // silently fail
      }
    };
    fetchCount();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleWaitlist = async (email) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${API}/waitlist`, { email });
      setMessage(res.data.message);
      setSubmitted(true);
      setWaitlistCount(200 + res.data.count);
    } catch (e) {
      setMessage(e.response?.data?.detail || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen nm-page" data-testid="landing-page">
      <Navbar />
      <HeroSection
        onSubmit={handleWaitlist}
        loading={loading}
        submitted={submitted}
        message={message}
        waitlistCount={waitlistCount}
      />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <AIPreview />
      <SocialProof count={waitlistCount} />
      <FAQ />
      <FinalCTA
        onSubmit={handleWaitlist}
        loading={loading}
        submitted={submitted}
        message={message}
      />
      <Footer />
    </div>
  );
}
