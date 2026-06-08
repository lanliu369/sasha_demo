const RECENT_KEY = "lark-demo-nav-recent";
const FAVORITES_KEY = "lark-demo-nav-favorites";
const MAX_RECENT = 5;

export type NavBookmark = {
  path: string;
  label: string;
  sectionLabel?: string;
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function recordNavVisit(bookmark: NavBookmark) {
  const recent = readJson<NavBookmark[]>(RECENT_KEY, []);
  const next = [
    bookmark,
    ...recent.filter((item) => item.path !== bookmark.path),
  ].slice(0, MAX_RECENT);
  writeJson(RECENT_KEY, next);
}

export function getRecentVisits(): NavBookmark[] {
  return readJson<NavBookmark[]>(RECENT_KEY, []);
}

export function getFavorites(): NavBookmark[] {
  return readJson<NavBookmark[]>(FAVORITES_KEY, []);
}

export function isFavorite(path: string): boolean {
  return getFavorites().some((item) => item.path === path);
}

export function toggleFavorite(bookmark: NavBookmark): boolean {
  const favorites = getFavorites();
  const exists = favorites.some((item) => item.path === bookmark.path);
  const next = exists
    ? favorites.filter((item) => item.path !== bookmark.path)
    : [bookmark, ...favorites].slice(0, 12);
  writeJson(FAVORITES_KEY, next);
  return !exists;
}
