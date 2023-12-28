import React from "react"

import {
  VocabularyMiner,
  removeDuplicateWords,
} from "../../models/VocabularyMiner"
import { MinedWord } from "./MinedWord"
import { Stats } from "./Stats"
import {
  CUSTOM_EVENT_COPY_IGNORE_WORDS,
  CUSTOM_EVENT_VIEW_DONE_SCREEN,
} from "../../constants"
import { StatsShareButton } from "./StatsShareButton"

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name
    day: "numeric", // day of the month
    year: "numeric", // full year
  }

  const formatter = new Intl.DateTimeFormat("en-US", options)
  return formatter.format(date)
}

function getTotalIgnoredWords(
  finalIgnoredWords: string[],
  totalWordsReviewed: string[]
): number {
  const IgnoredWordsUsed: Set<string> = new Set()

  for (let i = 0; i < finalIgnoredWords.length; i++) {
    for (let j = 0; j < totalWordsReviewed.length; j++) {
      if (
        finalIgnoredWords[i].toLowerCase() ===
        totalWordsReviewed[j].toLowerCase()
      )
        IgnoredWordsUsed.add(finalIgnoredWords[i])
    }
  }

  return IgnoredWordsUsed.size
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
  const [touched, setTouched] = React.useState(false)
  const [touchedIgnoreWordsCopyButton, setTouchedIgnoreWordsCopyButton] =
    React.useState(false)
  const allIgnoreWords = [...vocabMiner.getIgnoreWords(), ...wordsIgnored]
  const totalIgnoreWords = getTotalIgnoredWords(
    allIgnoreWords,
    vocabMiner.getTextWords()
  )
  const totalNewWords = wordsMined.length
  const currentDate = new Date()
  const todayDateString = formatDate(currentDate)
  const ignoreWordsAsString = removeDuplicateWords(allIgnoreWords.join(", "))
  const hasIgnoreWords = ignoreWordsAsString.length !== 0

  React.useEffect(() => {
    if (!touched) {
      // User has added viewed done screen, send analytics event
      // @ts-expect-error - this is for Beam analytics
      window.beam(CUSTOM_EVENT_VIEW_DONE_SCREEN)
      setTouched(true)
    }
  }, [touched])

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
        <div className="flex justify-between items-center mb-4">
          <button
            className="btn btn-ghost block mx-auto mt-4"
            onClick={() => {
              if (hasIgnoreWords) {
                const ignoreWordsWithoutDuplicates =
                  removeDuplicateWords(ignoreWordsAsString)
                setTextToIgnore(ignoreWordsWithoutDuplicates)
              }
              reset()
            }}
          >
            Mine more words?
          </button>
          <StatsShareButton />
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:justify-center">
          <div className="glass bg-base-200 mx-2 mb-4 md:mb-0 md:pb-4 px-4 min-h-64 lg:min-w-[400px]">
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
          <div className="glass bg-base-200 mx-2 mb-4 md:mb-0 md:pb-4 px-4 min-h-64 lg:min-w-[400px] lg:self-start">
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
                    if (!touchedIgnoreWordsCopyButton) {
                      // User has copied ignore buttosn to clipboard, send analytics event
                      // @ts-expect-error - this is for Beam analytics
                      window.beam(CUSTOM_EVENT_COPY_IGNORE_WORDS)
                      setTouchedIgnoreWordsCopyButton(true)
                    }
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
      </div>
    </div>
  )
}
