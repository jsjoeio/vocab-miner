import React from "react"
import { Textarea } from "./Textarea"
import { CUSTOM_EVENT_ADD_IGNORE_WORDS } from "../../constants"

type IgnoreWordsProps = {
  setTextToIgnore: (textToIgnore: string) => void
  textToIgnore: string
}

export function IgnoreWords({
  setTextToIgnore,
  textToIgnore,
}: IgnoreWordsProps) {
  const [showTextarea, setShowTextarea] = React.useState(false)
  const [touched, setTouched] = React.useState(false)
  // This is so that after the user is all done
  // and hits "Mine more words?", we can prefill
  // the ignore words.
  React.useEffect(() => {
    if (textToIgnore.length !== 0) {
      setTextToIgnore(textToIgnore)
    }
  }, [textToIgnore])
  return (
    <div className="mb-4 mx-auto ">
      {showTextarea ? (
        <div className="">
          <Textarea
            placeholder="vos, vas, manzana"
            value={textToIgnore}
            onChange={(e) => {
              setTextToIgnore(e.target.value)

              if (!touched) {
                // User has added text to textarea, send analytics event
                // @ts-expect-error - this is for Beam analytics
                window.beam(CUSTOM_EVENT_ADD_IGNORE_WORDS)
                setTouched(true)
              }
            }}
          />
          <button
            className="btn btn-sm hover:btn-error block mx-auto"
            onClick={() => setShowTextarea(false)}
          >
            cancel
          </button>
        </div>
      ) : (
        <button
          className="btn btn-ghost block mx-auto"
          onClick={() => setShowTextarea(true)}
        >
          Add ignore words?
        </button>
      )}
    </div>
  )
}
