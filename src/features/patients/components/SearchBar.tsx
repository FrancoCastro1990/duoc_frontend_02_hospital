import React from 'react';
import { Search, X } from 'lucide-react';
import type { SearchBarProps } from '../types';

/**
 * SearchBar Component
 * A professional search input component with clear functionality for filtering patients
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = 'Search...',
}) => {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="relative">
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <Search className="w-5 h-5 text-secondary-400" />
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white rounded-xl border-2 border-secondary-100 px-4 py-3 pl-12 pr-12
                   text-base text-primary-900 placeholder-secondary-400
                   focus:outline-none focus:border-secondary-400 focus:ring-2 focus:ring-secondary-200
                   transition-all duration-200"
        aria-label="Search patients"
      />

      {/* Clear Button */}
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg
                     text-secondary-400 hover:bg-secondary-50 hover:text-secondary-600
                     transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-secondary-200"
          aria-label="Clear search"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
