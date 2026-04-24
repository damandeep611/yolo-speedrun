import { useState, useEffect, useRef } from 'react';

export default function DebouncedSearch() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock search function
  const mockSearch = (term) => {
    const items = ['apple', 'banana', 'apricot', 'blueberry', 'avocado', 'blackberry'];
    return items.filter(item => item.toLowerCase().includes(term.toLowerCase()));
  };

  // Debounce implementation using closures
  useEffect(() => {
    // Closure captures 'input' value
    const timeoutId = setTimeout(() => {
      console.log('Searching for:', input);
      setSearchTerm(input);
      setResults(mockSearch(input));
    }, 500);

    // Cleanup function also uses closure
    return () => {
      console.log('Cleanup - clearing timeout for:', input);
      clearTimeout(timeoutId);
    };
  }, [input]); // New closure created each time input changes

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Debounced Search</h2>
      
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type to search fruits..."
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <p className="text-sm text-gray-600 mb-2">
        Searching for: <span className="font-semibold">{searchTerm || '...'}</span>
      </p>

      <div className="bg-gray-50 p-4 rounded">
        <p className="text-sm font-semibold mb-2">Results:</p>
        {results.length > 0 ? (
          <ul className="list-disc list-inside">
            {results.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No results</p>
        )}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
        <p className="font-semibold mb-1">Open console to see:</p>
        <ul className="list-disc list-inside text-xs">
          <li>How closures capture each input value</li>
          <li>Cleanup clearing old timeouts</li>
          <li>Only last timeout executes</li>
        </ul>
      </div>
    </div>
  );
}