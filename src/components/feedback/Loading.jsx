import React from 'react';
import uiStyles from '../../styles/ui.module.css';

const Loading = ({ message = 'Cargando...' }) => {
  return (
    <div className={uiStyles.feedbackContainer} aria-live="polite" aria-busy="true">
      <div className={uiStyles.spinner} aria-hidden="true" />
      <p className={uiStyles.feedbackMessage}>{message}</p>
    </div>
  );
};

export default Loading;
