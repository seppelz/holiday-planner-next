import { Holiday } from './Holiday';

export interface VacationDestination {
  name: string;
  description: string;
  attractions: string[];
  activities: string[];
}

export interface HolidayDetails {
  description: string;
  traditions?: string[];
  culturalSignificance?: string;
  locations?: string[];
}

export interface RegionalCategory {
  title: string;
  icon: string;
  items: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

export interface StateInfo {
  name: string;
  fullName: string;
  shortName: string;
  capital: string;
  description: string;
  culturalHighlights: string[];
  keyFacts: {
    population: string;
    capital: string;
    area: string;
    founded?: string;
    economicStrength: string[];
    majorCities?: string[];
  };
  holidays: Holiday[];
  schoolHolidays: Holiday[];
  seasonalTraditions: {
    season: "Frühling" | "Sommer" | "Herbst" | "Winter";
    description: string;
    events?: string[];
  }[];
  colors?: [string, string] | [string, string, string];
  vacationDestinations?: VacationDestination[];
  regionalSpecialties?: RegionalCategory[];
  uniqueHolidayInfo?: string;
  traditionInfo?: string;
} 