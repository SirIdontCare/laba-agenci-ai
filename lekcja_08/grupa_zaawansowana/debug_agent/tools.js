// =============================================================
// Narzedzia agenta (wycinek) — do debugowania w izolacji.
// Te same funkcje, ktore agent wolalby w tle. Wyjete z serwera,
// zebys mogl je uruchomic i debugowac bez calej aplikacji.
//
// UWAGA: sa tu 3 zasadzone bledy. `npm test` swieci na czerwono.
// Twoje zadanie (Modul 3): znajdz je i napraw — SAM, bez AI.
// =============================================================

/** Zwraca inicjaly z imienia i nazwiska, np. "Anna Nowak" -> "AN". */
export function initials(fullName) {
  return fullName
    .split(" ")
    .map((part) => part[0].toUpperCase())
    .join("");
}

/** Cena brutto z ceny netto i stawki VAT w procentach, np. (100, 23) -> 123. */
export function grossFromNet(net, vatPercent) {
  return net + net * vatPercent;
}

/** Skraca tekst do `max` znakow i dokleja "...", jesli byl dluzszy. */
export function truncate(text, max) {
  if (text.length < max) return text;
  return text.slice(0, max) + "...";
}
