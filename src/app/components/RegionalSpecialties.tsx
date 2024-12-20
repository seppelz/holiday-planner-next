'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCrown,
  faChurch,
  faMusic,
  faGift,
  faUtensils,
  faWineGlass,
  faMask,
  faMasksTheater,
  faLandmark,
  faMountain,
  faCity,
  faMugHot
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from '@/app/styles/StatePage.module.css';

interface RegionalItem {
  title: string;
  description: string;
  icon: string;
}

interface RegionalCategory {
  title: string;
  icon: string;
  items: RegionalItem[];
}

interface RegionalSpecialtiesProps {
  specialties: RegionalCategory[];
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor?: string;
}

const iconMap: Record<string, IconDefinition> = {
  'crown': faCrown,
  'church': faChurch,
  'music': faMusic,
  'gift': faGift,
  'food': faUtensils,
  'wine': faWineGlass,
  'mask': faMask,
  'theater': faMasksTheater,
  'monument': faLandmark,
  'mountain': faMountain,
  'city': faCity,
  'landmark': faLandmark,
  'beer': faMugHot,
};

export default function RegionalSpecialties({ specialties, primaryColor, secondaryColor, tertiaryColor }: RegionalSpecialtiesProps) {
  const getIcon = (iconName: string, className = 'regionalIcon') => {
    return <FontAwesomeIcon 
      icon={iconMap[iconName] || faLandmark} 
      className={styles[className] || ''} 
    />;
  };

  return (
    <section className={styles.regionalSection}>
      <h2>Regionale Besonderheiten</h2>
      <div className={styles.regionalGrid}>
        {specialties.map((category, index) => (
          <div key={index} className={styles.regionalCard}>
            <div className={styles.regionalHeader}>
              {getIcon(category.icon)}
              <h3>{category.title}</h3>
            </div>
            <div className={styles.regionalContent}>
              <ul className={styles.regionalList}>
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className={styles.regionalItem}>
                    {getIcon(item.icon, 'regionalItemIcon')}
                    <div className={styles.regionalItemContent}>
                      <h4 className={styles.regionalItemTitle}>{item.title}</h4>
                      <p className={styles.regionalItemDescription}>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 