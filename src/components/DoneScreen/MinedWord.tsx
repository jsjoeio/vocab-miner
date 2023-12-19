import { CopyToClipboard } from 'react-copy-to-clipboard';

interface MinedWordProps {
  word: string
  sentence: string | null
}
const highlightWord = (sentence: string, word: string) => {
  // Replace this with your actual logic to highlight the word in the sentence
  const regex = new RegExp(`\\b${word}\\b`, "gi")
  return sentence.replace(
    regex,
    (match) => `<span class="font-medium">${match}</span>`
  )
}

export function MinedWord({ word, sentence }: MinedWordProps) {
  const sentenceWithWordBolded = sentence ? highlightWord(sentence, word) : ""

  return (
    <li className="mb-4">
      <CopyToClipboard onCopy={() => window.alert("Copied to Clipboard")} text={word}>
        <div className="tooltip tooltip-right" data-tip="Click to Copy">
            <button className="font-semibold text-lg">{word}</button>
        </div>
      </CopyToClipboard>
      <span
        className="block italic font-light"
        dangerouslySetInnerHTML={{ __html: sentenceWithWordBolded }}
      />
    </li>
  )
}
