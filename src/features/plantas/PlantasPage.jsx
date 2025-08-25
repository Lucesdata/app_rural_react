import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { plantasApi } from '../../lib/apiClient';
import localPlantas from '../../data/plantas.json';

export default function PlantasPage() {
  const { user, hasAnyRole } = useAuth();
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ nombre: "", ubicacion: "", tipo: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

    const load = async () => {
      setIsLoading(true);
      try {
        const data = await plantasApi.getPlants();
        setList(data);
        setError("");
      } catch (err) {
        console.error('Error loading plants:', err);
        setError('Mostrando datos de ejemplo.');
        setList(localPlantas);
      } finally {
        setIsLoading(false);
      }
    };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!form.nombre || !form.ubicacion || !form.tipo) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      await plantasApi.createPlant(form);
      setForm({ nombre: "", ubicacion: "", tipo: "" });
      await load();
    } catch (err) {
      console.error('Error creating plant:', err);
      setError(err.message || 'Error al crear la planta');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar esta planta?')) return;
    
    try {
      await plantasApi.deletePlant(id);
      await load();
    } catch (err) {
      console.error('Error deleting plant:', err);
      setError('Error al eliminar la planta');
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <h2>Plantas</h2>
      {user && <p>Bienvenido, {user.name} ({user.role})</p>}
      
      {error && (
        <div style={{ 
          color: '#dc2626', 
          backgroundColor: '#fef2f2', 
          padding: '0.75rem', 
          borderRadius: '0.375rem',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      {hasAnyRole(['ADMIN', 'OPERARIO']) && (
        <form onSubmit={handleCreate} style={{ 
          display: 'grid', 
          gap: '1rem', 
          maxWidth: '600px',
          marginBottom: '2rem',
          padding: '1.5rem',
          backgroundColor: '#f9fafb',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3>Agregar nueva planta</h3>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Nombre</label>
            <input
              type="text"
              placeholder="Nombre de la planta"
              value={form.nombre}
              onChange={(e) => setForm({...form, nombre: e.target.value})}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Ubicación</label>
            <input
              type="text"
              placeholder="Ubicación"
              value={form.ubicacion}
              onChange={(e) => setForm({...form, ubicacion: e.target.value})}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Tipo</label>
            <input
              type="text"
              placeholder="Tipo de planta"
              value={form.tipo}
              onChange={(e) => setForm({...form, tipo: e.target.value})}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                marginBottom: '0.5rem'
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Creando...' : 'Crear Planta'}
          </button>
        </form>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h3>Lista de Plantas</h3>
        {isLoading ? (
          <p>Cargando plantas...</p>
        ) : list.length === 0 ? (
          <p>No hay plantas registradas</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
            marginTop: '1rem'
          }}>
            {list.map((planta) => (
              <div
                key={planta.id}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  backgroundColor: 'white',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <h4 style={{ marginTop: 0, marginBottom: '0.5rem' }}>{planta.nombre}</h4>
                <p style={{ margin: '0.25rem 0', color: '#4b5563' }}>📍 {planta.ubicacion}</p>
                <p style={{ margin: '0.25rem 0', color: '#4b5563' }}>🔧 {planta.tipo}</p>
                
                {hasAnyRole(['ADMIN']) && (
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleDelete(planta.id)}
                      style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
