import React from "react"
import { highlightWord } from "../../models/VocabularyMiner"

interface MinedWordProps {
  word: string
  sentence: string | null
}


export function MinedWord({ word, sentence }: MinedWordProps) {
  const sentenceWithWordBolded = sentence ? highlightWord(sentence, word) : ""
  const [isCopied, setIsCopied] = React.useState(false)

  React.useEffect(() => {
    if (isCopied) {
      const timeout1 = setTimeout(() => {
        document.getElementsByClassName("minedWord")[0].classList.remove("tooltip", "tooltip-right")
      }, 1000)

      const timeout2 = setTimeout(() => {
        document.getElementsByClassName("minedWord")[0].classList.add("tooltip", "tooltip-right")
        setIsCopied(false)
      }, 2000)
      return () => {
        clearTimeout(timeout1)
        clearTimeout(timeout2)
      }
    }
  }, [isCopied])

  return (
    <li className="mb-4">
      <div
        className="tooltip tooltip-right minedWord"
        data-tip={isCopied ? "Copied!" : "Copy to clipboard"}
      >
        <button
          className="font-semibold text-lg"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(word)
              setIsCopied(true)
            } catch (err) {
              console.log("Could not copy text: ", err)
            }
          }}
        >
          {word}
        </button>
      </div>
      <span
        className="block italic font-light"
        dangerouslySetInnerHTML={{ __html: sentenceWithWordBolded }}
      />
    </li>
  )
}
