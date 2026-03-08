export type TranslationKey = string;

const translations: Record<string, Record<string, string>> = {
  en: {
    "nav.features": "Features",
    "nav.dashboard": "Live Dashboard",
    "nav.stats": "Stats",
    "nav.testimonials": "Testimonials",
    "nav.download": "Download",

    "hero.title": "Focus on the Match, Not the Score.",
    "hero.subtitle": "The ultimate Padel scoring app for your phone and watch. Track every point, analyze your stats, and share your game live.",
    "hero.appstore": "Download on the App Store",
    "hero.playstore": "Get it on Google Play",

    "features.scoring.title": "Score Like a Pro, On Any Device",
    "features.scoring.body": "Whether you prefer our revolutionary player-drag 'Baller Mode' on your phone or simple taps on your watch, scoring has never been faster. Spend less time on your device and more time in the game.",

    "features.dashboard.title": "Share Every Moment, Live",
    "features.dashboard.body": "Let friends, family, and your coach follow along in real-time. With a single tap, generate a unique link to a beautiful web dashboard displaying your match score, point-by-point. No sign-up required for viewers.",

    "features.stats.title": "Uncover Your Winning Edge",
    "features.stats.body": "Go beyond the final score. Analyze detailed post-match statistics to understand your strengths and weaknesses. Track everything from aces and double faults to game-winning points.",

    "platform.title": "Play Everywhere.",
    "platform.subtitle": "Available on iOS, Android, watchOS, and Wear OS.",

    "testimonials.title": "Trusted by Players Worldwide",
    "testimonials.card1.quote": "Baller Score changed how our club tracks matches. The live dashboard is a game-changer for our tournaments!",
    "testimonials.card1.author": "Carlos Méndez",
    "testimonials.card1.desc": "Club Manager, Madrid",
    "testimonials.card2.quote": "I love the watch app. I just tap my wrist between points — no more fumbling with my phone on court.",
    "testimonials.card2.author": "Sofia Andersson",
    "testimonials.card2.desc": "Competitive Player, Stockholm",
    "testimonials.card3.quote": "The statistics feature helped me identify that I was losing 70% of my deuce points. Now I train specifically for those moments.",
    "testimonials.card3.author": "Marco Rossi",
    "testimonials.card3.desc": "Amateur Player, Milan",
    "testimonials.card4.quote": "Simple, beautiful, and it just works. Best scoring app I've used across both padel and tennis.",
    "testimonials.card4.author": "Ana Torres",
    "testimonials.card4.desc": "Tennis & Padel Coach, Barcelona",

    "cta.title": "Ready to Elevate Your Game?",
    "cta.subtitle": "Download Baller Score today and never lose track of the score again.",

    "footer.privacy": "Privacy Policy",
    "footer.contact": "Contact Us",
    "footer.rights": "© 2026 Baller Score. All rights reserved.",
  },
};

let currentLocale = "en";

export function t(key: string): string {
  return translations[currentLocale]?.[key] ?? key;
}

export function setLocale(locale: string) {
  currentLocale = locale;
}
