export interface HolidayDetails {
  description: string;
  traditions?: string[];
  locations?: string[];
  familyActivities?: string[];
}

export interface Holiday {
  name: string;
  start: string;
  end?: string;
  type: 'public' | 'school';
  isRegional?: boolean;
  details?: HolidayDetails;
} 