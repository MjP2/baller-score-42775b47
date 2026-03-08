import { Apple } from "lucide-react";

interface StoreBadgesProps {
  appStoreUrl?: string;
  playStoreUrl?: string;
}

export default function StoreBadges({ appStoreUrl, playStoreUrl }: StoreBadgesProps) {
  if (!appStoreUrl && !playStoreUrl) return null;

  return (
    <div className="flex flex-row gap-3 items-center">
      {appStoreUrl && (
        <a
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 border border-foreground/20 rounded-xl px-5 py-2.5 hover:bg-foreground/5 transition-colors"
        >
          <Apple size={20} className="text-foreground" />
          <div className="text-left">
            <div className="text-[9px] text-muted-foreground leading-none">Download on the</div>
            <div className="text-sm font-semibold text-foreground leading-tight">App Store</div>
          </div>
        </a>
      )}
      {playStoreUrl && (
        <a
          href={playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 border border-foreground/20 rounded-xl px-5 py-2.5 hover:bg-foreground/5 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-foreground" fill="currentColor">
            <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4l2.834 1.639a1 1 0 0 1 0 1.74l-2.834 1.64-2.532-2.533 2.532-2.486zM5.864 2.658L16.8 9.291l-2.302 2.302-8.634-8.935z" />
          </svg>
          <div className="text-left">
            <div className="text-[9px] text-muted-foreground leading-none">Get it on</div>
            <div className="text-sm font-semibold text-foreground leading-tight">Google Play</div>
          </div>
        </a>
      )}
    </div>
  );
}
