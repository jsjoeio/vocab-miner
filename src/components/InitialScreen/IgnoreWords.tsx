import React from "react"
import { Textarea } from "./Textarea"

type IgnoreWordsProps = {
  setTextToIgnore: (textToIgnore: string) => void
}

export function IgnoreWords({ setTextToIgnore }: IgnoreWordsProps) {
  const [showTextarea, setShowTextarea] = React.useState(false)
  return (
    <div className="mb-4 mx-auto ">
      {showTextarea ? (
        <div className="">
          <Textarea
            placeholder="vos,vas,manzana"
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
