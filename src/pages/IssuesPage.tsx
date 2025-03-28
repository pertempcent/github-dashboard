import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import '../styles/issues.css';
import Loader from '../components/Loader';

export default function IssuesPage() {
  const { owner, repo } = useParams();
  const [kanbanView, setKanbanView] = useState(true);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['issues', owner, repo],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=50`
      );
      return res.data.filter((issue: any) => !issue.pull_request);
    },
    enabled: !!owner && !!repo,
  });

  const getErrorMessage = () => {
    if (!error) return 'Something went wrong.';
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) return 'Repository not found.';
      if (error.message === 'Network Error') return 'Network error. Check your connection.';
    }
    return 'Something went wrong.';
  };

  if (isLoading) return <Loader />;

  if (isError || !data) return <p>{getErrorMessage()}</p>;

  const openIssues = data.filter((i: any) => i.state === 'open');
  const closedIssues = data.filter((i: any) => i.state === 'closed');
  const hasNoIssues = openIssues.length === 0 && closedIssues.length === 0;

  return (
    <div>
      <h2>Issues for {owner}/{repo}</h2>
      <button className="issues-toggle" onClick={() => setKanbanView(!kanbanView)}>
        Switch to {kanbanView ? 'List' : 'Kanban'} View
      </button>

      {hasNoIssues ? (
        <p>No issues found for this repository.</p>
      ) : kanbanView ? (
        <div className="kanban-board">
          <div className="issue-column">
            <h3>To Do</h3>
            {openIssues.length === 0 ? (
              <p>No open issues</p>
            ) : (
              openIssues.map((issue: any) => (
                <div key={issue.id} className="issue-card">
                  <a href={issue.html_url} target="_blank" rel="noreferrer">
                    {issue.title}
                  </a>
                </div>
              ))
            )}
          </div>
          <div className="issue-column">
            <h3>Done</h3>
            {closedIssues.length === 0 ? (
              <p>No closed issues</p>
            ) : (
              closedIssues.map((issue: any) => (
                <div key={issue.id} className="issue-card">
                  <a href={issue.html_url} target="_blank" rel="noreferrer">
                    {issue.title}
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <ul className="issue-list">
          {data.map((issue: any) => (
            <li key={issue.id} className="issue-card">
              <strong>[{issue.state.toUpperCase()}]</strong>{' '}
              <a href={issue.html_url} target="_blank" rel="noreferrer">
                {issue.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
