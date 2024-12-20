'use client';

import { FaSun, FaLeaf, FaSnowflake, FaUmbrella } from 'react-icons/fa';
import styles from './SeasonalSection.module.css';
import { SeasonalTradition } from '@/types/holiday';

interface SeasonalSectionProps {
  traditions: {
    season: "Frühling" | "Sommer" | "Herbst" | "Winter";
    description: string;
    events?: string[];
  }[];
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor?: string;
  traditionInfo?: string;
}

const getSeasonIcon = (season: string) => {
  switch (season.toLowerCase()) {
    case 'frühling':
    case 'frühjahr':
      return <FaUmbrella style={{ color: '#10b981' }} />;
    case 'sommer':
      return <FaSun style={{ color: '#f59e0b' }} />;
    case 'herbst':
      return <FaLeaf style={{ color: '#b45309' }} />;
    case 'winter':
      return <FaSnowflake style={{ color: '#3b82f6' }} />;
    default:
      return <FaSun style={{ color: '#f59e0b' }} />;
  }
};

const getSeasonClass = (season: string) => {
  switch (season.toLowerCase()) {
    case 'frühling':
    case 'frühjahr':
      return styles.frühling;
    case 'sommer':
      return styles.sommer;
    case 'herbst':
      return styles.herbst;
    case 'winter':
      return styles.winter;
    default:
      return '';
  }
};

export default function SeasonalSection({ traditions, primaryColor, secondaryColor, tertiaryColor, traditionInfo }: SeasonalSectionProps) {
  // Group traditions by season
  const seasonalTraditions = traditions.reduce((acc, tradition) => {
    const season = tradition.season.toLowerCase();
    if (!acc[season]) {
      acc[season] = [];
    }
    acc[season].push(tradition);
    return acc;
  }, {} as Record<string, SeasonalTradition[]>);

  // Define seasons in order
  const seasons = ['frühling', 'sommer', 'herbst', 'winter'];

  return (
    <section className={styles.seasonalSection}>
      <h2>Saisonale Traditionen</h2>
      {traditionInfo && (
        <p className={styles.traditionInfo}>{traditionInfo}</p>
      )}
      <div className={styles.seasonGrid}>
        {seasons.map((season) => {
          const seasonTraditions = seasonalTraditions[season] || [];
          const firstTradition = seasonTraditions[0];
          
          return (
            <div 
              key={season} 
              className={`${styles.seasonCard} ${getSeasonClass(season)}`}
            >
              <div className={styles.seasonIcon}>
                {getSeasonIcon(season)}
              </div>
              <div className={styles.seasonContent}>
                <h3>{season.charAt(0).toUpperCase() + season.slice(1)}</h3>
                <p>{firstTradition?.description || `Traditionen im ${season.charAt(0).toUpperCase() + season.slice(1)}`}</p>
                {seasonTraditions.length > 1 && (
                  <div className={styles.additionalTraditions}>
                    {seasonTraditions.slice(1).map((tradition, index) => (
                      <p key={index} className={styles.additionalTradition}>
                        {tradition.description}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
} 