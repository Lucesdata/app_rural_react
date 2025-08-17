import plantas from '../data/plantas.json';

/**
 * Simula una petición HTTP con un retraso aleatorio
 * @param {number} min - Tiempo mínimo de retraso en ms
 * @param {number} max - Tiempo máximo de retraso en ms
 * @returns {Promise<void>}
 */
const simulateLatency = (min = 200, max = 500) => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

/**
 * Obtiene todas las plantas con simulación de latencia
 * @returns {Promise<Array<import('../models/types').Plant>>}
 */
export const getPlants = async () => {
  await simulateLatency();
  return [...plantas]; // Devolvemos una copia para evitar mutaciones accidentales
};

/**
 * Obtiene una planta por su ID con simulación de latencia
 * @param {string} id - ID de la planta a buscar
 * @returns {Promise<import('../models/types').Plant|undefined>}
 */
export const getPlant = async (id) => {
  await simulateLatency();
  return plantas.find(planta => planta.id === id);
};

/**
 * Filtra y ordena las plantas según los criterios proporcionados
 * @param {Object} options - Opciones de filtrado y ordenación
 * @param {string} [options.search] - Texto para filtrar por nombre, vereda o corregimiento
 * @param {string} [options.fuente] - Tipo de fuente para filtrar
 * @param {string} [options.sortBy='usuarios'] - Campo por el que ordenar
 * @param {string} [options.sortOrder='asc'] - Orden de clasificación ('asc' o 'desc')
 * @returns {Promise<Array<import('../models/types').Plant>>}
 */
export const getFilteredPlants = async ({
  search = '',
  fuente = '',
  sortBy = 'usuarios',
  sortOrder = 'asc'
} = {}) => {
  await simulateLatency();
  
  let filtered = [...plantas];
  
  // Aplicar filtro de búsqueda
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(planta => 
      planta.nombre.toLowerCase().includes(searchLower) ||
      planta.vereda.toLowerCase().includes(searchLower) ||
      planta.corregimiento.toLowerCase().includes(searchLower)
    );
  }
  
  // Aplicar filtro de fuente
  if (fuente) {
    filtered = filtered.filter(planta => planta.fuente === fuente);
  }
  
  // Aplicar ordenación
  filtered.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
  
  return filtered;
};

/**
 * Obtiene los valores únicos de fuente para usar en filtros
 * @returns {Promise<string[]>}
 */
export const getFuenteOptions = async () => {
  await simulateLatency(100, 200);
  return [...new Set(plantas.map(planta => planta.fuente))];
};
