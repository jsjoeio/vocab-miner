import React from "react"

export function ReviewScreen() {
  const [textToMine, setTextToMine] = React.useState("")
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div>
            <span className="shadow-sm bg-secondary w-8 h-8 rounded-full inline-block border-2 border-black border-solid">
              4
            </span>
            <span className="ml-2">words remaining</span>
          </div>
          <div>
            <span className="text-6xl font-semibold my-16 block">comer</span>
          </div>
          <div className="flex flex-row justify-around">
            <button className="mx-2">I know this word</button>
            <button
              className="btn btn-primary btn-lg font-bold mx-2"
              onClick={() => console.log(`text to mine:`, textToMine)}
            >
              Mine word
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
