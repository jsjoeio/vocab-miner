import React from "react"

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
  const [isCopied, setIsCopied] = React.useState(false)

  React.useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [isCopied])

  return (
    <li className="mb-4">
      <div
        className="tooltip tooltip-right"
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
