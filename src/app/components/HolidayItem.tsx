'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faLocationDot, faTrademark } from '@fortawesome/free-solid-svg-icons';
import styles from '@/app/styles/StatePage.module.css';
import { Holiday, HolidayDetails } from '@/types/Holiday';

interface HolidayItemProps {
  holiday: Holiday;
  primaryColor: string;
}

export default function HolidayItem({ holiday, primaryColor }: HolidayItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={styles.holidayItem}
      style={{ 
        '--hover-color': primaryColor,
        '--active-color': primaryColor 
      } as React.CSSProperties}
    >
      <div 
        className={`${styles.holidayRow} ${isExpanded ? styles.expanded : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={styles.holidayDate}>
          <time dateTime={holiday.start}>
            {new Date(holiday.start).toLocaleDateString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </time>
          {holiday.end && (
            <>
              <span className={styles.dateSeparator}>-</span>
              <time dateTime={holiday.end}>
                {new Date(holiday.end).toLocaleDateString('de-DE', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </time>
            </>
          )}
        </div>
        <div className={styles.holidayInfo}>
          <div className={styles.holidayName}>
            {holiday.name}
            {holiday.isRegional && (
              <FontAwesomeIcon icon={faLocationDot} className={styles.holidayIcon} />
            )}
          </div>
          {holiday.details && (
            <div className={styles.holidayDetails}>
              {holiday.details.description}
              {holiday.details.locations && (
                <div className={styles.locationList}>
                  {holiday.details.locations.map((location, index) => (
                    <span key={index} className={styles.location}>
                      <FontAwesomeIcon icon={faLocationDot} className={styles.locationIcon} />
                      {location}
                    </span>
                  ))}
                </div>
              )}
              {holiday.details.traditions && (
                <div className={styles.traditionList}>
                  {holiday.details.traditions.map((tradition, index) => (
                    <span key={index} className={styles.tradition}>
                      <FontAwesomeIcon icon={faTrademark} className={styles.traditionIcon} />
                      {tradition}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <FontAwesomeIcon 
          icon={isExpanded ? faChevronUp : faChevronDown} 
          className={styles.expandIcon}
        />
      </div>
    </div>
  );
} 