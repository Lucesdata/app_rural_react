import uiStyles from '../../../../styles/ui.module.css';
import styles from '../../../../styles/plant-detail.module.css';

const TabButton = ({ active, onClick, children }) => (
  <button
    className={`${uiStyles.btn} ${styles.tabButton} ${active ? styles.activeTab : ''}`}
    onClick={onClick}
    aria-selected={active}
    role="tab"
  >
    {children}
  </button>
);

export default TabButton;
