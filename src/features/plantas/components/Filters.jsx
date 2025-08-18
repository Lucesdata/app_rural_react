import React from 'react';
import styles from '../../../styles/plantas.module.css';

/**
 * Filters - Componente para los filtros de búsqueda y ordenación de plantas
 * @param {Object} props - Propiedades del componente
 * @param {string} props.searchTerm - Término de búsqueda actual
 * @param {Function} props.setSearchTerm - Función para actualizar el término de búsqueda
 * @param {string} props.selectedFuente - Fuente seleccionada para filtrar
 * @param {Function} props.setSelectedFuente - Función para actualizar la fuente seleccionada
 * @param {Array} props.fuenteOptions - Opciones de fuentes disponibles
 * @param {string} props.sortOrder - Orden actual (asc/desc)
 * @param {Function} props.setSortOrder - Función para actualizar el orden
 * @param {number} props.pageSize - Tamaño de página actual
 * @param {Function} props.setPageSize - Función para actualizar el tamaño de página
 * @param {Function} props.onReset - Función para reiniciar los filtros
 */
const Filters = ({
  searchTerm,
  setSearchTerm,
  selectedFuente,
  setSelectedFuente,
  fuenteOptions,
  sortOrder,
  setSortOrder,
  pageSize,
  setPageSize,
  onReset
}) => (
  <div className={styles.filtersContainer}>
    <div className={styles.searchGroup}>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
        aria-label="Buscar plantas por nombre"
      />
    </div>
    
    <div className={styles.filterGroup}>
      <label htmlFor="fuente-filter" className={styles.filterLabel}>
        Filtrar por fuente:
      </label>
      <select
        id="fuente-filter"
        value={selectedFuente}
        onChange={(e) => setSelectedFuente(e.target.value)}
        className={styles.selectInput}
      >
        <option value="">Todas las fuentes</option>
        {fuenteOptions.map((fuente) => (
          <option key={fuente} value={fuente}>
            {fuente}
          </option>
        ))}
      </select>
    </div>
    
    <div className={styles.filterGroup}>
      <label htmlFor="sort-order" className={styles.filterLabel}>
        Ordenar por usuarios:
      </label>
      <select
        id="sort-order"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className={styles.selectInput}
      >
        <option value="desc">Mayor a menor</option>
        <option value="asc">Menor a mayor</option>
      </select>
    </div>
    
    <div className={styles.filterGroup}>
      <label htmlFor="page-size" className={styles.filterLabel}>
        Mostrar:
      </label>
      <select
        id="page-size"
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        className={styles.selectInput}
      >
        <option value="9">9 por página</option>
        <option value="18">18 por página</option>
        <option value="0">Todas</option>
      </select>
    </div>
    
    <button 
      onClick={onReset}
      className={styles.resetButton}
      aria-label="Reiniciar filtros"
    >
      Reiniciar
    </button>
  </div>
);

export default Filters;
