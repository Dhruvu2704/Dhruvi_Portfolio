import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4 glass-card bg-background/60" : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="font-display text-2xl font-bold tracking-tighter">
          <span className="text-white">DS</span>
          <span className="text-primary">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-white transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all duration-300"
          >
            Let's Talk
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 glass-card border-t-0 p-6 flex flex-col gap-4 md:hidden"
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
