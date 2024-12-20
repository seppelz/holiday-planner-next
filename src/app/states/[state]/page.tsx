import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getStateInfo, getStateIds } from '@/utils/stateUtils';
import { getStateColors } from '@/utils/stateColors';
import { StateInfo } from '@/types/StateInfo';
import { Holiday } from '@/types/Holiday';
import styles from '@/app/styles/StatePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StatePageStyles from '@/app/components/StatePageStyles';
import ScrollButton from '@/app/components/ScrollButton';
import Navigation from '@/components/Navigation/Navigation';
import SeasonalSection from '@/app/components/SeasonalSection';
import RegionalSpecialties from '@/app/components/RegionalSpecialties';
import HolidayList from '@/app/components/HolidayList';
import VacationDestinations from '@/app/components/VacationDestinations';
import CulturalHighlights from '@/app/components/CulturalHighlights';
import { 
  faArrowRight,
  faBuilding,
  faUsers,
  faRulerCombined,
  faIndustry,
  faCalendarDays,
  faGraduationCap
} from '@fortawesome/free-solid-svg-icons';

export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  const stateIds = getStateIds();
  return stateIds.map((stateId) => ({
    state: stateId,
  }));
}

interface StatePageProps {
  params: {
    state: string;
  };
}

// Add JSON-LD structured data
const generateStructuredData = (stateInfo: StateInfo) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: stateInfo.name,
    description: stateInfo.description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DE',
      addressRegion: stateInfo.name,
    },
    publicAccess: true,
    tourismType: [
      ...(stateInfo.keyFacts?.economicStrength || []),
      'Tourism',
      'Holidays',
    ],
    event: stateInfo.holidays
      .filter(holiday => holiday.start?.startsWith('2025'))
      .map(holiday => ({
        '@type': 'Event',
        name: holiday.name,
        startDate: holiday.start,
        endDate: holiday.end || holiday.start,
        description: holiday.type === 'public' ? 'Gesetzlicher Feiertag' : 'Schulferien',
      })),
  };
};

