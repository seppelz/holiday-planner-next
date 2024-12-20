'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarDays, 
  faGraduationCap, 
  faInfoCircle,
  faLeaf,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from '@/app/styles/StatePage.module.css';

interface Section {
  id: string;
  label: string;
  icon: IconDefinition;
}

const sections: Section[] = [
  { id: 'overview', label: 'Feiertage', icon: faCalendarDays },
  { id: 'school-holidays', label: 'Schulferien', icon: faGraduationCap },
  { id: 'about', label: 'Über', icon: faInfoCircle },
  { id: 'seasons', label: 'Saisonales', icon: faLeaf },
  { id: 'destinations', label: 'Reiseziele', icon: faLocationDot }
];

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px'
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.sectionNav} aria-label="Seitennavigation">
      <ul>
        {sections.map(({ id, label, icon }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
              }}
              className={activeSection === id ? styles.active : ''}
            >
              <FontAwesomeIcon icon={icon} className="w-4 h-4 mr-2" />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
} 