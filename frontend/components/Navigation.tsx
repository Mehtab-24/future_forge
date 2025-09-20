"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Zap, Menu, X, Target } from "lucide-react";
import { NavigationItem } from "@/types/simulation";

const navigationItems: NavigationItem[] = [
  {
    name: "Home",
    href: "/",
    icon: "home",
    description: "Start your career simulation",
  },
  {
    name: "Simulation",
    href: "/simulation",
    icon: "zap",
    description: "View your career paths",
  },
  {
    name: "Action Plan",
    href: "/action-stack",
    icon: "target",
    description: "Your personalized roadmap",
  },
];

const getIcon = (iconName: string, className: string = "w-5 h-5") => {
  switch (iconName) {
    case "home":
      return <Home className={className} />;
    case "zap":
      return <Zap className={className} />;
    case "target":
      return <Target className={className} />;
    default:
      return <Home className={className} />;
  }
};

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Zap className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-200" />
              <div className="absolute inset-0 w-8 h-8 bg-cyan-400/20 rounded-full blur-md group-hover:bg-cyan-300/30 transition-all duration-200"></div>
            </div>
            <div className="text-2xl font-bold font-['Orbitron'] bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-200">
              FutureForge
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 group ${
                    isActive
                      ? "text-white bg-gradient-to-r from-cyan-500/20 to-blue-500/20 shadow-lg border border-cyan-500/30"
                      : "text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/80 hover:to-slate-700/80"
                  }`}
                >
                  <div
                    className={`transition-all duration-200 ${
                      isActive
                        ? "text-cyan-400 scale-110"
                        : "text-slate-400 group-hover:text-cyan-400 group-hover:scale-105"
                    }`}
                  >
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-sm font-semibold">{item.name}</span>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative p-2 rounded-xl bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-slate-600/30 hover:from-slate-700/80 hover:to-slate-600/80 transition-all duration-200 group"
          >
            <div className="relative z-10">
              {isMenuOpen ? (
                <X className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors duration-200" />
              ) : (
                <Menu className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors duration-200" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-slate-900/98 backdrop-blur-xl border-t border-slate-700/30">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-4 p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "text-white bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30"
                    : "text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/60"
                }`}
              >
                <div
                  className={`transition-all duration-200 ${
                    isActive
                      ? "text-cyan-400 scale-110"
                      : "text-slate-400 group-hover:text-cyan-400"
                  }`}
                >
                  {getIcon(item.icon, "w-6 h-6")}
                </div>
                <div className="flex-1">
                  <div className="text-base font-semibold">{item.name}</div>
                  <div className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors duration-200">
                    {item.description}
                  </div>
                </div>

                {/* Mobile active indicator */}
                {isActive && (
                  <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
