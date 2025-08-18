/**
 * Feature: Plantas
 * This is the Plantas feature; it contains the plants listing page with filtering and search functionality.
 */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getFilteredPlants, getFuenteOptions } from '../../lib/apiClient';
import PlantCard from './components/PlantCard';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import Loading from '../../components/feedback/Loading';
import Empty from '../../components/feedback/Empty';
import Error from '../../components/feedback/Error';
import styles from '../../styles/plantas.module.css';

const Plantas = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFuente, setSelectedFuente] = useState('');
  const [fuenteOptions, setFuenteOptions] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [pageSize, setPageSize] = useState(9); // 9, 18, or 0 (all)
  const [currentPage, setCurrentPage] = useState(1);

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
        // Reset to first page when filters change
        setCurrentPage(1);
      } catch (err) {
        console.error('Error loading plants:', err);
        setError('No se pudieron cargar las plantas. Por favor, intente de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      loadPlants();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedFuente, sortOrder]);

  // Resetear a la primera página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedFuente, sortOrder, pageSize]);

  // Manejar cambio de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reiniciar todos los filtros
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedFuente('');
    setSortOrder('desc');
    setPageSize(9);
    setCurrentPage(1);
  };

  // Calcular plantas paginadas
  const paginatedPlants = useMemo(() => {
    const filtered = plants.filter(plant => {
      const matchesSearch = plant.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFuente = !selectedFuente || plant.fuente === selectedFuente;
      return matchesSearch && matchesFuente;
    });

    // Ordenar
    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.usuarios - b.usuarios;
      }
      return b.usuarios - a.usuarios;
    });

    // Paginar
    if (pageSize === 0) return sorted; // Mostrar todo
    const startIndex = (currentPage - 1) * pageSize;
    return sorted.slice(startIndex, startIndex + pageSize);
  }, [plants, searchTerm, selectedFuente, sortOrder, pageSize, currentPage]);

  // Calcular total de páginas
  const totalPages = useMemo(() => {
    if (pageSize === 0) return 1;
    const filtered = plants.filter(plant => {
      const matchesSearch = plant.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFuente = !selectedFuente || plant.fuente === selectedFuente;
      return matchesSearch && matchesFuente;
    });
    return Math.ceil(filtered.length / pageSize);
  }, [plants, searchTerm, selectedFuente, pageSize]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={() => window.location.reload()} />;
  if (paginatedPlants.length === 0) return <Empty message="No se encontraron plantas que coincidan con los filtros" />;

  return (
    <div className={styles.plantasContainer}>
      <header className={styles.header}>
        <h1>Plantas de Tratamiento</h1>
        <p>Gestiona y monitorea las plantas de tratamiento de agua</p>
      </header>

      {/* Filtros y búsqueda */}
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedFuente={selectedFuente}
        setSelectedFuente={setSelectedFuente}
        fuenteOptions={fuenteOptions}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        pageSize={pageSize}
        setPageSize={setPageSize}
        onReset={resetFilters}
      />

      {/* Resultados */}
      <div className={styles.plantasGrid}>
        {paginatedPlants.map((plant) => (
          <PlantCard
            key={plant.id}
            id={plant.id}
            nombre={plant.nombre}
            fuente={plant.fuente}
            ubicacion={plant.ubicacion}
            usuarios={plant.usuarios}
            estado={plant.estado}
            ultimaLectura={plant.ultima_lectura}
          />
        ))}
      </div>

      {/* Paginación */}
      {pageSize > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          showAll={pageSize === 0}
          totalItems={plants.length}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};

export default Plantas;
