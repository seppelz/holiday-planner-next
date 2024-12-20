export interface State {
  id: string;
  name: string;
  slug: string;
  colors: string[];
  fullName: string;
  description: string;
  capital: string;
  culturalHighlights: string[];
  flag?: string;
}

// German states data with their colors based on flags
export const GERMAN_STATES: State[] = [
  { 
    id: 'bw', 
    name: 'Baden-Württemberg', 
    fullName: 'Baden-Württemberg',
    slug: 'baden-wuerttemberg', 
    colors: ['#000000', '#FFDF00', '#FF0000'],
    description: 'Baden-Württemberg vereint Tradition und Innovation im deutschen Südwesten.',
    capital: 'Stuttgart',
    culturalHighlights: ['Schwarzwald', 'Bodensee', 'Heidelberg', 'Europa-Park'],
  },
  { 
    id: 'by', 
    name: 'Bayern',
    fullName: 'Bayern',
    slug: 'bayern', 
    colors: ['#FFFFFF', '#0066B3'],
    description: 'Bayern verbindet traditionelle Kultur mit moderner Lebensart.',
    capital: 'München',
    culturalHighlights: ['Schloss Neuschwanstein', 'Oktoberfest', 'Alpen', 'Nürnberger Christkindlesmarkt'],
  },
  { 
    id: 'be', 
    name: 'Berlin',
    fullName: 'Berlin',
    slug: 'berlin', 
    colors: ['#FF0000', '#FFFFFF'],
    description: 'Berlin ist die pulsierende Hauptstadt Deutschlands.',
    capital: 'Berlin',
    culturalHighlights: ['Brandenburger Tor', 'East Side Gallery', 'Museumsinsel', 'Reichstag'],
  },
  { 
    id: 'bb', 
    name: 'Brandenburg',
    fullName: 'Brandenburg',
    slug: 'brandenburg', 
    colors: ['#FF0000', '#FFFFFF'],
    description: 'Brandenburg beeindruckt mit seiner natürlichen Schönheit und historischen Städten.',
    capital: 'Potsdam',
    culturalHighlights: ['Sanssouci', 'Spreewald', 'Tropical Islands', 'Brandenburger Dom'],
  },
  { 
    id: 'hb', 
    name: 'Bremen',
    fullName: 'Bremen',
    slug: 'bremen', 
    colors: ['#FF0000', '#FFFFFF'],
    description: 'Bremen vereint hanseatische Tradition mit maritimem Flair.',
    capital: 'Bremen',
    culturalHighlights: ['Bremer Stadtmusikanten', 'Schnoorviertel', 'Böttcherstraße', 'Überseestadt'],
  },
  { 
    id: 'hh', 
    name: 'Hamburg',
    fullName: 'Hamburg',
    slug: 'hamburg', 
    colors: ['#FF0000', '#FFFFFF'],
    description: 'Hamburg ist das Tor zur Welt mit hanseatischem Charme.',
    capital: 'Hamburg',
    culturalHighlights: ['Elbphilharmonie', 'Speicherstadt', 'Reeperbahn', 'Alster'],
  },
  { 
    id: 'he', 
    name: 'Hessen',
    fullName: 'Hessen',
    slug: 'hessen', 
    colors: ['#FF0000', '#FFFFFF'],
    description: 'Hessen verbindet Finanzmetropole mit märchenhafter Landschaft.',
    capital: 'Wiesbaden',
    culturalHighlights: ['Frankfurter Skyline', 'Märchenstraße', 'Rheingau', 'Kellerwald'],
  },
  { 
    id: 'mv', 
    name: 'Mecklenburg-Vorpommern',
    fullName: 'Mecklenburg-Vorpommern',
    slug: 'mecklenburg-vorpommern', 
    colors: ['#0066B3', '#FFFFFF', '#FFDF00', '#FF0000'],
    description: 'Mecklenburg-Vorpommern ist bekannt für seine Ostseeküste und Seenplatte.',
    capital: 'Schwerin',
    culturalHighlights: ['Ostseestrände', 'Schweriner Schloss', 'Rügen', 'Hanse Sail'],
  },
  { 
    id: 'ni', 
    name: 'Niedersachsen',
    fullName: 'Niedersachsen',
    slug: 'niedersachsen', 
    colors: ['#FF0000', '#FFFFFF', '#000000'],
    description: 'Niedersachsen bietet von Nordsee bis Harz vielfältige Landschaften.',
    capital: 'Hannover',
    culturalHighlights: ['Lüneburger Heide', 'Nordseeküste', 'Harz', 'Herrenhäuser Gärten'],
  },
  { 
    id: 'nw', 
    name: 'Nordrhein-Westfalen',
    fullName: 'Nordrhein-Westfalen',
    slug: 'nordrhein-westfalen', 
    colors: ['#FF0000', '#FFFFFF', '#00AB39'],
    description: 'Nordrhein-Westfalen ist das bevölkerungsreichste Bundesland mit pulsierenden Metropolen.',
    capital: 'Düsseldorf',
    culturalHighlights: ['Kölner Dom', 'Zeche Zollverein', 'Aachener Dom', 'Teutoburger Wald'],
  },
  { 
    id: 'rp', 
    name: 'Rheinland-Pfalz',
    fullName: 'Rheinland-Pfalz',
    slug: 'rheinland-pfalz', 
    colors: ['#000000', '#FFDF00', '#FF0000'],
    description: 'Rheinland-Pfalz ist bekannt für Wein, Kultur und romantische Landschaften.',
    capital: 'Mainz',
    culturalHighlights: ['Deutsches Eck', 'Moseltal', 'Speyer Dom', 'Burg Eltz'],
  },
  { 
    id: 'sl', 
    name: 'Saarland',
    fullName: 'Saarland',
    slug: 'saarland', 
    colors: ['#0066B3', '#FFFFFF', '#FF0000'],
    description: 'Das Saarland vereint französisches Savoir-vivre mit deutscher Tradition.',
    capital: 'Saarbrücken',
    culturalHighlights: ['Saarschleife', 'Völklinger Hütte', 'Saarbrücker Schloss', 'Deutsch-Französischer Garten'],
  },
  { 
    id: 'sn', 
    name: 'Sachsen',
    fullName: 'Sachsen',
    slug: 'sachsen', 
    colors: ['#FFFFFF', '#00AB39'],
    description: 'Sachsen vereint kulturelles Erbe mit innovativer Zukunft.',
    capital: 'Dresden',
    culturalHighlights: ['Frauenkirche', 'Semperoper', 'Meißner Porzellan', 'Sächsische Schweiz'],
  },
  { 
    id: 'st', 
    name: 'Sachsen-Anhalt',
    fullName: 'Sachsen-Anhalt',
    slug: 'sachsen-anhalt', 
    colors: ['#000000', '#FFDF00'],
    description: 'Sachsen-Anhalt ist reich an UNESCO-Welterbestätten und Geschichte.',
    capital: 'Magdeburg',
    culturalHighlights: ['Quedlinburg', 'Dessau-Wörlitz', 'Halle (Saale)', 'Magdeburger Dom'],
  },
  { 
    id: 'sh', 
    name: 'Schleswig-Holstein',
    fullName: 'Schleswig-Holstein',
    slug: 'schleswig-holstein', 
    colors: ['#0066B3', '#FF0000', '#FFFFFF'],
    description: 'Schleswig-Holstein ist das Land zwischen den Meeren.',
    capital: 'Kiel',
    culturalHighlights: ['Lübecker Altstadt', 'Kieler Woche', 'Sylt', 'Holsteinische Schweiz'],
  },
  { 
    id: 'th', 
    name: 'Thüringen',
    fullName: 'Thüringen',
    slug: 'thueringen', 
    colors: ['#FF0000', '#FFFFFF'],
    description: 'Thüringen ist das grüne Herz Deutschlands.',
    capital: 'Erfurt',
    culturalHighlights: ['Wartburg', 'Weimar', 'Erfurter Dom', 'Thüringer Wald'],
  },
]; 