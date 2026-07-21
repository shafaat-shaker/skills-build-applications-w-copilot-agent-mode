import { useEffect, useState } from 'react';
import { fetchCollection, normalizeCollection } from '../lib/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const payload = await fetchCollection('/teams/');
        setTeams(normalizeCollection(payload));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <section>
      <h2 className="h4 fw-semibold">Teams</h2>
      {isLoading && <p className="text-muted">Loading teams…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!isLoading && !error && teams.length === 0 && <p className="text-muted">No teams available yet.</p>}
      <div className="row g-3 mt-2">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id || team.id || team.name}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h6 fw-semibold">{team.name || 'Unnamed team'}</h3>
                <p className="mb-0 text-muted">{team.description || 'No team description provided.'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Teams;
