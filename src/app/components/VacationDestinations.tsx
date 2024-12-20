'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLocationDot,
  faPersonHiking,
  faMonument,
  faMountain,
  faCity,
  faTree,
  faWater,
  faLandmark
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from '@/app/styles/StatePage.module.css';

interface VacationDestination {
  name: string;
  description: string;
  attractions: string[];
  activities: string[];
}

interface VacationDestinationsProps {
  destinations: VacationDestination[];
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor?: string;
}

const getDestinationIcon = (destinationName: string): IconDefinition => {
  const name = destinationName.toLowerCase();
  if (name.includes('schloss') || name.includes('burg')) return faMonument;
  if (name.includes('berg') || name.includes('alpen')) return faMountain;
  if (name.includes('stadt') || name.includes('city')) return faCity;
  if (name.includes('wald')) return faTree;
  if (name.includes('see') || name.includes('meer')) return faWater;
  return faLandmark;
};

export default function VacationDestinations({ destinations, primaryColor, secondaryColor, tertiaryColor }: VacationDestinationsProps) {
  return (
    <section id="destinations" className={styles.vacationSection}>
      <h2>Beliebte Reiseziele</h2>
      <div className={styles.vacationGrid}>
        {destinations.map((destination, index) => (
          <div key={index} className={styles.vacationCard}>
            <div className={styles.destinationHeader}>
              <FontAwesomeIcon 
                icon={getDestinationIcon(destination.name)} 
                className={styles.destinationIcon} 
              />
              <h3>{destination.name}</h3>
            </div>
            <div className={styles.destinationContent}>
              <p className={styles.destinationDescription}>{destination.description}</p>
              <div className={styles.destinationDetails}>
                {destination.attractions && destination.attractions.length > 0 && (
                  <div className={styles.attractionsSection}>
                    <div className={styles.sectionHeader}>
                      <FontAwesomeIcon icon={faLocationDot} className={styles.sectionIcon} />
                      <h4>Sehenswürdigkeiten</h4>
                    </div>
                    <ul>
                      {destination.attractions.map((attraction, i) => (
                        <li key={i}>{attraction}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {destination.activities && destination.activities.length > 0 && (
                  <div className={styles.activitiesSection}>
                    <div className={styles.sectionHeader}>
                      <FontAwesomeIcon icon={faPersonHiking} className={styles.sectionIcon} />
                      <h4>Aktivitäten</h4>
                    </div>
                    <ul>
                      {destination.activities.map((activity, i) => (
                        <li key={i}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 