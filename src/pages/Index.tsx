import { useState, useEffect } from "react";
import { CmsSection, LangCode, loadSections } from "@/lib/cms";
import SectionRenderer from "@/components/cms/SectionRenderer";
import Navbar from "@/components/landing/Navbar";

function detectLanguage(): LangCode {
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get("lang");
  const validLangs = ["es", "sv", "fi", "de"] as const;
  if (validLangs.includes(langParam as any)) return langParam as LangCode;
  const browserLang = navigator.language?.slice(0, 2);
  if (validLangs.includes(browserLang as any)) return browserLang as LangCode;
  return "en";
}

const Index = () => {
  const [sections, setSections] = useState<CmsSection[]>([]);
  const [loading, setLoading] = useState(true);
  const lang = detectLanguage();

  useEffect(() => {
    const fileName = lang === "en" ? "cms-data.json" : `cms-data-${lang}.json`;

    fetch(`${import.meta.env.BASE_URL}${fileName}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data: CmsSection[]) => {
        setSections(data);
        setLoading(false);
      })
      .catch(() => {
        // Try English fallback if localized file doesn't exist
        if (lang !== "en") {
          fetch(`${import.meta.env.BASE_URL}cms-data.json`)
            .then(res => res.ok ? res.json() : Promise.reject())
            .then((data: CmsSection[]) => { setSections(data); setLoading(false); })
            .catch(() => { setSections(loadSections(lang)); setLoading(false); });
        } else {
          setSections(loadSections("en"));
          setLoading(false);
        }
      });
  }, [lang]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-display font-bold text-gradient">No sections yet</h1>
          <p className="text-muted-foreground">
            Head to <a href="/admin" className="text-primary underline">/admin</a> to build your page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar sections={sections} />
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-6 flex items-center justify-between text-sm text-muted-foreground">
          <p>
            Created by:{" "}
            <a href="https://nexttime.design" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors underline underline-offset-2">
              Next Time Design
            </a>
          </p>
          <a href="https://www.instagram.com/ballerscore.app" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="Instagram">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
