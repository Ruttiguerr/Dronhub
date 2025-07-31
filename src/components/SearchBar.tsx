import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
// Use a simple magnifying glass emoji instead of Radix icon.

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  suggestions: { id: string; name: string }[];
}

/**
 * Search bar with autocompletion.  Users can type a model name and
 * suggestions will appear below.  Selecting a suggestion will
 * navigate to the model page.  The query change handler is used
 * by the parent page to filter the visible list of drones.
 */
const SearchBar: React.FC<SearchBarProps> = ({ query, onQueryChange, suggestions }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Open suggestions when there are items and query is not empty
  useEffect(() => {
    setOpen(query.trim().length > 0 && suggestions.length > 0);
  }, [query, suggestions]);

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center bg-white border border-gray-300 rounded-md px-2 py-1 w-full">
        <span className="text-gray-400 mr-2">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="flex-1 focus:outline-none"
          placeholder={t('app.searchPlaceholder')}
        />
      </div>
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((item) => (
            <Link
              key={item.id}
              to={`/drone/${item.id}`}
              className="block px-3 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;