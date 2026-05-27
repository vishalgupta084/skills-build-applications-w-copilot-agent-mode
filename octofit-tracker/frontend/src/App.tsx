import './App.css'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { API_BASE_URL, CODESPACE_NAME } from './lib/api'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/workouts', label: 'Workouts' },
  { path: '/leaderboard', label: 'Leaderboard' }
]

const Home = () => (
  <section>
    <h2>OctoFit Tracker</h2>
    <p>
      This presentation tier uses React 19, Vite, and <code>react-router-dom</code> for navigation.
    </p>
    <p>
      Current API base URL:
      <code>{API_BASE_URL}</code>
    </p>
    <p>
      <strong>Note:</strong> define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use the GitHub Codespaces URL.
      If it is unset, the app safely falls back to <code>http://localhost:8000</code>.
    </p>
    <p>Example endpoint: <code>{`${API_BASE_URL}/api/users`}</code></p>
    {CODESPACE_NAME ? (
      <p>Codespaces mode enabled for <code>{CODESPACE_NAME}</code>.</p>
    ) : (
      <p>Localhost mode enabled.</p>
    )}
  </section>
)

const App = () => (
  <BrowserRouter>
    <div className="app-shell">
      <header>
        <h1>OctoFit Tracker</h1>
        <nav>
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => (isActive ? 'active' : '')}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
      <footer>
        <small>
          Requires <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces URL support.
        </small>
      </footer>
    </div>
  </BrowserRouter>
)

export default App
