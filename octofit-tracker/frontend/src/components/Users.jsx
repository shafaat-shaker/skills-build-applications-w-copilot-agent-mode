import { useEffect, useState } from 'react';
import { fetchCollection, normalizeCollection } from '../lib/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const payload = await fetchCollection('/users');
        setUsers(normalizeCollection(payload));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <section>
      <h2 className="h4 fw-semibold">Users</h2>
      {isLoading && <p className="text-muted">Loading users…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!isLoading && !error && users.length === 0 && <p className="text-muted">No users available yet.</p>}
      <div className="row g-3 mt-2">
        {users.map((user) => (
          <div className="col-md-6" key={user._id || user.id || `${user.name}-${user.email}`}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h6 fw-semibold">{user.name || 'Unnamed user'}</h3>
                <p className="mb-1 text-muted">{user.email || 'No email provided'}</p>
                <p className="mb-0">{user.role || 'Member'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Users;
