import React from 'react';
import styles from '../../../styles/plantas.module.css';

/**
 * Pagination - Componente de paginación para la lista de plantas
 * @param {Object} props - Propiedades del componente
 * @param {number} props.currentPage - Página actual
 * @param {number} props.totalPages - Total de páginas disponibles
 * @param {Function} props.onPageChange - Función para cambiar de página
 * @param {boolean} props.showAll - Indica si se están mostrando todos los resultados
 * @param {number} props.totalItems - Número total de ítems
 * @param {number} props.pageSize - Tamaño de página actual
 */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showAll,
  totalItems,
  pageSize
}) => {
  if (showAll) {
    return (
      <div className={styles.paginationInfo}>
        Mostrando todos los {totalItems} resultados
      </div>
    );
  }

  const pageNumbers = [];
  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationInfo}>
        Mostrando {startItem}-{endItem} de {totalItems} resultados
      </div>
      
      <div className={styles.paginationControls}>
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={styles.pageButton}
          aria-label="Ir a la primera página"
        >
          «
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.pageButton}
          aria-label="Página anterior"
        >
          ‹
        </button>
        
        {startPage > 1 && (
          <span className={styles.pageEllipsis}>...</span>
        )}
        
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`${styles.pageButton} ${currentPage === number ? styles.active : ''}`}
            aria-label={`Ir a la página ${number}`}
            aria-current={currentPage === number ? 'page' : undefined}
          >
            {number}
          </button>
        ))}
        
        {endPage < totalPages && (
          <span className={styles.pageEllipsis}>...</span>
        )}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
          aria-label="Página siguiente"
        >
          ›
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
          aria-label="Ir a la última página"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
