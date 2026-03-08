/**
 * Prepend Vite's base URL to asset paths from CMS data.
 * Handles paths like "/assets/foo.jpg" → "/baller-score-42775b47/assets/foo.jpg"
 * Leaves absolute URLs (https://) and already-prefixed paths unchanged.
 */
export function assetUrl(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = import.meta.env.BASE_URL || "/";
  if (path.startsWith(base)) return path;
  // Ensure no double slashes
  return base.replace(/\/$/, "") + (path.startsWith("/") ? path : "/" + path);
}
