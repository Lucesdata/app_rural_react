/**
 * @typedef {'Bocatoma' | 'Pozo profundo'} Fuente - Fuente de abastecimiento de agua
 */

/**
 * @typedef {'Superficial' | 'Subterranea'} TipoAgua - Tipo de agua que procesa la planta
 */

/**
 * @typedef {'FIME' | 'Compacta' | 'Convencional'} TipoPlanta - Tipo de planta de tratamiento
 */

/**
 * @typedef {'Elevado' | 'Al suelo'} TanqueAbastec - Tipo de tanque de almacenamiento
 */

/**
 * @typedef {Object} Plant - Modelo de datos para una planta de tratamiento
 * @property {string} id - Identificador único de la planta
 * @property {string} planta - Nombre de la planta
 * @property {string} nombre - Nombre descriptivo de la planta
 * @property {string} vereda - Vereda donde se ubica la planta
 * @property {string} corregimiento - Corregimiento donde se ubica la planta
 * @property {Fuente} fuente - Fuente de abastecimiento
 * @property {TipoAgua} tipoAgua - Tipo de agua que procesa
 * @property {number} caudalDiseno - Caudal de diseño en L/s
 * @property {number} caudalConcesion - Caudal concesionado en L/s
 * @property {TanqueAbastec} tanqueAbastec - Tipo de tanque de almacenamiento
 * @property {number} desarenador - Capacidad del desarenador en m³
 * @property {string} conduccion - Tipo de conducción
 * @property {TipoPlanta} tipoPlanta - Tipo de planta de tratamiento
 * @property {number} lat - Latitud geográfica
 * @property {number} lng - Longitud geográfica
 * @property {string|null} [oxidacion] - Sistema de oxidación (opcional)
 * @property {string|null} [preCloracion] - Sistema de pre-cloración (opcional)
 * @property {number} clarificador - Capacidad del clarificador en m³
 * @property {number} filtroRapidoGrava - Cantidad de filtros rápidos de grava
 * @property {number} filtroRapidoArena - Cantidad de filtros rápidos de arena
 * @property {number} filtroDinamico - Cantidad de filtros dinámicos
 * @property {number} filtroGrueso - Cantidad de filtros gruesos
 * @property {number} filtroLento - Cantidad de filtros lentos
 * @property {string|null} [desinfeccion] - Sistema de desinfección (opcional)
 * @property {number} tanqueAlmacen - Capacidad del tanque de almacenamiento en m³
 * @property {number} usuarios - Número de usuarios conectados
 * @property {number} poblacion - Población atendida
 */

// Este archivo solo contiene definiciones de tipos JSDoc y no exporta nada
