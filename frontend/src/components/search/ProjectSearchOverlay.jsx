import React, { memo } from "react";
import { Search, X } from "lucide-react";
import ProjectSearchResults from "./ProjectSearchResults";

const ProjectSearchOverlay = ({
  query,
  onQueryChange,
  results,
  loading,
  error,
  minChars = 2,
  onClose,
}) => {
  const trimmed = query.trim();

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 search-overlay">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-100 text-sm placeholder-gray-400 text-white"
            placeholder="Search projects, developers, tech, awards..."
            autoFocus
            aria-label="Search projects"
          />
        </div>
        <button
          onClick={onClose}
          className="ml-4 p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Close search"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="p-4">
        {trimmed.length === 0 ? (
          <p className="text-sm text-gray-400 text-center">
            Search projects, developers, and award-winning work...
          </p>
        ) : (
          <div className="rounded-2xl bg-stone-950/95 border border-white/10 shadow-2xl backdrop-blur-xl">
            <ProjectSearchResults
              query={query}
              results={results}
              loading={loading}
              error={error}
              minChars={minChars}
              onSelect={onClose}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProjectSearchOverlay);
