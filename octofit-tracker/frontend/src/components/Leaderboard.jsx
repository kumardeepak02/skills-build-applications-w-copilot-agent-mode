import { ResourceState, displayValue, useCollection } from '../api.js'

function Leaderboard() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/` : '/api/leaderboard/'
  const state = useCollection('leaderboard', endpoint)
  const entries = [...state.data].sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))
  return <section><PageHeading title="Leaderboard" subtitle="September 2026 standings" /><ResourceState {...state}>{entries.length ? <div className="data-table">{entries.map((entry) => <div className="table-row" style={{ gridTemplateColumns: '70px 1fr 120px' }} key={entry.id || entry._id}><strong>#{displayValue(entry.rank)}</strong><span>{displayValue(entry.user?.name || entry.user)}</span><strong>{displayValue(entry.points)} pts</strong></div>)}</div> : <p className="empty-state">No leaderboard entries yet.</p>}</ResourceState></section>
}
function PageHeading({ title, subtitle }) { return <div className="page-heading"><div><p className="eyebrow">COMPETE</p><h2>{title}</h2><p>{subtitle}</p></div></div> }
export default Leaderboard