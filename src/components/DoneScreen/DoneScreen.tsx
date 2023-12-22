import React from "react"
import { VocabularyMiner } from "../../models/VocabularyMiner"
import { MinedWord } from "./MinedWord"

type DoneScreenProps = {
  wordsMined: Array<string>
  vocabMiner: VocabularyMiner
  wordsIgnored: Array<string>
}

export function DoneScreen({
  wordsMined,
  vocabMiner,
  wordsIgnored,
}: DoneScreenProps) {
  const [isCopied, setIsCopied] = React.useState(false)
  const allIgnoreWords = [...vocabMiner.getIgnoreWords(), ...wordsIgnored]
  const ignoreWordsAsString = allIgnoreWords.join(", ")

  React.useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false)
      }, 1500)
      return () => clearTimeout(timeout)
    }
  }, [isCopied])
  return (
    <div className="hero min-h-screen bg-base-200 pt-4">
      <div className="hero-content text-center">
        <div className="flex flex-col md:flex-row items-stretch">
          <div className="glass mx-2 mb-4 md:mb-0 md:pb-4 px-4 min-h-64 lg:min-w-[400px]">
            <h1 className="pt-4 mb-2">words mined</h1>
            <div className="divider w-5/6 mx-auto"></div>
            <ul className="text-left ml-4 md:mr-6">
              {wordsMined.map((word) => (
                <MinedWord
                  key={word}
                  word={word}
                  sentence={vocabMiner.getSentenceForWord(word)}
                />
              ))}
            </ul>
          </div>
          <div className="glass mx-2 mb-4 md:mb-0 md:pb-4 px-4 min-h-64 lg:min-w-[400px] lg:self-start">
            <h1 className="pt-4 mb-2">words ignored</h1>
            <div className="divider w-5/6 mx-auto"></div>
            <p className="italic">{ignoreWordsAsString}</p>
            {ignoreWordsAsString.length !== 0 && (
              <button
                className="btn btn-primary btn-md font-bold mx-auto block mb-4"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(ignoreWordsAsString)
                    setIsCopied(true)
                    console.log("Copying to clipboard was successful!")
                  } catch (err) {
                    console.error("Could not copy text: ", err)
                  }
                }}
              >
                {isCopied ? "Copied!" : "Copy to clipboard"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
