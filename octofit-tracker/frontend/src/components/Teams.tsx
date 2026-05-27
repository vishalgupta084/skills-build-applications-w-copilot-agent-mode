import { useEffect, useState } from 'react';
import { getApiUrl, normalizeListResponse } from '../lib/api';

interface Team {
  _id: string;
  name: string;
  description: string;
}

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(getApiUrl('teams'))
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to load teams: ${res.status}`);
        }
        const json = await res.json();
        setTeams(normalizeListResponse<Team>(json.teams ?? json));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {teams.map((team) => (
            <li key={team._id}>
              <strong>{team.name}</strong>: {team.description}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Teams;
