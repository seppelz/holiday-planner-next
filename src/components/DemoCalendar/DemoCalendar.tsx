import styles from './DemoCalendar.module.css'

const demoData = {
  month: 'Mai',
  year: '2025',
  days: [
    { day: 1, type: 'holiday', label: 'Tag der Arbeit' },
    { day: 2, type: 'bridge', label: 'Brückentag' },
    { day: 3, type: 'weekend', label: 'Wochenende' },
    { day: 4, type: 'weekend', label: 'Wochenende' },
    { day: 5, type: null, label: '' },
    { day: 6, type: null, label: '' },
    { day: 7, type: null, label: '' },
    { day: 8, type: null, label: '' },
    { day: 9, type: 'holiday', label: 'Christi Himmelfahrt' },
    { day: 10, type: 'bridge', label: 'Brückentag' },
    { day: 11, type: 'weekend', label: 'Wochenende' },
    { day: 12, type: 'weekend', label: 'Wochenende' },
    { day: 13, type: null, label: '' },
    { day: 14, type: null, label: '' },
    { day: 15, type: null, label: '' },
  ]
}

const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

export default function DemoCalendar() {
  return (
    <div className={styles.demoCalendar}>
      <div className={styles.demoCalendarHeader}>
        <h3>{demoData.month} {demoData.year}</h3>
        <div className={styles.efficiency}>
          <span className={styles.efficiencyLabel}>Effizienz:</span>
          <span className={styles.efficiencyValue}>180%</span>
        </div>
      </div>

      <div className={styles.demoCalendarGrid}>
        <div className={styles.weekDays}>
          {weekDays.map((day) => (
            <div key={day} className={styles.weekDay}>{day}</div>
          ))}
        </div>

        <div className={styles.demoCalendarDays}>
          {demoData.days.map((day, index) => (
            <div 
              key={index} 
              className={`${styles.demoDay} ${day.type ? styles[day.type] : ''}`}
            >
              <span className={styles.dayNumber}>{day.day}</span>
              {day.label && (
                <span className={styles.dayLabel}>{day.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.demoLegend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendDot} ${styles.holiday}`}></div>
          <span>Feiertag</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendDot} ${styles.bridge}`}></div>
          <span>Brückentag</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendDot} ${styles.weekend}`}></div>
          <span>Wochenende</span>
        </div>
      </div>

      <div className={styles.demoStats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Urlaubstage:</span>
          <span className={styles.statValue}>2</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Freie Tage:</span>
          <span className={styles.statValue}>9</span>
        </div>
      </div>
    </div>
  )
} 