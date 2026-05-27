import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeListResponse } from '../lib/api';

interface Activity {
  _id: string;
  activityDate: string;
  durationMinutes: number;
  caloriesBurned: number;
  notes: string;
  workout?: { title: string };
  user?: { name: string };
}

const Activities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const endpoint = `${API_BASE_URL}/api/activities/`;
    fetch(endpoint)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to load activities: ${res.status}`);
        }
        const json = await res.json();
        setActivities(normalizeListResponse<Activity>(json.activities ?? json));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {activities.map((activity) => (
            <li key={activity._id}>
              <strong>{activity.workout?.title ?? 'Workout'}</strong> by {activity.user?.name ?? 'unknown'} on {new Date(activity.activityDate).toLocaleDateString()}
              <div>{activity.durationMinutes} min • {activity.caloriesBurned} kcal</div>
              <div>{activity.notes}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Activities;
