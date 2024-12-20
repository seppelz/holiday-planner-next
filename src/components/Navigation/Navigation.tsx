'use client';

import Link from 'next/link'
import Image from 'next/image'
import { getAllStates, getStateInfo } from '@/config'
import styles from './Navigation.module.css'

export default function Navigation() {
  const states = getAllStates().map(state => ({
    id: state,
    name: getStateInfo(state)?.fullName || state
  }));

  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <Link href="/" className={styles.logo}>
          <Image 
            src="/images/logo.svg" 
            alt="Holiday Planner" 
            width={32} 
            height={32} 
            className={styles.logoIcon}
            priority
          />
          <span className={styles.logoText}>Holiday Planner</span>
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="/#features">Funktionen</Link>
          <div className={styles.dropdown}>
            <button className={styles.dropdownTrigger}>
              Bundesländer
              <svg className={styles.dropdownIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className={styles.dropdownContent}>
              {states.map(state => (
                <Link key={state.id} href={`/states/${state.id}`}>
                  {state.name}
                </Link>
              ))}
              <div className={styles.dropdownDivider} />
              <Link href="/states" className={styles.dropdownSpecial}>
                Alle Bundesländer
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.navActions}>
          <Link 
            href={process.env.NEXT_PUBLIC_MAIN_APP_URL || '/planner'} 
            className={styles.ctaButton}
          >
            <span>App öffnen</span>
            <svg className={styles.ctaIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
} 