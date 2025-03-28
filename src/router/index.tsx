import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import SearchPage from '../pages/SearchPage';
import RepoPage from '../pages/RepoPage';
import IssuesPage from '../pages/IssuesPage';
import UserPage from '../pages/UserPage';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    children: [
      {
        path: '',
        element: <SearchPage />,
      },
      {
        path: 'repo/:owner/:repo',
        element: <RepoPage />,
      },
      {
        path: 'repo/:owner/:repo/issues',
        element: <IssuesPage />,
      },
      {
        path: 'user/:username',
        element: <UserPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      }
      
    ],
  },
]);

export default router;
