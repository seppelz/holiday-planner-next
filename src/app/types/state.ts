export interface StatePageHoliday {
  name: string;
  start?: string;
  end?: string;
  date?: string;
  type?: 'public' | 'school';
  isRegional?: boolean;
  details?: HolidayDetails;
}

export interface HolidayDetails {
  description?: string;
  traditions?: string[];
  activities?: string[];
  locations?: string[];
  icons?: string[];
}

export interface StateInfo {
  name: string;
  shortName: string;
  germanSlug: string;
  capital: string;
  population: number;
  area: number;
  density: number;
  gdp: number;
  website: string;
  description: string;
  colors: [string, string];
  holidays: StatePageHoliday[];
  schoolHolidays: StatePageHoliday[];
  destinations?: Destination[];
  regionalSpecialties?: RegionalSpecialty[];
}

export interface Destination {
  name: string;
  type: string;
  description: string;
  season?: string;
  activities?: string[];
  imageId?: string;
}

export interface RegionalSpecialty {
  name: string;
  type: string;
  description: string;
  icon?: string;
  season?: string;
}

export interface HolidayData {
  schoolHolidays: {
    [year: string]: {
      [stateId: string]: Array<{
        name: string;
        start: string;
        end: string;
      }>;
    };
  };
  publicHolidays: {
    [year: string]: {
      ALL: Array<{
        name: string;
        start: string;
        nationwide: boolean;
      }>;
      [stateId: string]: Array<{
        name: string;
        start: string;
      }>;
    };
  };
} 