# App_Rural - Monitoreo de Agua Potable

Aplicación web para el monitoreo de calidad de agua potable en zonas rurales.

## Estado Actual

- **Home provisional** con diseño base que incluye:
  - Navbar fijo con efecto vidrio
  - Sección hero con título y descripción
  - KPIs de ejemplo
  - Diseño responsivo y accesible

## Tecnologías

- React 18
- Vite
- React Router
- CSS Modules
- PostCSS (para anidamiento CSS)

## Estructura de Estilos

- `src/styles/tokens.css` - Variables de diseño (colores, tipografía, espaciados)
- `src/styles/global.css` - Estilos globales y reset
- `src/styles/ui.module.css` - Componentes y utilidades reutilizables
- `src/styles/home.module.css` - Estilos específicos de la página de inicio

## Requisitos

- Node.js 16+ (recomendado LTS)
- npm o yarn
- Node.js 18+ si se desea ejecutar las pruebas con `node --test`

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   # o
   yarn
   ```
3. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

## Construcción para Producción

```bash
npm run build
# o
yarn build
```

## Pruebas

- `npm test` ejecuta [Jest](https://jestjs.io/), compatible con Node.js 16+
- Para usar el runner integrado de Node (`node --test`), se requiere Node.js 18+

## Características Implementadas

- Diseño responsivo
- Navegación con React Router
- Efectos visuales con CSS puro
- Variables CSS para temas y estilos consistentes
- Accesibilidad básica (ARIA, contraste, navegación por teclado)

## Próximos Pasos

- Implementar autenticación
- Desarrollar dashboard con datos reales
- Añadir gráficos y visualizaciones
- Integrar con API de sensores
