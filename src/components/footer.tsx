import Link from "next/link";
import Image from "next/image";

const PRODUCT_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Get Early Access", href: "#get-started" },
] as const;

const FRAMEWORK_LINKS = [
  { label: "ISO 27001", href: "#frameworks" },
  { label: "UAE-IA", href: "#frameworks" },
  { label: "ISO 31000", href: "#frameworks" },
  { label: "ITIL 4", href: "#frameworks" },
  { label: "SOC 2", href: "#frameworks" },
] as const;

const COMPANY_LINKS = [
  { label: "Contact Us", href: "#get-started" },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#1c1917" }} className="text-stone-400">
      {/* Main grid */}
      <div className="mx-auto max-w-[1200px] px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <Image
                src="/logo.png"
                alt="ArborGRC logo"
                width={28}
                height={28}
                className="opacity-80"
              />
              <span
                className="text-base"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                <span className="text-stone-200 font-semibold">Arbor</span>
                <span className="font-semibold" style={{ color: "#4ade80" }}>
                  GRC
                </span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed max-w-[260px]">
              Enterprise-grade governance, risk and compliance — built for teams
              that move fast without cutting corners.
            </p>

          </div>

          {/* Col 2 — Product */}
          <div>
            <p
              className="text-xs font-medium text-stone-500 mb-4"
              style={{ letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Product
            </p>
            <ul className="flex flex-col gap-2.5">
              {PRODUCT_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Frameworks */}
          <div>
            <p
              className="text-xs font-medium text-stone-500 mb-4"
              style={{ letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Frameworks
            </p>
            <ul className="flex flex-col gap-2.5">
              {FRAMEWORK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Company */}
          <div>
            <p
              className="text-xs font-medium text-stone-500 mb-4"
              style={{ letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Company
            </p>
            <ul className="flex flex-col gap-2.5">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="mx-auto max-w-[1200px] px-6 py-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} ArborGRC
          </p>
        </div>
      </div>
    </footer>
  );
}
