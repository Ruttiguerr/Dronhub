import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface FilterState {
  brands: string[];
  priceMin?: number;
  priceMax?: number;
  weightMin?: number;
  weightMax?: number;
}

interface FilterPanelProps {
  availableBrands: string[];
  value: FilterState;
  onChange: (state: FilterState) => void;
}

/**
 * Sidebar containing filter controls.  Users can filter drones by
 * brand, price and weight ranges.  When values change the parent
 * component is notified via onChange.  Responsive design hides
 * this panel on smaller screens; however it could be toggled via
 * a button if needed.
 */
const FilterPanel: React.FC<FilterPanelProps> = ({ availableBrands, value, onChange }) => {
  const { t } = useTranslation();
  const [state, setState] = useState<FilterState>(value);

  // Keep internal state in sync with props
  useEffect(() => setState(value), [value]);

  const handleBrandToggle = (brand: string) => {
    const brands = state.brands.includes(brand)
      ? state.brands.filter((b) => b !== brand)
      : [...state.brands, brand];
    const newState = { ...state, brands };
    setState(newState);
    onChange(newState);
  };

  const handleInputChange = (field: keyof FilterState, val: string) => {
    const num = val === '' ? undefined : Number(val);
    const newState = { ...state, [field]: num } as FilterState;
    setState(newState);
    onChange(newState);
  };

  const clearFilters = () => {
    const cleared: FilterState = { brands: [] };
    setState(cleared);
    onChange(cleared);
  };

  return (
    <aside className="bg-white border border-gray-200 rounded-md p-4 space-y-4">
      <h2 className="text-lg font-semibold">{t('app.filters')}</h2>
      {/* Brand filter */}
      <div>
        <h3 className="font-medium mb-1">{t('app.brandFilter')}</h3>
        <div className="space-y-1">
          {availableBrands.map((brand) => (
            <label key={brand} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={state.brands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="form-checkbox h-4 w-4 text-secondary"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Price filter */}
      <div>
        <h3 className="font-medium mb-1">{t('app.priceRange')} ($)</h3>
        <div className="flex space-x-2">
          <input
            type="number"
            value={state.priceMin ?? ''}
            onChange={(e) => handleInputChange('priceMin', e.target.value)}
            placeholder="Min"
            className="w-1/2 border border-gray-300 rounded-md px-2 py-1"
            min={0}
          />
          <input
            type="number"
            value={state.priceMax ?? ''}
            onChange={(e) => handleInputChange('priceMax', e.target.value)}
            placeholder="Max"
            className="w-1/2 border border-gray-300 rounded-md px-2 py-1"
            min={0}
          />
        </div>
      </div>
      {/* Weight filter */}
      <div>
        <h3 className="font-medium mb-1">{t('app.weightRange')} (g)</h3>
        <div className="flex space-x-2">
          <input
            type="number"
            value={state.weightMin ?? ''}
            onChange={(e) => handleInputChange('weightMin', e.target.value)}
            placeholder="Min"
            className="w-1/2 border border-gray-300 rounded-md px-2 py-1"
            min={0}
          />
          <input
            type="number"
            value={state.weightMax ?? ''}
            onChange={(e) => handleInputChange('weightMax', e.target.value)}
            placeholder="Max"
            className="w-1/2 border border-gray-300 rounded-md px-2 py-1"
            min={0}
          />
        </div>
      </div>
      <button
        onClick={clearFilters}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md"
      >
        {t('app.clearFilters')}
      </button>
    </aside>
  );
};

export default FilterPanel;