import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllStates, getStateInfo } from '@/config';
import styles from './styles/StatesPage.module.css';

export const metadata: Metadata = {
  title: 'Alle Bundesländer - Holiday Planner',
  description: 'Entdecken Sie Urlaubsmöglichkeiten in allen deutschen Bundesländern. Feiertage, Schulferien und beliebte Reiseziele auf einen Blick.',
};

export default function StatesPage() {
  const states = getAllStates().map(state => ({
    id: state,
    ...getStateInfo(state)!
  }));

  return (
    <main className={styles.statesPage}>
      <header className={styles.header}>
        <h1>Alle Bundesländer</h1>
        <p>Wählen Sie ein Bundesland aus, um detaillierte Informationen zu Feiertagen, Schulferien und beliebten Reisezielen zu erhalten.</p>
      </header>

      <div className={styles.stateGrid}>
        {states.map(state => (
          <Link 
            key={state.id} 
            href={`/states/${state.id}`}
            className={styles.stateCard}
          >
            <div className={styles.stateSymbols}>
              <Image
                src={state.flag}
                alt={`Flagge von ${state.fullName}`}
                width={60}
                height={36}
                className={styles.stateFlag}
              />
              <Image
                src={state.coat}
                alt={`Wappen von ${state.fullName}`}
                width={32}
                height={40}
                className={styles.stateCoat}
              />
            </div>
            <div className={styles.stateInfo}>
              <h2>{state.fullName}</h2>
              <p className={styles.stateCapital}>
                Hauptstadt: {state.capital}
              </p>
              <div className={styles.stateStats}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Einwohner</span>
                  <span className={styles.statValue}>{state.keyFacts.population}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Fläche</span>
                  <span className={styles.statValue}>{state.keyFacts.area}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
} 