import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h1 className="display-6 fw-bold">OctoFit Tracker</h1>
        <p className="lead text-muted">
          A modern multi-tier fitness tracking experience for teams and individuals.
        </p>
        <ul className="list-group list-group-flush mt-4">
          <li className="list-group-item">React 19 + Vite frontend</li>
          <li className="list-group-item">Express + TypeScript backend</li>
          <li className="list-group-item">MongoDB and Mongoose data layer</li>
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <nav className="navbar navbar-expand-lg navbar-light bg-white rounded shadow-sm px-3 mb-4">
              <span className="navbar-brand fw-semibold">OctoFit Tracker</span>
              <div className="navbar-nav ms-auto">
                <NavLink className="nav-link" to="/">Home</NavLink>
                <NavLink className="nav-link" to="/users">Users</NavLink>
                <NavLink className="nav-link" to="/teams">Teams</NavLink>
                <NavLink className="nav-link" to="/activities">Activities</NavLink>
                <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
                <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
              </div>
            </nav>

            <div className="card shadow-sm">
              <div className="card-body">
                <p className="text-muted mb-4">
                  API URLs use Vite environment variables via <code>import.meta.env</code>. Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces support.
                </p>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/teams" element={<Teams />} />
                  <Route path="/activities" element={<Activities />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/workouts" element={<Workouts />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
