import React from "react"
import { InitialScreen } from "./components/InitialScreen"
import { ReviewScreen } from "./components/ReviewScreen"
import { DoneScreen } from "./components/DoneScreen"

export type ScreenState = "initial" | "review" | "done"

function Screen({
  screenState,
  setScreenState,
}: {
  screenState: ScreenState
  setScreenState: (newScreen: ScreenState) => void
}) {
  switch (screenState) {
    case "review":
      return <ReviewScreen setScreenState={setScreenState} />
    case "done":
      return <DoneScreen />
    case "initial":
    default:
      return <InitialScreen setScreenState={setScreenState} />
  }
}

function App() {
  const [screenState, setScreenState] = React.useState<ScreenState>("initial")
  return (
    <div className="prose">
      <Screen screenState={screenState} setScreenState={setScreenState} />
    </div>
  )
}

export default App
