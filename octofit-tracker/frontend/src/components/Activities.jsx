import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    fetchCollection(activitiesEndpoint)
      .then((data) => {
        if (!ignore) {
          setActivities(data);
        }
      })
      .catch((requestError) => {
        if (!ignore) {
          setError(requestError.message);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (error) {
    return <div className="alert alert-warning">Unable to load activities: {error}</div>;
  }

  return (
    <section className="content-panel">
      <h1>Activities</h1>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Minutes</th>
              <th>Calories</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.user}-${activity.completedAt}`}>
                <td>{activity.user}</td>
                <td>{activity.type}</td>
                <td>{activity.durationMinutes}</td>
                <td>{activity.caloriesBurned}</td>
                <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Activities;