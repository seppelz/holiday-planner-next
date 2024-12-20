import { StateInfo } from '../types/StateInfo';

// Import state configurations
import { berlin } from '../config/states/berlin';
import { bayern } from '../config/states/bayern';
import { badenWuerttemberg } from '../config/states/baden-wuerttemberg';
import { brandenburg } from '../config/states/brandenburg';
import { bremen } from '../config/states/bremen';
import { hamburg } from '../config/states/hamburg';
import { hessen } from '../config/states/hessen';
import { mecklenburgVorpommern } from '../config/states/mecklenburg-vorpommern';
import { niedersachsen } from '../config/states/niedersachsen';
import { nordrheinWestfalen } from '../config/states/nordrhein-westfalen';
import { rheinlandPfalz } from '../config/states/rheinland-pfalz';
import { saarland } from '../config/states/saarland';
import { sachsen } from '../config/states/sachsen';
import { sachsenAnhalt } from '../config/states/sachsen-anhalt';
import { schleswigHolstein } from '../config/states/schleswig-holstein';
import { thueringen } from '../config/states/thueringen';

// Map of state slugs to their data
const STATE_DATA: Record<string, StateInfo> = {
  'berlin': berlin,
  'bayern': bayern,
  'baden-wuerttemberg': badenWuerttemberg,
  'brandenburg': brandenburg,
  'bremen': bremen,
  'hamburg': hamburg,
  'hessen': hessen,
  'mecklenburg-vorpommern': mecklenburgVorpommern,
  'niedersachsen': niedersachsen,
  'nordrhein-westfalen': nordrheinWestfalen,
  'rheinland-pfalz': rheinlandPfalz,
  'saarland': saarland,
  'sachsen': sachsen,
  'sachsen-anhalt': sachsenAnhalt,
  'schleswig-holstein': schleswigHolstein,
  'thueringen': thueringen
};

/**
 * Get the state information including its unique holiday descriptions
 */
export function getStateInfo(stateSlug: string): StateInfo | null {
  return STATE_DATA[stateSlug] || null;
}

/**
 * Get list of available state slugs
 */
export function getStateIds(): string[] {
  return Object.keys(STATE_DATA);
} 