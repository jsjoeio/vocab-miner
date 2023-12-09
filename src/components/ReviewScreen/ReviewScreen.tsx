import React from "react"
import { ScreenState } from "../../App"
import { WordsRemaining } from "./WordsRemaining"
import { CurrentWord } from "./CurrentWord"

type ReviewScreenProps = {
  setScreenState: (screenState: ScreenState) => void
  wordsToReview: Array<string>
  setWordsMined: React.Dispatch<React.SetStateAction<string[]>>
}

interface Answer {
  ignore: string[]
  mine: string[]
}

export function ReviewScreen({
  setScreenState,
  wordsToReview,
  setWordsMined,
}: ReviewScreenProps) {
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0)
  const [_, setAnswers] = React.useState<Answer>({
    ignore: [],
    mine: [],
  })

  const totalWords = wordsToReview.length

  const handleAnswer = (isKnown: boolean) => {
    const word = wordsToReview[currentWordIndex]

    if (isKnown) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        ignore: [...prevAnswers.ignore, word],
      }))
    } else {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        mine: [...prevAnswers.mine, word],
      }))
      setWordsMined((currWords: Array<string>) => [...currWords, word])
    }

    const newWordIndex = currentWordIndex + 1
    setCurrentWordIndex(newWordIndex)
    // Since set state runs async, we need to get the
    // actual value here and use it in our check below
    // to prevent a flash of the UI
    if (newWordIndex === totalWords) {
      setScreenState("done")
    }
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
