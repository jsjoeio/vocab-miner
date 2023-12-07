type CurrentWordProps = {
  word: string
}

export function CurrentWord({ word }: CurrentWordProps) {
  return (
    <div>
      <span className="text-6xl font-semibold my-16 block">{word}</span>
    </div>
  )
}
