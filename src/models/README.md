# Modelos de Datos

Este directorio contiene las definiciones de tipos y modelos de datos utilizados en la aplicación App_Rural.

## Tipos Definidos

### Enumeraciones

#### `Fuente`
Tipo de fuente de abastecimiento de agua:
- `'Bocatoma'`
- `'Pozo profundo'`

#### `TipoAgua`
Tipo de agua que procesa la planta:
- `'Superficial'`
- `'Subterranea'`

#### `TipoPlanta`
Tipo de planta de tratamiento:
- `'FIME'`
- `'Compacta'`
- `'Convencional'`

#### `TanqueAbastec`
Tipo de tanque de almacenamiento:
- `'Elevado'`
- `'Al suelo'`

### Modelo `Plant`

Estructura de datos que representa una planta de tratamiento de agua potable.

#### Propiedades

| Propiedad | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `id` | `string` | Sí | Identificador único de la planta |
| `planta` | `string` | Sí | Nombre de la planta |
| `nombre` | `string` | Sí | Nombre descriptivo de la planta |
| `vereda` | `string` | Sí | Vereda donde se ubica la planta |
| `corregimiento` | `string` | Sí | Corregimiento donde se ubica la planta |
| `fuente` | `Fuente` | Sí | Fuente de abastecimiento |
| `tipoAgua` | `TipoAgua` | Sí | Tipo de agua que procesa |
| `caudalDiseno` | `number` | Sí | Caudal de diseño en L/s |
| `caudalConcesion` | `number` | Sí | Caudal concesionado en L/s |
| `tanqueAbastec` | `TanqueAbastec` | Sí | Tipo de tanque de almacenamiento |
| `desarenador` | `number` | Sí | Capacidad del desarenador en m³ |
| `conduccion` | `string` | Sí | Tipo de conducción |
| `tipoPlanta` | `TipoPlanta` | Sí | Tipo de planta de tratamiento |
| `lat` | `number` | Sí | Latitud geográfica |
| `lng` | `number` | Sí | Longitud geográfica |
| `oxidacion` | `string` | No | Sistema de oxidación |
| `preCloracion` | `string` | No | Sistema de pre-cloración |
| `clarificador` | `number` | Sí | Capacidad del clarificador en m³ |
| `filtroRapidoGrava` | `number` | Sí | Cantidad de filtros rápidos de grava |
| `filtroRapidoArena` | `number` | Sí | Cantidad de filtros rápidos de arena |
| `filtroDinamico` | `number` | Sí | Cantidad de filtros dinámicos |
| `filtroGrueso` | `number` | Sí | Cantidad de filtros gruesos |
| `filtroLento` | `number` | Sí | Cantidad de filtros lentos |
| `desinfeccion` | `string` | No | Sistema de desinfección |
| `tanqueAlmacen` | `number` | Sí | Capacidad del tanque de almacenamiento en m³ |
| `usuarios` | `number` | Sí | Número de usuarios conectados |
| `poblacion` | `number` | Sí | Población atendida |

## Notas de Normalización

1. **Decimales**: 
   - Todos los números decimales deben usar punto (`.`) como separador decimal.
   - Ejemplo: `12,61` → `12.61`

2. **Campos numéricos**:
   - Los siguientes campos deben ser números:
     - `caudalDiseno`
     - `caudalConcesion`
     - `lat`
     - `lng`
     - `desarenador`
     - `clarificador`
     - `filtroRapidoGrava`
     - `filtroRapidoArena`
     - `filtroDinamico`
     - `filtroGrueso`
     - `filtroLento`
     - `tanqueAlmacen`
     - `usuarios`
     - `poblacion`

3. **Normalización de `tipoPlanta`**:
   - Asegurar que el valor esté en mayúsculas.
   - Ejemplo: `"Fime"` → `"FIME"`

4. **Valores booleanos**:
   - Los campos que representan existencia de unidades (0/1) deben ser números.
   - Ejemplo: `"1"` → `1`

5. **Campos opcionales**:
   - Los siguientes campos pueden ser `null` o estar ausentes:
     - `oxidacion`
     - `preCloracion`
     - `desinfeccion`

## Uso

```javascript
/** @type {import('./types').Plant} */
const plantaEjemplo = {
  id: "PTAR-001",
  planta: "PTAR La Esperanza",
  nombre: "Planta de Tratamiento La Esperanza",
  vereda: "La Esperanza",
  corregimiento: "San Antonio",
  fuente: "Bocatoma",
  tipoAgua: "Superficial",
  caudalDiseno: 50.5,
  caudalConcesion: 45.0,
  tanqueAbastec: "Elevado",
  desarenador: 120,
  conduccion: "Gravedad",
  tipoPlanta: "FIME",
  lat: 4.60971,
  lng: -74.08175,
  clarificador: 200,
  filtroRapidoGrava: 2,
  filtroRapidoArena: 4,
  filtroDinamico: 1,
  filtroGrueso: 0,
  filtroLento: 0,
  tanqueAlmacen: 500,
  usuarios: 1200,
  poblacion: 4500
};
```
