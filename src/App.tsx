import React from "react"
import { InitialScreen } from "./components/InitialScreen"
import { ReviewScreen } from "./components/ReviewScreen"

export type ScreenState = "initial" | "review"

function Screen({
  screenState,
  setScreenState,
}: {
  screenState: ScreenState
  setScreenState: (newScreen: ScreenState) => void
}) {
  switch (screenState) {
    case "review":
      return <ReviewScreen />
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
