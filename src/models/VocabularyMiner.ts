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

const isWordChar = (char: string) => /\w|¿/.test(char)

export const highlightWord = (sentence: string, word: string) => {
  const escapedWord = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") // Escape special characters
  const wordRegex = new RegExp(
    `(?<!\\w)(${escapedWord}|${
      escapedWord.charAt(0).toUpperCase() + escapedWord.slice(1)
    })(?!\\w)`,
    "gi"
  )

  return sentence.replace(wordRegex, (match, offset, fullText) => {
    // Check if the characters before and after the match are word characters
    if (
      (offset > 0 && isWordChar(fullText[offset - 1])) ||
      (offset + match.length < fullText.length &&
        isWordChar(fullText[offset + match.length]))
    ) {
      // If they are, return the match unchanged
      return match
    } else {
      // If they aren't, highlight the match
      return `<span class="font-medium">${match}</span>`
    }
  })
}

export class VocabularyMiner {
  private text: string
  private textToIgnore: string

  constructor(text = "", textToIgnore = "") {
    this.text = text
    this.textToIgnore = textToIgnore
  }

  getTextWords(): string[] {
        // Split the text into sentences
        const sentences = splitBySentence(this.text)
        // Split each sentence into words
        const wordsBySentence = sentences.map((sentence) =>
          splitSentenceIntoWords(sentence)
        )

        return wordsBySentence[0]
  }

  getTotalWords(): number {
    // Split the text into sentences
    const sentences = splitBySentence(this.text)
    // Split each sentence into words
    const wordsBySentence = sentences.map((sentence) =>
      splitSentenceIntoWords(sentence)
    )
    return wordsBySentence.reduce((acc, words) => acc + words.length, 0)
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

      if (
        words.includes(word) ||
        // This way, we check for the word with the first letter capitalized
        // i.e. "Hola" instead of "hola"
        words.includes(word.charAt(0).toUpperCase() + word.slice(1))
      ) {
        return sentence.trim()
      }
    }

    return null
  }
}
