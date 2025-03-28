import { useState } from 'react';

type Props = {
  onSearch: (query: string) => void;
};

export default function SearchBox({ onSearch }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;
    onSearch(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Type to search GitHub repositories..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: '8px', width: '300px' }}
      />
      <button
        type="submit"
        disabled={!input.trim()}
        style={{ marginLeft: '8px', padding: '8px' }}
      >
        Search
      </button>
    </form>
  );
}
