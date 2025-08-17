import React from 'react';
import uiStyles from '../../styles/ui.module.css';

const Error = ({ 
  message = 'Ha ocurrido un error', 
  error = null,
  onRetry = null 
}) => {
  return (
    <div className={uiStyles.feedbackContainer} role="alert" aria-live="assertive">
      <div className={`${uiStyles.feedbackIcon} ${uiStyles.errorIcon}`} aria-hidden="true">
        ❌
      </div>
      <p className={uiStyles.feedbackMessage}>
        {message}
        {error && (
          <span className={uiStyles.errorDetails}>
            {error.message || String(error)}
          </span>
        )}
      </p>
      {onRetry && (
        <button 
          className={`${uiStyles.btn} ${uiStyles.btnGhost} ${uiStyles.retryButton}`}
          onClick={onRetry}
        >
          Reintentar
        </button>
      )}
    </div>
  );
};

export default Error;
