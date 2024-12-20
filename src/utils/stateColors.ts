interface StateColors {
  primary: string;
  secondary: string;
  tertiary?: string;
}

export const stateColors: Record<string, StateColors> = {
  'baden-wuerttemberg': {
    primary: '#FFCC00',    // Yellow from flag
    secondary: '#000000',  // Black from flag
    tertiary: '#CC0000'    // Red accent
  },
  'bayern': {
    primary: '#0066B3',    // Light blue from flag
    secondary: '#FFFFFF',  //  White from flag
    tertiary: '#FF0000'    // Red accent
  },
  'berlin': {
    primary: '#FF0000',    // Red from flag
    secondary: '#FFFFFF'   // White from flag
  },
  'brandenburg': {
    primary: '#FF0000',    // Red from flag
    secondary: '#FFFFFF'   // White from flag
  },
  'bremen': {
    primary: '#FF0000',    // Red from flag
    secondary: '#FFFFFF'   // White from flag
  },
  'hamburg': {
    primary: '#FF0000',    // Red from flag
    secondary: '#FFFFFF'   // White from flag
  },
  'hessen': {
    primary: '#FF0000',    // Red from flag
    secondary: '#FFFFFF'   // White from flag
  },
  'mecklenburg-vorpommern': {
    primary: '#0066B3',    // Blue from flag
    secondary: '#FFFFFF',  // White from flag
    tertiary: '#FF0000'    // Red from flag
  },
  'niedersachsen': {
    primary: '#FF0000',    // Red from flag
    secondary: '#FFFFFF',  // White from flag
    tertiary: '#000000'    // Black from flag
  },
  'nordrhein-westfalen': {
    primary: '#FF0000',    // Red from flag
    secondary: '#FFFFFF',  // White from flag
    tertiary: '#009900'    // Green from flag
  },
  'rheinland-pfalz': {
    primary: '#FF0000',    // Red from flag
    secondary: '#FFCC00',  // Yellow from flag
    tertiary: '#000000'    // Black from flag
  },
  'saarland': {
    primary: '#0066B3',    // Blue from flag
    secondary: '#FF0000',  // Red from flag
    tertiary: '#FFFFFF'    // White from flag
  },
  'sachsen': {
    primary: '#009900',    // Green from flag
    secondary: '#FFFFFF',  // White from flag
    tertiary: '#000000'    // Black accent
  },
  'sachsen-anhalt': {
    primary: '#FFCC00',    // Yellow from flag
    secondary: '#009900',  // Green from flag
    tertiary: '#000000'    // Black accent
  },
  'schleswig-holstein': {
    primary: '#0066B3',    // Blue from flag
    secondary: '#FF0000',  // Red from flag
    tertiary: '#FFFFFF'    // White from flag
  },
  'thueringen': {
    primary: '#FF0000',    // Red from flag
    secondary: '#FFFFFF',  // White from flag
    tertiary: '#009900'    // Green accent
  }
};

// Helper function to get state colors with fallback
export const getStateColors = (stateId: string): StateColors => {
  return stateColors[stateId] || {
    primary: '#4299e1',    // Default blue
    secondary: '#2b6cb0'   // Default dark blue
  };
}; 