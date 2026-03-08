export type SectionType =
  | "hero"
  | "feature-block-side"
  | "feature-block-stacked"
  | "feature-grid"
  | "stats"
  | "platform"
  | "testimonials"
  | "cta";

export interface CmsSection {
  id: string;
  type: SectionType;
  order: number;
  data: Record<string, any>;
}

const STORAGE_KEY = "baller-cms-sections";

export function loadSections(): CmsSection[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function saveSections(sections: CmsSection[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export const SECTION_LABELS: Record<SectionType, string> = {
  hero: "Hero Section",
  "feature-block-side": "Feature Block (Side-by-Side)",
  "feature-block-stacked": "Feature Block (Stacked)",
  "feature-grid": "Feature Grid (3 Cards)",
  stats: "Stats Bar",
  platform: "Platform Section",
  testimonials: "Testimonials Carousel",
  cta: "CTA + Footer",
};

export function defaultDataForType(type: SectionType): Record<string, any> {
  switch (type) {
    case "hero":
      return { title: "", subtitle: "", videoUrl: "", bgImage: "" };
    case "feature-block-side":
      return { title: "", subtitle: "", body: "", image: "", imageAlt: "", reversed: false, badge: "", bullets: "" };
    case "feature-block-stacked":
      return { title: "", subtitle: "", body: "", image: "", imageAlt: "", badge: "", bullets: "" };
    case "feature-grid":
      return {
        title: "", subtitle: "",
        card1Title: "", card1Body: "",
        card2Title: "", card2Body: "",
        card3Title: "", card3Body: "",
      };
    case "stats":
      return {
        stat1Value: "", stat1Label: "",
        stat2Value: "", stat2Label: "",
        stat3Value: "", stat3Label: "",
        stat4Value: "", stat4Label: "",
      };
    case "platform":
      return { title: "", subtitle: "", image: "" };
    case "testimonials":
      return {
        title: "", subtitle: "",
        t1Quote: "", t1Author: "", t1Desc: "",
        t2Quote: "", t2Author: "", t2Desc: "",
        t3Quote: "", t3Author: "", t3Desc: "",
      };
    case "cta":
      return { title: "", subtitle: "", appStoreUrl: "#", playStoreUrl: "#" };
    default:
      return {};
  }
}
