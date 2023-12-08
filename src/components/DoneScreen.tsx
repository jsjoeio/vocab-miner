
type DoneScreenProps = {
  wordsMined: Array<string>
}

export function DoneScreen({wordsMined}: DoneScreenProps) {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="artboard phone-1 glass">
            <h1 className="pt-4 mb-2">words mined</h1>
            <div className="divider w-5/6 mx-auto"></div>
            <ul className="text-left ml-4">
              {wordsMined.map((word) => (
                <li key={word}>{word}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
