import { ResourceState, displayValue, useCollection } from '../api.js'

function Teams() {
  const state = useCollection('teams')
  return <section><PageHeading title="Teams" subtitle="Find your training crew" /><ResourceState {...state}>{state.data.length ? <div className="team-grid">{state.data.map((team) => <article className="info-card" key={team.id || team._id}><h3>{displayValue(team.name)}</h3><p><span className="tag">{team.members?.length ?? 0} members</span></p><p style={{ color: team.color }}>Team color</p></article>)}</div> : <p className="empty-state">No teams created yet.</p>}</ResourceState></section>
}
function PageHeading({ title, subtitle }) { return <div className="page-heading"><div><p className="eyebrow">COMMUNITY</p><h2>{title}</h2><p>{subtitle}</p></div></div> }
export default Teams