import { DEFAULT_LOCALE, Locale } from "./constants";

export function getLangFromUrl(url: URL) {
  const lang = url.pathname.match(/^\/(\w{2})/);

  return Object.values(Locale).includes(lang![1] as Locale)
    ? (lang?.[1] as Locale)
    : DEFAULT_LOCALE;
}

export function getURLWithLang(url: string, currentURL: URL) {
  const currentLang = getLangFromUrl(currentURL);
  const newURL = new URL(url, currentURL.origin);

  newURL.pathname = `/${currentLang}${newURL.pathname}`;

  return newURL;
}
