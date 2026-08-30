import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    fetchCollection(usersEndpoint)
      .then((data) => {
        if (!ignore) {
          setUsers(data);
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
    return <div className="alert alert-warning">Unable to load users: {error}</div>;
  }

  return (
    <section className="content-panel">
      <h1>Users</h1>
      <div className="entity-grid">
        {users.map((user) => (
          <article className="entity-card" key={user._id ?? user.username}>
            <span className="eyebrow">{user.username}</span>
            <h2>{user.displayName}</h2>
            <p>{user.email}</p>
            <p>{user.fitnessGoal} · {user.preferredActivity}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Users;