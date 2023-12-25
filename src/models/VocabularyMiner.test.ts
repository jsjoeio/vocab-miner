import { describe, expect, it } from "vitest"
import {
  highlightWord,
  splitBySentence,
  splitOnComma,
  splitSentenceIntoWords,
} from "./VocabularyMiner"

describe("splitOnComma", () => {
  it("should split on comma", () => {
    expect(splitOnComma("a,b,c")).toEqual(["a", "b", "c"])
  })
  it("should handle words with accents", () => {
    expect(splitOnComma("a,b,c,á,é,í,ó,ú,ñ")).toEqual([
      "a",
      "b",
      "c",
      "á",
      "é",
      "í",
      "ó",
      "ú",
      "ñ",
    ])
  })
  it("should ignore whitespaces", () => {
    expect(splitOnComma("saber, y")).toEqual(["saber", "y"])
  })
})

describe("splitBySentence", () => {
  it("should split on a period", () => {
    expect(
      splitBySentence(
        "Estaba escuchando música con los auriculares, ma. Sí, y cantando como si estuvieras en un concierto."
      )
    ).toEqual([
      `Estaba escuchando música con los auriculares, ma.`,
      `Sí, y cantando como si estuvieras en un concierto.`,
    ])
  })
  it("should split on question mark", () => {
    expect(splitBySentence("Allegra, ¿sabés qué hora es? Eh, no sé.")).toEqual([
      "Allegra, ¿sabés qué hora es?",
      "Eh, no sé.",
    ])
  })
  it("should split on exclamation mark", () => {
    expect(splitBySentence("¡Qué lindo día! ¿No?")).toEqual([
      "¡Qué lindo día!",
      "¿No?",
    ])
  })
  it("should split on line breaks", () => {
    expect(
      splitBySentence(`Hola
    Mundo`)
    ).toEqual(["Hola", "Mundo"])
  })
  it("should ignore -", () => {
    expect(
      splitBySentence(`- [hace fonomímica en inglés]
      [huesos crujen]`)
    ).toEqual(["[hace fonomímica en inglés]", "[huesos crujen]"])
  })
})

describe("splitSentenceIntoWords", () => {
  it("should a regular sentence", () => {
    expect(splitSentenceIntoWords("Estaba escuchando música")).toEqual([
      "Estaba",
      "escuchando",
      "música",
    ])
  })
  it("should handle words with accents", () => {
    expect(splitSentenceIntoWords("áéíóúñ")).toEqual(["áéíóúñ"])
  })
  it("should handle words with punctuation", () => {
    expect(splitSentenceIntoWords("¡Hola, Mundo!")).toEqual(["Hola", "Mundo"])
  })
  it("should handle brackets", () => {
    expect(splitSentenceIntoWords("[suspira]")).toEqual(["suspira"])
  })
  it("should remove ellipsis", () => {
    expect(splitSentenceIntoWords("dormir y…")).toEqual(["dormir", "y"])
  })
  it("should remove periods", () => {
    expect(splitSentenceIntoWords("yo.")).toEqual(["yo"])
  })
  it("should remove dashes", () => {
    expect(splitSentenceIntoWords("-yo.")).toEqual(["yo"])
  })
})

describe("highlightWord", () => {
  it("should highlight a word", () => {
    expect(highlightWord("Estaba escuchando música", "escuchando")).toEqual(
      'Estaba <span class="font-medium">escuchando</span> música'
    )
  })
  it("should handle accents", () => {
    expect(highlightWord("Estaba escuchando música", "música")).toEqual(
      'Estaba escuchando <span class="font-medium">música</span>'
    )
  })
  it("should handle different casing", () => {
    expect(highlightWord("Estaba escuchando música", "estaba")).toEqual(
      '<span class="font-medium">Estaba</span> escuchando música'
    )
  })
  it("should handle edge cases", () => {
    expect(highlightWord("¿Qué pasa?", "qué")).toEqual(
      '¿<span class="font-medium">Qué</span> pasa?'
    )
  })
  it("should highlight all instances in sentence", () => {
    expect(highlightWord("Estaba escuchando música y cantando y", "y")).toEqual(
      'Estaba escuchando música <span class="font-medium">y</span> cantando <span class="font-medium">y</span>'
    )
  })
  it("should not highlight words that are also part of other words", () => {
    expect(highlightWord("porque que", "que")).toEqual(
      `porque <span class="font-medium">que</span>`
    )
  })
})
