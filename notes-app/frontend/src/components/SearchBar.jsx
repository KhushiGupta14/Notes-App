import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-container">
      <Search className="search-icon" size={20} />
      <input 
        type="text" 
        className="search-input" 
        placeholder="Search notes..." 
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
