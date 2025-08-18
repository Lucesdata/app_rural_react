import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/plantas.module.css';

/**
 * PlantCard - Muestra la tarjeta de una planta con su información básica
 * @param {Object} props - Propiedades del componente
 * @param {string} props.id - ID de la planta
 * @param {string} props.nombre - Nombre de la planta
 * @param {string} props.fuente - Fuente de agua de la planta
 * @param {number} props.usuarios - Número de usuarios de la planta
 * @param {string} props.estado - Estado actual de la planta
 * @param {string} props.ultimaLectura - Fecha de la última lectura
 */
const PlantCard = ({ id, nombre, fuente, usuarios, estado, ultimaLectura }) => (
  <Link to={`/plantas/${id}`} className={styles.plantCard}>
    <div className={styles.plantHeader}>
      <h3 className={styles.plantName}>{nombre}</h3>
      <span className={`${styles.plantStatus} ${styles[estado]}`}>
        {estado}
      </span>
    </div>
    <div className={styles.plantDetails}>
      <div className={styles.detailItem}>
        <span className={styles.detailLabel}>Fuente:</span>
        <span className={styles.detailValue}>{fuente}</span>
      </div>
      <div className={styles.detailItem}>
        <span className={styles.detailLabel}>Usuarios:</span>
        <span className={styles.detailValue}>{usuarios.toLocaleString()}</span>
      </div>
      <div className={styles.detailItem}>
        <span className={styles.detailLabel}>Última lectura:</span>
        <span className={styles.detailValue}>{ultimaLectura}</span>
      </div>
    </div>
  </Link>
);

export default PlantCard;
