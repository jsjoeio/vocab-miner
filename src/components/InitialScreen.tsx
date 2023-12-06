import React from "react"

export function InitialScreen() {
  const [textToMine, setTextToMine] = React.useState("")
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Enter the text you want to mine:
          </h1>
          <textarea
            className="textarea textarea-bordered textarea-lg block mx-auto my-6 w-96 h-64"
            placeholder="Un texto largo en español..."
            onChange={(e) => setTextToMine(e.target.value)}
          ></textarea>
          <button
            className="btn btn-primary btn-lg btn-wide font-bold"
            onClick={() => console.log(`text to mine:`, textToMine)}
          >
            Let's mine
            <span role="emoji">⛏️</span>
          </button>
        </div>
      </div>
    </div>
  )
}