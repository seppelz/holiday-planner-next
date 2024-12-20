import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles/LandingPage.module.css'
import Navigation from '@/components/Navigation/Navigation'
import Footer from '@/components/Footer/Footer'

// Constants from old landing page
const FEATURES = [
  {
    icon: '🗓️',
    title: 'Brückentage-Optimierung',
    description: 'Intelligente Berechnung der effizientesten Urlaubstage mit Berücksichtigung von Feiertagen.',
  },
  {
    icon: '👥',
    title: 'Zwei-Personen Planung',
    description: 'Plane deinen Urlaub gemeinsam mit Partner oder Familie, mit separater Verwaltung pro Person.',
  },
  {
    icon: '🏛️',
    title: 'Bundesland-spezifisch',
    description: 'Alle Feiertage für jedes Bundesland, inklusive Schulferien als zusätzliche Information.',
  },
  {
    icon: '⌨️',
    title: 'Schnelle Bedienung',
    description: 'Effiziente Tastatursteuerung für schnelle und komfortable Urlaubsplanung.',
  },
];

const BENEFITS = [
  {
    icon: '📊',
    title: 'Maximale Effizienz',
    value: 'Bis zu 24 Tage',
    description: 'Verlängere deinen Urlaub durch optimale Nutzung von Brückentagen und Feiertagen.',
  },
  {
    icon: '🚀',
    title: 'Schnelle Planung',
    value: '< 5 Minuten',
    description: 'Plane deinen gesamten Jahresurlaub in weniger als 5 Minuten.',
  },
  {
    icon: '🎁',
    title: 'Kostenlos',
    value: '100% Gratis',
    description: 'Alle Features kostenlos verfügbar, keine versteckten Kosten.',
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    icon: '🗺️',
    title: 'Bundesland auswählen',
    description: 'Wähle dein Bundesland aus, um alle relevanten Feiertage zu sehen.',
  },
  {
    icon: '👥',
    title: 'Optional: Zweite Person',
    description: 'Plane gemeinsam mit Partner oder Familie durch Aktivierung der Zwei-Personen Ansicht.',
  },
  {
    icon: '📅',
    title: 'Brückentage anzeigen',
    description: 'Lass dir die effizientesten Brückentage für dein Bundesland anzeigen.',
  },
  {
    icon: '✨',
    title: 'Urlaub optimieren',
    description: 'Wähle die Brückentage aus und optimiere deinen Jahresurlaub mit wenigen Klicks.',
  },
];

const PWA_FEATURES = [
  {
    icon: '🔌',
    title: 'Offline verfügbar',
    description: 'Nutze die App auch ohne Internetverbindung. Alle Funktionen bleiben erhalten.',
  },
  {
    icon: '📱',
    title: 'App Installation',
    description: 'Installiere die App direkt auf deinem Smartphone oder Desktop für schnellen Zugriff.',
  },
  {
    icon: '🚀',
    title: 'Schnellzugriff',
    description: 'Greife blitzschnell auf deine Urlaubsplanung zu - direkt vom Homescreen.',
  },
  {
    icon: '🔄',
    title: 'Automatische Updates',
    description: 'Bleibe immer auf dem neuesten Stand mit automatischen App-Updates.',
  },
];

const FAQ_DATA = [
  {
    question: 'Was sind Brückentage?',
    answer: 'Brückentage sind Arbeitstage, die zwischen Feiertagen und Wochenenden liegen. Durch geschickte Planung dieser Tage können Sie Ihren Urlaub optimal verlängern.'
  },
  {
    question: 'Wie funktioniert die Zwei-Personen Planung?',
    answer: 'Sie können zwei verschiedene Bundesländer auswählen und separate Urlaubstage planen. Ideal für Paare oder Familien, die in unterschiedlichen Bundesländern arbeiten.'
  },
  {
    question: 'Ist die Nutzung kostenlos?',
    answer: 'Ja, alle Funktionen des Holiday Planners sind komplett kostenlos verfügbar. Es gibt keine versteckten Kosten oder Premium-Features.'
  },
  {
    question: 'Werden meine Daten gespeichert?',
    answer: 'Ihre Urlaubsplanung wird nur lokal in Ihrem Browser gespeichert. Es werden keine persönlichen Daten an Server übertragen.'
  },
];

const TESTIMONIALS_DATA = [
  {
    name: 'Sarah M.',
    role: 'Projektmanagerin',
    text: 'Dank der Zwei-Personen Planung können mein Partner und ich unseren Urlaub perfekt aufeinander abstimmen.',
    rating: 5
  },
  {
    name: 'Michael K.',
    role: 'Lehrer',
    text: 'Die Berücksichtigung der Schulferien ist super praktisch. So kann ich meinen Urlaub optimal mit dem Schuljahr koordinieren.',
    rating: 5
  },
  {
    name: 'Lisa B.',
    role: 'Teamleiterin',
    text: 'Die Effizienzberechnung hat mir geholfen, aus meinen 30 Urlaubstagen das Maximum herauszuholen.',
    rating: 5
  }
];

export const metadata: Metadata = {
  title: 'Holiday Planner - Intelligente Urlaubsplanung & Brückentag-Analyse',
  description: 'Optimieren Sie Ihren Urlaub mit unserem intelligenten Urlaubsplaner. Brückentage effizient nutzen, Feiertage analysieren und Urlaubstage clever einsetzen.',
  openGraph: {
    title: 'Holiday Planner - Smarte Urlaubsplanung',
    description: 'Maximieren Sie Ihre Urlaubstage mit intelligenter Brückentag-Analyse und Feiertagsübersicht.',
    url: 'https://your-domain.com',
    siteName: 'Holiday Planner',
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'de_DE',
    type: 'website',
  },
}

