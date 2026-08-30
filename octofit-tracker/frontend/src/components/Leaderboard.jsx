import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    fetchCollection('leaderboard')
      .then((data) => {
        if (!ignore) {
          setLeaderboard(data);
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
    return <div className="alert alert-warning">Unable to load leaderboard: {error}</div>;
  }

  return (
    <section className="content-panel">
      <h1>Leaderboard</h1>
      <div className="leaderboard-list">
        {leaderboard.map((entry) => (
          <article className="score-row" key={entry._id ?? entry.rank}>
            <span className="rank">#{entry.rank}</span>
            <div>
              <h2>{entry.user}</h2>
              <p>{entry.team}</p>
            </div>
            <strong>{entry.points} pts</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;