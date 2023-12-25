import React from "react"
import { Textarea } from "./Textarea"

type IgnoreWordsProps = {
  setTextToIgnore: (textToIgnore: string) => void
  textToIgnore: string
}

export function IgnoreWords({
  setTextToIgnore,
  textToIgnore,
}: IgnoreWordsProps) {
  const [showTextarea, setShowTextarea] = React.useState(false)
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
            onChange={(e) => setTextToIgnore(e.target.value)}
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
