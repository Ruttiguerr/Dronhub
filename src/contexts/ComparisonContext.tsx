import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Drone } from '@/types/drone';

/**
 * Context for storing the list of drones selected for comparison.  A
 * user may add up to three models to the comparison list.  When
 * additional models are added beyond this limit the oldest entry
 * will be removed.  Consumers can add or remove drones and clear
 * the list entirely.
 */
interface ComparisonContextType {
  selected: Drone[];
  addDrone: (drone: Drone) => void;
  removeDrone: (id: string) => void;
  clearAll: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<Drone[]>([]);

  /**
   * Add a drone to the comparison list.  If the model already
   * exists it will not be added again.  When more than three
   * models are selected the first (oldest) entry is removed.
   */
  const addDrone = (drone: Drone) => {
    setSelected((prev) => {
      // Check for duplicates
      if (prev.find((d) => d.id === drone.id)) {
        return prev;
      }
      // Remove oldest if limit reached
      const newList = [...prev, drone];
      if (newList.length > 3) newList.shift();
      return newList;
    });
  };

  /** Remove a drone by id. */
  const removeDrone = (id: string) => {
    setSelected((prev) => prev.filter((d) => d.id !== id));
  };

  /** Clear all selections. */
  const clearAll = () => setSelected([]);

  return (
    <ComparisonContext.Provider value={{ selected, addDrone, removeDrone, clearAll }}>
      {children}
    </ComparisonContext.Provider>
  );
};

/**
 * Hook to access the comparison context.  Throws an error when used
 * outside of the provider to help debug misconfiguration.
 */
export const useComparison = (): ComparisonContextType => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};