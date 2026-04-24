import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import brandLogo from "@/assets/brand-logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 px-3 md:px-5 pt-3 ${scrolled ? "backdrop-blur-sm" : ""
        }`}
    >
      <div className="nm-container">
        <div className="h-[70px] w-full rounded-2xl border border-black/20 bg-[#ecece7]/55 px-4 md:px-6 flex items-center justify-between backdrop-blur-md shadow-[0_8px_24px_rgba(20,20,20,0.08)]">
          <a href="#" className="flex items-center" data-testid="navbar-logo">
            <img
              src={brandLogo}
              alt="EDITH"
              className="h-[52px] w-auto object-contain"
            />
          </a>

          <button
            className="rounded-xl border border-black/20 bg-[#e0dfd9]/40 p-2 text-[#111111] hover:bg-[#d0cfc9]/60 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {menuOpen ? <X size={24} strokeWidth={2.2} /> : <Menu size={24} strokeWidth={2.2} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="nm-container mt-2">
          <div className="rounded-2xl border border-black/35 bg-[#e8e8e3] px-4 py-4 text-sm">
            <div className="mt-2 space-y-1 text-[#222]">
              <a href="#problem" onClick={() => setMenuOpen(false)} className="block py-1">Problem</a>
              <a href="#solution" onClick={() => setMenuOpen(false)} className="block py-1">Protocol</a>
              <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="block py-1">Process</a>
              <a href="#hero" onClick={() => setMenuOpen(false)} className="block py-1 font-semibold">Join Waitlist</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
