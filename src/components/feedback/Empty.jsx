import React from 'react';
import uiStyles from '../../styles/ui.module.css';

const Empty = ({ message = 'No hay datos disponibles', icon = '📭' }) => {
  return (
    <div className={uiStyles.feedbackContainer} aria-live="polite">
      <div className={uiStyles.feedbackIcon} aria-hidden="true">
        {icon}
      </div>
      <p className={uiStyles.feedbackMessage}>{message}</p>
    </div>
  );
};

export default Empty;
