"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationItem } from "@/types/simulation";

const navigationItems: NavigationItem[] = [
  {
    name: "Home",
    href: "/",
    icon: "🏠",
    description: "Start your career simulation",
  },
  {
    name: "Simulation",
    href: "/simulation",
    icon: "🔮",
    description: "View your career paths",
  },
  {
    name: "About",
    href: "/about",
    icon: "ℹ️",
    description: "Learn about FutureForge",
  },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card m-4 p-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="text-3xl font-bold font-['Orbitron'] text-gradient-accent">
            ⚡ FutureForge
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-link flex items-center space-x-2 ${
                pathname === item.href ? "active" : ""
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden btn-primary px-4 py-2"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-white/10">
          <div className="space-y-3">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`nav-link flex items-center space-x-3 w-full ${
                  pathname === item.href ? "active" : ""
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-white/60">
                    {item.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
