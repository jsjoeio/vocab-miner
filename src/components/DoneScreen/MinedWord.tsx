import { highlightWord } from "../../models/VocabularyMiner"

interface MinedWordProps {
  word: string
  sentence: string | null
}


export function MinedWord({ word, sentence }: MinedWordProps) {
  const sentenceWithWordBolded = sentence ? highlightWord(sentence, word) : ""

  return (
    <li className="mb-4">
      <span className="font-semibold text-lg">{word}</span>
      <span
        className="block italic font-light"
        dangerouslySetInnerHTML={{ __html: sentenceWithWordBolded }}
      />
    </li>
  )
}
