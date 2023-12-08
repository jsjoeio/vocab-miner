import React from "react"
import { ScreenState } from "../../App"
import { WordsRemaining } from "./WordsRemaining"
import { CurrentWord } from "./CurrentWord"

type ReviewScreenProps = {
  setScreenState: (screenState: ScreenState) => void
  wordsToReview: Array<string>
  setWordsMined: (words: Array<string>) => void
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
  const [answers, setAnswers] = React.useState<Answer>({
    ignore: [],
    mine: [],
  })

  const totalWords = wordsToReview.length

  React.useEffect(() => {
    if (currentWordIndex === totalWords) {
      setWordsMined(answers.mine)
      setScreenState("done")
    }
  }, [currentWordIndex])

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
