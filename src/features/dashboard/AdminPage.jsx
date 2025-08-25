import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
// Note: usersApi import is commented out until backend implementation is ready
// import { usersApi } from '../../lib/apiClient';

export default function AdminPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        // This would be replaced with actual API call to fetch users
        // const data = await usersApi.getUsers();
        // setUsers(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading users:', err);
        setError('Error al cargar los usuarios');
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      // This would be replaced with actual API call to update user role
      // await usersApi.updateUserRole(userId, newRole);
      // Update local state
      setUsers(users.map(u => 
        u.id === userId ? { ...u, role: newRole } : u
      ));
    } catch (err) {
      console.error('Error updating user role:', err);
      setError('Error al actualizar el rol del usuario');
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <h2>Panel de Administración</h2>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Panel de Administración</h2>
      <p style={styles.welcomeText}>
        Bienvenido/a, <strong>{user?.name}</strong> ({user?.email})
      </p>
      
      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      <div style={styles.section}>
        <h3>Usuarios del Sistema</h3>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nombre</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Rol</th>
                <th style={styles.th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u.id}>
                    <td style={styles.td}>{u.name}</td>
                    <td style={styles.td}>{u.email}</td>
                    <td style={styles.td}>
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        disabled={u.id === user?.id}
                        style={styles.select}
                      >
                        <option value="USUARIO">Usuario</option>
                        <option value="OPERARIO">Operario</option>
                        <option value="PRESIDENTE_JAA">Presidente JAA</option>
                        <option value="ADMIN">Administrador</option>
                      </select>
                    </td>
                    <td style={styles.td}>
                      {u.id !== user?.id && (
                        <button 
                          onClick={() => {/* Handle delete user */}}
                          style={styles.deleteButton}
                        >
                          Eliminar
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ ...styles.td, textAlign: 'center' }}>
                    No hay usuarios registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div style={styles.section}>
        <h3>Estadísticas del Sistema</h3>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h4>Total de Usuarios</h4>
            <p style={styles.statNumber}>{users.length}</p>
          </div>
          <div style={styles.statCard}>
            <h4>Plantas Registradas</h4>
            <p style={styles.statNumber}>0</p>
          </div>
          <div style={styles.statCard}>
            <h4>Actividad Reciente</h4>
            <p style={styles.statNumber}>0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  welcomeText: {
    color: '#4b5563',
    marginBottom: '24px',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '24px',
    marginBottom: '24px',
  },
  error: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '20px',
  },
  tableContainer: {
    overflowX: 'auto',
    marginTop: '16px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#f3f4f6',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #e5e7eb',
    fontWeight: '600',
    color: '#374151',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #e5e7eb',
    verticalAlign: 'middle',
  },
  select: {
    padding: '6px 12px',
    borderRadius: '4px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '16px',
  },
  statCard: {
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '8px 0 0',
    color: '#1f2937',
  },
};
