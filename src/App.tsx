import React from "react"
import { InitialScreen } from "./components/InitialScreen/InitialScreen"
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
  setTextToIgnore,
  wordsIgnored,
  setWordsIgnored,
  textToIgnore,
  textToMine,
}: {
  screenState: ScreenState
  setScreenState: (newScreen: ScreenState) => void
  setTextToMine: (textToMine: string) => void
  setTextToIgnore: (textToIgnore: string) => void
  wordsMined: Array<string>
  setWordsMined: React.Dispatch<React.SetStateAction<string[]>>
  textToIgnore: string
  wordsIgnored: Array<string>
  setWordsIgnored: React.Dispatch<React.SetStateAction<string[]>>
  vocabMiner: VocabularyMiner
  textToMine: string
}) {
  switch (screenState) {
    case "review":
      return (
        <ReviewScreen
          setScreenState={setScreenState}
          wordsToReview={vocabMiner.getWordsToReview()}
          setWordsMined={setWordsMined}
          setWordsIgnored={setWordsIgnored}
        />
      )
    case "done":
      return (
        <DoneScreen
          wordsMined={wordsMined}
          vocabMiner={vocabMiner}
          wordsIgnored={wordsIgnored}
          setTextToIgnore={setTextToIgnore}
          totalWordsReviewed={vocabMiner.getWordsToReview().length}
          totalWordsInText={vocabMiner.getTotalWords()}
          reset={() => {
            setWordsMined([])
            setScreenState("initial")
          }}
        />
      )
    case "initial":
    default:
      return (
        <InitialScreen
          setScreenState={setScreenState}
          setTextToMine={setTextToMine}
          setTextToIgnore={setTextToIgnore}
          textToIgnore={textToIgnore}
          textToMine={textToMine}
        />
      )
  }
}

function App() {
  const [screenState, setScreenState] = React.useState<ScreenState>("initial")
  const [textToMine, setTextToMine] = React.useState("")
  const [wordsMined, setWordsMined] = React.useState<string[]>([])
  const [wordsIgnored, setWordsIgnored] = React.useState<string[]>([])
  const [textToIgnore, setTextToIgnore] = React.useState<string>("")
  const vocabMiner = new VocabularyMiner(textToMine, textToIgnore)

  return (
    <div className="prose mx-auto">
      <Screen
        screenState={screenState}
        setScreenState={setScreenState}
        setTextToMine={setTextToMine}
        wordsMined={wordsMined}
        setWordsMined={setWordsMined}
        wordsIgnored={wordsIgnored}
        setWordsIgnored={setWordsIgnored}
        textToIgnore={textToIgnore}
        textToMine={textToMine}
        vocabMiner={vocabMiner}
        setTextToIgnore={setTextToIgnore}
      />
    </div>
  )
}

export default App
