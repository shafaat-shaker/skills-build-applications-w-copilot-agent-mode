import { useEffect, useState } from 'react';
import { fetchCollection, normalizeCollection } from '../lib/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const payload = await fetchCollection('/activities');
        setActivities(normalizeCollection(payload));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadActivities();
  }, []);

  return (
    <section>
      <h2 className="h4 fw-semibold">Activities</h2>
      {isLoading && <p className="text-muted">Loading activities…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!isLoading && !error && activities.length === 0 && <p className="text-muted">No activities recorded yet.</p>}
      <div className="list-group mt-2">
        {activities.map((activity) => (
          <div className="list-group-item" key={activity._id || activity.id || activity.title}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h3 className="h6 fw-semibold mb-1">{activity.title || 'Activity'}</h3>
                <p className="mb-0 text-muted">{activity.description || 'No description provided.'}</p>
              </div>
              <span className="badge bg-primary">{activity.type || 'Activity'}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Activities;
