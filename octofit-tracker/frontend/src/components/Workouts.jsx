import { useEffect, useState } from 'react';
import { fetchCollection, normalizeCollection } from '../lib/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const payload = await fetchCollection('/workouts');
        setWorkouts(normalizeCollection(payload));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2 className="h4 fw-semibold">Workouts</h2>
      {isLoading && <p className="text-muted">Loading workouts…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!isLoading && !error && workouts.length === 0 && <p className="text-muted">No workouts available yet.</p>}
      <div className="row g-3 mt-2">
        {workouts.map((workout) => (
          <div className="col-md-6" key={workout._id || workout.id || workout.name}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h6 fw-semibold">{workout.name || 'Workout'}</h3>
                <p className="mb-0 text-muted">{workout.description || 'No workout details available.'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Workouts;
