import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Radix components have been removed due to installation constraints.
import LanguageSelector from '@/components/LanguageSelector';
import { fetchDrones } from '@/services/drones';
import type { Drone } from '@/types/drone';
import { useComparison } from '@/contexts/ComparisonContext';

/**
 * Primary navigation header.  Displays the application title,
 * navigational links, brand dropdowns and the language selector.
 * Responsive styles collapse the menu into a hamburger on small
 * screens.  Selected comparison count is shown next to the
 * compare link.
 */
const Header: React.FC = () => {
  const { t } = useTranslation();
  const { selected } = useComparison();
  const [drones, setDrones] = useState<Drone[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Load drones for dropdown menus
    fetchDrones().then(setDrones);
  }, []);

  // Group drones by brand for dropdown lists
  const brandGroups = drones.reduce<Record<string, Drone[]>>((acc, drone) => {
    acc[drone.brand] = acc[drone.brand] || [];
    acc[drone.brand].push(drone);
    return acc;
  }, {});

  return (
    <header className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Left side: logo and nav links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            {t('app.title')}
          </Link>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-4">
          {/* Brand dropdowns */}
            {Object.entries(brandGroups).map(([brand, list]) => (
              <details
                key={brand}
                className="relative"
                // Open the dropdown when the mouse enters the button or the list
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDetailsElement).open = true;
                }}
                // Make the element focusable so that blur events fire when clicking outside
                tabIndex={0}
                // Close the dropdown when focus is lost (i.e. user clicks elsewhere)
                onBlur={(e) => {
                  (e.currentTarget as HTMLDetailsElement).open = false;
                }}
              >
                <summary className="px-3 py-1 rounded-md hover:bg-primary-light cursor-pointer">
                  {brand}
                </summary>
                <div className="absolute mt-2 bg-white text-gray-800 rounded-md shadow-md py-1 w-48 z-50">
                  {list.map((drone) => (
                    <Link
                      key={drone.id}
                      to={`/drone/${drone.id}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                      // Close the dropdown when an option is clicked
                      onClick={(e) => {
                        const detailsEl = (e.currentTarget as HTMLElement).closest('details') as HTMLDetailsElement;
                        if (detailsEl) detailsEl.open = false;
                      }}
                    >
                      {drone.name}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
            <Link to="/compare" className="px-3 py-1 rounded-md hover:bg-primary-light relative">
              {t('app.compare')}
              {selected.length > 0 && (
                <span className="absolute -top-1 -right-2 text-xs bg-secondary rounded-full px-1">
                  {selected.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
        {/* Right side: language selector and mobile menu button */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <LanguageSelector />
          </div>
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 focus:outline-none rounded-md hover:bg-primary-light"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {/* Use a simple icon fallback since Radix icons are unavailable */}
            <span className="text-xl">☰</span>
          </button>
        </div>
      </div>
      {/* Mobile menu content */}
      {menuOpen && (
        <div className="md:hidden bg-primary-light text-white px-4 py-3 space-y-2">
          {Object.entries(brandGroups).map(([brand, list]) => (
            <div key={brand}>
              <div className="font-semibold mb-1">{brand}</div>
              <div className="space-y-1 pl-2">
                {list.map((drone) => (
                  <Link
                    key={drone.id}
                    to={`/drone/${drone.id}`}
                    className="block hover:text-secondary"
                    onClick={() => setMenuOpen(false)}
                  >
                    {drone.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link to="/compare" className="block mt-2 hover:text-secondary" onClick={() => setMenuOpen(false)}>
            {t('app.compare')}
            {selected.length > 0 && (
              <span className="ml-1 text-xs bg-secondary text-primary rounded-full px-1">
                {selected.length}
              </span>
            )}
          </Link>
          <div className="mt-3">
            <LanguageSelector />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
