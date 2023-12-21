/**
 * Split a text on comma and return an array of words (filters out empty strings)
 *
 * exported for testing purposes only
 */
export function splitOnComma(text: string): string[] {
  return text
    .split(",")
    .filter((word) => word !== "")
    .map((word) => word.trim())
}

/**
 * Split a text on period, question mark and exclamation mark and return an array of sentences
 *
 * exported for testing purposes only
 */
export function splitBySentence(text: string): string[] {
  // Match periods, question marks, and exclamation marks using positive lookahead
  return text
    .split(/(?<=[.!?\n])(?=\s+)/)
    .map((sentence) => sentence.trim())
    .map((sentence) => sentence.replace(/^- /, "")) // removes - at the beginning of a sentence
}

/**
 * Splits a sentence into words
 *
 * exported for testing purposes only
 */
export function splitSentenceIntoWords(sentence: string): string[] {
  return sentence
    .split(/[\s,¡!¿\?;:"“”\[\]\(\)\{\}'‘’«»]+/)
    .filter((word) => word !== "")
    .map((word) => word.replace(/\.|…|-/g, ""))
}

export class VocabularyMiner {
  private text: string
  private textToIgnore: string

  constructor(text = "", textToIgnore = "") {
    this.text = text
    this.textToIgnore = textToIgnore
  }

  getIgnoreWords(): string[] {
    return splitOnComma(this.textToIgnore)
  }

  getWordsToReview(): string[] {
    const ignoreWords = this.getIgnoreWords()
    const sentences = splitBySentence(this.text)
    const wordsBySentence = sentences.map((sentence) =>
      splitSentenceIntoWords(sentence)
    )

    const uniqueWords: Set<string> = new Set()

    for (let i = 0; i < wordsBySentence.length; i++) {
      const words = wordsBySentence[i]
      for (let j = 0; j < words.length; j++) {
        const word = words[j].toLowerCase()
        if (
          word === "" ||
          /^\d+$/.test(word) ||
          (ignoreWords && ignoreWords.includes(word))
        )
          continue

        uniqueWords.add(word)
      }
    }

    return Array.from(uniqueWords)
  }

  getSentenceForWord(word: string): string | null {
    if (this.text === "" || word === "") return null
    const sentences = splitBySentence(this.text)

    for (const sentence of sentences) {
      const words = splitSentenceIntoWords(sentence)

      if (words.includes(word)) {
        return sentence.trim()
      }
    }

    return null
  }
}
