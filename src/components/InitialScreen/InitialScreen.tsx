import { ScreenState } from "../../App"
import { IgnoreWords } from "./IgnoreWords"
import { Textarea } from "./Textarea"

type InitialScreenProps = {
  setScreenState: (screenState: ScreenState) => void
  setTextToMine: (textToMine: string) => void
  setTextToIgnore: (textToIgnore: string) => void
}

export function InitialScreen({
  setScreenState,
  setTextToMine,
  setTextToIgnore,
}: InitialScreenProps) {
  return (
    <div className="hero pb-16">
      <div className="">
        <div className="mx-4">
          <h1 className="text-5xl font-bold text-center mt-4">
            Enter the text you want to mine:
          </h1>
          <Textarea
            placeholder="Un texto largo en español..."
            onChange={(e) => setTextToMine(e.target.value)}
          />
          <IgnoreWords setTextToIgnore={setTextToIgnore} />
          <button
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
