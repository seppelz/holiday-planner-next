import Link from 'next/link'
import styles from './Footer.module.css'
import { GERMAN_STATES } from '@/config/states'

export default function Footer() {
  // Split states into columns for better organization
  const stateColumns = [
    GERMAN_STATES.slice(0, 4),
    GERMAN_STATES.slice(4, 8),
    GERMAN_STATES.slice(8, 12),
    GERMAN_STATES.slice(12)
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Holiday Planner</h3>
          <p>Intelligente Urlaubsplanung und Brückentag-Analyse für Deutschland</p>
          <div className={styles.footerNav}>
            <h4>Navigation</h4>
            <ul>
              <li><Link href="/">Startseite</Link></li>
              <li><Link href="/planner">Urlaubsplaner</Link></li>
              <li><Link href="/#features">Funktionen</Link></li>
            </ul>
          </div>
        </div>

        {stateColumns.map((column, index) => (
          <div key={index} className={styles.footerSection}>
            <h4>{index === 0 ? 'Bundesländer' : '\u00A0'}</h4>
            <ul>
              {column.map(state => (
                <li key={state.slug}>
                  <Link href={`/states/${state.slug}`}>{state.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <p>&copy; {new Date().getFullYear()} Holiday Planner. Alle Rechte vorbehalten.</p>
          <div className={styles.footerLinks}>
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
            <Link href="/kontakt">Kontakt</Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 