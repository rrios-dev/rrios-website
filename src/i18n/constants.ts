import en from "./locales/en.json";
import es from "./locales/es.json";

export enum Locale {
  English = "en",
  Spanish = "es",
}

export const DEFAULT_LOCALE = Locale.Spanish;

export const DICTIONARIES = {
  [Locale.English]: en,
  [Locale.Spanish]: es,
} as const;

export const LOCALE_STATIC_PATHS = [
  {
    params: {
      lang: Locale.English,
    },
  },
  {
    params: {
      lang: Locale.Spanish,
    },
  },
];
