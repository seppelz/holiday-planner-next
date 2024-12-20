'use client'

import { useEffect } from 'react'
import styles from './not-found.module.css'
import Navigation from '@/components/Navigation/Navigation'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Etwas ist schiefgelaufen</h1>
          <p>Es tut uns leid, aber es ist ein Fehler aufgetreten.</p>
          <div className={styles.actions}>
            <button
              onClick={reset}
              className={styles.button}
            >
              Erneut versuchen
            </button>
          </div>
        </div>
      </div>
    </>
  )
} 