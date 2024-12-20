'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { getStateInfo } from '@/config';
import { GERMAN_STATES } from '@/components/Navigation/Navbar';
import { FaSun, FaLeaf, FaSnowflake, FaUmbrella } from 'react-icons/fa';
import { FaMonument, FaMountain, FaCity, FaLandmark, FaTree, FaWater, FaUsers, FaRulerCombined, FaEuroSign, FaCrown, FaChurch, FaMusic, FaGift, FaUtensils, FaWineGlass, FaMask, FaMasksTheater, FaMugHot } from 'react-icons/fa6';
import styles from '@/app/styles/StatePage.module.css';
import type { StatePageHoliday, StateInfo, HolidayDetails, SingleDayHoliday, MultiDayHoliday } from '@/types';
import { parseDateString, formatDateLong } from '@/utils/dateUtils';
import Footer from '@/components/Footer/Footer';

interface RawHolidayBase {
  name: string;
  type: 'public' | 'school';
  isRegional?: boolean;
  details?: HolidayDetails;
}

interface RawSingleDayHoliday extends RawHolidayBase {
  date: string;
  start?: never;
  end?: never;
}

interface RawMultiDayHoliday extends RawHolidayBase {
  date?: never;
  start: string;
  end: string;
}

type RawHoliday = RawSingleDayHoliday | RawMultiDayHoliday;

interface RawStateInfo {
  fullName: string;
  capital: string;
  description: string;
  keyFacts: {
    population: string | number;
    area: string | number;
    gdp?: string | number;
    economicStrength: string[];
  };
  holidays?: RawHoliday[];
  schoolHolidays?: RawHoliday[];
  seasonalTraditions?: Array<{
    season: string;
    description: string;
  }>;
  regionalSpecialties?: Array<{
    title: string;
    icon: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  }>;
  vacationDestinations?: Array<{
    name: string;
    description: string;
    attractions: string[];
    activities: string[];
  }>;
}

// Type guards
const isMultiDayHoliday = (holiday: StatePageHoliday): holiday is MultiDayHoliday => {
  return 'start' in holiday && 'end' in holiday;
};

const isSingleDayHoliday = (holiday: StatePageHoliday): holiday is SingleDayHoliday => {
  return 'date' in holiday;
};

const isRawSingleDayHoliday = (holiday: RawHoliday): holiday is RawSingleDayHoliday => {
  return 'date' in holiday;
};

// Utility functions
const transformStateInfo = (rawInfo: RawStateInfo, stateId: string): StateInfo => {
  const addIds = (holidays: RawHoliday[] = []): StatePageHoliday[] => {
    return holidays.map((holiday, index) => {
      const base = {
        id: `${stateId}-${holiday.type}-${index}`,
        name: holiday.name,
        type: holiday.type,
        isRegional: holiday.isRegional,
        details: holiday.details
      };

      if (isRawSingleDayHoliday(holiday)) {
        return {
          ...base,
          date: holiday.date
        } as SingleDayHoliday;
      }

      return {
        ...base,
        start: holiday.start,
        end: holiday.end
      } as MultiDayHoliday;
    });
  };

  return {
    id: stateId,
    fullName: rawInfo.fullName,
    capital: rawInfo.capital,
    description: rawInfo.description,
    keyFacts: {
      population: Number(rawInfo.keyFacts.population),
      area: Number(rawInfo.keyFacts.area),
      gdp: rawInfo.keyFacts.gdp ? Number(rawInfo.keyFacts.gdp) : undefined,
      economicStrength: rawInfo.keyFacts.economicStrength.map(strength => ({
        name: strength,
        value: 1
      }))
    },
    holidays: addIds(rawInfo.holidays),
    schoolHolidays: addIds(rawInfo.schoolHolidays),
    seasonalTraditions: rawInfo.seasonalTraditions,
    regionalSpecialties: rawInfo.regionalSpecialties,
    vacationDestinations: rawInfo.vacationDestinations
  };
};

