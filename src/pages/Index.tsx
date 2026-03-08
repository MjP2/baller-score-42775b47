import { useState, useEffect } from "react";
import { CmsSection, loadSections } from "@/lib/cms";
import SectionRenderer from "@/components/cms/SectionRenderer";
import Navbar from "@/components/landing/Navbar";

const Index = () => {
  const [sections, setSections] = useState<CmsSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try fetching published cms-data.json first, fall back to localStorage
    fetch("/cms-data.json")
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data: CmsSection[]) => {
        setSections(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to localStorage
        setSections(loadSections());
        setLoading(false);
      });
  }, []);

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
