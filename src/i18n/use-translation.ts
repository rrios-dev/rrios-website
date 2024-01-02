import { path } from "ramda";
import { DICTIONARIES } from "./constants";
import { getLangFromUrl } from "./utils";

const useTranslation = (url: URL) => {
  const lng = getLangFromUrl(url);
  const dictionary = DICTIONARIES[lng];

  if (!dictionary) throw new Error(`No dictionary found for ${lng}`);

  return function t(ns: string, key: string) {
    return (path([ns, ...key.split(".")], dictionary) ?? "") as string;
  };
};

export default useTranslation;
