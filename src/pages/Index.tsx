import { loadSections } from "@/lib/cms";
import SectionRenderer from "@/components/cms/SectionRenderer";
import Navbar from "@/components/landing/Navbar";

const Index = () => {
  const sections = loadSections();

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
