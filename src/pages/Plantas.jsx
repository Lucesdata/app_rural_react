import React, { useState, useEffect } from 'react';
import { getFilteredPlants, getFuenteOptions } from '../lib/apiClient';
import uiStyles from '../styles/ui.module.css';
import styles from '../styles/plantas.module.css';

const Plantas = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFuente, setSelectedFuente] = useState('');
  const [fuenteOptions, setFuenteOptions] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');

  // Cargar opciones de filtro
  useEffect(() => {
    const loadFuenteOptions = async () => {
      try {
        const options = await getFuenteOptions();
        setFuenteOptions(options);
      } catch (err) {
        console.error('Error loading fuente options:', err);
      }
    };

    loadFuenteOptions();
  }, []);

  // Cargar y filtrar plantas
  useEffect(() => {
    const loadPlants = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const filteredPlants = await getFilteredPlants({
          search: searchTerm,
          fuente: selectedFuente,
          sortBy: 'usuarios',
          sortOrder: sortOrder
        });
        setPlants(filteredPlants);
      } catch (err) {
        console.error('Error loading plants:', err);
        setError('Error al cargar las plantas. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    // Usar un debounce para evitar múltiples llamadas mientras se escribe
    const timer = setTimeout(() => {
      loadPlants();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedFuente, sortOrder]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFuenteChange = (e) => {
    setSelectedFuente(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  if (loading && plants.length === 0) {
    return (
      <div className={`${uiStyles.container} ${styles.container}`}>
        <div className={styles.loading}>Cargando plantas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${uiStyles.container} ${styles.container}`}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={`${uiStyles.container} ${styles.container}`}>
      <h1>Plantas de Tratamiento</h1>
      
      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar por nombre, vereda o corregimiento..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
            aria-label="Buscar plantas"
          />
        </div>
        
        <div className={styles.filterGroup}>
          <label htmlFor="fuente" className={styles.filterLabel}>
            Filtrar por fuente:
          </label>
          <select
            id="fuente"
            value={selectedFuente}
            onChange={handleFuenteChange}
            className={styles.selectInput}
            aria-label="Filtrar por fuente de agua"
          >
            <option value="">Todas las fuentes</option>
            {fuenteOptions.map(fuente => (
              <option key={fuente} value={fuente}>
                {fuente}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={toggleSortOrder} 
          className={`${uiStyles.btn} ${styles.sortButton}`}
          aria-label={`Ordenar por usuarios en orden ${sortOrder === 'asc' ? 'ascendente' : 'descendente'}`}
        >
          Ordenar por usuarios {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
      
      {plants.length === 0 ? (
        <div className={styles.emptyState}>
          No se encontraron plantas que coincidan con los filtros seleccionados.
        </div>
      ) : (
        <div className={styles.plantsGrid}>
          {plants.map(plant => (
            <div key={plant.id} className={`${uiStyles.card} ${styles.plantCard}`}>
              <h2 className={styles.plantTitle}>{plant.planta}</h2>
              <p><strong>Nombre:</strong> {plant.nombre}</p>
              <p><strong>Vereda:</strong> {plant.vereda}</p>
              <p><strong>Corregimiento:</strong> {plant.corregimiento}</p>
              <p><strong>Fuente:</strong> {plant.fuente}</p>
              <p><strong>Usuarios:</strong> {plant.usuarios.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Plantas;
