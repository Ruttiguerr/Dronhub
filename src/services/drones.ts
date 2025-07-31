import type { Drone } from '@/types/drone';
import { drones } from '@/mocks/drones';

/**
 * Service functions for working with drone data.  In the current
 * implementation data is loaded from a static mock file.  If you
 * later implement scraping or real APIs, replace these functions
 * accordingly.  They return promises to mirror asynchronous
 * behaviour of network requests.
 */

/**
 * Return a list of all available drones.  The promise resolves
 * immediately in this mock implementation.  When adding API
 * integration you could implement caching or remote fetch here.
 */
export async function fetchDrones(): Promise<Drone[]> {
  // Simulate a tiny delay to better emulate network latency.
  await new Promise((resolve) => setTimeout(resolve, 50));
  return drones;
}

/**
 * Retrieve a single drone by its unique id.  Returns undefined
 * when no matching model is found.
 *
 * @param id The slug identifying the drone.
 */
export async function fetchDroneById(id: string): Promise<Drone | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return drones.find((d) => d.id === id);
}

/**
 * Retrieve the list of unique brands from the dataset.  Useful for
 * building brand filters and menus.
 */
export function getBrands(): string[] {
  return Array.from(new Set(drones.map((d) => d.brand)));
}