/**
 * PostCSS configuration.
 *
 * This file wires Tailwind CSS and autoprefixer into PostCSS. Vite
 * automatically picks up this configuration to process CSS imported from
 * JavaScript/TypeScript files. See https://vitejs.dev/guide/features#postcss
 * for more details.
 */
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
