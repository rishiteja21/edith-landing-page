import brandLogo from "@/assets/edith-text-logo.png";
import { Instagram, Mail } from "lucide-react";

const footerColumns = [
  {
    heading: "Product",
    links: [
      { label: "Problem", href: "#problem" },
      { label: "Protocol", href: "#solution" },
      { label: "Process", href: "#how-it-works" },
      { label: "Preview", href: "#ai-preview" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="nm-section-dark reveal-section"
      data-reveal
      data-testid="footer"
    >
      <div className="nm-container">
        <div className="grid grid-cols-1 md:grid-cols-12 py-16 md:py-20 gap-12 border-b border-black/15">
          <div className="md:col-span-5">
            <div className="inline-flex items-center border border-black/15 rounded-xl bg-[#d8d8d3] px-3 py-2 mb-6 overflow-hidden">
              <img
                src={brandLogo}
                alt="EDITH"
                className="h-8 w-[120px] object-cover object-center scale-[1.1] origin-center"
              />
            </div>
            <p className="text-sm text-[#2f2f2b] max-w-xs font-medium leading-relaxed">
              AI-powered accountability. No excuses. No restarts. Just results.
            </p>
          </div>

          <div className="md:col-span-7 flex flex-col h-full">
            <div className="grid grid-cols-2 gap-8 mb-auto">
              {footerColumns.map((col) => (
                <div key={col.heading}>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5d5d57] mb-5">
                    {col.heading}
                  </p>
                  <ul className="space-y-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={(e) => {
                            if (link.href === "#") e.preventDefault();
                          }}
                          className="text-xs font-medium text-[#2f2f2b] hover:text-[#111] underline-offset-4 hover:underline"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-8">
              <a href="https://www.instagram.com/luxe.edith?igsh=NTVrMzJ4MW85dnpw" target="_blank" rel="noreferrer" className="flex items-center gap-2 group">
                <Instagram size={16} className="text-[#5d5d57] group-hover:text-black transition-colors" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#2f2f2b] group-hover:text-black transition-colors">Follow us on Instagram</span>
              </a>
              <a href="mailto:thabetirishiteja21@gmail.com" className="flex items-center gap-2 group">
                <Mail size={16} className="text-[#5d5d57] group-hover:text-black transition-colors" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#2f2f2b] group-hover:text-black transition-colors">thabetirishiteja21@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="py-6 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#676761]">
            © {new Date().getFullYear()} EDITH. All rights reserved.
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#111] bg-[#e8f0c2] rounded px-2 py-1">
            v1.0.0
          </span>
        </div>
      </div>
    </footer>
  );
}
