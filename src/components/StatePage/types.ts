export interface HolidayDetails {
  description?: string;
  traditions?: string[];
  locations?: string[];
  activities?: string[];
  food?: string[];
}

export interface StatePageHoliday {
  name: string;
  date?: string;
  start?: string;
  end?: string;
  description?: string;
  isRegional?: boolean;
  type?: 'public' | 'school';
  details?: HolidayDetails;
}

export interface SeasonalTradition {
  season: string;
  description: string;
}

export interface VacationDestination {
  name: string;
  description: string;
  attractions: string[];
  activities: string[];
}

export interface KeyFacts {
  population: number;
  area: number;
  gdp?: number;
  economicStrength: string[];
}

export interface StateInfo {
  fullName: string;
  description: string;
  capital: string;
  keyFacts: KeyFacts;
  holidays: StatePageHoliday[];
  schoolHolidays?: StatePageHoliday[];
  seasonalTraditions?: SeasonalTradition[];
  vacationDestinations?: VacationDestination[];
} 