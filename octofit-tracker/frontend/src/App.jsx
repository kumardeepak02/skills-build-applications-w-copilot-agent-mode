import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  const links = [
    ['/', 'Overview'], ['/activities', 'Activities'], ['/leaderboard', 'Leaderboard'],
    ['/teams', 'Teams'], ['/users', 'Users'], ['/workouts', 'Workouts'],
  ]

  return <div className="app-shell">
    <header className="app-header"><div><p className="eyebrow">MERGINGTON HIGH</p><h1>OctoFit Tracker</h1></div><span className="status-dot">Training hub</span></header>
    <nav className="app-nav" aria-label="Primary navigation">{links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}</nav>
    <main className="app-main"><Routes>
      <Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} />
      <Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} />
      <Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes></main>
  </div>
}

function Overview() {
  return <section className="overview"><div className="intro-panel"><p className="eyebrow">WEEKLY SNAPSHOT</p><h2>Small steps. Stronger teams.</h2><p>Track the people, movement, and workouts powering this week&apos;s progress.</p></div><div className="overview-grid">
    <NavLink className="overview-card" to="/activities"><strong>Activities</strong><span>Review movement logs</span></NavLink>
    <NavLink className="overview-card" to="/leaderboard"><strong>Leaderboard</strong><span>See the standings</span></NavLink>
    <NavLink className="overview-card" to="/workouts"><strong>Workouts</strong><span>Find the next session</span></NavLink>
  </div></section>
}

export default App