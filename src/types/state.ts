export interface Holiday {
  name: string;
  start: string;
  end?: string;
  type: 'public' | 'school';
  isRegional?: boolean;
  details?: {
    description?: string;
    traditions?: string[];
    locations?: string[];
    familyActivities?: string[];
  };
}

export interface KeyFacts {
  population: string;
  area: string;
  founded: string;
  economicStrength: string[];
}

export interface VacationDestination {
  name: string;
  type: string;
  description: string;
  season: string;
  attractions: string[];
  activities: string[];
  imageId: string;
}

export interface RegionalSpecialtyItem {
  title: string;
  description: string;
  icon: string;
}

export interface RegionalSpecialty {
  name: string;
  type: string;
  description: string;
  icon: string;
}

export interface SeasonalTradition {
  season: string;
  description: string;
}

export interface StateInfo {
  fullName: string;
  shortName: string;
  capital: string;
  description: string;
  culturalHighlights?: string[];
  holidays: Holiday[];
  schoolHolidays: Holiday[];
  destinations?: VacationDestination[];
  regionalSpecialties?: RegionalSpecialty[];
  seasonalTraditions?: SeasonalTradition[];
  keyFacts: KeyFacts;
  colors?: string[];
  uniqueHolidayInfo?: string;
  traditionInfo?: string;
}

export type StatePageHoliday = Holiday; 