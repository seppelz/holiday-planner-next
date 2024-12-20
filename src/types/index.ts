export interface HolidayDetails {
  description?: string;
  familyActivities?: string[];
  traditions?: string[];
  locations?: string[];
}

export interface BaseHoliday {
  id: string;
  name: string;
  type: 'public' | 'school';
  details?: HolidayDetails;
  isRegional?: boolean;
}

export interface SingleDayHoliday extends BaseHoliday {
  date: string;
  start?: never;
  end?: never;
}

export interface MultiDayHoliday extends BaseHoliday {
  date?: never;
  start: string;
  end: string;
}

export type StatePageHoliday = SingleDayHoliday | MultiDayHoliday;

export interface EconomicStrength {
  name: string;
  value: number;
}

export interface KeyFacts {
  population: number;
  area: number;
  gdp?: number;
  economicStrength: EconomicStrength[];
}

export interface SeasonalTradition {
  season: string;
  description: string;
}

export interface RegionalSpecialty {
  title: string;
  icon: string;
  items: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

export interface VacationDestination {
  name: string;
  description: string;
  attractions: string[];
  activities: string[];
}

export interface StateInfo {
  id: string;
  fullName: string;
  capital: string;
  description: string;
  keyFacts: KeyFacts;
  holidays?: StatePageHoliday[];
  schoolHolidays?: StatePageHoliday[];
  seasonalTraditions?: SeasonalTradition[];
  regionalSpecialties?: RegionalSpecialty[];
  vacationDestinations?: VacationDestination[];
} 