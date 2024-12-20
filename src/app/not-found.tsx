import Link from 'next/link'
import styles from './not-found.module.css'
import Navigation from '@/components/Navigation/Navigation'

export const dynamic = 'force-static'

export default function NotFound() {
  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>404 - Seite nicht gefunden</h1>
          <p>Die gesuchte Seite konnte leider nicht gefunden werden.</p>
          <div className={styles.actions}>
            <Link href="/" className={styles.button}>
              Zur Startseite
            </Link>
            <Link href="/planner" className={styles.button}>
              Zum Urlaubsplaner
            </Link>
          </div>
        </div>
      </div>
    </>
  )
} 