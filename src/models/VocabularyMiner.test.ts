import { describe, expect, it } from "vitest"
import {
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
})
