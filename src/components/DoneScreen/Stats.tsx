export function Stats() {
  return (
    <div>
      <div className="stats stats-vertical shadow">
        <div className="stat">
          <div className="stat-title">Words Reviewed</div>
          <div className="stat-value">50</div>
          <div className="stat-desc">Dec 24, 2023</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Words</div>
          <div className="stat-value">2</div>
          <div className="stat-desc">5% of total</div>
        </div>

        <div className="stat">
          <div className="stat-title">Ignored Words</div>
          <div className="stat-value">48</div>
          <div className="stat-desc">89% of total</div>
        </div>
      </div>
    </div>
  )
}