const calculateDuration = (start: string, end: string): number => {
  const startDate = parseDateString(start);
  const endDate = parseDateString(end);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

const isValidDate = (date: string | undefined): date is string => {
  if (!date) return false;
  try {
    const d = parseDateString(date);
    return d instanceof Date && !isNaN(d.getTime());
  } catch {
    return false;
  }
};

const getDestinationIcon = (destinationName: string) => {
  const name = destinationName.toLowerCase();
  if (name.includes('schloss') || name.includes('burg')) return <FaMonument className={`${styles.destinationIcon} w-5 h-5`} />;
  if (name.includes('berg') || name.includes('alpen')) return <FaMountain className={`${styles.destinationIcon} w-5 h-5`} />;
  if (name.includes('stadt') || name.includes('city')) return <FaCity className={`${styles.destinationIcon} w-5 h-5`} />;
  if (name.includes('wald')) return <FaTree className={`${styles.destinationIcon} w-5 h-5`} />;
  if (name.includes('see') || name.includes('meer')) return <FaWater className={`${styles.destinationIcon} w-5 h-5`} />;
  return <FaLandmark className={`${styles.destinationIcon} w-5 h-5`} />;
};

const getRegionalIcon = (iconName: string | undefined, className = 'regionalIcon') => {
  if (!iconName) return <FaLandmark className={`${styles[className] || ''} w-5 h-5`} />;
  
  const icons: Record<string, React.ReactElement> = {
    'crown': <FaCrown className={`${styles[className] || ''} w-5 h-5`} />,
    'church': <FaChurch className={`${styles[className] || ''} w-5 h-5`} />,
    'music': <FaMusic className={`${styles[className] || ''} w-5 h-5`} />,
    'gift': <FaGift className={`${styles[className] || ''} w-5 h-5`} />,
    'food': <FaUtensils className={`${styles[className] || ''} w-5 h-5`} />,
    'wine': <FaWineGlass className={`${styles[className] || ''} w-5 h-5`} />,
    'mask': <FaMask className={`${styles[className] || ''} w-5 h-5`} />,
    'theater': <FaMasksTheater className={`${styles[className] || ''} w-5 h-5`} />,
    'monument': <FaMonument className={`${styles[className] || ''} w-5 h-5`} />,
    'mountain': <FaMountain className={`${styles[className] || ''} w-5 h-5`} />,
    'city': <FaCity className={`${styles[className] || ''} w-5 h-5`} />,
    'landmark': <FaLandmark className={`${styles[className] || ''} w-5 h-5`} />,
    'beer': <FaMugHot className={`${styles[className] || ''} w-5 h-5`} />,
  };
  return icons[iconName] || <FaLandmark className={`${styles[className] || ''} w-5 h-5`} />;
};

// Utility Components
const HolidayDate: React.FC<{ date: string }> = React.memo(({ date }) => {
  if (!isValidDate(date)) return null;
  return <span className={styles.holidayDate}>{formatDateLong(parseDateString(date))}</span>;
});
HolidayDate.displayName = 'HolidayDate';

const HolidayRow: React.FC<{
  holiday: StatePageHoliday;
  isSelected: boolean;
  onSelect: () => void;
}> = React.memo(({ holiday, isSelected, onSelect }) => {
  const duration = useMemo(() => {
    if (isMultiDayHoliday(holiday) && isValidDate(holiday.start) && isValidDate(holiday.end)) {
      return calculateDuration(holiday.start, holiday.end);
    }
    return 0;
  }, [holiday]);

  const dateContent = useMemo(() => {
    if (isSingleDayHoliday(holiday) && isValidDate(holiday.date)) {
      return <HolidayDate date={holiday.date} />;
    }
    if (isMultiDayHoliday(holiday) && isValidDate(holiday.start) && isValidDate(holiday.end)) {
      return (
        <>
          <HolidayDate date={holiday.start} />
          <span className={styles.dateSeparator}>-</span>
          <HolidayDate date={holiday.end} />
        </>
      );
    }
    return null;
  }, [holiday]);

  return (
    <div className={styles.holidayItem}>
      <div 
        className={`${styles.holidayRow} ${styles.clickable} ${isSelected ? styles.active : ''}`}
        onClick={onSelect}
      >
        <div className={styles.holidayDate}>{dateContent}</div>
        <div className={styles.holidayName}>
          {holiday.name}
          {holiday.isRegional && (
            <span className={styles.regionalBadge}>Regional</span>
          )}
          {duration > 0 && (
            <span className={styles.duration}>
              ({duration} Tage)
            </span>
          )}
        </div>
        {holiday.details && (
          <button 
            className={`${styles.detailsButton} ${isSelected ? styles.active : ''}`}
            aria-label="Details anzeigen"
          >
            +
          </button>
        )}
      </div>
      {isSelected && holiday.details && (
        <HolidayDetails details={holiday.details} type={holiday.type} />
      )}
    </div>
  );
});
HolidayRow.displayName = 'HolidayRow';

const HolidayDetails: React.FC<{
  details: HolidayDetails;
  type: 'public' | 'school';
}> = React.memo(({ details, type }) => {
  return (
    <div className={styles.holidayDetails}>
      {details.description && (
        <p className={styles.description}>{details.description}</p>
      )}
      {type === 'school' && details.familyActivities && details.familyActivities.length > 0 && (
        <div className={styles.familyActivities}>
          <h4>Familienaktivitäten</h4>
          <ul>
            {details.familyActivities.map((activity, i) => (
              <li key={i}>{activity}</li>
            ))}
          </ul>
        </div>
      )}
      {type === 'public' && (
        <>
          {details.traditions && details.traditions.length > 0 && (
            <div className={styles.traditions}>
              <h4>Traditionen</h4>
              <ul>
                {details.traditions.map((tradition, i) => (
                  <li key={i}>{tradition}</li>
                ))}
              </ul>
            </div>
          )}
          {details.locations && details.locations.length > 0 && (
            <div className={styles.locations}>
              <h4>Beliebte Orte</h4>
              <ul>
                {details.locations.map((location, i) => (
                  <li key={i}>{location}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
});
HolidayDetails.displayName = 'HolidayDetails';

const KeyFacts: React.FC<{ stateInfo: StateInfo }> = React.memo(({ stateInfo }) => {
  const { keyFacts } = stateInfo;
  return (
    <>
      <div className={styles.microInfoItem}>
        <FaUsers className={`${styles.microInfoIcon} w-5 h-5`} />
        <span className={styles.microInfoLabel}>Einwohner:</span>
        <span className={styles.microInfoValue}>{keyFacts.population.toLocaleString()}</span>
      </div>
      <div className={styles.microInfoItem}>
        <FaRulerCombined className={`${styles.microInfoIcon} w-5 h-5`} />
        <span className={styles.microInfoLabel}>Fläche:</span>
        <span className={styles.microInfoValue}>{keyFacts.area.toLocaleString()} km²</span>
      </div>
      {keyFacts.gdp && (
        <div className={styles.microInfoItem}>
          <FaEuroSign className={`${styles.microInfoIcon} w-5 h-5`} />
          <span className={styles.microInfoLabel}>BIP p.K.:</span>
          <span className={styles.microInfoValue}>{keyFacts.gdp.toLocaleString()} €</span>
        </div>
      )}
    </>
  );
});
KeyFacts.displayName = 'KeyFacts';

const SeasonIcon: React.FC<{ season: string }> = React.memo(({ season }) => {
  const icon = useMemo(() => {
    switch (season.toLowerCase()) {
      case 'frühling':
      case 'frühjahr':
        return <FaLeaf className={`${styles.seasonIcon} w-5 h-5`} />;
      case 'sommer':
        return <FaSun className={`${styles.seasonIcon} w-5 h-5`} />;
      case 'herbst':
        return <FaUmbrella className={`${styles.seasonIcon} w-5 h-5`} />;
      case 'winter':
        return <FaSnowflake className={`${styles.seasonIcon} w-5 h-5`} />;
      default:
        return null;
    }
  }, [season]);

  return icon;
});
SeasonIcon.displayName = 'SeasonIcon';

// Main Component
const StatePage: React.FC<{ stateId: string }> = ({ stateId }) => {
  const [stateInfo, setStateInfo] = useState<StateInfo | null>(null);
  const [holidays, setHolidays] = useState<{
    publicHolidays: StatePageHoliday[];
    regionalHolidays: StatePageHoliday[];
    schoolHolidays: StatePageHoliday[];
    filteredSchoolHolidays: StatePageHoliday[];
    totalSchoolHolidayDays: number;
  }>({
    publicHolidays: [],
    regionalHolidays: [],
    schoolHolidays: [],
    filteredSchoolHolidays: [],
    totalSchoolHolidayDays: 0
  });
  const [stateColors, setStateColors] = useState<{ primary: string; secondary: string }>({
    primary: '#000000',
    secondary: '#ffffff'
  });
  const [selectedHolidayId, setSelectedHolidayId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  // Memoized handlers
  const toggleHolidayDetails = useCallback((holiday: StatePageHoliday) => {
    setSelectedHolidayId(prev => prev === holiday.id ? null : holiday.id);
  }, []);

  const renderHolidayRow = useCallback((holiday: StatePageHoliday) => (
    <HolidayRow
      key={holiday.id}
      holiday={holiday}
      isSelected={selectedHolidayId === holiday.id}
      onSelect={() => toggleHolidayDetails(holiday)}
    />
  ), [selectedHolidayId, toggleHolidayDetails]);

  // Initialize data on mount
  useEffect(() => {
    const rawInfo = getStateInfo(stateId) as unknown as RawStateInfo;
    if (!rawInfo || !('holidays' in rawInfo)) return;
    
    const stateInfo = transformStateInfo(rawInfo, stateId);
    setStateInfo(stateInfo);

    const allHolidays = stateInfo.holidays || [];
      const public_ = allHolidays.filter(h => h.type === 'public' && !h.isRegional);
      const regional = allHolidays.filter(h => h.type === 'public' && h.isRegional);
    const school = stateInfo.schoolHolidays || [];

      const totalDays = school.reduce((total, holiday) => {
      if (isMultiDayHoliday(holiday) && isValidDate(holiday.start) && isValidDate(holiday.end)) {
          return total + calculateDuration(holiday.start, holiday.end);
        }
        return total;
      }, 0);

      const filtered = school.filter(holiday => 
      isMultiDayHoliday(holiday) && 
      isValidDate(holiday.start) && 
      isValidDate(holiday.end) && 
      new Date(holiday.end) >= new Date()
      );

      setHolidays({
        publicHolidays: public_,
        regionalHolidays: regional,
        schoolHolidays: school,
        filteredSchoolHolidays: filtered,
        totalSchoolHolidayDays: totalDays
      });

    const state = GERMAN_STATES.find(state => state.slug === stateId);
    if (state) {
      setStateColors({
        primary: state.colors[0],
        secondary: state.colors[1]
      });
    }
  }, [stateId]);

  // Apply state colors
  useEffect(() => {
    if (!mounted) {
    setMounted(true);
      return;
    }

      const isWhiteColor = (color: string) => {
        return color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#fff';
      };

    document.documentElement.style.setProperty('--state-primary-color', stateColors.primary);
    document.documentElement.style.setProperty('--state-secondary-color', stateColors.secondary);
      document.documentElement.style.setProperty(
        '--header-text-color',
      isWhiteColor(stateColors.primary) && isWhiteColor(stateColors.secondary) ? '#1a365d' : 'white'
      );
      document.documentElement.style.setProperty(
        '--primary-button-color',
      isWhiteColor(stateColors.primary) ? '#1a365d' : stateColors.primary
    );

    return () => {
      document.documentElement.style.setProperty('--state-primary-color', '#4299e1');
      document.documentElement.style.setProperty('--state-secondary-color', '#2b6cb0');
      document.documentElement.style.setProperty('--header-text-color', 'white');
      document.documentElement.style.setProperty('--primary-button-color', '#4299e1');
    };
  }, [stateColors, mounted]);

  // Loading state
  if (!mounted || !stateInfo) {
    return (
      <div className={styles.statePage}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner} />
          <p>Lade Feiertagsdaten...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.statePage}>
      <div className={styles.stateHeader}>
        <h1>{stateInfo.fullName}</h1>
        <div className={styles.microInfo}>
          <KeyFacts stateInfo={stateInfo} />
              </div>
            </div>

      <div className={styles.stateDescription}>
        <p>{stateInfo.description}</p>
            </div>

      <div className={styles.holidaySection}>
        <h2>Gesetzliche Feiertage {currentYear}</h2>
        <div className={styles.holidayList}>
          {holidays.publicHolidays.map(renderHolidayRow)}
            </div>
          </div>

      {holidays.regionalHolidays.length > 0 && (
        <div className={styles.holidaySection}>
          <h2>Regionale Feiertage {currentYear}</h2>
          <div className={styles.holidayList}>
            {holidays.regionalHolidays.map(renderHolidayRow)}
          </div>
        </div>
      )}

      <div className={styles.holidaySection}>
        <h2>Schulferien {currentYear}</h2>
            <div className={styles.holidayList}>
          {holidays.schoolHolidays.map(renderHolidayRow)}
          </div>
        </div>

      {stateInfo.seasonalTraditions && stateInfo.seasonalTraditions.length > 0 && (
        <div className={styles.traditionsSection}>
          <h2>Saisonale Traditionen</h2>
          <div className={styles.traditionsList}>
              {stateInfo.seasonalTraditions.map((tradition, index) => (
              <div key={index} className={styles.traditionItem}>
                <SeasonIcon season={tradition.season} />
                <div className={styles.traditionContent}>
                    <h3>{tradition.season}</h3>
                    <p>{tradition.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {stateInfo.regionalSpecialties && stateInfo.regionalSpecialties.length > 0 && (
        <div className={styles.specialtiesSection}>
          <h2>Regionale Spezialitäten</h2>
          <div className={styles.specialtiesList}>
            {stateInfo.regionalSpecialties.map((specialty, index) => (
              <div key={index} className={styles.specialtyCategory}>
                <div className={styles.specialtyHeader}>
                  {getRegionalIcon(specialty.icon)}
                  <h3>{specialty.title}</h3>
                </div>
                <div className={styles.specialtyItems}>
                  {specialty.items.map((item, itemIndex) => (
                    <div key={itemIndex} className={styles.specialtyItem}>
                      {getRegionalIcon(item.icon, 'specialtyIcon')}
                      <div className={styles.specialtyContent}>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                  </div>
                          </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {stateInfo.vacationDestinations && stateInfo.vacationDestinations.length > 0 && (
        <div className={styles.destinationsSection}>
          <h2>Beliebte Urlaubsziele</h2>
          <div className={styles.destinationsList}>
              {stateInfo.vacationDestinations.map((destination, index) => (
              <div key={index} className={styles.destinationItem}>
                  <div className={styles.destinationHeader}>
                    {getDestinationIcon(destination.name)}
                    <h3>{destination.name}</h3>
                  </div>
                <p>{destination.description}</p>
                {destination.attractions.length > 0 && (
                  <div className={styles.destinationAttractions}>
                          <h4>Sehenswürdigkeiten</h4>
                        <ul>
                          {destination.attractions.map((attraction, i) => (
                            <li key={i}>{attraction}</li>
                          ))}
                        </ul>
                      </div>
                )}
                {destination.activities.length > 0 && (
                  <div className={styles.destinationActivities}>
                          <h4>Aktivitäten</h4>
                        <ul>
                          {destination.activities.map((activity, i) => (
                            <li key={i}>{activity}</li>
                          ))}
                        </ul>
                      </div>
                )}
                </div>
              ))}
            </div>
          </div>
        )}

      <Footer />
    </div>
  );
};

export default React.memo(StatePage); 