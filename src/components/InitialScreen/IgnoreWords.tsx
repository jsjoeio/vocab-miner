import React from "react"

type IgnoreWordsProps = {
  setTextToIgnore: (textToIgnore: string) => void
}

export function IgnoreWords({ setTextToIgnore }: IgnoreWordsProps) {
  const [showTextarea, setShowTextarea] = React.useState(false)
  return (
    <div className="mb-4">
      {showTextarea ? (
        <div className="">
          <textarea
            className="textarea textarea-bordered textarea-lg block mx-auto mt-6 mb-4 w-96 h-64"
            placeholder="vos,vas,manzana"
            onChange={(e) => setTextToIgnore(e.target.value)}
          />
          <button
            className="btn btn-sm hover:btn-error"
            onClick={() => setShowTextarea(false)}
          >
            cancel
          </button>
        </div>
      ) : (
        <button className="btn btn-ghost" onClick={() => setShowTextarea(true)}>
          Add ignore words?
        </button>
      )}
    </div>
  )
}
