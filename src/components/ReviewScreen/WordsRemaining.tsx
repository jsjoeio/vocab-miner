type WordsRemainingProps = {
  numOfWords: number;
};
export function WordsRemaining({ numOfWords }: WordsRemainingProps) {
  return (
    <div className="border border-primary-content px-6 py-2 inline-block rounded-full">
      <span className="">{numOfWords.toString()}</span>
      <span className="ml-1">words remaining</span>
    </div>
  );
}
