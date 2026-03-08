import { useState, useEffect } from "react";
import { t } from "@/lib/i18n";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const links = [
    { label: t("nav.features"), id: "features" },
    { label: t("nav.dashboard"), id: "dashboard" },
    { label: t("nav.stats"), id: "stats" },
    { label: t("nav.testimonials"), id: "testimonials" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-solid" : "nav-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <img src={logo} alt="Baller Score" className="h-8 w-auto" />

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("cta")}
            className="bg-gradient-cta text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {t("nav.download")}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border px-6 pb-6 space-y-4">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="block w-full text-left text-foreground/70 hover:text-foreground py-2"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("cta")}
            className="w-full bg-gradient-cta text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold"
          >
            {t("nav.download")}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
