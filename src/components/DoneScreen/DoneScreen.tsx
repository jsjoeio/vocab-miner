import React from "react"
import { VocabularyMiner } from "../../models/VocabularyMiner"
import { ScreenState } from "../../App"
import { MinedWord } from "./MinedWord"
import { Stats } from "./Stats"

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name
    day: "numeric", // day of the month
    year: "numeric", // full year
  }

  const formatter = new Intl.DateTimeFormat("en-US", options)
  return formatter.format(date)
}

type DoneScreenProps = {
  wordsMined: Array<string>
  vocabMiner: VocabularyMiner
  wordsIgnored: Array<string>
  setTextToIgnore: (textToIgnore: string) => void
  totalWordsReviewed: number
  totalWordsInText: number
  // A function to call when the user clicks the "Mine more words?" button
  reset: () => void
}

export function DoneScreen({
  wordsMined,
  vocabMiner,
  wordsIgnored,
  setTextToIgnore,
  totalWordsReviewed,
  totalWordsInText,
  reset,
}: DoneScreenProps) {
  const [isCopied, setIsCopied] = React.useState(false)
  const allIgnoreWords = [...vocabMiner.getIgnoreWords(), ...wordsIgnored]
  const totalIgnoreWords = allIgnoreWords.length
  const totalNewWords = wordsMined.length
  const currentDate = new Date()
  const todayDateString = formatDate(currentDate)
  const ignoreWordsAsString = allIgnoreWords.join(", ")
  const hasIgnoreWords = ignoreWordsAsString.length !== 0

  React.useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false)
      }, 1500)
      return () => clearTimeout(timeout)
    }
  }, [isCopied])
  return (
    <div className="min-h-screen bg-base-200 pt-4 max-w-none">
      <div className="py-16 text-center">
        <div className="flex flex-col md:flex-row items-stretch md:justify-center">
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
            {hasIgnoreWords && (
              <button
                className="btn btn-primary btn-md font-bold mx-auto block mb-4"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(ignoreWordsAsString)
                    setIsCopied(true)
                  } catch (err) {
                    console.error("Could not copy text: ", err)
                  }
                }}
              >
                {isCopied ? "Copied!" : "Copy to clipboard"}
              </button>
            )}
          </div>
          <Stats
            totalIgnoreWords={totalIgnoreWords}
            totalNewWords={totalNewWords}
            todayDateString={todayDateString}
            totalWordsReviewed={totalWordsReviewed}
            totalWordsInText={totalWordsInText}
          />
        </div>
        <button
          className="btn btn-ghost block mx-auto mt-4"
          onClick={() => {
            if (hasIgnoreWords) {
              setTextToIgnore(ignoreWordsAsString)
            }
            reset()
          }}
        >
          Mine more words?
        </button>
      </div>
    </div>
  )
}
