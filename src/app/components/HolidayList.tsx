'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarDays, 
  faGraduationCap,
  faLocationDot,
  faTrademark,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { Holiday } from '@/types/Holiday';
import styles from '@/app/styles/StatePage.module.css';

interface HolidayListProps {
  publicHolidays: Holiday[];
  regionalHolidays: Holiday[];
  schoolHolidays: Holiday[];
  totalSchoolHolidayDays: number;
  primaryColor: string;
  secondaryColor: string;
}

const calculateDuration = (start: string, end: string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit'
  });
};

function getHeaderBackground(primary: string, secondary: string) {
  return `linear-gradient(135deg,
    color-mix(in srgb, var(--landing-primary) 70%, ${primary}),
    color-mix(in srgb, var(--landing-secondary) 70%, ${secondary})
  )`;
}

function getHeaderStyles(primary: string, secondary: string) {
  return {
    background: getHeaderBackground(primary, secondary),
    color: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem'
  };
}

export default function HolidayList({ 
  publicHolidays, 
  regionalHolidays, 
  schoolHolidays, 
  totalSchoolHolidayDays,
  primaryColor,
  secondaryColor
}: HolidayListProps) {
  const [expandedHolidays, setExpandedHolidays] = useState<number[]>([]);

  const allPublicHolidays = [...publicHolidays, ...regionalHolidays]
    .sort((a, b) => {
      if (!a.start || !b.start) return 0;
      return new Date(a.start).getTime() - new Date(b.start).getTime();
    });

  const midPoint = Math.ceil(allPublicHolidays.length / 2);
  const firstColumnHolidays = allPublicHolidays.slice(0, midPoint);
  const secondColumnHolidays = allPublicHolidays.slice(midPoint);

  return (
    <div className={styles.holidayGrid} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
      <div className={styles.holidayColumn}>
        <div className={styles.columnHeader} style={getHeaderStyles(primaryColor, secondaryColor)}>
          <FontAwesomeIcon icon={faCalendarDays} className={styles.headerIcon} style={{ 
            color: '#ffffff',
            fontSize: '1.75rem',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
          }} />
          <div>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              marginBottom: '0.375rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Gesetzliche Feiertage
            </h2>
            <p style={{ 
              fontSize: '1rem', 
              opacity: '0.95',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              {allPublicHolidays.length} Feiertage in 2025
            </p>
          </div>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '0.5rem', 
          padding: '0.75rem',
          background: 'var(--bg-card)'
        }}>
          <div>
            {firstColumnHolidays.map((holiday, index) => {
              if (!holiday.start) return null;
              const isExpanded = expandedHolidays.includes(index);

              return (
                <div key={index} className={styles.holidayItem} style={{ 
                  marginBottom: '0.25rem',
                  background: 'var(--bg-card)',
                  borderColor: 'var(--state-border-light)',
                  color: 'var(--text-primary)'
                }}>
                  <div className={styles.holidayRow} style={{ padding: '0.5rem 0.75rem' }}>
                    <div className={styles.holidayDate} style={{ 
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)'
                    }}>
                      {formatDate(holiday.start)}
                    </div>
                    <div className={styles.holidayName} style={{ fontSize: '0.9rem' }}>
                      {holiday.name}
                      {holiday.isRegional && (
                        <span className={styles.regionalBadge} style={{ 
                          fontSize: '0.75rem',
                          padding: '0.1rem 0.5rem',
                          background: 'var(--state-primary-lighter)',
                          color: 'var(--state-text-on-primary)'
                        }}>Regional</span>
                      )}
                    </div>
                    {holiday.details && (
                      <button 
                        className={`${styles.expandButton} ${isExpanded ? styles.active : ''}`}
                        aria-expanded={isExpanded}
                        aria-label="Details anzeigen"
                        onClick={() => {
                          setExpandedHolidays(prev => 
                            isExpanded 
                              ? prev.filter(i => i !== index)
                              : [...prev, index]
                          );
                        }}
                        style={{ padding: '0.25rem' }}
                      >
                        <FontAwesomeIcon 
                          icon={faPlus} 
                          className={styles.expandIcon}
                          style={{ fontSize: '0.8rem' }}
                        />
                      </button>
                    )}
                  </div>
                  {holiday.details && isExpanded && (
                    <div className={styles.holidayDetails}>
                      {holiday.details.description && (
                        <p className={styles.description}>{holiday.details.description}</p>
                      )}
                      {holiday.details.traditions && holiday.details.traditions.length > 0 && (
                        <div className={styles.traditions}>
                          <h4>
                            <FontAwesomeIcon icon={faTrademark} className={styles.traditionIcon} />
                            Traditionen
                          </h4>
                          <ul>
                            {holiday.details.traditions.map((tradition, i) => (
                              <li key={i}>{tradition}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {holiday.details.locations && holiday.details.locations.length > 0 && (
                        <div className={styles.locations}>
                          <h4>
                            <FontAwesomeIcon icon={faLocationDot} className={styles.locationIcon} />
                            Beliebte Orte
                          </h4>
                          <ul>
                            {holiday.details.locations.map((location, i) => (
                              <li key={i}>{location}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div>
            {secondColumnHolidays.map((holiday, index) => {
              const actualIndex = index + midPoint;
              if (!holiday.start) return null;
              const isExpanded = expandedHolidays.includes(actualIndex);

              return (
                <div key={actualIndex} className={styles.holidayItem} style={{ marginBottom: '0.25rem' }}>
                  <div className={styles.holidayRow} style={{ padding: '0.5rem 0.75rem' }}>
                    <div className={styles.holidayDate} style={{ fontSize: '0.85rem' }}>
                      {formatDate(holiday.start)}
                    </div>
                    <div className={styles.holidayName} style={{ fontSize: '0.9rem' }}>
                      {holiday.name}
                      {holiday.isRegional && (
                        <span className={styles.regionalBadge} style={{ fontSize: '0.75rem', padding: '0.1rem 0.5rem' }}>Regional</span>
                      )}
                    </div>
                    {holiday.details && (
                      <button 
                        className={`${styles.expandButton} ${isExpanded ? styles.active : ''}`}
                        aria-expanded={isExpanded}
                        aria-label="Details anzeigen"
                        onClick={() => {
                          setExpandedHolidays(prev => 
                            isExpanded 
                              ? prev.filter(i => i !== actualIndex)
                              : [...prev, actualIndex]
                          );
                        }}
                        style={{ padding: '0.25rem' }}
                      >
                        <FontAwesomeIcon 
                          icon={faPlus} 
                          className={styles.expandIcon}
                          style={{ fontSize: '0.8rem' }}
                        />
                      </button>
                    )}
                  </div>
                  {holiday.details && isExpanded && (
                    <div className={styles.holidayDetails}>
                      {holiday.details.description && (
                        <p className={styles.description}>{holiday.details.description}</p>
                      )}
                      {holiday.details.traditions && holiday.details.traditions.length > 0 && (
                        <div className={styles.traditions}>
                          <h4>
                            <FontAwesomeIcon icon={faTrademark} className={styles.traditionIcon} />
                            Traditionen
                          </h4>
                          <ul>
                            {holiday.details.traditions.map((tradition, i) => (
                              <li key={i}>{tradition}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {holiday.details.locations && holiday.details.locations.length > 0 && (
                        <div className={styles.locations}>
                          <h4>
                            <FontAwesomeIcon icon={faLocationDot} className={styles.locationIcon} />
                            Beliebte Orte
                          </h4>
                          <ul>
                            {holiday.details.locations.map((location, i) => (
                              <li key={i}>{location}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.holidayColumn}>
        <div className={styles.columnHeader} style={getHeaderStyles(secondaryColor, primaryColor)}>
          <FontAwesomeIcon icon={faGraduationCap} className={styles.headerIcon} style={{ 
            color: '#ffffff',
            fontSize: '1.75rem',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
          }} />
          <div>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              marginBottom: '0.375rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Schulferien
            </h2>
            <p style={{ 
              fontSize: '1rem', 
              opacity: '0.95',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              {totalSchoolHolidayDays} Ferientage in 2025
            </p>
          </div>
        </div>
        <div style={{ 
          padding: '0.75rem',
          background: 'var(--bg-card)'
        }}>
          {schoolHolidays.map((holiday, index) => {
            if (!holiday.start || !holiday.end) return null;
            const duration = calculateDuration(holiday.start, holiday.end);

            return (
              <div key={index} className={styles.holidayItem} style={{ 
                marginBottom: '0.5rem',
                background: 'var(--bg-card)',
                borderColor: 'var(--state-border-light)',
                color: 'var(--text-primary)'
              }}>
                <div className={styles.holidayRow} style={{ padding: '0.75rem' }}>
                  <div className={styles.holidayDate} style={{ 
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)'
                  }}>
                    {formatDate(holiday.start)} - {formatDate(holiday.end)}
                    <span className={styles.duration} style={{
                      background: 'var(--state-primary-lighter)',
                      color: 'var(--state-text-on-primary)'
                    }}>
                      {duration} Tage
                    </span>
                  </div>
                  <div className={styles.holidayName} style={{ fontSize: '0.9rem' }}>
                    {holiday.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 