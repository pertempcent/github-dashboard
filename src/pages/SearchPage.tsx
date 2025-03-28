import { useState } from 'react';
import SearchBox from '../features/search/SearchBox';
import SearchResults from '../features/search/SearchResults';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Search GitHub Repositories</h2>
      <SearchBox onSearch={setQuery} />
      {query && <SearchResults query={query} />}
    </div>
  );
}
