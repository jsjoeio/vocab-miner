import { VocabularyMiner } from "../../models/VocabularyMiner"
import { MinedWord } from "./MinedWord"

type DoneScreenProps = {
  wordsMined: Array<string>
  vocabMiner: VocabularyMiner
  wordsIgnored: Array<string>
}

export function DoneScreen({
  wordsMined,
  vocabMiner,
  wordsIgnored,
}: DoneScreenProps) {
  const allIgnoreWords = [...vocabMiner.getIgnoreWords(), ...wordsIgnored]
  const ignoreWordsAsString = allIgnoreWords.join(", ")
  return (
    <div className="hero min-h-screen bg-base-200 pt-4">
      <div className="hero-content text-center">
        <div className="max-w-md flex flex-col md:flex-row">
          <div className="glass mx-2 mb-4 md:pb-4 px-4">
            <h1 className="pt-4 mb-2">words mined</h1>
            <div className="divider w-5/6 mx-auto"></div>
            <ul className="text-left ml-4 md:mr-6">
              {wordsMined.map((word) => (
                <MinedWord
                  key={word}
                  word={word}
                  sentence={vocabMiner.getSentenceForWord(word)}
                />
              ))}
            </ul>
          </div>
          <div className="glass mx-2 pb-4 px-4">
            <h1 className="pt-4 mb-2">words ignored</h1>
            <div className="divider w-5/6 mx-auto"></div>
            <p className="italic">{ignoreWordsAsString}</p>
            <button
              className="btn btn-primary btn-md font-bold mx-auto block"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(ignoreWordsAsString)
                  console.log("Copying to clipboard was successful!")
                } catch (err) {
                  console.error("Could not copy text: ", err)
                }
              }}
            >
              Copy to clipboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
