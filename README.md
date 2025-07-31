# DronHub

DronHub es una aplicación web para comparar drones de iFlight y GEPRC. Está construida con React (Vite), Tailwind CSS y TypeScript.

## Características

- Lista de drones con tarjetas: imagen, nombre y especificaciones clave.
- Vista detallada de cada modelo con tabla de especificaciones y gráficos de rendimiento (velocidad, autonomía, peso, etc.).
- Comparativa de hasta 3 modelos simultáneamente con tablas y gráficos.
- Buscador con autocompletado y filtros por tamaño, tipo de video, precio y peso.
- Internacionalización en español e inglés con selector de idioma.
- Responsive: interfaz adaptada a móvil, tablet y escritorio.

## Instalación

Asegúrate de tener Node.js y PNPM instalados.

```
pnpm install
pnpm dev
```

Después de ejecutar estos comandos, abre `http://localhost:5173` en tu navegador.

## Estructura del proyecto

- `src/components`: Componentes reutilizables como `Header`, `DroneCard`, `SearchBar`, `FilterPanel`, etc.
- `src/pages`: Páginas principales (`Home`, `DroneDetail`, `Compare`).
- `src/services`: Funciones para obtener datos (mock o scraping).
- `src/i18n`: Archivos de traducción.
- `src/mocks`: Datos de ejemplo para los drones.

## Desarrollo

Este proyecto utiliza Vite para el desarrollo y Recharts para los gráficos. Tailwind CSS se configura en `tailwind.config.js` y se compila con PostCSS. Puedes personalizar los colores en la configuración.

## Contribuciones

Las contribuciones son bienvenidas. Abre una issue o pull request para sugerir mejoras o corregir errores.
