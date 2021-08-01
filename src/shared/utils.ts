import btoa from "btoa";
import atob from "atob";
import utf8 from "utf8";
import { Language } from "../redux/language";

export function encodeObjectToBase64(object: Record<string, any>): string {
  return btoa(utf8.encode(JSON.stringify(object)));
}

export function decodeBase64ToObject<T>(base64hash: string): T {
  return JSON.parse(utf8.decode(atob(base64hash))) as T;
}

export function getLanguageId(languages: Language[]): Language["id"] {
  const ids = languages.map((l) => l.id);
  const max = Math.max(...ids);
  return Number.isFinite(max) ? max : 0;
}

export function getLanguageSort(languages: Language[]): Language["order"] {
  const orders = languages.map((l) => l.order);
  const max = Math.max(...orders);
  return Number.isFinite(max) ? max : 0;
}
