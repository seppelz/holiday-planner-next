'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLandmark,
  faMonument,
  faBuilding,
  faUniversity,
  faChurch,
  faMasksTheater,
  faMusic,
  faCamera,
  faPalette,
  faCity
} from '@fortawesome/free-solid-svg-icons';
import styles from '@/app/styles/StatePage.module.css';

interface CulturalHighlightsProps {
  highlights: string[];
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor?: string;
}

const getHighlightIcon = (highlight: string) => {
  const text = highlight.toLowerCase();
  if (text.includes('museum') || text.includes('galerie')) return faUniversity;
  if (text.includes('kirche') || text.includes('dom')) return faChurch;
  if (text.includes('theater') || text.includes('oper')) return faMasksTheater;
  if (text.includes('musik') || text.includes('philharmonie')) return faMusic;
  if (text.includes('schloss') || text.includes('burg')) return faMonument;
  if (text.includes('rathaus') || text.includes('gebäude')) return faBuilding;
  if (text.includes('unesco') || text.includes('weltkulturerbe')) return faCamera;
  if (text.includes('kunst') || text.includes('art')) return faPalette;
  if (text.includes('stadt') || text.includes('platz')) return faCity;
  return faLandmark;
};

export default function CulturalHighlights({ highlights, primaryColor, secondaryColor, tertiaryColor }: CulturalHighlightsProps) {
  return (
    <section className={styles.culturalSection} style={{
      background: 'var(--state-background-subtle)'
    }}>
      <h2>Kulturelle Highlights</h2>
      <div className={styles.culturalGrid}>
        {highlights.map((highlight, index) => {
          // Calculate which color to use based on index
          const colorIndex = index % (tertiaryColor ? 3 : 2);
          const highlightColor = colorIndex === 0 ? primaryColor : 
                               colorIndex === 1 ? secondaryColor : 
                               tertiaryColor;

          return (
            <div 
              key={index} 
              className={styles.culturalCard}
              style={{
                background: `linear-gradient(135deg,
                  color-mix(in srgb, ${highlightColor} 2%, white 98%),
                  color-mix(in srgb, ${highlightColor} 3%, white 97%)
                )`,
                borderColor: `color-mix(in srgb, ${highlightColor} 10%, transparent)`,
                '--card-hover-color': highlightColor
              } as React.CSSProperties}
            >
              <FontAwesomeIcon 
                icon={getHighlightIcon(highlight)} 
                className={styles.culturalIcon}
                style={{ color: highlightColor }}
              />
              <h3>{highlight}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
} 