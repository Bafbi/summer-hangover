// src/pages/dashboard.js
import { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import styles from '../styles/dashboard.module.css';

const Dashboard = () => {
  const [data] = useState({
    totalUsers: 120,
    activeUsers: 85,
    totalEvents: 50,
    timePeriods: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    userRegistrations: [5, 10, 12, 8, 15, 18, 25],
    activeUserCounts: [3, 7, 9, 6, 10, 14, 20],
    eventCounts: [2, 3, 4, 2, 5, 7, 10]
  });

  const userChartData = {
    labels: data.timePeriods,
    datasets: [
      {
        label: 'Inscriptions',
        data: data.userRegistrations,
        backgroundColor: 'rgba(255, 99, 132, 0.5)', // Couleur vive rouge avec opacité
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Utilisateurs Actifs',
        data: data.activeUserCounts,
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Couleur vive bleue avec opacité
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  const eventChartData = {
    labels: data.timePeriods,
    datasets: [
      {
        label: 'Sorties',
        data: data.eventCounts,
        backgroundColor: 'rgba(255, 206, 86, 0.5)', // Couleur vive jaune avec opacité
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardWrapper}>
        <h1 className={styles.dashboardTitle}>Tableau de Bord Administrateur</h1>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h2>Total Inscriptions</h2>
            <p>{data.totalUsers}</p>
          </div>
          <div className={styles.card}>
            <h2>Utilisateurs Actifs</h2>
            <p>{data.activeUsers}</p>
          </div>
          <div className={styles.card}>
            <h2>Total Sorties</h2>
            <p>{data.totalEvents}</p>
          </div>
        </div>
        <div className={styles.chartsRow}>
          <div className={styles.chartContainer}>
            <h2>Inscriptions et Utilisateurs Actifs</h2>
            <Bar data={userChartData} />
          </div>
          <div className={styles.chartContainer}>
            <h2>Nombre de Sorties</h2>
            <Line data={eventChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
