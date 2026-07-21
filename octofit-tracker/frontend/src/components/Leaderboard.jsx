import { useEffect, useState } from 'react';
import { fetchCollection, normalizeCollection } from '../lib/api';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const payload = await fetchCollection('/leaderboard');
        setLeaders(normalizeCollection(payload));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2 className="h4 fw-semibold">Leaderboard</h2>
      {isLoading && <p className="text-muted">Loading leaderboard…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!isLoading && !error && leaders.length === 0 && <p className="text-muted">No leaderboard entries available yet.</p>}
      <div className="list-group mt-2">
        {leaders.map((entry, index) => (
          <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.id || `${entry.name}-${index}`}>
            <div>
              <h3 className="h6 fw-semibold mb-1">{entry.name || `Rank ${index + 1}`}</h3>
              <p className="mb-0 text-muted">{entry.team || 'No team'}</p>
            </div>
            <span className="badge bg-success">{entry.score ?? 0}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;
