import { useEffect, useState } from 'react';
import { getApiUrl, normalizeListResponse } from '../lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(getApiUrl('users'))
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to load users: ${res.status}`);
        }
        const json = await res.json();
        setUsers(normalizeListResponse<User>(json.users ?? json));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section>
      <h2>Users</h2>
      <p>Using API base URL: {getApiUrl('users').replace('/api/users', '')}</p>
      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <strong>{user.name}</strong> ({user.role}) - {user.email}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Users;
