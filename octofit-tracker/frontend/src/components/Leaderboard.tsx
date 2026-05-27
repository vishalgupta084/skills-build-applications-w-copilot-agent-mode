import { useEffect, useState } from 'react';
import { getApiUrl, normalizeListResponse } from '../lib/api';

interface LeaderboardEntry {
  _id: string;
  rank: number;
  points: number;
  user?: { name: string };
  team?: { name: string };
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(getApiUrl('leaderboard'))
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to load leaderboard: ${res.status}`);
        }
        const json = await res.json();
        setLeaderboard(normalizeListResponse<LeaderboardEntry>(json.leaderboard ?? json));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ol>
          {leaderboard.map((entry) => (
            <li key={entry._id}>
              <strong>{entry.user?.name ?? 'Unknown'}</strong> ({entry.team?.name ?? 'No team'}) — {entry.points} points
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};

export default Leaderboard;