export default function LandingPage() {
  return (
    <>
      <Navigation />
      <main className={styles.landingPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1>Intelligente Urlaubsplanung mit Brückentagen</h1>
              <p>
                Mach mehr aus deinen Urlaubstagen! Mit einem Brückentag kannst du einen 4-tägigen Kurzurlaub planen.
                Unser Tool hilft dir, solche Chancen optimal zu nutzen.
              </p>
              <button className={styles.ctaButton}>
                Jetzt Urlaub planen
              </button>
            </div>
            <div className={styles.heroIllustration}>
              <div className={styles.calendarStrip}>
                <div className={styles.calendarLabel}>
                  <span className={styles.multiplier}>1 Urlaubstag = 4 Tage frei!</span>
                </div>
                <div className={styles.weekRow}>
                  <div className={styles.dayLabel}>Mo</div>
                  <div className={styles.dayLabel}>Di</div>
                  <div className={styles.dayLabel}>Mi</div>
                  <div className={styles.dayLabel}>Do</div>
                  <div className={styles.dayLabel}>Fr</div>
                  <div className={styles.dayLabel}>Sa</div>
                  <div className={styles.dayLabel}>So</div>
                </div>
                <div className={styles.daysRow}>
                  <div className={styles.day}>29</div>
                  <div className={styles.day}>30</div>
                  <div className={styles.day}>1</div>
                  <div className={`${styles.day} ${styles.bridgeDay}`}>2</div>
                  <div className={`${styles.day} ${styles.holiday}`}>3</div>
                  <div className={`${styles.day} ${styles.weekend}`}>4</div>
                  <div className={`${styles.day} ${styles.weekend}`}>5</div>
                </div>
                <div className={styles.daysRow}>
                  <div className={styles.day}>6</div>
                  <div className={styles.day}>7</div>
                  <div className={styles.day}>8</div>
                  <div className={styles.day}>9</div>
                  <div className={styles.day}>10</div>
                  <div className={`${styles.day} ${styles.weekend}`}>11</div>
                  <div className={`${styles.day} ${styles.weekend}`}>12</div>
                </div>
                <div className={styles.legend}>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: '#2D7D9A' }}></span>
                    <span>Tag der Deutschen Einheit</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: '#FFB347' }}></span>
                    <span>Brückentag</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: 'rgba(45, 125, 154, 0.05)' }}></span>
                    <span>Wochenende</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={`${styles.section} ${styles.features}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Unsere Features</h2>
            <div className={styles.featureGrid}>
              {FEATURES.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className={`${styles.section} ${styles.benefits}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Deine Vorteile</h2>
            <div className={styles.benefitsGrid}>
              {BENEFITS.map((benefit, index) => (
                <div key={index} className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>{benefit.icon}</div>
                  <div className={styles.benefitValue}>{benefit.value}</div>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className={`${styles.section} ${styles.howItWorks}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>So funktioniert&apos;s</h2>
            <div className={styles.stepsContainer}>
              {HOW_IT_WORKS_STEPS.map((step, index) => (
                <div key={index} className={styles.stepCard}>
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <div className={styles.stepIcon}>{step.icon}</div>
                  <div className={styles.stepContent}>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  {index < HOW_IT_WORKS_STEPS.length - 1 && (
                    <div className={styles.stepConnector}>
                      <svg viewBox="0 0 24 24" className={styles.connectorArrow}>
                        <path d="M5 12h14m-4 4l4-4-4-4" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PWA Section */}
        <section className={`${styles.section} ${styles.pwa}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Immer & Überall verfügbar</h2>
            <div className={styles.pwaContent}>
              <div className={styles.pwaFeatures}>
                {PWA_FEATURES.map((feature, index) => (
                  <div key={index} className={styles.pwaFeatureCard}>
                    <div className={styles.pwaFeatureIcon}>{feature.icon}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
              <div className={styles.pwaDemo}>
                <div className={styles.deviceFrame}>
                  <div className={styles.deviceScreen}>
                    <div className={styles.installPrompt}>
                      <div className={styles.appIcon}>🏖️</div>
                      <div className={styles.installText}>
                        <h4>Holiday Planner</h4>
                        <p>Zum Homescreen hinzufügen</p>
                      </div>
                      <button className={styles.installButton}>Installieren</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={`${styles.section} ${styles.faq}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Häufige Fragen</h2>
            <div className={styles.faqGrid}>
              {FAQ_DATA.map((item, index) => (
                <div key={index} className={styles.faqItem}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className={`${styles.section} ${styles.testimonials}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Das sagen unsere Nutzer</h2>
            <div className={styles.testimonialsGrid}>
              {TESTIMONIALS_DATA.map((testimonial, index) => (
                <div key={index} className={styles.testimonialCard}>
                  <div className={styles.testimonialContent}>
                    <p>{testimonial.text}</p>
                    <div className={styles.testimonialRating}>
                      {'★'.repeat(testimonial.rating)}
                    </div>
                  </div>
                  <div className={styles.testimonialAuthor}>
                    <p>
                      {testimonial.name}
                      <span className={styles.testimonialRole}>{testimonial.role}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export const dynamic = 'force-static'
export const revalidate = 86400
