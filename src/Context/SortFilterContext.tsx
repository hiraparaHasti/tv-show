// SortFilterContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

export enum SortOption {
  NAME_ASC = 'name_asc',
  NAME_DESC = 'name_desc',
  RATING_ASC = 'rating_asc',
  RATING_DESC = 'rating_desc',
}

export interface FilterOptions {
  rating: number;
}

interface SortFilterContextProps {
  sortOption: SortOption;
  filterOptions: FilterOptions;
  setSortOption: (option: SortOption) => void;
  setFilterOptions: (options: FilterOptions) => void;
}

const SortFilterContext = createContext<SortFilterContextProps | undefined>(undefined);

export function useSortFilter() {
  const context = useContext(SortFilterContext);
  if (!context) {
    throw new Error('useSortFilter must be used within a SortFilterProvider');
  }
  return context;
}

interface SortFilterProviderProps {
  children: ReactNode;
}

export function SortFilterProvider({ children }: SortFilterProviderProps) {
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.NAME_ASC);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    rating: 0, // Default filter by rating
  });

  return (
    <SortFilterContext.Provider value={{ sortOption, filterOptions, setSortOption, setFilterOptions }}>
      {children}
    </SortFilterContext.Provider>
  );
}
