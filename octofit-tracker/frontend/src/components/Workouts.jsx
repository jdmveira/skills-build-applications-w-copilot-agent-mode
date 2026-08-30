import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    fetchCollection(workoutsEndpoint)
      .then((data) => {
        if (!ignore) {
          setWorkouts(data);
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
    return <div className="alert alert-warning">Unable to load workouts: {error}</div>;
  }

  return (
    <section className="content-panel">
      <h1>Workouts</h1>
      <div className="entity-grid">
        {workouts.map((workout) => (
          <article className="entity-card" key={workout._id ?? workout.title}>
            <span className="eyebrow">{workout.difficulty}</span>
            <h2>{workout.title}</h2>
            <p>{workout.focusArea} · {workout.estimatedMinutes} minutes</p>
            <p>{workout.exercises?.join(', ')}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Workouts;