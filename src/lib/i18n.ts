export type TranslationKey = string;

const translations: Record<string, Record<string, string>> = {
  en: {
    "nav.features": "Features",
    "nav.dashboard": "Live Dashboard",
    "nav.stats": "Stats",
    "nav.testimonials": "Testimonials",
    "nav.download": "Download",

    "hero.title": "Focus on the Match, Not the Score.",
    "hero.subtitle": "The ultimate scoring app for Padel, Tennis, and Pickleball. Track every point on your phone or watch, analyze your stats, and share your victories.",
    "hero.appstore": "Download on the App Store",
    "hero.playstore": "Get it on Google Play",
    "hero.sport.padel": "Padel",
    "hero.sport.tennis": "Tennis",
    "hero.sport.pickleball": "Pickleball",
    "hero.platform.ios": "iOS & watchOS",
    "hero.platform.android": "Android & Wear OS",

    "featuregrid.title": "Everything You Need to Win",
    "featuregrid.subtitle": "Powerful features designed for competitive players",
    "featuregrid.sync.title": "Multi-Platform Sync",
    "featuregrid.sync.body": "Seamlessly sync your matches across iPhone, Apple Watch, Android phones, and Wear OS watches.",
    "featuregrid.scoring.title": "Smart Score Tracking",
    "featuregrid.scoring.body": "Intuitive tap-to-score interface designed for mid-game use. Track points, games, and sets with a glance.",
    "featuregrid.voice.title": "Voice Announcements",
    "featuregrid.voice.body": "Let the app call the score so you never lose focus on the ball. Customizable voice settings for any environment.",

    "features.scoring.title": "Score Like a Pro, On Any Device",
    "features.scoring.body": "Whether you prefer our revolutionary player-drag 'Baller Mode' on your phone or simple taps on your watch, scoring has never been faster. Spend less time on your device and more time in the game.",

    "features.dashboard.title": "Real-Time Live Dashboard",
    "features.dashboard.subtitle": "Share the action as it happens",
    "features.dashboard.body": "Generate a unique QR code or shareable link for any match. Friends, family, and fans can watch your score update live from anywhere in the world — no app required for viewers.",
    "features.dashboard.bullet1": "Live score updates",
    "features.dashboard.bullet2": "Match statistics",
    "features.dashboard.bullet3": "Shareable links",
    "features.dashboard.bullet4": "No app needed for viewers",

    "features.stats.title": "Deep Analytics",
    "features.stats.subtitle": "Know your game inside and out",
    "features.stats.body": "Track your performance over time with comprehensive statistics. Win/loss ratios, point distributions, and trends help you identify strengths and areas for improvement.",

    "stats.matches": "Matches Tracked",
    "stats.matches.value": "10,000+",
    "stats.players": "Active Players",
    "stats.players.value": "5,000+",
    "stats.countries": "Countries",
    "stats.countries.value": "45+",
    "stats.rating": "App Rating",
    "stats.rating.value": "4.9★",

    "platform.title": "Play Everywhere.",
    "platform.subtitle": "Available on iOS, Android, watchOS, and Wear OS.",

    "testimonials.title": "What Players Say",
    "testimonials.subtitle": "Join thousands of happy players",
    "testimonials.card1.quote": "Baller Score has completely changed how I track my matches. The watch app is incredibly convenient during intense rallies.",
    "testimonials.card1.author": "Maria G.",
    "testimonials.card1.desc": "Competitive Player",
    "testimonials.card2.quote": "The live dashboard feature is a game-changer. My family can follow my tournament matches in real-time from another country!",
    "testimonials.card2.author": "Carlos R.",
    "testimonials.card2.desc": "Club Champion",
    "testimonials.card3.quote": "Finally, an app that understands racket sport scoring. The stats help me analyze my game and improve week over week.",
    "testimonials.card3.author": "Sofia L.",
    "testimonials.card3.desc": "Weekend Warrior",
    "testimonials.card4.quote": "Simple, beautiful, and it just works. Best scoring app I've used across both padel and tennis.",
    "testimonials.card4.author": "Ana Torres",
    "testimonials.card4.desc": "Tennis & Padel Coach, Barcelona",

    "cta.title": "Ready to Elevate Your Game?",
    "cta.subtitle": "Download Baller Score now and never lose track of a point again.",

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
