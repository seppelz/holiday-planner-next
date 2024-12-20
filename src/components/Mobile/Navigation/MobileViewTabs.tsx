import React from 'react';
import { VacationPlan } from '../../../types/vacationPlan';
import { holidayColors } from '../../../constants/colors';

type ViewType = 'holidays' | 'school' | 'bridge' | 'planning' | 'calendar';

interface MobileViewTabsProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  personId: 1 | 2;
  vacationPlans: VacationPlan[];
}

export const MobileViewTabs: React.FC<MobileViewTabsProps> = ({
  activeView,
  onViewChange,
  personId,
  vacationPlans
}) => {
  const accentColor = personId === 1 ? '#10b981' : '#06b6d4';

  const allTabs: Array<{ id: ViewType; label: string; icon: JSX.Element }> = [
    {
      id: 'holidays',
      label: 'Feiertage',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" 
          />
        </svg>
      )
    },
    {
      id: 'school',
      label: 'Schulferien',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
          />
        </svg>
      )
    },
    {
      id: 'bridge',
      label: 'Brückentage',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" 
          />
        </svg>
      )
    },
    {
      id: 'planning',
      label: 'Planung',
      icon: (
        <div className="relative">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
            />
          </svg>
          {vacationPlans.length > 0 && (
            <div 
              className="absolute -top-1 -right-1 min-w-[14px] h-3.5 flex items-center justify-center rounded-full text-[9px] font-medium text-white px-1"
              style={{ backgroundColor: accentColor }}
              role="status"
              aria-label={`${vacationPlans.length} Urlaubspläne`}
            >
              {vacationPlans.length}
            </div>
          )}
        </div>
      )
    },
    {
      id: 'calendar',
      label: 'Kalender',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      )
    }
  ];

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentId: ViewType) => {
    const currentIndex = allTabs.findIndex(tab => tab.id === currentId);
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        if (currentIndex > 0) {
          const prevTab = allTabs[currentIndex - 1];
          onViewChange(prevTab.id);
          const element = document.querySelector(`[data-nav="${prevTab.id}"]`) as HTMLElement;
          element?.focus();
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (currentIndex < allTabs.length - 1) {
          const nextTab = allTabs[currentIndex + 1];
          onViewChange(nextTab.id);
          const element = document.querySelector(`[data-nav="${nextTab.id}"]`) as HTMLElement;
          element?.focus();
        }
        break;
    }
  };

  return (
    <nav 
      className="border-t border-gray-200 bg-white"
      aria-label="Hauptnavigation"
    >
      <div className="flex justify-around" role="tablist">
        {allTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onViewChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tab.id)}
            className={`flex-1 flex flex-col items-center py-1.5 px-1 transition-colors
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${personId === 1 ? 'emerald' : 'cyan'}-500
              ${activeView === tab.id
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
              }`}
            style={{
              color: activeView === tab.id ? accentColor : undefined
            }}
            role="tab"
            aria-selected={activeView === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeView === tab.id ? 0 : -1}
            data-nav={tab.id}
          >
            {tab.icon}
            <span className="text-[10px] mt-0.5 whitespace-nowrap">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};