type StatsProps = {
  totalWordsInText: number;
  totalWordsReviewed: number;
  todayDateString: string;
  totalNewWords: number;
  totalIgnoreWords: number;
};
export function Stats({
  totalWordsReviewed,
  totalWordsInText,
  todayDateString,
  totalIgnoreWords,
  totalNewWords,
}: StatsProps) {
  const percentNewWords = Math.round((totalNewWords / totalWordsInText) * 100);
  const percentIgnoreWords = Math.round(
    (totalIgnoreWords / totalWordsInText) * 100
  );
  return (
    <div className="mx-2">
      <div
        id="stats"
        className="stats stats-vertical glass bg-base-200 rounded-none"
      >
        <div className="stat">
          <div className="stat-title">Total Words</div>
          <div className="stat-value">{totalWordsInText}</div>
          <div className="stat-desc">{todayDateString}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Words Reviewed</div>
          <div className="stat-value">{totalWordsReviewed}</div>
          <div className="stat-desc">{todayDateString}</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Words</div>
          <div className="stat-value">{totalNewWords}</div>
          <div className="stat-desc">{percentNewWords}% of total</div>
        </div>

        <div className="stat">
          <div className="stat-title">Ignored Words</div>
          <div className="stat-value">{totalIgnoreWords}</div>
          <div className="stat-desc">{percentIgnoreWords}% of total</div>
        </div>
      </div>
    </div>
  );
}
