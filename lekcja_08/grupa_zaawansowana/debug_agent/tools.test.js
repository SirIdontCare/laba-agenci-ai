// =============================================================
// Testy narzedzi agenta. NIE ZMIENIAJ tego pliku.
// Testy opisuja, jak funkcje POWINNY dzialac.
// Twoje zadanie: popraw `tools.js`, az wszystkie beda zielone.
//
// Uruchom:  npm test
// =============================================================

import { test } from "node:test";
import assert from "node:assert/strict";
import { initials, grossFromNet, truncate } from "./tools.js";

// --- initials ---------------------------------------------------

test("initials: zwykle imie i nazwisko", () => {
  assert.equal(initials("Anna Nowak"), "AN");
});

test("initials: radzi sobie z podwojna spacja", () => {
  assert.equal(initials("Anna  Nowak"), "AN");
});

// --- grossFromNet -----------------------------------------------

test("grossFromNet: 100 zl netto + 23% VAT = 123 zl", () => {
  assert.equal(grossFromNet(100, 23), 123);
});

test("grossFromNet: 200 zl netto + 8% VAT = 216 zl", () => {
  assert.equal(grossFromNet(200, 8), 216);
});

// --- truncate ---------------------------------------------------

test("truncate: tekst rowny limitowi NIE jest skracany", () => {
  assert.equal(truncate("hello", 5), "hello");
});

test("truncate: tekst dluzszy niz limit jest skracany", () => {
  assert.equal(truncate("hello world", 5), "hello...");
});
