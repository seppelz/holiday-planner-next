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
  const [expandedHolidays, setExpandedHolidays] = useState<string[]>([]);

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
          gap: '1rem', 
          padding: '1.5rem',
          background: '#ffffff',
          borderBottomLeftRadius: '1rem',
          borderBottomRightRadius: '1rem'
        }}>
          <div>
            {firstColumnHolidays.map((holiday, index) => {
              if (!holiday.start) return null;
              const isExpanded = expandedHolidays.includes(`public-${index}`);

              return (
                <div key={index} style={{ 
                  marginBottom: isExpanded ? '1rem' : '0.75rem',
                  position: 'relative'
                }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '0.25rem 0'
                  }}>
                    <div style={{ 
                      fontSize: '0.85rem',
                      color: '#666666',
                      minWidth: '2.5rem'
                    }}>
                      {formatDate(holiday.start)}
                    </div>
                    <div style={{ 
                      flex: 1,
                      fontSize: '0.9rem',
                      color: '#1a1a1a',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      {holiday.name}
                      {holiday.isRegional && (
                        <span style={{ 
                          fontSize: '0.75rem',
                          padding: '0.1rem 0.5rem',
                          background: '#f0f0f0',
                          color: '#666666',
                          borderRadius: '4px'
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
                              ? prev.filter(i => i !== `public-${index}`)
                              : [...prev, `public-${index}`]
                          );
                        }}
                        style={{ 
                          padding: '0.25rem',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#666666',
                          transition: 'transform 0.2s ease'
                        }}
                      >
                        <FontAwesomeIcon 
                          icon={faPlus} 
                          style={{ 
                            fontSize: '0.8rem',
                            transform: isExpanded ? 'rotate(45deg)' : 'none'
                          }}
                        />
                      </button>
                    )}
                  </div>
                  {holiday.details && isExpanded && (
                    <div style={{
                      marginTop: '0.5rem',
                      marginLeft: '3.5rem',
                      padding: '0.75rem',
                      background: '#f8f8f8',
                      borderRadius: '0.5rem',
                      fontSize: '0.9rem',
                      color: '#444444'
                    }}>
                      {holiday.details.description && (
                        <p style={{ marginBottom: '0.75rem' }}>{holiday.details.description}</p>
                      )}
                      {holiday.details.traditions && holiday.details.traditions.length > 0 && (
                        <div style={{ marginBottom: '0.75rem' }}>
                          <h4 style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            marginBottom: '0.5rem',
                            color: '#333333'
                          }}>
                            <FontAwesomeIcon icon={faTrademark} style={{ fontSize: '0.8rem' }} />
                            Traditionen
                          </h4>
                          <ul style={{ 
                            listStyle: 'none',
                            margin: 0,
                            padding: 0
                          }}>
                            {holiday.details.traditions.map((tradition, i) => (
                              <li key={i} style={{ 
                                marginBottom: '0.25rem',
                                paddingLeft: '1rem',
                                position: 'relative'
                              }}>
                                <span style={{
                                  position: 'absolute',
                                  left: 0,
                                  top: '0.5em',
                                  width: '4px',
                                  height: '4px',
                                  background: '#666666',
                                  borderRadius: '50%'
                                }}></span>
                                {tradition}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {holiday.details.locations && holiday.details.locations.length > 0 && (
                        <div>
                          <h4 style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            marginBottom: '0.5rem',
                            color: '#333333'
                          }}>
                            <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: '0.8rem' }} />
                            Beliebte Orte
                          </h4>
                          <ul style={{ 
                            listStyle: 'none',
                            margin: 0,
                            padding: 0
                          }}>
                            {holiday.details.locations.map((location, i) => (
                              <li key={i} style={{ 
                                marginBottom: '0.25rem',
                                paddingLeft: '1rem',
                                position: 'relative'
                              }}>
                                <span style={{
                                  position: 'absolute',
                                  left: 0,
                                  top: '0.5em',
                                  width: '4px',
                                  height: '4px',
                                  background: '#666666',
                                  borderRadius: '50%'
                                }}></span>
                                {location}
                              </li>
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
              const isExpanded = expandedHolidays.includes(`public-${actualIndex}`);

              return (
                <div key={actualIndex} style={{ 
                  marginBottom: isExpanded ? '1rem' : '0.75rem',
                  position: 'relative'
                }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '0.25rem 0'
                  }}>
                    <div style={{ 
                      fontSize: '0.85rem',
                      color: '#666666',
                      minWidth: '2.5rem'
                    }}>
                      {formatDate(holiday.start)}
                    </div>
                    <div style={{ 
                      flex: 1,
                      fontSize: '0.9rem',
                      color: '#1a1a1a',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      {holiday.name}
                      {holiday.isRegional && (
                        <span style={{ 
                          fontSize: '0.75rem',
                          padding: '0.1rem 0.5rem',
                          background: '#f0f0f0',
                          color: '#666666',
                          borderRadius: '4px'
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
                              ? prev.filter(i => i !== `public-${actualIndex}`)
                              : [...prev, `public-${actualIndex}`]
                          );
                        }}
                        style={{ 
                          padding: '0.25rem',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#666666',
                          transition: 'transform 0.2s ease'
                        }}
                      >
                        <FontAwesomeIcon 
                          icon={faPlus} 
                          style={{ 
                            fontSize: '0.8rem',
                            transform: isExpanded ? 'rotate(45deg)' : 'none'
                          }}
                        />
                      </button>
                    )}
                  </div>
                  {holiday.details && isExpanded && (
                    <div style={{
                      marginTop: '0.5rem',
                      marginLeft: '3.5rem',
                      padding: '0.75rem',
                      background: '#f8f8f8',
                      borderRadius: '0.5rem',
                      fontSize: '0.9rem',
                      color: '#444444'
                    }}>
                      {holiday.details.description && (
                        <p style={{ marginBottom: '0.75rem' }}>{holiday.details.description}</p>
                      )}
                      {holiday.details.traditions && holiday.details.traditions.length > 0 && (
                        <div style={{ marginBottom: '0.75rem' }}>
                          <h4 style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            marginBottom: '0.5rem',
                            color: '#333333'
                          }}>
                            <FontAwesomeIcon icon={faTrademark} style={{ fontSize: '0.8rem' }} />
                            Traditionen
                          </h4>
                          <ul style={{ 
                            listStyle: 'none',
                            margin: 0,
                            padding: 0
                          }}>
                            {holiday.details.traditions.map((tradition, i) => (
                              <li key={i} style={{ 
                                marginBottom: '0.25rem',
                                paddingLeft: '1rem',
                                position: 'relative'
                              }}>
                                <span style={{
                                  position: 'absolute',
                                  left: 0,
                                  top: '0.5em',
                                  width: '4px',
                                  height: '4px',
                                  background: '#666666',
                                  borderRadius: '50%'
                                }}></span>
                                {tradition}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {holiday.details.locations && holiday.details.locations.length > 0 && (
                        <div>
                          <h4 style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            marginBottom: '0.5rem',
                            color: '#333333'
                          }}>
                            <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: '0.8rem' }} />
                            Beliebte Orte
                          </h4>
                          <ul style={{ 
                            listStyle: 'none',
                            margin: 0,
                            padding: 0
                          }}>
                            {holiday.details.locations.map((location, i) => (
                              <li key={i} style={{ 
                                marginBottom: '0.25rem',
                                paddingLeft: '1rem',
                                position: 'relative'
                              }}>
                                <span style={{
                                  position: 'absolute',
                                  left: 0,
                                  top: '0.5em',
                                  width: '4px',
                                  height: '4px',
                                  background: '#666666',
                                  borderRadius: '50%'
                                }}></span>
                                {location}
                              </li>
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
          padding: '1.5rem',
          background: '#ffffff',
          borderBottomLeftRadius: '1rem',
          borderBottomRightRadius: '1rem'
        }}>
          {schoolHolidays.map((holiday, index) => {
            if (!holiday.start || !holiday.end) return null;
            const duration = calculateDuration(holiday.start, holiday.end);
            const isExpanded = expandedHolidays.includes(`school-${index}`);

            return (
              <div key={index} style={{ 
                marginBottom: isExpanded ? '1rem' : '0.75rem',
                position: 'relative'
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '0.25rem 0'
                }}>
                  <div style={{ 
                    fontSize: '0.85rem',
                    color: '#666666',
                    minWidth: '5rem'
                  }}>
                    {formatDate(holiday.start)} - {formatDate(holiday.end)}
                  </div>
                  <div style={{ 
                    flex: 1,
                    fontSize: '0.9rem',
                    color: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    {holiday.name}
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#666666',
                      fontWeight: 'normal'
                    }}>
                      {duration} Tage
                    </span>
                  </div>
                  {holiday.details && (
                    <button 
                      className={`${styles.expandButton} ${isExpanded ? styles.active : ''}`}
                      aria-expanded={isExpanded}
                      aria-label="Details anzeigen"
                      onClick={() => {
                        setExpandedHolidays(prev => 
                          isExpanded 
                            ? prev.filter(i => i !== `school-${index}`)
                            : [...prev, `school-${index}`]
                        );
                      }}
                      style={{ 
                        padding: '0.25rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#666666',
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      <FontAwesomeIcon 
                        icon={faPlus} 
                        style={{ 
                          fontSize: '0.8rem',
                          transform: isExpanded ? 'rotate(45deg)' : 'none'
                        }}
                      />
                    </button>
                  )}
                </div>
                {holiday.details && isExpanded && (
                  <div style={{
                    marginTop: '0.5rem',
                    marginLeft: '6rem',
                    padding: '0.75rem',
                    background: '#f8f8f8',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem',
                    color: '#444444'
                  }}>
                    {holiday.details.description && (
                      <p style={{ marginBottom: '0.75rem' }}>{holiday.details.description}</p>
                    )}
                    {holiday.details.familyActivities && holiday.details.familyActivities.length > 0 && (
                      <div>
                        <h4 style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          marginBottom: '0.5rem',
                          color: '#333333'
                        }}>
                          <FontAwesomeIcon icon={faGraduationCap} style={{ fontSize: '0.8rem' }} />
                          Aktivitäten für Familien
                        </h4>
                        <ul style={{ 
                          listStyle: 'none',
                          margin: 0,
                          padding: 0
                        }}>
                          {holiday.details.familyActivities.map((activity, i) => (
                            <li key={i} style={{ 
                              marginBottom: '0.25rem',
                              paddingLeft: '1rem',
                              position: 'relative'
                            }}>
                              <span style={{
                                position: 'absolute',
                                left: 0,
                                top: '0.5em',
                                width: '4px',
                                height: '4px',
                                background: '#666666',
                                borderRadius: '50%'
                              }}></span>
                              {activity}
                            </li>
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
  );
} 