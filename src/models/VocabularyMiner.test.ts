import { describe, expect, it } from "vitest"
import { splitBySentence, splitOnComma } from "./VocabularyMiner"

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
  it.todo("should split on exclamation mark")
})
