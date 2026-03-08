import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import { CmsSection } from "@/lib/cms";

interface NavItem {
  label: string;
  sectionId: string;
  isCta: boolean;
}

function buildNavItems(sections: CmsSection[]): NavItem[] {
  return sections
    .filter((s) => s.data._navVisible && s.data._navLabel)
    .map((s) => ({
      label: s.data._navLabel,
      sectionId: s.id,
      isCta: !!s.data._navCta,
    }));
}

const Navbar = ({ sections = [] }: { sections?: CmsSection[] }) => {
  const [scrolled, setScrolled] = useState(false);

  const navItems = buildNavItems(sections);
  const links = navItems.filter((n) => !n.isCta);
  const ctaItem = navItems.find((n) => n.isCta);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-solid" : "nav-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo — always left */}
        <img src={logo} alt="Baller Score" className="h-8 w-auto" />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.sectionId}
              onClick={() => scrollTo(link.sectionId)}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
          {ctaItem && (
            <button
              onClick={() => scrollTo(ctaItem.sectionId)}
              className="bg-gradient-cta text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {ctaItem.label}
            </button>
          )}
        </div>

        {/* Mobile: CTA only, no menu */}
        {ctaItem && (
          <button
            className="md:hidden bg-gradient-cta text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            onClick={() => scrollTo(ctaItem.sectionId)}
          >
            {ctaItem.label}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
