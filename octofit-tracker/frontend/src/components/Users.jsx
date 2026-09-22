import { ResourceState, displayValue, useCollection } from '../api.js'

function Users() {
  const state = useCollection('users')
  return <section><PageHeading title="Users" subtitle={`${state.data.length} active profiles`} /><ResourceState {...state}>{state.data.length ? <div className="data-table"><div className="table-row table-head" style={{ gridTemplateColumns: '1.2fr 1.5fr .8fr 1fr' }}><span>Name</span><span>Email</span><span>Age</span><span>Level</span></div>{state.data.map((user) => <div className="table-row" style={{ gridTemplateColumns: '1.2fr 1.5fr .8fr 1fr' }} key={user.id || user._id}><strong>{displayValue(user.name)}</strong><span>{displayValue(user.email)}</span><span>{displayValue(user.age)}</span><span className="tag">{displayValue(user.fitnessLevel)}</span></div>)}</div> : <p className="empty-state">No users registered yet.</p>}</ResourceState></section>
}
function PageHeading({ title, subtitle }) { return <div className="page-heading"><div><p className="eyebrow">PEOPLE</p><h2>{title}</h2><p>{subtitle}</p></div></div> }
export default Users