/**
 * Type definitions for drone data structures used in DronHub.
 *
 * A drone consists of an identifier, brand, human readable name,
 * path to an image file in the public directory and a set of
 * categorised specifications.  Categories mirror the sections shown
 * in the UI (Performance, Video, Battery, Dimensions).  Each
 * category is a simple record mapping specification names to
 * primitive values.  Additional categories can be added as the
 * application grows.
 */
export interface Drone {
  /**
   * Unique slug used to identify this model in routes and state.  It
   * should be URL friendly (lowercase, hyphen separated).
   */
  id: string;
  /** Brand name, e.g. "iFlight" or "GEPRC". */
  brand: string;
  /** Human friendly model name. */
  name: string;
  /** Relative path to the model image stored in public/images. */
  image: string;
  /** Recommended retail price in USD. */
  price: number;
  /**
   * Specification categories.  Keys correspond to sections in the UI
   * and values are arbitrary maps of specification names to values.
   */
  categories: {
    performance: Record<string, string | number>;
    video: Record<string, string | number>;
    battery: Record<string, string | number>;
    dimensions: Record<string, string | number>;
  };
}