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

/**
 * Genera lecturas simuladas de sensores para una planta
 * @param {string} plantId - ID de la planta
 * @param {number} [count=20] - Número de lecturas a generar
 * @returns {Promise<Array<{
 *   timestamp: string,
 *   flow: number,
 *   level: number,
 *   pressure: number,
 *   quality: number,
 *   status: 'ok' | 'warning' | 'error'
 * }>>}
 */
export const getLatestReadings = async (plantId, count = 20) => {
  await simulateLatency(300, 800);
  
  // Encontrar la planta para usar sus datos como base
  const plant = plantas.find(p => p.id === plantId);
  if (!plant) return [];
  
  const now = new Date();
  const readings = [];
  
  // Generar lecturas simuladas
  for (let i = 0; i < count; i++) {
    const timestamp = new Date(now);
    timestamp.setMinutes(timestamp.getMinutes() - i * 5);
    
    // Valores base basados en el tipo de planta
    const isGoodQuality = Math.random() > 0.2; // 80% de probabilidad de calidad buena
    const quality = isGoodQuality 
      ? 95 + Math.random() * 5 // 95-100
      : 80 + Math.random() * 15; // 80-95
    
    const status = quality >= 95 ? 'ok' : quality >= 85 ? 'warning' : 'error';
    
    // Generar valores realistas basados en la calidad
    const flow = plant.caudalDiseno * (0.9 + Math.random() * 0.2); // ±10% del caudal de diseño
    const level = 50 + (Math.random() * 50); // 50-100%
    const pressure = 2 + (Math.random() * 3); // 2-5 bar
    
    readings.push({
      timestamp: timestamp.toISOString(),
      flow: parseFloat(flow.toFixed(2)),
      level: parseFloat(level.toFixed(1)),
      pressure: parseFloat(pressure.toFixed(2)),
      quality: parseFloat(quality.toFixed(1)),
      status
    });
  }
  
  return readings;
};
