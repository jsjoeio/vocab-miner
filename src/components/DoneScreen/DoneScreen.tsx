import { VocabularyMiner } from "../../models/VocabularyMiner"
import { MinedWord } from "./MinedWord"

type DoneScreenProps = {
  wordsMined: Array<string>
  vocabMiner: VocabularyMiner
}

export function DoneScreen({ wordsMined, vocabMiner }: DoneScreenProps) {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="artboard phone-1 glass">
            <h1 className="pt-4 mb-2">words mined</h1>
            <div className="divider w-5/6 mx-auto"></div>
            <ul className="text-left ml-4">
              {wordsMined.map((word) => (
                <MinedWord
                  key={word}
                  word={word}
                  sentence={vocabMiner.getSentenceForWord(word)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
