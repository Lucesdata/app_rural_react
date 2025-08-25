import { useNavigate } from 'react-router-dom';

const ErrorDisplay = ({ error, onReset }) => {
  const navigate = useNavigate();
  
  const handleGoHome = () => {
    onReset();
    navigate('/');
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'sans-serif'
    }}>
      <h2 style={{ color: '#dc2626' }}>¡Ups! Algo salió mal</h2>
      <div style={{
        backgroundColor: '#fef2f2',
        padding: '1rem',
        borderRadius: '0.5rem',
        margin: '1rem 0',
        color: '#991b1b'
      }}>
        <pre style={{
          whiteSpace: 'pre-wrap',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.5'
        }}>
          {String(error?.message || error || 'Error desconocido')}
        </pre>
      </div>
      <button
        onClick={handleGoHome}
        style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1rem',
          marginTop: '1rem'
        }}
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default ErrorDisplay;
