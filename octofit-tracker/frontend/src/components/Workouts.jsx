import { ResourceState, displayValue, useCollection } from '../api.js'

function Workouts() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/` : '/api/workouts/'
  const state = useCollection('workouts', endpoint)
  return <section><PageHeading title="Workouts" subtitle="Personalized sessions for every level" /><ResourceState {...state}>{state.data.length ? <div className="workout-grid">{state.data.map((workout) => <article className="info-card" key={workout.id || workout._id}><span className="tag">{displayValue(workout.difficulty)}</span><h3>{displayValue(workout.title)}</h3><p>{displayValue(workout.description)}</p><p>{displayValue(workout.durationMinutes)} minutes</p>{workout.exercises?.length ? <p>{workout.exercises.join(' · ')}</p> : null}</article>)}</div> : <p className="empty-state">No workouts available yet.</p>}</ResourceState></section>
}
function PageHeading({ title, subtitle }) { return <div className="page-heading"><div><p className="eyebrow">MOVE WELL</p><h2>{title}</h2><p>{subtitle}</p></div></div> }
export default Workouts