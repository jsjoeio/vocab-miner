import React from "react"
import { ScreenState } from "../../App"
import { WordsRemaining } from "./WordsRemaining"
import { CurrentWord } from "./CurrentWord"
import { EndReviewing } from "./EndReviewing"

type ReviewScreenProps = {
  setScreenState: (screenState: ScreenState) => void
  wordsToReview: Array<string>
  setWordsMined: React.Dispatch<React.SetStateAction<string[]>>
  setWordsIgnored: React.Dispatch<React.SetStateAction<string[]>>
}

interface Answer {
  ignore: string[]
  mine: string[]
}

export function ReviewScreen({
  setScreenState,
  wordsToReview,
  setWordsMined,
  setWordsIgnored,
}: ReviewScreenProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null)
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
      setWordsIgnored((currWords: Array<string>) => [...currWords, word])
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
      <div className="hero-content text-center w-full">
        <div className="w-full">
          <WordsRemaining numOfWords={totalWords - (currentWordIndex + 1)} />
          <CurrentWord word={wordsToReview[currentWordIndex]} />
          <div className="inline-flex flex-row justify-around max-w-xs mb-4">
            <button className="mx-2" onClick={() => handleAnswer(true)}>
              I know this word
            </button>
            <button
              ref={buttonRef}
              className="btn btn-primary btn-lg font-bold mx-2 relative"
              onClick={() => {
                buttonRef.current && spawnParticles(buttonRef.current, 13)

                handleAnswer(false)
              }}
            >
              Mine word
            </button>
          </div>
          <EndReviewing setScreenState={setScreenState} />
        </div>
      </div>
    </div>
  )
}

const spawnParticles = (parentEl: Element, numOfParticles: number) => {
  const div = document.createElement("div")
  div.classList.add("mine-particles")

  document.querySelector("body")?.appendChild(div)
  const parentElRect = parentEl.getBoundingClientRect()
  div.style.left = parentElRect.left + parentElRect.width / 4 + "px"
  div.style.top = parentElRect.top + "px"
  for (let i = 0; i < numOfParticles; i++) {
    const span = document.createElement("span")
    span.classList.add("mine-particle")
    const newSpan = div.appendChild(span)
    const deg = i * (360 / numOfParticles) + Math.floor(Math.random() * 15)
    const height = 20 + Math.floor(Math.random() * 19)
    const width = 2 + Math.floor(Math.random() * 4)
    newSpan.style.height = height + "px"
    newSpan.style.width = width + "px"
    newSpan.style.transform = "rotate(" + deg + "deg)"
  }
  window.requestAnimationFrame(function () {
    Array.from(div.querySelectorAll("span")).forEach((el) => {
      const trasY = -50 - Math.floor(Math.random() * 60)
      el.style.transform += "scaleY(0.5) translateY(" + trasY + "px)"
      el.style.backgroundColor = "oklch(23.57% 0.066235 313.19 / 80%)"
      el.style.opacity = "0"
    })
    window.setTimeout(function () {
      document.body.removeChild(div)
    }, 4000)
  })
}
