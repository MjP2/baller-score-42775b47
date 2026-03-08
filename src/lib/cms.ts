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

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "sv", label: "Svenska" },
] as const;

export type LangCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

const STORAGE_KEY = "baller-cms-sections";

function storageKey(lang: LangCode): string {
  return lang === "en" ? STORAGE_KEY : `${STORAGE_KEY}-${lang}`;
}

export function cmsFileName(lang: LangCode): string {
  return lang === "en" ? "public/cms-data.json" : `public/cms-data-${lang}.json`;
}

export function loadSections(lang: LangCode = "en"): CmsSection[] {
  try {
    const raw = localStorage.getItem(storageKey(lang));
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function saveSections(sections: CmsSection[], lang: LangCode = "en") {
  localStorage.setItem(storageKey(lang), JSON.stringify(sections));
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

export function exportSectionsJson(sections: CmsSection[]): string {
  return JSON.stringify(sections, null, 2);
}

export function importSectionsJson(jsonString: string): CmsSection[] {
  const parsed = JSON.parse(jsonString);
  if (!Array.isArray(parsed)) throw new Error("Invalid format: expected an array");
  return parsed;
}
