import React from "react"
import { ScreenState } from "../../App"
import { WordsRemaining } from "./WordsRemaining"
import { CurrentWord } from "./CurrentWord"

/*
Next Steps
- clean up verbiage here to match mining terminology
- figure out how to pass answers back up into the <DoneScreen /> (maybe lift state up)
*/

type ReviewScreenProps = {
  setScreenState: (screenState: ScreenState) => void
  wordsToReview: Array<string>
}

interface Answer {
  known: string[]
  unknown: string[]
}

export function ReviewScreen({
  setScreenState,
  wordsToReview,
}: ReviewScreenProps) {
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0)
  const [answers, setAnswers] = React.useState<Answer>({
    known: [],
    unknown: [],
  })

  const totalWords = wordsToReview.length

  React.useEffect(() => {
    if (currentWordIndex === totalWords) {
      setScreenState("done")
    }
  }, [currentWordIndex])

  const handleAnswer = (isKnown: boolean) => {
    const word = wordsToReview[currentWordIndex]

    if (isKnown) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        known: [...prevAnswers.known, word],
      }))
    } else {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        unknown: [...prevAnswers.unknown, word],
      }))
    }

    // Move to the next word
    setCurrentWordIndex((prevIndex) => prevIndex + 1)
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <WordsRemaining numOfWords={totalWords - (currentWordIndex + 1)} />
          <CurrentWord word={wordsToReview[currentWordIndex]} />
          <div className="flex flex-row justify-around">
            <button className="mx-2" onClick={() => handleAnswer(true)}>
              I know this word
            </button>
            <button
              className="btn btn-primary btn-lg font-bold mx-2"
              onClick={() => {
                handleAnswer(false)
              }}
            >
              Mine word
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
