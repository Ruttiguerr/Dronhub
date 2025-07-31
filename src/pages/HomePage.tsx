import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchDrones, getBrands } from '@/services/drones';
import type { Drone } from '@/types/drone';
import DroneCard from '@/components/DroneCard';
import SearchBar from '@/components/SearchBar';
import FilterPanel, { FilterState } from '@/components/FilterPanel';
import { useDebounce } from '@/hooks/useDebounce';

/**
 * Landing page displaying all drone models.  Includes search with
 * autocomplete and a filter sidebar.  Results are updated
 * reactively as the user types or adjusts filters.  On smaller
 * screens filters can be toggled via a button.
 */
const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [drones, setDrones] = useState<Drone[]>([]);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 200);
  const [filters, setFilters] = useState<FilterState>({ brands: [] });
  const [brands, setBrands] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchDrones().then((list) => setDrones(list));
    setBrands(getBrands());
  }, []);

  // Generate suggestions for autocomplete (top 5 matches)
  const suggestions = useMemo(() => {
    const lower = query.toLowerCase();
    return drones
      .filter((d) => d.name.toLowerCase().includes(lower))
      .slice(0, 5)
      .map((d) => ({ id: d.id, name: d.name }));
  }, [query, drones]);

  // Apply filters to drones list
  const filteredDrones = useMemo(() => {
    return drones.filter((drone) => {
      // Search by name
      if (debouncedQuery) {
        const match = drone.name.toLowerCase().includes(debouncedQuery.toLowerCase());
        if (!match) return false;
      }
      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(drone.brand)) {
        return false;
      }
      // Price filter
      if (filters.priceMin != null && drone.price < filters.priceMin) return false;
      if (filters.priceMax != null && drone.price > filters.priceMax) return false;
      // Weight filter: parse weight from dimensions.weight (string like '445 g')
      const weightStr = drone.categories.dimensions.weight;
      const weightVal = parseFloat(String(weightStr));
      if (filters.weightMin != null && weightVal < filters.weightMin) return false;
      if (filters.weightMax != null && weightVal > filters.weightMax) return false;
      return true;
    });
  }, [drones, debouncedQuery, filters]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">{t('app.home')}</h1>
        {/* Toggle filter on mobile */}
        <button
          className="sm:hidden bg-secondary text-primary px-3 py-1 rounded-md"
          onClick={() => setShowFilters(!showFilters)}
        >
          {t('app.filters')}
        </button>
      </div>
      <div className="flex flex-col sm:flex-row sm:space-x-6">
        {/* Sidebar filters on desktop */}
        <div className={`sm:w-64 mb-4 sm:mb-0 ${showFilters ? '' : 'hidden sm:block'}`}>
          <FilterPanel availableBrands={brands} value={filters} onChange={setFilters} />
        </div>
        {/* Main content */}
        <div className="flex-1">
          <div className="mb-4">
            <SearchBar query={query} onQueryChange={setQuery} suggestions={suggestions} />
          </div>
          {filteredDrones.length === 0 ? (
            <p>{t('app.noResults')}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDrones.map((drone) => (
                <DroneCard key={drone.id} drone={drone} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;