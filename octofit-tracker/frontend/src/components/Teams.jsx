import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    fetchCollection(teamsEndpoint)
      .then((data) => {
        if (!ignore) {
          setTeams(data);
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
    return <div className="alert alert-warning">Unable to load teams: {error}</div>;
  }

  return (
    <section className="content-panel">
      <h1>Teams</h1>
      <div className="entity-grid">
        {teams.map((team) => (
          <article className="entity-card" key={team._id ?? team.name}>
            <span className="eyebrow">{team.mascot}</span>
            <h2>{team.name}</h2>
            <p>Captain: {team.captain}</p>
            <p>{team.members?.length ?? 0} members · {team.weeklyGoalMinutes} weekly minutes</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Teams;