"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Frameworks", href: "#frameworks" },
  { label: "Pricing", href: "#pricing" },
] as const;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="mx-auto max-w-[1200px] px-6 h-16 flex items-center justify-between gap-8">
        {/* Logo — 20% larger */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo.png"
            alt="ArborGRC logo"
            width={38}
            height={38}
            priority
          />
          <span
            className="text-xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            <span className="text-stone-900 font-semibold">Arbor</span>
            <span className="font-semibold" style={{ color: "#15803d" }}>GRC</span>
          </span>
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="px-3 py-1.5 text-sm text-stone-600 hover:text-green-700 transition-colors duration-150 rounded"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right — single CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href="#get-started"
            className="text-sm font-medium text-white px-5 py-2.5 transition-colors duration-150"
            style={{ backgroundColor: "#15803d", borderRadius: "4px" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#166534")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#15803d")
            }
          >
            Get Early Access
          </Link>
        </div>

        {/* Mobile */}
        <button
          className="md:hidden p-2 text-stone-600 hover:text-stone-900 transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
