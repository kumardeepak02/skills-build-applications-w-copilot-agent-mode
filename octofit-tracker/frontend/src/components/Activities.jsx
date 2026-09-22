import { ResourceState, displayValue, useCollection } from '../api.js'

function Activities() {
  const state = useCollection('activities')
  return <section><PageHeading title="Activities" subtitle={`${state.data.length} movement logs`} /><ResourceState {...state}>{state.data.length ? <div className="data-table"><div className="table-row table-head" style={{ gridTemplateColumns: '1.2fr 1fr 1fr 1fr' }}><span>Type</span><span>Duration</span><span>Calories</span><span>Completed</span></div>{state.data.map((activity) => <div className="table-row" style={{ gridTemplateColumns: '1.2fr 1fr 1fr 1fr' }} key={activity.id || activity._id}><strong>{displayValue(activity.type)}</strong><span>{displayValue(activity.durationMinutes)} min</span><span>{displayValue(activity.calories)} kcal</span><span>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : '—'}</span></div>)}</div> : <p className="empty-state">No activities recorded yet.</p>}</ResourceState></section>
}
function PageHeading({ title, subtitle }) { return <div className="page-heading"><div><p className="eyebrow">TRACKER</p><h2>{title}</h2><p>{subtitle}</p></div></div> }
export default Activities