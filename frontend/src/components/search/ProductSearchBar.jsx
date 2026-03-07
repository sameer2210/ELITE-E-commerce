import React, { memo } from "react";
import { Mic, Search, X } from "lucide-react";
import ProductSearchResults from "./ProductSearchResults";

const ProjectSearchBar = ({
  query,
  onQueryChange,
  results,
  loading,
  error,
  minChars = 2,
  placeholder = "Search projects, developers, tech, awards...",
  onResultSelect,
}) => {
  const trimmed = query.trim();
  const showPanel = trimmed.length > 0;

  return (
    <div className="relative w-full max-w-4xl">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-white/70" strokeWidth={1.5} />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="block w-full pl-12 pr-20 py-2.5 border border-white/30 rounded-full bg-black/30 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm placeholder-white/50 text-white transition-all duration-200"
        placeholder={placeholder}
        aria-label="Search projects"
      />
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-2">
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-white/70" strokeWidth={1.5} />
          </button>
        )}
        <button
          type="button"
          className="p-1 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Voice search"
        >
          <Mic className="h-4 w-4 text-white/70" strokeWidth={1.5} />
        </button>
      </div>
      {showPanel && (
        <div className="absolute left-0 right-0 mt-2 rounded-2xl bg-stone-950/95 border border-white/10 shadow-2xl backdrop-blur-xl z-50">
          <ProductSearchResults
            query={query}
            results={results}
            loading={loading}
            error={error}
            minChars={minChars}
            onSelect={onResultSelect}
          />
        </div>
      )}
    </div>
  );
};

export default memo(ProjectSearchBar);
