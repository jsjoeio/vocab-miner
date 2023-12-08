import React from "react"
import { InitialScreen } from "./components/InitialScreen"
import { ReviewScreen } from "./components/ReviewScreen/ReviewScreen"
import { DoneScreen } from "./components/DoneScreen"
import { VocabularyMiner } from "./models/VocabularyMiner"

export type ScreenState = "initial" | "review" | "done"

function Screen({
  screenState,
  setScreenState,
  textToMine,
  setTextToMine,
  wordsMined,
  setWordsMined,
}: {
  screenState: ScreenState
  setScreenState: (newScreen: ScreenState) => void
  textToMine: string
  setTextToMine: (textToMine: string) => void
  wordsMined: Array<string>
  setWordsMined: (words: Array<string>) => void
}) {
  switch (screenState) {
    case "review":
      const vocabMiner = new VocabularyMiner(textToMine)
      return (
        <ReviewScreen
          setScreenState={setScreenState}
          wordsToReview={vocabMiner.getWordsToReview()}
          setWordsMined={setWordsMined}
        />
      )
    case "done":
      return <DoneScreen wordsMined={wordsMined} />
    case "initial":
    default:
      return (
        <InitialScreen
          setScreenState={setScreenState}
          setTextToMine={setTextToMine}
        />
      )
  }
}

function App() {
  const [screenState, setScreenState] = React.useState<ScreenState>("initial")
  const [textToMine, setTextToMine] = React.useState("")
  const [wordsMined, setWordsMined] = React.useState<string[]>([])
  return (
    <div className="prose">
      <Screen
        screenState={screenState}
        setScreenState={setScreenState}
        textToMine={textToMine}
        setTextToMine={setTextToMine}
        wordsMined={wordsMined}
        setWordsMined={setWordsMined}
      />
    </div>
  )
}

export default App
