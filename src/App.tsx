import React from "react"
import { InitialScreen } from "./components/InitialScreen"
import { ReviewScreen } from "./components/ReviewScreen/ReviewScreen"
import { DoneScreen } from "./components/DoneScreen/DoneScreen"
import { VocabularyMiner } from "./models/VocabularyMiner"

export type ScreenState = "initial" | "review" | "done"

function Screen({
  screenState,
  setScreenState,
  setTextToMine,
  wordsMined,
  setWordsMined,
  vocabMiner,
}: {
  screenState: ScreenState
  setScreenState: (newScreen: ScreenState) => void
  setTextToMine: (textToMine: string) => void
  wordsMined: Array<string>
  setWordsMined: React.Dispatch<React.SetStateAction<string[]>>
  vocabMiner: VocabularyMiner
}) {
  switch (screenState) {
    case "review":
      return (
        <ReviewScreen
          setScreenState={setScreenState}
          wordsToReview={vocabMiner.getWordsToReview()}
          setWordsMined={setWordsMined}
        />
      )
    case "done":
      return <DoneScreen wordsMined={wordsMined} vocabMiner={vocabMiner} />
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
  const vocabMiner = new VocabularyMiner(textToMine)

  return (
    <div className="prose">
      <Screen
        screenState={screenState}
        setScreenState={setScreenState}
        setTextToMine={setTextToMine}
        wordsMined={wordsMined}
        setWordsMined={setWordsMined}
        vocabMiner={vocabMiner}
      />
    </div>
  )
}

export default App
