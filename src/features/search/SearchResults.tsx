import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/search.css';
import Loader from '../../components/Loader';

type Props = {
  query: string;
};

export default function SearchResults({ query }: Props) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['repos', query],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.github.com/search/repositories?q=${query}&per_page=10`
      );
      return res.data.items;
    },
    enabled: !!query,
  });

  const getErrorMessage = () => {
    if (!error) return 'An unknown error occurred.';
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        return 'GitHub API rate limit exceeded. Please try again later.';
      }
      if (error.message === 'Network Error') {
        return 'Network error. Please check your internet connection.';
      }
    }
    return 'Something went wrong.';
  };

  if (isLoading) return <Loader />;
  if (isError) return <p>{getErrorMessage()}</p>;
  if (data?.length === 0) return <p>No repositories found for this query.</p>;

  return (
    <ul className="repo-list">
      {data.map((repo: any) => (
        <li key={repo.id} className="repo-card">
          <Link to={`/repo/${repo.owner.login}/${repo.name}`}>
            {repo.full_name}
          </Link>{' '}
          by{' '}
          <Link to={`/user/${repo.owner.login}`}>
            {repo.owner.login}
          </Link>
        </li>
      ))}
    </ul>
  );
}
