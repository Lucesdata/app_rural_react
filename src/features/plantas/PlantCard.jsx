import React from "react";
import styles from "./plantas.module.css";

export default function PlantCard({ plant, onSelect, isSelected }) {
  return (
    <button
      type="button"
      className={`${styles.plantCard} ${isSelected ? styles.plantCardSelected : ""}`}
      onClick={() => onSelect(plant.id)}
    >
      <span className={styles.plantIcon} aria-hidden="true">💧</span>
      <span className={styles.plantName}>{plant.planta}</span>
    </button>
  );
}
