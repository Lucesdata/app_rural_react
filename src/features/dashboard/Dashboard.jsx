import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { 
  FiMenu, FiHome, FiDroplet, FiFileText, FiSettings, 
  FiBell, FiSearch, FiChevronDown, FiUser, FiUsers, FiZap 
} from 'react-icons/fi';
import styles from './dashboard.module.css';
import plantasData from '../../data/plantas.json';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Calculate KPI data from plantas.json
  const totalPlants = plantasData.length;
  const totalUsers = plantasData.reduce((sum, plant) => sum + (plant.usuarios || 0), 0);
  const totalPopulation = plantasData.reduce((sum, plant) => sum + (plant.poblacion || 0), 0);
  const avgCaudalDiseno = (plantasData.reduce((sum, plant) => sum + (plant.caudalDiseno || 0), 0) / totalPlants).toFixed(2);
  
  // Colors for charts
  const COLORS = ['#7e57c2', '#5e35b1', '#9575cd', '#b39ddb', '#d1c4e9'];
  
  // KPI data
  const kpis = [
    { 
      title: 'Total Plantas', 
      value: totalPlants, 
      icon: <FiDroplet className={styles.kpiIcon} />,
      trend: '+2',
      trendPositive: true
    },
    { 
      title: 'Total Usuarios', 
      value: totalUsers.toLocaleString(), 
      icon: <FiUsers className={styles.kpiIcon} />,
      trend: '+5%',
      trendPositive: true
    },
    { 
      title: 'Población Atendida', 
      value: totalPopulation.toLocaleString(), 
      icon: <FiUsers className={styles.kpiIcon} />,
      trend: '+3%',
      trendPositive: true
    },
    { 
      title: 'Caudal Promedio', 
      value: avgCaudalDiseno, 
      unit: ' L/s',
      icon: <FiZap className={styles.kpiIcon} />,
      trend: '0%',
      trendPositive: true
    }
  ];

  // Toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? '' : styles.sidebarCollapsed}`}>
        <div className={styles.logo}>
          <FiDroplet className={styles.logoIcon} />
          {sidebarOpen && <span>AquaTrack</span>}
        </div>
        
        <nav className={styles.nav}>
          <Link to="/dashboard" className={`${styles.navItem} ${styles.navItemActive}`}>
            <FiHome className={styles.navIcon} />
            {sidebarOpen && <span className={styles.navText}>Dashboard</span>}
          </Link>
          <Link to="/plantas" className={styles.navItem}>
            <FiDroplet className={styles.navIcon} />
            {sidebarOpen && <span className={styles.navText}>Plantas</span>}
          </Link>
          <Link to="/reportes" className={styles.navItem}>
            <FiFileText className={styles.navIcon} />
            {sidebarOpen && <span className={styles.navText}>Reportes</span>}
          </Link>
          <Link to="/configuracion" className={styles.navItem}>
            <FiSettings className={styles.navIcon} />
            {sidebarOpen && <span className={styles.navText}>Configuración</span>}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`${styles.mainContent} ${!sidebarOpen ? styles.mainContentExpanded : ''}`}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button 
              className={styles.menuButton} 
              onClick={toggleSidebar}
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              <FiMenu />
            </button>
            <h1 className={styles.pageTitle}>Dashboard</h1>
          </div>
          
          <div className={styles.headerActions}>
            <div className={styles.searchBar}>
              <FiSearch className={styles.searchIcon} />
              <input 
                type="text" 
                className={styles.searchInput} 
                placeholder="Buscar..." 
                aria-label="Buscar"
              />
            </div>
            
            <button className={styles.notificationButton} aria-label="Notificaciones">
              <FiBell />
              <span className={styles.notificationBadge}>3</span>
            </button>
            
            <div className={styles.userInfo} onClick={toggleMobileMenu}>
              <div className={styles.avatar}>DG</div>
              {!sidebarOpen && (
                <div className={styles.userDetails}>
                  <span className={styles.userName}>David Grey H</span>
                  <span className={styles.userRole}>Project Manager</span>
                </div>
              )}
              <FiChevronDown className={styles.dropdownIcon} />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className={styles.dashboardContent}>
          {/* KPI Cards */}
          <div className={styles.kpiGrid}>
            {kpis.map((kpi, index) => (
              <div key={index} className={styles.kpiCard}>
                <div className={styles.kpiIconContainer}>
                  {kpi.icon}
                </div>
                <div className={styles.kpiContent}>
                  <div className={styles.kpiValue}>
                    {kpi.value}
                    {kpi.unit && <span className={styles.kpiUnit}>{kpi.unit}</span>}
                  </div>
                  <div className={styles.kpiLabel}>{kpi.title}</div>
                  <div className={`${styles.kpiTrend} ${kpi.trendPositive ? styles.trendUp : styles.trendDown}`}>
                    {kpi.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Charts Section */}
          <div className={styles.chartsSection}>
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <h2 className={styles.chartTitle}>Caudal Diseño vs. Concesión</h2>
                <div className={styles.chartLegend}>
                  <div className={styles.legendItem}>
                    <div className={`${styles.legendColor} ${styles.purple}`}></div>
                    <span>Caudal Diseño</span>
                  </div>
                  <div className={styles.legendItem}>
                    <div className={`${styles.legendColor} ${styles.teal}`}></div>
                    <span>Caudal Concesión</span>
                  </div>
                </div>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={plantasData.slice(0, 5).map(plant => ({
                      name: plant.planta.split(' ').pop(),
                      caudalDiseno: plant.caudalDiseno || 0,
                      caudalConcesion: plant.caudalConcesion || 0
                    }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="caudalDiseno" fill="#7e57c2" name="Caudal Diseño" />
                    <Bar dataKey="caudalConcesion" fill="#4db6ac" name="Caudal Concesión" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <h2 className={styles.chartTitle}>Distribución por Tipo de Planta</h2>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={Object.entries(
                        plantasData.reduce((acc, plant) => {
                          const type = plant.tipoPlanta || 'Sin especificar';
                          acc[type] = (acc[type] || 0) + 1;
                          return acc;
                        }, {})
                      ).map(([name, value]) => ({
                        name,
                        value,
                        percentage: Math.round((value / totalPlants) * 100)
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {Object.entries(
                        plantasData.reduce((acc, plant) => {
                          const type = plant.tipoPlanta || 'Sin especificar';
                          acc[type] = (acc[type] || 0) + 1;
                          return acc;
                        }, {})
                      ).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [
                      `${props.payload.percentage}% (${value} ${value === 1 ? 'planta' : 'plantas'})`,
                      name
                    ]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
