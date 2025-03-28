import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import '../styles/repo.css';
import Loader from '../components/Loader';

export default function RepoPage() {
  const { owner, repo } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['repoDetails', owner, repo],
    queryFn: async () => {
      const res = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
      return res.data;
    },
    enabled: !!owner && !!repo,
  });

  const getErrorMessage = () => {
    if (!error) return 'Something went wrong.';
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) return 'Repository not found.';
      if (error.message === 'Network Error') return 'Network error. Please check your connection.';
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
    <div>
      <div className="repo-header">
        <h2>{data.full_name}</h2>
      </div>
      <div className="repo-card">
        <p>{data.description}</p>
        <p>⭐ Stars: {data.stargazers_count}</p>
        <p>🍴 Forks: {data.forks_count}</p>
        <p>
          🔗 <a href={data.html_url} target="_blank" rel="noreferrer">View on GitHub</a>
        </p>
        <p>
          🐞 <Link to={`/repo/${owner}/${repo}/issues`}>Go to Issues</Link>
        </p>
      </div>
    </div>
  );
}
