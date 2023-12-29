import React from "react"
import { ScreenState } from "../../App"
import { IgnoreWords } from "./IgnoreWords"
import { Textarea } from "./Textarea"
import { CUSTOM_EVENT_ADD_TEXT_TO_MINE } from "../../constants"

type InitialScreenProps = {
  setScreenState: (screenState: ScreenState) => void
  setTextToMine: (textToMine: string) => void
  setTextToIgnore: (textToIgnore: string) => void
  textToIgnore: string
  textToMine: string
}

export function InitialScreen({
  textToMine,
  setScreenState,
  setTextToMine,
  setTextToIgnore,
  textToIgnore,
}: InitialScreenProps) {
  const [touched, setTouched] = React.useState(false)

  return (
    <div className="hero pb-16 min-h-screen">
      <div className="">
        <div className="mx-4">
          <h1 className="text-5xl font-bold text-center mt-4">
            Enter the text you want to mine:
          </h1>
          <Textarea
            placeholder="Un texto largo en español..."
            onChange={(e) => {
              setTextToMine(e.target.value)
              if (!touched) {
                // User has added text to textarea, send analytics event
                // @ts-expect-error - this is for Beam analytics
                window.beam(CUSTOM_EVENT_ADD_TEXT_TO_MINE)
                setTouched(true)
              }
            }}
          />
          <IgnoreWords
            setTextToIgnore={setTextToIgnore}
            textToIgnore={textToIgnore}
          />
          <button
            disabled={!textToMine}
            className="btn btn-primary btn-lg btn-wide font-bold mx-auto block"
            onClick={() => setScreenState("review")}
          >
            Let's mine
            <span role="emoji">⛏️</span>
          </button>
        </div>
      </div>
    </div>
  )
}
