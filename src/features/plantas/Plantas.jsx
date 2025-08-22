import React, { useMemo, useState } from "react";
import plantasRaw from "@data/plantas.json";
import styles from "./plantas.module.css";
import { normalizePlant } from "./normalizePlant.js";
import PlantCard from "./PlantCard.jsx";

export default function Plantas() {
  const [selectedId, setSelectedId] = useState("");
  const [query, setQuery] = useState("");

  const plantas = useMemo(() => plantasRaw.map(normalizePlant), []);
  const filtered = useMemo(
    () => plantas.filter(p => p.planta.toLowerCase().includes(query.toLowerCase())),
    [plantas, query]
  );
  const selected = useMemo(() => plantas.find(p => p.id === selectedId), [plantas, selectedId]);

  function fmtInt(n) { return n == null ? "—" : n.toLocaleString("es-CO"); }
  function fmtFloat(n) { return n == null ? "—" : n.toLocaleString("es-CO", { maximumFractionDigits: 2 }); }
  const mapHref = selected?.lat != null && selected?.lng != null
    ? `https://www.google.com/maps?q=${selected.lat},${selected.lng}`
    : null;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Selecciona una planta</h1>

      <label htmlFor="plant-search" className={styles.label}>
        Buscar planta
      </label>
      <input
        id="plant-search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.search}
        placeholder="Escribe para filtrar"
        aria-label="Buscar planta"
      />

      <div className={styles.grid}>
        {filtered.map((p) => (
          <PlantCard
            key={p.id}
            plant={p}
            onSelect={setSelectedId}
            isSelected={p.id === selectedId}
          />
        ))}
      </div>

      {!selected && (
        <section className={styles.empty} aria-live="polite">
          <img
            src="/empty-state.svg"
            className={styles.emptyIcon}
            alt=""
            aria-hidden="true"
          />
          <h2 className={styles.emptyTitle}>Explora plantas de agua potable</h2>
          <p className={styles.emptyHint}>Usa la búsqueda y selecciona una tarjeta para ver detalles de una planta.</p>
          <a href="/dashboard" className={styles.viewAllButton}>
            Ver todas las plantas
          </a>
        </section>
      )}

      {selected && (
        <article className={styles.card} role="region" aria-label={`Planta ${selected.planta}`}>
          <header className={styles.header}>
            <h2 className={styles.cardTitle}>{selected.planta}</h2>
            {mapHref && (
              <a className={styles.mapLink} href={mapHref} target="_blank" rel="noreferrer noopener">
                📍 Ver en mapa
              </a>
            )}
          </header>

          <div className={styles.meta}>
            {selected.vereda && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Vereda</span>
                <span className={styles.metaValue}>{selected.vereda}</span>
              </div>
            )}
            {selected.corregimiento && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Corregimiento</span>
                <span className={styles.metaValue}>{selected.corregimiento}</span>
              </div>
            )}
            {selected.fuente && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Fuente</span>
                <span className={styles.metaValue}>{selected.fuente}</span>
              </div>
            )}
          </div>

          <div className={styles.kpis}>
            <div className={styles.kpiItem} aria-label="Usuarios">
              <span className={styles.icon} aria-hidden="true">👥</span>
              <span className={styles.kpiText}>{fmtInt(selected.usuarios)} usuarios</span>
            </div>
            <div className={styles.kpiItem} aria-label="Población">
              <span className={styles.icon} aria-hidden="true">🏘️</span>
              <span className={styles.kpiText}>{fmtInt(selected.poblacion)} población</span>
            </div>
            <div className={styles.kpiItem} aria-label="Caudal de diseño">
              <span className={styles.icon} aria-hidden="true">💧</span>
              <span className={styles.kpiText}>{fmtFloat(selected.caudalDiseno)} L/s diseño</span>
            </div>
            {selected.caudalConcesion != null && (
              <div className={styles.kpiItem} aria-label="Caudal de concesión">
                <span className={styles.icon} aria-hidden="true">💧</span>
                <span className={styles.kpiText}>{fmtFloat(selected.caudalConcesion)} L/s concesión</span>
              </div>
            )}
          </div>

          {Object.values({
            tipoAgua: selected.tipoAgua,
            tipoPlanta: selected.tipoPlanta,
            conduccion: selected.conduccion,
            tanqueAbastec: selected.tanqueAbastec,
            desarenador: selected.desarenador,
            desinfeccion: selected.desinfeccion
          }).some(Boolean) && (
            <details className={styles.more}>
              <summary className={styles.moreSummary}>Ver más detalles</summary>
              <div className={styles.detailGrid}>
                {Object.entries({
                  'Tipo de agua': selected.tipoAgua,
                  'Tipo de planta': selected.tipoPlanta,
                  'Conducción': selected.conduccion,
                  'Tanque': selected.tanqueAbastec,
                  'Desarenador': selected.desarenador,
                  'Desinfección': selected.desinfeccion
                })
                .filter(([, value]) => Boolean(value))
                .map(([label, value]) => (
                  <div key={label} className={styles.badge}>
                    <span>{label}</span>
                    <strong>{String(value)}</strong>
                  </div>
                ))}
              </div>
            </details>
          )}
        </article>
      )}
    </div>
  );
}
