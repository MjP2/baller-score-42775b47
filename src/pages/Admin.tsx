import { useState, useEffect } from "react";
import { CmsSection, SectionType, SECTION_LABELS, loadSections, saveSections, generateId, defaultDataForType } from "@/lib/cms";
import SectionRenderer from "@/components/cms/SectionRenderer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Trash2, GripVertical, ChevronUp, ChevronDown, Plus, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const sectionTypes = Object.keys(SECTION_LABELS) as SectionType[];

export default function Admin() {
  const [sections, setSections] = useState<CmsSection[]>(loadSections);
  const [addType, setAddType] = useState<SectionType>("feature-block-side");
  const [previewMode, setPreviewMode] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => { saveSections(sections); }, [sections]);

  const addSection = () => {
    const newSection: CmsSection = {
      id: generateId(),
      type: addType,
      order: sections.length,
      data: defaultDataForType(addType),
    };
    setSections(prev => [...prev, newSection]);
    setExpandedId(newSection.id);
    toast.success(`Added ${SECTION_LABELS[addType]}`);
  };

  const updateData = (id: string, field: string, value: any) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, data: { ...s.data, [field]: value } } : s));
  };

  const removeSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
    toast.info("Section removed");
  };

  const moveSection = (id: string, dir: -1 | 1) => {
    setSections(prev => {
      const idx = prev.findIndex(s => s.id === id);
      if ((dir === -1 && idx === 0) || (dir === 1 && idx === prev.length - 1)) return prev;
      const next = [...prev];
      [next[idx], next[idx + dir]] = [next[idx + dir], next[idx]];
      return next.map((s, i) => ({ ...s, order: i }));
    });
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="fixed top-4 right-4 z-50">
          <Button onClick={() => setPreviewMode(false)} variant="outline" className="gap-2">
            <EyeOff size={16} /> Exit Preview
          </Button>
        </div>
        {sections.map(s => <SectionRenderer key={s.id} section={s} />)}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-10 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold text-gradient">Mini CMS</h1>
          <Button onClick={() => setPreviewMode(true)} variant="outline" className="gap-2">
            <Eye size={16} /> Preview
          </Button>
        </div>

        {/* Section list */}
        <div className="space-y-4 mb-8">
          {sections.map((section) => (
            <div key={section.id} className="bg-card border border-border rounded-xl overflow-hidden">
              {/* Header */}
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-secondary/50 transition-colors"
                onClick={() => setExpandedId(expandedId === section.id ? null : section.id)}
              >
                <GripVertical size={16} className="text-muted-foreground shrink-0" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {SECTION_LABELS[section.type]}
                </span>
                <span className="text-sm text-muted-foreground truncate flex-1">
                  {section.data.title || "(untitled)"}
                </span>
                <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveSection(section.id, -1)}>
                    <ChevronUp size={14} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveSection(section.id, 1)}>
                    <ChevronDown size={14} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => removeSection(section.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>

              {/* Expanded editor */}
              {expandedId === section.id && (
                <div className="border-t border-border px-4 py-4 space-y-4">
                  <SectionDataEditor section={section} onUpdate={updateData} />
                </div>
              )}
            </div>
          ))}

          {sections.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No sections yet. Add one below.
            </div>
          )}
        </div>

        {/* Add section */}
        <div className="flex items-center gap-3 p-4 bg-card border border-dashed border-border rounded-xl">
          <Select value={addType} onValueChange={(v) => setAddType(v as SectionType)}>
            <SelectTrigger className="w-[280px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sectionTypes.map(t => (
                <SelectItem key={t} value={t}>{SECTION_LABELS[t]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={addSection} className="gap-2">
            <Plus size={16} /> Add Section
          </Button>
        </div>
      </div>
    </div>
  );
}

function SectionDataEditor({ section, onUpdate }: { section: CmsSection; onUpdate: (id: string, field: string, value: any) => void }) {
  const d = section.data;
  const field = (key: string, label: string, multiline = false) => (
    <div key={key} className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {multiline ? (
        <Textarea value={d[key] || ""} onChange={e => onUpdate(section.id, key, e.target.value)} className="min-h-[80px]" placeholder={label} />
      ) : (
        <Input value={d[key] || ""} onChange={e => onUpdate(section.id, key, e.target.value)} placeholder={label} />
      )}
    </div>
  );

  const toggle = (key: string, label: string) => (
    <div key={key} className="flex items-center gap-2">
      <Switch checked={!!d[key]} onCheckedChange={v => onUpdate(section.id, key, v)} />
      <Label className="text-sm">{label}</Label>
    </div>
  );

  switch (section.type) {
    case "hero":
      return <>{field("title", "Title")}{field("subtitle", "Subtitle", true)}{field("bgImage", "Background Image URL")}</>;
    case "feature-block-side":
      return <>{field("title", "Title")}{field("subtitle", "Subtitle")}{field("body", "Body Text", true)}{field("image", "Image URL")}{field("imageAlt", "Image Alt Text")}{field("badge", "Badge Text")}{field("bullets", "Bullets (one per line)", true)}{toggle("reversed", "Reversed (image right)")}</>;
    case "feature-block-stacked":
      return <>{field("title", "Title")}{field("subtitle", "Subtitle")}{field("body", "Body Text", true)}{field("image", "Image URL")}{field("imageAlt", "Image Alt Text")}{field("badge", "Badge Text")}{field("bullets", "Bullets (one per line)", true)}</>;
    case "feature-grid":
      return (
        <>
          {field("title", "Section Title")}{field("subtitle", "Section Subtitle")}
          <div className="border-t border-border pt-3 mt-3 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase">Card 1</p>
            {field("card1Title", "Title")}{field("card1Body", "Body")}
          </div>
          <div className="border-t border-border pt-3 mt-3 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase">Card 2</p>
            {field("card2Title", "Title")}{field("card2Body", "Body")}
          </div>
          <div className="border-t border-border pt-3 mt-3 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase">Card 3</p>
            {field("card3Title", "Title")}{field("card3Body", "Body")}
          </div>
        </>
      );
    case "stats":
      return (
        <>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="grid grid-cols-2 gap-3">
              {field(`stat${i}Value`, `Stat ${i} Value`)}{field(`stat${i}Label`, `Stat ${i} Label`)}
            </div>
          ))}
        </>
      );
    case "platform":
      return <>{field("title", "Title")}{field("subtitle", "Subtitle")}{field("image", "Image URL")}</>;
    case "testimonials":
      return (
        <>
          {field("title", "Section Title")}{field("subtitle", "Section Subtitle")}
          {[1, 2, 3].map(i => (
            <div key={i} className="border-t border-border pt-3 mt-3 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Testimonial {i}</p>
              {field(`t${i}Quote`, "Quote", true)}{field(`t${i}Author`, "Author")}{field(`t${i}Desc`, "Description")}
            </div>
          ))}
        </>
      );
    case "cta":
      return <>{field("title", "Title")}{field("subtitle", "Subtitle")}{field("appStoreUrl", "App Store URL")}{field("playStoreUrl", "Google Play URL")}</>;
    default:
      return <p className="text-muted-foreground">No fields for this type.</p>;
  }
}
