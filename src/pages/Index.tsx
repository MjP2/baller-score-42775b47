import { useState, useEffect } from "react";
import { CmsSection, LangCode, loadSections } from "@/lib/cms";
import SectionRenderer from "@/components/cms/SectionRenderer";
import Navbar from "@/components/landing/Navbar";

function detectLanguage(): LangCode {
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get("lang");
  if (langParam === "es" || langParam === "sv") return langParam;
  const browserLang = navigator.language?.slice(0, 2);
  if (browserLang === "es" || browserLang === "sv") return browserLang;
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
      <Navbar />
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
};

export default Index;
