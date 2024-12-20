// components/client/ui/search-filter.tsx
"use client";

import { useState, useCallback } from "react";
import { debounce } from "lodash";

interface SearchFilterProps {
  onSearch: (term: string) => void;
  onFilter: (filters: Record<string, any>) => void;
  filters: {
    key: string;
    label: string;
    options: { value: string; label: string }[];
  }[];
}

export function SearchFilter({
  onSearch,
  onFilter,
  filters,
}: SearchFilterProps) {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({});

  const debouncedSearch = useCallback(
    debounce((term: string) => onSearch(term), 300),
    [onSearch]
  );

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...selectedFilters, [key]: value };
    setSelectedFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => debouncedSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      <div className="flex gap-4">
        {filters.map((filter) => (
          <div key={filter.key}>
            <label className="block text-sm font-medium text-gray-700">
              {filter.label}
            </label>
            <select
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="">All</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
