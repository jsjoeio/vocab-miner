export class VocabularyMiner {
  private text: string

  constructor(text = "") {
    this.text = text
  }

  getWordsToReview(ignoreWords?: string[]): string[] {
    const sentences = this.text.toLowerCase().split(/[\.\?!]+/)
    const wordsBySentence = sentences.map((sentence) =>
      sentence.split(/[\s,¡!¿\?;:"“”\[\]\(\)\{\}'‘’«»]+/)
    )

    const uniqueWords: Set<string> = new Set()

    for (let i = 0; i < wordsBySentence.length; i++) {
      const words = wordsBySentence[i]
      for (let j = 0; j < words.length; j++) {
        const word = words[j]
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
    const sentences = this.text.split(/[\.\?!]+/)

    for (const sentence of sentences) {
      const words = sentence.split(/[\s,¡!¿\?;:"“”\[\]\(\)\{\}'‘’«»]+/)

      if (words.includes(word)) {
        return sentence.trim()
      }
    }

    return null
  }
}
