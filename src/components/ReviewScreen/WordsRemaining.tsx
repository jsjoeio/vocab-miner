type WordsRemainingProps = {
  numOfWords: number
}
export function WordsRemaining({ numOfWords }: WordsRemainingProps) {
  return (
    <div>
      <span className="shadow-sm bg-secondary w-8 h-8 rounded-full inline-block border-2 border-black border-solid">
        {numOfWords.toString()}
      </span>
      <span className="ml-2">words remaining</span>
    </div>
  )
}
