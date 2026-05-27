import { useEffect, useState } from 'react';
import { getApiUrl, normalizeListResponse } from '../lib/api';

interface Workout {
  _id: string;
  title: string;
  description: string;
  durationMinutes: number;
  intensity: string;
}

const Workouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(getApiUrl('workouts'))
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to load workouts: ${res.status}`);
        }
        const json = await res.json();
        setWorkouts(normalizeListResponse<Workout>(json.workouts ?? json));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id}>
              <strong>{workout.title}</strong> — {workout.intensity} • {workout.durationMinutes} min
              <div>{workout.description}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Workouts;
