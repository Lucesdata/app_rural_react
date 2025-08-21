import React, { useState, useMemo } from 'react';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './dashboard.module.css';
import plantasData from '../../data/plantas.json';

// Helper functions
const normalizePlantasData = (data) => {
  return data.map(planta => ({
    ...planta,
    caudalDiseño: parseFloat((planta.caudalDiseño || planta.caudalDiseno || planta.caudaDiseño || planta.caudalDiseno || 0).toString().replace(',', '.')) || 0,
    usuarios: parseInt(planta.usuarios || 0, 10) || 0
  }));
};

const shortName = (name = '') => {
  const s = String(name).replace('PTAP', '').trim();
  return s.length > 16 ? s.slice(0, 13) + '…' : s;
};

const formatNumber = (num) => new Intl.NumberFormat('es-CO').format(num);

export default function Dashboard() {
  // Normalizar datos
  const normalizedData = useMemo(() => normalizePlantasData(plantasData), []);

  // Estado de filtros
  const [filters, setFilters] = useState({ corregimiento: '', fuente: '' });

  // Opciones únicas para filtros
  const filterOptions = useMemo(() => ({
    corregimiento: ['', ...new Set(normalizedData.map(p => p.corregimiento).filter(Boolean))].sort(),
    fuente: ['', ...new Set(normalizedData.map(p => p.fuente).filter(Boolean))].sort()
  }), [normalizedData]);

  // Aplicar filtros
  const filteredData = useMemo(() =>
    normalizedData.filter(planta =>
      (!filters.corregimiento || planta.corregimiento === filters.corregimiento) &&
      (!filters.fuente || planta.fuente === filters.fuente)
    ),
    [normalizedData, filters]
  );

  // Datos para gráficos
  const chartData = useMemo(() => {
    const sortedData = [...filteredData].sort((a, b) => (b.usuarios || 0) - (a.usuarios || 0));
    const isTop10 = sortedData.length > 10;
    const displayData = isTop10 ? sortedData.slice(0, 10) : sortedData;
    return {
      data: displayData,
      isTop10
    };
  }, [filteredData]);

  // KPIs
  const stats = useMemo(() => {
    const caudales = filteredData.map(p => p.caudalDiseño).filter(Boolean);
    const totalFlow = caudales.reduce((sum, val) => sum + val, 0);
    const avgFlow = caudales.length > 0 ? totalFlow / caudales.length : 0;
    let maxFlow = { value: 0, planta: '' };
    filteredData.forEach(planta => {
      if (planta.caudalDiseño > maxFlow.value) {
        maxFlow = {
          value: planta.caudalDiseño,
          planta: planta.nombre || ''
        };
      }
    });
    return {
      totalFlow,
      avgFlow,
      maxFlow
    };
  }, [filteredData]);

  // Manejador de filtros
  const handleFilterChange = (filterType) => (e) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: e.target.value
    }));
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Dashboard</h1>

      {/* Filtros */}
      <div className={styles.filtersContainer}>
        <div className={styles.filterGroup}>
          <label htmlFor="corregimiento-filter" className={styles.filterLabel}>Corregimiento</label>
          <select
            id="corregimiento-filter"
            value={filters.corregimiento}
            onChange={handleFilterChange('corregimiento')}
            className={styles.filterSelect}
          >
            {filterOptions.corregimiento.map(option => (
              <option key={option} value={option}>{option || 'Todos los corregimientos'}</option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="fuente-filter" className={styles.filterLabel}>Fuente</label>
          <select
            id="fuente-filter"
            value={filters.fuente}
            onChange={handleFilterChange('fuente')}
            className={styles.filterSelect}
          >
            {filterOptions.fuente.map(option => (
              <option key={option} value={option}>{option || 'Todas las fuentes'}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPIs */}
      <div className={styles.kpisRow}>
        {/* Caudal Total */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiValue}>
            {formatNumber(stats.totalFlow.toFixed(1))} <span className={styles.kpiUnit}>L/s</span>
          </div>
          <div className={styles.kpiTitle}>Caudal Total</div>
          <div className={styles.kpiDescription}>
            {filteredData.length} {filteredData.length === 1 ? 'planta' : 'plantas'}
          </div>
        </div>
        {/* Caudal Promedio */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiValue}>
            {filteredData.length > 0 ? stats.avgFlow.toFixed(2) : '0.00'} <span className={styles.kpiUnit}>L/s</span>
          </div>
          <div className={styles.kpiTitle}>Caudal Promedio</div>
          <div className={styles.kpiDescription}>
            {filteredData.length > 0 ? 'por planta' : 'sin datos'}
          </div>
        </div>
        {/* Caudal Máximo */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiValue}>
            {stats.maxFlow.value > 0 ? (
              <>
                {stats.maxFlow.value.toFixed(2)} <span className={styles.kpiUnit}>L/s</span>
              </>
            ) : (
              '0.00 L/s'
            )}
          </div>
          <div className={styles.kpiTitle}>Caudal Máximo</div>
          <div className={styles.kpiDescription}>
            {stats.maxFlow.planta ? `• ${shortName(stats.maxFlow.planta)}` : 'sin datos'}
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className={styles.chartsRow}>
        {/* Caudal por Planta (Línea) */}
        <div className={styles.chartContainer}>
          <h3 className={styles.chartTitle}>Caudal por Planta (L/s)</h3>
          <div className={styles.chartWrapper}>
            {filteredData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis 
                    dataKey="nombre" 
                    angle={-28}
                    textAnchor="end"
                    height={60}
                    tick={{ fill: '#a0aec0', fontSize: 12 }}
                    tickFormatter={shortName}
                  />
                  <YAxis 
                    tick={{ fill: '#a0aec0', fontSize: 12 }}
                    width={50}
                  />
                  <Tooltip 
                    formatter={(value) => [`${Number(value).toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} L/s`, 'Caudal']}
                    labelFormatter={(label) => `Planta: ${label}`}
                    contentStyle={{
                      backgroundColor: 'rgba(26, 32, 44, 0.95)',
                      border: '1px solid #2d3748',
                      borderRadius: '4px',
                      color: '#e2e8f0',
                      padding: '8px 12px',
                      fontSize: '13px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="caudalDiseño" 
                    stroke="#4299e1" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className={styles.noData}>No hay datos disponibles</div>
            )}
          </div>
        </div>
        {/* Usuarios por Planta (Barras) */}
        <div className={styles.chartContainer}>
          <h3 className={styles.chartTitle}>
            Usuarios por Planta
            {chartData.isTop10 && <span className={styles.top10Badge}>Top 10</span>}
          </h3>
          <div className={styles.chartWrapper}>
            {filteredData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis 
                    dataKey="nombre" 
                    angle={-28}
                    textAnchor="end"
                    height={60}
                    tick={{ fill: '#a0aec0', fontSize: 12 }}
                    tickFormatter={shortName}
                  />
                  <YAxis 
                    tick={{ fill: '#a0aec0', fontSize: 12 }}
                    width={60}
                    tickFormatter={(value) => 
                      new Intl.NumberFormat('es-CO', { 
                        notation: 'compact',
                        maximumFractionDigits: 1
                      }).format(value)
                    }
                  />
                  <Tooltip 
                    formatter={(value) => [
                      new Intl.NumberFormat('es-CO').format(value) + ' usuarios', 
                      'Usuarios'
                    ]}
                    labelFormatter={(label) => `Planta: ${label}`}
                    contentStyle={{
                      backgroundColor: 'rgba(26, 32, 44, 0.95)',
                      border: '1px solid #2d3748',
                      borderRadius: '4px',
                      color: '#e2e8f0',
                      padding: '8px 12px',
                      fontSize: '13px'
                    }}
                  />
                  <Bar 
                    dataKey="usuarios" 
                    fill="#0ea5e9"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className={styles.noData}>No hay datos disponibles</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