export async function generateMetadata(
  { params }: StatePageProps
): Promise<Metadata> {
  const stateId = params.state;
  const stateInfo = getStateInfo(stateId);
  if (!stateInfo) return { title: 'Bundesland nicht gefunden' };

  const title = `${stateInfo.name} - Ferien und Feiertage 2025`;
  const description = `Planen Sie Ihren Urlaub in ${stateInfo.name}. Alle Feiertage, Schulferien und Brückentage für 2025. ${stateInfo.keyFacts.population} Einwohner, ${stateInfo.keyFacts.area}.`;

  return {
    title,
    description,
    keywords: [
      stateInfo.name,
      'Feiertage',
      'Schulferien',
      'Brückentage',
      'Urlaub',
      'Urlaubsplanung',
      '2025',
      ...stateInfo.keyFacts.economicStrength
    ].join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'de_DE',
      images: [
        {
          url: `/images/states/${stateId}.jpg`,
          width: 1200,
          height: 630,
          alt: stateInfo.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/images/states/${stateId}.jpg`],
    },
    alternates: {
      canonical: `/states/${stateId}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function StatePage({ params }: StatePageProps) {
  const stateId = params.state;
  const stateInfo = getStateInfo(stateId);

  if (!stateInfo) {
    notFound();
  }

  const structuredData = generateStructuredData(stateInfo);
  const colors = getStateColors(stateId);

  const {
    fullName,
    description,
    holidays = [],
    schoolHolidays = [],
    vacationDestinations = [],
    regionalSpecialties = [],
    seasonalTraditions = [],
    culturalHighlights = [],
    keyFacts = {
      population: '',
      capital: '',
      area: '',
      economicStrength: [],
      majorCities: []
    }
  } = stateInfo;

  const [primaryColor, secondaryColor, tertiaryColor] = [
    colors.primary,
    colors.secondary,
    colors.tertiary
  ];

  const publicHolidays = (holidays as Holiday[]).filter(h => {
    if (h.type !== 'public') return false;
    if (h.isRegional) return false;
    return h.start?.startsWith('2025');
  });

  const regionalHolidays = (holidays as Holiday[]).filter(h => {
    if (h.type !== 'public') return false;
    if (!h.isRegional) return false;
    return h.start?.startsWith('2025');
  });

  const filteredSchoolHolidays = (schoolHolidays as Holiday[]).filter(h => {
    return h.start?.startsWith('2025');
  });

  const totalSchoolHolidayDays = filteredSchoolHolidays.reduce((total, holiday) => {
    if (holiday.start && holiday.end) {
      const startDate = new Date(holiday.start);
      const endDate = new Date(holiday.end);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      return total + Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return total;
  }, 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className={styles.statePage}>
        <Navigation />
        <StatePageStyles 
          primaryColor={primaryColor} 
          secondaryColor={secondaryColor}
          tertiaryColor={tertiaryColor}
        />
        <div className={styles.statePageContent}>
          <header className={styles.stateHeader} style={{
            background: 'var(--state-gradient-hero)'
          }}>
            <div className={styles.animatedBackground} style={{
              background: 'var(--state-gradient-hero)'
            }}>
              <div className={styles.celestialBody} style={{
                '--state-primary-color': 'var(--state-primary-color)',
                '--state-secondary-color': 'var(--state-secondary-color)',
                '--state-tertiary-color': tertiaryColor ? 'var(--state-tertiary-color)' : 'var(--state-secondary-color)'
              } as React.CSSProperties} />
              
              <div className={styles.cloud} style={{ '--state-primary-color': 'var(--state-primary-lighter)' } as React.CSSProperties} />
              <div className={styles.cloud} style={{ '--state-primary-color': 'var(--state-primary-lighter)' } as React.CSSProperties} />
              <div className={styles.cloud} style={{ '--state-primary-color': 'var(--state-primary-lighter)' } as React.CSSProperties} />
              <div className={styles.cloud} style={{ '--state-primary-color': 'var(--state-primary-lighter)' } as React.CSSProperties} />
              
              <div className={styles.seasonalDecorations}>
                <div className={styles.springDandelion}>
                  <div className={styles.dandelionStem}></div>
                  <div className={styles.dandelionHead}>
                    <div className={styles.dandelionCore}></div>
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className={styles.seed}>
                        <div className={styles.seedCore}></div>
                        <div className={styles.seedParachute}></div>
                      </div>
                    ))}
                  </div>
                  {[...Array(6)].map((_, i) => (
                    <div key={`flying-${i}`} className={styles.flyingSeed}>
                      <div className={styles.seedCore}></div>
                      <div className={styles.seedParachute}></div>
                    </div>
                  ))}
                </div>

                <div className={styles.sunflower}>
                  <div className={styles.sunflowerStem}></div>
                  <div className={styles.sunflowerHead}>
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className={styles.sunflowerPetal}></div>
                    ))}
                    <div className={styles.sunflowerCenter}></div>
                  </div>
                </div>

                <div className={styles.mapleLeaf}>
                  <div className={styles.mapleTreeTrunk} />
                  <div className={styles.mapleTreeBranch} />
                  <div className={styles.mapleTreeBranch} />
                  <div className={styles.mapleTreeBranch} />
                  <div className={styles.mapleTreeBranch} />
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className={styles.fallingLeaf}
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 30}%`,
                        '--x-end': `${-50 + Math.random() * 100}px`,
                        '--y-end': `${100 + Math.random() * 50}px`,
                        '--fall-delay': `${i * 0.5}s`
                      } as React.CSSProperties}
                    />
                  ))}
                </div>

                <div className={styles.snowflake}>
                  <div className={styles.mountainScene}>
                    <div className={styles.mountain}></div>
                    <div className={styles.mountain}></div>
                    <div className={styles.mountain}></div>
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className={styles.snow}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          '--x-end': `${Math.random() * 60 - 30}px`,
                          '--y-end': `${Math.random() * 60 + 30}px`,
                          animationDelay: `${Math.random() * 3}s`,
                          animationDuration: `${2 + Math.random() * 2}s`
                        } as React.CSSProperties}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.headerOverlay} style={{
                background: `linear-gradient(
                  135deg,
                  rgba(0, 0, 0, 0.2) 0%,
                  rgba(0, 0, 0, 0.1) 50%,
                  rgba(0, 0, 0, 0.05) 100%
                )`,
                mixBlendMode: 'multiply'
              }} />
              <div className={styles.headerContent}>
                <div className={styles.heroStats}>
                  <div className={styles.statBadge} style={{
                    background: 'var(--state-primary-alpha-10)',
                    color: 'var(--state-text-on-hero)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)'
                  }}>
                    <span className={styles.statNumber}>{publicHolidays.length}</span>
                    <span className={styles.statLabel}>Feiertage</span>
                  </div>
                  <div className={styles.statDivider} style={{ 
                    background: 'var(--state-primary-alpha-20)'
                  }} />
                  <div className={styles.statBadge} style={{
                    background: 'var(--state-primary-alpha-10)',
                    color: 'var(--state-text-on-hero)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)'
                  }}>
                    <span className={styles.statNumber}>{regionalHolidays.length}</span>
                    <span className={styles.statLabel}>Regionale Feiertage</span>
                  </div>
                  <div className={styles.statDivider} style={{ 
                    background: 'var(--state-primary-alpha-20)'
                  }} />
                  <div className={styles.statBadge} style={{
                    background: 'var(--state-primary-alpha-10)',
                    color: 'var(--state-text-on-hero)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)'
                  }}>
                    <span className={styles.statNumber}>{totalSchoolHolidayDays}</span>
                    <span className={styles.statLabel}>Ferientage</span>
                  </div>
                </div>
                <h1 className={styles.heroTitle} style={{ 
                  color: 'var(--state-text-on-hero)',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.15)'
                }}>
                  Feiertage und Schulferien in {fullName} 2025
                </h1>
                <p className={styles.heroSubtitle} style={{ 
                  color: 'var(--state-text-on-hero)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                }}>
                  Maximieren Sie Ihren Urlaub in {fullName} mit unserem intelligenten Urlaubsplaner.
                  Nutzen Sie {publicHolidays.length + regionalHolidays.length} Feiertage für optimale Brückentage.
                </p>
                <div className={styles.heroActions}>
                  <Link href="/planner" className={styles.primaryButton} style={{
                    background: 'var(--state-primary-alpha-20)',
                    color: 'var(--state-text-on-hero)',
                    borderColor: 'var(--state-primary-alpha-10)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    '--hover-color': 'var(--state-hover-overlay)'
                  } as React.CSSProperties}>
                    Urlaubsplaner starten
                    <span className={styles.buttonIcon}>→</span>
                  </Link>
                  <ScrollButton className={styles.secondaryButton} />
                </div>
              </div>
            </div>
          </header>

          <section id="overview" className={styles.holidayOverview} style={{ 
            marginTop: '1rem',
            background: 'var(--state-background-subtle)'
          }}>
            <HolidayList
              publicHolidays={publicHolidays}
              regionalHolidays={regionalHolidays}
              schoolHolidays={filteredSchoolHolidays}
              totalSchoolHolidayDays={totalSchoolHolidayDays}
              primaryColor="var(--state-primary-color)"
              secondaryColor="var(--state-secondary-color)"
            />

            <div className={styles.plannerPromo} style={{
              background: `linear-gradient(135deg,
                color-mix(in srgb, var(--landing-primary) 85%, ${primaryColor}),
                color-mix(in srgb, var(--landing-secondary) 85%, ${secondaryColor})
              )`,
              borderRadius: '1rem',
              padding: '2rem',
              color: '#ffffff',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              isolation: 'isolate'
            }}>
              <div className={styles.promoContent}>
                <div className={styles.promoStats}>
                  <div className={styles.promoStat} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.75rem',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    transition: 'transform 0.3s ease',
                    cursor: 'default'
                  }}>
                    <FontAwesomeIcon icon={faCalendarDays} style={{ fontSize: '2rem', color: '#ffffff' }} />
                    <div style={{ textAlign: 'center', color: '#ffffff' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>4x</div>
                      <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>mehr freie Tage</div>
                    </div>
                  </div>
                  <div className={styles.promoStat} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.75rem',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    transition: 'transform 0.3s ease',
                    cursor: 'default'
                  }}>
                    <FontAwesomeIcon icon={faUsers} style={{ fontSize: '2rem', color: '#ffffff' }} />
                    <div style={{ textAlign: 'center', color: '#ffffff' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>5 Min</div>
                      <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>schnelle Planung</div>
                    </div>
                  </div>
                  <div className={styles.promoStat} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.75rem',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    transition: 'transform 0.3s ease',
                    cursor: 'default'
                  }}>
                    <FontAwesomeIcon icon={faGraduationCap} style={{ fontSize: '2rem', color: '#ffffff' }} />
                    <div style={{ textAlign: 'center', color: '#ffffff' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>100%</div>
                      <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>kostenlos</div>
                    </div>
                  </div>
                </div>
                <div className={styles.promoText} style={{ textAlign: 'center', color: '#ffffff' }}>
                  <h2 style={{ 
                    fontSize: '1.75rem', 
                    fontWeight: '700',
                    marginBottom: '1rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    Clever Urlaub planen in {fullName}
                  </h2>
                  <p style={{ 
                    fontSize: '1.1rem',
                    opacity: '0.95',
                    maxWidth: '600px',
                    margin: '0 auto 2rem',
                    lineHeight: '1.5'
                  }}>
                    Nutzen Sie unseren intelligenten Urlaubsplaner, um das Beste aus Ihren Urlaubstagen herauszuholen.
                    Finden Sie die optimalen Brückentage und verlängern Sie Ihren Urlaub effizient.
                  </p>
                  <Link href="/planner" className={styles.promoCTA} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)'
                  }}>
                    Jetzt Urlaub clever planen
                    <FontAwesomeIcon icon={faArrowRight} className={styles.promoArrow} style={{ color: '#ffffff' }} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {keyFacts && (
            <section id="about" className={styles.stateOverviewSection} style={{
              background: 'var(--state-background-light)'
            }}>
              <h2>Über {fullName}</h2>
              <div className={styles.microInfoBar} style={{
                background: 'var(--state-gradient-subtle)',
                borderColor: 'var(--state-border-light)'
              }}>
                <div className={styles.microInfoItem}>
                  <FontAwesomeIcon icon={faBuilding} className={styles.microInfoIcon} />
                  <span className={styles.microInfoLabel}>Hauptstadt:</span>
                  <span className={styles.microInfoValue}>{keyFacts.capital}</span>
                </div>
                <div className={styles.microInfoItem}>
                  <FontAwesomeIcon icon={faUsers} className={styles.microInfoIcon} />
                  <span className={styles.microInfoLabel}>Einwohner:</span>
                  <span className={styles.microInfoValue}>{keyFacts.population}</span>
                </div>
                <div className={styles.microInfoItem}>
                  <FontAwesomeIcon icon={faRulerCombined} className={styles.microInfoIcon} />
                  <span className={styles.microInfoLabel}>Fläche:</span>
                  <span className={styles.microInfoValue}>{keyFacts.area}</span>
                </div>
                <div className={styles.microInfoItem}>
                  <FontAwesomeIcon icon={faIndustry} className={styles.microInfoIcon} />
                  <div className={styles.microInfoTags}>
                    {keyFacts.economicStrength.map((strength, index) => (
                      <span key={index} className={styles.microInfoTag}>{strength}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className={styles.stateDescription}>{description}</p>
            </section>
          )}

          {culturalHighlights && culturalHighlights.length > 0 && (
            <CulturalHighlights 
              highlights={culturalHighlights}
              primaryColor="var(--state-primary-color)"
              secondaryColor="var(--state-secondary-color)"
              tertiaryColor={tertiaryColor ? 'var(--state-tertiary-color)' : undefined}
            />
          )}

          {seasonalTraditions && seasonalTraditions.length > 0 && (
            <SeasonalSection 
              traditions={seasonalTraditions}
              primaryColor="var(--state-primary-color)"
              secondaryColor="var(--state-secondary-color)"
              tertiaryColor={tertiaryColor ? 'var(--state-tertiary-color)' : undefined}
              traditionInfo={stateInfo.traditionInfo}
            />
          )}

          {regionalSpecialties && regionalSpecialties.length > 0 && (
            <RegionalSpecialties 
              specialties={regionalSpecialties}
              primaryColor="var(--state-primary-color)"
              secondaryColor="var(--state-secondary-color)"
              tertiaryColor={tertiaryColor ? 'var(--state-tertiary-color)' : undefined}
            />
          )}

          {vacationDestinations && vacationDestinations.length > 0 && (
            <VacationDestinations 
              destinations={vacationDestinations}
              primaryColor="var(--state-primary-color)"
              secondaryColor="var(--state-secondary-color)"
              tertiaryColor={tertiaryColor ? 'var(--state-tertiary-color)' : undefined}
            />
          )}

          <section className={styles.ctaSection} style={{
            background: 'var(--state-gradient-subtle)'
          }}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Bereit für die Urlaubsplanung?</h2>
              <p className={styles.ctaDescription}>
                Optimiere deinen Urlaub mit unseren intelligenten Brückentage-Empfehlungen.
              </p>
              <Link href="/planner" className={styles.ctaButton} style={{
                background: 'var(--state-gradient-intense)',
                color: 'var(--state-text-on-primary)'
              }}>
                Jetzt Urlaub planen <FontAwesomeIcon icon={faArrowRight} className={styles.ctaIcon} />
              </Link>
            </div>
          </section>

          <footer className={styles.footer} style={{
            background: 'var(--state-background-accent)',
            borderColor: 'var(--state-border-light)'
          }}>
            <p>© {new Date().getFullYear()} Holiday Planner. Alle Rechte vorbehalten.</p>
            <nav aria-label="Footer Navigation">
              <Link href="/datenschutz">Datenschutz</Link>
              <Link href="/impressum">Impressum</Link>
              <Link href="/kontakt">Kontakt</Link>
            </nav>
          </footer>
        </div>
      </div>
    </>
  );
} 