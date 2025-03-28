import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import '../styles/user.css';
import Loader from '../components/Loader';

export default function UserPage() {
  const { username } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user', username],
    queryFn: async () => {
      const res = await axios.get(`https://api.github.com/users/${username}`);
      return res.data;
    },
    enabled: !!username,
  });

  const { data: starred } = useQuery({
    queryKey: ['starred', username],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.github.com/users/${username}/starred?per_page=5`
      );
      return res.data;
    },
    enabled: !!username,
  });

  const getErrorMessage = () => {
    if (!error) return 'Something went wrong.';
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) return 'User not found.';
      if (error.message === 'Network Error') return 'Network error. Please check your internet connection.';
    }
    return 'Something went wrong.';
  };

  if (isLoading) return <Loader />;

  if (isError || !data) {
    return (
      <div>
        <p>{getErrorMessage()}</p>
        <Link to="/">🔍 Back to Search</Link>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="user-card">
        <h2>{data.login}</h2>
        <img src={data.avatar_url} alt="avatar" className="user-avatar" />
        {data.bio && <p>{data.bio}</p>}
        {data.location && <p>📍 {data.location}</p>}
        <p>👥 Followers: {data.followers}</p>
        <p>
          🔗{' '}
          <a href={data.html_url} target="_blank" rel="noreferrer">
            GitHub Profile
          </a>
        </p>
      </div>

      <h3>⭐ Starred Repositories</h3>
      {starred && starred.length > 0 ? (
        <ul className="starred-list">
          {starred.map((repo: any) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                {repo.full_name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No starred repositories found.</p>
      )}
    </div>
  );
}
